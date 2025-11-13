# Design System Quick Reference Card

Cheat sheet for developers implementing the organic tea design system.

---

## Color Classes - Copy & Paste

### Backgrounds
```tsx
bg-tea-brown-50    // Cream white (main bg)
bg-tea-brown-100   // Light cream (cards)
bg-tea-sage-50     // Pale sage (accent bg)
bg-tea-sage-100    // Light sage (accent cards)
bg-tea-amber-100   // Light amber (warm accents)
```

### Text Colors
```tsx
text-tea-brown-900 // Almost black (headings)
text-tea-brown-800 // Espresso (body text)
text-tea-brown-700 // Dark brown (secondary)
text-tea-clay-600  // Clay brown (captions)
text-tea-sage-600  // Deep sage (accents)
```

### Borders
```tsx
border-tea-brown-200   // Sandy beige (default)
border-tea-sage-500    // Deep sage (hover/active)
border-tea-clay-200    // Soft clay (subtle)
```

---

## Typography Classes

### Headings
```tsx
className="font-serif text-5xl font-bold text-tea-brown-900"
className="font-serif text-3xl font-semibold text-tea-brown-800"
className="font-serif text-2xl font-semibold text-tea-brown-800"
```

### Body Text
```tsx
className="font-sans text-base text-tea-brown-700 leading-relaxed"
className="font-sans text-sm text-tea-clay-600"
```

---

## Component Classes

### Buttons
```tsx
className="btn-primary"     // Brown, white text
className="btn-secondary"   // Sage outline
className="btn-ghost"       // Transparent
```

### Cards
```tsx
className="card"           // Basic card
className="card-hover"     // With hover lift
className="card-organic"   // With tea leaf texture
```

### Badges
```tsx
className="badge-sage"     // Sage green badge
className="badge-amber"    // Amber badge
className="badge-clay"     // Clay badge
```

### Inputs
```tsx
className="input"          // Standard input
```

---

## Animation Imports

```tsx
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardVariants,
} from '@/lib/animations';
```

---

## Common Patterns

### Page Container
```tsx
<div className="min-h-screen bg-gradient-to-br from-tea-brown-50 via-tea-sage-50 to-tea-brown-50">
  <div className="container mx-auto px-4 py-16">
    {/* Content */}
  </div>
</div>
```

### Card with Texture
```tsx
<div className="relative overflow-hidden rounded-lg bg-tea-brown-100 border border-tea-brown-200 p-6 shadow">
  <div className="absolute inset-0 opacity-5 bg-tea-leaf-pattern pointer-events-none" />
  <div className="relative">
    {/* Content */}
  </div>
</div>
```

### Animated Card
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -4 }}
  className="rounded-lg bg-tea-brown-100 p-6"
>
  {/* Content */}
</motion.div>
```

### Staggered List
```tsx
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {/* Item */}
    </motion.div>
  ))}
</motion.div>
```

### Button with Icon
```tsx
<button className="btn-primary flex items-center gap-2">
  <Leaf size={20} />
  Browse Teas
</button>
```

### Loading Spinner
```tsx
<div className="spinner" />
```

---

## Responsive Breakpoints

```tsx
// Mobile first
className="px-4 md:px-8"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Text sizes
className="text-2xl md:text-3xl lg:text-4xl"
```

---

## Hover States

```tsx
className="transition-all duration-300 hover:shadow-md hover:-translate-y-1"
className="hover:bg-tea-sage-100 hover:text-tea-sage-700"
className="hover:border-tea-sage-500"
```

---

## Focus States

```tsx
className="focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:ring-offset-2"
```

---

## Icons (Lucide React)

```tsx
import { Brain, Heart, Zap, Moon, Palette, BookOpen, Leaf } from 'lucide-react';

<Brain size={24} className="text-tea-brown-600" strokeWidth={1.5} />
<Leaf size={48} className="text-tea-sage-600" strokeWidth={1.5} />
```

---

## Color Values (for custom CSS)

```css
/* Browns */
--tea-brown-50: #FAF8F5;
--tea-brown-100: #F2EDE4;
--tea-brown-500: #8B6F47;
--tea-brown-800: #2D2415;

/* Sages */
--tea-sage-50: #F5F7F4;
--tea-sage-100: #E8EDE6;
--tea-sage-500: #5A6F52;
--tea-sage-700: #2F3B2D;

/* Ambers */
--tea-amber-100: #F5E9D6;
--tea-amber-500: #B8802E;

/* Clays */
--tea-clay-200: #D5CEC7;
--tea-clay-600: #5E5247;
```

---

## Shadow Values

```css
/* Soft organic shadows */
shadow-sm: 0 1px 2px rgba(43, 57, 32, 0.05)
shadow: 0 2px 8px rgba(43, 57, 32, 0.08)
shadow-md: 0 4px 12px rgba(43, 57, 32, 0.12)
shadow-lg: 0 8px 24px rgba(43, 57, 32, 0.15)
```

---

## Animation Durations

```tsx
duration-fastest  // 100ms - micro-interactions
duration-fast     // 200ms - hover states
duration-normal   // 300ms - default
duration-slow     // 500ms - page transitions
```

---

## Common Components Code

### Primary Button
```tsx
<button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-tea-brown-600 text-white font-sans font-medium tracking-wide shadow-sm transition-all duration-200 hover:bg-tea-brown-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-tea-brown-500 focus:ring-offset-2 active:translate-y-px">
  Get Started
</button>
```

### Effect Card
```tsx
<Link
  href="/effects?effect=focus"
  className="group block relative rounded-xl bg-gradient-to-br from-tea-brown-50 to-tea-sage-50 border border-tea-brown-200 p-8 transition-all duration-300 hover:border-tea-sage-500 hover:shadow-md hover:-translate-y-1"
>
  <div className="flex flex-col items-center text-center">
    <Brain size={48} strokeWidth={1.5} className="text-tea-brown-600 group-hover:text-tea-sage-600 transition-colors mb-4" />
    <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-2">
      Focus
    </h3>
    <p className="font-sans text-sm text-tea-clay-600">
      Sustained concentration
    </p>
  </div>
</Link>
```

### Tea Card
```tsx
<article className="relative overflow-hidden rounded-lg bg-tea-brown-100 border border-tea-brown-200 p-6 shadow hover:shadow-md transition-all">
  <div className="absolute inset-0 opacity-5 bg-tea-leaf-pattern pointer-events-none" />
  <div className="relative">
    <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-1">
      Sencha Green Tea
    </h3>
    <p className="font-sans text-sm text-tea-clay-600 mb-4">
      Shizuoka, Japan • Green Tea
    </p>
    <div className="flex flex-wrap gap-2">
      <span className="badge-sage">Focus</span>
      <span className="badge-sage">Energy</span>
    </div>
  </div>
</article>
```

---

## Gradient Backgrounds

```tsx
// Page background
bg-gradient-to-br from-tea-brown-50 via-tea-sage-50 to-tea-brown-50

// Card gradient
bg-gradient-to-br from-tea-brown-50 to-tea-sage-50
```

---

## File Paths Reference

```
Design Docs:
- /DESIGN_SYSTEM.md
- /DESIGN_IMPLEMENTATION_GUIDE.md
- /COMPONENT_EXAMPLES.md
- /SVG_ICONS.md

Code Files:
- /packages/frontend/tailwind.config.ts
- /packages/frontend/app/globals.css
- /packages/frontend/lib/animations.ts
```

---

## Import Paths

```tsx
// Animations
import { fadeInUp } from '@/lib/animations';

// Icons (Lucide)
import { Leaf } from 'lucide-react';

// Next.js
import Link from 'next/link';
import { motion } from 'framer-motion';
```

---

## Testing Checklist

Quick visual checks:
- [ ] Background is cream/beige (not white)
- [ ] Text is warm brown (not black)
- [ ] Cards have soft shadows
- [ ] Headings use Playfair Display
- [ ] Body text uses Inter
- [ ] Hover states lift gently
- [ ] No bright greens remain
- [ ] Icons are hand-drawn style

---

## Common Fixes

### Text too dark?
```tsx
// Change from:
text-black

// To:
text-tea-brown-800
```

### Background too bright?
```tsx
// Change from:
bg-white

// To:
bg-tea-brown-50
```

### Shadows too harsh?
```tsx
// Change from:
shadow-lg

// To:
shadow-md
```

### Border too stark?
```tsx
// Change from:
border-gray-300

// To:
border-tea-brown-200
```

---

## Performance Tips

- Use `motion` only when needed
- Prefer CSS transitions for simple effects
- Load images with Next.js `Image` component
- Use `loading="lazy"` for below-fold content
- Keep animation duration under 500ms
- Test on mobile devices

---

## Quick Links

- [Full Design System](./DESIGN_SYSTEM.md)
- [Component Examples](./COMPONENT_EXAMPLES.md)
- [Implementation Guide](./DESIGN_IMPLEMENTATION_GUIDE.md)
- [SVG Icons](./SVG_ICONS.md)

---

**Keep this reference handy while developing!**

Print or bookmark this page for quick access to all design tokens and common patterns.
