# Tea Database Comprehensive Expansion Plan

**Project:** Tea Effects App - PWA
**Goal:** Expand from 20 teas to 100+ with comprehensive research
**Timeline:** 30-40 hours
**Status:** ⏳ Awaiting Implementation
**Created:** November 15, 2025

---

## 📑 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Expansion Scope](#expansion-scope)
3. [CODEX Review Checkpoints](#codex-review-checkpoints)
4. [Phase 0: Research & Dataset Acquisition](#phase-0-research--dataset-acquisition)
5. [Phase 1: Comprehensive Audit & Schema Analysis](#phase-1-comprehensive-audit--schema-analysis)
6. [Phase 2: Comprehensive Tea Database Design](#phase-2-comprehensive-tea-database-design)
7. [Phase 3: Comprehensive RAG Research Sources](#phase-3-comprehensive-rag-research-sources)
8. [Phase 4: Prep Local Tooling](#phase-4-prep-local-tooling)
9. [Phase 5: Database Preparation](#phase-5-database-preparation)
10. [Phase 6: Data Ingestion (The Big Seed)](#phase-6-data-ingestion-the-big-seed)
11. [Phase 7: Verification & Testing](#phase-7-verification--testing)
12. [Phase 8: Production Deployment](#phase-8-production-deployment)
13. [Expected Results Summary](#expected-results-summary)
14. [Risks & Mitigation](#risks--mitigation)
15. [Files Created/Modified](#files-createdmodified)
16. [Timeline & Estimates](#timeline--estimates)
17. [Approval Checklist](#approval-checklist)

---

## Executive Summary

This plan outlines the expansion of the Tea Effects App database from 20 teas to 100+ teas, including:

- **80+ new teas** across all categories (green, black, oolong, pu-erh, white, herbal, specialty)
- **35+ new compounds** with detailed mechanisms and research
- **17+ new effects** with measurement protocols
- **23+ RAG research sources** totaling ~70,000 words

### Current State
- ✅ Teas: 20
- ✅ Compounds: ~15
- ✅ Effects: ~18
- ✅ RAG Sources: 1 (~3,000 words)
- ✅ Database size: ~2 MB
- ✅ Production: Live at https://frontend-five-inky-30.vercel.app

### Proposed State
- 🎯 Teas: 100+
- 🎯 Compounds: 50+
- 🎯 Effects: 35+
- 🎯 RAG Sources: 24 (~70,000+ words)
- 🎯 Database size: ~10-15 MB
- 🎯 No performance degradation

### Success Criteria
- All data successfully seeded
- RAG queries return relevant results
- Frontend displays all teas correctly
- Production deployment successful
- No regressions in existing functionality

---

## Expansion Scope

### Themes Covered
- ✅ Cognitive Enhancement (memory, focus, clarity)
- ✅ Energy & Performance (sustained energy, physical endurance)
- ✅ Relaxation & Mood (stress relief, sleep, meditation)
- ✅ Health & Wellness (antioxidants, immunity, cardiovascular)
- ✅ Tea Science & Processing (origin, production methods)

### Data Quality Standards
- Scientific research citations for all compounds
- Peer-reviewed studies for effects
- Traditional knowledge validation
- Detailed brewing protocols
- Safety information and contraindications

---

## CODEX Review Checkpoints

### 🔍 Checkpoint #1: Data Sources & Methodology
**Phase:** After Phase 0
**Purpose:** Validate data sources and tea selection list
**Required Approval:** ✅ Yes

**Deliverables:**
- Tea selection list (100+ teas by category)
- Research source references (PubMed, TCM databases, institutes)
- Data collection methodology document

**Review Questions:**
- Are data sources credible and scientific?
- Is tea selection comprehensive and diverse?
- Does methodology ensure quality and accuracy?

**Status:** ⏳ Pending

---

### 🔍 Checkpoint #2: Complete Audit
**Phase:** After Phase 1
**Purpose:** Verify understanding of system limits and constraints
**Required Approval:** ✅ Yes

**Deliverables:**
- `TEA_DATABASE_AUDIT_COMPLETE.md`
- Schema documentation
- Constraint analysis
- Capacity assessment

**Review Questions:**
- Is schema understanding correct?
- Are batch limits documented?
- Is expansion within system capacity?

**Status:** ⏳ Pending

---

### 🔍 Checkpoint #3: Data Design
**Phase:** After Phase 2
**Purpose:** Validate all tea, compound, and effect data
**Required Approval:** ✅ Yes

**Deliverables:**
- Complete tea list (100+) with all fields
- Complete compound list (50+) with mechanisms
- Complete effect list (35+) with protocols

**Review Questions:**
- Is scientific data accurate?
- Are compound mechanisms correct?
- Are effect protocols validated?
- Is brewing data within safe ranges?

**Status:** ⏳ Pending

---

### 🔍 Checkpoint #4: RAG Content Sample
**Phase:** During Phase 3
**Purpose:** Ensure RAG quality before creating all 23 sources
**Required Approval:** ✅ Yes

**Deliverables:**
- 2-3 complete sample RAG documents
- Quality standard template
- Citation format examples

**Review Questions:**
- Is research depth sufficient?
- Are citations credible?
- Is writing clear and accurate?
- Does structure serve RAG queries well?

**Status:** ⏳ Pending

---

### 🔍 Checkpoint #5: Pre-Seed Safety
**Phase:** After Phase 5
**Purpose:** Confirm backup created and database ready
**Required Approval:** ✅ Yes

**Deliverables:**
- Database backup file
- Migration status confirmation
- Capacity verification

**Review Questions:**
- Is backup complete and tested?
- Are migrations applied?
- Is rollback plan clear?

**Status:** ⏳ Pending

---

### 🔍 Checkpoint #6: Verification Results
**Phase:** After Phase 7
**Purpose:** Confirm data integrity and functionality
**Required Approval:** ✅ Yes

**Deliverables:**
- SQL verification results
- API test results
- Frontend screenshots
- E2E test results

**Review Questions:**
- Do counts match expectations?
- Do APIs return correct data?
- Does frontend render properly?
- Do all tests pass?

**Status:** ⏳ Pending

---

### 🔍 Checkpoint #7: Production Ready (FINAL)
**Phase:** After Phase 8
**Purpose:** Final validation before going live
**Required Approval:** ✅ Yes

**Deliverables:**
- Production deployment confirmation
- Production test results
- Performance metrics
- Rollback plan

**Review Questions:**
- Is production fully functional?
- Are performance metrics acceptable?
- Is rollback tested and ready?

**Status:** ⏳ Pending

---

## Phase 0: Research & Dataset Acquisition

### Objectives
- Identify credible scientific tea databases
- Create comprehensive tea selection list (100+)
- Document all research sources
- Establish data collection methodology

### Actions

#### A. Scientific Data Sources

**Tea Chemistry Databases:**
- PubMed Central (tea compound research)
- Google Scholar (peer-reviewed studies)
- ScienceDirect (phytochemistry journals)
- ResearchGate (researcher publications)

**Traditional Medicine:**
- Traditional Chinese Medicine Database
- Kampo Medicine Archives (Japanese)
- Ayurvedic Tea Research

**Tea Institutes:**
- Uji Tea Research Center (Japan)
- Tea Research Institute (China)
- Tocklai Tea Research Institute (India)
- Tea Research Foundation of Kenya

**Compound Libraries:**
- USDA Phytochemical Database
- ChemSpider
- PubChem
- Phenol-Explorer

#### B. Tea Selection Strategy

**Selection Criteria:**
1. Scientific research available
2. Unique compound profiles
3. Distinct effects
4. Cultural/historical significance
5. Commercial availability

**Categories to Expand:**

##### Green Teas (Add 15)
- Longjing (Dragon Well) - Various grades
- Biluochun (Green Spiral Spring)
- Huangshan Maofeng
- Lu An Gua Pian (Melon Seed)
- Anji Bai Cha (White Leaf)
- Gyokuro (Shade-grown)
- Fukamushi Sencha (Deep-steamed)
- Genmaicha (with roasted rice)
- Hojicha (Roasted green)
- Kukicha (Twig tea)
- Korean Sejak
- Moroccan Mint blend
- Vietnamese Green
- Nepalese Green
- Darjeeling Green First Flush

##### Black Teas (Add 20)
**Chinese:**
- Keemun Mao Feng
- Lapsang Souchong (Pine-smoked)
- Dian Hong (Yunnan Gold)
- Jin Jun Mei (Golden Eyebrow)
- Zheng Shan Xiao Zhong

**Indian:**
- Assam TGFOP
- Darjeeling Second Flush
- Nilgiri
- Kangra Valley

**Ceylon:**
- Nuwara Eliya (High-grown)
- Uva Province
- Dimbula

**Other Origins:**
- Kenyan Black (CTC)
- Rwanda Black
- Turkish Rize
- Nepal Orthodox
- Vietnamese Black
- Georgian Kakhetian
- Japanese Wakoucha

##### Oolong Teas (Add 12)
**Wuyi Rock Oolongs:**
- Rou Gui (Cinnamon)
- Da Hong Pao (Big Red Robe)
- Shui Jin Gui (Golden Water Turtle)
- Bai Ji Guan (White Cockscomb)

**Phoenix Dan Cong (5 varieties):**
- Mi Lan Xiang (Honey Orchid)
- Ya Shi Xiang (Duck Shit Fragrance)
- Huang Zhi Xiang (Orange Blossom)
- Gui Hua Xiang (Osmanthus)
- Xing Ren Xiang (Almond)

**Taiwanese:**
- Oriental Beauty (Bai Hao)
- GABA Oolong
- Jin Xuan (Milk Oolong - authentic)

##### Pu-erh Teas (Add 10)
**Sheng (Raw):**
- Young Sheng (1-3 years)
- Mid-aged Sheng (5-10 years)
- Aged Sheng (15+ years)
- Ancient Tree Sheng
- Yiwu Mountain Sheng

**Shou (Ripe):**
- Premium Shou
- Lotus Leaf Shou
- Aged Shou (10+ years)
- Menghai Shou
- Xiaguan Shou

##### White Teas (Add 8)
- Silver Needle (Bai Hao Yin Zhen) - Premium
- White Peony (Bai Mu Dan)
- Tribute Eyebrow (Gong Mei)
- Long Life Eyebrow (Shou Mei)
- Moonlight White (Yue Guang Bai)
- Aged White (3-5 years)
- Aged White (10+ years)
- Fujian White Blend

##### Herbal & Tisanes (Add 15)
**Cognitive:**
- Ginkgo Biloba
- Gotu Kola (Centella Asiatica)
- Bacopa Monnieri
- Lion's Mane Mushroom
- Rhodiola Rosea

**Relaxation:**
- Valerian Root
- Passionflower
- Lemon Balm
- Skullcap
- Ashwagandha

**Energy:**
- Yerba Mate
- Guayusa
- Guarana blend
- Eleuthero (Siberian Ginseng)
- Korean Ginseng

##### Specialty Blends (Add 10)
- Earl Grey (Bergamot variants)
- English Breakfast
- Irish Breakfast
- Russian Caravan
- Masala Chai (authentic)
- Thai Iced Tea blend
- Moroccan Mint
- Genmaicha Matcha
- Butterfly Pea Flower
- Chrysanthemum Pu-erh

#### C. Compound Research

**New Compounds to Add (35+):**

**Catechins (7):**
- EGCG (expanded data)
- EGC
- ECG
- EC
- Theaflavins
- Thearubigins
- Procyanidins

**Amino Acids (4):**
- L-Theanine (expanded)
- GABA
- Arginine
- Glutamine

**Alkaloids (3):**
- Caffeine (expanded)
- Theobromine
- Theophylline

**Flavonoids (4):**
- Quercetin
- Kaempferol
- Myricetin
- Rutin

**Terpenoids (3):**
- Linalool
- Geraniol
- Alpha-terpineol

**Herbal Compounds (14):**
- Ginkgolides A, B, C
- Bilobalide
- Asiaticoside
- Bacosides A & B
- Hericenones
- Erinacines
- Salidroside
- Valerenic Acid
- Withanolides
- Mateine
- Guaranine
- Eleutherosides

#### D. Effect Research

**New Effects (17+):**

**Cognitive (8):**
- memory_enhancement
- working_memory
- long_term_memory
- neuroplasticity
- neuroprotection
- learning_speed
- information_processing
- mental_stamina

**Physical (6):**
- physical_endurance
- muscle_recovery
- metabolic_boost
- thermogenesis
- appetite_regulation
- digestive_health

**Emotional (3):**
- anxiety_reduction
- depression_relief
- emotional_stability

### Deliverables

**Document to Create:**
`TEA_EXPANSION_STRATEGY.md`

**Contents:**
```markdown
# Tea Database Expansion Strategy

## Research Sources
[List of all databases and institutes]

## Tea Selection (100+ teas)
[Complete list with categories]

## Compound Selection (50+ compounds)
[Complete list with categories]

## Effect Selection (35+ effects)
[Complete list with categories]

## Data Collection Methodology
[How data will be gathered and validated]

## Quality Assurance
[How accuracy will be ensured]
```

### 🔍 CODEX REVIEW CHECKPOINT #1
**You review this deliverable before proceeding to Phase 1**

---

## Phase 1: Comprehensive Audit & Schema Analysis

### Objectives
- Understand current database schema completely
- Document all constraints and limits
- Verify expansion capacity
- Identify potential issues

### Actions

#### A. Schema Deep Dive

**Files to Read:**

1. **Tea JSON Files:**
   ```bash
   packages/api/data/teas/green-teas.json
   packages/api/data/teas/oolong-teas.json
   packages/api/data/teas/pu-erh-teas.json
   packages/api/data/teas/herbal-teas.json
   ```

2. **Master Lists:**
   ```bash
   packages/api/data/compounds/compounds.json
   packages/api/data/effects/effects.json
   ```

3. **Seed Script:**
   ```bash
   packages/api/src/scripts/seed-all.ts
   ```

4. **RAG Service:**
   ```bash
   packages/api/src/services/rag/RAGService.ts
   ```

5. **Database Migrations:**
   ```bash
   supabase/migrations/001_initial_schema.sql
   supabase/migrations/002_vector_search_function.sql
   ```

#### B. Schema Documentation

**For Each Tea:**
```json
{
  "name": "string (required, unique)",
  "type": "green|black|oolong|pu-erh|white|herbal (required)",
  "origin": "string (optional)",
  "description": "string (optional)",
  "price_per_oz": "number (optional, >= 0)",
  "compounds": {
    "compound_name": "number (mg per cup, > 0)"
  },
  "brewing": {
    "temp_c": "number (60-100)",
    "time_sec": "number (30-600)",
    "amount_g": "number (1-10)"
  },
  "effects": [
    {
      "effect": "string (must exist in effects.json)",
      "intensity": "number (1-5)",
      "onset_minutes": "number (5-120)",
      "duration_minutes": "number (60-480)"
    }
  ]
}
```

**For Each Compound:**
```json
{
  "name": "string (required, unique)",
  "chemical_formula": "string (optional)",
  "category": "catechin|alkaloid|flavonoid|etc",
  "mechanism": "string (optional)",
  "half_life_minutes": "number (optional)",
  "safe_daily_limit_mg": "number (optional)",
  "bioavailability": "string (optional)",
  "synergies": ["array of compound names"],
  "contraindications": ["array of strings"],
  "research_citations": ["array of URLs/DOIs"]
}
```

**For Each Effect:**
```json
{
  "name": "string (required, unique)",
  "category": "cognitive|physical|emotional|spiritual",
  "description": "string (optional)",
  "icon": "string (optional)",
  "onset_range_min": "number (minutes)",
  "onset_range_max": "number (minutes)",
  "duration_range_min": "number (minutes)",
  "duration_range_max": "number (minutes)",
  "intensity_scale": "string",
  "measurement_protocol": "string",
  "research_support": "strong|moderate|preliminary",
  "citations": ["array of references"]
}
```

#### C. Constraint Analysis

**Database Constraints:**
- FK relationships: compounds → tea_compounds → teas
- FK relationships: effects → tea_effects → teas
- Unique constraints: tea names, compound names, effect names
- Check constraints: intensity (1-5), temperatures (60-100°C), etc.
- Index structures: Performance implications

**Seeding Order:**
1. Compounds first (no FK dependencies)
2. Effects second (no FK dependencies)
3. Teas third (references compounds & effects)
4. RAG last (references tea names)

**Batch Limits:**
- Supabase: No hard limit, but recommend batches of 100
- Ollama embeddings: Rate limit ~10/second
- Transaction timeout: Default 10 seconds

#### D. Capacity Assessment

**Current:**
- Teas: 20 (well below limits)
- Compounds: ~15 (room for 100+)
- Effects: ~18 (room for 50+)
- RAG vectors: ~30 (room for 10,000+)

**After Expansion:**
- Teas: 100 (still well below limits)
- Compounds: 50 (safe)
- Effects: 35 (safe)
- RAG vectors: ~400 (safe)

**Storage:**
- Current: ~2 MB
- After: ~10-15 MB
- Supabase free tier: 500 MB (plenty of room)

### Deliverables

**Document to Create:**
`TEA_DATABASE_AUDIT_COMPLETE.md`

### 🔍 CODEX REVIEW CHECKPOINT #2
**You review this deliverable before proceeding to Phase 2**

---

## Phase 2: Comprehensive Tea Database Design

**Note:** This phase involves creating 100+ tea entries with complete data. Each tea requires:
- Name, type, origin, description
- Compound breakdown (3-8 compounds per tea)
- Brewing parameters (temp, time, amount)
- Effects (3-6 effects per tea with intensity, onset, duration)
- Price information

### Tea Data Structure Template

```json
{
  "name": "Tea Name",
  "type": "category",
  "origin": "Region, Country",
  "description": "Detailed description with key compounds and effects",
  "price_per_oz": 0.00,
  "compounds": {
    "caffeine": 0,
    "l-theanine": 0
  },
  "brewing": {
    "temp_c": 75,
    "time_sec": 180,
    "amount_g": 3
  },
  "effects": [
    {
      "effect": "effect_name",
      "intensity": 3,
      "onset_minutes": 20,
      "duration_minutes": 180
    }
  ]
}
```

### Files to Create/Expand

1. **Expand:** `packages/api/data/teas/green-teas.json` (+15 teas)
2. **Expand:** `packages/api/data/teas/oolong-teas.json` (+12 teas)
3. **Expand:** `packages/api/data/teas/pu-erh-teas.json` (+10 teas)
4. **Expand:** `packages/api/data/teas/herbal-teas.json` (+15 teas)
5. **Create:** `packages/api/data/teas/black-teas.json` (20 teas)
6. **Create:** `packages/api/data/teas/white-teas.json` (8 teas)
7. **Create:** `packages/api/data/teas/specialty-blends.json` (10 teas)

8. **Expand:** `packages/api/data/compounds/compounds.json` (+35 compounds)
9. **Expand:** `packages/api/data/effects/effects.json` (+17 effects)

### 🔍 CODEX REVIEW CHECKPOINT #3
**You review all tea/compound/effect data before proceeding to Phase 3**

---

## Phase 3: Comprehensive RAG Research Sources

### Objectives
- Create 23+ comprehensive research documents
- Total ~70,000 words of research-backed content
- Include 100+ scientific citations
- Structure for optimal RAG query performance

### RAG Document Structure Template

```markdown
# [Title]

## Executive Summary
- Key compounds
- Primary effects
- Best teas for this purpose
- Quick recommendations

## Scientific Background
- Detailed mechanisms
- Biochemical pathways
- Neuroscience/physiology

## Compound Profiles
- Individual compound analysis
- Synergistic interactions
- Dosage considerations

## Tea Recommendations
- Ranked by effectiveness
- Brewing protocols
- Timing recommendations
- Contraindications

## Practical Protocols
- Daily routines
- Optimization strategies
- Combination approaches

## Research Citations
- PubMed links
- DOI references
- Clinical trial data
- Meta-analyses

## Related Topics
- Cross-references to other documents
```

### Documents to Create (23 total)

#### Cognitive Enhancement Series (5 docs)
1. `memory-enhancement-complete.md` (~5000 words)
2. `focus-concentration-guide.md` (~4000 words)
3. `mental-clarity-protocols.md` (~3500 words)
4. `neuroprotection-longevity.md` (~4500 words)
5. `learning-performance.md` (~3000 words)

#### Energy & Performance Series (4 docs)
6. `sustained-energy-guide.md` (~3500 words)
7. `physical-performance-teas.md` (~3000 words)
8. `metabolic-optimization.md` (~3500 words)
9. `anti-fatigue-protocols.md` (~2500 words)

#### Relaxation & Mood Series (4 docs)
10. `stress-relief-complete.md` (~4000 words)
11. `sleep-optimization.md` (~3500 words)
12. `mood-enhancement.md` (~3000 words)
13. `meditation-spiritual.md` (~2500 words)

#### Health & Wellness Series (4 docs)
14. `antioxidant-complete-guide.md` (~4000 words)
15. `immune-system-support.md` (~3000 words)
16. `digestive-health-teas.md` (~2500 words)
17. `cardiovascular-health.md` (~3500 words)

#### Tea Science & Processing Series (6 docs)
18. `green-tea-science.md` (~4000 words)
19. `black-tea-complete.md` (~4000 words)
20. `oolong-art-science.md` (~3500 words)
21. `pu-erh-fermentation.md` (~3500 words)
22. `white-tea-antioxidants.md` (~2500 words)
23. `herbal-tea-pharmacology.md` (~4000 words)

**Total:** ~79,000 words across 23 documents

### 🔍 CODEX REVIEW CHECKPOINT #4
**You review 2-3 sample RAG documents before creating all 23**

---

## Phase 4: Prep Local Tooling

### Actions

#### A. Environment Verification

```bash
# Check environment variables
cat packages/api/.env | grep -E "SUPABASE_URL|SUPABASE_SERVICE_KEY|OLLAMA_URL"

# Verify Supabase connection
curl https://rstknxmtpxpigdobegfy.supabase.co/rest/v1/ \
  -H "apikey: ${SUPABASE_ANON_KEY}"

# Check Ollama status
ollama list

# Pull mistral if needed
ollama pull mistral

# Verify Ollama running
curl http://localhost:11434/api/tags
```

#### B. Install Dependencies

```bash
# From repo root
npm install

# Verify API dependencies
cd packages/api && npm list @supabase/supabase-js

# Verify frontend dependencies
cd packages/frontend && npm list
```

#### C. Create Enhanced Seed Script

**New file:** `packages/api/src/scripts/seed-batch.ts`

Purpose: Handle large dataset with batch processing, transactions, progress logging.

#### D. Create Validation Script

**New file:** `packages/api/src/scripts/validate-tea-data.ts`

Purpose: Validate all JSON before seeding (required fields, FK references, value ranges).

#### E. Fix RAG Bug

**File:** `packages/api/src/routes/rag.ts`
**Line 7:** Change `_req` to `req`

---

## Phase 5: Database Preparation

### Actions

#### A. Create Backup

```bash
# Full database dump
npx supabase db dump > backups/pre-expansion-$(date +%Y%m%d-%H%M%S).sql

# Verify backup
ls -lh backups/
```

#### B. Check Database Capacity

```sql
-- Check current table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check vector storage
SELECT COUNT(*) FROM tea_knowledge_base;
```

#### C. Apply Migrations

```bash
# Check migration status
npx supabase migration list

# Apply pending migrations
npx supabase db push

# Verify schema
npx supabase db diff
```

### 🔍 CODEX REVIEW CHECKPOINT #5
**You confirm backup created and database ready**

---

## Phase 6: Data Ingestion (The Big Seed)

### Actions

#### A. Validation First

```bash
# Validate all JSON files
npm run validate:teas
```

#### B. Dry Run

```bash
# Test without committing
npm run seed -- --dry-run
```

#### C. Actual Seeding

```bash
# Start API server for Ollama
cd packages/api && npm run dev &

# Run full seed
npm run seed
```

### Expected Output

```
🧪 Seeding compounds...
✓ Inserted 50 compounds

🎯 Seeding effects...
✓ Inserted 35 effects

🍵 Seeding teas...
✓ Batch 1/1: Inserted 100 teas

📚 Seeding RAG knowledge base...
✓ Processing memory-enhancement-complete.md...
  - Created 15 chunks
  - Generated 15 embeddings
[... continues for all 24 files ...]
✓ RAG seeding complete: 350 chunks embedded

🎉 Seeding completed successfully!
```

---

## Phase 7: Verification & Testing

### A. SQL Verification

```sql
-- Check total counts
SELECT 'compounds' as table, COUNT(*) FROM compounds
UNION ALL
SELECT 'effects', COUNT(*) FROM effects
UNION ALL
SELECT 'teas', COUNT(*) FROM teas
UNION ALL
SELECT 'tea_knowledge_base', COUNT(*) FROM tea_knowledge_base;

-- Verify new teas
SELECT name, type, origin
FROM teas
ORDER BY created_at DESC
LIMIT 20;
```

### B. API Testing

```bash
# Test teas API
curl http://localhost:3001/api/teas | jq '.teas | length'

# Test RAG queries
curl -X POST http://localhost:3001/rag/query \
  -H 'Content-Type: application/json' \
  -d '{"query":"Which teas are best for memory?"}' \
  | jq '.sources | length'
```

### C. Frontend Verification

```bash
# Start frontend
cd packages/frontend && npm run dev

# Visit pages
open http://localhost:3000/teas
open http://localhost:3000/effects
open http://localhost:3000/blends
```

### D. E2E Testing

```bash
# Run Playwright tests
npx playwright test e2e/production.spec.ts
```

### 🔍 CODEX REVIEW CHECKPOINT #6
**You review all verification results**

---

## Phase 8: Production Deployment

### Actions

#### A. Production Database Reseed

Choose one method:
1. Via Supabase SQL Editor
2. Via API endpoint
3. Via direct psql connection

#### B. Commit & Push

```bash
git add packages/api/data/
git add packages/api/src/routes/rag.ts
git add packages/api/src/scripts/

git commit -m "feat: Comprehensive tea database expansion with 80+ teas

- Added 100+ teas across 7 categories
- Added 35+ compounds with mechanisms
- Added 17+ effects with protocols
- Added 23 RAG research sources (~70,000 words)
- Fixed RAG route bug

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin main
```

#### C. Vercel Deployment

```bash
# Wait for deployment
sleep 120

# Test production
./test-production.sh
```

#### D. Production Verification

```bash
# Test production API
curl https://frontend-five-inky-30.vercel.app/api/teas | jq '.teas | length'
```

### 🔍 CODEX REVIEW CHECKPOINT #7 (FINAL)
**You review production deployment**

---

## Expected Results Summary

### Metrics Comparison

| Metric | Before | After | Growth |
|--------|--------|-------|--------|
| **Teas** | 20 | 100+ | 5x |
| **Compounds** | ~15 | 50+ | 3.3x |
| **Effects** | ~18 | 35+ | 1.9x |
| **RAG Sources** | 1 | 24 | 24x |
| **RAG Content** | 3,000 words | 70,000+ words | 23x |
| **Database Size** | 2 MB | 10-15 MB | 5-7x |

---

## Risks & Mitigation

| Risk | Impact | Mitigation | Recovery |
|------|--------|------------|----------|
| Seed script fails | High | Validation + dry-run | Restore backup |
| RAG embedding fails | Medium | Batch processing | Re-run RAG only |
| FK violations | High | Correct order | Fix JSON, re-run |
| Production downtime | Medium | Test locally first | Rollback |

---

## Files Created/Modified

### New Files (31+)
1. `TEA_EXPANSION_STRATEGY.md`
2. `TEA_DATABASE_AUDIT_COMPLETE.md`
3. `packages/api/data/teas/black-teas.json`
4. `packages/api/data/teas/white-teas.json`
5. `packages/api/data/teas/specialty-blends.json`
6-28. 23 RAG markdown files
29. `packages/api/src/scripts/seed-batch.ts`
30. `packages/api/src/scripts/validate-tea-data.ts`
31. `backups/pre-expansion-[timestamp].sql`

### Modified Files (7)
1. `packages/api/src/routes/rag.ts` (bug fix)
2. `packages/api/data/teas/green-teas.json` (+15)
3. `packages/api/data/teas/oolong-teas.json` (+12)
4. `packages/api/data/teas/pu-erh-teas.json` (+10)
5. `packages/api/data/teas/herbal-teas.json` (+15)
6. `packages/api/data/compounds/compounds.json` (+35)
7. `packages/api/data/effects/effects.json` (+17)

---

## Timeline & Estimates

| Phase | Time | Complexity |
|-------|------|------------|
| Phase 0 | 2-3h | Medium |
| Phase 1 | 1-2h | Low |
| Phase 2 | 8-10h | High |
| Phase 3 | 15-20h | Very High |
| Phase 4 | 1h | Low |
| Phase 5 | 30m | Low |
| Phase 6 | 1-2h | Medium |
| Phase 7 | 2-3h | Medium |
| Phase 8 | 1h | Medium |

**Total:** 30-40 hours

---

## Approval Checklist

### Phase 0: Research
- [ ] Data sources validated
- [ ] Tea selection list created
- [ ] **CODEX APPROVAL**

### Phase 1: Audit
- [ ] Schema documented
- [ ] Constraints mapped
- [ ] **CODEX APPROVAL**

### Phase 2: Design
- [ ] 100+ teas created
- [ ] 50+ compounds added
- [ ] **CODEX APPROVAL**

### Phase 3: RAG Content
- [ ] Sample docs reviewed
- [ ] All 23 docs created
- [ ] **CODEX APPROVAL**

### Phase 5: Database Ready
- [ ] Backup created
- [ ] Migrations applied
- [ ] **CODEX APPROVAL**

### Phase 7: Verification
- [ ] All tests passing
- [ ] **CODEX APPROVAL**

### Phase 8: Production
- [ ] Deployment successful
- [ ] **CODEX APPROVAL**

---

## Next Steps

1. ✅ Review and approve this plan
2. ⏳ Begin Phase 0
3. ⏳ Create `TEA_EXPANSION_STRATEGY.md`
4. ⏳ Execute phases sequentially with checkpoints

---

**Status:** ⏳ Awaiting Phase 0 Initiation
**Last Updated:** November 15, 2025
**Version:** 1.0
