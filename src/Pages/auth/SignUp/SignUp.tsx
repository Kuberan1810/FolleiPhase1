
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignUpForm from './Section/SignUpForm';
import toast from 'react-hot-toast';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (formData: {
    firstName: string;
    lastName: string;
    companyName: string;
    workEmail: string;
    password: string;
  }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Account created for ${formData.firstName}!`);
      navigate('/dashboard-setup');
    }, 600);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Signed up with Google');
      navigate('/dashboard-setup');
    }, 600);
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
          isLoading={isLoading}
        />

        {/* Footer Link to Sign In */}
        <AuthFooter
          promptText="Already have an account?"
          linkText="Sign in"
          linkPath="/login"
        />
      </div>
    </div>
  );
};

export default SignUp;

