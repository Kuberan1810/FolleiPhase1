
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignInForm from './Section/SignInForm';
import GoogleWorkspaceModal from '../modal/GoogleWorkspaceModal';
import { useGoogleAuth } from '../../../hooks/auth/useGoogleAuth';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { startGoogleAuth, isStarting } = useGoogleAuth();

  const handleSignIn = (data: { email: string; password: string; rememberMe: boolean }) => {
    console.log('Signing in with:', data);
    navigate('/onboarding/workspace');
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
          isLoading={isStarting}
        />

        {/* Footer Link to Sign Up */}
        <AuthFooter
          promptText="New to Follei?"
          linkText="Sign Up"
          linkPath="/signup"
        />
      </div>

      {/* Connect Google Workspace Modal on Sign In success */}
      <GoogleWorkspaceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinueWithGoogle={() => {
          console.log('Connecting Google Workspace...');
          setShowModal(false);
          navigate('/onboarding/company-website');
        }}
        onSkip={() => {
          setShowModal(false);
          navigate('/onboarding/company-website');
        }}
      />
    </div>
  );
};

export default SignIn;
