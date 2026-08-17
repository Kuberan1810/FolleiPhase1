import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { integrationsApi } from '../../api/integrations/integrationsApi';

/** Starts the authenticated Google Workspace/Gmail connection flow. */
export const useGoogleAuth = () => {
  const [isStarting, setIsStarting] = useState(false);
  const startingRef = useRef(false);

  const startGoogleAuth = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;
    setIsStarting(true);
    try {
      const authorizationUrl = await integrationsApi.startGoogleWorkspace();
      window.location.assign(authorizationUrl);
    } catch (error) {
      startingRef.current = false;
      setIsStarting(false);
      toast.error(error instanceof Error ? error.message : 'Google Workspace connection could not start');
    }
  }, []);

  return { startGoogleAuth, isStarting };
};

export default useGoogleAuth;
