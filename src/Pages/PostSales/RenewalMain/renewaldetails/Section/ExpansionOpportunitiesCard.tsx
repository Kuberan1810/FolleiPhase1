
import type { RenewalDetailsData } from '../RenewalDetailsPage';
import { Folder2 } from 'iconsax-react';
import { Bot } from 'lucide-react';

interface Props {
  data: RenewalDetailsData['expansionOpportunities'];
}

export default function ExpansionOpportunitiesCard({ data }: Props) {
  return (
    <div className="bg-white BoxStyle p-6 rounded-xl border border-[#EDF3FD]">
      <h2 className="font-semibold text-xl leading-6 text-[#0D1C2E] m-0 mb-5">
        Expansion Opportunities
      </h2>

      <div className="flex flex-col">
        {data.map((item, idx) => {
          const isLast = idx === data.length - 1;
          
          let iconBg = 'rgba(0,81,213,0.1)';
          let IconElement = <Bot style={{ width: '18px', height: '18px', color: '#004370' }} />;
          
          if (item.iconName === 'harddrive') {
            iconBg = 'rgba(13,148,136,0.1)';
            IconElement = <Folder2 size="18" color="#0D9488" variant="Linear" />;
          }

          return (
            <div key={item.id} className="flex justify-between items-center bg-[#F7F9FB] rounded-xl px-4 py-3.5" style={{ marginBottom: isLast ? '0' : '12px' }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" 
                  style={{ backgroundColor: iconBg }}
                >
                  {IconElement}
                </div>
                <span className="font-semibold text-base text-[#1B1B1D]">
                  {item.label}
                </span>
              </div>
              <span className="font-bold text-base text-[#16A34A]">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
