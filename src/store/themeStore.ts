
import { create } from 'zustand';
import { useRoadmapStore } from './roadmapStore';

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  isDarkMode: useRoadmapStore.getState().isDarkMode,
  
  toggleTheme: () => {
    const roadmapStore = useRoadmapStore.getState();
    roadmapStore.toggleDarkMode();
    set({ isDarkMode: roadmapStore.isDarkMode });
  }
}));

// Listen to changes in the roadmap store to keep the theme store in sync
useRoadmapStore.subscribe(
  (state) => state.isDarkMode,
  (isDarkMode) => {
    useTheme.setState({ isDarkMode });
  }
);
