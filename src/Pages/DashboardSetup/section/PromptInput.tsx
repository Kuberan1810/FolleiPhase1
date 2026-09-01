import React, { useRef, useEffect, useState } from 'react';
import { ArrowUp, X, Plus } from 'lucide-react';
import { getFileFormatIcon } from '../../../Component/fileFormatIcons';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent, file?: File | null) => void;
  onUploadFile?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  onUploadFile,
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
      if (onUploadFile) {
        onUploadFile(file);
      }
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
      onSubmit(e, attachedFile);
      setAttachedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((value.trim() || attachedFile) && !disabled) {
        onSubmit(undefined, attachedFile);
        setAttachedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const hasContent = value.trim().length > 0 || attachedFile !== null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center rounded-[24px] border border-[#E6E6E4] bg-white px-4 py-3 min-h-[64px] transition-shadow focus-within:border-gray-400 focus-within:shadow-xs"
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
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] px-3 py-1 text-[12px] font-medium mb-2 self-start animate-fade-slide">
          <div className="flex size-4 shrink-0 items-center justify-center">
            {getFileFormatIcon(attachedFile.name, 'size-3.5 object-contain')}
          </div>
          <span className="max-w-[200px] truncate">{attachedFile.name}</span>
          <button
            type="button"
            onClick={removeAttachedFile}
            disabled={disabled}
            className="hover:text-red-600 focus:outline-none cursor-pointer text-[#94A3B8] ml-0.5"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* Input Controls Row: Plus Upload -> Textarea -> Submit Arrow */}
      <div className="flex items-center gap-2.5 w-full">
        {/* Left Icon: Plus Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          title="Upload document or CSV"
          aria-label="Upload document or CSV"
          className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-[#F4F4F0] text-[#4B5563] hover:bg-[#EBEBE8] hover:text-[#111827] transition-all cursor-pointer shadow-2xs active:scale-95"
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

        {/* Send Arrow Button: Dynamic Black Background when hasContent */}
        <button
          type="submit"
          aria-label="Send to Follei"
          disabled={!hasContent || disabled}
          className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            hasContent && !disabled
              ? 'bg-[#16171A] hover:bg-black text-white cursor-pointer active:scale-95 shadow-xs'
              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          <ArrowUp className="size-4 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
