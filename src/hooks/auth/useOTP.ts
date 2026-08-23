import { useState, useEffect } from 'react';
import axiosInstance, { ApiError } from '../../lib/axios';
import { setAuthData } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [lastSubmittedCode, setLastSubmittedCode] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const requestOTP = async (email: string) => {
    if (countdown > 0) {
      toast.error(`Please wait ${countdown} seconds before requesting again.`);
      return false;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/v1/auth/otp/request', { email });
      // The response is generic: { message: "...", expires_in: 300 }
      const expiresIn = response.data?.expires_in || 300;
      setCountdown(expiresIn);
      toast.success('If an account exists, a sign-in code has been sent.');
      
      // Always navigate to the verification screen after a successful request
      navigate('/auth/verify-otp', { state: { email } });
      return true;
    } catch {
      toast.error('Failed to request OTP. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, code: string) => {
    if (code === lastSubmittedCode) {
      toast.error('You already submitted this code.');
      return false;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/v1/auth/otp/verify', { email, code });
      
      setAuthData(response.data);
      setLastSubmittedCode(code);
      toast.success('Signed in successfully');
      navigate('/dashboard');
      return true;

    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          toast.error('Invalid or expired code.');
        } else if (err.status === 429) {
          toast.error('Too many attempts. Please try again later.');
        } else {
          toast.error(err.message || 'Verification failed.');
        }
      } else {
        toast.error('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { requestOTP, verifyOTP, isLoading, countdown };
};
