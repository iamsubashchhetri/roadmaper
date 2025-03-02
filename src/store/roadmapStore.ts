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
  isLoading: boolean;
  errorMessage: string | null;
  language: Language;
  contentCache: ContentCache;
  isDarkMode: boolean; // Added for dark mode

  // Actions
  generateRoadmap: (request: RoadmapGenerationRequest) => Promise<void>;
  setSelectedTopic: (topic: Topic | null) => void;
  setLanguage: (language: Language) => void;
  addRoadmap: (roadmap: Roadmap) => void;
  fetchTopicContent: (topic: Topic) => Promise<Topic>;
  setCurrentRoadmap: (roadmapId: string | null) => void;
  toggleDarkMode: () => void; // Added for dark mode
}

export const useRoadmapStore = create<RoadmapStore>((set, get) => ({
  roadmaps: [],
  currentRoadmap: null,
  selectedTopic: null,
  isLoading: false,
  errorMessage: null,
  language: 'english',
  contentCache: {},
  isDarkMode: false, // Added for dark mode

  generateRoadmap: async (request: RoadmapGenerationRequest) => {
    try {
      set({ isLoading: true, errorMessage: null });

      const roadmap = await generateRoadmapWithGemini(request);

      set(state => ({
        roadmaps: [...state.roadmaps, roadmap],
        currentRoadmap: roadmap,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error generating roadmap:', error);
      set({ 
        isLoading: false, 
        errorMessage: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  },

  setSelectedTopic: (topic: Topic | null) => {
    console.warn('Topic missing data property:', topic);
      topic = {
        ...topic,
        data: { label: topic.id }
      };
    
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
}));