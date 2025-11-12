-- ============================================
-- TEA EFFECTS APP - INITIAL SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgvector for RAG
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- USERS TABLE
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(200),
  password_hash VARCHAR(255),
  preferences JSONB DEFAULT '{}',
  sensitivities TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- CORE TEA DATA
-- ============================================

CREATE TABLE teas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL, -- green, black, oolong, herbal, white, pu-erh
  origin VARCHAR(100),
  description TEXT,
  price_per_oz DECIMAL(6,2),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_teas_type ON teas(type);
CREATE INDEX idx_teas_name ON teas(name);

CREATE TABLE compounds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  chemical_formula VARCHAR(50),
  mechanism TEXT,
  half_life_minutes INTEGER,
  safe_daily_limit_mg DECIMAL(8,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tea_compounds (
  id SERIAL PRIMARY KEY,
  tea_id INTEGER REFERENCES teas(id) ON DELETE CASCADE,
  compound_id INTEGER REFERENCES compounds(id),
  amount_mg_per_cup DECIMAL(6,2),
  optimal_extraction_temp_c INTEGER,
  optimal_steep_time_sec INTEGER,
  UNIQUE(tea_id, compound_id)
);

CREATE INDEX idx_tea_compounds_tea_id ON tea_compounds(tea_id);
CREATE INDEX idx_tea_compounds_compound_id ON tea_compounds(compound_id);

-- ============================================
-- EFFECTS SYSTEM
-- ============================================

CREATE TABLE effects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL, -- mental, physical, emotional
  description TEXT,
  icon VARCHAR(50)
);

CREATE TABLE tea_effects (
  id SERIAL PRIMARY KEY,
  tea_id INTEGER REFERENCES teas(id) ON DELETE CASCADE,
  effect_id INTEGER REFERENCES effects(id),
  intensity INTEGER CHECK (intensity BETWEEN 1 AND 5),
  onset_minutes INTEGER,
  duration_minutes INTEGER,
  confidence_score DECIMAL(3,2) CHECK (confidence_score BETWEEN 0 AND 1),
  data_source VARCHAR(50), -- 'research', 'user_reported', 'ai_inferred'
  UNIQUE(tea_id, effect_id)
);

CREATE INDEX idx_tea_effects_tea_id ON tea_effects(tea_id);
CREATE INDEX idx_tea_effects_effect_id ON tea_effects(effect_id);
CREATE INDEX idx_tea_effects_intensity ON tea_effects(intensity DESC);

CREATE TABLE compound_effects (
  id SERIAL PRIMARY KEY,
  compound_id INTEGER REFERENCES compounds(id),
  effect_id INTEGER REFERENCES effects(id),
  potency INTEGER CHECK (potency BETWEEN 1 AND 5),
  research_citations TEXT[],
  UNIQUE(compound_id, effect_id)
);

-- ============================================
-- BLENDING SYSTEM
-- ============================================

CREATE TABLE blends (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  target_effects INTEGER[], -- array of effect_ids
  is_public BOOLEAN DEFAULT false,
  times_favorited INTEGER DEFAULT 0,
  avg_rating DECIMAL(2,1),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_blends_user_id ON blends(user_id);
CREATE INDEX idx_blends_public ON blends(is_public) WHERE is_public = true;

CREATE TABLE blend_components (
  id SERIAL PRIMARY KEY,
  blend_id INTEGER REFERENCES blends(id) ON DELETE CASCADE,
  tea_id INTEGER REFERENCES teas(id),
  ratio DECIMAL(5,2) CHECK (ratio BETWEEN 0 AND 100),
  steep_time_sec INTEGER,
  steep_temp_c INTEGER,
  notes TEXT,
  order_added INTEGER -- for sequential steeping
);

CREATE INDEX idx_blend_components_blend_id ON blend_components(blend_id);

CREATE TABLE blend_predicted_effects (
  id SERIAL PRIMARY KEY,
  blend_id INTEGER REFERENCES blends(id) ON DELETE CASCADE,
  effect_id INTEGER REFERENCES effects(id),
  predicted_intensity INTEGER CHECK (predicted_intensity BETWEEN 1 AND 5),
  total_compound_mg JSONB,
  calculated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- USER TRACKING & PERSONALIZATION
-- ============================================

CREATE TABLE effect_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tea_id INTEGER REFERENCES teas(id),
  blend_id INTEGER REFERENCES blends(id),

  -- Pre-consumption state
  logged_at TIMESTAMP DEFAULT NOW(),
  time_of_day VARCHAR(20),
  baseline_energy INTEGER CHECK (baseline_energy BETWEEN 1 AND 10),
  baseline_focus INTEGER CHECK (baseline_focus BETWEEN 1 AND 10),
  baseline_mood INTEGER CHECK (baseline_mood BETWEEN 1 AND 10),
  baseline_stress INTEGER CHECK (baseline_stress BETWEEN 1 AND 10),
  recent_caffeine_mg DECIMAL(6,2),

  -- Brewing details
  brew_temp_c INTEGER,
  steep_time_sec INTEGER,
  amount_oz DECIMAL(4,1),

  -- Post-consumption tracking
  checkins JSONB,

  -- Overall rating
  effectiveness INTEGER CHECK (effectiveness BETWEEN 1 AND 5),
  would_repeat BOOLEAN,
  notes TEXT
);

CREATE INDEX idx_effect_logs_user_id ON effect_logs(user_id);
CREATE INDEX idx_effect_logs_logged_at ON effect_logs(logged_at DESC);
CREATE INDEX idx_effect_logs_tea_id ON effect_logs(tea_id);

CREATE TABLE personal_effect_profiles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tea_id INTEGER REFERENCES teas(id),
  effect_id INTEGER REFERENCES effects(id),

  -- Calculated from effect_logs
  avg_intensity DECIMAL(3,1),
  avg_onset_minutes INTEGER,
  avg_duration_minutes INTEGER,
  sample_size INTEGER,
  last_updated TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, tea_id, effect_id)
);

-- ============================================
-- RAG / VECTOR STORE
-- ============================================

CREATE TABLE tea_knowledge_base (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536), -- Mistral embedding dimension
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create vector similarity index
CREATE INDEX ON tea_knowledge_base
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Metadata index for filtering
CREATE INDEX ON tea_knowledge_base USING gin(metadata);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blends_updated_at BEFORE UPDATE ON blends
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blends ENABLE ROW LEVEL SECURITY;
ALTER TABLE effect_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_effect_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_policy ON users
    FOR ALL
    USING (auth.uid() = id);

-- Users can see public blends and their own blends
CREATE POLICY blends_select_policy ON blends
    FOR SELECT
    USING (is_public = true OR user_id = auth.uid());

-- Users can only modify their own blends
CREATE POLICY blends_modify_policy ON blends
    FOR ALL
    USING (user_id = auth.uid());

-- Users can only see their own effect logs
CREATE POLICY effect_logs_policy ON effect_logs
    FOR ALL
    USING (user_id = auth.uid());

-- Users can only see their own personal effect profiles
CREATE POLICY personal_effect_profiles_policy ON personal_effect_profiles
    FOR ALL
    USING (user_id = auth.uid());

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Public tables (read-only for authenticated users)
GRANT SELECT ON teas, compounds, tea_compounds, effects, tea_effects, compound_effects TO authenticated;

-- User-specific tables
GRANT ALL ON users, blends, blend_components, blend_predicted_effects, effect_logs, personal_effect_profiles TO authenticated;

-- RAG table (read for authenticated, write for service role only)
GRANT SELECT ON tea_knowledge_base TO authenticated;

COMMENT ON TABLE teas IS 'Comprehensive tea database with types and origins';
COMMENT ON TABLE compounds IS 'Chemical compounds found in teas (caffeine, L-theanine, etc.)';
COMMENT ON TABLE effects IS 'Possible effects from tea consumption';
COMMENT ON TABLE blends IS 'User-created custom tea blends';
COMMENT ON TABLE effect_logs IS 'User tracking of tea effects over time';
COMMENT ON TABLE tea_knowledge_base IS 'RAG vector store for tea knowledge retrieval';
