# Vercel Environment Variables Setup

To make the API routes work in production, you need to add these environment variables to your Vercel project:

## Required Environment Variables

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `tea-effects-app`
3. Go to Settings → Environment Variables
4. Add these variables for Production environment:

```
NEXT_PUBLIC_SUPABASE_URL=https://rstknxmtpxpigdobegfy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_u9RTqqcykDAp392DLLz7Ww_qOaB1IxZ
```

## After Adding Variables

1. Trigger a redeployment:
   - Go to the Deployments tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

2. Wait for deployment to complete (usually 1-2 minutes)

## Verify Setup

Test the API endpoints:
```bash
# Test teas API
curl https://frontend-five-inky-30.vercel.app/api/teas

# Test recommendations API
curl -X POST https://frontend-five-inky-30.vercel.app/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"desired_effect":"creativity","time_of_day":"morning"}'
```

Both should return JSON responses with `"success": true`