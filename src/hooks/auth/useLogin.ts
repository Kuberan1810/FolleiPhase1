import { useState } from 'react';
import axiosInstance, { ApiError } from '../../lib/axios';
import { setAuthData } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', {
        email: data.email,
        password: data.password,
      });

      // 1. Store session
      setAuthData(response.data);

      // 2. Fetch onboarding state
      // We will do a simple fetch here, though we'll also have a polling hook later
      const stateResponse = await axiosInstance.get('/api/v1/onboarding/state');
      const step = stateResponse.data?.data?.step;

      toast.success('Signed in successfully');

      // 3. Resume the correct step
      if (step) {
        // Map backend step to frontend route
        // This mapping will be expanded based on the backend state model
        if (step === 'knowledge_review') {
          navigate('/onboarding/knowledge-review');
        } else if (step === 'profile') {
           navigate('/onboarding/company-details');
        } else {
           navigate('/onboarding/workspace');
        }
      } else {
        navigate('/onboarding/workspace');
      }

    } catch (err: any) {
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
