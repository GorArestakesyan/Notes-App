import { theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: theme.colors.card,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.fonts.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 110,
    paddingRight: theme.spacing.md,
  },
  menu: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    maxWidth: 300,
    minWidth: 180,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  menuHeader: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuEmail: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.fonts.regular,
    color: theme.colors.textMuted,
  },
  menuItem: {
    padding: theme.spacing.md,
  },
  menuItemText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.fonts.medium,
    color: theme.colors.danger,
  },
});
