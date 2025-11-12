# 🚀 Getting Started - Tea Effects App

## Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
cd /Users/dusti1/tea-effects-app

# Install root dependencies
npm install

# Install API dependencies
cd packages/api
npm install

# Install Frontend dependencies
cd ../frontend
npm install

cd ../..
```

### Step 2: Set Up Ollama (for AI)

```bash
# Install Ollama (if not already installed)
# macOS:
brew install ollama

# Start Ollama
ollama serve

# In a new terminal, pull Mistral model
ollama pull mistral

# Verify it's working
ollama list
# Should see: mistral:latest
```

### Step 3: Set Up Supabase (Database)

#### Option A: Use Supabase Cloud (Recommended)

1. Go to https://supabase.com
2. Create new project
3. Wait for it to provision (~2 minutes)
4. Go to SQL Editor
5. Copy and paste contents of `supabase/migrations/001_initial_schema.sql`
6. Execute
7. Copy and paste contents of `supabase/migrations/002_vector_search_function.sql`
8. Execute
9. Go to Settings → API
10. Copy your connection details

#### Option B: Use Local Supabase (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Migrations will run automatically
```

### Step 4: Configure Environment Variables

```bash
# API Environment
cd packages/api
cp .env.example .env

# Edit .env with your values:
nano .env
```

Required values:
```env
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
JWT_SECRET=any_random_string
PORT=3001
```

```bash
# Frontend Environment
cd ../frontend
cp .env.example .env

# Edit .env:
nano .env
```

Required values:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 5: Seed the Database

```bash
cd packages/api

# Run seeding script
npm run seed
```

This will load:
- ✅ 15+ tea compounds (caffeine, L-theanine, EGCG, etc.)
- ✅ 18 effects (focus, calm, energy, creativity, etc.)
- ✅ 20+ teas (oolong, pu-erh, green, herbal)
- ✅ RAG knowledge base with tea research

Expected output:
```
🧪 Seeding compounds...
✓ Compound: caffeine
✓ Compound: l-theanine
...
✅ Seeded 15 compounds

⚡ Seeding effects...
✓ Effect: sustained_focus
✓ Effect: calm
...
✅ Seeded 18 effects

🍵 Seeding teas...
✓ Tea: Tie Guan Yin (Iron Goddess)
✓ Tea: Aged Raw Pu-erh (15 Year Sheng)
...
✅ Seeded 20 teas

📚 Seeding RAG knowledge base...
✓ Ingested: cognitive-enhancement-teas.md
...
✅ RAG knowledge base populated

✨ Database seeding completed successfully!
```

### Step 6: Start the Application

```bash
# Start everything from root
cd /Users/dusti1/tea-effects-app
npm run dev
```

This starts:
- **API**: http://localhost:3001
- **Frontend**: http://localhost:3000

---

## Test It's Working

### 1. Check API Health

Visit: http://localhost:3001/health

Should see:
```json
{
  "status": "ok",
  "services": {
    "api": "healthy",
    "ollama": "healthy"
  }
}
```

### 2. Test Recommendations

```bash
curl -X POST http://localhost:3001/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "desired_effect": "sustained_focus",
    "time_of_day": "morning",
    "intensity_needed": 4,
    "recent_caffeine": 0
  }'
```

Should get 3 tea recommendations!

### 3. Test Frontend

1. Visit http://localhost:3000
2. Click "Focus" 🎯
3. Select "Morning"
4. Click "Get Recommendations"
5. See personalized tea recommendations!

---

## What You Just Built

### ✅ Complete Features

1. **Effect-Based Recommendations**
   - Select desired effect (focus, calm, energy, etc.)
   - Get AI-powered tea suggestions
   - Based on time of day, caffeine intake, preferences

2. **Tea Database**
   - 20+ teas with full compound profiles
   - Oolong teas (for balanced cognitive effects)
   - Pu-erh teas (for long-term brain health)
   - Green teas (for clean energy)
   - Herbal teas (for relaxation)

3. **Compound Science**
   - Caffeine levels tracked
   - L-theanine:caffeine ratios optimized
   - EGCG, GABA, and other compounds
   - Effect timelines (onset, peak, duration)

4. **RAG System**
   - Comprehensive tea research knowledge base
   - Cognitive enhancement studies (pu-erh, oolong)
   - Vector search with semantic understanding
   - AI-enhanced recommendations

5. **Blend Creation Engine**
   - Create custom tea blends
   - Target specific effects
   - Optimize compound profiles
   - AI-generated brewing instructions

---

## Next Steps

### 🧪 Try These Features

1. **Get Morning Focus Recommendations**
   - Go to http://localhost:3000
   - Click "Focus"
   - Select "Morning"
   - See oolong recommendations!

2. **Ask the RAG System**
   ```bash
   curl -X POST http://localhost:3001/api/rag/query \
     -H "Content-Type: application/json" \
     -d '{
       "query": "How does pu-erh tea improve memory?"
     }'
   ```

3. **Create a Custom Blend**
   ```bash
   curl -X POST http://localhost:3001/api/blends \
     -H "Content-Type: application/json" \
     -d '{
       "target_effects": ["sustained_focus", "calm"],
       "max_caffeine_mg": 50
     }'
   ```

### 🚀 Deploy to Production

Ready to share with the world? See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Deploying to Vercel (frontend)
- Deploying to Railway (API)
- Setting up production database
- Configuring Ollama in the cloud

---

## Research Highlights

Your app now includes research on:

### Pu-erh Tea for Cognitive Enhancement
- **Memory**: Theabrownins support hippocampal function
- **Neuroprotection**: Lovastatin improves cerebral blood flow
- **Long-term Benefits**: 20-30% reduction in Alzheimer's risk

### Oolong Tea for Balanced Performance
- **L-theanine + Caffeine**: Optimal 2:1 ratio for "alert calm"
- **Alpha Waves**: Promotes relaxed focus state
- **Sustained Energy**: 3-4 hours without crash

### Compound Synergies
- L-theanine blocks caffeine jitters
- EGCG supports neuroplasticity
- GABA promotes calm without sedation

---

## Troubleshooting

### "Connection refused" errors?
- Make sure Ollama is running: `ollama serve`
- Check API is running: `curl http://localhost:3001/health`

### "No teas found" errors?
- Re-run seeding: `cd packages/api && npm run seed`
- Check database connection in .env

### AI not generating recommendations?
- Verify Mistral is downloaded: `ollama list`
- Check Ollama is accessible: `curl http://localhost:11434/api/tags`

### Frontend can't connect to API?
- Verify NEXT_PUBLIC_API_URL in frontend/.env
- Check CORS_ORIGIN in api/.env

---

## Project Structure

```
tea-effects-app/
├── packages/
│   ├── api/                    # Express API
│   │   ├── src/
│   │   │   ├── services/
│   │   │   │   ├── effects/    # Recommendation engine
│   │   │   │   ├── blending/   # Blend creation
│   │   │   │   ├── rag/        # Vector search
│   │   │   │   └── ai/         # Mistral client
│   │   │   ├── routes/         # API endpoints
│   │   │   └── scripts/        # Seeding scripts
│   │   └── data/               # Tea data JSON files
│   │
│   └── frontend/               # Next.js App
│       ├── app/
│       │   ├── page.tsx        # Home (effect selector)
│       │   └── effects/        # Recommendations page
│       └── components/         # React components
│
├── supabase/
│   └── migrations/             # Database schema
│
├── DEPLOYMENT.md               # Production deployment guide
└── GETTING_STARTED.md          # This file
```

---

## What's Next?

You now have a complete AI-powered tea recommendation system! 🎉

### Want to enhance it?

1. **Add More Teas**
   - Edit JSON files in `packages/api/data/teas/`
   - Run `npm run seed:teas`

2. **Improve Recommendations**
   - Fine-tune prompts in `PromptTemplates.ts`
   - Adjust compound calculations in `EffectEngine.ts`

3. **Build New Features**
   - User authentication
   - Personal tea journal
   - Social sharing
   - Tea shop finder

4. **Optimize Performance**
   - Add caching layer (Redis)
   - Optimize vector search
   - Add CDN for static assets

---

## Support & Community

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Tea Research**: Check `/data/rag-sources/`

Enjoy exploring the science of tea! 🍵🧠
