import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export interface IKeyboardAvoidingContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  keyboardVerticalOffset?: number;
}

export const KeyboardAvoidingContainer = ({
  children,
  style,
  keyboardVerticalOffset,
}: IKeyboardAvoidingContainerProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, style]}
      keyboardVerticalOffset={
        keyboardVerticalOffset ?? (Platform.OS === 'ios' ? 0 : 20)
      }
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
