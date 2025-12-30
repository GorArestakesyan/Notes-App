import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@contexts/AuthContext';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert('Login Failed', error.message || 'Invalid email or password');
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    handleLogin,
  };
};
