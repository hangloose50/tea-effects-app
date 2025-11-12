// ============================================
// CORE TYPE DEFINITIONS
// ============================================

export interface User {
  id: string;
  email: string;
  name?: string;
  password_hash: string;
  preferences: UserPreferences;
  sensitivities: string[];
  created_at: Date;
  updated_at: Date;
}

export interface UserPreferences {
  caffeine_tolerance?: 'low' | 'medium' | 'high';
  taste_preference?: 'light' | 'medium' | 'bold';
  temperature_preference?: 'hot' | 'iced' | 'either';
  max_caffeine_per_day?: number;
  favorite_effects?: number[];
}

// ============================================
// TEA DATA
// ============================================

export interface Tea {
  id: number;
  name: string;
  type: TeaType;
  origin?: string;
  description?: string;
  price_per_oz?: number;
  image_url?: string;
  created_at: Date;
}

export type TeaType = 'green' | 'black' | 'oolong' | 'white' | 'pu-erh' | 'herbal' | 'yellow';

export interface Compound {
  id: number;
  name: string;
  chemical_formula?: string;
  mechanism?: string;
  half_life_minutes?: number;
  safe_daily_limit_mg?: number;
  created_at: Date;
}

export interface TeaCompound {
  id: number;
  tea_id: number;
  compound_id: number;
  amount_mg_per_cup: number;
  optimal_extraction_temp_c?: number;
  optimal_steep_time_sec?: number;
}

// ============================================
// EFFECTS SYSTEM
// ============================================

export interface Effect {
  id: number;
  name: string;
  category: EffectCategory;
  description?: string;
  icon?: string;
}

export type EffectCategory = 'mental' | 'physical' | 'emotional';

export enum EffectType {
  // Mental
  ALERTNESS = 'alertness',
  SUSTAINED_FOCUS = 'sustained_focus',
  MENTAL_CLARITY = 'mental_clarity',
  CREATIVITY = 'creativity',
  MEMORY = 'memory',
  LEARNING = 'learning',

  // Physical
  ENERGY_BOOST = 'energy_boost',
  METABOLISM = 'metabolism',
  DIGESTION = 'digestion',
  IMMUNE = 'immune',
  ANTIOXIDANT = 'antioxidant',

  // Emotional
  CALM = 'calm',
  RELAXATION = 'relaxation',
  STRESS_RELIEF = 'stress_relief',
  MOOD_LIFT = 'mood_lift',
  SLEEP_PREP = 'sleep_prep',
  MEDITATION = 'meditation',
  COMFORT = 'comfort',
  GROUNDING = 'grounding'
}

export interface TeaEffect {
  id: number;
  tea_id: number;
  effect_id: number;
  intensity: number; // 1-5
  onset_minutes: number;
  duration_minutes: number;
  confidence_score: number; // 0.0-1.0
  data_source: 'research' | 'user_reported' | 'ai_inferred';
}

export interface CompoundEffect {
  id: number;
  compound_id: number;
  effect_id: number;
  potency: number; // 1-5
  research_citations?: string[];
}

// ============================================
// BLENDING SYSTEM
// ============================================

export interface Blend {
  id: number;
  user_id: string;
  name: string;
  description?: string;
  target_effects: number[];
  is_public: boolean;
  times_favorited: number;
  avg_rating?: number;
  created_at: Date;
  updated_at: Date;
}

export interface BlendComponent {
  id: number;
  blend_id: number;
  tea_id: number;
  ratio: number; // 0-100%
  steep_time_sec: number;
  steep_temp_c: number;
  notes?: string;
  order_added: number;
}

export interface BlendPredictedEffect {
  id: number;
  blend_id: number;
  effect_id: number;
  predicted_intensity: number; // 1-5
  total_compound_mg: Record<string, number>;
  calculated_at: Date;
}

// ============================================
// USER TRACKING
// ============================================

export interface EffectLog {
  id: number;
  user_id: string;
  tea_id?: number;
  blend_id?: number;
  logged_at: Date;
  time_of_day: TimeOfDay;

  // Baseline state
  baseline_energy: number; // 1-10
  baseline_focus: number; // 1-10
  baseline_mood: number; // 1-10
  baseline_stress: number; // 1-10
  recent_caffeine_mg: number;

  // Brewing details
  brew_temp_c: number;
  steep_time_sec: number;
  amount_oz: number;

  // Checkins
  checkins: EffectCheckins;

  // Overall assessment
  effectiveness: number; // 1-5
  would_repeat: boolean;
  notes?: string;
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface EffectCheckins {
  '15'?: CheckinData;
  '60'?: CheckinData;
  '180'?: CheckinData;
}

export interface CheckinData {
  energy: number; // 1-10
  focus: number; // 1-10
  mood: number; // 1-10
  stress: number; // 1-10
  effects_felt: string[]; // ['alert', 'calm', 'focused']
  notes?: string;
}

export interface PersonalEffectProfile {
  id: number;
  user_id: string;
  tea_id: number;
  effect_id: number;
  avg_intensity: number;
  avg_onset_minutes: number;
  avg_duration_minutes: number;
  sample_size: number;
  last_updated: Date;
}

// ============================================
// RAG SYSTEM
// ============================================

export interface TeaKnowledge {
  id: number;
  content: string;
  embedding: number[];
  metadata: KnowledgeMetadata;
  created_at: Date;
}

export interface KnowledgeMetadata {
  source?: string;
  tea_type?: string;
  compound?: string;
  effect?: string;
  url?: string;
  title?: string;
  category?: string;
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

export interface RecommendationRequest {
  desired_effect: string;
  intensity_needed: number; // 1-5
  time_available?: number; // minutes
  time_of_day: TimeOfDay;
  recent_caffeine?: number; // mg
  sensitivities?: string[];
  preferences?: {
    taste?: 'light' | 'medium' | 'bold';
    temperature?: 'hot' | 'iced' | 'either';
    max_caffeine?: number;
  };
}

export interface TeaRecommendation {
  tea: Tea;
  reasoning: string;
  brewing_method: BrewingParams;
  expected_effects: EffectProfile[];
  timing_advice: string;
  alternatives: Tea[];
  compound_breakdown: CompoundBreakdown;
}

export interface BrewingParams {
  temperature_c: number;
  steep_time_sec: number;
  amount_g: number;
  water_ml: number;
  instructions?: string;
}

export interface EffectProfile {
  effect: Effect;
  intensity: number; // 1-5
  onset_minutes: number;
  duration_minutes: number;
}

export interface CompoundBreakdown {
  caffeine_mg: number;
  l_theanine_mg: number;
  catechins_mg?: number;
  other: Record<string, number>;
}

export interface BlendCreationRequest {
  target_effects: string[];
  avoid_effects?: string[];
  max_caffeine_mg?: number;
  flavor_profile?: string[];
  budget_per_cup?: number;
  user_inventory?: number[]; // tea_ids user has
}

export interface BlendCreationResponse {
  blend: Blend;
  components: BlendComponent[];
  predicted_effects: EffectProfile[];
  total_compounds: CompoundBreakdown;
  cost_per_cup: number;
  brewing_instructions: string;
  ai_reasoning: string;
}

export interface RAGQueryRequest {
  query: string;
  filters?: {
    tea_type?: string;
    effect?: string;
    compound?: string;
  };
  limit?: number;
}

export interface RAGQueryResponse {
  answer: string;
  sources: RAGSource[];
  confidence: number;
}

export interface RAGSource {
  content: string;
  metadata: KnowledgeMetadata;
  similarity: number;
}

// ============================================
// UTILITY TYPES
// ============================================

export interface TeaWithDetails extends Tea {
  compounds: Array<Compound & { amount_mg: number }>;
  effects: Array<Effect & TeaEffect>;
  avg_rating?: number;
  user_logs_count?: number;
}

export interface UserIntent {
  desired_effect: EffectType;
  intensity_needed: number;
  context: {
    time_of_day: TimeOfDay;
    recent_caffeine: number;
    energy_level: number;
    stress_level: number;
  };
  constraints: {
    max_caffeine?: number;
    avoided_ingredients?: string[];
    budget?: number;
  };
}

export interface AIPromptContext {
  user_state: {
    baseline_energy: number;
    baseline_focus: number;
    baseline_mood: number;
    recent_caffeine: number;
    time_of_day: TimeOfDay;
  };
  available_teas: TeaWithDetails[];
  rag_context: string;
  user_history?: PersonalEffectProfile[];
}
