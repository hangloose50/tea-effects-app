'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, BookOpen, Library, WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function Navigation() {
  const pathname = usePathname();
  const isOnline = useOnlineStatus();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Teas', href: '/teas', icon: Library },
    { name: 'Journal', href: '/journal', icon: BookOpen },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-tea-brown-200 shadow-organic-lg z-50 md:relative md:border-b md:border-t-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Desktop */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-3xl">🍵</span>
              <span className="font-serif text-xl font-bold text-tea-brown-900">
                Tea Effects
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-around w-full md:w-auto md:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 group"
                >
                  <Icon
                    size={24}
                    className={`transition-colors ${
                      active
                        ? 'text-tea-sage-600'
                        : 'text-tea-brown-500 group-hover:text-tea-sage-500'
                    }`}
                  />
                  <span
                    className={`font-sans text-xs md:text-base font-medium transition-colors ${
                      active
                        ? 'text-tea-sage-700'
                        : 'text-tea-brown-600 group-hover:text-tea-sage-600'
                    }`}
                  >
                    {item.name}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-tea-sage-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Online/Offline Indicator - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {isOnline ? (
              <div className="flex items-center gap-2 text-tea-sage-600">
                <Wifi size={18} />
                <span className="font-sans text-sm">Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-tea-clay-500">
                <WifiOff size={18} />
                <span className="font-sans text-sm">Offline</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Online/Offline Banner - Mobile */}
      {!isOnline && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="bg-tea-clay-100 border-t border-tea-clay-200 md:hidden"
        >
          <div className="px-4 py-2 flex items-center justify-center gap-2 text-tea-clay-700">
            <WifiOff size={16} />
            <span className="font-sans text-sm">You're offline</span>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
