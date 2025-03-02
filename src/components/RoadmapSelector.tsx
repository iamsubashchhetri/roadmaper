import React, { useState } from 'react';
import { useRoadmapStore } from '../store/roadmapStore';
import { MapPin, Code, Zap, BookOpen } from 'lucide-react';

const RoadmapSelector: React.FC = () => {
  const { roadmaps, generateRoadmap, currentRoadmap, setCurrentRoadmap } = useRoadmapStore();
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

  const handleRoadmapClick = (id: string) => {
    setCurrentRoadmap(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      <div className="mb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">AI Learning Path Creator</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                onClick={() => handleRoadmapClick(roadmap.id)}
                className={`p-4 rounded-md cursor-pointer transition-all
                  ${currentRoadmap?.id === roadmap.id 
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 border-l-4 border-indigo-500 shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'}`}
              >
                <div className="font-medium text-gray-900 dark:text-white">{roadmap.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{roadmap.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapSelector;