/**
 * IndexedDB wrapper for offline PWA storage
 * Stores teas, effects, compounds, and journal entries
 */

const DB_NAME = 'tea-effects-db';
const DB_VERSION = 1;

export interface Tea {
  id: string;
  name: string;
  type: string;
  description?: string;
  origin?: string;
  flavor_profile?: string[];
  brewing_temp?: number;
  brewing_time?: string;
  effects?: string[];
  compounds?: Array<{
    name: string;
    amount: string;
  }>;
  image_url?: string;
  created_at?: string;
}

export interface Effect {
  id: string;
  name: string;
  description: string;
  category?: string;
  icon?: string;
  scientific_basis?: string;
}

export interface JournalEntry {
  id: string;
  tea_id: string;
  tea_name: string;
  rating: number;
  notes: string;
  effects_experienced: string[];
  brewing_notes?: string;
  created_at: string;
  synced: boolean;
}

class TeaEffectsDB {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Teas store
        if (!db.objectStoreNames.contains('teas')) {
          const teasStore = db.createObjectStore('teas', { keyPath: 'id' });
          teasStore.createIndex('type', 'type', { unique: false });
          teasStore.createIndex('name', 'name', { unique: false });
        }

        // Effects store
        if (!db.objectStoreNames.contains('effects')) {
          const effectsStore = db.createObjectStore('effects', { keyPath: 'id' });
          effectsStore.createIndex('category', 'category', { unique: false });
        }

        // Journal entries store
        if (!db.objectStoreNames.contains('journal')) {
          const journalStore = db.createObjectStore('journal', { keyPath: 'id' });
          journalStore.createIndex('tea_id', 'tea_id', { unique: false });
          journalStore.createIndex('created_at', 'created_at', { unique: false });
          journalStore.createIndex('synced', 'synced', { unique: false });
        }

        // Metadata store for sync status
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'key' });
        }
      };
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('Database not initialized');
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Teas operations
  async saveTeas(teas: Tea[]): Promise<void> {
    const store = this.getStore('teas', 'readwrite');
    await Promise.all(teas.map(tea => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(tea);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }));

    // Update last sync timestamp
    await this.setMetadata('teas_last_sync', Date.now());
  }

  async getTeas(): Promise<Tea[]> {
    const store = this.getStore('teas');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getTeaById(id: string): Promise<Tea | undefined> {
    const store = this.getStore('teas');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getTeasByType(type: string): Promise<Tea[]> {
    const store = this.getStore('teas');
    const index = store.index('type');
    return new Promise((resolve, reject) => {
      const request = index.getAll(type);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Effects operations
  async saveEffects(effects: Effect[]): Promise<void> {
    const store = this.getStore('effects', 'readwrite');
    await Promise.all(effects.map(effect => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(effect);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }));

    await this.setMetadata('effects_last_sync', Date.now());
  }

  async getEffects(): Promise<Effect[]> {
    const store = this.getStore('effects');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Journal operations
  async saveJournalEntry(entry: JournalEntry): Promise<void> {
    const store = this.getStore('journal', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(entry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getJournalEntries(): Promise<JournalEntry[]> {
    const store = this.getStore('journal');
    const index = store.index('created_at');
    return new Promise((resolve, reject) => {
      const request = index.getAll();
      request.onsuccess = () => {
        // Sort by created_at descending
        const entries = request.result.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        resolve(entries);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getUnsyncedJournalEntries(): Promise<JournalEntry[]> {
    const store = this.getStore('journal');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const unsynced = request.result.filter((entry: JournalEntry) => !entry.synced);
        resolve(unsynced);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async markJournalEntrySynced(id: string): Promise<void> {
    const store = this.getStore('journal', 'readwrite');
    const entry = await new Promise<JournalEntry>((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (entry) {
      entry.synced = true;
      return new Promise((resolve, reject) => {
        const request = store.put(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }

  async deleteJournalEntry(id: string): Promise<void> {
    const store = this.getStore('journal', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Metadata operations
  async setMetadata(key: string, value: any): Promise<void> {
    const store = this.getStore('metadata', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put({ key, value });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getMetadata(key: string): Promise<any> {
    const store = this.getStore('metadata');
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result?.value);
      request.onerror = () => reject(request.error);
    });
  }

  // Check if data needs sync
  async needsSync(storeName: 'teas' | 'effects', maxAge: number = 24 * 60 * 60 * 1000): Promise<boolean> {
    const lastSync = await this.getMetadata(`${storeName}_last_sync`);
    if (!lastSync) return true;
    return Date.now() - lastSync > maxAge;
  }

  // Clear all data (useful for logout or reset)
  async clearAll(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const storeNames = ['teas', 'effects', 'journal', 'metadata'];
    await Promise.all(storeNames.map(storeName => {
      const store = this.getStore(storeName, 'readwrite');
      return new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }));
  }
}

// Singleton instance
let dbInstance: TeaEffectsDB | null = null;

export async function getDB(): Promise<TeaEffectsDB> {
  if (!dbInstance) {
    dbInstance = new TeaEffectsDB();
    await dbInstance.init();
  }
  return dbInstance;
}

export default TeaEffectsDB;
