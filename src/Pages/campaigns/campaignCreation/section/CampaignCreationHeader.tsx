import React from 'react';

interface CampaignCreationHeaderProps {
  title?: string;
  subtitle?: string;
}

export const CampaignCreationHeader: React.FC<CampaignCreationHeaderProps> = ({
  title = 'Create a campaign',
  subtitle = 'Reach the right leads with a simple campaign.',
}) => {
  return (
    <div className="flex flex-col items-center text-center gap-1.5 animate-fade-slide">
      <h1 className="text-[26px] sm:text-[28px] font-semibold tracking-tight text-[#16171A]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[14.5px] text-[#717378] font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default CampaignCreationHeader;
