# Tea Effects - Organic Design System Specification

## Design Philosophy

Inspired by premium organic tea brands like Tea Source, Harney & Sons, and Rishi Tea, this design system embodies the warmth, elegance, and natural beauty of artisanal tea culture. The aesthetic celebrates organic textures, earthy warmth, and timeless sophistication.

---

## 1. Color Palette

### Primary Colors - Tea-Inspired Earth Tones

```javascript
// Tailwind config extension
colors: {
  // Warm Browns - Primary brand color (inspired by oxidized tea leaves)
  'tea-brown': {
    50: '#FAF8F5',   // Cream white - backgrounds
    100: '#F2EDE4',  // Light cream - cards
    200: '#E5D9C6',  // Sandy beige - borders
    300: '#D4BFA1',  // Light tan - disabled states
    400: '#B89968',  // Medium brown - secondary actions
    500: '#8B6F47',  // Rich brown - primary actions
    600: '#6B532E',  // Deep brown - hover states
    700: '#4A3920',  // Dark brown - headings
    800: '#2D2415',  // Espresso - body text
    900: '#1A140B',  // Almost black - emphasis
  },

  // Sage Green - Accent color (inspired by fresh tea leaves)
  'tea-sage': {
    50: '#F5F7F4',   // Pale sage - subtle backgrounds
    100: '#E8EDE6',  // Light sage - cards
    200: '#CBD6C7',  // Soft sage - borders
    300: '#A8B9A1',  // Medium sage - icons
    400: '#7D9174',  // Sage green - accents
    500: '#5A6F52',  // Deep sage - primary accents
    600: '#455540',  // Forest sage - hover
    700: '#2F3B2D',  // Dark sage - text
    800: '#1E251C',  // Deep forest - emphasis
    900: '#0F140E',  // Almost black green
  },

  // Amber - Warmth accent (inspired by brewed tea)
  'tea-amber': {
    50: '#FBF7F0',   // Pale amber
    100: '#F5E9D6',  // Light amber
    200: '#EAD3AD',  // Soft amber
    300: '#DEB97F',  // Medium amber
    400: '#CC9A52',  // Rich amber
    500: '#B8802E',  // Deep amber - warnings, highlights
    600: '#8F6324',  // Dark amber
    700: '#64451A',  // Burnt amber
    800: '#3D2910',  // Deep burnt
    900: '#1F1508',  // Almost black amber
  },

  // Clay - Earthy neutral (inspired by teaware)
  'tea-clay': {
    50: '#F8F6F4',   // Off-white
    100: '#EBE7E3',  // Light clay
    200: '#D5CEC7',  // Soft clay
    300: '#B8ACA0',  // Medium clay
    400: '#9A8A78',  // Clay brown
    500: '#7A6B5A',  // Deep clay
    600: '#5E5247',  // Dark clay
    700: '#423932',  // Burnt clay
    800: '#2A241F',  // Deep burnt
    900: '#15120F',  // Almost black
  },

  // Functional Colors
  'tea-success': '#5A6F52',  // Sage green
  'tea-warning': '#B8802E',  // Amber
  'tea-error': '#8B4A3C',    // Terracotta red
  'tea-info': '#6B7D8F',     // Slate blue-grey
}
```

### Color Usage Guidelines

- **Backgrounds**: tea-brown-50, tea-sage-50, tea-clay-50
- **Cards & Surfaces**: tea-brown-100, tea-sage-100 (gradient overlays)
- **Primary Actions**: tea-brown-500 to tea-brown-700
- **Accents & Highlights**: tea-sage-500, tea-amber-500
- **Text Primary**: tea-brown-800
- **Text Secondary**: tea-brown-600, tea-clay-600
- **Borders**: tea-brown-200, tea-clay-200

---

## 2. Typography System

### Font Families

```javascript
// Tailwind config extension
fontFamily: {
  // Elegant Serif - Headings and emphasis
  'serif': ['Playfair Display', 'Crimson Text', 'Georgia', 'serif'],

  // Clean Sans-Serif - Body text and UI
  'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],

  // Monospace - Code and technical details
  'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
}
```

### Type Scale

```javascript
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],     // 12px
  'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],    // 14px
  'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],           // 16px
  'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],         // 18px
  'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],    // 20px
  '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],    // 24px
  '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],  // 30px
  '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],   // 36px
  '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],      // 48px
  '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],     // 60px
}
```

### Typography Usage

- **Hero Headings**: font-serif text-5xl/6xl font-bold text-tea-brown-900
- **Section Headings**: font-serif text-3xl/4xl font-semibold text-tea-brown-800
- **Card Titles**: font-serif text-2xl font-semibold text-tea-brown-800
- **Body Text**: font-sans text-base text-tea-brown-700
- **Captions**: font-sans text-sm text-tea-clay-600
- **Labels**: font-sans text-sm font-medium text-tea-brown-700
- **Buttons**: font-sans text-base font-medium tracking-wide

### Web Font Loading

```html
<!-- Add to layout.tsx head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 3. Spacing & Layout System

### Spacing Scale

```javascript
spacing: {
  'px': '1px',
  '0': '0',
  '0.5': '0.125rem',  // 2px
  '1': '0.25rem',     // 4px
  '2': '0.5rem',      // 8px
  '3': '0.75rem',     // 12px
  '4': '1rem',        // 16px
  '5': '1.25rem',     // 20px
  '6': '1.5rem',      // 24px
  '8': '2rem',        // 32px
  '10': '2.5rem',     // 40px
  '12': '3rem',       // 48px
  '16': '4rem',       // 64px
  '20': '5rem',       // 80px
  '24': '6rem',       // 96px
}
```

### Layout Patterns

```javascript
// Responsive breakpoints
screens: {
  'xs': '375px',   // Small phones
  'sm': '640px',   // Large phones
  'md': '768px',   // Tablets
  'lg': '1024px',  // Small laptops
  'xl': '1280px',  // Desktops
  '2xl': '1536px', // Large screens
}

// Container widths
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',  // 16px
    sm: '1.5rem',     // 24px
    lg: '2rem',       // 32px
    xl: '3rem',       // 48px
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',  // Max content width
  },
}
```

---

## 4. Border Radius & Shadows

### Border Radius

```javascript
borderRadius: {
  'none': '0',
  'sm': '0.25rem',   // 4px - small elements
  'DEFAULT': '0.5rem',   // 8px - buttons, inputs
  'md': '0.75rem',   // 12px - cards
  'lg': '1rem',      // 16px - large cards
  'xl': '1.5rem',    // 24px - hero elements
  '2xl': '2rem',     // 32px - special features
  'full': '9999px',  // Pills, avatars
}
```

### Box Shadows - Organic, Soft Shadows

```javascript
boxShadow: {
  // Subtle elevation
  'sm': '0 1px 2px 0 rgba(43, 57, 32, 0.05)',

  // Default card shadow
  'DEFAULT': '0 2px 8px 0 rgba(43, 57, 32, 0.08), 0 1px 3px 0 rgba(43, 57, 32, 0.06)',

  // Medium elevation (hover states)
  'md': '0 4px 12px 0 rgba(43, 57, 32, 0.12), 0 2px 4px 0 rgba(43, 57, 32, 0.08)',

  // Large elevation (modals, popovers)
  'lg': '0 8px 24px 0 rgba(43, 57, 32, 0.15), 0 4px 8px 0 rgba(43, 57, 32, 0.1)',

  // Extra large (floating elements)
  'xl': '0 12px 32px 0 rgba(43, 57, 32, 0.18), 0 6px 12px 0 rgba(43, 57, 32, 0.12)',

  // Inner shadow (inputs)
  'inner': 'inset 0 2px 4px 0 rgba(43, 57, 32, 0.06)',

  // None
  'none': 'none',
}
```

---

## 5. Component Specifications

### 5.1 Tea Card Component

**Visual Design:**
- Background: Layered texture with subtle tea leaf watermark
- Card surface: tea-brown-100 with organic border
- Hover: Gentle lift with shadow-md, border accent in tea-sage-500
- Border: 1px solid tea-brown-200, rounded-lg

**Structure:**
```
┌─────────────────────────────────┐
│  [Tea Leaf Texture Overlay]     │
│                                  │
│  Tea Name (font-serif, 2xl)     │
│  Origin • Type (font-sans, sm)  │
│                                  │
│  Description text...            │
│                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │Effect│ │Effect│ │Effect│    │
│  └──────┘ └──────┘ └──────┘    │
│                                  │
│  Caffeine: 40mg  L-theanine...  │
│                                  │
│  [Brew Button] [Journal Button] │
└─────────────────────────────────┘
```

**Implementation Specs:**
```jsx
<div className="group relative overflow-hidden rounded-lg bg-tea-brown-100 border border-tea-brown-200 p-6 transition-all duration-300 hover:shadow-md hover:border-tea-sage-500 hover:-translate-y-1">
  {/* Texture overlay */}
  <div className="absolute inset-0 opacity-5 bg-tea-leaf-pattern" />

  {/* Content */}
  <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-1">
    Dragonwell Green Tea
  </h3>
  <p className="font-sans text-sm text-tea-clay-600 mb-4">
    Hangzhou, China • Green Tea
  </p>

  {/* Effects badges */}
  <div className="flex flex-wrap gap-2 mb-4">
    <span className="px-3 py-1 rounded-full bg-tea-sage-100 text-tea-sage-700 text-xs font-medium">
      Focus
    </span>
  </div>
</div>
```

### 5.2 Effect Selector Cards

**Visual Design:**
- Large, breathable layout with organic icons
- Icon: Hand-drawn line art style (replace emojis)
- Background: Subtle gradient from tea-brown-50 to tea-sage-50
- Border: Delicate 1px tea-brown-200
- Active state: Border tea-sage-500, subtle glow

**Structure:**
```
┌────────────────┐
│                │
│   [Line Icon]  │ ← Hand-drawn tea leaf/cup icon
│                │
│  Effect Name   │
│  (Serif, 2xl)  │
│                │
│  Description   │
│  (Sans, sm)    │
│                │
└────────────────┘
```

**Implementation:**
```jsx
<button className="group relative w-full rounded-xl bg-gradient-to-br from-tea-brown-50 to-tea-sage-50 border border-tea-brown-200 p-8 text-center transition-all duration-300 hover:border-tea-sage-500 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:ring-offset-2">
  {/* Icon container */}
  <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center">
    <svg className="w-full h-full text-tea-brown-600 group-hover:text-tea-sage-600 transition-colors" />
  </div>

  <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-2">
    Focus
  </h3>
  <p className="font-sans text-sm text-tea-clay-600">
    Sustained concentration
  </p>
</button>
```

### 5.3 Brewing Timer Component

**Visual Design:**
- Circular progress indicator with organic styling
- Center: Time remaining in serif font
- Outer ring: Animated tea-sage-500 stroke
- Background: Warm tea-brown-100 circle

**Structure:**
```
     ┌─────────┐
    ╱           ╲
   │   03:45    │  ← Time in serif
   │            │
   │  Steeping  │  ← Status
    ╲           ╱
     └─────────┘
   Progress ring (animated)
```

**Implementation:**
```jsx
<div className="relative inline-flex items-center justify-center">
  {/* Background circle */}
  <div className="w-48 h-48 rounded-full bg-tea-brown-100 border-4 border-tea-brown-200" />

  {/* Progress ring (SVG) */}
  <svg className="absolute inset-0 w-48 h-48 -rotate-90">
    <circle
      cx="96"
      cy="96"
      r="88"
      stroke="currentColor"
      strokeWidth="8"
      fill="none"
      className="text-tea-sage-500"
      strokeDasharray={`${progress} ${552 - progress}`}
      strokeLinecap="round"
    />
  </svg>

  {/* Center content */}
  <div className="absolute text-center">
    <div className="font-serif text-4xl font-bold text-tea-brown-800">
      03:45
    </div>
    <div className="font-sans text-sm text-tea-clay-600 mt-1">
      Steeping
    </div>
  </div>
</div>
```

### 5.4 Journal Entry Component

**Visual Design:**
- Handwritten journal aesthetic
- Background: tea-brown-50 with subtle paper texture
- Border: Torn paper effect or decorative corner elements
- Typography: Slightly larger, more readable serif

**Structure:**
```
┌─────────────────────────────────┐
│ ╭─────────────────────────────╮ │
│ │  Nov 13, 2025  🍃           │ │
│ │                             │ │
│ │  Sencha Green Tea           │ │
│ │  Morning meditation session │ │
│ │                             │ │
│ │  "Wonderfully calming..."   │ │
│ │                             │ │
│ │  Effects: ⭐⭐⭐⭐⭐         │ │
│ ╰─────────────────────────────╯ │
└─────────────────────────────────┘
```

**Implementation:**
```jsx
<article className="relative rounded-lg bg-tea-brown-50 border border-tea-brown-200 p-6 shadow-sm">
  {/* Decorative corner */}
  <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
    <svg>/* Tea leaf corner decoration */</svg>
  </div>

  {/* Header */}
  <header className="flex items-center justify-between mb-4">
    <time className="font-sans text-sm text-tea-clay-600">
      Nov 13, 2025
    </time>
    <span className="text-tea-sage-600">🍃</span>
  </header>

  {/* Content */}
  <h3 className="font-serif text-xl font-semibold text-tea-brown-800 mb-2">
    Sencha Green Tea
  </h3>
  <p className="font-sans text-base text-tea-brown-700 leading-relaxed mb-4">
    Morning meditation session. Wonderfully calming...
  </p>

  {/* Rating */}
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg className="w-5 h-5 text-tea-amber-500 fill-current" />
    ))}
  </div>
</article>
```

### 5.5 Buttons

**Primary Button:**
```jsx
<button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-tea-brown-600 text-white font-sans font-medium tracking-wide shadow-sm transition-all duration-200 hover:bg-tea-brown-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-tea-brown-500 focus:ring-offset-2 active:translate-y-px">
  Get Recommendations
</button>
```

**Secondary Button:**
```jsx
<button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-tea-sage-100 text-tea-sage-800 font-sans font-medium tracking-wide border border-tea-sage-300 transition-all duration-200 hover:bg-tea-sage-200 hover:border-tea-sage-400 focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:ring-offset-2">
  Browse Teas
</button>
```

**Ghost Button:**
```jsx
<button className="inline-flex items-center justify-center px-6 py-3 rounded-md text-tea-brown-700 font-sans font-medium tracking-wide transition-all duration-200 hover:bg-tea-brown-100 focus:outline-none focus:ring-2 focus:ring-tea-brown-300 focus:ring-offset-2">
  Learn More
</button>
```

### 5.6 Input Fields

**Text Input:**
```jsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-md bg-white border border-tea-brown-200 font-sans text-base text-tea-brown-800 placeholder-tea-clay-400 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:border-tea-sage-400"
  placeholder="Search teas..."
/>
```

**Select Dropdown:**
```jsx
<select className="w-full px-4 py-3 rounded-md bg-white border border-tea-brown-200 font-sans text-base text-tea-brown-800 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:border-tea-sage-400">
  <option>Morning</option>
  <option>Afternoon</option>
</select>
```

---

## 6. Textures & Patterns

### Organic Backgrounds

**Tea Leaf Watermark Pattern:**
```css
/* Create SVG pattern for tea leaves */
.tea-leaf-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-5 0-8 3-8 8 0 3 2 6 5 7-2 1-3 3-3 5 0 4 3 7 8 7s8-3 8-7c0-2-1-4-3-5 3-1 5-4 5-7 0-5-3-8-8-8z' fill='%238B6F47' fill-opacity='0.03'/%3E%3C/svg%3E");
}
```

**Watercolor Texture Overlay:**
```css
/* Subtle watercolor effect for hero sections */
.watercolor-overlay {
  background-image:
    linear-gradient(120deg, rgba(139, 111, 71, 0.03) 0%, transparent 50%),
    linear-gradient(240deg, rgba(90, 111, 82, 0.03) 0%, transparent 50%);
  background-size: 200% 200%;
}
```

**Paper Texture:**
```css
/* Subtle paper grain for cards */
.paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}
```

### Usage Guidelines

- **Hero sections**: Watercolor overlay with tea leaf pattern
- **Cards**: Paper texture background
- **Large backgrounds**: Gradient from tea-brown-50 to tea-sage-50
- **Accent areas**: Tea leaf watermark at 3-5% opacity

---

## 7. Animation & Motion Guidelines

### Principles

1. **Gentle & Organic**: Movements should feel natural, never jarring
2. **Purposeful**: Animations guide attention and provide feedback
3. **Performance**: 60fps on mobile devices
4. **Respectful**: Reduce motion for users with vestibular disorders

### Timing Functions

```javascript
// Tailwind config extension
transitionTimingFunction: {
  'organic': 'cubic-bezier(0.33, 0, 0.2, 1)',      // Smooth easing
  'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',   // Gentle bounce
  'tea': 'cubic-bezier(0.25, 0.1, 0.25, 1)',       // Custom tea motion
}
```

### Duration Scale

```javascript
transitionDuration: {
  'fastest': '100ms',  // Micro-interactions
  'fast': '200ms',     // Hover states
  'normal': '300ms',   // Default transitions
  'slow': '500ms',     // Page transitions
  'slowest': '700ms',  // Complex animations
}
```

### Common Animations

**Hover Lift:**
```jsx
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
```

**Fade In:**
```jsx
// Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
/>
```

**Stagger Children:**
```jsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

**Brewing Timer Progress:**
```jsx
<motion.circle
  strokeDasharray={circumference}
  strokeDashoffset={circumference}
  animate={{ strokeDashoffset: progress }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
/>
```

**Page Transitions:**
```jsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 20 }}
  transition={{ duration: 0.3 }}
/>
```

### Micro-interactions

**Button Press:**
```jsx
className="active:scale-95 transition-transform duration-100"
```

**Card Reveal:**
```jsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
/>
```

**Loading State:**
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
>
  {/* Tea cup icon */}
</motion.div>
```

---

## 8. Iconography

### Icon Style Guide

- **Style**: Hand-drawn, organic line art
- **Stroke width**: 1.5-2px
- **Color**: tea-brown-600 (default), tea-sage-600 (accent)
- **Size scale**: 16px, 20px, 24px, 32px, 48px, 64px

### Icon Library Recommendation

Use **Lucide React** (already installed) with custom styling:

```jsx
import { Leaf, Coffee, Clock, BookOpen } from 'lucide-react';

<Leaf
  size={24}
  className="text-tea-sage-600"
  strokeWidth={1.5}
/>
```

### Custom Tea Icons Needed

Create SVG sprites for:
- Tea leaf variations (single, cluster, branch)
- Tea cup (side view, top view)
- Teapot (traditional, modern)
- Steam wisps (animated)
- Brewing timer states
- Effect symbols (focus, calm, energy, sleep, creativity, memory)

---

## 9. Responsive Layout Patterns

### Mobile-First Approach (375px+)

**Stack vertically, generous padding:**
```jsx
<div className="space-y-6 px-4 py-8">
  {/* Single column layout */}
</div>
```

### Tablet (768px+)

**Two-column grids:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Cards */}
</div>
```

### Desktop (1024px+)

**Three-column grids, sidebar layouts:**
```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Tea cards */}
</div>

{/* Sidebar layout */}
<div className="lg:flex lg:gap-8">
  <aside className="lg:w-64 lg:flex-shrink-0">
    {/* Filters */}
  </aside>
  <main className="lg:flex-1">
    {/* Content */}
  </main>
</div>
```

### Touch Target Sizing

- **Minimum**: 44px × 44px (iOS guidelines)
- **Recommended**: 48px × 48px
- **Spacing**: 8px minimum between interactive elements

---

## 10. Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast Ratios:**
- Normal text (16px+): 4.5:1 minimum
  - tea-brown-800 on tea-brown-50: 11.5:1 ✓
  - tea-brown-700 on white: 8.2:1 ✓
- Large text (24px+): 3:1 minimum
  - tea-brown-600 on tea-brown-100: 5.8:1 ✓

**Focus Indicators:**
```jsx
focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:ring-offset-2
```

**Screen Reader Support:**
```jsx
{/* Visually hidden text */}
<span className="sr-only">Loading recommendations</span>

{/* ARIA labels */}
<button aria-label="Add to favorites">
  <Heart size={20} />
</button>
```

**Keyboard Navigation:**
- All interactive elements focusable
- Logical tab order
- Skip links for main content
- Modal focus trapping

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Dark Mode Variant (Optional)

### Color Adaptations

```javascript
// Dark mode palette
colors: {
  'tea-dark': {
    bg: '#1A140B',        // Deep brown-black
    surface: '#2D2415',   // Lighter surface
    border: '#4A3920',    // Borders
    text: '#F2EDE4',      // Light cream text
    muted: '#B89968',     // Muted text
  }
}
```

**Implementation:**
```jsx
<div className="bg-tea-brown-50 dark:bg-tea-dark-bg text-tea-brown-800 dark:text-tea-dark-text">
  {/* Content */}
</div>
```

---

## 12. Implementation Checklist

### Phase 1: Foundation
- [ ] Install Google Fonts (Playfair Display, Inter)
- [ ] Update Tailwind config with color palette
- [ ] Add typography scale and font families
- [ ] Configure spacing and layout system
- [ ] Set up border radius and shadow utilities

### Phase 2: Textures & Patterns
- [ ] Create SVG tea leaf pattern
- [ ] Add watercolor gradient overlays
- [ ] Implement paper texture backgrounds
- [ ] Test texture performance on mobile

### Phase 3: Component Library
- [ ] Build Tea Card component
- [ ] Create Effect Selector cards
- [ ] Design Brewing Timer
- [ ] Build Journal Entry component
- [ ] Style all button variants
- [ ] Design form inputs and controls

### Phase 4: Icons & Illustrations
- [ ] Configure Lucide React icons
- [ ] Create custom tea leaf SVGs
- [ ] Design effect symbol icons
- [ ] Add brewing state illustrations

### Phase 5: Animations
- [ ] Configure Framer Motion variants
- [ ] Implement page transitions
- [ ] Add hover micro-interactions
- [ ] Create loading states
- [ ] Add stagger animations for lists

### Phase 6: Responsive & Accessibility
- [ ] Test all breakpoints (375px - 1536px)
- [ ] Verify touch target sizes (44px+)
- [ ] Test color contrast ratios
- [ ] Add focus indicators
- [ ] Implement keyboard navigation
- [ ] Add ARIA labels
- [ ] Test with screen readers
- [ ] Add reduced motion support

### Phase 7: Polish
- [ ] Add subtle texture overlays
- [ ] Fine-tune animation timing
- [ ] Test PWA install experience
- [ ] Optimize web font loading
- [ ] Add custom 404/error pages
- [ ] Create splash screens

---

## 13. File Structure

```
packages/frontend/
├── app/
│   ├── globals.css          ← Import fonts, base styles
│   ├── layout.tsx            ← Root layout with fonts
│   └── ...
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── tea/
│   │   ├── TeaCard.tsx
│   │   ├── EffectSelector.tsx
│   │   ├── BrewingTimer.tsx
│   │   └── JournalEntry.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
├── lib/
│   └── animations.ts         ← Framer Motion variants
├── public/
│   ├── patterns/
│   │   ├── tea-leaf.svg
│   │   └── watercolor.svg
│   └── icons/
│       └── effects/
│           ├── focus.svg
│           └── ...
└── tailwind.config.ts       ← Extended config
```

---

## 14. Performance Budget

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Web font loading**: < 500ms (preconnect, display=swap)
- **Image optimization**: WebP with PNG fallback
- **Animation FPS**: 60fps minimum
- **Lighthouse Score**: 90+ (Performance, Accessibility)

---

## 15. Brand Voice & Copywriting

### Tone
- **Warm & Welcoming**: Like a knowledgeable tea sommelier
- **Educational**: Teach about tea effects without lecturing
- **Mindful**: Reflect the calm, intentional nature of tea
- **Authentic**: Honest about benefits, no exaggerated claims

### Copy Examples

**Hero Section:**
```
Discover Your Perfect Cup
Find teas tailored to your needs—whether seeking focus,
calm, or creativity. Guided by science, perfected by tradition.
```

**Effect Descriptions:**
```
Sustained Focus
L-theanine and moderate caffeine work together to enhance
concentration without jitters. Perfect for deep work sessions.
```

**Loading States:**
```
Steeping your recommendations...
Selecting the finest leaves...
Crafting your perfect blend...
```

---

## Design System Summary

This organic design system transforms your tea recommendation PWA into a premium, natural experience that honors tea culture while providing modern functionality. The earthy color palette, elegant typography, and subtle textures create a warm, inviting atmosphere that encourages mindful tea exploration.

**Key Differentiators:**
- Warm, tea-inspired earth tones (not trendy greens/purples)
- Elegant serif typography for premium feel
- Organic textures and hand-drawn iconography
- Gentle, purposeful animations
- Mobile-first PWA optimization
- WCAG 2.1 AA accessibility compliance

**Next Steps:**
1. Update `/Users/dusti1/tea-effects-app-1/packages/frontend/tailwind.config.ts`
2. Modify `/Users/dusti1/tea-effects-app-1/packages/frontend/app/globals.css`
3. Build component library in `/Users/dusti1/tea-effects-app-1/packages/frontend/components/`
4. Implement page designs using new system

This specification provides everything developers need to implement the design directly in Tailwind CSS and Framer Motion.
