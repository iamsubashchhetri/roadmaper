
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
import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/authContext';
import { useRoadmapStore } from '../store/roadmapStore';
import { doc, setDoc, updateDoc, arrayUnion, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { BookmarkIcon } from 'lucide-react';

interface SaveRoadmapButtonProps {
  roadmapId: string;
}

const SaveRoadmapButton: React.FC<SaveRoadmapButtonProps> = ({ roadmapId }) => {
  const { currentUser } = useAuth();
  const { currentRoadmap, savedRoadmaps } = useRoadmapStore();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this roadmap is already saved by the user
    if (savedRoadmaps && savedRoadmaps.some((roadmap: any) => roadmap.id === roadmapId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [roadmapId, savedRoadmaps]);

  const handleSaveRoadmap = async () => {
    if (!currentUser || !currentRoadmap) return;
    
    setIsLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        // Update the user document with the saved roadmap
        await updateDoc(userRef, {
          savedRoadmaps: arrayUnion({
            id: roadmapId,
            title: `Roadmap for ${currentRoadmap?.topic || 'Unknown'}`,
            savedAt: Timestamp.now()
          })
        });
        
        // Update local state
        setIsSaved(true);
        
        // Update the store
        useRoadmapStore.getState().loadUserRoadmaps(currentUser.uid);
      }
    } catch (error) {
      console.error('Error saving roadmap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <button
      onClick={handleSaveRoadmap}
      disabled={isSaved || isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        isSaved 
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
          : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
      } transition-colors`}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
      ) : (
        <BookmarkIcon size={18} className={isSaved ? 'fill-green-700 dark:fill-green-400' : ''} />
      )}
      <span>{isSaved ? 'Saved' : 'Save Roadmap'}</span>
    </button>
  );
};

export default SaveRoadmapButton;
