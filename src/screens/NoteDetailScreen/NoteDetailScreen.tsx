import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Input, Button, KeyboardAvoidingContainer } from '@ui-kit';
import { useNoteForm } from '@hooks/notes';
import { styles } from './NoteDetailScreen.styles';
import { RootStackParamList, ROUTES } from '@constants/routes';

export interface INoteDetailScreenProps {
  route: RouteProp<RootStackParamList, 'NoteDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'NoteDetail'>;
}

export const NoteDetailScreen = ({
  route,
  navigation,
}: INoteDetailScreenProps) => {
  const note = route.params?.note;
  const [titleFocused, setTitleFocused] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(!note);
  const {
    title,
    content,
    setTitle,
    setContent,
    loading,
    errors,
    isEditing,
    handleSave,
  } = useNoteForm({
    note,
    onSuccess: () => {
      navigation.goBack();
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'Note',
      headerBackTitle: 'Notes',
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingContainer
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      >
        <View style={styles.form}>
          {!isEditingMode && note ? (
            <View style={styles.readModeContainer}>
              <View style={styles.readHeader}>
                <Text style={styles.readTitle}>{title || 'Untitled'}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditingMode(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.readContent}>{content || 'No content'}</Text>
            </View>
          ) : (
            <>
              <Input
                style={[
                  styles.titleInput,
                  titleFocused && styles.titleInputFocused,
                ]}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                autoFocus={!isEditing}
                editable={isEditingMode}
                error={!!errors.title}
                errorMessage={errors.title}
                returnKeyType="next"
              />

              <Input
                style={styles.contentInput}
                placeholder="Describe your note..."
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                editable={isEditingMode}
                error={!!errors.content}
                errorMessage={errors.content}
                returnKeyType="done"
              />
            </>
          )}
        </View>
      </ScrollView>

      {isEditingMode && (
        <View style={styles.footer}>
          <Button
            title="Save"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
          />
        </View>
      )}
    </KeyboardAvoidingContainer>
  );
};
