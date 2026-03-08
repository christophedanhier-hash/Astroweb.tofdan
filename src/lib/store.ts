import { create } from 'zustand';
import { CollectionStatus, UserCollection } from '@/types/AstroWeb.tofdan';

interface CollectionState {
  collections: Record<string, UserCollection>; // Key is objectId
  setCollectionsCache: (collectionsList: UserCollection[]) => void;
  getCollectionStatus: (objectId: string) => UserCollection;
}

export const useCollectionStore = create<CollectionState>()((set, get) => ({
  collections: {},

  // Called in a Client Component to hydrate the store with data fetched from the API
  setCollectionsCache: (collectionsList: UserCollection[]) => set((state) => {
    const newCollections: Record<string, UserCollection> = { ...state.collections };
    collectionsList.forEach((col) => {
      newCollections[col.objectId] = col;
    });
    return { collections: newCollections };
  }),

  // Public visitors only read from the Store, no toggle functionality
  getCollectionStatus: (objectId) => {
    const state = get();
    return state.collections[objectId] || {
      objectId,
      status: CollectionStatus.AWAITING_DISCOVERY,
      userPhotoUrl: null,
      capturedAt: null
    };
  }
}));
