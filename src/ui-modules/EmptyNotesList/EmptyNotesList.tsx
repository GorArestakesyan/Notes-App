import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '@ui-kit';
import { styles } from './EmptyNotesList.styles';

export interface IEmptyNotesListProps {
  hasSearchQuery: boolean;
  onCreateNote?: () => void;
}

export const EmptyNotesList = ({
  hasSearchQuery,
  onCreateNote,
}: IEmptyNotesListProps) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        {hasSearchQuery ? 'No notes found' : 'Your ideas start here.'}
      </Text>
      {!hasSearchQuery && onCreateNote && (
        <Button
          title="Create your first note"
          onPress={onCreateNote}
          size="medium"
        />
      )}
    </View>
  );
};
