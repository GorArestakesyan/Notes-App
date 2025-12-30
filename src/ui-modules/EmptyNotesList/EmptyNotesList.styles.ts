import { StyleSheet } from 'react-native';
import { theme } from '@constants/theme';

export const styles = StyleSheet.create({
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: theme.typography.fontSize.lg * theme.typography.lineHeight.normal,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

