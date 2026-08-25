import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';

interface AiFollowupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (channels: { call: boolean; whatsapp: boolean }) => void;
  initialChannels?: { call: boolean; whatsapp: boolean };
}

export const AiFollowupModal: React.FC<AiFollowupModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialChannels = { call: false, whatsapp: false },
}) => {
  const [callEnabled, setCallEnabled] = useState(initialChannels.call);
  const [whatsappEnabled, setWhatsappEnabled] = useState(initialChannels.whatsapp);

  useEffect(() => {
    if (isOpen) {
      setCallEnabled(initialChannels.call);
      setWhatsappEnabled(initialChannels.whatsapp);
    }
  }, [isOpen, initialChannels]);

  if (!isOpen) return null;

  const handleOk = () => {
    onConfirm({
      call: callEnabled,
      whatsapp: whatsappEnabled,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[490px] bg-white rounded-[24px] p-7 shadow-2xl border border-[#E5E7EB] relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 p-1 text-[#64748B] hover:text-[#1E293B] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {/* Title and Subtitle */}
        <div className="pr-8">
          <h2 className="text-[19px] font-bold text-[#1E293B] tracking-tight">
            AI Follow-up Automation
          </h2>
          <p className="text-[14px] text-[#64748B] mt-1.5 leading-relaxed">
            Choose which channels Follei should use to nurture your leads.
          </p>
        </div>

        {/* Channels List */}
        <div className="flex flex-col gap-3.5 my-6">
          {/* Channel 1: Call */}
          <div className="flex items-center justify-between p-4 rounded-[18px] border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center gap-3.5">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#334155]">
                <Phone className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#1E293B]">
                  Call
                </span>
                <span className="text-[13px] text-[#64748B] mt-0.5">
                  AI-powered follow-up calls
                </span>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={callEnabled}
              onClick={() => setCallEnabled(!callEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                callEnabled ? 'bg-[#7A9601]' : 'bg-[#D1D5DB]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ${
                  callEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Channel 2: WhatsApp */}
          <div className="flex items-center justify-between p-4 rounded-[18px] border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center gap-3.5">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#334155]">
                <MessageSquare className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#1E293B]">
                  WhatsApp
                </span>
                <span className="text-[13px] text-[#64748B] mt-0.5">
                  Automated WhatsApp follow-ups
                </span>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={whatsappEnabled}
              onClick={() => setWhatsappEnabled(!whatsappEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                whatsappEnabled ? 'bg-[#7A9601]' : 'bg-[#D1D5DB]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ${
                  whatsappEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[14.5px] font-medium text-[#475569] hover:text-[#1E293B] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOk}
            className="px-6 py-2 text-[14.5px] font-semibold text-white bg-[#7A9601] hover:bg-[#688001] active:scale-[0.98] rounded-lg shadow-xs transition-all cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiFollowupModal;
