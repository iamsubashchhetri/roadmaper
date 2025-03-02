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

      {/* Community Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9L12 15L21 10.09V17.5C21 19.5 19.5 21 17.5 21H6.5C4.5 21 3 19.5 3 17.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5 5C15.5 5 17 6.5 17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x">Join the Community</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              AI roadmap generator is the 7th most starred project on GitHub and is visited by hundreds of thousands of developers every month.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* GitHub Stars Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-indigo-100/40 dark:border-indigo-900/40">
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-600/20 dark:to-purple-600/20 px-6 py-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Rank 47th</h3>
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">out of 28K!</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">3090</p>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">GitHub Stars</p>
                  </div>
                </div>
                <div className="text-center">
                  <a href="#" className="inline-flex items-center justify-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-4 py-2 rounded-full transition-colors duration-300 mb-2 w-full">
                    Star us on GitHub
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Help us reach #1</p>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1 font-semibold">+900 every month</p>
                </div>
              </div>
            </div>

            {/* Registered Users Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-purple-100/40 dark:border-purple-900/40">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-600/20 dark:to-blue-600/20 px-6 py-4">
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Registered Users</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">+10000</p>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">Developers</p>
                  </div>
                </div>
                <div className="text-center">
                  <a href="#" className="inline-flex items-center justify-center text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 px-4 py-2 rounded-full transition-colors duration-300 mb-2 w-full">
                    Register yourself
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Commit to your growth</p>
                  <p className="text-xs text-purple-500 dark:text-purple-400 mt-1 font-semibold">+2k every month</p>
                </div>
              </div>
            </div>

            {/* Discord Members Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-100/40 dark:border-blue-900/40">
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-600/20 px-6 py-4">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Discord Members</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">34K</p>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">Community Members</p>
                  </div>
                </div>
                <div className="text-center">
                  <a href="#" className="inline-flex items-center justify-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2 rounded-full transition-colors duration-300 mb-2 w-full">
                    Join on Discord
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Join the community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        <p>© 2025 AI Roadmap Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;