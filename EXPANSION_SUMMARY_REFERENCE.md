# Tea Database Expansion - Quick Reference for Claude

**Purpose:** Quick reference to understand the expansion plan without reading the full 25KB document.

---

## 🎯 Mission Summary

**Transform:** 20 teas → 100+ teas with comprehensive research
**Timeline:** 30-40 hours
**Status:** Plan approved, awaiting execution

---

## 📊 Expansion Scope

### Before
- Teas: 20
- Compounds: 15
- Effects: 18
- RAG: 1 doc (3k words)
- DB Size: 2 MB

### After
- Teas: 100+
- Compounds: 50+
- Effects: 35+
- RAG: 24 docs (70k words)
- DB Size: 10-15 MB

### Growth
- 5x teas
- 3x compounds
- 2x effects
- 24x RAG content

---

## 🗺️ 8 Phases Overview

### Phase 0: Research (2-3h)
- Identify scientific data sources
- Create tea selection list (100+)
- Document methodology
- **Output:** TEA_EXPANSION_STRATEGY.md
- **Checkpoint #1**

### Phase 1: Audit (1-2h)
- Read all schema files
- Document constraints
- Verify capacity
- **Output:** TEA_DATABASE_AUDIT_COMPLETE.md
- **Checkpoint #2**

### Phase 2: Design (8-10h)
- Create 100+ tea JSON entries
- Create 50+ compound entries
- Create 35+ effect entries
- **Output:** All JSON data files
- **Checkpoint #3**

### Phase 3: RAG Content (15-20h)
- Create 23 research documents
- ~3000 words each
- 100+ citations total
- **Output:** 23 markdown files
- **Checkpoint #4** (after 2-3 samples)

### Phase 4: Tooling (1h)
- Verify environment
- Install deps
- Create validation script
- Fix RAG bug (_req → req)
- **Output:** Scripts + bug fix

### Phase 5: Database Prep (30m)
- Create backup
- Apply migrations
- Verify capacity
- **Output:** Backup SQL file
- **Checkpoint #5**

### Phase 6: Seeding (1-2h)
- Validate JSON
- Dry run
- Actual seed
- **Output:** Populated database

### Phase 7: Verification (2-3h)
- SQL verification
- API tests
- Frontend tests
- E2E tests
- **Output:** Test results
- **Checkpoint #6**

### Phase 8: Production (1h)
- Reseed production
- Commit & push
- Deploy to Vercel
- **Output:** Live production
- **Checkpoint #7** (FINAL)

---

## 🔍 7 Mandatory Checkpoints

**Must STOP and get approval at each:**

1. After Phase 0 - Strategy doc
2. After Phase 1 - Audit doc
3. After Phase 2 - All data design
4. During Phase 3 - Sample RAG docs
5. After Phase 5 - Pre-seed safety
6. After Phase 7 - Verification results
7. After Phase 8 - Production ready

---

## 📁 Files to Create (31 new)

### Documentation (3)
1. TEA_EXPANSION_STRATEGY.md
2. TEA_DATABASE_AUDIT_COMPLETE.md
3. backups/pre-expansion-[timestamp].sql

### Tea Data (3 new files)
4. packages/api/data/teas/black-teas.json (20 teas)
5. packages/api/data/teas/white-teas.json (8 teas)
6. packages/api/data/teas/specialty-blends.json (10 teas)

### RAG Sources (23 new files)
7-11. Cognitive Enhancement (5 docs)
12-15. Energy & Performance (4 docs)
16-19. Relaxation & Mood (4 docs)
20-23. Health & Wellness (4 docs)
24-29. Tea Science (6 docs)

### Scripts (2)
30. packages/api/src/scripts/seed-batch.ts
31. packages/api/src/scripts/validate-tea-data.ts

---

## 📁 Files to Modify (7)

1. packages/api/src/routes/rag.ts (bug: _req → req)
2. packages/api/data/teas/green-teas.json (+15 teas)
3. packages/api/data/teas/oolong-teas.json (+12 teas)
4. packages/api/data/teas/pu-erh-teas.json (+10 teas)
5. packages/api/data/teas/herbal-teas.json (+15 teas)
6. packages/api/data/compounds/compounds.json (+35 compounds)
7. packages/api/data/effects/effects.json (+17 effects)

---

## 🍵 New Teas Breakdown

### Green Teas (+15)
Longjing, Biluochun, Gyokuro, Sencha variants, Korean, Vietnamese, Nepalese

### Black Teas (+20 - NEW FILE)
Chinese: Keemun, Lapsang Souchong, Dian Hong, Jin Jun Mei
Indian: Assam, Darjeeling, Nilgiri
Ceylon: Nuwara Eliya, Uva, Dimbula
Others: Kenya, Rwanda, Turkey, Nepal, Vietnam, Georgia, Japan

### Oolong Teas (+12)
Wuyi: Rou Gui, Da Hong Pao
Phoenix Dan Cong: 5 varieties
Taiwanese: Oriental Beauty, GABA, Jin Xuan

### Pu-erh Teas (+10)
Sheng: Various ages (young to 15+ years)
Shou: Premium, aged, regional varieties

### White Teas (+8 - NEW FILE)
Silver Needle, White Peony, aged whites, regional varieties

### Herbal Teas (+15)
Cognitive: Ginkgo, Gotu Kola, Bacopa, Lion's Mane, Rhodiola
Relaxation: Valerian, Passionflower, Lemon Balm, Skullcap, Ashwagandha
Energy: Yerba Mate, Guayusa, Guarana, Eleuthero, Ginseng

### Specialty Blends (+10 - NEW FILE)
Earl Grey, English/Irish Breakfast, Russian Caravan, Masala Chai, Thai Tea, etc.

---

## 🧪 New Compounds (+35)

**Catechins:** EGCG, EGC, ECG, EC, Theaflavins, Thearubigins, Procyanidins

**Amino Acids:** L-Theanine, GABA, Arginine, Glutamine

**Alkaloids:** Caffeine, Theobromine, Theophylline

**Flavonoids:** Quercetin, Kaempferol, Myricetin, Rutin

**Terpenoids:** Linalool, Geraniol, Alpha-terpineol

**Herbal:** Ginkgolides, Bilobalide, Asiaticoside, Bacosides, Hericenones, Erinacines, Salidroside, Valerenic Acid, Withanolides, Mateine, Guaranine, Eleutherosides

---

## 🎯 New Effects (+17)

**Cognitive (8):**
memory_enhancement, working_memory, long_term_memory, neuroplasticity, neuroprotection, learning_speed, information_processing, mental_stamina

**Physical (6):**
physical_endurance, muscle_recovery, metabolic_boost, thermogenesis, appetite_regulation, digestive_health

**Emotional (3):**
anxiety_reduction, depression_relief, emotional_stability

---

## 📖 23 RAG Documents (~70k words)

### Cognitive Enhancement (5)
1. memory-enhancement-complete.md (5000w)
2. focus-concentration-guide.md (4000w)
3. mental-clarity-protocols.md (3500w)
4. neuroprotection-longevity.md (4500w)
5. learning-performance.md (3000w)

### Energy & Performance (4)
6. sustained-energy-guide.md (3500w)
7. physical-performance-teas.md (3000w)
8. metabolic-optimization.md (3500w)
9. anti-fatigue-protocols.md (2500w)

### Relaxation & Mood (4)
10. stress-relief-complete.md (4000w)
11. sleep-optimization.md (3500w)
12. mood-enhancement.md (3000w)
13. meditation-spiritual.md (2500w)

### Health & Wellness (4)
14. antioxidant-complete-guide.md (4000w)
15. immune-system-support.md (3000w)
16. digestive-health-teas.md (2500w)
17. cardiovascular-health.md (3500w)

### Tea Science (6)
18. green-tea-science.md (4000w)
19. black-tea-complete.md (4000w)
20. oolong-art-science.md (3500w)
21. pu-erh-fermentation.md (3500w)
22. white-tea-antioxidants.md (2500w)
23. herbal-tea-pharmacology.md (4000w)

---

## ⚠️ Critical Bug Fix

**File:** packages/api/src/routes/rag.ts
**Line 7:** Change `_req` to `req`

**Reason:** Line 9 uses `req.body` but parameter is `_req`

**Fix:**
```typescript
// Before
router.post('/query', async (_req, res) => {

// After
router.post('/query', async (req, res) => {
```

---

## 🔧 Key Commands

```bash
# Validation
npm run validate:teas

# Dry run seed
npm run seed -- --dry-run

# Actual seed
npm run seed

# E2E tests
npm run test:e2e --workspace=packages/frontend

# Production test
./test-production.sh

# Backup
npx supabase db dump > backup.sql

# Migrations
npx supabase db push
```

---

## 📝 JSON Schema Templates

### Tea Entry
```json
{
  "name": "string",
  "type": "green|black|oolong|pu-erh|white|herbal",
  "origin": "string",
  "description": "string",
  "price_per_oz": 0.00,
  "compounds": {
    "compound_name": 0
  },
  "brewing": {
    "temp_c": 75,
    "time_sec": 180,
    "amount_g": 3
  },
  "effects": [
    {
      "effect": "string",
      "intensity": 3,
      "onset_minutes": 20,
      "duration_minutes": 180
    }
  ]
}
```

### Compound Entry
```json
{
  "name": "string",
  "chemical_formula": "string",
  "category": "string",
  "mechanism": "string",
  "half_life_minutes": 0,
  "safe_daily_limit_mg": 0,
  "bioavailability": "string",
  "synergies": [],
  "contraindications": [],
  "research_citations": []
}
```

### Effect Entry
```json
{
  "name": "string",
  "category": "cognitive|physical|emotional|spiritual",
  "description": "string",
  "icon": "string",
  "onset_range_min": 0,
  "onset_range_max": 0,
  "duration_range_min": 0,
  "duration_range_max": 0,
  "intensity_scale": "string",
  "measurement_protocol": "string",
  "research_support": "strong|moderate|preliminary",
  "citations": []
}
```

---

## 🎯 Success Metrics

### Quantitative
- 100+ teas
- 50+ compounds
- 35+ effects
- 24 RAG sources
- ~70,000 words
- 100+ citations
- 0 FK violations
- 0 validation errors
- All tests passing

### Qualitative
- Scientific accuracy
- No performance degradation
- Better RAG results
- Correct frontend display
- Production success

---

## ⚡ Critical Path (Bottleneck)

**Phase 3 (RAG Content)** is the longest:
- 15-20 hours
- 23 documents
- ~70,000 words total
- Requires research and citations

**All other phases:** ~10-15 hours combined

**Total:** 30-40 hours

---

## 🚨 Common Risks

| Risk | Mitigation |
|------|------------|
| Seed fails | Backup first |
| FK violations | Correct order |
| RAG timeout | Batch processing |
| Production down | Test locally first |

---

## 📞 Key Files Reference

- **Full Plan:** TEA_DATABASE_EXPANSION_PLAN.md (25 KB)
- **Codex Prompt:** CODEX_REVIEW_PROMPT.md
- **This Summary:** EXPANSION_SUMMARY_REFERENCE.md

- **Current Teas:** packages/api/data/teas/*.json
- **Seed Script:** packages/api/src/scripts/seed-all.ts
- **RAG Service:** packages/api/src/services/rag/RAGService.ts
- **Migrations:** supabase/migrations/*.sql

---

## ✅ When Referencing This Plan

**For quick overview:** Read this file
**For checkpoint details:** Read main plan (Checkpoints section)
**For phase details:** Read main plan (Phase sections)
**For Codex handoff:** Use CODEX_REVIEW_PROMPT.md
**For full context:** Read TEA_DATABASE_EXPANSION_PLAN.md

---

**Last Updated:** November 15, 2025
**Status:** Ready for execution
**Next Step:** Phase 0 (Research & Dataset Acquisition)
