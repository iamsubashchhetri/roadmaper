import React, { useState } from 'react';
import { useRoadmapStore } from '../store/roadmapStore';
import { MapPin, Code, Zap, BookOpen } from 'lucide-react';
import { useAuth } from '../store/authContext';

import { generateRoadmap } from '../utils/roadmapGenerator';

const RoadmapSelector: React.FC = () => {
  const { roadmaps, currentRoadmap, setCurrentRoadmap, deleteRoadmap } = useRoadmapStore();
  const { currentUser } = useAuth();
  const [role, setRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!role.trim()) return;

    setIsGenerating(true);
    try {
      await generateRoadmap({ role });
    } catch (error) {
      console.error('Error generating roadmap:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRoadmapClick = (roadmapId: string) => {
    setCurrentRoadmap(roadmapId);
  };

  const handleDeleteRoadmap = async (roadmapId: string) => {
    if (!currentUser) return;

    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      await deleteRoadmap(roadmapId, currentUser.uid);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-blue-100 dark:border-gray-700">
      <div className="mb-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x mb-4">AI Roadmap Generator</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Generate comprehensive, AI-powered learning roadmaps for any role or subject. 
            Discover a structured path from beginner to expert with detailed guidance for each step.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <label htmlFor="role-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2">
              <BookOpen size={16} /> Role or Subject
            </label>
            <input
              id="role-input"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Machine Learning, Python"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!role.trim() || isGenerating}
          className={`w-full py-3 px-4 rounded-md text-white font-medium text-lg transition-all transform hover:scale-[1.02] 
            ${!role.trim() || isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-md'}`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
              Generating AI Roadmap...
            </div>
          ) : (
            'Generate Complete Roadmap'
          )}
        </button>
      </div>

      {roadmaps.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
            Your Learning Paths
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 roadmaps-container">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                className={`p-4 rounded-md cursor-pointer transition-all flex justify-between
                  ${currentRoadmap?.id === roadmap.id 
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 border-l-4 border-indigo-500 shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'}`}
              >
                <div onClick={() => handleRoadmapClick(roadmap.id)}>
                  <div className="font-medium text-gray-900 dark:text-white">{roadmap.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{roadmap.description}</div>
                </div>
                {currentUser && (
                  <button onClick={() => handleDeleteRoadmap(roadmap.id)} className="text-red-500 hover:text-red-700">Delete</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapSelector;