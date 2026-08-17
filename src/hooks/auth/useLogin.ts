import { useState } from 'react';
import { ApiError } from '../../lib/axios';
import { setAuthData } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth/authApi';
import { onboardingApi } from '../../api/onboarding/onboardingApi';
import { useAuthSession } from '../../providers/AuthSessionProvider';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: setSession } = useAuthSession();

  const login = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(data.email, data.password);
      setAuthData(response);
      setSession(response);
      const stateResponse = await onboardingApi.getOnboardingState();
      const step = stateResponse.data.step;

      toast.success('Signed in successfully');

      // 3. Resume the correct step
      if (step) {
        // Map backend step to frontend route
        // This mapping will be expanded based on the backend state model
        if (step === 'profile') {
           navigate('/onboarding/company-details');
        } else if (step === 'knowledge_review') {
           navigate('/onboarding/import-data');
        } else if (step === 'ready') {
           navigate('/onboarding/final');
        } else {
           navigate('/onboarding/workspace');
        }
      } else {
        navigate('/onboarding/workspace');
      }

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
