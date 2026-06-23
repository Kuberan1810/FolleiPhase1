import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AiBrain from "../assets/AiFloat.svg";
import { Activity, Convertshape, VideoPlay, Profile2User, SmartHome } from 'iconsax-react';

interface PreSalesAIBrainPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreSalesAIBrainPopup: React.FC<PreSalesAIBrainPopupProps> = ({ isOpen, onClose }) => {
  const happeningNow = [
    {
      label: 'New Leads',
      value: '124',
      colorClass: 'text-[#10B981]',
      bgClass: 'bg-[#111827]/40 border-[#064E3B]/30',

    },
    {
      label: 'Replies Received',
      value: '18',
      colorClass: 'text-[#4F46E5]',
      bgClass: 'bg-[#111827]/40 border-[#7F1D1D4D]/30',

    },
    {
      label: 'Demos Scheduled',
      value: '48',
      colorClass: 'text-[#22C55E]',
      bgClass: 'bg-[#111827]/40 border-[#14532D]/30',

    },
    {
      label: 'Conversions',
      value: '12',
      colorClass: 'text-[#3B82F6]',
      bgClass: 'bg-[#111827]/40 border-[#1E3A8A]/30',

    }
  ];

  // Section 2: leads Journey Overview
  const leadsJourney = [
    {
      label: 'New Leads',
      value: '8',
      color: '#FFFFFF',
      bgClass: 'bg-[#4F46E5] border-[#030D34]',
      Icon: Profile2User

    },
    {
      label: 'Contacted',
      value: '12',
      color: '#FFFFFF',
      bgClass: 'bg-[#3B82F6] border-[#030D34]',
      Icon: SmartHome
    },
    {
      label: 'Engaged',
      value: '18',
      color: '#FFFFFF',
      bgClass: 'bg-[#6366F1] border-[#030D34]',
      Icon: Activity
    },
    {
      label: 'Demo',
      value: '8',
      color: '#FFFFFF',
      bgClass: 'bg-[#14B8A6] border-[#030D34]',
      Icon: VideoPlay
    },
    {
      label: 'Converted',
      value: '14',
      color: '#FFFFFF',
      bgClass: 'bg-[#22C55E] border-[#030D34]',
      Icon: Convertshape
    }
  ];

  const HotLeads = [
    {
      initials: 'JD',
      name: 'John Davis',
      details: 'Viewed pricing page 5 times • Demo requested',
      avatarBg: 'bg-[#670505] text-white'
    },
    {
      initials: 'SM',
      name: 'Sarah Miller',
      details: 'Replied to WhatsApp • Requested proposal',
      avatarBg: 'bg-[#773405] text-white'
    },

  ];
  const Risks = [
    {
      initials: 'MJ',
      name: 'Michael Johnson',
      details: 'No response for 7 days',
      avatarBg: 'bg-[#670505] text-white'
    },
    {
      initials: 'AR',
      name: 'Anita Rao',
      details: 'Demo scheduled but not attended',
      avatarBg: 'bg-[#773405] text-white'
    },

  ];

  const predictions = [
    '• 12 leads likely to convert this week',
    '• 8 leads require immediate follow-up',
    '• Expected Revenue: ₹4.8L',
    '• Conversion Probability: 74%'
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
            className="fixed bottom-36 left-1/2 -translate-x-1/2 sm:bottom-28 sm:right-6 sm:left-auto sm:translate-x-0 w-[calc(100vw-20px)] max-w-[380px] bg-[#000510]/95 backdrop-blur-2xl text-white rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[60] border border-white/10 ring-1 ring-white/5 font-manrope animate-fade-in"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
              <div className="flex items-center gap-4">
                {/* Premium Glow Icon */}
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
                {/* Live Badge matching design */}
                <div className="flex items-center gap-1.5 bg-[#1E3A8A]/40 px-2.5 py-1 rounded-full border border-[#1E40AF]/50">
                  <div className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-[#60A5FA] tracking-wider uppercase">Live</span>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} className="text-[#9CA3AF]" />
                </button>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-6 max-h-[400px] overflow-y-auto scrollbar-hide relative z-10">
              {/* Section 1: What's Happening Now */}
              <div className="space-y-3">
                <h4 className="text-[14px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                  What's Happening Now
                </h4>
                <div className="grid grid-cols-4 gap-2.5">
                  {happeningNow.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col justify-between p-2 rounded-[8px] border ${item.bgClass}`}
                    >
                      <div className="flex items-start gap-1 text-[10px] font-semibold tracking-tight">

                        <span className="leading-tight text-[#6B7280]">{item.label}</span>
                      </div>
                      <span className={`text-[20px] text-center font-bold mt-2 ${item.colorClass}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 */}

              <div className="space-y-3">
                <h4 className="text-[14px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                  Lead Journey Overview
                </h4>
                <div className="relative">
                  <div className="absolute top-4 left-[10%] right-[10%] h-[1px] bg-[#FFFFFF]/10 -translate-y-1/2 z-0" />

                  <div className="grid grid-cols-5 gap-1.5 relative z-10">
                    {leadsJourney.map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-full bg-[#020713] p-[1.5px] relative z-10 mb-2">
                          <div className={`w-full h-full rounded-full flex items-center justify-center border ${step.bgClass}`} style={{ color: step.color }}>
                            <step.Icon size={13} color="currentColor" />
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-[#9CA3AF] leading-tight min-h-[22px] flex items-center justify-center">
                          {step.label}
                        </span>
                        <span className="text-[14px] font-bold text-white mt-1">{step.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h4 className="text-[14px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                  Hot Leads Requiring Attention                </h4>
                <div className="space-y-2">
                  {HotLeads.map((risk, index) => (
                    <div
                      key={index}
                      className="bg-[#170D19] border border-[#521229] p-3 rounded-[12px] flex items-center gap-3 hover:bg-white/[0.08] transition-colors duration-200"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${risk.avatarBg}`}>
                        {risk.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-white leading-none">{risk.name}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-1.5 leading-normal truncate">{risk.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-[14px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                    At Risk Leads
                  </h4>
                  <div className="space-y-2">
                    {Risks.map((risks, index) => (
                      <div
                        key={index}
                        className="bg-[#171415] border border-[#523E10] p-3 rounded-[12px] flex items-center gap-3 hover:bg-white/[0.08] transition-colors duration-200"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${risks.avatarBg}`}>
                          {risks.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-bold text-white leading-none">{risks.name}</p>
                          <p className="text-[11px] text-[#9CA3AF] mt-1.5 leading-normal truncate">{risks.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[14px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                  AI Predictions
                </h4>
                <div className="bg-transparent border border-blue-500/20 p-[10px] rounded-[10px]">
                  <div className="space-y-2.5 text-[14px] font-bold text-[#9CA3AF] leading-normal">
                    {predictions.map((prediction, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span>{prediction}</span>
                      </div>
                    ))}
                  </div>
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

export default PreSalesAIBrainPopup;
