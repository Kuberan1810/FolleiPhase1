import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRightLeft, Radio, Send } from 'lucide-react';

interface ModeBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    currentMode: 'inbound' | 'outbound';
    onSelect: (mode: 'inbound' | 'outbound') => void;
}

const ModeBottomSheet: React.FC<ModeBottomSheetProps> = ({ isOpen, onClose, currentMode, onSelect }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] sm:hidden"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[101] p-6 pb-10 sm:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.1)]"
                    >
                        {/* Handle */}
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#191C1E]">Select Mode</h2>
                            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Inbound Card */}
                            <button
                                onClick={() => { onSelect('inbound'); onClose(); }}
                                className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left
                                    ${currentMode === 'inbound' 
                                        ? 'border-[#014370] bg-[#014370]/5' 
                                        : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                                    ${currentMode === 'inbound' ? 'bg-[#014370] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    <Radio size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-[#191C1E]">Inbound</h3>
                                    <p className="text-sm text-gray-500">Manage incoming leads and interactions</p>
                                </div>
                                {currentMode === 'inbound' && (
                                    <div className="w-6 h-6 rounded-full bg-[#014370] flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                )}
                            </button>

                            {/* Outbound Card */}
                            <button
                                onClick={() => { onSelect('outbound'); onClose(); }}
                                className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left
                                    ${currentMode === 'outbound' 
                                        ? 'border-[#014370] bg-[#014370]/5' 
                                        : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                                    ${currentMode === 'outbound' ? 'bg-[#014370] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    <Send size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-[#191C1E]">Outbound</h3>
                                    <p className="text-sm text-gray-500">Scale your outreach and campaigns</p>
                                </div>
                                {currentMode === 'outbound' && (
                                    <div className="w-6 h-6 rounded-full bg-[#014370] flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ModeBottomSheet;
