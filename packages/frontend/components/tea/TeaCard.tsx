'use client';

import { motion } from 'framer-motion';
import { Leaf, Sparkles, Heart } from 'lucide-react';
import { useState } from 'react';

interface TeaCardProps {
  tea: {
    id: number;
    name: string;
    type: string;
    origin: string;
    description: string;
    tea_effects?: Array<{
      effects: {
        name: string;
        category: string;
      };
      intensity: number;
    }>;
    tea_compounds?: Array<{
      compounds: {
        name: string;
      };
      amount_mg_per_cup: number;
    }>;
  };
  onSelect?: (teaId: number) => void;
}

export function TeaCard({ tea, onSelect }: TeaCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const getCaffeine = () => {
    return tea.tea_compounds?.find(c => c.compounds.name.toLowerCase() === 'caffeine')?.amount_mg_per_cup || 0;
  };

  const getLTheanine = () => {
    return tea.tea_compounds?.find(c => c.compounds.name.toLowerCase() === 'l-theanine')?.amount_mg_per_cup || 0;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-tea-brown-50 to-tea-clay-50 border border-tea-brown-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onSelect?.(tea.id)}
    >
      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-4 right-4 z-10"
      >
        <Heart
          size={24}
          className={`transition-colors ${
            isFavorite
              ? 'fill-tea-amber-500 text-tea-amber-500'
              : 'text-tea-brown-400 hover:text-tea-amber-500'
          }`}
        />
      </motion.button>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-1 pr-8">
            {tea.name}
          </h3>
          <p className="font-sans text-sm text-tea-clay-600 flex items-center gap-2">
            <Leaf size={14} className="text-tea-sage-600" />
            <span>{tea.origin} • {tea.type}</span>
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-base text-tea-brown-700 leading-relaxed mb-4 line-clamp-3">
          {tea.description}
        </p>

        {/* Effects badges */}
        {tea.tea_effects && tea.tea_effects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tea.tea_effects.slice(0, 3).map((effect) => (
              <span
                key={effect.effects.name}
                className="inline-flex items-center px-3 py-1 rounded-full bg-tea-sage-100 text-tea-sage-700 text-xs font-medium"
              >
                {effect.effects.name.replace(/_/g, ' ')}
              </span>
            ))}
            {tea.tea_effects.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-tea-clay-200 text-tea-clay-700 text-xs font-medium">
                +{tea.tea_effects.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Compounds info */}
        <div className="flex gap-4 pt-4 border-t border-tea-brown-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-tea-clay-600">Caffeine:</span>
            <span className="text-base font-semibold text-tea-brown-800">
              {getCaffeine()}mg
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-tea-clay-600">L-theanine:</span>
            <span className="text-base font-semibold text-tea-brown-800">
              {getLTheanine()}mg
            </span>
          </div>
        </div>

        {/* Hover sparkle */}
        <Sparkles
          size={20}
          className="absolute bottom-4 right-4 text-tea-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.article>
  );
}
