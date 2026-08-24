import React from 'react';
import { ArrowDown, Users } from 'lucide-react';
import { type Lead } from '../types';
import { LeadRow } from './LeadRow';

interface LeadsTableProps {
  leads: Lead[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const startRange = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="mt-5 overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]/50">
              {/* # */}
              <th
                scope="col"
                className="w-16 px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                #
              </th>

              {/* Lead */}
              <th
                scope="col"
                className="w-16 px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Lead
              </th>

              {/* Date */}
              <th
                scope="col"
                className="w-16 px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                <div className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-[#111827]">
                  <span>Date</span>
                  <ArrowDown className="size-3 text-[#6B7280]" />
                </div>
              </th>

              {/* Status */}
              <th
                scope="col"
                className="w-16 px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <Users className="size-5" />
                    </div>
                    <p className="text-[14px] font-medium text-[#111827]">
                      No leads found
                    </p>
                    <p className="text-[12.5px] text-[#6B7280]">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="flex items-center justify-end gap-6 border-t border-[#E5E7EB] bg-[#F8F9FA]/50 px-6 py-3.5">
        <span className="text-[13px] text-[#6B7280]">
          {startRange}–{endRange} of {totalCount}
        </span>

        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`text-[13px] font-medium transition-colors ${currentPage <= 1
            ? 'text-[#9CA3AF] cursor-default'
            : 'text-[#111827] hover:underline cursor-pointer'
            }`}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`text-[13px] font-medium transition-colors ${currentPage >= totalPages
            ? 'text-[#9CA3AF] cursor-default'
            : 'text-[#111827] hover:underline cursor-pointer'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default LeadsTable;
