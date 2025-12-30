import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const useInputStyles = (error?: boolean) => {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: error ? theme.colors.danger : theme.colors.borderLight,
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: 14,
      fontSize: theme.typography.fontSize.base,
      borderWidth: 0,
      color: theme.colors.textPrimary,
      fontFamily: theme.fonts.regular,
    },
    inputWithLeftIcon: {
      paddingLeft: 8,
    },
    inputWithRightIcon: {
      paddingRight: 8,
    },
    leftIcon: {
      paddingLeft: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightIcon: {
      paddingRight: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: theme.typography.fontSize.xs,
      fontFamily: theme.fonts.regular,
      color: theme.colors.danger,
      marginTop: theme.spacing.xs,
    },
  });
};
