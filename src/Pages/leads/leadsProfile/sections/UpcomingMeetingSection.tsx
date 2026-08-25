import React from 'react';
import { Calendar, Users } from 'lucide-react';
import type { UpcomingMeetingInfo } from '../../types';

interface UpcomingMeetingSectionProps {
  meeting?: UpcomingMeetingInfo;
}

export const UpcomingMeetingSection: React.FC<UpcomingMeetingSectionProps> = ({
  meeting = {
    title: 'Course Counselling',
    time: 'Tomorrow · 3:00 PM',
    status: 'Confirmed',
  },
}) => {
  return (
    <div className="rounded-[15px] bg-white p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#464555]">
          Upcoming Meeting
        </h3>
        <Calendar className="size-4.5 text-[#7A9601]" />
      </div>

      {/* Meeting Body */}
      <div className="mt-4 flex items-center gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[#7A9601] text-white">
          <Users className="size-5" />
        </div>

        <div className="flex flex-col">
          <h4 className="text-[20px] font-semibold text-[#1B1B24]">
            {meeting.title}
          </h4>
          <span className="text-[14px] text-[#545F73] mt-0.5">
            {meeting.time}
          </span>
        </div>
      </div>

      {/* Status Footer */}
      <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-[#1B1B24]">
        <span className="size-2 rounded-full bg-[#0A7C34]" />
        <span>Status: {meeting.status}</span>
      </div>
    </div>
  );
};

export default UpcomingMeetingSection;
