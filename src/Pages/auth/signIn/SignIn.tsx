import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignInForm from './Section/SignInForm';
import toast from 'react-hot-toast';
import { coirei } from '../../../api/coirei';
import { storeSession } from '../../../lib/auth';
import { useSession, keys } from '../../../hooks/useProjects';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  if (session.data) return <Navigate to="/" replace />;

  const handleSignIn = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const tokens = await coirei.signIn(data.email, data.password);
      storeSession(tokens);
      await cache.invalidateQueries({ queryKey: keys.session });
      toast.success(`Welcome back, ${tokens.user.full_name || tokens.user.email}`);
      navigate('/', { replace: true });
    } catch (error) {
      const msg = (error as Error).message || 'Could not sign you in';
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const { authorization_url } = await coirei.googleSignInUrl();
      window.location.assign(authorization_url);
    } catch (error) {
      setIsLoading(false);
      const msg = (error as Error).message || 'Google sign-in is unavailable';
      setApiError(msg);
      toast.error(msg);
    }
  };

  const handleForgotPassword = () => {
    toast('Forgot password link sent to your email');
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 font-inter">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* Header Title & Subtitle */}
        <AuthHeader
          title="Sign in"
          subtitle="Start building better SaaS workflows today."
        />

        {/* Card containing Sign In Form & Social OAuth */}
        <SignInForm
          onSubmit={handleSignIn}
          onGoogleSignIn={handleGoogleSignIn}
          onForgotPassword={handleForgotPassword}
          isLoading={isLoading}
          apiError={apiError}
          onClearApiError={() => setApiError(null)}
        />

        {/* Footer Link to Sign Up */}
        <AuthFooter
          promptText="New to coirei?"
          linkText="Sign Up"
          linkPath="/signup"
        />
      </div>
    </div>
  );
};

export default SignIn;
