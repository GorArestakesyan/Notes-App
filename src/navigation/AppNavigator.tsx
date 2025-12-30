import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LoginScreen } from '@screens/LoginScreen';
import { SignUpScreen } from '@screens/SignUpScreen';
import { NotesListScreen } from '@screens/NotesListScreen';
import { NoteDetailScreen } from '@screens/NoteDetailScreen';
import { useAuth } from '@contexts/AuthContext';
import { theme } from '@constants/theme';
import { ROUTES, type RootStackParamList } from '@constants/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name={ROUTES.NOTES_LIST}
              component={NotesListScreen}
            />
            <Stack.Screen
              name={ROUTES.NOTE_DETAIL}
              component={NoteDetailScreen}
              options={{
                headerShown: true,
                title: 'Note',
                headerStyle: {
                  backgroundColor: theme.colors.card,
                },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: {
                  color: theme.colors.textPrimary,
                  fontWeight: '600',
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.SIGN_UP} component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
