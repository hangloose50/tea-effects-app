import MistralClient from '../ai/MistralClient';
import RAGService from '../rag/RAGService';
import SupabaseService from '../database/SupabaseClient';
import PromptTemplates from '../ai/PromptTemplates';
import {
  BlendCreationRequest,
  BlendCreationResponse,
  TeaWithDetails,
  CompoundBreakdown
} from '../../models/types';

class BlendEngine {
  private mistral: MistralClient;
  private rag: RAGService;
  private supabase: ReturnType<typeof SupabaseService.getInstance>;

  constructor() {
    this.mistral = new MistralClient();
    this.rag = new RAGService();
    this.supabase = SupabaseService.getInstance();
  }

  /**
   * Create a custom tea blend
   */
  async createBlend(
    request: BlendCreationRequest,
    userId: string
  ): Promise<BlendCreationResponse> {
    try {
      // Step 1: Get available teas
      const availableTeas = await this.getAvailableTeas(request.user_inventory);

      // Step 2: Filter teas by target effects
      const relevantTeas = await this.filterTeasByEffects(
        availableTeas,
        request.target_effects
      );

      // Step 3: Get RAG context about blend creation
      const ragContext = await this.rag.retrieveContext(
        `Creating tea blends for ${request.target_effects.join(', ')}. Compound synergies and ratios.`,
        3
      );

      // Step 4: Generate blend with AI
      const prompt = PromptTemplates.blendCreation(
        request.target_effects,
        {
          max_caffeine: request.max_caffeine_mg,
          flavor_profile: request.flavor_profile,
          budget: request.budget_per_cup
        },
        relevantTeas,
        ragContext
      );

      const aiResponse = await this.mistral.generate(prompt, { temperature: 0.7 });

      // Step 5: Parse AI response
      const blendData = this.parseBlendResponse(aiResponse, relevantTeas);

      // Step 6: Calculate total compounds
      const totalCompounds = this.calculateTotalCompounds(
        blendData.components,
        relevantTeas
      );

      // Step 7: Predict effects
      const predictedEffects = await this.predictBlendEffects(
        blendData.components,
        relevantTeas
      );

      // Step 8: Save blend to database
      const { data: blend, error } = await this.supabase
        .from('blends')
        .insert({
          user_id: userId,
          name: blendData.blend_name,
          description: blendData.brewing_instructions,
          target_effects: request.target_effects,
          is_public: false
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to save blend: ${error.message}`);
      }

      // Step 9: Save blend components
      for (const component of blendData.components) {
        const tea = relevantTeas.find(t => t.name === component.tea);
        if (tea) {
          await this.supabase.from('blend_components').insert({
            blend_id: blend.id,
            tea_id: tea.id,
            ratio: component.ratio,
            steep_time_sec: component.steep_time_sec,
            steep_temp_c: component.steep_temp_c,
            notes: component.reasoning
          });
        }
      }

      // Step 10: Return complete blend response
      return {
        blend,
        components: blendData.components,
        predicted_effects: predictedEffects,
        total_compounds: totalCompounds,
        cost_per_cup: blendData.cost_per_cup,
        brewing_instructions: blendData.brewing_instructions,
        ai_reasoning: aiResponse
      };
    } catch (error: any) {
      console.error('Blend creation error:', error.message);
      throw new Error(`Failed to create blend: ${error.message}`);
    }
  }

  /**
   * Get available teas (all or from user inventory)
   */
  private async getAvailableTeas(inventoryIds?: number[]): Promise<TeaWithDetails[]> {
    let query = this.supabase.from('teas').select(`
      id, name, type, origin, description, price_per_oz,
      tea_compounds (
        amount_mg_per_cup,
        compounds (id, name, chemical_formula)
      ),
      tea_effects (
        intensity,
        onset_minutes,
        duration_minutes,
        effects (id, name, category)
      )
    `);

    if (inventoryIds && inventoryIds.length > 0) {
      query = query.in('id', inventoryIds);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Transform data
    return (data || []).map((tea: any) => ({
      ...tea,
      compounds: tea.tea_compounds.map((tc: any) => ({
        ...tc.compounds,
        amount_mg: tc.amount_mg_per_cup
      })),
      effects: tea.tea_effects.map((te: any) => ({
        ...te.effects,
        intensity: te.intensity,
        onset_minutes: te.onset_minutes,
        duration_minutes: te.duration_minutes
      }))
    }));
  }

  /**
   * Filter teas by effects
   */
  private async filterTeasByEffects(
    teas: TeaWithDetails[],
    targetEffects: string[]
  ): Promise<TeaWithDetails[]> {
    return teas.filter(tea =>
      tea.effects.some(e =>
        targetEffects.some(target =>
          e.name.toLowerCase().includes(target.toLowerCase())
        )
      )
    );
  }

  /**
   * Parse AI blend response
   */
  private parseBlendResponse(aiResponse: string, availableTeas: TeaWithDetails[]): any {
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error parsing blend response:', error);
      // Fallback: create simple blend
      return this.createFallbackBlend(availableTeas);
    }
  }

  /**
   * Calculate total compounds in blend
   */
  private calculateTotalCompounds(
    components: any[],
    teas: TeaWithDetails[]
  ): CompoundBreakdown {
    const totals: CompoundBreakdown = {
      caffeine_mg: 0,
      l_theanine_mg: 0,
      catechins_mg: 0,
      other: {}
    };

    for (const component of components) {
      const tea = teas.find(t => t.name === component.tea);
      if (!tea) continue;

      const ratio = component.ratio / 100; // Convert percentage to decimal

      for (const compound of tea.compounds) {
        const amount = (compound.amount_mg || 0) * ratio;

        if (compound.name === 'caffeine') {
          totals.caffeine_mg += amount;
        } else if (compound.name === 'l-theanine') {
          totals.l_theanine_mg += amount;
        } else if (compound.name === 'EGCG' || compound.name === 'ECG' || compound.name === 'EGC' || compound.name === 'catechin') {
          totals.catechins_mg = (totals.catechins_mg || 0) + amount;
        } else {
          const key = `${compound.name}_mg`;
          if (!totals.other[key]) {
            totals.other[key] = 0;
          }
          totals.other[key] += amount;
        }
      }
    }

    return totals;
  }

  /**
   * Predict blend effects
   */
  private async predictBlendEffects(
    components: any[],
    teas: TeaWithDetails[]
  ): Promise<any[]> {
    const effectMap = new Map<string, { intensity: number; count: number }>();

    for (const component of components) {
      const tea = teas.find(t => t.name === component.tea);
      if (!tea) continue;

      const weight = component.ratio / 100;

      for (const effect of tea.effects) {
        const key = effect.name;
        const weightedIntensity = effect.intensity * weight;

        if (effectMap.has(key)) {
          const current = effectMap.get(key)!;
          effectMap.set(key, {
            intensity: current.intensity + weightedIntensity,
            count: current.count + 1
          });
        } else {
          effectMap.set(key, {
            intensity: weightedIntensity,
            count: 1
          });
        }
      }
    }

    const effects: any[] = [];
    effectMap.forEach((value, key) => {
      effects.push({
        effect: { name: key },
        intensity: Math.round(value.intensity),
        onset_minutes: 25,
        duration_minutes: 200
      });
    });

    return effects.sort((a, b) => b.intensity - a.intensity);
  }

  /**
   * Create fallback blend if AI fails
   */
  private createFallbackBlend(teas: TeaWithDetails[]): any {
    const topTeas = teas.slice(0, 2);

    return {
      blend_name: 'Custom Blend',
      components: topTeas.map((tea, i) => ({
        tea: tea.name,
        ratio: i === 0 ? 70 : 30,
        steep_temp_c: 85,
        steep_time_sec: 180,
        reasoning: `Selected for its ${tea.effects.map(e => e.name).join(', ')} effects`
      })),
      brewing_instructions: 'Steep all ingredients together at 85°C for 3 minutes',
      cost_per_cup: topTeas.reduce((sum, tea) => sum + (tea.price_per_oz || 0) * 0.15, 0)
    };
  }

  /**
   * Optimize an existing blend
   */
  async optimizeBlend(
    blendId: number,
    userFeedback: string
  ): Promise<BlendCreationResponse> {
    // Get current blend
    const { data: blend } = await this.supabase
      .from('blends')
      .select('*, blend_components(*)')
      .eq('id', blendId)
      .single();

    if (!blend) {
      throw new Error('Blend not found');
    }

    // Generate optimization suggestions with AI
    const prompt = PromptTemplates.optimizeBlend(
      blend,
      blend.target_effects,
      userFeedback
    );

    const suggestions = await this.mistral.generate(prompt, { temperature: 0.7 });

    // Return suggestions (actual optimization would update the blend)
    return {
      blend,
      components: blend.blend_components,
      predicted_effects: [],
      total_compounds: { caffeine_mg: 0, l_theanine_mg: 0, other: {} },
      cost_per_cup: 0,
      brewing_instructions: suggestions,
      ai_reasoning: suggestions
    };
  }
}

export default BlendEngine;
