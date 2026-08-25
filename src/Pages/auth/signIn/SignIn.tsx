
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignInForm from './Section/SignInForm';
import { useGoogleAuth } from '../../../hooks/auth/useGoogleAuth';
import { useLogin } from '../../../hooks/auth/useLogin';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { startGoogleAuth, isStarting } = useGoogleAuth();
  const { login, isLoading: isLoginLoading } = useLogin();

  const handleSignIn = async (data: { email: string; password: string; rememberMe: boolean }) => {
    await login(data);
  };

  const handleForgotPassword = () => {
    console.log('Navigating to forgot password...');
    navigate('/forgot-password');
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
          onGoogleSignIn={startGoogleAuth}
          onForgotPassword={handleForgotPassword}
          isLoading={isStarting || isLoginLoading}
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

