# Tea Effects - Component Implementation Examples

This document provides ready-to-use component implementations following the organic design system.

---

## Table of Contents
1. [Tea Card Component](#tea-card-component)
2. [Effect Selector Cards](#effect-selector-cards)
3. [Brewing Timer Component](#brewing-timer-component)
4. [Journal Entry Component](#journal-entry-component)
5. [Button Components](#button-components)
6. [Input Components](#input-components)
7. [Loading States](#loading-states)
8. [Navigation Header](#navigation-header)

---

## Tea Card Component

### Basic Tea Card

```tsx
'use client';

import { motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';
import { cardVariants } from '@/lib/animations';

interface TeaCardProps {
  tea: {
    id: string;
    name: string;
    type: string;
    origin: string;
    description: string;
    effects: string[];
    caffeine_mg: number;
    l_theanine_mg: number;
  };
  onSelect?: (teaId: string) => void;
}

export function TeaCard({ tea, onSelect }: TeaCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="group relative overflow-hidden rounded-lg bg-tea-brown-100 border border-tea-brown-200 p-6 shadow transition-all duration-300 cursor-pointer"
      onClick={() => onSelect?.(tea.id)}
    >
      {/* Organic texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-tea-leaf-pattern pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-1">
              {tea.name}
            </h3>
            <p className="font-sans text-sm text-tea-clay-600 flex items-center gap-2">
              <Leaf size={14} className="text-tea-sage-600" />
              <span>{tea.origin} • {tea.type}</span>
            </p>
          </div>
          <Sparkles
            size={20}
            className="text-tea-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Description */}
        <p className="font-sans text-base text-tea-brown-700 leading-relaxed mb-4">
          {tea.description}
        </p>

        {/* Effects badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tea.effects.map((effect) => (
            <span
              key={effect}
              className="badge-sage"
            >
              {effect}
            </span>
          ))}
        </div>

        {/* Compounds info */}
        <div className="flex gap-4 pt-4 border-t border-tea-brown-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-tea-clay-600">Caffeine:</span>
            <span className="text-base font-semibold text-tea-brown-800">
              {tea.caffeine_mg}mg
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-tea-clay-600">L-theanine:</span>
            <span className="text-base font-semibold text-tea-brown-800">
              {tea.l_theanine_mg}mg
            </span>
          </div>
        </div>
      </div>

      {/* Hover border accent */}
      <div className="absolute inset-0 border-2 border-tea-sage-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.article>
  );
}
```

### Compact Tea Card (List View)

```tsx
export function CompactTeaCard({ tea, onSelect }: TeaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 p-4 rounded-md bg-tea-brown-100 border border-tea-brown-200 hover:border-tea-sage-500 hover:shadow-md transition-all cursor-pointer"
      onClick={() => onSelect?.(tea.id)}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-tea-sage-100 flex items-center justify-center">
        <Leaf size={24} className="text-tea-sage-600" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-serif text-lg font-semibold text-tea-brown-800 truncate">
          {tea.name}
        </h4>
        <p className="font-sans text-sm text-tea-clay-600">
          {tea.type} • {tea.caffeine_mg}mg caffeine
        </p>
      </div>

      {/* Effects count */}
      <div className="flex-shrink-0 badge-sage">
        {tea.effects.length} effects
      </div>
    </motion.div>
  );
}
```

---

## Effect Selector Cards

### Full Effect Selector

```tsx
'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Moon, Palette, BookOpen } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const effectIcons = {
  focus: Brain,
  calm: Heart,
  energy: Zap,
  sleep: Moon,
  creativity: Palette,
  memory: BookOpen,
};

interface EffectSelectorProps {
  effects: Array<{
    id: string;
    name: string;
    description: string;
    icon: keyof typeof effectIcons;
  }>;
  selectedEffect?: string;
  onSelectEffect: (effectId: string) => void;
}

export function EffectSelector({ effects, selectedEffect, onSelectEffect }: EffectSelectorProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {effects.map((effect) => {
        const Icon = effectIcons[effect.icon];
        const isSelected = selectedEffect === effect.id;

        return (
          <motion.button
            key={effect.id}
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectEffect(effect.id)}
            className={`
              relative w-full rounded-xl bg-gradient-to-br from-tea-brown-50 to-tea-sage-50
              border-2 p-8 text-center transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-tea-sage-400 focus:ring-offset-2
              ${
                isSelected
                  ? 'border-tea-sage-500 shadow-md'
                  : 'border-tea-brown-200 hover:border-tea-sage-500 hover:shadow-md'
              }
            `}
          >
            {/* Icon container */}
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <Icon
                size={48}
                strokeWidth={1.5}
                className={`transition-colors duration-300 ${
                  isSelected ? 'text-tea-sage-600' : 'text-tea-brown-600 group-hover:text-tea-sage-600'
                }`}
              />
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-2">
              {effect.name}
            </h3>

            {/* Description */}
            <p className="font-sans text-sm text-tea-clay-600">
              {effect.description}
            </p>

            {/* Selected indicator */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-tea-sage-500 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
```

---

## Brewing Timer Component

### Interactive Brewing Timer

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface BrewingTimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
}

export function BrewingTimer({ duration, onComplete }: BrewingTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const progress = ((duration - timeRemaining) / duration) * 552; // 552 is circumference
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining, onComplete]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(duration);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Timer circle */}
      <div className="relative inline-flex items-center justify-center">
        {/* Background circle */}
        <div className="w-64 h-64 rounded-full bg-tea-brown-100 border-4 border-tea-brown-200" />

        {/* Progress ring */}
        <svg className="absolute inset-0 w-64 h-64 -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-tea-sage-500"
            strokeDasharray={`${progress} 552`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute text-center">
          <motion.div
            key={`${minutes}-${seconds}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-serif text-6xl font-bold text-tea-brown-800"
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.div>
          <div className="font-sans text-base text-tea-clay-600 mt-2">
            {isActive && !isPaused ? 'Steeping' : isPaused ? 'Paused' : 'Ready'}
          </div>
        </div>

        {/* Steam animation when active */}
        {isActive && !isPaused && (
          <>
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-6 bg-tea-sage-300 rounded-full blur-sm"
              animate={{
                y: [-5, -25],
                opacity: [0.3, 0],
                scale: [1, 1.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-4 w-2 h-6 bg-tea-sage-300 rounded-full blur-sm"
              animate={{
                y: [-5, -25],
                opacity: [0.3, 0],
                scale: [1, 1.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.5,
              }}
            />
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="btn-primary flex items-center gap-2"
          >
            <Play size={20} />
            Start Brewing
          </button>
        ) : (
          <>
            <button
              onClick={handlePause}
              className="btn-secondary flex items-center gap-2"
            >
              <Pause size={20} />
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleReset}
              className="btn-ghost flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

---

## Journal Entry Component

### Full Journal Entry Card

```tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

interface JournalEntryProps {
  entry: {
    id: string;
    date: string;
    teaName: string;
    teaType: string;
    notes: string;
    rating: number;
    effects: string[];
    brewTime: string;
  };
  onEdit?: (id: string) => void;
}

export function JournalEntry({ entry, onEdit }: JournalEntryProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative rounded-lg bg-tea-brown-50 border border-tea-brown-200 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="text-tea-sage-600 fill-current">
          <path d="M0 0 L100 0 L100 100 C70 70, 30 70, 0 100 Z" />
        </svg>
      </div>

      {/* Header */}
      <header className="flex items-start justify-between mb-4 relative">
        <div className="flex items-center gap-2 text-tea-clay-600">
          <Calendar size={16} />
          <time className="font-sans text-sm">
            {new Date(entry.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>

        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < entry.rating
                  ? 'text-tea-amber-500 fill-tea-amber-500'
                  : 'text-tea-brown-300'
              }
            />
          ))}
        </div>
      </header>

      {/* Tea info */}
      <div className="mb-4">
        <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-1">
          {entry.teaName}
        </h3>
        <p className="font-sans text-sm text-tea-clay-600">
          {entry.teaType} • Brewed for {entry.brewTime}
        </p>
      </div>

      {/* Notes */}
      <p className="font-sans text-base text-tea-brown-700 leading-relaxed mb-4 italic">
        "{entry.notes}"
      </p>

      {/* Effects */}
      {entry.effects.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-sans text-xs text-tea-clay-600 font-medium">
            Effects experienced:
          </span>
          {entry.effects.map((effect) => (
            <span key={effect} className="badge-sage text-xs">
              {effect}
            </span>
          ))}
        </div>
      )}

      {/* Edit button */}
      {onEdit && (
        <button
          onClick={() => onEdit(entry.id)}
          className="text-sm text-tea-sage-600 hover:text-tea-sage-700 font-medium transition-colors"
        >
          Edit entry
        </button>
      )}
    </motion.article>
  );
}
```

---

## Button Components

### Button Variants Showcase

```tsx
import { Leaf, ArrowRight, Plus, Download } from 'lucide-react';

export function ButtonShowcase() {
  return (
    <div className="space-y-4">
      {/* Primary Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="btn-primary">
          Get Recommendations
        </button>
        <button className="btn-primary flex items-center gap-2">
          <Leaf size={20} />
          Browse Teas
        </button>
        <button className="btn-primary flex items-center gap-2">
          Continue
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Secondary Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="btn-secondary">
          Learn More
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <Plus size={20} />
          Add to Journal
        </button>
      </div>

      {/* Ghost Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="btn-ghost">
          Cancel
        </button>
        <button className="btn-ghost flex items-center gap-2">
          <Download size={20} />
          Export
        </button>
      </div>

      {/* Sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn-primary text-sm px-4 py-2">
          Small
        </button>
        <button className="btn-primary">
          Medium (Default)
        </button>
        <button className="btn-primary text-lg px-8 py-4">
          Large
        </button>
      </div>

      {/* Disabled State */}
      <div className="flex flex-wrap gap-4">
        <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
          Disabled Primary
        </button>
        <button className="btn-secondary opacity-50 cursor-not-allowed" disabled>
          Disabled Secondary
        </button>
      </div>

      {/* Full Width */}
      <button className="btn-primary w-full">
        Full Width Button
      </button>
    </div>
  );
}
```

---

## Input Components

### Form Input Components

```tsx
'use client';

import { Search, ChevronDown } from 'lucide-react';

export function InputShowcase() {
  return (
    <div className="space-y-6 max-w-md">
      {/* Text Input */}
      <div>
        <label htmlFor="search" className="block font-sans text-sm font-medium text-tea-brown-700 mb-2">
          Search Teas
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            className="input pl-10"
            placeholder="Dragon Well, Sencha..."
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tea-clay-400" size={20} />
        </div>
      </div>

      {/* Select Dropdown */}
      <div>
        <label htmlFor="timeOfDay" className="block font-sans text-sm font-medium text-tea-brown-700 mb-2">
          Time of Day
        </label>
        <div className="relative">
          <select id="timeOfDay" className="input appearance-none pr-10">
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-tea-clay-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* Textarea */}
      <div>
        <label htmlFor="notes" className="block font-sans text-sm font-medium text-tea-brown-700 mb-2">
          Tasting Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          className="input resize-none"
          placeholder="Describe your tea experience..."
        />
      </div>

      {/* Range Slider */}
      <div>
        <label htmlFor="intensity" className="block font-sans text-sm font-medium text-tea-brown-700 mb-2">
          Intensity Level
        </label>
        <input
          id="intensity"
          type="range"
          min="1"
          max="5"
          className="w-full h-2 bg-tea-brown-200 rounded-lg appearance-none cursor-pointer accent-tea-sage-500"
        />
        <div className="flex justify-between text-xs text-tea-clay-600 mt-1">
          <span>Mild</span>
          <span>Strong</span>
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-3">
        <input
          id="caffeinated"
          type="checkbox"
          className="w-5 h-5 rounded border-tea-brown-300 text-tea-sage-600 focus:ring-2 focus:ring-tea-sage-400"
        />
        <label htmlFor="caffeinated" className="font-sans text-base text-tea-brown-700">
          Caffeinated only
        </label>
      </div>

      {/* Radio Buttons */}
      <fieldset>
        <legend className="block font-sans text-sm font-medium text-tea-brown-700 mb-2">
          Tea Type
        </legend>
        <div className="space-y-2">
          {['Green', 'Black', 'Oolong', 'White', 'Herbal'].map((type) => (
            <div key={type} className="flex items-center gap-3">
              <input
                id={type.toLowerCase()}
                name="teaType"
                type="radio"
                className="w-4 h-4 border-tea-brown-300 text-tea-sage-600 focus:ring-2 focus:ring-tea-sage-400"
              />
              <label htmlFor={type.toLowerCase()} className="font-sans text-base text-tea-brown-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
```

---

## Loading States

### Loading Components

```tsx
'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { loadingPulse } from '@/lib/animations';

export function LoadingSpinner() {
  return (
    <div className="spinner" />
  );
}

export function LoadingTeaCup() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className="w-12 h-12 text-tea-sage-600"
    >
      <Leaf size={48} />
    </motion.div>
  );
}

export function LoadingDots() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
          className="w-3 h-3 rounded-full bg-tea-sage-600"
        />
      ))}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-6 bg-tea-brown-300 rounded w-3/4 mb-4" />
      <div className="h-4 bg-tea-brown-200 rounded w-full mb-2" />
      <div className="h-4 bg-tea-brown-200 rounded w-5/6 mb-4" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-tea-brown-300 rounded-full" />
        <div className="h-6 w-20 bg-tea-brown-300 rounded-full" />
      </div>
    </div>
  );
}

export function LoadingOverlay({ message = 'Steeping your recommendations...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-tea-brown-900/20 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-sm">
        <motion.div variants={loadingPulse} animate="pulse" className="mb-4 flex justify-center">
          <Leaf size={48} className="text-tea-sage-600" />
        </motion.div>
        <p className="font-serif text-xl text-tea-brown-800">{message}</p>
        <LoadingDots />
      </div>
    </motion.div>
  );
}
```

---

## Navigation Header

### Main Navigation Header

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, BookOpen, Beaker, Home } from 'lucide-react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/effects', label: 'Find Tea', icon: Leaf },
    { href: '/blends', label: 'Create Blend', icon: Beaker },
    { href: '/journal', label: 'Journal', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-organic border-b border-tea-brown-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-2xl font-bold text-tea-brown-900 hover:text-tea-sage-700 transition-colors"
          >
            <Leaf size={32} className="text-tea-sage-600" />
            <span>Tea Effects</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 font-sans text-base font-medium text-tea-brown-700 hover:text-tea-sage-600 transition-colors"
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-tea-brown-700 hover:text-tea-sage-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-base font-medium text-tea-brown-700 hover:bg-tea-sage-100 hover:text-tea-sage-700 transition-colors"
                    >
                      <Icon size={20} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
```

---

## Usage Guidelines

### Importing Components

```tsx
// In your page components
import { TeaCard } from '@/components/tea/TeaCard';
import { EffectSelector } from '@/components/tea/EffectSelector';
import { BrewingTimer } from '@/components/tea/BrewingTimer';
import { JournalEntry } from '@/components/tea/JournalEntry';
```

### Responsive Design

All components are mobile-first and include responsive breakpoints:
- `xs:` - 375px (small phones)
- `sm:` - 640px (large phones)
- `md:` - 768px (tablets)
- `lg:` - 1024px (laptops)
- `xl:` - 1280px (desktops)

### Accessibility

All components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Screen reader support
- Reduced motion preferences

### Performance

- Use `motion` components only when animation is needed
- Lazy load images with Next.js `Image` component
- Optimize SVGs and icons
- Test on mobile devices for 60fps

---

## Next Steps

1. Create `/components/ui/` directory for base components
2. Create `/components/tea/` directory for tea-specific components
3. Implement components one by one
4. Test responsiveness and accessibility
5. Add animations progressively
6. Optimize performance

This component library provides a complete foundation for your organic tea recommendation PWA.
