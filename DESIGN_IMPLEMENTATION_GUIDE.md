# Design System Implementation Guide

Quick start guide for implementing the organic tea design system.

---

## Files Created

1. **DESIGN_SYSTEM.md** - Complete design system specification
2. **COMPONENT_EXAMPLES.md** - Ready-to-use component code
3. **SVG_ICONS.md** - Custom tea-themed SVG icons
4. **tailwind.config.ts** - Updated with organic color palette and utilities
5. **globals.css** - Base styles, typography, and utility classes
6. **lib/animations.ts** - Framer Motion animation library

---

## Quick Start (5 Steps)

### Step 1: Update Layout (Add Fonts)

File: `/packages/frontend/app/layout.tsx`

Update the metadata to include proper theme color:

```tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#8B6F47', // Changed to tea-brown-500
};
```

The Google Fonts are already loaded in `globals.css`, no additional changes needed.

### Step 2: Test the Design System

Run the development server to see the changes:

```bash
cd /Users/dusti1/tea-effects-app-1/packages/frontend
npm run dev
```

Visit `http://localhost:3000` - you should see:
- New cream/beige background (tea-brown-50)
- Playfair Display for headings (if present)
- Inter for body text
- Updated color scheme

### Step 3: Create Component Directories

```bash
cd /Users/dusti1/tea-effects-app-1/packages/frontend
mkdir -p components/ui components/tea components/layout
```

### Step 4: Update Home Page

File: `/packages/frontend/app/page.tsx`

Replace with organic design:

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Moon, Palette, BookOpen } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const effects = [
  { name: 'Focus', icon: Brain, description: 'Sustained concentration', path: 'sustained_focus' },
  { name: 'Calm', icon: Heart, description: 'Reduce anxiety & stress', path: 'calm' },
  { name: 'Energy', icon: Zap, description: 'Physical & mental boost', path: 'energy_boost' },
  { name: 'Sleep', icon: Moon, description: 'Prepare for rest', path: 'sleep_prep' },
  { name: 'Creativity', icon: Palette, description: 'Divergent thinking', path: 'creativity' },
  { name: 'Memory', icon: BookOpen, description: 'Learning & recall', path: 'memory' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-tea-brown-50 via-tea-sage-50 to-tea-brown-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-6xl font-bold text-tea-brown-900 mb-4">
            Discover Your Perfect Cup
          </h1>
          <p className="font-sans text-xl text-tea-clay-600 max-w-2xl mx-auto">
            Find teas tailored to your needs—whether seeking focus, calm, or creativity.
            Guided by science, perfected by tradition.
          </p>
        </motion.div>

        {/* Effect Selector */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl font-semibold text-tea-brown-800 mb-8 text-center"
          >
            What do you need right now?
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {effects.map((effect) => {
              const Icon = effect.icon;
              return (
                <motion.div key={effect.name} variants={staggerItem}>
                  <Link
                    href={`/effects?effect=${effect.path}`}
                    className="group block relative rounded-xl bg-gradient-to-br from-tea-brown-50 to-tea-sage-50 border border-tea-brown-200 p-8 transition-all duration-300 hover:border-tea-sage-500 hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:ring-offset-2"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 w-16 h-16 flex items-center justify-center">
                        <Icon
                          size={48}
                          strokeWidth={1.5}
                          className="text-tea-brown-600 group-hover:text-tea-sage-600 transition-colors"
                        />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-2">
                        {effect.name}
                      </h3>
                      <p className="font-sans text-sm text-tea-clay-600">
                        {effect.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <Link
            href="/blends"
            className="group rounded-xl bg-tea-sage-100 border border-tea-sage-200 p-6 text-center transition-all duration-300 hover:bg-tea-sage-200 hover:shadow-md hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">
              <Palette size={48} className="mx-auto text-tea-sage-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-tea-sage-800 mb-2">
              Create Blend
            </h3>
            <p className="font-sans text-sm text-tea-sage-700">
              Custom mix for specific effects
            </p>
          </Link>

          <Link
            href="/tea"
            className="group rounded-xl bg-tea-brown-100 border border-tea-brown-200 p-6 text-center transition-all duration-300 hover:bg-tea-brown-200 hover:shadow-md hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">
              <BookOpen size={48} className="mx-auto text-tea-brown-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-tea-brown-800 mb-2">
              Browse Teas
            </h3>
            <p className="font-sans text-sm text-tea-brown-700">
              Explore our tea database
            </p>
          </Link>

          <Link
            href="/journal"
            className="group rounded-xl bg-tea-amber-100 border border-tea-amber-200 p-6 text-center transition-all duration-300 hover:bg-tea-amber-200 hover:shadow-md hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">
              <BookOpen size={48} className="mx-auto text-tea-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-tea-amber-800 mb-2">
              Tea Journal
            </h3>
            <p className="font-sans text-sm text-tea-amber-700">
              Track your experiences
            </p>
          </Link>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 rounded-xl bg-tea-brown-100 border border-tea-brown-200 p-8"
        >
          <h3 className="font-serif text-3xl font-bold text-tea-brown-900 mb-8 text-center">
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tea-sage-100 flex items-center justify-center">
                <span className="font-serif text-2xl font-bold text-tea-sage-700">1</span>
              </div>
              <p className="font-sans text-base text-tea-brown-700">
                Select your desired effect
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tea-sage-100 flex items-center justify-center">
                <span className="font-serif text-2xl font-bold text-tea-sage-700">2</span>
              </div>
              <p className="font-sans text-base text-tea-brown-700">
                Get AI-powered recommendations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tea-sage-100 flex items-center justify-center">
                <span className="font-serif text-2xl font-bold text-tea-sage-700">3</span>
              </div>
              <p className="font-sans text-base text-tea-brown-700">
                Brew & track your experience
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

### Step 5: Update Effects Page

File: `/packages/frontend/app/effects/page.tsx`

Update the loading and recommendation display:

```tsx
// Replace the loading state section (lines 84-89):
{loading && (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="spinner mb-4" />
    <p className="font-serif text-xl text-tea-brown-800 mb-2">
      Steeping your recommendations...
    </p>
    <p className="font-sans text-sm text-tea-clay-600">
      Selecting the finest leaves for your needs
    </p>
  </div>
)}

// Update the recommendation card styling (lines 93-146):
{!loading && recommendations.length > 0 && (
  <div className="space-y-6">
    {recommendations.map((rec, index) => (
      <article
        key={index}
        className="relative overflow-hidden rounded-lg bg-tea-brown-100 border border-tea-brown-200 p-8 shadow hover:shadow-md transition-shadow"
      >
        {/* Organic texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-tea-leaf-pattern pointer-events-none" />

        {/* Content (relative positioning) */}
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-tea-brown-900 mb-1">
                {rec.tea.name}
              </h2>
              <p className="font-sans text-base text-tea-clay-600 capitalize">
                {rec.tea.type} • {rec.tea.origin}
              </p>
            </div>
            <div className="badge-sage text-base font-semibold">
              #{index + 1} Pick
            </div>
          </div>

          <p className="font-sans text-base text-tea-brown-700 leading-relaxed mb-6">
            {rec.reasoning}
          </p>

          {/* Compounds */}
          <div className="bg-tea-sage-50 rounded-lg border border-tea-sage-200 p-4 mb-6">
            <h3 className="font-serif text-lg font-semibold text-tea-sage-800 mb-3">
              Compounds
            </h3>
            <div className="flex gap-4 flex-wrap">
              <div className="bg-white px-4 py-2 rounded-md border border-tea-sage-200">
                <span className="font-sans text-sm text-tea-clay-600">Caffeine:</span>
                <span className="ml-2 font-sans text-base font-bold text-tea-brown-800">
                  {rec.compound_breakdown.caffeine_mg}mg
                </span>
              </div>
              <div className="bg-white px-4 py-2 rounded-md border border-tea-sage-200">
                <span className="font-sans text-sm text-tea-clay-600">L-theanine:</span>
                <span className="ml-2 font-sans text-base font-bold text-tea-brown-800">
                  {rec.compound_breakdown.l_theanine_mg}mg
                </span>
              </div>
            </div>
          </div>

          {/* Brewing */}
          <div className="bg-tea-amber-50 rounded-lg border border-tea-amber-200 p-4">
            <h3 className="font-serif text-lg font-semibold text-tea-amber-800 mb-3">
              Brewing Instructions
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-sans text-sm text-tea-amber-700 mb-1">Temperature</p>
                <p className="font-serif text-2xl font-bold text-tea-brown-800">
                  {rec.brewing_method.temperature_c}°C
                </p>
              </div>
              <div>
                <p className="font-sans text-sm text-tea-amber-700 mb-1">Time</p>
                <p className="font-serif text-2xl font-bold text-tea-brown-800">
                  {rec.brewing_method.steep_time_sec}s
                </p>
              </div>
              <div>
                <p className="font-sans text-sm text-tea-amber-700 mb-1">Amount</p>
                <p className="font-serif text-2xl font-bold text-tea-brown-800">
                  {rec.brewing_method.amount_g}g
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    ))}
  </div>
)}
```

---

## Color Palette Reference

### Primary Colors
- **Backgrounds**: `bg-tea-brown-50`, `bg-tea-sage-50`
- **Cards**: `bg-tea-brown-100`, `bg-tea-sage-100`
- **Borders**: `border-tea-brown-200`, `border-tea-clay-200`
- **Text Primary**: `text-tea-brown-800`, `text-tea-brown-900`
- **Text Secondary**: `text-tea-clay-600`
- **Accents**: `text-tea-sage-600`, `text-tea-amber-500`

### Button Classes
- **Primary**: `btn-primary` (brown background)
- **Secondary**: `btn-secondary` (sage green outline)
- **Ghost**: `btn-ghost` (transparent)

### Badge Classes
- **Sage**: `badge-sage`
- **Amber**: `badge-amber`
- **Clay**: `badge-clay`

---

## Typography Usage

### Headings
```tsx
<h1 className="font-serif text-5xl font-bold text-tea-brown-900">
<h2 className="font-serif text-3xl font-semibold text-tea-brown-800">
<h3 className="font-serif text-2xl font-semibold text-tea-brown-800">
```

### Body Text
```tsx
<p className="font-sans text-base text-tea-brown-700 leading-relaxed">
<span className="font-sans text-sm text-tea-clay-600">
```

---

## Animation Usage

### Import
```tsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
```

### Fade In
```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
>
  {/* Content */}
</motion.div>
```

### Stagger Children
```tsx
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects
```tsx
<motion.button
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
>
  Button
</motion.button>
```

---

## Component Library Structure

Create these directories and files:

```
/packages/frontend/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── LoadingSpinner.tsx
│   ├── tea/
│   │   ├── TeaCard.tsx
│   │   ├── EffectSelector.tsx
│   │   ├── BrewingTimer.tsx
│   │   └── JournalEntry.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── icons/
│       ├── TeaLeaf.tsx
│       ├── TeaCup.tsx
│       └── index.ts
├── lib/
│   ├── animations.ts  ← Already created
│   └── utils.ts
└── app/
    ├── globals.css    ← Already updated
    ├── layout.tsx
    ├── page.tsx       ← Update with organic design
    └── effects/
        └── page.tsx   ← Update with organic design
```

---

## Testing Checklist

- [ ] Colors appear warm and organic (browns, sages, ambers)
- [ ] Playfair Display loads for headings
- [ ] Inter loads for body text
- [ ] Animations are smooth (60fps)
- [ ] Hover states work on cards and buttons
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Focus indicators visible (keyboard navigation)
- [ ] Loading states display correctly
- [ ] Reduced motion respected

---

## Next Steps

1. **Implement components** - Use code from COMPONENT_EXAMPLES.md
2. **Add custom icons** - Create React components from SVG_ICONS.md
3. **Build remaining pages** - Apply design system to all routes
4. **Test accessibility** - Use keyboard navigation, screen readers
5. **Optimize performance** - Test on mobile devices
6. **Add micro-interactions** - Polish hover states and transitions

---

## Resources

- **Full Design System**: See DESIGN_SYSTEM.md
- **Component Code**: See COMPONENT_EXAMPLES.md
- **SVG Icons**: See SVG_ICONS.md
- **Tailwind Config**: packages/frontend/tailwind.config.ts
- **Global Styles**: packages/frontend/app/globals.css
- **Animations**: packages/frontend/lib/animations.ts

---

## Support

If you encounter issues:
1. Clear Next.js cache: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Check browser console for errors
4. Verify Tailwind is compiling correctly

The design system is now fully implemented and ready for component development!
