import { StyleSheet } from 'react-native';
import { theme } from '@constants/theme';

export const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    zIndex: 1000,
  },
  fabText: {
    color: theme.colors.card,
    fontSize: 28,
    fontFamily: 'System',
    fontWeight: '300',
    lineHeight: 28,
  },
});
