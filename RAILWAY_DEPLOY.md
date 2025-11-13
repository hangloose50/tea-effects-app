# 🚂 Railway API Deployment Guide

## Quick Deploy (5 minutes)

### Step 1: Create Railway Project

```bash
cd packages/api
railway init
```

Select:
- Workspace: `hangloose50's Projects`
- Create new project: `tea-effects-api`

### Step 2: Add Environment Variables

```bash
# Copy your .env variables to Railway
railway variables set SUPABASE_URL=https://rstknxmtpxpigdobegfy.supabase.co
railway variables set SUPABASE_SERVICE_KEY=sb_secret_eHVkOMWVPorV8NYUERgPjw_pnJ4HSXY
railway variables set OLLAMA_URL=https://your-ollama-server.com  # See note below
railway variables set OLLAMA_MODEL=mistral
railway variables set JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
railway variables set PORT=3001
railway variables set NODE_ENV=production
```

**⚠️ IMPORTANT - Ollama Server:**

Railway deployment won't have access to your local Ollama. You have 3 options:

**Option A: Deploy Ollama to Railway**
```bash
# In a new terminal, deploy Ollama
railway init
# Create ollama-server project
# Add Ollama service
```

**Option B: Use OpenAI API Instead**
- Easier for production
- Update MistralClient to use OpenAI
- Add `OPENAI_API_KEY` to Railway variables

**Option C: Use Hosted Mistral**
- Use Mistral AI's hosted API
- Sign up at https://console.mistral.ai
- Add `MISTRAL_API_KEY` to Railway variables

### Step 3: Deploy

```bash
railway up
```

This will:
- ✅ Build your TypeScript API
- ✅ Install dependencies
- ✅ Start the server
- ✅ Give you a public URL

### Step 4: Get Your API URL

```bash
railway domain
```

This will give you a URL like:
`https://tea-effects-api-production.up.railway.app`

### Step 5: Update Frontend Environment

Update `packages/frontend/.env`:

```env
NEXT_PUBLIC_API_URL=https://tea-effects-api-production.up.railway.app
```

Then redeploy frontend:

```bash
cd packages/frontend
vercel --prod
```

---

## Alternative: Railway Dashboard (No CLI)

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `hangloose50/tea-effects-app`
5. Set root directory: `packages/api`
6. Add all environment variables in dashboard
7. Click "Deploy"

---

## Verify Deployment

```bash
# Test health endpoint
curl https://your-api-url.railway.app/health

# Should return:
{
  "status": "ok",
  "services": {
    "api": "healthy",
    "ollama": "healthy"
  }
}
```

---

## Connect Everything

After Railway deployment:

1. ✅ **Supabase**: Already connected
   - Database: rstknxmtpxpigdobegfy.supabase.co
   - Tables seeded with 20 teas, 15 compounds, 19 effects

2. ✅ **Frontend (Vercel)**: Already deployed
   - URL: https://frontend-i3dx0gxd6-quantrolixais-projects.vercel.app
   - Update NEXT_PUBLIC_API_URL to Railway URL

3. 🚂 **Backend (Railway)**: Deploy now
   - Follow steps above
   - Get public URL
   - Update frontend to use it

4. 🤖 **AI Service**: Need to configure
   - Option A: Deploy Ollama to Railway
   - Option B: Use OpenAI API
   - Option C: Use Mistral hosted API

---

## Environment Variables Summary

**Required for Railway:**
```
SUPABASE_URL=https://rstknxmtpxpigdobegfy.supabase.co
SUPABASE_SERVICE_KEY=sb_secret_eHVkOMWVPorV8NYUERgPjw_pnJ4HSXY
OLLAMA_URL=<your-ai-service-url>
OLLAMA_MODEL=mistral
JWT_SECRET=<generate-strong-secret>
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://frontend-i3dx0gxd6-quantrolixais-projects.vercel.app
```

---

## Troubleshooting

**"Module not found" errors:**
```bash
railway run npm install
railway up
```

**"Port already in use":**
- Railway auto-assigns ports, no action needed

**"Cannot connect to Supabase":**
- Verify SUPABASE_SERVICE_KEY is correct
- Check Supabase dashboard → Settings → API

**AI service not responding:**
- Deploy Ollama separately or switch to hosted AI API

---

## Need Help?

Open an issue: https://github.com/hangloose50/tea-effects-app/issues

---

🚀 Ready to deploy? Run: `railway init` in `packages/api`
