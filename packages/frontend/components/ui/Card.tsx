'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'organic';
  onClick?: () => void;
}

export function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-white border border-tea-brown-200 shadow-sm',
    hover: 'bg-tea-brown-50 border border-tea-brown-200 shadow-md hover:shadow-lg hover:border-tea-sage-400 cursor-pointer',
    organic: 'bg-gradient-to-br from-tea-brown-100 to-tea-clay-100 border border-tea-brown-300 shadow-organic',
  };

  const MotionCard = onClick ? motion.div : 'div';
  const motionProps = onClick
    ? {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <MotionCard
      className={`rounded-lg p-6 transition-all duration-300 ${variants[variant]} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </MotionCard>
  );
}
