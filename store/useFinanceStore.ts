import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Calculator {
  id: string;
  name: string;
  category: string;
  description: string;
  path: string;
}

interface FinanceState {
  favorites: string[];
  recent: string[];
  currency: string;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  addRecent: (id: string) => void;
  setCurrency: (currency: string) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      favorites: [],
      recent: [],
      currency: 'USD',
      addFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),
      addRecent: (id) =>
        set((state) => {
          const newRecent = state.recent.filter((recId) => recId !== id);
          newRecent.unshift(id);
          return { recent: newRecent.slice(0, 10) }; // Keep only last 10
        }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'finance-calculator-storage',
    }
  )
);
