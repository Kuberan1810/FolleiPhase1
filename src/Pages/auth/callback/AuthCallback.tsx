import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { exchangeGoogleCode } from '../../../api/auth/auth.api';
import { errorMessage } from '../../../lib/axios';

/**
 * Where Google OAuth lands. The backend has already verified the Google
 * identity and redirected here with a single-use exchange_code, which is
 * traded for the real token pair.
 */
export const AuthCallback: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finishing sign-in...');

  // StrictMode mounts effects twice in development. The exchange code is
  // single-use, so a second call would fail and bounce a valid sign-in.
  const exchanged = useRef(false);

  useEffect(() => {
    if (exchanged.current) return;
    exchanged.current = true;

    const error = params.get('error');
    const reason = params.get('reason');
    const exchangeCode = params.get('exchange_code');

    if (error) {
      toast.error(reason || 'Google sign-in failed');
      navigate('/signin', { replace: true });
      return;
    }
    if (!exchangeCode) {
      toast.error('Google did not return a sign-in code');
      navigate('/signin', { replace: true });
      return;
    }

    exchangeGoogleCode(exchangeCode)
      .then((tokens) => {
        toast.success(`Welcome, ${tokens.user.full_name || tokens.user.email}`);
        navigate('/dashboard-setup', { replace: true });
      })
      .catch((err) => {
        setMessage('Sign-in failed');
        toast.error(errorMessage(err, 'Could not complete Google sign-in'));
        navigate('/signin', { replace: true });
      });
  }, [navigate, params]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f8fafc]">
      <div className="flex items-center gap-3 text-[14px] text-[#475569]">
        <Loader2 className="size-5 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AuthCallback;
