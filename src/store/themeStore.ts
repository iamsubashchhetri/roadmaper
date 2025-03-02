import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      // Default to dark mode instead of using system preference
      isDarkMode: true,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Listen to changes in the roadmap store to keep the theme store in sync
//This part remains as it was originally designed
useRoadmapStore.subscribe(
  (state) => state.isDarkMode,
  (isDarkMode) => {
    useTheme.setState({ isDarkMode });
  }
);