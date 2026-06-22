import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Sun, Snowflake, ChevronDown } from 'lucide-react';
import AiBrain from "../assets/AiFloat.svg";

interface PostSalesAIBrainPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostSalesAIBrainPopup: React.FC<PostSalesAIBrainPopupProps> = ({ isOpen, onClose }) => {
  const [autoResponse, setAutoResponse] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState('AI Recommended');

  const timingOptions = ['AI Recommended', 'Immediately', '1 Hour Later', '24 Hours Later', 'Next Business Day'];

  // Outbound Data
  const outboundIntentData = [
    { count: '45%', label: 'Positive Reply', colorClass: 'text-[#0E9F6E]' },
    { count: '12%', label: 'Unsubscribe', colorClass: 'text-[#E02424]' },
    { count: '43%', label: 'Out of Office', colorClass: 'text-[#F6810C]' }
  ];

  const outboundCampaignData = [
    { score: '65%', label: 'Open Rate', Icon: Sun, iconColor: 'text-yellow-500', fill: 'currentColor' },
    { score: '12%', label: 'Reply Rate', Icon: Flame, iconColor: 'text-orange-500', fill: 'currentColor' },
    { score: 'Low', label: 'Spam Risk', Icon: Snowflake, iconColor: 'text-blue-400', fill: 'none' }
  ];

  const outboundActivityData = [
    { name: 'Campaign A', memory: 'Subject line A performing 15% better. Switching traffic.' },
    { name: 'Campaign B', memory: 'Paused due to low engagement. AI recommends new copy.' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Outside Click Backdrop */}
          <div
            className="fixed inset-0 z-55"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 80, x: 40, filter: "blur(15px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.4, y: 80, x: 40, filter: "blur(15px)" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-36 left-1/2 -translate-x-1/2 sm:bottom-28 sm:right-6 sm:left-auto sm:translate-x-0 w-[calc(100vw-20px)] max-w-[380px] bg-[#000510]/95 backdrop-blur-2xl text-white rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[60] border border-white/10 ring-1 ring-white/5 font-manrope"
          >
            {/* Header */}  
            <div className="p-5 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
              <div className="flex items-center gap-4">

                {/* Premium Glow Icon (Exact copy from floating button, scaled to w-12 h-12) */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {/* Pulse rings */}
                  <div className="absolute rounded-full border border-blue-500/35" style={{ inset: '-6px', animation: 'pulse-ring 2.4s ease-out infinite' }} />
                  <div className="absolute rounded-full border border-blue-500/20" style={{ inset: '-10px', animation: 'pulse-ring 2.4s ease-out infinite 0.8s' }} />

                  {/* Spinning conic layer 1 */}
                  <div className="absolute rounded-full" style={{ inset: '-2px', animation: 'spin-slow 4s linear infinite', background: 'conic-gradient(from 0deg, transparent 60%, #007ACD 80%, #00BFFF 90%, transparent 100%)' }} />
                  {/* Spinning conic layer 2 */}
                  <div className="absolute rounded-full" style={{ inset: '-2px', animation: 'spin-reverse 6s linear infinite', background: 'conic-gradient(from 0deg, transparent 70%, #003E6B 85%, #0055A0 95%, transparent 100%)' }} />

                  {/* Button face */}
                  <div className="relative w-12 h-12 rounded-full flex items-center justify-center z-10 overflow-hidden border border-blue-500/30 shadow-xl" style={{ background: 'radial-gradient(circle at 35% 35%, #0a2a4a, #000c1e)' }}>
                    <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(0,180,255,0.25) 0%, transparent 55%)' }} />
                    <div className="absolute top-[4px] left-[8px] w-[14px] h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.12)', filter: 'blur(1.5px)', transform: 'rotate(-20deg)' }} />
                    <img src={AiBrain} alt="Brain" className="relative z-10 w-6 h-6" style={{ filter: 'drop-shadow(0 0 6px rgba(0,190,255,0.9)) drop-shadow(0 0 15px rgba(0,122,205,0.6))', animation: 'breathe 2.4s ease-in-out infinite' }} />
                  </div>
                </div>

                <h3 className="text-[22px] font-semibold font-manrope tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">AI Brain</h3>
              </div>

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-2 bg-[#014471] px-3 py-1.5 rounded-[10px] border border-[#004370]/50">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs font-medium">Live</span>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5  hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

            </div>

            <div className="p-5 space-y-6 max-h-[400px] overflow-y-auto scrollbar-hide">
              {/* Intent Classification */}
              <div className="space-y-3">
                <h4 className="text-sm  md:text-base font-medium text-white/95 font-manrope">
                  Email Sentiment :
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {outboundIntentData.map((item, index) => (
                    <div key={index} className="bg-[#4837A720] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                      <span className={`text-xl font-bold ${item.colorClass}`}>{item.count}</span>
                      <span className="text-[11px] font-medium text-white/85 mt-1 text-center">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Scoring */}
              <div className="space-y-3">
                <h4 className="text-sm  md:text-base font-medium text-white/95 font-manrope">
                  Campaign Success :
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {outboundCampaignData.map((item, index) => (
                    <div key={index} className="bg-[#4837A720] p-3 rounded-xl border border-white/5 flex flex-col items-center text-center">
                      <span className="text-xl font-bold">{item.score}</span>
                      <div className="flex items-center gap-1 mt-1">
                        {/* <item.Icon size={12} className={item.iconColor} fill={item.fill} /> */}
                        <span className="text-[11px] font-medium text-white/85">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto-response Generation */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm md:text-base font-medium text-white/95 font-manrope">
                  A/B Test Optimization
                </h4>

                <div
                  onClick={() => setAutoResponse(!autoResponse)}
                  className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-300 ease-in-out ${autoResponse ? 'bg-[#004370]' : 'bg-white/20'
                    }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out ${autoResponse ? 'translate-x-6 scale-105' : 'translate-x-0 scale-100'
                      }`}
                  />
                </div>
              </div>

              {/* Smart follow-up Timing */}
              <div className="space-y-3 relative">
                <h4 className="text-sm  md:text-base font-medium text-white/95 font-manrope">
                  Optimal Sending Time
                </h4>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-[#4837A720] hover:bg-[#1f2937] transition-colors p-3 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-sm font-semibold text-white">{selectedTiming}</span>
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-gray-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-[#0F112B] border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl"
                    >
                      {timingOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setSelectedTiming(option);
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-3 text-sm cursor-pointer hover:bg-white/10 transition-colors ${selectedTiming === option ? 'text-[#007ACD] font-semibold' : 'text-gray-300'}`}
                        >
                          {option}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Context Memory per Campaign */}
              <div className="space-y-3 pb-2">
                <h4 className="text-sm  md:text-base font-medium text-white/95 font-manrope">
                  AI Campaign Insights
                </h4>
                <div className="space-y-3">
                  {outboundActivityData.map((lead, index) => (
                    <div key={index} className="p-4 rounded-xl bg-linear-to-r from-[#004370]/20 to-[#004370]/10  ">
                      <p className="text-xs  md:text-base font-semibold text-white">{lead.name}</p>
                      <p className="text-[12px] md:text-[15px] text-gray-400 mt-1">{lead.memory}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Premium Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#007ACD]/30 via-[#007ACD]/5 to-transparent pointer-events-none z-0" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-[#00BFFF]/30 blur-2xl pointer-events-none rounded-[100%] z-0" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PostSalesAIBrainPopup;
