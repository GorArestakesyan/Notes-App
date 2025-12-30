import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input, LinkButton, KeyboardAvoidingContainer } from '@ui-kit';
import { useLoginForm } from '@hooks/auth/useAuthForm';
import { styles } from './LoginScreen.styles';
import { RootStackParamList, ROUTES } from '@constants/routes';

export interface ILoginScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

const BACKGROUND_SOURCE = require('../../assets/images/pattern_herringbone.png');

export const LoginScreen = ({ navigation }: ILoginScreenProps) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    errors,
    handleLogin,
  } = useLoginForm();

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <ImageBackground
        source={BACKGROUND_SOURCE}
        style={styles.container}
        imageStyle={styles.image}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Notes</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.form}>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                error={!!errors.email}
                errorMessage={errors.email}
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                error={!!errors.password}
                errorMessage={errors.password}
              />

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
              />

              <LinkButton
                title="Don't have an account? Sign Up"
                onPress={() => navigation.navigate(ROUTES.SIGN_UP)}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingContainer>
  );
};
