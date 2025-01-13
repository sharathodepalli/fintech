import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IncomeStatement, FilterState } from '../types/financial';

const MAX_VALUE = Number.MAX_SAFE_INTEGER;

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedStock: string;
  setSelectedStock: (stock: string) => void;
  financialData: IncomeStatement[];
  setFinancialData: (data: IncomeStatement[]) => void;
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  sortConfig: {
    key: keyof IncomeStatement | null;
    direction: 'asc' | 'desc';
  };
  setSortConfig: (config: { key: keyof IncomeStatement | null; direction: 'asc' | 'desc' }) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      selectedStock: 'AAPL',
      setSelectedStock: (stock) => set({ selectedStock: stock }),
      financialData: [],
      setFinancialData: (data) => set({ financialData: data || [] }),
      filters: {
        dateRange: { start: '', end: '' },
        revenueRange: { min: 0, max: MAX_VALUE },
        netIncomeRange: { min: 0, max: MAX_VALUE },
        searchQuery: '',
      },
      setFilters: (newFilters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        })),
      sortConfig: { key: 'date', direction: 'desc' },
      setSortConfig: (config) => set({ sortConfig: config }),
    }),
    {
      name: 'financial-app-storage',
    }
  )
);