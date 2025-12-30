import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@contexts/AuthContext';
import { notesService } from '@services/notesService';
import type { INote } from '@types';

const NOTES_QUERY_KEY = ['notes'] as const;

export const useNotes = () => {
  const { user } = useAuth();

  const {
    data: notes = [],
    isLoading: loading,
    isRefetching: refreshing,
    error,
    refetch: refreshNotes,
  } = useQuery({
    queryKey: [...NOTES_QUERY_KEY, user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return [];
      }
      const { data, error: fetchError } = await notesService.getNotes(user.id);
      if (fetchError) {
        throw new Error(
          fetchError?.message ||
            'Failed to load notes. Please check your connection.',
        );
      }
      return data || [];
    },
    enabled: !!user?.id,
  });

  return {
    notes: notes as INote[],
    loading,
    refreshing,
    error: error ? (error as Error).message : null,
    refreshNotes,
  };
};
