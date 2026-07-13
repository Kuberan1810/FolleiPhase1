
import type { RenewalStat } from '../RenewalDash';

interface RenewalHeaderCardsProps {
  stats: RenewalStat[];
}

export default function RenewalHeaderCards({ stats }: RenewalHeaderCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {stats.map((stat) => {
        let subBg = '';
        let subText = '';
        if (stat.subType === 'success') {
          subBg = 'bg-[#006A6A0D]';
          subText = 'text-[#006A6A]';
        } else if (stat.subType === 'urgent') {
          subBg = 'bg-[#EBF0FF]';
          subText = 'text-[#316BF3]';
        } else if (stat.subType === 'risk') {
          subBg = 'bg-[#FEE2E2]';
          subText = 'text-[#DC2626]';
        }

        return (
          <div
            key={stat.id}
            className="BoxStyle w-full sm:min-w-[180px] h-[155px] flex flex-col justify-between"
          >
            <div className="font-semibold text-xs leading-4 tracking-[1.2px] uppercase text-[#64748B]">
              {stat.label}
            </div>

            <div className="font-extrabold text-[36px] leading-10 text-[#0D1C2E]">
              {stat.value}
            </div>

            <div className={`font-bold text-xs leading-4 rounded-md px-2 py-0.5 w-fit ${subBg} ${subText}`}>
              {stat.subLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
}
