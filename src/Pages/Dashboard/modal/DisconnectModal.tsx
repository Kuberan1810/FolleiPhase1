import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DisconnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDisconnect: () => void;
}

export const DisconnectModal: React.FC<DisconnectModalProps> = ({
  isOpen,
  onClose,
  onConfirmDisconnect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-[420px] bg-white rounded-[24px] p-6 shadow-2xl border border-[#E5E7EB] relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-1 text-[#64748B] hover:text-[#1E293B] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {/* Alert Icon & Header */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626] mb-3.5">
            <AlertTriangle className="size-6 stroke-[2.2]" />
          </div>

          <h3 className="text-[18px] font-bold text-[#1E293B] tracking-tight">
            Disconnect Follei?
          </h3>
          <p className="text-[13.5px] text-[#64748B] mt-2 leading-relaxed px-2">
            Are you sure you want to disconnect AI Follow-up automation? Automated calls and WhatsApp follow-ups will be stopped.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 text-[14px] font-medium text-[#475569] hover:text-[#1E293B] bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirmDisconnect}
            className="flex-1 py-2.5 px-4 text-[14px] font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.98] rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectModal;
