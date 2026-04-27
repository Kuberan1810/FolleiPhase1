import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Sun, Snowflake, ChevronDown } from 'lucide-react';
import AiBrain from "../assets/AiFloat.svg";

interface AIBrainPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIBrainPopup: React.FC<AIBrainPopupProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-28 right-6 lg:bottom-32 lg:right-10 w-[380px] bg-black text-white rounded-[24px] shadow-2xl overflow-hidden z-[60] border border-white/10"
        >
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'radial-gradient(circle at center, #003659 0%, #0A4268 35%, #007ACD 74%)' }}
              >
                <img src={AiBrain} alt="Brain" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold font-manrope">AI Brain</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#004370]/30 px-3 py-1 rounded-full border border-[#004370]/50">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-xs font-medium">Live</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="p-5 space-y-6 max-h-[600px] overflow-y-auto scrollbar-hide">
            {/* Intent Classification */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400">Intent Classification :</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#111827] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xl font-bold text-green-500">26</span>
                  <span className="text-[10px] text-gray-400 mt-1">Interested</span>
                </div>
                <div className="bg-[#111827] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xl font-bold text-red-500">07</span>
                  <span className="text-[10px] text-gray-400 mt-1 text-center">Not Interested</span>
                </div>
                <div className="bg-[#111827] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xl font-bold text-orange-500">15</span>
                  <span className="text-[10px] text-gray-400 mt-1 text-center">Later / Neutral</span>
                </div>
              </div>
            </div>

            {/* Lead Scoring */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400">Lead Scoring :</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#111827] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xl font-bold">18</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Flame size={12} className="text-orange-500" fill="currentColor" />
                    <span className="text-[10px] text-gray-400">Hot</span>
                  </div>
                </div>
                <div className="bg-[#111827] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xl font-bold">22</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Sun size={12} className="text-yellow-500" fill="currentColor" />
                    <span className="text-[10px] text-gray-400">Warm</span>
                  </div>
                </div>
                <div className="bg-[#111827] p-3 rounded-xl border border-white/5 flex flex-col items-center">
                  <span className="text-xl font-bold">08</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Snowflake size={12} className="text-blue-400" />
                    <span className="text-[10px] text-gray-400">Cold</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-response Generation */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-300 font-manrope">Auto-response Generation</h4>
              <div className="w-12 h-6 bg-[#004370] rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
              </div>
            </div>

            {/* Smart follow-up Timing */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300 font-manrope">Smart follow-up Timing</h4>
              <div className="w-full bg-[#111827] p-3 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer">
                <span className="text-xs text-white">AI Recommended</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Context Memory per Lead */}
            <div className="space-y-3 pb-2">
              <h4 className="text-sm font-medium text-gray-300 font-manrope">Context Memory per Lead</h4>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#004370]/20 to-transparent border-l-2 border-[#004370]">
                  <p className="text-xs font-semibold text-white">Ravi Sharma</p>
                  <p className="text-[11px] text-gray-400 mt-1">Visited pricing page twice, not ready yet</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#004370]/20 to-transparent border-l-2 border-[#004370]">
                  <p className="text-xs font-semibold text-white">Priya Mehta</p>
                  <p className="text-[11px] text-gray-400 mt-1">Mentioned 50-person team, bulk pricing interest</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#007ACD]/20 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIBrainPopup;
