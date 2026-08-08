import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFooterProps {
  promptText: string;
  linkText: string;
  linkPath: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({
  promptText,
  linkText,
  linkPath,
}) => {
  return (
    <div className="mt-8 text-center text-sm text-[#444748]">
      <span>{promptText} </span>
      <Link
        to={linkPath}
        className="font-semibold text-[#191C1E] hover:text-black transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;
