
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import { Menu, ChevronDown, ChevronRight, Folder, FolderPlus, Plus, Search, Tag, FileText, Trash2, Network } from 'lucide-react';

const NoteSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFolders, setShowFolders] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  
  const { 
    notes,
    folders,
    tags,
    currentNoteId,
    currentFolderId,
    setCurrentNote,
    setCurrentFolder,
    createNote,
    createFolder,
    updateFolder,
    toggleGraphView,
    graphView,
    searchNotes
  } = useNotesStore();
  
  const { noteId } = useParams();
  const navigate = useNavigate();
  
  // Get root folders
  const rootFolders = Object.values(folders).filter(folder => folder.parentId === null);
  
  // Get notes without a folder
  const unfolderedNotes = Object.values(notes).filter(note => note.folderId === null);
  
  // Filtered notes based on search
  const filteredNotes = searchQuery 
    ? searchNotes(searchQuery)
    : unfolderedNotes;
  
  const handleNoteClick = (id: string) => {
    setCurrentNote(id);
    navigate(`/notes/${id}`);
  };
  
  const handleCreateNote = (folderId: string | null = null) => {
    const id = createNote(folderId);
    navigate(`/notes/${id}`);
  };
  
  const handleCreateFolder = (parentId: string | null = null) => {
    if (!newFolderName.trim()) return;
    
    createFolder(newFolderName, parentId);
    setNewFolderName('');
    setEditingFolderId(null);
  };
  
  const renderFolderTree = (folderId: string | null = null) => {
    const childFolders = Object.values(folders).filter(f => f.parentId === folderId);
    
    if (folderId === null) {
      return (
        <div className="mb-2">
          {childFolders.map(folder => (
            <FolderItem 
              key={folder.id} 
              folder={folder}
              onNoteClick={handleNoteClick}
              onCreateNote={handleCreateNote}
              currentNoteId={noteId || currentNoteId}
            />
          ))}
          
          {editingFolderId === 'root' ? (
            <div className="flex items-center ml-2 p-1">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder(null)}
                onBlur={() => setEditingFolderId(null)}
                autoFocus
                className="flex-1 py-1 px-2 text-sm bg-gray-100 dark:bg-gray-800 rounded"
                placeholder="Folder name..."
              />
              <button 
                onClick={() => handleCreateFolder(null)}
                className="ml-1 text-indigo-600"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingFolderId('root')}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 ml-2 p-1 text-sm"
            >
              <FolderPlus size={14} className="mr-1" />
              <span>New Folder</span>
            </button>
          )}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div 
      className={`border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto transition-all ${
        isOpen ? 'w-64' : 'w-12'
      }`}
    >
      <div className="p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 text-left flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        >
          {isOpen && <span className="font-medium">Notes</span>}
          <Menu size={18} />
        </button>
        
        {isOpen && (
          <>
            <div className="mt-2 mb-4 relative">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 pl-8 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
              />
              <Search size={14} className="absolute top-3 left-2.5 text-gray-400" />
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={() => handleCreateNote()}
                className="flex items-center text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded-md"
              >
                <Plus size={14} className="mr-1" />
                New Note
              </button>
              
              <button
                onClick={() => {
                  toggleGraphView();
                  navigate('/notes/graph');
                }}
                className={`flex items-center text-xs py-1 px-2 rounded-md ${
                  graphView 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Network size={14} className="mr-1" />
                Graph
              </button>
            </div>
            
            <div className="mb-4">
              <div 
                className="flex items-center justify-between cursor-pointer p-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setShowFolders(!showFolders)}
              >
                <div className="flex items-center">
                  <Folder size={15} className="mr-1" />
                  <span className="text-sm font-medium">Folders</span>
                </div>
                {showFolders ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </div>
              
              {showFolders && (
                <div className="ml-2 mt-1">
                  {renderFolderTree()}
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <div 
                className="flex items-center justify-between cursor-pointer p-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setShowTags(!showTags)}
              >
                <div className="flex items-center">
                  <Tag size={15} className="mr-1" />
                  <span className="text-sm font-medium">Tags</span>
                </div>
                {showTags ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </div>
              
              {showTags && (
                <div className="ml-2 mt-1">
                  {Object.values(tags).map(tag => (
                    <div 
                      key={tag.id}
                      className="flex items-center p-1 text-xs rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <div 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: tag.color }}
                      ></div>
                      <span>{tag.name}</span>
                    </div>
                  ))}
                  
                  {Object.keys(tags).length === 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic p-1">
                      No tags yet
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <div className="p-1 text-gray-600 dark:text-gray-400">
                <span className="text-sm font-medium">Notes</span>
              </div>
              
              {filteredNotes.map(note => (
                <div 
                  key={note.id}
                  onClick={() => handleNoteClick(note.id)}
                  className={`flex items-center p-1.5 text-sm rounded-md cursor-pointer ${
                    note.id === (noteId || currentNoteId)
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <FileText size={14} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{note.title}</span>
                </div>
              ))}
              
              {filteredNotes.length === 0 && searchQuery === '' && (
                <div className="text-xs text-gray-500 dark:text-gray-400 italic p-1">
                  No notes outside folders
                </div>
              )}
              
              {filteredNotes.length === 0 && searchQuery !== '' && (
                <div className="text-xs text-gray-500 dark:text-gray-400 italic p-1">
                  No notes match your search
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// FolderItem component for rendering folder tree
const FolderItem: React.FC<{
  folder: any;
  onNoteClick: (id: string) => void;
  onCreateNote: (folderId: string) => void;
  currentNoteId: string | null;
}> = ({ folder, onNoteClick, onCreateNote, currentNoteId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notes, 
    folders, 
    setCurrentFolder,
  } = useNotesStore();
  
  // Get notes in this folder
  const folderNotes = Object.values(notes).filter(note => note.folderId === folder.id);
  
  // Get child folders
  const childFolders = Object.values(folders).filter(f => f.parentId === folder.id);
  
  return (
    <div className="mb-1">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {childFolders.length > 0 ? (
          isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        ) : (
          <div className="w-[14px]"></div>
        )}
        <Folder size={14} className="mx-1 text-gray-500 dark:text-gray-400" />
        <span className="text-sm truncate">{folder.name}</span>
      </div>
      
      {isOpen && (
        <div className="ml-4">
          {/* Folder notes */}
          {folderNotes.map(note => (
            <div 
              key={note.id}
              onClick={() => onNoteClick(note.id)}
              className={`flex items-center p-1 text-sm rounded-md cursor-pointer ${
                note.id === currentNoteId
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FileText size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{note.title}</span>
            </div>
          ))}
          
          {/* New note in folder button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCreateNote(folder.id);
            }}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 text-sm"
          >
            <Plus size={14} className="mr-1" />
            <span>Add note</span>
          </button>
          
          {/* Child folders */}
          {childFolders.map(childFolder => (
            <FolderItem
              key={childFolder.id}
              folder={childFolder}
              onNoteClick={onNoteClick}
              onCreateNote={onCreateNote}
              currentNoteId={currentNoteId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteSidebar;
