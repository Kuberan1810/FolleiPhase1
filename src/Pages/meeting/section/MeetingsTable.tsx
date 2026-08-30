import React from 'react';
import { Calendar } from 'lucide-react';
import { type Meeting } from '../types';
import { MeetingRow } from './MeetingRow';

interface MeetingsTableProps {
  meetings?: Meeting[];
}

export const MeetingsTable: React.FC<MeetingsTableProps> = ({
  meetings = [],
}) => {
  if (meetings.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center rounded-[16px] border border-[#E5E7EB] bg-white p-12 text-center shadow-xs">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#F1F3F5] text-[#717378] mb-3.5">
          <Calendar className="size-6 text-[#717378]" />
        </div>
        <h3 className="text-[15px] font-semibold text-[#16171A]">No meetings booked yet</h3>
        <p className="text-[13.5px] text-[#717378] max-w-sm mt-1">
          When Follei qualifies leads and books demo meetings, they will automatically appear here in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F0EC] bg-transparent">
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Date & Time
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Lead
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <MeetingRow key={meeting.id} meeting={meeting} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingsTable;
