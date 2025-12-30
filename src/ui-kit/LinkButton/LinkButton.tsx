import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { theme } from '@constants/theme';
import { renderIcon } from '../utils/renderIcon';

export interface ILinkButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactElement<SvgProps> | React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
}

export const LinkButton = ({
  title,
  onPress,
  icon,
  iconPosition = 'left',
  iconSize = 18,
  iconColor,
}: ILinkButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.linkContent}>
        {iconPosition === 'left' &&
          renderIcon({
            icon,
            iconSize,
            iconColor,
            iconStyle: styles.iconLeft,
          })}
        <Text style={styles.linkText}>{title}</Text>
        {iconPosition === 'right' &&
          renderIcon({
            icon,
            iconSize,
            iconColor,
            iconStyle: styles.iconRight,
          })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkButton: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium,
    fontSize: theme.typography.fontSize.md,
  },
});
