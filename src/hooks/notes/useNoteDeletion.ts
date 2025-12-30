import { useState, useCallback, useEffect } from 'react';
import type { INote } from '@types';
import { useDeleteNote } from '@hooks/notes';

interface UseNoteDeletionParams {
  notes: INote[];
}

export const useNoteDeletion = (params?: UseNoteDeletionParams) => {
  const { notes = [] } = params || {};
  const deleteNoteMutation = useDeleteNote();
  const [deletedNoteIds, setDeletedNoteIds] = useState<Set<string>>(new Set());
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<INote | null>(null);

  useEffect(() => {
    if (deletedNoteIds.size > 0 && notes.length > 0) {
      const noteIdsInServer = new Set(notes.map(note => note.id));
      const confirmedDeleted = Array.from(deletedNoteIds).filter(
        id => !noteIdsInServer.has(id),
      );

      if (confirmedDeleted.length > 0) {
        setDeletedNoteIds(prev => {
          const newSet = new Set(prev);
          confirmedDeleted.forEach(id => newSet.delete(id));
          return newSet;
        });
      }
    }
  }, [notes, deletedNoteIds]);

  const handleDeletePress = useCallback((note: INote) => {
    setNoteToDelete(note);
    setDeleteModalVisible(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!noteToDelete) return;

    const noteId = noteToDelete.id;
    setDeleteModalVisible(false);

    /** Optimistic update - hide the note immediately */
    setDeletedNoteIds(prev => new Set(prev).add(noteId));

    try {
      await deleteNoteMutation.mutateAsync(noteId);
    } catch (error) {
      setDeletedNoteIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(noteId);
        return newSet;
      });
    }

    setNoteToDelete(null);
  }, [noteToDelete, deleteNoteMutation]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModalVisible(false);
    setNoteToDelete(null);
  }, []);

  return {
    deletedNoteIds,
    deleteModalVisible,
    noteToDelete,
    isDeleting: deleteNoteMutation.isPending,
    handleDeletePress,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};
