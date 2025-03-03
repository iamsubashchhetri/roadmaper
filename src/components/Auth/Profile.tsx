
import React from 'react';
import { useAuth } from '../../store/authContext';
import { useRoadmapStore } from '../../store/roadmapStore';
import { logOut } from '../../services/firebase';

const Profile: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const { savedRoadmaps, searchHistory } = useRoadmapStore();
  
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  if (!currentUser) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          {currentUser.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt={currentUser.displayName || 'User'} 
              className="w-24 h-24 rounded-full border-4 border-indigo-100 dark:border-indigo-900"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentUser.displayName || 'User'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{currentUser.email}</p>
          
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Recent Searches
          </h3>
          {searchHistory && searchHistory.length > 0 ? (
            <div className="space-y-3">
              {searchHistory.slice(-5).reverse().map((search, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-medium text-gray-700 dark:text-gray-300">{search.query}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(search.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No search history yet</p>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Saved Roadmaps
          </h3>
          {savedRoadmaps && savedRoadmaps.length > 0 ? (
            <div className="space-y-3">
              {savedRoadmaps.map((roadmap, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  onClick={() => useRoadmapStore.getState().setCurrentRoadmap(roadmap.id)}
                >
                  <p className="font-medium text-gray-700 dark:text-gray-300">{roadmap.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {roadmap.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No saved roadmaps yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
