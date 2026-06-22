import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface LeadsHeaderCardProps {
  icon: LucideIcon;
  iconColorClass: string;
  title: string;
  count: string | number;
  countBgClass: string;
  avatarText: string;
  avatarBgClass: string;
  avatarTextColorClass: string;
  leadName: string;
  email: string;
  badgeText: string;
  badgeBorderClass: string;
  badgeBgClass: string;
  badgeTextColorClass: string;
  description: React.ReactNode;
  onViewLead?: () => void;
  onNextClick?: () => void;
}

export const LeadsHeaderCard: React.FC<LeadsHeaderCardProps> = ({
  icon: Icon,
  iconColorClass,
  title,
  count,
  countBgClass,
  avatarText,
  avatarBgClass,
  avatarTextColorClass,
  leadName,
  email,
  badgeText,
  badgeBorderClass,
  badgeBgClass,
  badgeTextColorClass,
  description,
  onViewLead,
  onNextClick,
}) => {
  return (
    <div className="BoxStyle transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#64748B] font-bold text-[12px] leading-[20px] ">
          <Icon color="currentColor" fill={title === "Needs Attention" ? "currentColor" : "none"} className={`${iconColorClass}`} size={18} />
          <span>{title}</span>
        </div>
        <span className={`w-5 h-5 rounded-full ${countBgClass} text-white font-medium text-[8px] flex items-center justify-center`}>
          {count}
        </span>
      </div>

      <div className="flex items-start gap-3 mt-6">
        <div className={`w-10 h-10 rounded-full ${avatarBgClass} ${avatarTextColorClass} font-bold text-[12px] flex items-center justify-center shrink-0`}>
          {avatarText}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[12px] leading-[22px] text-[#0F172A] truncate">
              {leadName}
            </span>
            <span className={`text-[9px] font-medium px-[6px] py-[2px] rounded-[4px] ${badgeBorderClass ? `border ${badgeBorderClass}` : ''} ${badgeBgClass} ${badgeTextColorClass} leading-none shrink-0 h-[18px] flex items-center justify-center`}>
              {badgeText}
            </span>
          </div>
          <p className="text-[10px] font-normal text-[#94A3B8] truncate mt-0.5">
            {email}
          </p>
        </div>
      </div>

      <p className="text-[11px] font-medium leading-[13.75px] text-[#475569] mt-[10px]">
        {description}
      </p>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={onViewLead}
          className="flex-1 border border-[#E2E8F0] bg-white text-[#004370] font-bold py-1.5 rounded-[8px] text-[11x] leading-[16.5px] hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center h-9"
        >
          View Lead
        </button>
        <button
          onClick={onNextClick}
          className="w-9 h-9 border border-[#E2E8F0] bg-white text-[#94A3B8] rounded-[8px] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LeadsHeaderCard;
