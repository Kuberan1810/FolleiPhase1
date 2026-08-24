import React, { useRef, useEffect, useState } from 'react';
import { Plus, ArrowUp, FileText, X } from 'lucide-react';
import toast from 'react-hot-toast';

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
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollH, 24), 140)}px`;
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      toast.success(`Attached: ${file.name}`);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((value.trim() || attachedFile) && !disabled) {
      onSubmit(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((value.trim() || attachedFile) && !disabled) {
        onSubmit();
      }
    }
  };

  const hasContent = value.trim().length > 0 || attachedFile !== null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center rounded-[22px] border border-[#D7D7D4] bg-white px-4 py-3 shadow-xs transition-shadow duration-200 focus-within:border-gray-400 focus-within:shadow-md min-h-[70px]"
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json"
        className="hidden"
      />

      {/* Attached File Preview Badge */}
      {attachedFile && (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] px-3 py-0.5 text-[12px] font-medium shadow-2xs mb-2 self-start">
          <FileText className="size-3 text-[#64748B]" />
          <span className="max-w-[180px] truncate">{attachedFile.name}</span>
          <button
            type="button"
            onClick={removeAttachedFile}
            disabled={disabled}
            className="hover:text-red-600 focus:outline-none cursor-pointer text-[#94A3B8]"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* Input Controls Row: Plus -> Textarea -> Submit Arrow */}
      <div className="flex items-center gap-2.5 w-full">
        {/* Plus / Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          title="Upload document"
          aria-label="Upload document"
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] hover:text-[#111827] transition-all cursor-pointer shadow-2xs"
        >
          <Plus className="size-4 stroke-[2.2]" />
        </button>

        {/* Auto-expanding Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-w-0 flex-1 resize-none bg-transparent text-[14px] leading-[22px] text-[#16171A] outline-none placeholder:text-[#717378] py-0.5 max-h-[140px] overflow-y-auto"
        />

        {/* Send Arrow Button */}
        <button
          type="submit"
          aria-label="Send to Follei"
          disabled={!hasContent || disabled}
          className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition-opacity duration-150 hover:bg-black disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export default PromptInput;




