import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { INote } from '@types';
import { styles } from './NoteCard.styles';
import { formatRelativeTime } from '@/utils/formatDate';
import { theme } from '@constants/theme';
import DeleteIcon from '@/assets/svg/deleteIcon.svg';

export interface INoteCardProps {
  note: INote;
  onPress: () => void;
  onDelete: () => void;
}

export const NoteCard = ({ note, onPress, onDelete }: INoteCardProps) => {
  return (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.noteTitle} numberOfLines={2}>
            {note.title || 'Untitled'}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
            activeOpacity={0.7}
          >
            <DeleteIcon width={20} height={20} fill={theme.colors.danger} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.noteContent} numberOfLines={3}>
            {note.content || 'No content'}
          </Text>
        </View>
        <View style={styles.noteFooter}>
          <Text style={styles.noteDate}>
            {formatRelativeTime(note.updated_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
