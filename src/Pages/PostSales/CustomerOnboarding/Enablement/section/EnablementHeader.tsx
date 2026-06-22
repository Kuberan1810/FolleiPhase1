import React from 'react';
import { Building, Calendar1 } from 'iconsax-react';

interface EnablementHeaderProps {
  customer: {
    id: string;
    name: string;
    product: string;
    plan: string;
    avatarBg: string;
    avatarText: string;
    activationDate?: string;
    status?: 'ON TRACK' | 'AT RISK' | 'BEHIND';
    adoptionScore?: number;
    stage?: string;
  };
}

const getStatusBadge = (status?: 'ON TRACK' | 'AT RISK' | 'BEHIND') => {
  const currentStatus = status || 'ON TRACK';
  switch (currentStatus) {
    case 'ON TRACK':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
          ON TRACK
        </span>
      );
    case 'AT RISK':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] bg-[#FFFBEB] text-[#D97706] text-[11px] font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          AT RISK
        </span>
      );
    case 'BEHIND':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] bg-[#FEF2F2] text-[#EF4444] text-[11px] font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
          BEHIND
        </span>
      );
    default:
      return null;
  }
};

const EnablementHeader: React.FC<EnablementHeaderProps> = ({ customer }) => {
  const activationDate = customer.activationDate || 'Oct 12, 2023';
  const onboardingScore = customer.adoptionScore ?? 72;
  const onboardingScoreTrend = onboardingScore >= 70 ? '↑5%' : onboardingScore >= 40 ? '↑12%' : '↓3%';
  const isUp = onboardingScoreTrend.startsWith('↑');
  const isDown = onboardingScoreTrend.startsWith('↓');
  const trendColor = isUp ? 'text-[#10B981]' : isDown ? 'text-[#EF4444]' : 'text-slate-400';
  const currentPhase = customer.stage || 'Product Usage';

  return (
    <div className="BoxStyle flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-center gap-4">
        <div
          className="w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-[18px] shrink-0"
          style={{ backgroundColor: customer.avatarBg, color: customer.avatarText }}
        >
          {customer.name ? customer.name.split(' ').map(n => n[0]).join('') : 'SM'}
        </div>
        <div className="flex flex-col">
          <h2 className="text-[24px] font-semibold text-[#191C1E] leading-tight">
            {customer.name}
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] text-[#565E74] mt-2">
            <span className="flex items-center gap-1.5">
              <Building size="16" color="#565E74" variant="Linear" />
              {customer.product} • {customer.plan}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar1 size="16" color="#565E74" variant="Linear" />
              {activationDate}
            </span>
            {getStatusBadge(customer.status)}
          </div>
        </div>
      </div>

      {/* Right Metrics Section */}
      <div className="grid grid-cols-2 md:flex items-center gap-4 md:gap-8 w-full md:w-auto border-t md:border-t-0 border-[#EDF3FD] pt-4 md:pt-0">
        <div className="hidden md:block w-[1px] h-[48px] bg-[#EDF3FD]" />

        {/* Onboarding Score */}
        <div className="flex flex-col">
          <span className="text-[12px] font-semibold text-[#8C90A6] uppercase tracking-[0.5px] leading-none">
            ONBOARDING SCORE
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-[30px] font-bold text-[#004AC6] leading-none">
              {onboardingScore}%
            </span>
            <span className={`text-[14px]  ${trendColor} leading-none flex items-center gap-0.5`}>
              {onboardingScoreTrend}
            </span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="hidden md:block w-[1px] h-[48px] bg-[#EDF3FD]" />

        {/* Current Phase */}
        <div className="flex flex-col">
          <span className="text-[12px] font-semibold text-[#8C90A6] uppercase tracking-[0.5px] leading-none">
            CURRENT PHASE
          </span>
          <span className="text-[20px] font-semibold text-[#191C1E] leading-none mt-2">
            {currentPhase}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnablementHeader;
