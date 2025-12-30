import { useState, useMemo } from 'react';
import type { INote } from '@types';

export const useNoteSearch = (notes: INote[], deletedIds: Set<string>) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    const activeNotes = notes.filter(note => !deletedIds.has(note.id));

    if (searchQuery.trim() === '') {
      return activeNotes;
    }

    const query = searchQuery.toLowerCase();
    return activeNotes.filter(note => note.title.toLowerCase().includes(query));
  }, [notes, deletedIds, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredNotes,
  };
};
