import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@contexts/AuthContext';

interface UseSignUpParams {
  onSuccess?: () => void;
}

export const useSignUp = ({ onSuccess }: UseSignUpParams = {}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      Alert.alert(
        'Sign Up Failed',
        error.message || 'Unable to create account',
      );
    } else {
      Alert.alert('Success', 'Account created successfully!');
      onSuccess?.();
    }
  };

  return {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    loading,
    handleSignUp,
  };
};
