/**
 * Migration Helper: Zustand Store for Client State
 * Use this for UI state that doesn't need to be synced with server
 * 
 * Examples:
 * - Modal/drawer open states
 * - Form draft states (before submission)
 * - UI preferences (collapsed sections, view modes)
 * - Temporary filters/search
 */

import { create } from "zustand";

interface UIState {
  // Example: Modal states
  isModalOpen: boolean;
  modalContent: string | null;
  
  // Actions
  openModal: (content: string) => void;
  closeModal: () => void;
}

/**
 * Zustand store for client-side UI state
 * Only use this for state that doesn't need server synchronization
 */
export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  modalContent: null,
  
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));

// Note: For server state (user data, interviews, etc.), use TanStack Query hooks from @/src/queries
