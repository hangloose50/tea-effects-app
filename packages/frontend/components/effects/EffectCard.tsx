'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface EffectCardProps {
  effect: {
    name: string;
    icon: string;
    description: string;
    path: string;
    category?: string;
  };
}

export function EffectCard({ effect }: EffectCardProps) {
  const categoryColors = {
    mental: 'from-tea-sage-100 to-tea-sage-200 border-tea-sage-300',
    physical: 'from-tea-amber-100 to-tea-amber-200 border-tea-amber-300',
    emotional: 'from-tea-clay-100 to-tea-clay-200 border-tea-clay-300',
    default: 'from-tea-brown-100 to-tea-brown-200 border-tea-brown-300',
  };

  const bgColor = categoryColors[effect.category as keyof typeof categoryColors] || categoryColors.default;

  return (
    <Link href={`/effects?effect=${effect.path}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.95 }}
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${bgColor} border-2 p-8 shadow-organic hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[200px] flex flex-col items-center justify-center`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-tea-leaf-pattern pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            className="text-6xl mb-4"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {effect.icon}
          </motion.div>
          <h3 className="font-serif text-2xl font-bold text-tea-brown-800 mb-2">
            {effect.name}
          </h3>
          <p className="font-sans text-base text-tea-brown-700">
            {effect.description}
          </p>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-tea-sage-500 opacity-0 group-hover:opacity-10"
          initial={false}
          whileHover={{ opacity: 0.1 }}
        />
      </motion.div>
    </Link>
  );
}
