import React from 'react';
import { Upload, Users } from 'lucide-react';
import PromptInput from './PromptInput';
import PromptSuggestionChips from './PromptSuggestionChips';
import type { PromptSuggestion } from '../types';

interface DashboardPromptSectionProps {
  title?: string;
  placeholder?: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent, file?: File | null) => void;
  onUploadFile?: (file: File) => void;
  suggestions: PromptSuggestion[];
  onSelectSuggestion: (suggestionText: string) => void;
  isSubmitting?: boolean;
  isWorkspaceReady?: boolean;
}

export const DashboardPromptSection: React.FC<DashboardPromptSectionProps> = ({
  title = 'What are you working on?',
  placeholder = 'Tell Follei about your business...',
  inputValue,
  onInputChange,
  onSubmit,
  onUploadFile,
  suggestions,
  onSelectSuggestion,
  isSubmitting = false,
  isWorkspaceReady = false,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[18px] font-medium tracking-tight text-[#16171A]">
        {isWorkspaceReady ? 'Ask Follei anything...' : title}
      </h2>
      <PromptInput
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
        onUploadFile={onUploadFile}
        placeholder={placeholder}
        disabled={isSubmitting}
      />
      <PromptSuggestionChips
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
      />

      {/* Action Buttons when Workspace is Ready */}
      {isWorkspaceReady && (
        <div className="flex items-center gap-3 pt-1 animate-fade-slide">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-[#E6E6E4] bg-white px-3.5 py-2 text-[13px] font-medium text-[#16171A] hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Upload className="size-3.5 text-[#717378]" />
            <span>Upload Data</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-[#E6E6E4] bg-white px-3.5 py-2 text-[13px] font-medium text-[#16171A] hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Users className="size-3.5 text-[#717378]" />
            <span>Add Leads</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default DashboardPromptSection;
