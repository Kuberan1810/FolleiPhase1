
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignUpForm from './Section/SignUpForm';
import GoogleWorkspaceModal from '../modal/GoogleWorkspaceModal';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = (data: {
    firstName: string;
    lastName: string;
    workEmail: string;
    password: string;
  }) => {
    console.log('Signing up with:', data);
    // Open Google Workspace modal after registration
    setShowModal(true);
  };

  const handleGoogleSignUp = () => {
    console.log('Initiating Google sign up...');
    setShowModal(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 font-inter">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* Header Title & Subtitle */}
        <AuthHeader
          title="Create your account"
          subtitle="Start building better SaaS workflows today."
        />

        {/* Card containing Sign Up Form */}
        <SignUpForm
          onSubmit={handleSignUp}
          onGoogleSignUp={handleGoogleSignUp}
        />

        {/* Footer Link to Sign In */}
        <AuthFooter
          promptText="Already have an account?"
          linkText="Sign in"
          linkPath="/login"
        />
      </div>

      {/* Connect Google Workspace Modal on Sign Up success */}
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

export default SignUp;
