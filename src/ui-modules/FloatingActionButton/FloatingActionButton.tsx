import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './FloatingActionButton.styles';

export interface IFloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton = ({ onPress }: IFloatingActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};

