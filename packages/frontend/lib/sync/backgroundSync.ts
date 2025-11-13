import { getDB } from '../db/indexedDB';
import axios from 'axios';

/**
 * Background sync manager for syncing offline journal entries
 */
export class BackgroundSyncManager {
  private apiUrl: string;
  private syncInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  /**
   * Start periodic sync (every 30 seconds when online)
   */
  startPeriodicSync() {
    if (this.syncInterval) return;

    this.syncInterval = setInterval(() => {
      if (navigator.onLine) {
        this.syncJournalEntries().catch(console.error);
      }
    }, 30000); // 30 seconds
  }

  /**
   * Stop periodic sync
   */
  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Sync unsynced journal entries to the server
   */
  async syncJournalEntries(): Promise<number> {
    if (!navigator.onLine) {
      console.log('Offline - skipping sync');
      return 0;
    }

    try {
      const db = await getDB();
      const unsyncedEntries = await db.getUnsyncedJournalEntries();

      if (unsyncedEntries.length === 0) {
        return 0;
      }

      console.log(`Syncing ${unsyncedEntries.length} journal entries...`);

      let syncedCount = 0;

      for (const entry of unsyncedEntries) {
        try {
          // Send to API
          await axios.post(`${this.apiUrl}/api/journal`, {
            tea_id: entry.tea_id,
            rating: entry.rating,
            notes: entry.notes,
            effects_experienced: entry.effects_experienced,
            brewing_notes: entry.brewing_notes,
            created_at: entry.created_at
          });

          // Mark as synced in local DB
          await db.markJournalEntrySynced(entry.id);
          syncedCount++;
        } catch (error) {
          console.error(`Failed to sync entry ${entry.id}:`, error);
          // Continue with next entry
        }
      }

      if (syncedCount > 0) {
        console.log(`Successfully synced ${syncedCount} entries`);

        // Show notification if permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Tea Effects', {
            body: `Synced ${syncedCount} journal ${syncedCount === 1 ? 'entry' : 'entries'}`,
            icon: '/icon-192x192.png'
          });
        }
      }

      return syncedCount;
    } catch (error) {
      console.error('Background sync error:', error);
      return 0;
    }
  }

  /**
   * Request notification permission for sync notifications
   */
  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  /**
   * Register service worker for background sync
   */
  async registerServiceWorkerSync() {
    if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
      console.log('Background Sync not supported');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      // Register a sync event
      await (registration as any).sync.register('sync-journal');
      console.log('Background sync registered');
      return true;
    } catch (error) {
      console.error('Background sync registration failed:', error);
      return false;
    }
  }
}

// Singleton instance
let syncManager: BackgroundSyncManager | null = null;

export function getSyncManager(): BackgroundSyncManager {
  if (!syncManager) {
    syncManager = new BackgroundSyncManager();
  }
  return syncManager;
}

/**
 * Initialize background sync when app loads
 */
export function initializeBackgroundSync() {
  if (typeof window === 'undefined') return;

  const manager = getSyncManager();

  // Request notification permission
  manager.requestNotificationPermission();

  // Start periodic sync
  manager.startPeriodicSync();

  // Register service worker sync
  manager.registerServiceWorkerSync();

  // Sync immediately when coming online
  window.addEventListener('online', () => {
    console.log('Back online - syncing...');
    manager.syncJournalEntries().catch(console.error);
  });
}
