'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BrewTimerProps {
  teaName: string;
  recommendedTime: number; // in seconds
  temperature: number;
}

export function BrewTimer({ teaName, recommendedTime, temperature }: BrewTimerProps) {
  const [timeLeft, setTimeLeft] = useState(recommendedTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            // Play notification sound (if supported)
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Tea is Ready! 🍵', {
                body: `Your ${teaName} has finished steeping.`,
                icon: '/icon-192x192.png',
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, teaName]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(recommendedTime);
      setIsComplete(false);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(recommendedTime);
    setIsComplete(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((recommendedTime - timeLeft) / recommendedTime) * 100;

  return (
    <div className="relative bg-gradient-to-br from-tea-brown-50 to-tea-clay-50 rounded-xl border border-tea-brown-200 p-8 shadow-organic">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-tea-leaf-pattern pointer-events-none rounded-xl" />

      <div className="relative z-10">
        {/* Tea Info */}
        <div className="text-center mb-8">
          <h3 className="font-serif text-2xl font-semibold text-tea-brown-800 mb-2">
            {teaName}
          </h3>
          <p className="font-sans text-tea-clay-600">
            Recommended: {temperature}°C • {formatTime(recommendedTime)}
          </p>
        </div>

        {/* Timer Circle */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Progress Ring */}
          <svg className="transform -rotate-90 w-64 h-64">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-tea-brown-200"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={isComplete ? 'text-tea-sage-500' : 'text-tea-amber-500'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              style={{
                pathLength: progress / 100,
                strokeDasharray: 2 * Math.PI * 120,
              }}
            />
          </svg>

          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {isComplete ? (
                <motion.div
                  key="complete"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="text-center"
                >
                  <Bell className="w-16 h-16 text-tea-sage-500 mb-2 animate-bounce" />
                  <p className="font-serif text-2xl text-tea-sage-700 font-semibold">
                    Ready!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="timer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="font-serif text-5xl font-bold text-tea-brown-800">
                    {formatTime(timeLeft)}
                  </p>
                  <p className="font-sans text-sm text-tea-clay-600 mt-2">
                    {isRunning ? 'Steeping...' : 'Ready to brew'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Steam Animation */}
          {isRunning && (
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: [-20, -40, -60],
                scale: [1, 1.5, 2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              <div className="text-4xl">☁️</div>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <Button onClick={handleStart} variant="primary" size="lg">
              <Play size={20} className="mr-2" />
              {timeLeft === recommendedTime ? 'Start' : 'Resume'}
            </Button>
          ) : (
            <Button onClick={handlePause} variant="secondary" size="lg">
              <Pause size={20} className="mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={handleReset} variant="ghost" size="lg">
            <RotateCcw size={20} className="mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
