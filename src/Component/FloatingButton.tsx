import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AiBrain from "../assets/AiFloat.svg";
import AIBrainPopup from "./AIBrainPopup";

const FloatingButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const isOutbound = location.pathname.startsWith('/outbound/Campaigns');
  const targetPath = isOutbound ? "/outbound/campaigns/create" : "";

  return (
    <>
      <AIBrainPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} isOutbound={isOutbound} />

      <div className="fixed bottom-20 right-4 lg:bottom-10 lg:right-10 flex items-center gap-3 z-50">

        {/* Create Button */}
        <Link
          to={targetPath}
          className="w-[56px] h-[56px] bg-[#004370] text-white rounded-2xl flex items-center justify-center hover:bg-[#003152] transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
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
          className="relative w-[56px] h-[56px] flex items-center justify-center cursor-pointer"
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
            className="relative w-[56px] h-[56px] rounded-full flex items-center justify-center z-10 overflow-hidden border border-blue-500/30 hover:border-blue-400/60 transition-colors duration-300 shadow-xl active:scale-95"
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

      </div>
    </>
  );
};

export default FloatingButton;