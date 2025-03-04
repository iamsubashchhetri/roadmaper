
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Note, NoteFolder, NoteTag, NoteLink } from '../types/notes';

interface NotesState {
  notes: Record<string, Note>;
  folders: Record<string, NoteFolder>;
  tags: Record<string, NoteTag>;
  links: NoteLink[];
  currentNoteId: string | null;
  currentFolderId: string | null;
  graphView: boolean;
  
  // Note operations
  createNote: (folderId?: string | null) => string;
  updateNote: (note: Partial<Note> & { id: string }) => void;
  deleteNote: (id: string) => void;
  
  // Folder operations
  createFolder: (name: string, parentId?: string | null) => string;
  updateFolder: (folder: Partial<NoteFolder> & { id: string }) => void;
  deleteFolder: (id: string) => void;
  
  // Tag operations
  createTag: (name: string, color: string) => string;
  updateTag: (tag: Partial<NoteTag> & { id: string }) => void;
  deleteTag: (id: string) => void;
  
  // Link operations
  createLink: (sourceId: string, targetId: string) => void;
  deleteLink: (sourceId: string, targetId: string) => void;
  
  // UI operations
  setCurrentNote: (id: string | null) => void;
  setCurrentFolder: (id: string | null) => void;
  toggleGraphView: () => void;
  
  // Search
  searchNotes: (query: string) => Note[];
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: {},
      folders: {},
      tags: {},
      links: [],
      currentNoteId: null,
      currentFolderId: null,
      graphView: false,
      
      createNote: (folderId = null) => {
        const id = uuidv4();
        const now = new Date();
        const newNote: Note = {
          id,
          title: 'Untitled Note',
          content: '',
          created: now,
          updated: now,
          tags: [],
          folderId
        };
        
        set(state => ({
          notes: { ...state.notes, [id]: newNote },
          currentNoteId: id
        }));
        
        return id;
      },
      
      updateNote: (noteUpdate) => {
        set(state => {
          const note = state.notes[noteUpdate.id];
          if (!note) return state;
          
          const updatedNote = {
            ...note,
            ...noteUpdate,
            updated: new Date()
          };
          
          return {
            notes: { ...state.notes, [noteUpdate.id]: updatedNote }
          };
        });
      },
      
      deleteNote: (id) => {
        set(state => {
          const { [id]: _, ...rest } = state.notes;
          // Remove any links to this note
          const updatedLinks = state.links.filter(
            link => link.source !== id && link.target !== id
          );
          
          return {
            notes: rest,
            links: updatedLinks,
            currentNoteId: state.currentNoteId === id ? null : state.currentNoteId
          };
        });
      },
      
      createFolder: (name, parentId = null) => {
        const id = uuidv4();
        const newFolder: NoteFolder = {
          id,
          name,
          parentId
        };
        
        set(state => ({
          folders: { ...state.folders, [id]: newFolder },
          currentFolderId: id
        }));
        
        return id;
      },
      
      updateFolder: (folderUpdate) => {
        set(state => {
          const folder = state.folders[folderUpdate.id];
          if (!folder) return state;
          
          const updatedFolder = {
            ...folder,
            ...folderUpdate
          };
          
          return {
            folders: { ...state.folders, [folderUpdate.id]: updatedFolder }
          };
        });
      },
      
      deleteFolder: (id) => {
        set(state => {
          const { [id]: _, ...restFolders } = state.folders;
          
          // Move notes from this folder to no folder
          const updatedNotes = { ...state.notes };
          Object.keys(updatedNotes).forEach(noteId => {
            if (updatedNotes[noteId].folderId === id) {
              updatedNotes[noteId] = {
                ...updatedNotes[noteId],
                folderId: null
              };
            }
          });
          
          // Move sub-folders to root
          const updatedFolders = { ...restFolders };
          Object.keys(updatedFolders).forEach(folderId => {
            if (updatedFolders[folderId].parentId === id) {
              updatedFolders[folderId] = {
                ...updatedFolders[folderId],
                parentId: null
              };
            }
          });
          
          return {
            folders: updatedFolders,
            notes: updatedNotes,
            currentFolderId: state.currentFolderId === id ? null : state.currentFolderId
          };
        });
      },
      
      createTag: (name, color) => {
        const id = uuidv4();
        const newTag: NoteTag = {
          id,
          name,
          color
        };
        
        set(state => ({
          tags: { ...state.tags, [id]: newTag }
        }));
        
        return id;
      },
      
      updateTag: (tagUpdate) => {
        set(state => {
          const tag = state.tags[tagUpdate.id];
          if (!tag) return state;
          
          const updatedTag = {
            ...tag,
            ...tagUpdate
          };
          
          return {
            tags: { ...state.tags, [tagUpdate.id]: updatedTag }
          };
        });
      },
      
      deleteTag: (id) => {
        set(state => {
          const { [id]: _, ...restTags } = state.tags;
          
          // Remove tag from notes
          const updatedNotes = { ...state.notes };
          Object.keys(updatedNotes).forEach(noteId => {
            updatedNotes[noteId] = {
              ...updatedNotes[noteId],
              tags: updatedNotes[noteId].tags.filter(tagId => tagId !== id)
            };
          });
          
          return {
            tags: restTags,
            notes: updatedNotes
          };
        });
      },
      
      createLink: (sourceId, targetId) => {
        // Prevent duplicates and self-links
        if (sourceId === targetId) return;
        
        set(state => {
          const linkExists = state.links.some(
            link => link.source === sourceId && link.target === targetId
          );
          
          if (linkExists) return state;
          
          return {
            links: [...state.links, { source: sourceId, target: targetId }]
          };
        });
      },
      
      deleteLink: (sourceId, targetId) => {
        set(state => ({
          links: state.links.filter(
            link => !(link.source === sourceId && link.target === targetId)
          )
        }));
      },
      
      setCurrentNote: (id) => {
        set({ currentNoteId: id });
      },
      
      setCurrentFolder: (id) => {
        set({ currentFolderId: id });
      },
      
      toggleGraphView: () => {
        set(state => ({ graphView: !state.graphView }));
      },
      
      searchNotes: (query) => {
        const state = get();
        const searchTerms = query.toLowerCase().trim().split(/\s+/);
        
        return Object.values(state.notes).filter(note => {
          const content = `${note.title} ${note.content}`.toLowerCase();
          return searchTerms.every(term => content.includes(term));
        });
      }
    }),
    {
      name: 'notes-storage'
    }
  )
);
