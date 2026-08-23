import React from 'react';
import type { PromptSuggestion } from '../types';

interface PromptSuggestionChipsProps {
  suggestions: PromptSuggestion[];
  onSelectSuggestion: (text: string) => void;
}

export const PromptSuggestionChips: React.FC<PromptSuggestionChipsProps> = ({
  suggestions,
  onSelectSuggestion,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelectSuggestion(item.text)}
          className="rounded-full border border-[#E6E6E4] bg-[#FDFDFC] px-3.5 py-1.5 text-[12.5px] text-gray-500 transition-colors duration-150 hover:border-gray-400 hover:text-[#16171A] hover:bg-gray-50/60 cursor-pointer"
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestionChips;
