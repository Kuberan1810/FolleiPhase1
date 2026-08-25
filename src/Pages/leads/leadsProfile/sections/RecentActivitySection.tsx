import React from 'react';
import { History } from 'lucide-react';
import type { LeadActivity } from '../../types';

interface RecentActivitySectionProps {
  activities?: LeadActivity[];
}

export const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({
  activities = [
    {
      id: '1',
      title: 'WhatsApp received',
      description: 'Is the weekend batch still available?',
      time: '3 hrs ago',
    },
    {
      id: '2',
      title: 'File shared',
      description: 'Weekend Batch Brochure.pdf · 2.4 MB',
      time: '3 hrs ago',
    },
    {
      id: '3',
      title: 'WhatsApp sent',
      description: 'Here are the weekend batch details',
      time: '3 hrs ago',
    },
    {
      id: '4',
      title: 'AI insight updated',
      description: 'High interest detected · Weekend Batch',
      time: '5 hrs ago',
    },
    {
      id: '5',
      title: 'WhatsApp sent',
      description: 'Course fee and batch details shared',
      time: 'Yesterday',
    },
  ],
}) => {
  return (
    <div className="rounded-[15px] bg-white p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#464555]">
          Recent Activity
        </h3>
        <History className="size-4 text-[#6B7280]" />
      </div>

      {/* Vertical Timeline */}
      <div className="relative mt-6">
        {activities.map((item, index) => {
          const isLast = index === activities.length - 1;
          return (
            <div key={item.id} className="relative flex gap-4 pb-6 last:pb-1 group">
              {/* Connecting line */}
              {!isLast && (
                <div
                  className="absolute left-[7px] top-[14px] bottom-0 w-[1.5px] bg-[#F3F4F6]"
                  aria-hidden="true"
                />
              )}

              {/* Circle indicator */}
              <div className="relative z-10 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] mt-1 group-hover:bg-[#6B8323] transition-colors" />

              {/* Activity Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[14px] font-semibold text-[#111827]">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-[#6B7280] shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-[13px] text-[#6B7280] mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivitySection;
