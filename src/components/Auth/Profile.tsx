import React from 'react';
import { useAuth } from '../../store/authContext';
import { useRoadmapStore } from '../../store/roadmapStore';
import { logOut } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const { savedRoadmaps, deleteRoadmap, searchHistory } = useRoadmapStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative">
          <img 
            src={currentUser.photoURL || '/default-avatar.png'} 
            alt="Profile" 
            className="w-20 h-20 rounded-full border-2 border-indigo-500"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{currentUser.displayName}</h1>
          <p className="text-gray-600 dark:text-gray-300">{currentUser.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Member since {currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'Unknown'}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saved Roadmaps */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Saved Roadmaps</h2>

          {savedRoadmaps && savedRoadmaps.length > 0 ? (
            <ul className="space-y-3">
              {savedRoadmaps.map((roadmap: any) => (
                <li 
                  key={roadmap.id} 
                  className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
                  onClick={() => navigate('/')}
                >
                  <div className="font-medium text-indigo-600 dark:text-indigo-400">{roadmap.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Saved on {new Date(roadmap.savedAt.seconds * 1000).toLocaleDateString()}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this saved roadmap?')) {
                        try {
                          deleteRoadmap(roadmap.id, currentUser.uid);
                        } catch (error) {
                          console.error('Error deleting saved roadmap:', error);
                          alert('Failed to delete roadmap: ' + (error instanceof Error ? error.message : 'Unknown error'));
                        }
                      }
                    }}
                    className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    title="Delete saved roadmap"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <p>No saved roadmaps yet</p>
              <button 
                onClick={() => navigate('/')}
                className="mt-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm"
              >
                Create your first roadmap
              </button>
            </div>
          )}
        </div>

        {/* Search History */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Searches</h2>

          {searchHistory && searchHistory.length > 0 ? (
            <ul className="space-y-3">
              {searchHistory.map((search: any, index: number) => (
                <li 
                  key={index} 
                  className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  <div className="font-medium text-gray-800 dark:text-gray-200">{search.query}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(search.timestamp.seconds * 1000).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <p>No recent searches</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;