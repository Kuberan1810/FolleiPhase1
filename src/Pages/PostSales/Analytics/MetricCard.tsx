import React from 'react';

export interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  period: string;
  iconBg: string;
  iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  trend,
  trendType,
  period,
  iconBg,
  iconColor
}) => {
  return (
    <div className="BoxStyle p-6 flex flex-col justify-between min-h-[160px] bg-white border border-[#EDF3FD] rounded-[20px]">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: '28px',
            height: '28px',
            padding: '6px',
            backgroundColor: iconBg
          }}
        >
          <Icon size={16} className={iconColor} />
        </div>
        <span
          className="text-[#64748B] tracking-tight"
          style={{
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '16.5px',
            color: '#64748B'
          }}
        >
          {title}
        </span>
      </div>
      <div>
        <h3 className="text-[28px] font-semibold text-[#1E293B] leading-none mb-2">
          {value}
        </h3>
        <p className="text-[16px] font-medium flex items-center gap-1 text-[#64748B]">
          <span className="inline-flex items-center text-[13px] leading-[15px] font-bold text-[#22C55E]">
            {trendType === 'up' ? '▲' : '▼'} {trend}
          </span>
          <span className="text-[#94A3B8]">{period}</span>
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
