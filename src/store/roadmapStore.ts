import { create } from 'zustand';
import { Roadmap, Topic, Language } from '../types';
import { generateRoadmapWithGemini, generateNotesWithGemini } from '../services/geminiService';

// Updated interface to make level optional
interface RoadmapGenerationRequest {
  role: string;
}

interface ContentCache {
  [topicId: string]: {
    [language: string]: string;
  };
}

interface RoadmapStore {
  roadmaps: Roadmap[];
  currentRoadmap: Roadmap | null;
  selectedTopic: Topic | null;
  selectedTopicForNotes: string | null;
  isLoading: boolean;
  errorMessage: string | null;
  language: Language;
  contentCache: ContentCache;
  isDarkMode: boolean;
  searchHistory: Array<{query: string, timestamp: Date}>;
  savedRoadmaps: Roadmap[];
  searchParams: {role?: string} | null; // Added searchParams

  // Actions
  generateRoadmap: (request: RoadmapGenerationRequest) => Promise<void>;
  setSelectedTopic: (topic: Topic | null) => void;
  setSelectedTopicForNotes: (topicLabel: string | null) => void;
  setLanguage: (language: Language) => void;
  addRoadmap: (roadmap: Roadmap) => void;
  fetchTopicContent: (topic: Topic) => Promise<Topic>;
  setCurrentRoadmap: (roadmapId: string | null) => void;
  toggleDarkMode: () => void;
  saveRoadmap: (roadmap: Roadmap, userId: string) => Promise<void>;
  loadUserRoadmaps: (userId: string) => Promise<void>;
  loadSearchHistory: (userId: string) => Promise<void>;
  saveSearch: (query: string, userId: string, searchParams?: {role?: string}) => Promise<void>; // Added searchParams
  deleteRoadmap: (roadmapId: string, userId: string) => Promise<void>; // Added deleteRoadmap
}

import { saveRoadmap as saveRoadmapToFirebase, saveSearch as saveSearchToFirebase, getUserData } from '../services/firebase';

export const useRoadmapStore = create<RoadmapStore>((set, get) => ({
  roadmaps: [],
  currentRoadmap: null,
  selectedTopic: null,
  selectedTopicForNotes: null,
  isLoading: false,
  errorMessage: null,
  language: 'english',
  contentCache: {},
  isDarkMode: false,
  searchHistory: [],
  savedRoadmaps: [],
  searchParams: null, // Initialize searchParams

  generateRoadmap: async (request: RoadmapGenerationRequest) => {
    try {
      set({ isLoading: true, errorMessage: null });

      const roadmap = await generateRoadmapWithGemini(request);

      set(state => ({
        roadmaps: [...state.roadmaps, roadmap],
        currentRoadmap: roadmap,
        isLoading: false
      }));

      return roadmap;
    } catch (error) {
      console.error('Error generating roadmap:', error);
      set({ 
        isLoading: false, 
        errorMessage: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
      throw error;
    }
  },

  saveRoadmap: async (roadmap: Roadmap, userId: string) => {
    try {
      const state = get();
      const roadmapId = roadmap.id;
      await saveRoadmapToFirebase(userId, {
        id: roadmapId,
        title: `Roadmap for ${state.searchParams?.role || state.currentRoadmap?.title?.replace(' Roadmap', '') || 'Unknown'}`,
        savedAt: new Date() // Use Date instead of Timestamp
      });
      set(state => ({
        savedRoadmaps: [...state.savedRoadmaps, roadmap]
      }));
    } catch (error) {
      console.error('Error saving roadmap:', error);
      set({ 
        errorMessage: error instanceof Error ? error.message : 'An error occurred while saving the roadmap' 
      });
    }
  },

  loadUserRoadmaps: async (userId: string) => {
    try {
      const userData = await getUserData(userId);
      if (userData && userData.savedRoadmaps) {
        set({
          savedRoadmaps: userData.savedRoadmaps
        });
      }
    } catch (error) {
      console.error('Error loading user roadmaps:', error);
      set({ 
        errorMessage: error instanceof Error ? error.message : 'An error occurred while loading your roadmaps' 
      });
    }
  },

  loadSearchHistory: async (userId: string) => {
    try {
      const userData = await getUserData(userId);
      if (userData && userData.searchHistory) {
        set({
          searchHistory: userData.searchHistory
        });
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  },

  saveSearch: async (query: string, userId: string, searchParams?: {role?: string}) => {
    try {
      await saveSearchToFirebase(userId, query);
      const searchData = {
        query,
        timestamp: new Date()
      };
      set(state => ({
        searchHistory: [...state.searchHistory, searchData],
        searchParams: searchParams // Update searchParams
      }));
    } catch (error) {
      console.error('Error saving search:', error);
    }
  },

  setSelectedTopic: (topic: Topic | null) => {
    // Ensure topic has proper data structure before setting
    if (topic && !topic.data) {
      // Add data structure if missing
      topic = {
        ...topic,
        data: {
          label: topic.id || "Unknown Topic",
          description: ""
        }
      };
    }
    set({ selectedTopic: topic });
  },

  setLanguage: (language: Language) => {
    set({ language });
  },

  addRoadmap: (roadmap: Roadmap) => {
    set(state => ({
      roadmaps: [...state.roadmaps, roadmap],
      currentRoadmap: roadmap
    }));
  },

  fetchTopicContent: async (topic: Topic) => {
    const store = get();

    // Check if we have cached content for this topic and language
    const topicContent = store.contentCache?.[topic.id]?.[store.language];
    if (topicContent) {
      return Promise.resolve({ ...topic, content: topicContent });
    }

    return generateNotesWithGemini(topic.data.label, store.language)
      .then(content => {
        // Create a new topic object with the content
        const updatedTopic = { ...topic, content };

        // Update the roadmap with the new topic content
        const updatedRoadmap = store.currentRoadmap ? {
          ...store.currentRoadmap,
          nodes: store.currentRoadmap.nodes.map(node => 
            node.id === topic.id ? { ...node, data: { ...node.data, content } } : node
          )
        } : null;

        // Update cache
        const newCache = { ...store.contentCache };
        if (!newCache[topic.id]) {
          newCache[topic.id] = {};
        }
        newCache[topic.id][store.language] = content;

        if (updatedRoadmap) {
          set({ 
            currentRoadmap: updatedRoadmap,
            contentCache: newCache
          });
        } else {
          set({ contentCache: newCache });
        }

        return { ...topic, content };
      });
  },

  setCurrentRoadmap: (roadmapId: string | null) => {
    if (!roadmapId) {
      set({ currentRoadmap: null });
      return;
    }

    const { roadmaps } = get();
    const roadmap = roadmaps.find(r => r.id === roadmapId) || null;
    set({ currentRoadmap: roadmap });
  },
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    // Apply dark mode class to the document element
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newDarkMode };
  }),
  deleteRoadmap: async (roadmapId: string, userId: string) => {
    if (!userId) return;

    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const savedRoadmaps = userData.savedRoadmaps || [];

        // Filter out the roadmap to delete
        const updatedRoadmaps = savedRoadmaps.filter(
          (roadmap: any) => roadmap.id !== roadmapId
        );

        // Update the user document
        await updateDoc(userRef, {
          savedRoadmaps: updatedRoadmaps
        });

        // If the current roadmap is the one being deleted, clear it
        const { currentRoadmap } = get();
        if (currentRoadmap && currentRoadmap.id === roadmapId) {
          set({ currentRoadmap: null });
        }

        // Update the local state
        useRoadmapStore.getState().loadUserRoadmaps(userId);
      }
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      throw error;
    }
  },
}));