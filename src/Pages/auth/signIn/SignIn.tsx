
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignInForm from './Section/SignInForm';
import toast from 'react-hot-toast';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Welcome back, ${data.email}!`);
      navigate('/dashboard');
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Signed in with Google');
      navigate('/dashboard');
    }, 600);
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

