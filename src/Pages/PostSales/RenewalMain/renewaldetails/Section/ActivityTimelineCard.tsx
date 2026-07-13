
import type { RenewalDetailsData } from '../RenewalDetailsPage';
import { DocumentText } from 'iconsax-react';

interface Props {
  data: RenewalDetailsData['activityTimeline'];
}

export default function ActivityTimelineCard({ data }: Props) {
  return (
    <div className="bg-white h-full flex flex-col BoxStyle border border-[#EDF3FD] rounded-xl p-4 sm:p-6">
      <h2 className="font-semibold text-xl leading-6 text-[#0D1C2E] m-0">
        Activity Timeline
      </h2>
      <div className="border-b border-[#EDF3FD] mt-3 mb-6 -mx-4 sm:-mx-6" />

      <div className="flex flex-col flex-1 justify-between">
        {data.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === data.length - 1;

          return (
            <div key={item.id} className="flex relative flex-1">
              {/* Timeline graphic */}
              <div className="flex flex-col items-center mr-4 sm:mr-5">
                <div
                  className={`w-3 h-3 rounded-full z-10 mt-1.5 shrink-0 ${isFirst ? 'shadow-[0px_0px_0px_4px_#DBE1FF]' : 'shadow-[0px_0px_0px_4px_#F3F4F6]'}`}
                  style={{ backgroundColor: isFirst ? '#0051D5' : '#000000' }}
                />
                {!isLast && (
                  <div className="w-[2px] flex-1 bg-[#EAE7E9] mt-1 -mb-1.5" />
                )}
              </div>

              {/* Content */}
              <div className="pb-8 flex-1 min-w-0">
                <span className="font-medium text-[13px] text-[#6B7280] block mb-1.5">
                  {item.timestamp}
                </span>
                <span className="font-bold text-[17px] sm:text-xl leading-6 text-[#0D1C2E] block mb-2">
                  {item.title}
                </span>
                <span className="font-normal text-[14px] sm:text-base leading-relaxed text-[#6B7280] block">
                  {item.description}
                </span>

                {item.file && (
                  <div className="mt-4 flex items-center justify-between gap-2 bg-[#F7F9FB] rounded-lg px-3 sm:px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <DocumentText size="18" color="#0051D5" variant="Linear" className="shrink-0" />
                      <span className="font-medium text-sm text-[#1B1B1D] truncate">
                        {item.file.name}
                      </span>
                    </div>
                    <a
                      href={item.file.url}
                      className="flex items-center gap-1 no-underline text-[#004370] font-semibold text-sm hover:underline shrink-0"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
