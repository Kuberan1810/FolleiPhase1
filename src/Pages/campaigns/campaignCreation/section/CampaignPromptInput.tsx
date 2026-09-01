import React, { useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

interface CampaignPromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  placeholder?: string;
  isSubmitting?: boolean;
}

export const CampaignPromptInput: React.FC<CampaignPromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Tell Follei what you want to campaign...',
  isSubmitting = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollH, 24), 140)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const hasContent = value.trim().length > 0;

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex items-center gap-3 rounded-[24px] border border-[#E6E6E4] bg-white px-5 py-3 min-h-[58px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-gray-300 focus-within:border-[#7A9601] focus-within:shadow-xs transition-all animate-fade-slide"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isSubmitting}
        className="min-w-0 flex-1 resize-none bg-transparent text-[14.5px] leading-[22px] text-[#16171A] outline-none placeholder:text-[#717378] py-0.5 max-h-[140px] overflow-y-auto"
      />

      {/* #7A9601 Lime Green Circular Submit Button */}
      <button
        type="submit"
        aria-label="Send prompt"
        disabled={!hasContent || isSubmitting}
        className={`flex size-8.5 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
          hasContent && !isSubmitting
            ? 'bg-[#7A9601] hover:bg-[#688001] text-white cursor-pointer active:scale-95 shadow-xs'
            : 'bg-[#7A9601]/60 text-white/80 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin text-white" />
        ) : (
          <ArrowUp className="size-4 stroke-[2.5]" aria-hidden="true" />
        )}
      </button>
    </form>
  );
};

export default CampaignPromptInput;
