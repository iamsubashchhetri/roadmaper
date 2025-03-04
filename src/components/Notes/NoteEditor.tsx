
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import ReactMarkdown from 'react-markdown';
import { Save, Trash2 } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const NoteEditor: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const { 
    notes, 
    updateNote, 
    deleteNote, 
    createLink,
  } = useNotesStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Load note data
  useEffect(() => {
    if (noteId && notes[noteId]) {
      setTitle(notes[noteId].title);
      setContent(notes[noteId].content);
    }
  }, [noteId, notes]);
  
  // Auto-save when title or content changes
  const saveNote = useCallback(
    async () => {
      if (!noteId || !notes[noteId]) return;
      
      setIsSaving(true);
      
      // Extract links from content [[Link]]
      const matches = content.match(/\[\[(.*?)\]\]/g) || [];
      const linkedNoteNames = matches.map(match => match.slice(2, -2));
      
      // For each linked note name, find or create the note and add a link
      linkedNoteNames.forEach(noteName => {
        // Find note with matching title
        const linkedNote = Object.values(notes).find(
          note => note.title.toLowerCase() === noteName.toLowerCase()
        );
        
        if (linkedNote) {
          createLink(noteId, linkedNote.id);
        }
      });
      
      updateNote({
        id: noteId,
        title,
        content
      });
      
      setTimeout(() => setIsSaving(false), 500);
    },
    [noteId, notes, title, content, updateNote, createLink]
  );
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      saveNote();
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [title, content, saveNote]);
  
  const handleDelete = () => {
    if (!noteId) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (confirmed) {
      deleteNote(noteId);
      navigate('/notes');
    }
  };
  
  // Process content to render [[links]] as actual links
  const processContent = (content: string) => {
    return content.replace(/\[\[(.*?)\]\]/g, (match, noteName) => {
      const linkedNote = Object.values(notes).find(
        note => note.title.toLowerCase() === noteName.toLowerCase()
      );
      
      if (linkedNote) {
        return `[${noteName}](/notes/${linkedNote.id})`;
      }
      
      return `[${noteName}](#)`;
    });
  };
  
  if (!noteId || !notes[noteId]) {
    return <div className="p-4">Note not found</div>;
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 text-sm rounded-md mr-2 ${
              !isPreview 
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 text-sm rounded-md ${
              isPreview 
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Preview
          </button>
        </div>
        
        <div className="flex items-center">
          {isSaving ? (
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">Saving...</span>
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">Saved</span>
          )}
          
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-2 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPreview}
          className="w-full px-2 py-1 text-xl font-bold bg-transparent focus:outline-none"
          placeholder="Untitled"
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        {isPreview ? (
          <div className="markdown-content p-4 prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {processContent(content)}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-4 bg-transparent resize-none focus:outline-none font-mono text-sm"
            placeholder="Start writing..."
          />
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
