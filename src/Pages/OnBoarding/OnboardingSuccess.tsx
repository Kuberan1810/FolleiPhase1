import { Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
import BtnCom from '../../Component/BtnCom';

const OnboardingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5 overflow-hidden relative">
      <div className="flex items-center gap-3 mb-10">
        <div className='w-28 fixed top-5'>
          <img src={FolleiWhite} alt="FolleiLogo" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-[800px] mx-auto scale-90 sm:scale-100">

        {/* Success Icon Section */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#005B96]/10 blur-3xl rounded-full scale-[2.5]" />
            <div className="relative w-[80px] h-[80px] bg-[#005B96] rounded-full flex items-center justify-center text-white shadow-[0_15px_35px_rgba(0,91,150,0.25)]">
              <Check size={40} strokeWidth={3.5} />
              <motion.div
                animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-4 text-[#005B96]/80"
              >
                <Sparkles size={24} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Messaging Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-[#191C1E] text-[28px] font-semibold mb-3 font-manrope tracking-tight">
            You're All Set!
          </h2>
          <p className="text-[#64748B] text-[16px] font-regular font-inter leading-relaxed max-w-[440px] mx-auto">
            Your AI agent is ready to manage calls, messages, and emails with sentient-level precision.
          </p>
        </motion.div>

        {/* Central Wave Animation - Liquid Circle */}
        <div className="w-full h-[240px] flex items-center justify-center my-6 relative overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative w-[200px] h-[200px] rounded-full overflow-hidden bg-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]"
          >
            {/* Wave Container that rises to fill like a ball */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "-30%" }}
              transition={{ delay: 0.1, duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-[150%]"
            >
              {/* Wave 1 - Deepest */}
              <motion.svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="absolute bottom-0 w-[400%] h-[150%] -left-[100%]"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <path d="M0,80 C150,120 300,40 450,80 C600,120 750,40 900,80 C1050,120 1200,40 1350,80 V120 H0 Z" fill="url(#gradient-deep)" />
                <defs>
                  <linearGradient id="gradient-deep" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#005B96" /><stop offset="100%" stopColor="#003152" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Wave 2 - Mid */}
              <motion.svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="absolute bottom-0 w-[400%] h-[135%] -left-[150%]"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.8 }}
              >
                <path d="M0,70 C150,30 300,110 450,70 C600,30 750,110 900,70 C1050,30 1200,110 1350,70 V120 H0 Z" fill="url(#gradient-mid)" />
                <defs>
                  <linearGradient id="gradient-mid" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0172B1" /><stop offset="100%" stopColor="#005B96" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Wave 3 - Top / Lightest */}
              <motion.svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="absolute bottom-0 w-[400%] h-[120%] -left-[50%]"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.9 }}
              >
                <path d="M0,60 C150,100 300,20 450,60 C600,100 750,20 900,60 C1050,100 1200,20 1350,60 V120 H0 Z" fill="url(#gradient-top)" />
                <defs>
                  <linearGradient id="gradient-top" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#54D6E7" /><stop offset="100%" stopColor="#0172B1" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-blue-100/5 blur-[50px] rounded-full -z-10" />
        </div>

        {/* Loading/Status Section */}
        <div className="flex flex-col items-center gap-8 mt-4 w-full max-w-[400px]">
          <div className="flex items-center gap-3">
            <span className="text-[#005B96] text-[12px] font-bold tracking-[0.1em] uppercase font-inter">
              Setting up your dashboard
            </span>
            <div className="flex gap-1.5 min-w-[30px] justify-start">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-[#005B96] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          <BtnCom
            title="GO TO DASHBOARD"
            variant="primary"
            onClick={() => navigate('/dashboard')}
            className="w-full tracking-widest!"
          />
        </div>
      </main>
    </div>
  );
};

export default OnboardingSuccess;
