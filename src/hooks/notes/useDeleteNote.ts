import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesService } from '@services/notesService';

const NOTES_QUERY_KEY = ['notes'] as const;

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await notesService.deleteNote(id);
      if (error) {
        throw new Error(error.message || 'Failed to delete note');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTES_QUERY_KEY,
      });
    },
  });
};
