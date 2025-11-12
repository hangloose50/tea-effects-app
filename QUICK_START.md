# ⚡ Quick Start Guide

## GitHub Repository
**https://github.com/hangloose50/tea-effects-app** ✅

## Prerequisites Checklist

✅ Node.js installed
✅ Dependencies installed
✅ Ollama running with Mistral model
✅ Git repository created

## Next Steps (Choose One)

### Option 1: Run Locally (Fastest - 5 minutes)

This will run everything locally without Supabase (using in-memory data):

```bash
# 1. Start the API (mock mode - no database needed)
cd /Users/dusti1/tea-effects-app/packages/api
npm run dev

# 2. In a new terminal, start the frontend
cd /Users/dusti1/tea-effects-app/packages/frontend
npm run dev
```

Visit: **http://localhost:3000**

### Option 2: Full Setup with Supabase (Complete - 15 minutes)

#### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Name: `tea-effects-db`
5. Set strong password
6. Wait 2 minutes for provisioning

#### Step 2: Run Database Migrations

1. In Supabase dashboard → SQL Editor
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and click "Run"
4. Copy contents of `supabase/migrations/002_vector_search_function.sql`
5. Paste and click "Run"

#### Step 3: Get Credentials

In Supabase → Settings → API:
- Copy Project URL
- Copy anon public key
- Copy service_role key
- Copy Connection string

#### Step 4: Configure Environment

Edit `packages/api/.env`:
```env
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
JWT_SECRET=any_random_string_here
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

Edit `packages/frontend/.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### Step 5: Seed Database

```bash
cd /Users/dusti1/tea-effects-app/packages/api
npm run seed
```

This loads:
- 20+ teas (oolong, pu-erh, green, herbal)
- 15+ compounds (caffeine, L-theanine, EGCG, etc.)
- 18 effects (focus, calm, energy, memory, etc.)
- Comprehensive RAG knowledge base

#### Step 6: Start Everything

```bash
cd /Users/dusti1/tea-effects-app
npm run dev
```

Visit: **http://localhost:3000**

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
    "intensity_needed": 4
  }'
```

### 3. Use the App

1. Go to http://localhost:3000
2. Click "Focus" 🎯
3. Select time of day
4. Click "Get Recommendations"
5. See AI-powered tea suggestions!

---

## What You Built

✅ **AI-Powered Recommendations** - Mistral AI with RAG
✅ **20+ Teas** - Oolong, Pu-erh, Green, Herbal
✅ **Compound Science** - L-theanine, Caffeine, EGCG tracking
✅ **Custom Blends** - Create blends for specific effects
✅ **Cognitive Research** - Pu-erh & Oolong brain health studies
✅ **Production Ready** - Deploy to Vercel + Railway

---

## Deploy to Production

When ready to share with the world:

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for:
- Vercel deployment (Frontend)
- Railway deployment (API)
- Production Supabase setup

---

## Troubleshooting

**"Connection refused" errors?**
- Make sure Ollama is running: `ollama serve`
- Check API is running on port 3001

**"No teas found" errors?**
- Run seeding: `npm run seed` in packages/api
- Check database connection in .env

**Frontend can't connect to API?**
- Verify API is running: `curl http://localhost:3001/health`
- Check NEXT_PUBLIC_API_URL in frontend/.env

---

## Repository
**https://github.com/hangloose50/tea-effects-app**

Star it! ⭐ Share it! Fork it! 🍴

Enjoy your AI-powered tea journey! 🍵🧠
