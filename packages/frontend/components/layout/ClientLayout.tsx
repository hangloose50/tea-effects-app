'use client';

import { useEffect } from 'react';
import { Navigation } from './Navigation';
import { initializeBackgroundSync } from '@/lib/sync/backgroundSync';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize background sync for journal entries
    initializeBackgroundSync();

    // Request persistent storage
    if ('storage' in navigator && 'persist' in navigator.storage) {
      navigator.storage.persist().then((persistent) => {
        if (persistent) {
          console.log('Storage will persist');
        }
      });
    }
  }, []);

  return (
    <>
      <Navigation />
      <main className="pb-20 md:pb-0">{children}</main>
    </>
  );
}
