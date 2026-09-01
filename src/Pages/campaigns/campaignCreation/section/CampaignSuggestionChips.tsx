import React from 'react';
import { CapsuleButton } from './CapsuleButton';

interface CampaignSuggestionChipsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  disabled?: boolean;
}

export const CampaignSuggestionChips: React.FC<CampaignSuggestionChipsProps> = ({
  suggestions,
  onSelectSuggestion,
  disabled = false,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-slide">
      {suggestions.map((suggestion) => (
        <CapsuleButton
          key={suggestion}
          size="md"
          disabled={disabled}
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </CapsuleButton>
      ))}
    </div>
  );
};

export default CampaignSuggestionChips;
