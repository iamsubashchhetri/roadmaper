import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useRoadmapStore } from '../store/roadmapStore';
import { RoadmapGenerationRequest } from '../types';

const RoadmapSearch: React.FC = () => {
  const { generateNewRoadmap, isGenerating, searchQuery, setSearchQuery } = useRoadmapStore();
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const request: RoadmapGenerationRequest = {
        role: searchQuery,
        level
      };
      generateNewRoadmap(request);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Generate AI Roadmap
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="role-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter a role or skill
          </label>
          <div className="relative">
            <input
              id="role-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Scientist"
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="level-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Experience Level
          </label>
          <select
            id="level-select"
            value={level}
            onChange={(e) => setLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isGenerating}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isGenerating || !searchQuery.trim()}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-white font-medium ${
            isGenerating || !searchQuery.trim()
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors duration-200`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Generating Roadmap...
            </>
          ) : (
            'Generate Roadmap'
          )}
        </button>
      </form>
    </div>
  );
};

export default RoadmapSearch;