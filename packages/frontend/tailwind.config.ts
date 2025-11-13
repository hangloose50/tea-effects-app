import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
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

        // Dark mode colors
        'tea-dark': {
          bg: '#1A140B',        // Deep brown-black
          surface: '#2D2415',   // Lighter surface
          border: '#4A3920',    // Borders
          text: '#F2EDE4',      // Light cream text
          muted: '#B89968',     // Muted text
        },
      },

      fontFamily: {
        // Elegant Serif - Headings and emphasis
        serif: ['Playfair Display', 'Crimson Text', 'Georgia', 'serif'],
        // Clean Sans-Serif - Body text and UI
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Monospace - Code and technical details
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],    // 14px
        base: ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],           // 16px
        lg: ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],         // 18px
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],    // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],      // 48px
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],     // 60px
      },

      spacing: {
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
      },

      borderRadius: {
        'sm': '0.25rem',   // 4px - small elements
        'DEFAULT': '0.5rem',   // 8px - buttons, inputs
        'md': '0.75rem',   // 12px - cards
        'lg': '1rem',      // 16px - large cards
        'xl': '1.5rem',    // 24px - hero elements
        '2xl': '2rem',     // 32px - special features
      },

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
      },

      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.33, 0, 0.2, 1)',      // Smooth easing
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',   // Gentle bounce
        'tea': 'cubic-bezier(0.25, 0.1, 0.25, 1)',       // Custom tea motion
      },

      transitionDuration: {
        'fastest': '100ms',  // Micro-interactions
        'fast': '200ms',     // Hover states
        'normal': '300ms',   // Default transitions
        'slow': '500ms',     // Page transitions
        'slowest': '700ms',  // Complex animations
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'steam': {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.6', transform: 'translateY(-10px) scale(1.1)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'steam': 'steam 3s ease-in-out infinite',
      },

      backgroundImage: {
        'tea-leaf-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-5 0-8 3-8 8 0 3 2 6 5 7-2 1-3 3-3 5 0 4 3 7 8 7s8-3 8-7c0-2-1-4-3-5 3-1 5-4 5-7 0-5-3-8-8-8z' fill='%238B6F47' fill-opacity='0.03'/%3E%3C/svg%3E\")",
        'watercolor-overlay': 'linear-gradient(120deg, rgba(139, 111, 71, 0.03) 0%, transparent 50%), linear-gradient(240deg, rgba(90, 111, 82, 0.03) 0%, transparent 50%)',
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },

      screens: {
        'xs': '375px',   // Small phones
        'sm': '640px',   // Large phones
        'md': '768px',   // Tablets
        'lg': '1024px',  // Small laptops
        'xl': '1280px',  // Desktops
        '2xl': '1536px', // Large screens
      },

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
      },
    },
  },
  plugins: [],
};

export default config;
