
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignUpForm from './Section/SignUpForm';
import toast from 'react-hot-toast';
import { getGoogleAuthorizationUrl, register } from '../../../api/auth/auth.api';
import { errorMessage } from '../../../lib/axios';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSignUp = async (formData: {
    firstName: string;
    lastName: string;
    companyName: string;
    workEmail: string;
    password: string;
  }) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await register({
        email: formData.workEmail,
        password: formData.password,
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
      });
      // The company name is not part of the account -- it becomes the
      // business record during setup, so carry it into that step.
      if (formData.companyName) localStorage.setItem('follei.company_name', formData.companyName);
      toast.success(`Account created for ${formData.firstName}`);
      navigate('/dashboard-setup');
    } catch (error) {
      const msg = errorMessage(error, 'Could not create your account');
      setApiError(msg);
      // toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      window.location.assign(await getGoogleAuthorizationUrl());
    } catch (error) {
      setIsLoading(false);
      const msg = errorMessage(error, 'Google sign-up is unavailable');
      setApiError(msg);
      // toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center p-4 md:p-16 font-inter">
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
          apiError={apiError}
          onClearApiError={() => setApiError(null)}
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

