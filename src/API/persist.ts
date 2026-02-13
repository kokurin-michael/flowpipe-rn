import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import type {PersistedClient} from '@tanstack/query-persist-client-core';
import {createMMKV} from 'react-native-mmkv';

const PERSIST_BUSTER = '1';
const PERSIST_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const PERSIST_CACHE_KEY = 'FLOWPIPE_QUERY_CACHE';
const STORAGE_ID = 'flowpipe-storage';

const storage = createMMKV({id: STORAGE_ID});

const storageAdapter = {
  setItem: async (key: string, value: string): Promise<void> => {
    await Promise.resolve();
    storage.set(key, value);
  },
  getItem: async (key: string): Promise<string | null> => {
    await Promise.resolve();
    const value_1 = storage.getString(key);
    return value_1 === undefined ? null : value_1;
  },
  removeItem: async (key: string): Promise<void> => {
    await Promise.resolve();
    storage.remove(key);
  },
};

const clientPersister = createAsyncStoragePersister({
  storage: storageAdapter,
  key: PERSIST_CACHE_KEY,
  throttleTime: 2000,
  deserialize: safeDeserialize,
});

const persistOptions = {
  persister: clientPersister,
  maxAge: PERSIST_MAX_AGE_MS,
  buster: PERSIST_BUSTER,
  dehydrateOptions: {
    shouldDehydrateMutation: () => false,
  },
};

const mmkvDevToolsOptions = {
  storages: {[STORAGE_ID]: storage} as const,
};

function safeDeserialize(cachedString: string): PersistedClient {
  try {
    const parsed = JSON.parse(cachedString) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      'clientState' in parsed &&
      'timestamp' in parsed &&
      'buster' in parsed
    ) {
      return parsed as PersistedClient;
    }

    throw new Error('Invalid persisted cache shape');
  } catch (error) {
    throw new Error(
      `Failed to restore query cache: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export {
  PERSIST_BUSTER,
  PERSIST_MAX_AGE_MS,
  STORAGE_ID,
  clientPersister,
  mmkvDevToolsOptions,
  persistOptions,
  storage,
};
