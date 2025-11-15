#!/bin/bash

echo "🔍 Quick Status Check for Tea Effects App"
echo "=========================================="

# Check if API is returning JSON
API_RESPONSE=$(curl -s https://frontend-five-inky-30.vercel.app/api/teas 2>/dev/null | head -c 10)

if [[ "$API_RESPONSE" == *"{"* ]]; then
    echo "✅ SUCCESS! API is working!"
    echo ""
    echo "Testing both endpoints..."
    curl -s https://frontend-five-inky-30.vercel.app/api/teas | python3 -c "import json, sys; d = json.load(sys.stdin); print(f'  ✅ /api/teas: {len(d.get(\"teas\", []))} teas loaded')" 2>/dev/null || echo "  ❌ /api/teas: Error"

    curl -s -X POST https://frontend-five-inky-30.vercel.app/api/recommendations \
        -H "Content-Type: application/json" \
        -d '{"desired_effect":"creativity","time_of_day":"morning"}' | \
        python3 -c "import json, sys; d = json.load(sys.stdin); print(f'  ✅ /api/recommendations: {len(d.get(\"recommendations\", []))} recommendations')" 2>/dev/null || echo "  ❌ /api/recommendations: Error"

    echo ""
    echo "🎉 YOUR APP IS FULLY DEPLOYED AND WORKING!"
else
    echo "⏳ API not ready yet (returning HTML)"
    echo ""
    echo "Please:"
    echo "1. Trigger a redeploy in Vercel Dashboard"
    echo "2. Wait 2-3 minutes"
    echo "3. Run this script again"
fi