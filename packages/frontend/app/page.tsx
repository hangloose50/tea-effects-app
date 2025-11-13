'use client';

import { motion } from 'framer-motion';
import { EffectCard } from '@/components/effects/EffectCard';
import Link from 'next/link';
import { Leaf, BookOpen, FlaskConical } from 'lucide-react';

const effects = [
  { name: 'Focus', icon: '🎯', description: 'Sustained concentration', path: 'sustained_focus', category: 'mental' },
  { name: 'Calm', icon: '😌', description: 'Reduce anxiety & stress', path: 'calm', category: 'emotional' },
  { name: 'Energy', icon: '⚡', description: 'Physical & mental boost', path: 'energy_boost', category: 'physical' },
  { name: 'Sleep', icon: '💤', description: 'Prepare for rest', path: 'sleep_prep', category: 'emotional' },
  { name: 'Creativity', icon: '🎨', description: 'Divergent thinking', path: 'creativity', category: 'mental' },
  { name: 'Memory', icon: '🧠', description: 'Learning & recall', path: 'memory', category: 'mental' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-tea-brown-50 via-tea-clay-50 to-tea-brown-100">
      {/* Subtle paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30 texture-paper" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="inline-block mb-6"
          >
            <div className="text-7xl mb-4 animate-steam">🍵</div>
          </motion.div>

          <h1 className="font-serif text-6xl md:text-7xl font-bold text-tea-brown-900 mb-4">
            Tea Effects
          </h1>
          <p className="font-sans text-xl md:text-2xl text-tea-clay-600 max-w-2xl mx-auto">
            Discover the perfect tea for your state of mind, powered by AI
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {effects.map((effect, index) => (
              <motion.div
                key={effect.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <EffectCard effect={effect} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Link href="/teas">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-tea-sage-100 to-tea-sage-200 border border-tea-sage-300 rounded-xl p-8 text-center hover:shadow-lg transition-all cursor-pointer"
            >
              <Leaf size={48} className="mx-auto mb-4 text-tea-sage-700" />
              <h3 className="font-serif text-2xl font-bold text-tea-sage-800 mb-2">Browse Teas</h3>
              <p className="font-sans text-tea-sage-700">Explore our tea library</p>
            </motion.div>
          </Link>

          <Link href="/journal">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-tea-amber-100 to-tea-amber-200 border border-tea-amber-300 rounded-xl p-8 text-center hover:shadow-lg transition-all cursor-pointer"
            >
              <BookOpen size={48} className="mx-auto mb-4 text-tea-amber-700" />
              <h3 className="font-serif text-2xl font-bold text-tea-amber-800 mb-2">Tea Journal</h3>
              <p className="font-sans text-tea-amber-700">Track your experiences</p>
            </motion.div>
          </Link>

          <Link href="/blends">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-tea-clay-100 to-tea-clay-200 border border-tea-clay-300 rounded-xl p-8 text-center hover:shadow-lg transition-all cursor-pointer"
            >
              <FlaskConical size={48} className="mx-auto mb-4 text-tea-clay-700" />
              <h3 className="font-serif text-2xl font-bold text-tea-clay-800 mb-2">Create Blend</h3>
              <p className="font-sans text-tea-clay-700">Custom tea combinations</p>
            </motion.div>
          </Link>
        </div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-gradient-to-br from-tea-brown-100 to-tea-clay-100 border border-tea-brown-200 rounded-2xl p-10 shadow-organic"
        >
          <h3 className="font-serif text-3xl font-bold text-tea-brown-900 mb-8 text-center">
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', text: 'Select your desired effect or mood' },
              { num: '2', text: 'Get AI-powered tea recommendations' },
              { num: '3', text: 'Brew, enjoy & track your experience' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tea-sage-200 text-tea-sage-800 font-serif text-2xl font-bold mb-4">
                  {step.num}
                </div>
                <p className="font-sans text-lg text-tea-brown-700">{step.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
