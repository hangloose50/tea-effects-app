import { AIPromptContext } from '../../models/types';

export class PromptTemplates {
  /**
   * Generate prompt for effect-based tea recommendation
   */
  static effectRecommendation(context: AIPromptContext): string {
    const { user_state, available_teas, rag_context } = context;

    return `You are a tea sommelier specializing in the neurochemistry and physiological effects of tea compounds.

## User Current State
- Energy Level: ${user_state.baseline_energy}/10
- Focus Level: ${user_state.baseline_focus}/10
- Mood: ${user_state.baseline_mood}/10
- Recent Caffeine: ${user_state.recent_caffeine}mg
- Time of Day: ${user_state.time_of_day}

## Available Teas
${available_teas.map(tea => `
- ${tea.name} (${tea.type}):
  Caffeine: ${tea.compounds.find(c => c.name === 'caffeine')?.amount_mg || 0}mg
  L-theanine: ${tea.compounds.find(c => c.name === 'l-theanine')?.amount_mg || 0}mg
  Effects: ${tea.effects.map(e => e.name).join(', ')}
`).join('\n')}

## Research Context
${rag_context}

## Task
Recommend the TOP 3 teas for this user's current state, considering:
1. Compound profiles and synergies
2. Current energy/focus levels
3. Time of day and recent caffeine intake
4. Expected effect timelines

For EACH recommendation, provide:
- Tea name and why it's perfect right now
- Key compounds and their effects
- Expected timeline (onset, peak, duration)
- Specific brewing instructions
- What to expect mentally and physically

Format as JSON:
{
  "recommendations": [
    {
      "tea": "tea name",
      "reasoning": "detailed explanation",
      "compounds": {"caffeine": 30, "l-theanine": 45},
      "timeline": {"onset_min": 30, "peak_min": 60, "duration_min": 240},
      "brewing": {"temp_c": 70, "time_sec": 120, "amount_g": 3},
      "expected_effects": "what user will feel"
    }
  ]
}`;
  }

  /**
   * Generate prompt for custom blend creation
   */
  static blendCreation(
    target_effects: string[],
    constraints: {
      max_caffeine?: number;
      flavor_profile?: string[];
      budget?: number;
    },
    available_teas: any[],
    rag_context: string
  ): string {
    return `You are an expert tea blender creating custom blends for specific effects.

## Target Effects
${target_effects.join(', ')}

## Constraints
- Max Caffeine: ${constraints.max_caffeine || 100}mg
- Flavor Profile: ${constraints.flavor_profile?.join(', ') || 'any'}
- Budget per cup: $${constraints.budget || 5}

## Available Teas
${available_teas.map(tea => `
- ${tea.name}: $${tea.price_per_oz || 0}/oz, ${tea.compounds.caffeine || 0}mg caffeine, ${tea.compounds.l_theanine || 0}mg L-theanine
`).join('\n')}

## Research Context
${rag_context}

## Task
Create a custom tea blend to achieve the target effects while respecting constraints.

Consider:
1. Compound synergies (optimal L-theanine:Caffeine is 2:1)
2. Flavor harmony
3. Extraction temperatures (some compounds extract at different temps)
4. Steeping order (sequential vs simultaneous)
5. Cost efficiency

Provide EXACT ratios and instructions.

Format as JSON:
{
  "blend_name": "descriptive name",
  "components": [
    {
      "tea": "tea name",
      "ratio": 60,
      "steep_temp_c": 85,
      "steep_time_sec": 180,
      "reasoning": "why this ingredient"
    }
  ],
  "total_compounds": {"caffeine": 30, "l-theanine": 60},
  "brewing_instructions": "step by step",
  "expected_effects": "detailed effect profile",
  "cost_per_cup": 2.50
}`;
  }

  /**
   * Generate prompt for RAG-enhanced query
   */
  static ragQuery(query: string, retrieved_docs: string): string {
    return `You are a tea expert answering questions based on research and tea knowledge.

## User Question
${query}

## Retrieved Research
${retrieved_docs}

## Task
Answer the user's question accurately using the research provided. If the research doesn't contain enough information, say so and provide general tea knowledge.

Be specific, cite compound names and effects, and provide actionable advice when relevant.`;
  }

  /**
   * Generate prompt for effect analysis from user logs
   */
  static analyzeUserEffects(
    tea_name: string,
    user_logs: any[],
    rag_context: string
  ): string {
    return `Analyze how this tea affects this specific user based on their tracking data.

## Tea
${tea_name}

## User Logs (${user_logs.length} sessions)
${user_logs.map(log => `
Session:
- Baseline Energy: ${log.baseline_energy}/10
- Post-15min Energy: ${log.checkins?.['15']?.energy || 'N/A'}/10
- Post-1hr Energy: ${log.checkins?.['60']?.energy || 'N/A'}/10
- Effectiveness Rating: ${log.effectiveness}/5
- Would Repeat: ${log.would_repeat}
`).join('\n')}

## Research Context
${rag_context}

## Task
Analyze this user's unique response to this tea. Provide:
1. Personal effect profile (how it affects THEM specifically)
2. Optimal timing for this user
3. Best use cases based on their patterns
4. Any unusual responses vs typical users
5. Recommendations for maximizing benefits

Keep it personalized and actionable.`;
  }

  /**
   * Prompt for compound optimization in blends
   */
  static optimizeBlend(
    current_blend: any,
    target_effects: string[],
    user_feedback?: string
  ): string {
    return `You are optimizing a tea blend based on target effects and user feedback.

## Current Blend
${JSON.stringify(current_blend, null, 2)}

## Target Effects
${target_effects.join(', ')}

${user_feedback ? `## User Feedback\n${user_feedback}\n` : ''}

## Task
Suggest adjustments to improve the blend:
1. Ratio adjustments
2. Temperature/time modifications
3. Additional ingredients
4. Sequential steeping changes

Explain the science behind each suggestion.

Format as JSON with clear before/after comparisons.`;
  }
}

export default PromptTemplates;
