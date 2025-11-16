# Tea Database Audit — Phase 1 Deliverable

_Prepared November 15, 2025_

## 1. Current Dataset Snapshot

| Asset | Count (Nov 15) | Source |
|-------|----------------|--------|
| Teas | 20 | `packages/api/data/teas/{green,oolong,pu-erh,herbal}.json`
| Compounds | 15 | `packages/api/data/compounds/compounds.json`
| Effects | 18 | `packages/api/data/effects/effects.json`
| RAG documents | 1 (cognitive-enhancement-teas) | `packages/api/data/rag-sources/`
| Vector rows | 30 chunks | `tea_knowledge_base`
| Database size | ~2.1 MB (Supabase dashboard) |

## 2. File + Schema Inventory

### Seed Data Files
- `packages/api/data/teas/*.json` → structured tea definitions
- `packages/api/data/compounds/compounds.json` → compound metadata
- `packages/api/data/effects/effects.json` → effect metadata
- `packages/api/data/rag-sources/*.md` → long-form research content

### Seed Script
`packages/api/src/scripts/seed-all.ts`
1. Upserts compounds
2. Upserts effects
3. Inserts teas; populates `tea_compounds` and `tea_effects`
4. Iterates markdown sources; chunk + embed + insert into `tea_knowledge_base`

### RAG Service
`packages/api/src/services/rag/RAGService.ts`
- Uses `MistralClient` to generate embeddings
- Calls Supabase RPC `match_tea_knowledge` (vector cosine search)
- Returns generated answer + source metadata

### Database DDL (Supabase)
Defined in `supabase/migrations/001_initial_schema.sql` and `002_vector_search_function.sql`.

#### Core Tables
```
teas (id serial PK, name unique, type, origin, description, price_per_oz, image_url, created_at)
compounds (id serial PK, name unique, chemical_formula, mechanism, half_life_minutes, safe_daily_limit_mg, created_at)
tea_compounds (id serial PK, tea_id FK→teas, compound_id FK→compounds, amount_mg_per_cup, optimal_extraction_temp_c, optimal_steep_time_sec, UNIQUE(tea_id, compound_id))
effects (id serial PK, name unique, category, description, icon)
tea_effects (id serial PK, tea_id FK→teas, effect_id FK→effects, intensity CHECK 1–5, onset_minutes, duration_minutes, confidence_score CHECK 0–1, data_source, UNIQUE(tea_id,effect_id))
compound_effects (id serial PK, compound_id FK→compounds, effect_id FK→effects, potency CHECK 1–5, research_citations[])
```

#### User + Blending Tables (unchanged by this project)
`users`, `blends`, `blend_components`, `blend_predicted_effects`, `effect_logs`, `personal_effect_profiles`

#### RAG Table
```
tea_knowledge_base (id serial PK, content text, embedding vector(1536), metadata jsonb, created_at)
INDEX: ivfflat on embedding (vector_cosine_ops, lists=100)
INDEX: GIN on metadata
```

#### Functions
- `match_tea_knowledge(query_embedding vector(1536), match_threshold float, match_count int)` returns id/content/metadata/similarity filtered by cosine score.

## 3. JSON Schemas (validated against current data)

### Tea Object Schema
```
name: string (required, unique)
type: enum[green,black,oolong,pu-erh,white,herbal,specialty]
origin: string (optional)
description: string (optional but recommended)
price_per_oz: number ≥ 0
compounds: { <compound_name>: number > 0 } (must match compounds list)
brewing: { temp_c: 60–100, time_sec: 30–600, amount_g: 1–10 }
effects: [ { effect: string ∈ effects list, intensity: 1–5, onset_minutes: 5–120 (herbal relaxants allowed up to 180), duration_minutes: 60–480 } ]
```

### Compound Schema
```
name: string unique
chemical_formula: string (optional)
category: string (catechin, alkaloid, flavonoid, etc.)
mechanism: string summary
half_life_minutes: number > 0
safe_daily_limit_mg: number ≥ 0
bioavailability: string (optional)
synergies: string[] (optional)
contraindications: string[] (optional)
research_citations: string[] (DOI/URL)
```

### Effect Schema
```
name: string unique
category: enum[cognitive,physical,emotional]
description: string
icon: string (emoji or short code)
onset_range_min/max: number (minutes)
duration_range_min/max: number (minutes)
intensity_scale: string description
measurement_protocol: string (survey/bio marker)
research_support: enum[strong,moderate,preliminary]
citations: string[]
```

## 4. Constraints & Validations

| Area | Constraint | Enforced By |
|------|------------|-------------|
| Tea names | unique | DB unique index + upsert conflict target |
| Compound names | unique | DB unique index |
| Effect names | unique | DB unique index |
| Tea → compound link | `tea_compounds` FK + UNIQUE(tea_id, compound_id) | DB |
| Tea → effect link | `tea_effects` FK + UNIQUE(tea_id, effect_id) | DB |
| Intensity range | 1–5 | DB CHECK |
| Confidence score | 0–1 | DB CHECK |
| Embedding dimension | 1536 floats | pgvector type |
| JSON numeric ranges | (currently manual) | to be automated via validator in Phase 4 |
| Batch size for seeds | not enforced | documented best practice (≤50 rows) |

## 5. Capacity Assessment

### Database Limits (Supabase Free Tier)
- Storage: 500 MB
- Row limit: 500k rows per table (soft)
- Current size: ~2 MB (≈0.4% of allowance)

### Target Post-Expansion
| Table | Current Rows | Target Rows | Notes |
|-------|--------------|-------------|-------|
| `teas` | 20 | 109 | still small |
| `tea_compounds` | ~80 | 500–700 | each tea 5–7 compounds |
| `tea_effects` | ~90 | 400–600 | each tea 4–6 effects |
| `compounds` | 15 | 52 | well under limits |
| `effects` | 18 | 36 | well under limits |
| `tea_knowledge_base` | 30 chunks | 350–400 chunks | ivfflat lists=100 supports 100k+ |

Performance considerations: indexes already in place; expected dataset still trivial for Supabase/Postgres. RAG query time should remain <300 ms.

## 6. Seeding Order & Tooling Notes

1. **Compounds** — `upsert` keyed on `name`
2. **Effects** — `upsert` keyed on `name`
3. **Teas** — insert; capture returned `id`
   - For each tea: join compounds via lookups, insert into `tea_compounds`
   - Join effects via lookups, insert into `tea_effects`
4. **RAG Markdown** — chunk + embed + insert `tea_knowledge_base`

Current script runs sequential inserts. Scaling plan:
- Implement batch insert helper (Phase 4) with 25–50 rows/transaction
- Add CLI flags for dry-run/skip sections

## 7. Identified Gaps & Mitigations

| Risk | Impact | Plan |
|------|--------|------|
| Missing validation | High | Build `validate-tea-data.ts` to enforce schema/ranges before seeding |
| RAG API bug (`_req` vs `req`) | Medium | Fix during Phase 4 prep |
| Large markdown ingestion time | Medium | Chunk size 2,000 chars, throttle embeddings; monitor Ollama timeouts |
| Supabase timeout on mass insert | Low | Batch + progress logging, auto-retry |
| Citation tracking | Medium | Include `sources` arrays per entry to maintain traceability |

## 8. Capacity & Rollback Plan

- Pre-seed backup: `npx supabase db dump > backups/pre-expansion-YYYYMMDD.sql` (Phase 5)
- Rollback process: restore dump via `npx supabase db restore --file backups/...`
- Vector index maintenance: `tea_knowledge_base` ivfflat automatically reuses lists; no rebuild expected at target size

## 9. Next Actions
- ✅ Phase 1 audit complete (this document)
- ⛳ Await Checkpoint #2 approval
- ⏭️ Phase 2: author expanded tea/compound/effect JSON per strategy
