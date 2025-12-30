import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@contexts/AuthContext';
import { notesService } from '@services/notesService';
import type { INote } from '@types';
import { NoteFormData, noteSchema } from '@/schemas/note';

interface UseNoteFormParams {
  note?: INote;
  onSuccess?: () => void;
}

const NOTES_QUERY_KEY = ['notes'] as const;

export const useNoteForm = ({ note, onSuccess }: UseNoteFormParams) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [errors, setErrors] = useState<
    Partial<Record<keyof NoteFormData, string>>
  >({});
  const isEditing = !!note;

  const createMutation = useMutation({
    mutationFn: async (noteData: {
      title: string;
      content: string;
      user_id: string;
    }) => {
      const { data, error } = await notesService.createNote(noteData);
      if (error) {
        throw new Error(error.message || 'Failed to create note');
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
      onSuccess?.();
    },
    onError: (error: Error) => {
      setErrors({ title: error.message });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Pick<INote, 'title' | 'content'>>;
    }) => {
      const { data, error } = await notesService.updateNote(id, updates);
      if (error) {
        throw new Error(error.message || 'Failed to update note');
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
      onSuccess?.();
    },
    onError: (error: Error) => {
      setErrors({ title: error.message });
    },
  });

  const handleSave = async () => {
    setErrors({});

    const result = noteSchema.safeParse({ title, content });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NoteFormData, string>> = {};
      result.error.issues.forEach(err => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as keyof NoteFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!user?.id) {
      setErrors({ title: 'User not found' });
      return;
    }

    if (isEditing && note?.id) {
      updateMutation.mutate({
        id: note.id,
        updates: { title, content },
      });
    } else {
      createMutation.mutate({
        title,
        content,
        user_id: user.id,
      });
    }
  };

  return {
    title,
    errors,
    content,
    setTitle,
    isEditing,
    setContent,
    handleSave,
    loading: createMutation.isPending || updateMutation.isPending,
  };
};
