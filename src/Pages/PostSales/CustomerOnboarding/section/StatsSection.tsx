import React from 'react';
import { TrendingUp, MessageSquare } from 'lucide-react';
import { DocumentDownload, Note, Profile2User } from 'iconsax-react';

interface StatCardProps {
  title: string;
  value: string;
  subtext?: string;
  subtextColor?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  badge?: {
    text: string;
    bgColor: string;
    textColor: string;
    dotColor?: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  subtextColor = 'text-[#94A3B8]',
  icon,
  iconBg,
  iconColor,
  badge
}) => {
  return (
    <div
      className="BoxStyle flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div
          className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        {badge && (
          <span
            className="px-2 py-0.5 rounded-[12px] text-[11px] font-bold flex items-center gap-1"
            style={{ backgroundColor: badge.bgColor, color: badge.textColor }}
          >
            {badge.dotColor && (
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: badge.dotColor }}
              />
            )}
            {badge.text}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-col justify-end ">
        <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase leading-none">
          {title}
        </span>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-[32px] font-bold text-[#001E40] leading-none">
            {value}
          </span>
          {subtext && (
            <span className={`text-[12px] font-medium leading-none ${subtextColor}`}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats: StatCardProps[] = [
    {
      title: 'Total Active Customer',
      value: '1250',
      subtext: '+1 this month',
      subtextColor: 'text-[#006A61]',
      icon: <Profile2User size="20" color="#003366" variant="Linear" />,
      iconBg: '#E6EDF1',
      iconColor: '#003366',
      badge: {
        text: 'OVERALL',
        bgColor: null,
        textColor: '#94A3B8'
      }
    },
    {
      title: 'Onboarding Started',
      value: '523',
      icon: <DocumentDownload size="20" color="#004370" variant="Linear" />,
      iconBg: '#E5EEFF',
      iconColor: '#004370',
      badge: {
        text: 'Live',
        bgColor: '#E6F1F1',
        textColor: '#006A6A',
        dotColor: '#006A6A'
      }
    },
    {
      title: 'Avg Adoption',
      value: '68%',
      subtext: '40% of total',
      subtextColor: 'text-[#64748B]',
      icon: <TrendingUp size={20} color="#047857" />,
      iconBg: '#ECFDF5',
      iconColor: '#047857',
      badge: {
        text: 'Live',
        bgColor: '#E6F1F1',
        textColor: '#006A6A',
        dotColor: '#006A6A'
      }
    },
    {
      title: 'Need Training',
      value: '42',
      icon: <MessageSquare size={20} color="#003366" />,
      iconBg: '#E6EDF1',
      iconColor: '#003366'
    },
    {
      title: 'Onboarding Completed',
      value: '65',
      icon: <Note size="20" color="#004370" variant="Linear" />,
      iconBg: '#E6EDF1',
      iconColor: '#004370',
      badge: {
        text: 'Good',
        bgColor: '#E6F1F1',
        textColor: '#006A6A',
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsSection;
