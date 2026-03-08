import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CollectionStatus, UserCollection } from '@/types/AstroWeb.tofdan';
import { MOCK_COLLECTION } from './data/catalogs';

interface CollectionState {
  collections: Record<string, UserCollection>; // Key is objectId
  toggleCollectionStatus: (objectId: string, photoUrl?: string, notes?: string) => void;
  getCollectionStatus: (objectId: string) => UserCollection;
}

// Convert mock array to Record for easier lookup
const initialCollections = MOCK_COLLECTION.reduce((acc, current) => {
  acc[current.objectId] = current;
  return acc;
}, {} as Record<string, UserCollection>);

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      collections: initialCollections,

      toggleCollectionStatus: (objectId, photoUrl, notes) => set((state) => {
        const current = state.collections[objectId];
        const newStatus = current?.status === CollectionStatus.COLLECTED 
          ? CollectionStatus.AWAITING_DISCOVERY 
          : CollectionStatus.COLLECTED;

        return {
          collections: {
            ...state.collections,
            [objectId]: {
              objectId,
              status: newStatus,
              userPhotoUrl: photoUrl || current?.userPhotoUrl || null,
              capturedAt: newStatus === CollectionStatus.COLLECTED ? new Date() : null,
              notes: notes || current?.notes
            }
          }
        };
      }),

      getCollectionStatus: (objectId) => {
        const state = get();
        return state.collections[objectId] || {
          objectId,
          status: CollectionStatus.AWAITING_DISCOVERY,
          userPhotoUrl: null,
          capturedAt: null
        };
      }
    }),
    {
      name: 'astroweb-collection-storage',
    }
  )
);
