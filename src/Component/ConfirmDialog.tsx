import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete item?',
  itemName,
  description = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Subtle Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Minimalist ChatGPT-style White Modal Card */}
      <div className="relative w-full max-w-[420px] rounded-[24px] border border-[#E6E6E4] bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.12)] animate-fade-slide z-10 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-[17px] font-semibold text-[#16171A] tracking-tight">
          {title}
        </h3>

        {/* Description Body */}
        <div className="flex flex-col gap-1.5">
          {itemName ? (
            <p className="text-[14px] text-[#16171A] leading-normal font-normal">
              This will delete <strong className="font-semibold text-[#16171A]">{itemName}</strong>.
            </p>
          ) : null}
          {description ? (
            <p className="text-[13px] text-[#717378] leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        {/* Action Buttons Row */}
        <div className="mt-4 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full border border-[#E6E6E4] bg-[#F7F7F5] hover:bg-[#EBEBE8] px-5 py-2.5 text-[13.5px] font-semibold text-[#16171A] transition-colors cursor-pointer disabled:opacity-50 active:scale-98"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors cursor-pointer disabled:opacity-50 shadow-xs active:scale-98 ${
              isDanger
                ? 'bg-[#EF4444] hover:bg-[#DC2626] active:bg-[#B91C1C]'
                : 'bg-[#16171A] hover:bg-black'
            }`}
          >
            {isLoading && <Loader2 className="size-3.5 animate-spin text-white" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
