import React from 'react';
import { type Meeting } from '../types';
import { MeetingRow } from './MeetingRow';
import { initialMockMeetings } from '../data/mockMeetings';

interface MeetingsTableProps {
  meetings?: Meeting[];
}

export const MeetingsTable: React.FC<MeetingsTableProps> = ({
  meetings = initialMockMeetings,
}) => {
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
