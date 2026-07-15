import FolleiWhite from '../assets/logo/follei-white-new.svg';
import Dashboard from '../assets/login/dashboard1.svg';

interface AuthSidebarProps {
  title?: string;
  description?: string;
}

const AuthSidebar = ({
  title = 'Welcome to AI Agent',
  description = 'Manage your customer calls, messages & emails automatically with your AI agent',
}: AuthSidebarProps) => {
  return (
    <div className="hidden md:flex md:w-[45%] h-screen sticky top-0 bg-[#003E6B] text-white p-6 lg:p-12 flex-col justify-between overflow-hidden relative shrink-0">
      <div className="z-10 font-inter">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-28">
            <img src={FolleiWhite} alt="Follei Logo" />
          </div>
        </div>

        {/* Text */}
        <div className="max-w-[480px]">
          <h2 className="lg:text-[32px] text-2xl font-semibold font-manrope mb-[18px] leading-tight tracking-tight">
            {title}
          </h2>
          <p className="lg:text-[16px] text-sm font-normal font-manrope opacity-90 leading-[24px] tracking-normal">
            {description}
          </p>
        </div>
      </div>

      {/* Illustration */}
      <div className="relative flex-1 min-h-0 w-[calc(100%+1.5rem)] lg:w-[calc(100%+3rem)] hidden md:flex items-end justify-end pointer-events-none z-10 mt-6 -mr-6 lg:-mr-12 -mb-6 lg:-mb-12">
        <img
          src={Dashboard}
          alt="AI Agent Illustration"
          className="max-w-full max-h-full object-contain object-right-bottom drop-shadow-[0_15px_40px_rgba(0,0,0,0.3)] rounded-tl-xl ml-auto"
        />
      </div>

      {/* Decorative blur */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[200px] h-[200px] bg-white/3 rounded-full blur-[80px]" />
    </div>
  );
};

export default AuthSidebar;
