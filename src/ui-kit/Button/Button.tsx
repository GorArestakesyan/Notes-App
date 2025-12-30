import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { theme } from '@constants/theme';
import { useButtonStyles } from './Button.useStyles';
import { renderIcon } from '../utils/renderIcon';

export interface IButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';

  icon?: React.ReactElement<SvgProps> | React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  iconSize,
  iconColor,
}: IButtonProps) => {
  const styles = useButtonStyles(variant, disabled || loading, size);

  const getIconSize = () => {
    if (iconSize) return iconSize;
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator
            color={theme.colors.card}
            style={styles.indicator}
            size="small"
          />
        )}
        {iconPosition === 'left' &&
          renderIcon({
            icon: loading ? null : icon,
            iconSize: getIconSize(),
            iconColor,
            iconStyle: styles.iconLeft,
          })}
        <Text style={[styles.buttonText, loading && styles.buttonTextLoading]}>
          {title}
        </Text>
        {iconPosition === 'right' &&
          renderIcon({
            icon: loading ? null : icon,
            iconSize: getIconSize(),
            iconColor,
            iconStyle: styles.iconRight,
          })}
      </View>
    </TouchableOpacity>
  );
};
