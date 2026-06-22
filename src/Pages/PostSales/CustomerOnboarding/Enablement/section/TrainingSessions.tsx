import React from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';

const trainingSessionsData = [
  { dateMonth: 'Jun', dateDay: '10', title: 'Product Walkthrough', subtitle: 'Instructor Led • 1 hour', status: 'Attended' },
  { dateMonth: 'Jun', dateDay: '12', title: 'Admin Training', subtitle: 'Certification Level • 2 hours', status: 'Attended' },
  { dateMonth: 'Jun', dateDay: '15', title: 'Sales Training', subtitle: 'Scheduled • 1:30 PM EST', status: 'Link' },
  { dateMonth: 'TBD', dateDay: '--', title: 'Advanced Features', subtitle: 'Pending Session', status: 'Not Attended' }
];

const TrainingSessions: React.FC = () => {
  return (
    <div className="BoxStyle p-6 flex flex-col gap-4 bg-white border border-[#EDF3FD] shadow-[0_4px_20px_rgba(237,243,253,0.3)]">
      <h3 className="text-[20px] font-bold text-[#191C1E]">
        Training Sessions
      </h3>

      <div className="flex flex-col gap-4 mt-2">
        {trainingSessionsData.map((session, idx) => {
          const isAttended = session.status === 'Attended';
          const isLink = session.status === 'Link';
          const isNotAttended = session.status === 'Not Attended';

          return (
            <div
              key={idx}
              className={`flex items-center justify-between p-3 rounded-[12px] border transition-all ${isLink
                ? 'border-dashed border-[#004370] bg-white'
                : isNotAttended
                  ? 'border-[#C3C6D7]/30 bg-white '
                  : 'border-[#F2F4F6] bg-[#F2F4F6]'
                }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-[48px] h-[48px] rounded-[4px] flex flex-col items-center justify-center shrink-0 ${isLink
                  ? 'bg-[#004370] border border-[#C3C6D7]'
                  : 'bg-[#FFFFFF] border border-[#C3C6D7]'
                  }`}>
                  <span className={`text-[8px] font-bold uppercase leading-none mb-0.5 ${isLink ? 'text-white' : 'text-[#565E74]'
                    }`}>
                    {session.dateMonth}
                  </span>
                  <span className={`text-[16px] font-bold leading-none ${isLink ? 'text-white' : 'text-[#191C1E]'
                    }`}>
                    {session.dateDay}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-[#191C1E] leading-tight">
                    {session.title}
                  </span>
                  <span className="text-[12px] font-medium text-[#565E74] mt-1 leading-none">
                    {session.subtitle}
                  </span>
                </div>
              </div>

              <div>
                {isAttended && (
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#16A34A] uppercase">
                    <CheckCircle2 className="w-4 h-4 fill-[#16A34A] text-white" />
                    <span>Attended</span>
                  </span>
                )}
                {isLink && (
                  <a
                    href="#link"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1 text-[#004370] text-[12px] font-bold hover:underline"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {isNotAttended && (
                  <span className="text-[12px] font-bold text-[#737686] ">
                    Not Attended
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingSessions;
