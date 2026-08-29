import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle = 'Start building better SaaS workflows today.',
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-[32px] font-semibold text-[#191C1E] tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm text-[#444748] font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
