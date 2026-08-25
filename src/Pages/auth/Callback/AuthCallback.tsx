import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../../../api/auth/authApi';
import { setAuthData } from '../../../lib/auth';
import { useAuthSession } from '../../../providers/AuthSessionProvider';
import { useGoogleAuth } from '../../../hooks/auth/useGoogleAuth';
import type { GoogleAuthExchangeResponse } from '../../../api/auth/googleTypes';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasExchangedRef = useRef(false);
  const { startGoogleAuth, isStarting: isRetryingGoogle } = useGoogleAuth();
  const { login } = useAuthSession();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorTitle, setErrorTitle] = useState<string>('Sign-In Failed');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInvalidState, setIsInvalidState] = useState(false);
  const [exchangeData, setExchangeData] = useState<GoogleAuthExchangeResponse | null>(null);

  useEffect(() => {
    // Read query parameters using URLSearchParams
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    const stepParam = params.get('step');
    const reasonParam = params.get('reason');
    const exchangeCode = params.get('exchange_code');

    // IMMEDIATELY clean address bar to remove sensitive query parameters before any logging/analytics
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Helper to map error, step, and reason into safe human-readable messages
    const handleOAuthError = (err: string | null, step: string | null, reason: string | null) => {
      if (step === 'state_validation') {
        setIsInvalidState(true);
        setErrorTitle('Google sign-in session expired');

        switch (reason) {
          case 'state_not_found':
            setErrorMessage(
              'This sign-in was started by a different or previous backend session. Please start again.'
            );
            break;
          case 'state_already_used':
            setErrorMessage(
              'This sign-in callback has already been used. Please start again.'
            );
            break;
          case 'state_expired':
            setErrorMessage(
              'This sign-in request expired. Please start again.'
            );
            break;
          default:
            setErrorMessage(
              'The Google sign-in session is invalid. Please start again.'
            );
        }
        return;
      }

      setErrorTitle('Sign-In Failed');

      if (err === 'access_denied') {
        setErrorMessage('Google access was cancelled. No account changes were completed.');
        return;
      }

      // Reason-specific safe messages
      if (reason) {
        switch (reason) {
          case 'invalid_grant':
            setErrorMessage('Google authorization code was expired or already used. Please try signing in again.');
            return;
          case 'invalid_client':
            setErrorMessage('Google client credentials configuration error. Please check backend settings.');
            return;
          case 'redirect_uri_mismatch':
            setErrorMessage('Google OAuth callback URL configuration mismatch.');
            return;
          case 'invalid_pkce_state':
            setErrorMessage('Security verification key check failed between start and callback.');
            return;
          case 'identity_claim_mismatch':
            setErrorMessage('Google identity verification did not match.');
            return;
          case 'invalid_id_token':
            setErrorMessage('Google ID token verification failed.');
            return;
          case 'missing_exchange_code':
            setErrorMessage('Invalid authentication callback: Missing exchange code.');
            return;
          default:
            break;
        }
      }

      // Step-specific safe messages
      if (step) {
        switch (step) {
          case 'authorization':
            setErrorMessage('Google authorization could not be completed.');
            return;
          case 'provider_token':
          case 'token_exchange':
            setErrorMessage('Google could not verify the authorization response.');
            return;
          case 'account_setup':
            setErrorMessage('Your Follei account could not be prepared.');
            return;
          case 'session_exchange':
            setErrorMessage('Your Follei session could not be created.');
            return;
          default:
            break;
        }
      }

      setErrorMessage('Google sign-in could not be completed.');
    };

    // 1. Check error FIRST before checking exchange_code
    if (errorParam) {
      setStatus('error');
      handleOAuthError(errorParam, stepParam, reasonParam);
      return;
    }

    // 2. Check for missing exchange_code
    if (!exchangeCode) {
      setStatus('error');
      handleOAuthError('invalid_callback', stepParam, 'missing_exchange_code');
      return;
    }

    // Single-execution guard to prevent React StrictMode from exchanging twice
    if (hasExchangedRef.current) return;
    hasExchangedRef.current = true;

    const performExchange = async () => {
      try {
        // Exchange code for Follei JWT session (unauthenticated request)
        const response = await authApi.exchangeGoogleCode(exchangeCode);

        // Store session tokens and user info in existing auth store
        const authData = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          expires_in: response.expires_in,
          user: response.user,
        };
        setAuthData(authData);
        login(authData);

        setExchangeData(response);
        setStatus('success');

        // Navigate directly to the persisted business setup.
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

      } catch (err: unknown) {
        setStatus('error');
        const msg = err instanceof Error ? err.message : 'Google sign-in could not be completed.';
        setErrorMessage(msg);
      }
    };

    performExchange();
  }, [searchParams, navigate]);

  const handleTryGoogleAgain = () => {
    setStatus('loading');
    setErrorMessage(null);
    startGoogleAuth();
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-inter">
      <div className="w-full max-w-[440px] bg-white rounded-lg border border-slate-200 p-8 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-5 py-6">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-slate-100 border-t-black rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-black rounded-full animate-ping" />
              </div>
            </div>
            <div className="space-y-1 text-center">
              <h2 className="text-lg font-semibold text-slate-900">
                {isRetryingGoogle ? 'Starting new Google sign-in…' : 'Completing your Google sign-in…'}
              </h2>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Setting up your secure Follei session.
              </p>
            </div>
            <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-600 space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Verifying Google authorization</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Preparing your Follei session</span>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xl font-bold">
              !
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              {errorTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {errorMessage || 'Google sign-in could not be completed.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
              <button
                type="button"
                onClick={handleTryGoogleAgain}
                disabled={isRetryingGoogle}
                className="flex-1 bg-black hover:bg-slate-900 text-white font-medium py-2.5 px-4 text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isInvalidState ? 'Try Google again' : 'Try Again'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 text-xs transition-colors cursor-pointer"
              >
                Return to Sign In
              </button>
            </div>
          </div>
        )}

        {status === 'success' && exchangeData && (
          <div className="flex flex-col items-center space-y-4 py-4 text-left">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl font-bold self-center mb-1">
              ✓
            </div>

            <h2 className="text-lg font-semibold text-slate-900 text-center w-full">
              Welcome to Follei
            </h2>

            <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Signed in as {exchangeData.user.email}.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Google was used only to verify your identity.</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center w-full pt-2 animate-pulse">
              Redirecting to your workspace…
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;

