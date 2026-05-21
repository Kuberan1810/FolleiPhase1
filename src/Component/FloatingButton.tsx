import { useState, useEffect } from "react";
import { Plus, Pencil } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AiBrain from "../assets/AiFloat.svg";
import AIBrainPopup from "./AIBrainPopup";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (e: any) => {
      // Use capture phase listener to detect scroll from the main container
      const target = e.target;
      if (!target.scrollTop && target !== document.documentElement) return;
      
      const currentScrollY = target.scrollTop || window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      
      if (deltaY > 10 && currentScrollY > 20) {
        setIsVisible(false); // Hide on scroll down
      } else if (deltaY < -10) {
        setIsVisible(true); // Show on light scroll up
      }
      setLastScrollY(currentScrollY);
    };

    // Use capture: true to catch scroll events from any nested container (like the <main> tag)
    document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => document.removeEventListener('scroll', handleScroll, { capture: true });
  }, [lastScrollY]);

  const isOutbound = location.pathname.startsWith('/postsales/campaigns');
  const isPresalesCampaign = location.pathname.startsWith('/presales/campaign');
  const targetPath = isOutbound ? "/postsales/campaigns/create" : isPresalesCampaign ? "/presales/campaigns/create" : "";

  return (
    <>
      <AIBrainPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} isOutbound={isOutbound} />

      <div className="fixed bottom-24 right-4 lg:bottom-10 lg:right-10 z-50 pointer-events-none">
        <motion.div
            animate={{ 
                y: isVisible ? 0 : 150, 
                opacity: isVisible ? 1 : 0 
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="pointer-events-auto"
        >
            <motion.div 
                drag
                dragElastic={0.15}
                dragMomentum={false}
                whileDrag={{ scale: 1.1, zIndex: 100 }}
                className="flex items-center gap-3"
            >
                {/* Create Button */}
                <Link
                    to={targetPath}
                    className="w-[58px] h-[58px] bg-[#004370] text-white rounded-2xl flex items-center justify-center hover:bg-[#003152] shadow-[0_10px_25px_rgba(0,67,112,0.3)] transition-all transform active:scale-95 cursor-pointer"
                >
                    {isOutbound ? (
                        <Plus size={32} strokeWidth={2.5} />
                    ) : (
                        <Pencil size={24} strokeWidth={2.5} />
                    )}
                </Link>

                {/* AI Button — Premium Glow */}
                <div
                    onClick={() => setIsPopupOpen(!isPopupOpen)}
                    className="relative w-[58px] h-[58px] flex items-center justify-center cursor-pointer"
                    style={{ animation: 'float 3s ease-in-out infinite' }}
                >
                    {/* Pulse rings */}
                    <div
                        className="absolute rounded-full border border-blue-500/35"
                        style={{ inset: '-8px', animation: 'pulse-ring 2.4s ease-out infinite' }}
                    />
                    <div
                        className="absolute rounded-full border border-blue-500/20"
                        style={{ inset: '-14px', animation: 'pulse-ring 2.4s ease-out infinite 0.8s' }}
                    />

                    {/* Spinning conic layer 1 */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            inset: '-3px',
                            animation: 'spin-slow 4s linear infinite',
                            background: 'conic-gradient(from 0deg, transparent 60%, #007ACD 80%, #00BFFF 90%, transparent 100%)',
                        }}
                    />
                    {/* Spinning conic layer 2 */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            inset: '-3px',
                            animation: 'spin-reverse 6s linear infinite',
                            background: 'conic-gradient(from 0deg, transparent 70%, #003E6B 85%, #0055A0 95%, transparent 100%)',
                        }}
                    />

                    {/* Button face */}
                    <div
                        className="relative w-[58px] h-[58px] rounded-full flex items-center justify-center z-10 overflow-hidden border border-blue-500/30 hover:border-blue-400/60 transition-colors duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.2)] active:scale-95"
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, #0a2a4a, #000c1e)',
                        }}
                    >
                        {/* Inner radial glow */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 30% 25%, rgba(0,180,255,0.25) 0%, transparent 55%)',
                            }}
                        />
                        {/* Lens flare */}
                        <div
                            className="absolute top-[5px] left-[10px] w-[18px] h-[6px] rounded-full"
                            style={{
                                background: 'rgba(255,255,255,0.12)',
                                filter: 'blur(2px)',
                                transform: 'rotate(-20deg)',
                            }}
                        />
                        {/* Icon */}
                        <img
                            src={AiBrain}
                            alt="Ai brain image"
                            className="relative z-10 w-8 h-8"
                            style={{
                                filter: 'drop-shadow(0 0 8px rgba(0,190,255,0.9)) drop-shadow(0 0 20px rgba(0,122,205,0.6))',
                                animation: 'breathe 2.4s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default FloatingButton;