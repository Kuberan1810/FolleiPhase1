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
  leads = [],
  totalCount,
  startRange,
  endRange,
}) => {
  const actualTotal = totalCount ?? leads.length;
  const actualStart = startRange ?? (leads.length > 0 ? 1 : 0);
  const actualEnd = endRange ?? leads.length;
  return (
    <div className="mt-5 flex-1 flex flex-col min-h-0 overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-2xs">
      {/* Scrollable Table Area: Only inner rows list scrolls */}
      <div className="flex-1 overflow-x-auto overflow-y-auto min-h-0">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-[#F8F9FA]">
            <tr className="border-b border-[#E5E7EB]">
              <th
                scope="col"
                className="w-16 px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold bg-[#F8F9FA]"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold bg-[#F8F9FA]"
              >
                Lead
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold bg-[#F8F9FA]"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280] font-semibold bg-[#F8F9FA]"
              >
                Intent
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F0F0EC]">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <AttentionRow key={lead.id} lead={lead} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-[13.5px] text-[#6B7280]">
                  No leads found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer: Locked at bottom */}
      <div className="shrink-0 flex items-center justify-end gap-6 border-t border-[#E5E7EB] bg-[#F8F9FA]/60 px-6 py-3.5">
        <span className="text-[13px] text-[#6B7280]">
          {actualStart}–{actualEnd} of {actualTotal}
        </span>

        <button
          type="button"
          className="text-[13px] font-medium text-[#9CA3AF] cursor-default"
        >
          Previous
        </button>
        <button
          type="button"
          className="text-[13px] font-medium text-[#111827] hover:underline cursor-pointer transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttentionTable;
