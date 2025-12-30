import { StyleSheet } from 'react-native';
import { theme } from '@constants/theme';

export const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    width: '48%',
    ...theme.shadows.soft,
  },
  cardContent: {
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  noteTitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.fonts.bold,
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.xs,
    letterSpacing: -0.3,
    lineHeight:
      theme.typography.fontSize.md * theme.typography.lineHeight.tight,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xs,
  },
  deleteButtonText: {
    color: theme.colors.card,
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    lineHeight: 20,
    includeFontPadding: false,
    textAlign: 'center',
  },
  contentWrapper: {
    marginBottom: theme.spacing.sm,
  },
  noteContent: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textMuted,
    lineHeight:
      theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
  },
  noteFooter: {
    paddingTop: theme.spacing.xs,
  },
  noteDate: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textMuted,
  },
});
