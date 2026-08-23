import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Tell Follei about your business...',
  disabled = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start gap-3 rounded-[22px] border border-[#D7D7D4] bg-white px-4 py-3.5 shadow-xs transition-shadow duration-200 focus-within:border-gray-400 focus-within:shadow-md"
    >
      <Sparkles
        className="mt-1.5 size-4 shrink-0 text-[#0D9488]"
        aria-hidden="true"
      />
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-w-0 flex-1 resize-none bg-transparent text-[14px] leading-relaxed text-[#16171A] outline-none placeholder:text-[#717378]"
      />
      <button
        type="submit"
        aria-label="Send to Follei"
        disabled={!value.trim() || disabled}
        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition-opacity duration-150 hover:bg-black disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowUp className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
};

export default PromptInput;
