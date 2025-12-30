import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input, LinkButton, KeyboardAvoidingContainer } from '@ui-kit';
import { useSignUpForm } from '@hooks/auth/useAuthForm';
import { styles } from './SignUpScreen.styles';
import { RootStackParamList, ROUTES } from '@constants/routes';

export interface ISignUpScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
}

const BACKGROUND_SOURCE = require('../../assets/images/pattern_herringbone.png');

export const SignUpScreen = ({ navigation }: ISignUpScreenProps) => {
  const {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    loading,
    errors,
    handleSignUp,
  } = useSignUpForm();

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <ImageBackground
        source={BACKGROUND_SOURCE}
        style={styles.container}
        imageStyle={styles.image}
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

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
                autoComplete="password-new"
                error={!!errors.password}
                errorMessage={errors.password}
              />

              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
              />

              <Button
                title="Sign Up"
                onPress={handleSignUp}
                loading={loading}
                disabled={loading}
              />

              <LinkButton
                title="Already have an account? Sign In"
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingContainer>
  );
};
