#!/bin/bash

echo "🧪 Testing Tea Effects Production Deployment..."
echo "============================================="
echo ""

# Test API endpoints
echo "1. Testing API Endpoints:"
echo -n "   /api/teas: "
if curl -s https://frontend-five-inky-30.vercel.app/api/teas 2>/dev/null | grep -q '"success":true'; then
    echo "✅ Working!"
else
    echo "❌ Not working (needs redeploy)"
fi

echo -n "   /api/recommendations: "
if curl -s -X POST https://frontend-five-inky-30.vercel.app/api/recommendations \
    -H "Content-Type: application/json" \
    -d '{"desired_effect":"creativity","time_of_day":"morning"}' 2>/dev/null | grep -q '"success":true'; then
    echo "✅ Working!"
else
    echo "❌ Not working (needs redeploy)"
fi

echo ""
echo "2. Testing Pages:"
echo -n "   Homepage: "
if curl -s https://frontend-five-inky-30.vercel.app 2>/dev/null | grep -q "Tea Effects"; then
    echo "✅ Accessible"
else
    echo "❌ Not accessible"
fi

echo -n "   Teas page: "
if curl -s https://frontend-five-inky-30.vercel.app/teas 2>/dev/null | grep -q "tea"; then
    echo "✅ Accessible"
else
    echo "❌ Not accessible"
fi

echo ""
echo "============================================="
echo "If APIs show ❌, please redeploy on Vercel!"
echo "If APIs show ✅, your app is fully deployed!"