# Tea Effects PWA Features

This document outlines all the Progressive Web App (PWA) features implemented in Tea Effects.

## 🎯 Core PWA Features

### 1. **Installable App**
- ✅ Web App Manifest (`/public/manifest.json`)
- ✅ Custom app icons (192x192 and 512x512)
- ✅ Theme color and splash screen
- ✅ Standalone display mode
- ✅ Works on iOS and Android

**Install locations:**
- Chrome: "Install Tea Effects" in address bar
- iOS Safari: Share → "Add to Home Screen"
- Android Chrome: "Install app" banner

### 2. **Offline Support**
- ✅ Service Worker with `next-pwa`
- ✅ IndexedDB for local data storage
- ✅ Offline fallback page (`/offline`)
- ✅ Cached tea library data
- ✅ Offline journal entries

**What works offline:**
- Browse previously viewed teas
- Create and view journal entries
- View tea information and effects
- Search and filter local tea data

### 3. **Background Sync**
- ✅ Automatic sync when connection restored
- ✅ Journal entry sync to server
- ✅ Periodic sync (every 30 seconds when online)
- ✅ Sync notifications

**How it works:**
- Journal entries created offline are marked as "unsynced"
- When connection is restored, entries automatically sync
- Badge indicator shows offline entries
- Notification confirms successful sync

### 4. **Responsive Design**
- ✅ Mobile-first approach
- ✅ Bottom navigation on mobile
- ✅ Top navigation on desktop
- ✅ Touch-optimized UI
- ✅ Proper viewport configuration

## 📦 Data Storage Architecture

### IndexedDB Structure

**Database:** `tea-effects-db`

**Object Stores:**

1. **teas**
   - Stores all tea information
   - Indexed by: `type`, `name`
   - Syncs from API on page load
   - Fallback when offline

2. **effects**
   - Stores tea effects data
   - Indexed by: `category`
   - Cached for offline browsing

3. **journal**
   - Stores user journal entries
   - Indexed by: `tea_id`, `created_at`, `synced`
   - Persists offline entries until synced

4. **metadata**
   - Stores sync timestamps
   - Tracks last successful sync
   - Cache invalidation logic

### Storage Size
- Estimated: 5-10MB for full tea library
- User journal: ~1KB per entry
- Persistent storage requested automatically

## 🔄 Sync Strategy

### Initial Load
```
1. Check online status
2. Try to fetch from API
3. If successful: Update IndexedDB
4. If failed: Load from IndexedDB cache
5. Display data to user
```

### Background Sync
```
1. User creates journal entry offline
2. Entry saved to IndexedDB (synced: false)
3. When online detected:
   - Sync manager activates
   - POST entry to API
   - Mark as synced in IndexedDB
   - Show notification
```

### Periodic Sync
```
Every 30 seconds (when online):
- Check for unsynced entries
- Attempt to sync
- Update sync status
```

## 🎨 Organic Design System

### Color Palette
- **tea-brown**: Warm earth tones (cream to espresso)
- **tea-sage**: Natural greens (pale sage to forest)
- **tea-amber**: Golden tones (pale to burnt amber)
- **tea-clay**: Neutral clay (off-white to charcoal)

### Typography
- **Serif:** Playfair Display (headings, elegant)
- **Sans-serif:** Inter (body text, clean)

### Animation System
- Framer Motion throughout
- Organic transitions and easing
- Steam animations
- Hover effects
- Stagger animations for lists

### Design Principles
- No trendy purples or neon colors
- Earth-inspired, natural aesthetic
- Inspired by premium tea sites (Tea Source)
- Accessibility-first approach

## 📱 Pages & Components

### Pages
1. **Home** (`/`)
   - Hero with animated tea cup
   - Effect cards
   - Quick action links
   - "How it works" section

2. **Teas** (`/teas`)
   - Full tea library
   - Search functionality
   - Type filters (oolong, pu-erh, green, herbal)
   - Grid layout with TeaCard components

3. **Journal** (`/journal`)
   - Create entries (tea, rating, notes)
   - View all entries
   - Delete entries
   - Offline indicator badges

4. **Offline** (`/offline`)
   - Friendly offline message
   - List of available offline features
   - Retry connection button

### Key Components

1. **TeaCard** - Tea display cards
   - Favorites toggle
   - Effect badges
   - Compound information
   - Brewing details

2. **EffectCard** - Effect selection cards
   - Category-based colors
   - Icon animations
   - Organic gradients

3. **BrewTimer** - Brewing timer
   - Circular progress
   - Steam animation
   - Push notifications
   - Controls (play/pause/reset)

4. **Navigation** - App navigation
   - Bottom nav (mobile)
   - Top nav (desktop)
   - Online/offline indicator
   - Active tab highlighting

5. **Button** - Reusable button
   - 3 variants: primary, secondary, ghost
   - 3 sizes: sm, md, lg
   - Loading states
   - Hover animations

## 🔔 Notifications

### Types
1. **Brew Timer Complete**
   - When tea is ready
   - Plays notification sound
   - Icon badge

2. **Sync Complete**
   - When offline entries sync
   - Shows count of synced entries

3. **Offline Detection**
   - Banner when connection lost
   - Status indicator in nav

### Permission Handling
- Requested on first brew timer use
- Graceful degradation if denied
- Works without notifications

## 🚀 Performance Optimizations

### Code Splitting
- Next.js automatic code splitting
- Route-based chunks
- Dynamic imports for heavy components

### Asset Optimization
- Optimized PNG icons (7.5KB and 22KB)
- SVG for scalable graphics
- Lazy loading images
- Font preloading in `globals.css`

### Caching Strategy
```javascript
// Service Worker (via next-pwa)
- Runtime caching for API calls
- Precaching of static assets
- Network-first for fresh data
- Cache-first for static files
```

### Bundle Sizes
```
Route           Size    First Load JS
/               2.47 kB      124 kB
/teas           3.89 kB      140 kB
/journal        5.9 kB       121 kB
/offline        2.17 kB      124 kB
```

## 🧪 Testing PWA Features

### Installation Test
1. Deploy to Vercel/production
2. Visit in Chrome
3. Look for install prompt
4. Install and verify standalone mode

### Offline Test
1. Open app while online
2. Browse teas page
3. Toggle offline in DevTools
4. Verify cached teas load
5. Create journal entry
6. Toggle online
7. Verify sync notification

### Background Sync Test
1. Go offline
2. Create 3 journal entries
3. Go online
4. Watch sync notifications
5. Verify all 3 entries synced

### Storage Test
```javascript
// In browser console
indexedDB.databases().then(console.log)
// Should show: tea-effects-db
```

## 📊 Analytics Recommendations

Track these PWA metrics:
- Install rate
- Offline usage sessions
- Journal entries created offline
- Sync success rate
- Time to first meaningful paint
- Service worker cache hit rate

## 🔐 Security

### Data Privacy
- All user data stored locally first
- Journal entries encrypted in transit (HTTPS)
- No tracking without consent
- User controls their data

### Content Security
- HTTPS required for service workers
- Secure headers in production
- XSS protection
- CSRF tokens for API

## 📦 Google Play Store (Future)

### Trusted Web Activity (TWA)
To publish to Google Play:

1. **Generate signing key:**
   ```bash
   keytool -genkey -v -keystore tea-effects.keystore \
     -alias tea-effects -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Update `assetlinks.json`:**
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.teaeffects.app",
       "sha256_cert_fingerprints": ["..."]
     }
   }]
   ```

3. **Build TWA using Bubblewrap:**
   ```bash
   npx @bubblewrap/cli init --manifest https://tea-effects.vercel.app/manifest.json
   npx @bubblewrap/cli build
   ```

4. **Test APK:**
   ```bash
   npx @bubblewrap/cli install
   ```

5. **Upload to Play Console**

## 🎯 Next Enhancements

Future PWA improvements:
- [ ] Web Share API for sharing teas
- [ ] Camera API for tea photography
- [ ] File System Access API for CSV export
- [ ] Badging API for unsynced count
- [ ] Periodic Background Sync (when available)
- [ ] Push notifications for tea recommendations
- [ ] Geolocation for tea shop finder
- [ ] WebRTC for tea tasting sessions

## 🆘 Troubleshooting

### Service Worker Not Registering
```bash
# Clear all caches
# Chrome DevTools: Application > Storage > Clear Site Data

# Force reload
Cmd/Ctrl + Shift + R
```

### IndexedDB Not Persisting
```javascript
// Request persistent storage
navigator.storage.persist()
```

### Offline Page Not Showing
```bash
# Verify service worker is active
# Chrome DevTools: Application > Service Workers

# Check offline routing in sw.js
```

### Sync Not Working
```javascript
// Check background sync registration
navigator.serviceWorker.ready.then(reg => {
  console.log(reg.sync);
});
```

## 📚 Resources

- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox Docs](https://developers.google.com/web/tools/workbox)
- [next-pwa](https://github.com/shadowwalker/next-pwa)
- [IndexedDB Guide](https://javascript.info/indexeddb)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)

## ✅ PWA Checklist

- [x] HTTPS deployment
- [x] Valid manifest.json
- [x] Service worker registered
- [x] Icons (192x192, 512x512)
- [x] Offline fallback
- [x] Responsive design
- [x] Fast load times
- [x] Accessible content
- [x] Network resilience
- [x] Installable
- [x] Themed UI
- [x] Safe for work
- [ ] Analytics (optional)
- [ ] A/B testing (optional)

---

**Status:** ✅ Production-ready PWA with full offline support!

**Last Updated:** 2025-11-13
