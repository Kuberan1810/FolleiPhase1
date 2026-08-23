import { useState } from 'react';
import axiosInstance, { ApiError } from '../../lib/axios';
import { setAuthData } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', {
        email: data.email,
        password: data.password,
      });

      // 1. Store session
      setAuthData(response.data);

      toast.success('Signed in successfully');

      // 2. Navigate directly to dashboard
      navigate('/dashboard');

    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          toast.error('Invalid email or password');
        } else if (err.status === 403) {
          toast.error('Inactive account');
        } else {
          toast.error(err.message || 'Login failed');
        }
        setError(err.message);
      } else {
        toast.error('Network error. Please try again.');
        setError('Network error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
