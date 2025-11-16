import MistralClient from '../ai/MistralClient';
import RAGService from '../rag/RAGService';
import SupabaseService from '../database/SupabaseClient';
import PromptTemplates from '../ai/PromptTemplates';
import {
  RecommendationRequest,
  TeaRecommendation,
  TeaWithDetails,
  AIPromptContext
} from '../../models/types';

class EffectEngine {
  private mistral: MistralClient;
  private rag: RAGService;
  private supabase: ReturnType<typeof SupabaseService.getInstance>;

  constructor() {
    this.mistral = new MistralClient();
    this.rag = new RAGService();
    this.supabase = SupabaseService.getInstance();
  }

  /**
   * Get tea recommendations based on desired effects
   */
  async recommend(request: RecommendationRequest): Promise<TeaRecommendation[]> {
    try {
      // Step 1: Find teas that match the desired effect
      const matchingTeas = await this.findTeasByEffect(request.desired_effect);

      if (matchingTeas.length === 0) {
        throw new Error(`No teas found for effect: ${request.desired_effect}`);
      }

      // Step 2: Filter by constraints
      const filteredTeas = this.filterByConstraints(matchingTeas, request);

      // Step 3: Get RAG context for the desired effect
      const ragContext = await this.rag.retrieveContext(
        `Effects of tea for ${request.desired_effect}. Compounds and mechanisms.`,
        3
      );

      // Step 4: Build AI prompt context
      const context: AIPromptContext = {
        user_state: {
          baseline_energy: request.preferences?.max_caffeine ? 5 : 7, // Estimate
          baseline_focus: 5,
          baseline_mood: 5,
          recent_caffeine: request.recent_caffeine || 0,
          time_of_day: request.time_of_day
        },
        available_teas: filteredTeas.slice(0, 10), // Limit to top 10 for prompt
        rag_context: ragContext
      };

      // Step 5: Generate AI recommendations
      const prompt = PromptTemplates.effectRecommendation(context);
      const aiResponse = await this.mistral.generate(prompt, { temperature: 0.7 });

      // Step 6: Parse AI response and build recommendations
      const recommendations = this.parseAIRecommendations(aiResponse, filteredTeas);

      return recommendations.slice(0, 3); // Return top 3
    } catch (error: any) {
      console.error('Recommendation error:', error.message);
      throw new Error(`Failed to generate recommendations: ${error.message}`);
    }
  }

  /**
   * Find teas by effect name
   */
  private async findTeasByEffect(effectName: string): Promise<TeaWithDetails[]> {
    try {
      // Get effect ID
      const { data: effects, error: effectError } = await this.supabase
        .from('effects')
        .select('id')
        .ilike('name', effectName)
        .single();

      if (effectError || !effects) {
        throw new Error(`Effect not found: ${effectName}`);
      }

      // Get teas with this effect, sorted by intensity
      const { data: teaEffects, error: teaEffectError } = await this.supabase
        .from('tea_effects')
        .select(`
          tea_id,
          intensity,
          onset_minutes,
          duration_minutes,
          teas (
            id, name, type, origin, description, price_per_oz
          )
        `)
        .eq('effect_id', effects.id)
        .gte('intensity', 3) // Only moderate to high intensity
        .order('intensity', { ascending: false });

      if (teaEffectError) {
        throw teaEffectError;
      }

      // Enrich with compounds and all effects
      const enrichedTeas: TeaWithDetails[] = [];

      for (const te of teaEffects) {
        const tea = te.teas as any;

        // Get compounds
        const { data: compounds } = await this.supabase
          .from('tea_compounds')
          .select(`
            amount_mg_per_cup,
            compounds (id, name, chemical_formula, mechanism)
          `)
          .eq('tea_id', tea.id);

        // Get all effects
        const { data: allEffects } = await this.supabase
          .from('tea_effects')
          .select(`
            intensity,
            onset_minutes,
            duration_minutes,
            effects (id, name, category, description)
          `)
          .eq('tea_id', tea.id);

        enrichedTeas.push({
          ...tea,
          compounds: (compounds || []).map((c: any) => ({
            ...c.compounds,
            amount_mg: c.amount_mg_per_cup
          })),
          effects: (allEffects || []).map((e: any) => ({
            ...e.effects,
            intensity: e.intensity,
            onset_minutes: e.onset_minutes,
            duration_minutes: e.duration_minutes
          }))
        });
      }

      return enrichedTeas;
    } catch (error: any) {
      console.error('Error finding teas by effect:', error.message);
      throw error;
    }
  }

  /**
   * Filter teas by user constraints
   */
  private filterByConstraints(
    teas: TeaWithDetails[],
    request: RecommendationRequest
  ): TeaWithDetails[] {
    return teas.filter(tea => {
      // Caffeine constraint
      if (request.preferences?.max_caffeine) {
        const caffeine = tea.compounds.find(c => c.name === 'caffeine')?.amount_mg || 0;
        if (caffeine > request.preferences.max_caffeine) {
          return false;
        }
      }

      // Sensitivities
      if (request.sensitivities) {
        const hasAvoidedCompound = tea.compounds.some(c =>
          request.sensitivities!.some(s => c.name.toLowerCase().includes(s.toLowerCase()))
        );
        if (hasAvoidedCompound) {
          return false;
        }
      }

      // Temperature preference
      if (request.preferences?.temperature === 'iced' && tea.type === 'pu-erh') {
        return false; // Pu-erh better hot
      }

      return true;
    });
  }

  /**
   * Parse AI recommendations from JSON response
   */
  private parseAIRecommendations(
    aiResponse: string,
    availableTeas: TeaWithDetails[]
  ): TeaRecommendation[] {
    try {
      // Extract JSON from response (in case AI adds extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.warn('No JSON found in AI response, using fallback');
        return this.getFallbackRecommendations(availableTeas);
      }

      const parsed = JSON.parse(jsonMatch[0]);
      const recommendations: TeaRecommendation[] = [];

      for (const rec of parsed.recommendations || []) {
        const tea = availableTeas.find(t =>
          t.name.toLowerCase().includes(rec.tea.toLowerCase())
        );

        if (tea) {
          recommendations.push({
            tea,
            reasoning: rec.reasoning,
            brewing_method: {
              temperature_c: rec.brewing.temp_c,
              steep_time_sec: rec.brewing.time_sec,
              amount_g: rec.brewing.amount_g,
              water_ml: 150
            },
            expected_effects: tea.effects.map(e => ({
              effect: e,
              intensity: e.intensity,
              onset_minutes: e.onset_minutes,
              duration_minutes: e.duration_minutes
            })),
            timing_advice: `Best consumed ${rec.timeline.onset_min} minutes before needed effect`,
            alternatives: availableTeas.filter(t => t.id !== tea.id).slice(0, 2),
            compound_breakdown: {
              caffeine_mg: rec.compounds.caffeine || 0,
              l_theanine_mg: rec.compounds['l-theanine'] || rec.compounds.l_theanine || 0,
              other: rec.compounds
            }
          });
        }
      }

      return recommendations;
    } catch (error) {
      console.error('Error parsing AI recommendations:', error);
      return this.getFallbackRecommendations(availableTeas);
    }
  }

  /**
   * Fallback recommendations if AI parsing fails
   */
  private getFallbackRecommendations(teas: TeaWithDetails[]): TeaRecommendation[] {
    return teas.slice(0, 3).map(tea => {
      const caffeine = tea.compounds.find(c => c.name === 'caffeine')?.amount_mg || 0;
      const theanine = tea.compounds.find(c => c.name === 'l-theanine')?.amount_mg || 0;

      return {
        tea,
        reasoning: `${tea.name} is a ${tea.type} tea known for its ${tea.effects.map(e => e.name).join(', ')} effects.`,
        brewing_method: {
          temperature_c: tea.type === 'green' ? 70 : 85,
          steep_time_sec: 180,
          amount_g: 4,
          water_ml: 150
        },
        expected_effects: tea.effects.map(e => ({
          effect: e,
          intensity: e.intensity,
          onset_minutes: e.onset_minutes,
          duration_minutes: e.duration_minutes
        })),
        timing_advice: 'Consume 20-30 minutes before desired effect',
        alternatives: teas.filter(t => t.id !== tea.id).slice(0, 2),
        compound_breakdown: {
          caffeine_mg: caffeine,
          l_theanine_mg: theanine,
          other: {}
        }
      };
    });
  }
}

export default EffectEngine;
