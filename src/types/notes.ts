
export interface NoteTag {
  id: string;
  name: string;
  color: string;
}

export interface NoteLink {
  source: string;
  target: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created: Date;
  updated: Date;
  tags: string[]; // Tag IDs
  folderId: string | null;
}

export interface NoteFolder {
  id: string;
  name: string;
  parentId: string | null;
}
