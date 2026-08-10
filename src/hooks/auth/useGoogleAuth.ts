import { useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth/authApi';

export const useGoogleAuth = () => {
  const [isStarting, setIsStarting] = useState(false);
  const startingGoogleRef = useRef(false);

  const startGoogleAuth = useCallback(async () => {
    if (startingGoogleRef.current) return;
    startingGoogleRef.current = true;
    setIsStarting(true);

    try {
      const response = await authApi.startGoogleAuth();

      const authData = response.data;
      if (!authData) {
        throw new Error('Invalid response received from authentication server');
      }

      if (authData.flow !== 'account_auth') {
        throw new Error(`Unexpected auth flow: ${authData.flow}`);
      }

      if (authData.requires_bearer !== false) {
        throw new Error('Public Google auth flow requires unauthenticated access');
      }

      const authorizationUrl = authData.authorization_url;

      if (
        typeof authorizationUrl !== 'string' ||
        !authorizationUrl.startsWith('https://accounts.google.com/')
      ) {
        throw new Error('Backend returned an invalid Google authorization URL');
      }

      // Perform immediate full-page navigation using the brand-new URL from this exact response
      window.location.replace(authorizationUrl);
    } catch (err: unknown) {
      startingGoogleRef.current = false;
      setIsStarting(false);
      const message = err instanceof Error ? err.message : 'Google sign-in could not be started';
      toast.error(message);
      console.error('Google Auth Start Error:', err);
    }
  }, []);

  return {
    startGoogleAuth,
    isStarting,
  };
};

export default useGoogleAuth;
