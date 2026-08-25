import React from 'react';
import type { AttentionLead } from '../types';
import { AttentionRow } from './AttentionRow';
import { initialMockAttentionLeads } from '../data/mockAttentionLeads';

interface AttentionTableProps {
  leads?: AttentionLead[];
  totalCount?: number;
  startRange?: number;
  endRange?: number;
}

export const AttentionTable: React.FC<AttentionTableProps> = ({
  leads = initialMockAttentionLeads,
  totalCount = 1248,
  startRange = 1,
  endRange = 5,
}) => {
  return (
    <div className="mt-5 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F0EC] bg-transparent">
              <th
                scope="col"
                className="w-16 px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold"
              >
                Lead
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold"
              >
                Intent
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <AttentionRow key={lead.id} lead={lead} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-end gap-6 border-t border-[#F0F0EC] bg-white px-6 py-4">
        <span className="text-[13px] text-[#6B7280]">
          {startRange}-{endRange} of {totalCount}
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-[13px] font-normal text-[#6B7280] hover:text-[#111827] cursor-pointer transition-colors"
          >
            Previous
          </button>
          <button
            type="button"
            className="text-[13px] font-semibold text-[#111827] hover:underline cursor-pointer transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttentionTable;
