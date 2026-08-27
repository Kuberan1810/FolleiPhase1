
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignInForm from './Section/SignInForm';
import toast from 'react-hot-toast';
import { getGoogleAuthorizationUrl, login } from '../../../api/auth/auth.api';
import { errorMessage } from '../../../lib/axios';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setIsLoading(true);
    try {
      const tokens = await login({ email: data.email, password: data.password });
      toast.success(`Welcome back, ${tokens.user.full_name || tokens.user.email}`);
      navigate('/dashboard-setup');
    } catch (error) {
      toast.error(errorMessage(error, 'Could not sign you in'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // The backend mints the anti-CSRF state, so the authorize URL has to
      // come from it rather than being built here.
      const authorizationUrl = await getGoogleAuthorizationUrl();
      // Full navigation, not react-router: the next stop is Google's domain.
      window.location.assign(authorizationUrl);
    } catch (error) {
      setIsLoading(false);
      toast.error(errorMessage(error, 'Google sign-in is unavailable'));
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
        />

        {/* Footer Link to Sign Up */}
        <AuthFooter
          promptText="New to Follei?"
          linkText="Sign Up"
          linkPath="/signup"
        />
      </div>
    </div>
  );
};

export default SignIn;

