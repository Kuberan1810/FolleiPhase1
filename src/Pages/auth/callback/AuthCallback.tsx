/**
 * Landing page for Google sign-in.
 *
 * The backend redirects here with the tokens in the URL fragment, which the
 * browser never sends to a server. They are read once, stored, and stripped
 * from the address bar before anything else renders.
 */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { coirei } from '../../../api/coirei';
import { keys } from '../../../hooks/useProjects';

const MESSAGES: Record<string, string> = {
  consent_denied: 'Google sign-in was cancelled.',
  state_mismatch: 'That sign-in link did not match this browser. Please try again.',
  state_expired: 'That sign-in link expired. Please try again.',
  email_unverified: 'Google has not verified that email address.',
  account_disabled: 'This account is disabled.',
};

export default function AuthCallback() {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const [error, setError] = useState('');
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;  // StrictMode double-invoke must not re-run this.
    handled.current = true;

    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    window.history.replaceState(null, '', window.location.pathname);

    const failure = params.get('error');
    if (failure) {
      setError(MESSAGES[failure] || 'Google sign-in failed. Please try again.');
      return;
    }
    const access = params.get('access_token');
    const refresh = params.get('refresh_token');
    if (!access || !refresh) {
      setError('Google sign-in did not return a session. Please try again.');
      return;
    }
    coirei.adoptTokens(access, refresh);
    void cache.invalidateQueries({ queryKey: keys.session }).then(() => navigate('/', { replace: true }));
  }, [cache, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-[#F9F9F7] p-6 font-sans">
      {error ? (
        <div className="w-full max-w-md space-y-4 rounded-[24px] border border-[#E6E6E4] bg-white p-7 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <p className="text-[14px] text-[#16171A]">{error}</p>
          <button onClick={() => navigate('/login', { replace: true })}
                  className="cursor-pointer rounded-full bg-[#16171A] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-black">
            Back to sign in
          </button>
        </div>
      ) : (
        <p className="flex items-center gap-2 text-[13.5px] text-[#717378]">
          Completing sign-in…
        </p>
      )}
    </div>
  );
}
