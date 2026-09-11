import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignUpForm from './Section/SignUpForm';
import toast from 'react-hot-toast';
import { coirei } from '../../../api/coirei';
import { storeSession } from '../../../lib/auth';
import { useSession, keys } from '../../../hooks/useProjects';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const cache = useQueryClient();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  if (session.data) return <Navigate to="/" replace />;

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
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const tokens = await coirei.register(formData.workEmail, formData.password, fullName);
      storeSession(tokens);
      if (formData.companyName) {
        localStorage.setItem('follei.company_name', formData.companyName);
      }
      await cache.invalidateQueries({ queryKey: keys.session });
      toast.success(`Account created for ${formData.firstName}`);
      navigate('/', { replace: true });
    } catch (error) {
      const msg = (error as Error).message || 'Could not create your account';
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const { authorization_url } = await coirei.googleSignInUrl();
      window.location.assign(authorization_url);
    } catch (error) {
      setIsLoading(false);
      const msg = (error as Error).message || 'Google sign-up is unavailable';
      setApiError(msg);
      toast.error(msg);
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
