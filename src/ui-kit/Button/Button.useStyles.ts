import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const useButtonStyles = (
  variant: string,
  disabled: boolean,
  size: string,
) => {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'danger':
        return theme.colors.danger;
      default:
        return theme.colors.primary;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 16;
      default:
        return 10;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 28;
      default:
        return 22;
    }
  };

  const getMinHeight = () => {
    switch (size) {
      case 'small':
        return 36;
      case 'large':
        return 56;
      default:
        return 48;
    }
  };

  const getTextColor = () => {
    if (variant === 'danger') {
      return theme.colors.card;
    }
    if (variant === 'secondary') {
      return theme.colors.card;
    }
    return theme.colors.card;
  };

  return StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: getPadding(),
      paddingVertical: getPadding(),
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: getMinHeight(),
      borderWidth: 0,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: {
      marginRight: 8,
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
    buttonText: {
      color: getTextColor(),
      fontSize: getFontSize(),
      fontFamily: theme.fonts.semibold,
      letterSpacing: 0.3,
    },
    buttonTextLoading: {
      opacity: 0.7,
    },
  });
};
