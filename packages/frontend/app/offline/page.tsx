'use client';

import { motion } from 'framer-motion';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-tea-brown-50 via-tea-clay-50 to-tea-brown-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card-organic !bg-white max-w-md w-full text-center"
      >
        {/* Offline Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="mb-6"
        >
          <WifiOff size={80} className="mx-auto text-tea-clay-400" />
        </motion.div>

        {/* Title */}
        <h1 className="font-serif text-4xl font-bold text-tea-brown-900 mb-4">
          You're Offline
        </h1>

        {/* Description */}
        <p className="font-sans text-lg text-tea-brown-700 mb-6 leading-relaxed">
          It looks like you've lost your internet connection. Don't worry – you can still browse your saved teas and journal entries.
        </p>

        {/* Available Features */}
        <div className="bg-tea-sage-50 rounded-lg p-6 mb-6 text-left border border-tea-sage-200">
          <h2 className="font-serif text-xl font-bold text-tea-brown-900 mb-3">
            Available Offline:
          </h2>
          <ul className="font-sans text-tea-brown-700 space-y-2">
            <li className="flex items-start">
              <span className="text-tea-sage-600 mr-2">✓</span>
              Browse previously viewed teas
            </li>
            <li className="flex items-start">
              <span className="text-tea-sage-600 mr-2">✓</span>
              View and add journal entries
            </li>
            <li className="flex items-start">
              <span className="text-tea-sage-600 mr-2">✓</span>
              Access tea information and brewing guides
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleRetry}
            variant="primary"
            className="!bg-tea-sage-600 hover:!bg-tea-sage-700 w-full sm:w-auto"
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="w-full"
            >
              <Home size={18} className="mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-6 border-t border-tea-brown-200"
        >
          <p className="font-sans text-sm text-tea-clay-600">
            Your journal entries will automatically sync when you're back online
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
