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
      // First create the roadmap document
      const roadmapRef = doc(db, 'roadmaps', roadmapId);

      // Save the roadmap content first
      await setDoc(roadmapRef, {
        ...currentRoadmap,
        createdBy: currentUser.uid,
        updatedAt: Timestamp.now()
      });

      // Then save the user reference
      const userRef = doc(db, 'users', currentUser.uid);
      // Check if user document exists
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Update the user document with the saved roadmap
        await updateDoc(userRef, {
          savedRoadmaps: arrayUnion({
            id: roadmapId,
            title: `Roadmap for ${currentRoadmap?.role || currentRoadmap?.topic || 'Unknown'}`,
            savedAt: Timestamp.now()
          })
        });
      } else {
        // Create new user document if it doesn't exist
        await setDoc(userRef, {
          savedRoadmaps: [{
            id: roadmapId,
            title: `Roadmap for ${currentRoadmap?.role || currentRoadmap?.topic || 'Unknown'}`,
            savedAt: Timestamp.now()
          }],
          email: currentUser.email,
          displayName: currentUser.displayName,
          createdAt: Timestamp.now()
        });
      }

      // Update local state
      setIsSaved(true);

      // Update the store
      useRoadmapStore.getState().loadUserRoadmaps(currentUser.uid);

    } catch (error) {
      console.error('Error saving roadmap:', error);
      
      // Specific handling for permission errors
      if (error.code === 'permission-denied') {
        alert('Failed to save roadmap: Firebase permission denied. Your Firestore rules need to be deployed.\nRun: npx firebase deploy --only firestore:rules');
      } else {
        alert(`Failed to save roadmap: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
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