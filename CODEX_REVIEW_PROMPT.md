# CODEX REVIEW PROMPT - Tea Database Expansion

**Instructions for Codex:** Read the complete expansion plan (`TEA_DATABASE_EXPANSION_PLAN.md`) and execute all phases from start to finish in one session.

---

## 🎯 Your Mission

Execute the comprehensive tea database expansion outlined in `TEA_DATABASE_EXPANSION_PLAN.md`. Transform the Tea Effects App database from 20 teas to 100+ teas with complete research documentation.

---

## 📋 What You Need to Do

### Overview
- **Read:** `/Users/dusti1/tea-effects-app-1/TEA_DATABASE_EXPANSION_PLAN.md` (complete plan)
- **Execute:** All 8 phases sequentially
- **Deliver:** Fully expanded database with 100+ teas and 23 RAG research sources

### Key Deliverables
1. **100+ Tea Entries** - Complete data across 7 categories
2. **50+ Compounds** - With mechanisms and research citations
3. **35+ Effects** - With measurement protocols
4. **23 RAG Documents** - ~70,000 words of research content
5. **Bug Fix** - RAG route (_req → req)
6. **Production Deployment** - Fully tested and live

---

## 🔍 7 Review Checkpoints (Pause for Approval)

The plan has **7 mandatory checkpoints** where you must STOP and get explicit approval before continuing:

### Checkpoint #1 - After Phase 0
**Deliverable:** `TEA_EXPANSION_STRATEGY.md`
**Contains:** Complete list of 100+ teas, data sources, methodology
**Approval needed before proceeding to Phase 1**

### Checkpoint #2 - After Phase 1
**Deliverable:** `TEA_DATABASE_AUDIT_COMPLETE.md`
**Contains:** Schema documentation, constraints, capacity analysis
**Approval needed before proceeding to Phase 2**

### Checkpoint #3 - After Phase 2
**Deliverable:** All tea/compound/effect JSON data
**Contains:** 100+ teas, 50+ compounds, 35+ effects (complete)
**Approval needed before proceeding to Phase 3**

### Checkpoint #4 - During Phase 3
**Deliverable:** 2-3 sample RAG documents
**Contains:** Complete example docs with citations
**Approval needed before creating remaining 20+ RAG docs**

### Checkpoint #5 - After Phase 5
**Deliverable:** Database backup + migration confirmation
**Contains:** Backup file, migration status, rollback plan
**Approval needed before seeding**

### Checkpoint #6 - After Phase 7
**Deliverable:** Complete verification results
**Contains:** SQL results, API tests, E2E test results
**Approval needed before production deployment**

### Checkpoint #7 - After Phase 8 (FINAL)
**Deliverable:** Production deployment confirmation
**Contains:** Production test results, performance metrics
**Final approval that expansion is complete**

---

## 📝 Execution Instructions

### Step 1: Read the Full Plan
```bash
# Open and read completely
/Users/dusti1/tea-effects-app-1/TEA_DATABASE_EXPANSION_PLAN.md
```

### Step 2: Execute Each Phase

**Phase 0:** Research & Dataset Acquisition (2-3h)
- Identify data sources
- Create tea selection list (100+)
- Document methodology
- **STOP → Checkpoint #1**

**Phase 1:** Comprehensive Audit (1-2h)
- Read all schema files
- Document constraints
- Verify capacity
- **STOP → Checkpoint #2**

**Phase 2:** Database Design (8-10h)
- Create 100+ tea entries
- Create 50+ compound entries
- Create 35+ effect entries
- **STOP → Checkpoint #3**

**Phase 3:** RAG Research Sources (15-20h)
- Create 2-3 sample docs first
- **STOP → Checkpoint #4**
- After approval, create remaining 20+ docs

**Phase 4:** Prep Local Tooling (1h)
- Verify environment
- Install dependencies
- Create validation scripts
- Fix RAG bug

**Phase 5:** Database Preparation (30m)
- Create backup
- Check capacity
- Apply migrations
- **STOP → Checkpoint #5**

**Phase 6:** Data Ingestion (1-2h)
- Run validation
- Dry run seed
- Actual seeding

**Phase 7:** Verification & Testing (2-3h)
- SQL verification
- API testing
- Frontend testing
- E2E tests
- **STOP → Checkpoint #6**

**Phase 8:** Production Deployment (1h)
- Reseed production database
- Commit & push code
- Deploy to Vercel
- Verify production
- **STOP → Checkpoint #7 (FINAL)**

---

## ⚠️ Critical Requirements

### Data Quality
- ✅ All compounds must have research citations
- ✅ All effects must have measurement protocols
- ✅ All teas must have complete brewing data
- ✅ All RAG sources must cite peer-reviewed research
- ✅ No placeholder or dummy data

### Technical Requirements
- ✅ Validate all JSON before seeding
- ✅ Use correct FK insertion order (compounds → effects → teas → RAG)
- ✅ Create backup before seeding
- ✅ Test locally before production
- ✅ No breaking changes to existing functionality

### Process Requirements
- ✅ STOP at each checkpoint for approval
- ✅ Document all decisions
- ✅ Track progress in todo list
- ✅ Report any issues immediately
- ✅ Provide status updates at each phase

---

## 🎯 Success Criteria

### Quantitative
- [x] 100+ teas in database
- [x] 50+ compounds documented
- [x] 35+ effects defined
- [x] 24 RAG sources (23 new + 1 existing)
- [x] ~70,000 words of RAG content
- [x] 100+ research citations
- [x] 0 FK constraint violations
- [x] 0 data validation errors
- [x] All E2E tests passing

### Qualitative
- [x] Scientific accuracy maintained
- [x] No performance degradation
- [x] RAG queries return better results
- [x] Frontend displays all teas correctly
- [x] Production deployment successful
- [x] Documentation complete

---

## 🔧 Tools & Resources

### Project Files
- Plan: `TEA_DATABASE_EXPANSION_PLAN.md`
- Current data: `packages/api/data/`
- Seed script: `packages/api/src/scripts/seed-all.ts`
- RAG service: `packages/api/src/services/rag/RAGService.ts`

### Environment
- Supabase URL: Check `.env` file
- Ollama: Must be running with mistral model
- Node: v18+ required
- Database: PostgreSQL with pgvector

### Commands
```bash
# Validation
npm run validate:teas

# Seed (dry run)
npm run seed -- --dry-run

# Seed (actual)
npm run seed

# Tests
npm run test:e2e --workspace=packages/frontend

# Production test
./test-production.sh
```

---

## 📊 Progress Tracking

Use this checklist to track your progress:

```markdown
## Expansion Progress

### Phase 0: Research ⏳
- [ ] Data sources identified
- [ ] 100+ teas listed
- [ ] Methodology documented
- [ ] TEA_EXPANSION_STRATEGY.md created
- [ ] Checkpoint #1 approved

### Phase 1: Audit ⏳
- [ ] All schemas read
- [ ] Constraints documented
- [ ] Capacity verified
- [ ] TEA_DATABASE_AUDIT_COMPLETE.md created
- [ ] Checkpoint #2 approved

### Phase 2: Design ⏳
- [ ] Green teas (+15) created
- [ ] Black teas (+20) created
- [ ] Oolong teas (+12) created
- [ ] Pu-erh teas (+10) created
- [ ] White teas (+8) created
- [ ] Herbal teas (+15) created
- [ ] Specialty blends (+10) created
- [ ] Compounds (+35) created
- [ ] Effects (+17) created
- [ ] Checkpoint #3 approved

### Phase 3: RAG Content ⏳
- [ ] Sample docs (2-3) created
- [ ] Checkpoint #4 approved
- [ ] Cognitive series (5 docs) created
- [ ] Energy series (4 docs) created
- [ ] Relaxation series (4 docs) created
- [ ] Health series (4 docs) created
- [ ] Tea science series (6 docs) created

### Phase 4: Tooling ⏳
- [ ] Environment verified
- [ ] Dependencies installed
- [ ] Validation script created
- [ ] RAG bug fixed

### Phase 5: Database Prep ⏳
- [ ] Backup created
- [ ] Migrations applied
- [ ] Capacity confirmed
- [ ] Checkpoint #5 approved

### Phase 6: Seeding ⏳
- [ ] Validation passed
- [ ] Dry run successful
- [ ] Actual seed successful
- [ ] No errors

### Phase 7: Verification ⏳
- [ ] SQL counts verified
- [ ] API tests passed
- [ ] Frontend verified
- [ ] E2E tests passed
- [ ] Checkpoint #6 approved

### Phase 8: Production ⏳
- [ ] Production database seeded
- [ ] Code committed & pushed
- [ ] Vercel deployed
- [ ] Production tests passed
- [ ] Checkpoint #7 approved

### EXPANSION COMPLETE ✅
```

---

## 🚨 Common Issues & Solutions

### Issue: Ollama not running
**Solution:** `ollama serve` then `ollama pull mistral`

### Issue: FK constraint violation
**Solution:** Check insertion order - compounds first, then effects, then teas

### Issue: Validation fails
**Solution:** Check JSON schema matches template exactly

### Issue: Seeding timeout
**Solution:** Reduce batch size in seed script

### Issue: RAG embedding fails
**Solution:** Increase Ollama timeout, reduce chunk size

### Issue: Production deployment fails
**Solution:** Check Vercel environment variables are set

---

## 📞 When to Ask for Help

Stop and ask if:
- ❌ Any checkpoint deliverable is incomplete
- ❌ Data quality is uncertain
- ❌ Breaking changes detected
- ❌ Tests failing
- ❌ Production issues occur
- ❌ Timeline significantly exceeds estimates

---

## 🎬 Final Notes

### This is a Large Task
- Estimated 30-40 hours total
- Requires sustained focus and attention to detail
- Quality over speed

### Checkpoints are Mandatory
- Do NOT skip any of the 7 checkpoints
- Get explicit approval before continuing
- Document any deviations from plan

### Quality Standards
- All data must be research-backed
- All citations must be valid
- All JSON must validate
- All tests must pass

---

## ✅ Ready to Start?

1. Read `TEA_DATABASE_EXPANSION_PLAN.md` completely
2. Start with Phase 0
3. Stop at Checkpoint #1
4. Get approval
5. Continue through all phases

**Good luck! This will be an impressive expansion of the Tea Effects database.**

---

**Questions?** Refer to the main plan document for detailed instructions on each phase.
