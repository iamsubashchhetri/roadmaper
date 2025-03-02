import React, { useEffect } from 'react';
import { useRoadmapStore } from './store/roadmapStore';
import Header from './components/Header';
import RoadmapSelector from './components/RoadmapSelector';
import RoadmapFlow from './components/RoadmapFlow';
import TopicDetail from './components/TopicDetail';

function App() {
  const { isDarkMode, setCurrentRoadmap, currentRoadmap } = useRoadmapStore();

  // Set default roadmap on first load
  useEffect(() => {
    if (!currentRoadmap && setCurrentRoadmap) {
      const { roadmaps } = useRoadmapStore.getState();
      if (roadmaps.length > 0) {
        setCurrentRoadmap(roadmaps[0].id);
      }
    }
  }, [currentRoadmap, setCurrentRoadmap]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full md:w-72 p-4 border-r border-gray-200 dark:border-gray-700">
          <RoadmapSelector />
        </div>

        <div className="flex-1 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-[calc(100vh-8rem)] overflow-hidden border border-gray-100 dark:border-gray-700">
            <RoadmapFlow />
          </div>
        </div>
      </main>

      <TopicDetail />

      <footer className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        <p>© 2025 AI Roadmap Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;