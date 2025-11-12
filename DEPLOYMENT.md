# 🚀 Deployment Guide - Tea Effects App

## Overview

This guide walks you through deploying the complete Tea Effects application stack:
- **Frontend**: Next.js on Vercel
- **API**: Express on Railway
- **Database**: Supabase (PostgreSQL + pgvector)
- **LLM**: Mistral via Ollama (on Railway or local)

---

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Railway account (free tier works)
- Supabase account (free tier works)
- Node.js 20+ installed locally

---

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Name: `tea-effects-db`
4. Choose region closest to you
5. Set a strong database password
6. Wait for project to provision (~2 minutes)

### 1.2 Run Migrations

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link to your project:
   ```bash
   cd tea-effects-app
   supabase link --project-ref YOUR_PROJECT_REF
   ```

3. Run migrations:
   ```bash
   supabase db push
   ```

   Or manually run SQL files in Supabase dashboard:
   - Go to SQL Editor
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Execute
   - Copy contents of `supabase/migrations/002_vector_search_function.sql`
   - Execute

### 1.3 Get Credentials

1. Go to Project Settings → API
2. Note these values:
   - `Project URL`: https://[project-ref].supabase.co
   - `anon public key`: Your public API key
   - `service_role key`: Your service role key (keep secret!)
   - `Connection string`: For DATABASE_URL

---

## Step 2: Deploy API to Railway

### 2.1 Set Up Railway Project

1. Go to https://railway.app
2. Create new project: "tea-effects-api"
3. Choose "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select `tea-effects-app` repository
6. Root directory: `packages/api`

### 2.2 Configure Environment Variables

In Railway project settings, add:

```env
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
JWT_SECRET=your_random_secret_here
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

### 2.3 Deploy Ollama on Railway (Optional)

Option A: Separate Railway Service
1. Add new service to project
2. Use Docker image: `ollama/ollama`
3. Expose port 11434
4. Pull Mistral model on start:
   ```bash
   ollama pull mistral
   ```

Option B: Use External LLM API (easier)
- Use Replicate, Together.ai, or similar
- Update `OLLAMA_URL` to point to external API
- No need to run Ollama yourself

### 2.4 Deploy

1. Push code to GitHub main branch
2. Railway auto-deploys
3. Check logs for any errors
4. Note your API URL: https://tea-effects-api.up.railway.app

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Set Up Vercel Project

1. Go to https://vercel.com
2. Import GitHub repository
3. Select `tea-effects-app`
4. Root directory: `packages/frontend`
5. Framework preset: Next.js

### 3.2 Configure Environment Variables

In Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://tea-effects-api.up.railway.app
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait for build (~2 minutes)
3. Access your app at: https://tea-effects.vercel.app

---

## Step 4: Seed Database

### 4.1 Local Seeding (Recommended)

```bash
cd packages/api

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Supabase credentials

# Ensure Ollama is running locally
ollama serve
ollama pull mistral

# Run seed script
npm run seed
```

This will:
- Load 20+ teas (oolong, pu-erh, green, herbal)
- Load 15+ compounds (caffeine, L-theanine, etc.)
- Load 18 effects (focus, calm, energy, etc.)
- Ingest RAG knowledge base

### 4.2 Verify Data

```bash
# Check teas
supabase db query "SELECT COUNT(*) FROM teas"

# Check effects
supabase db query "SELECT COUNT(*) FROM effects"

# Check RAG embeddings
supabase db query "SELECT COUNT(*) FROM tea_knowledge_base"
```

---

## Step 5: Test the Application

### 5.1 Health Checks

```bash
# API health
curl https://tea-effects-api.up.railway.app/health

# Should return:
# {
#   "status": "ok",
#   "services": {
#     "api": "healthy",
#     "ollama": "healthy"
#   }
# }
```

### 5.2 Test Recommendations

```bash
curl -X POST https://tea-effects-api.up.railway.app/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "desired_effect": "sustained_focus",
    "time_of_day": "morning",
    "intensity_needed": 4,
    "recent_caffeine": 0
  }'
```

### 5.3 Test Frontend

1. Visit https://tea-effects.vercel.app
2. Click on "Focus" effect
3. Select time of day
4. Click "Get Recommendations"
5. Should see 3 tea recommendations with details

---

## Step 6: Update CORS (Important!)

Once you have your Vercel URL:

1. Go to Railway → Environment Variables
2. Update `CORS_ORIGIN` to your Vercel URL
3. Redeploy API

---

## Troubleshooting

### Ollama Issues

If Ollama health check fails:
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Pull Mistral if needed
ollama pull mistral
```

### Database Connection Issues

```bash
# Test connection
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# Check if tables exist
\dt
```

### Seeding Errors

```bash
# Re-run specific seeds
npm run seed:teas
npm run seed:compounds
npm run seed:effects
npm run seed:rag
```

### API 500 Errors

Check Railway logs:
```bash
railway logs
```

Common issues:
- Missing environment variables
- Ollama not running
- Database connection failed

---

## Local Development

### Start All Services

```bash
# Terminal 1: Ollama
ollama serve

# Terminal 2: API
cd packages/api
npm install
npm run dev

# Terminal 3: Frontend
cd packages/frontend
npm install
npm run dev
```

Visit http://localhost:3000

---

## Production Checklist

- [ ] Supabase project created and migrations run
- [ ] Railway API deployed with all env vars
- [ ] Ollama running (Railway service or external)
- [ ] Vercel frontend deployed with env vars
- [ ] Database seeded with tea data
- [ ] CORS configured correctly
- [ ] Health check passing
- [ ] Test recommendations working
- [ ] Frontend connected to API

---

## Monitoring & Logs

### Railway Logs
```bash
railway logs --tail 100
```

### Vercel Logs
Check deployment logs in Vercel dashboard

### Supabase Logs
Check real-time logs in Supabase dashboard → Logs

---

## Scaling Considerations

### Free Tier Limits
- **Vercel**: Unlimited hobby projects
- **Railway**: $5 free credit/month
- **Supabase**: 500MB database, 2GB bandwidth

### Upgrading
- Railway: ~$20-40/month for API + Ollama
- Vercel: $20/month Pro (optional)
- Supabase: $25/month Pro (optional)

### Performance Tips
- Enable Railway auto-scaling
- Use Vercel Edge Functions for API routes
- Add Redis caching layer
- Optimize RAG chunk sizes

---

## Support

Issues? Check:
1. GitHub Issues
2. Railway Community
3. Supabase Discord
4. Vercel Community

Happy brewing! 🍵
