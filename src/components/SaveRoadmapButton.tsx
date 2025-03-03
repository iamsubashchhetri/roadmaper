
import React, { useState } from 'react';
import { useRoadmapStore } from '../store/roadmapStore';
import { useAuth } from '../store/authContext';
import { BookmarkIcon } from 'lucide-react';

interface SaveRoadmapButtonProps {
  roadmapId: string;
}

const SaveRoadmapButton: React.FC<SaveRoadmapButtonProps> = ({ roadmapId }) => {
  const { currentUser } = useAuth();
  const { roadmaps, saveRoadmap, savedRoadmaps } = useRoadmapStore();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const roadmap = roadmaps.find(r => r.id === roadmapId);
  const isAlreadySaved = savedRoadmaps.some(r => r.id === roadmapId);
  
  if (!roadmap) return null;
  
  const handleSave = async () => {
    if (!currentUser) return;
    
    try {
      setIsSaving(true);
      setError(null);
      await saveRoadmap(roadmap, currentUser.uid);
    } catch (err) {
      setError('Failed to save roadmap');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <button
      onClick={handleSave}
      disabled={isSaving || isAlreadySaved}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isAlreadySaved
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default'
          : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/50'
      }`}
    >
      {isSaving ? (
        <div className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
      ) : (
        <BookmarkIcon size={16} className={isAlreadySaved ? 'fill-green-500' : ''} />
      )}
      <span>{isAlreadySaved ? 'Saved' : 'Save Roadmap'}</span>
    </button>
  );
};

export default SaveRoadmapButton;
