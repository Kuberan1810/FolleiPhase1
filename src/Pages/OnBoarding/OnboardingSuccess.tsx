import { useEffect, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OnboardingSuccess = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  // Animated ellipsis for the status text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter overflow-hidden relative">
      <header className="bg-[#005B96] h-[100px] flex items-center px-8 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#005B96]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="16" y="16" width="6" height="6" rx="1" />
              <rect x="2" y="16" width="6" height="6" rx="1" />
              <rect x="9" y="2" width="6" height="6" rx="1" />
              <path d="M7 16v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
              <path d="M12 11V8" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-[28px] leading-tight tracking-tight font-manrope">LiveTracker</h1>
            <p className="text-white/70 text-[16px] uppercase font-bold tracking-[0.05em] font-manrope">Precision Orchestrator</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-[800px] mx-auto scale-90 sm:scale-100">

        {/* Success Icon Section */}
        <div className="relative mb-6">
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
          <h2 className="text-[#000000] text-[28px] font-bold mb-3 font-manrope tracking-tight">
            You're All Set!
          </h2>
          <p className="text-[#464555] text-[16px] font-medium font-inter leading-relaxed max-w-[440px] mx-auto opacity-70">
            Your AI agent is ready to manage calls,messages, and emails with sentient-levelprecision.
          </p>
        </motion.div>

        {/* Central Wave Animation - Liquid Circle */}
        <div className="w-full h-[240px] flex items-center justify-center my-6 relative overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-[200px] h-[200px] rounded-full overflow-hidden bg-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]"
          >
            {/* Wave Container that rises to fill like a ball */}
            <motion.div
              initial={{ y: "95%" }}
              animate={{ y: "15%" }}
              transition={{ delay: 0.8, duration: 3.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Wave 1 - Deepest */}
              <motion.svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="absolute bottom-0 w-[400%] h-[120%] -left-[100%]"
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
                className="absolute bottom-0 w-[400%] h-[110%] -left-[150%]"
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
                className="absolute bottom-0 w-[400%] h-[100%] -left-[50%]"
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
        <div className="flex flex-col items-center gap-6 mt-4 w-full">
          <div className="flex items-center gap-3">
            <span className="text-[#015C96] text-[12px] font-bold tracking-[0.1em] uppercase font-inter">
              Setting up your dashboard
            </span>
            <div className="flex gap-1.5 min-w-[30px] justify-start">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-[#015C96] rounded-full"
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

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#004370' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')}
            className="bg-[#005B96] text-white h-[50px] w-full rounded-[8px] text-[14px] font-bold tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] cursor-pointer"
          >
            Go To Dashboard
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default OnboardingSuccess;
