import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@contexts/AuthContext';
import {
  loginSchema,
  signUpSchema,
  type LoginFormData,
  type SignUpFormData,
} from '@schemas/auth';

interface UseAuthFormParams {
  onSuccess?: () => void;
}

export const useLoginForm = ({ onSuccess }: UseAuthFormParams = {}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const { signIn } = useAuth();

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { error } = await signIn(email, password);
      if (error) {
        throw new Error(error.message || 'Invalid email or password');
      }
    },
    onSuccess: () => {
      setValidationErrors({});
      onSuccess?.();
    },
  });

  const handleLogin = async () => {
    setValidationErrors({});
    loginMutation.reset();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach(err => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
        }
      });
      setValidationErrors(fieldErrors);
      return;
    }

    loginMutation.mutate({ email, password });
  };

  // Combine validation errors with mutation errors
  const errors = useMemo(() => {
    const combined: Partial<Record<keyof LoginFormData, string>> = {
      ...validationErrors,
    };

    if (loginMutation.error) {
      combined.email = loginMutation.error.message;
    }

    return combined;
  }, [validationErrors, loginMutation.error]);

  return {
    email,
    password,
    setEmail,
    setPassword,
    loading: loginMutation.isPending,
    errors,
    handleLogin,
  };
};

export const useSignUpForm = ({ onSuccess }: UseAuthFormParams = {}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});
  const { signUp } = useAuth();

  const signUpMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { error } = await signUp(email, password);
      if (error) {
        throw new Error(error.message || 'Unable to create account');
      }
    },
    onSuccess: () => {
      setValidationErrors({});
      onSuccess?.();
    },
    onError: () => {
      // Error is handled via mutation.error below
    },
  });

  const handleSignUp = async () => {
    setValidationErrors({});
    signUpMutation.reset(); // Clear previous mutation errors

    const result = signUpSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignUpFormData, string>> = {};
      result.error.issues.forEach(err => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as keyof SignUpFormData] = err.message;
        }
      });
      setValidationErrors(fieldErrors);
      return;
    }

    signUpMutation.mutate({ email, password });
  };

  // Combine validation errors with mutation errors
  const errors = useMemo(() => {
    const combined: Partial<Record<keyof SignUpFormData, string>> = {
      ...validationErrors,
    };

    if (signUpMutation.error) {
      combined.email = signUpMutation.error.message;
    }

    return combined;
  }, [validationErrors, signUpMutation.error]);

  return {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    loading: signUpMutation.isPending,
    errors,
    handleSignUp,
  };
};
