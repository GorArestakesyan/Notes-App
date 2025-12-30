import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { notesService } from '@services/notesService';
import type { INote } from '@types';

interface UseNoteSaveParams {
  note?: INote;
  title: string;
  content: string;
  onSuccess?: () => void;
}

export const useNoteSave = ({
  note,
  title,
  content,
  onSuccess,
}: UseNoteSaveParams) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const isEditing = !!note;

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'User not found');
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        const { error } = await notesService.updateNote(note.id, {
          title,
          content,
        });
        if (error) {
          console.error('Error updating note:', error);
          const errorMessage =
            error?.message || 'Failed to update note. Please try again.';
          Alert.alert('Error', errorMessage);
        } else {
          Alert.alert('Success', 'Note updated successfully');
          onSuccess?.();
        }
      } else {
        const { error } = await notesService.createNote({
          title,
          content,
          user_id: user.id,
        });
        if (error) {
          console.error('Error creating note:', error);
          const errorMessage =
            error?.message || 'Failed to create note. Please try again.';
          Alert.alert('Error', errorMessage);
        } else {
          Alert.alert('Success', 'Note created successfully');
          onSuccess?.();
        }
      }
    } catch (error) {
      console.error('Exception saving note:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSave,
    loading,
    isEditing,
  };
};
