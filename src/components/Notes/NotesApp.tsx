
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import NoteSidebar from './NoteSidebar';
import NoteEditor from './NoteEditor';
import NoteGraphView from './NoteGraphView';

const NotesApp: React.FC = () => {
  const { 
    notes, 
    currentNoteId, 
    setCurrentNote, 
    graphView, 
    createNote 
  } = useNotesStore();
  const navigate = useNavigate();

  // Create a welcome note if no notes exist
  useEffect(() => {
    if (Object.keys(notes).length === 0) {
      const id = createNote();
      const welcomeContent = `# Welcome to Your Notes

This is a Markdown-based note-taking system with features similar to Obsidian.

## Features

- **Markdown Support**: Format your notes with Markdown syntax
- **Bidirectional Linking**: Create links between notes using [[Note Title]]
- **Tagging**: Organize with #tags
- **Folders**: Keep notes organized in a folder structure
- **Graph View**: Visualize connections between notes

## Quick Tips

- Use double brackets to link to other notes: [[Another Note]]
- Use # to create tags: #example #tutorial
- You can drag and drop notes between folders
- Click the graph icon to see your note network

Happy note-taking!`;
      
      useNotesStore.getState().updateNote({
        id,
        title: 'Welcome to Notes',
        content: welcomeContent
      });
      
      navigate(`/notes/${id}`);
    }
  }, [notes, createNote, navigate]);

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <NoteSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">Select or create a note</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Choose a note from the sidebar or create a new one to get started.
                </p>
                <button
                  onClick={() => {
                    const id = createNote();
                    navigate(`/notes/${id}`);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Create New Note
                </button>
              </div>
            </div>
          } />
          <Route path="/:noteId" element={<NoteEditor />} />
          <Route path="/graph" element={<NoteGraphView />} />
        </Routes>
      </div>
    </div>
  );
};

export default NotesApp;
