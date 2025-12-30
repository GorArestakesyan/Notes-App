import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';
import { useNotes } from '@hooks/notes';
import type { INote } from '@types';
import {
  NoteCard,
  EmptyNotesList,
  FloatingActionButton,
  ProfileAvatar,
} from '@ui-modules';
import { Input, ConfirmModal } from '@ui-kit';
import { theme } from '@constants/theme';
import { styles } from './NotesListScreen.styles';
import { RootStackParamList, ROUTES } from '@constants/routes';
import { useNoteDeletion } from '@/hooks/notes/useNoteDeletion';
import { useNoteSearch } from '@/hooks/notes/useNoteSearch';

export interface INotesListScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NotesList'>;
}

export const NotesListScreen = ({ navigation }: INotesListScreenProps) => {
  const { user, signOut } = useAuth();
  const { notes, loading, refreshing, refreshNotes } = useNotes();

  const {
    deletedNoteIds,
    deleteModalVisible,
    noteToDelete,
    handleDeletePress,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useNoteDeletion({ notes });

  const { searchQuery, setSearchQuery, filteredNotes } = useNoteSearch(
    notes,
    deletedNoteIds,
  );

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        refreshNotes();
      }
    }, [user?.id, refreshNotes]),
  );

  const navigateToNote = useCallback(
    (note?: INote) => {
      navigation.navigate(ROUTES.NOTE_DETAIL, note ? { note } : {});
    },
    [navigation],
  );

  const renderNoteCard = useCallback(
    ({ item }: { item: INote }) => (
      <NoteCard
        note={item}
        onPress={() => navigateToNote(item)}
        onDelete={() => handleDeletePress(item)}
      />
    ),
    [navigateToNote, handleDeletePress],
  );

  const renderEmptyList = useCallback(() => {
    if (refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    return (
      <EmptyNotesList
        hasSearchQuery={!!searchQuery}
        onCreateNote={() => navigateToNote()}
      />
    );
  }, [refreshing, searchQuery, navigateToNote]);

  if (loading && notes.length === 0 && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes</Text>
        <ProfileAvatar onLogout={signOut} userEmail={user?.email} />
      </View>

      <View style={styles.searchContainer}>
        <Input
          style={styles.searchInput}
          placeholder="Search notes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderNoteCard}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshNotes}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        contentContainerStyle={styles.listContent}
      />

      <FloatingActionButton onPress={() => navigateToNote()} />

      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete Note"
        message={`Are you sure you want to delete "${
          noteToDelete?.title || 'this note'
        }"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        variant="danger"
      />
    </View>
  );
};
