
import React from 'react';
import { AuthHeader } from '../Components/AuthHeader';
import { AuthFooter } from '../Components/AuthFooter';
import SignUpForm from './Section/SignUpForm';
import { useSignup } from '../../../hooks/auth/useSignup';

export const SignUp: React.FC = () => {
  const { mutate: register, isPending } = useSignup();

  const handleSignUp = (formData: {
    firstName: string;
    lastName: string;
    companyName: string;
    workEmail: string;
    password: string;
  }) => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    register({
      email: formData.workEmail,
      password: formData.password,
      full_name: fullName,
      tenant_name: formData.companyName,
    });
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
          isLoading={isPending}
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
