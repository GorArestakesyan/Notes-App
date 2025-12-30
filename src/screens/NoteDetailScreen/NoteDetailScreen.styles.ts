import { StyleSheet } from 'react-native';
import { theme } from '@constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
  },
  form: {
    flex: 1,
  },
  titleInput: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: 36,
    fontFamily: theme.fonts.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    borderWidth: 0,
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
  },
  titleInputFocused: {
    lineHeight: 36,
    borderBottomColor: theme.colors.primary,
  },
  contentInput: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textPrimary,
    height: 250,
    lineHeight:
      theme.typography.fontSize.base * theme.typography.lineHeight.normal,
    backgroundColor: 'transparent',
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  footer: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  readModeContainer: {
    flex: 1,
  },
  readHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  readTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight:
      theme.typography.fontSize.xl * theme.typography.lineHeight.tight,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  readContent: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textPrimary,
    lineHeight:
      theme.typography.fontSize.base * theme.typography.lineHeight.relaxed,
  },
  editButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: theme.colors.card,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.fonts.semibold,
  },
});
