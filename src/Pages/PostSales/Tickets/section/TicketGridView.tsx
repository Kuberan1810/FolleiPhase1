import React from 'react';
import { Clock, User } from 'lucide-react';
import { type Ticket } from './TicketTable';

interface TicketGridViewProps {
  tickets: Ticket[];
  groupByOption: 'Status' | 'Priority' | 'Ticket Type' | 'Product Plan';
  onTicketClick?: (ticket: Ticket) => void;
}

const GROUP_COLUMNS_MAP: Record<TicketGridViewProps['groupByOption'], readonly string[]> = {
  'Status': ['New', 'In Progress', 'Waiting', 'Resolved'],
  'Priority': ['Critical', 'Medium', 'Low'],
  'Ticket Type': [
    'General Support',
    'Account & Access',
    'Billing & Subscription',
    'Product & Usage',
    'Sale & Customer Success',
    'Security & Compliance',
    'Orders & Delivery',
    'Internal IT'
  ],
  'Product Plan': ['Basic', 'Standard', 'Premium', 'Enterprise']
};

const TicketGridView: React.FC<TicketGridViewProps> = ({
  tickets,
  groupByOption,
  onTicketClick
}) => {

  const columns = GROUP_COLUMNS_MAP[groupByOption];

  const getTicketsForColumn = (col: string) => {
    return tickets.filter((t) => {
      switch (groupByOption) {
        case 'Status':
          return t.status === col;
        case 'Priority':
          return t.priority === col;
        case 'Ticket Type':
          return t.category === col;
        case 'Product Plan':
          if (t.priority === 'Critical') {
            return col === 'Enterprise';
          } else if (t.priority === 'Medium') {
            return col === 'Premium';
          } else {
            const isStandard = t.id.charCodeAt(t.id.length - 1) % 2 === 0;
            return isStandard ? col === 'Standard' : col === 'Basic';
          }
        default:
          return false;
      }
    });
  };

  return (
    <div className="flex flex-row gap-6 overflow-x-auto pb-4 select-none scrollbar-thin items-start w-full">
      {columns.map((col) => {
        const colTickets = getTicketsForColumn(col);

        return (
          <div
            key={col}
            className="flex flex-col overflow-hidden min-w-[280px] sm:min-w-[320px] flex-1 shrink-0"
          >
            {/* Top Indicator Accent Bar */}
            <div className="w-full h-[3.5px] bg-[#1D4ED8]" />

            {/* Column Header Block */}
            <div className="flex justify-between items-center px-4 py-3 bg-[#EFEFFF] ">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[16px] text-[#222222]">{col}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFFFFF] text-[#1D4ED8]">
                  {colTickets.length.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Cards List container */}
            <div className="flex flex-col gap-3.5 overflow-y-auto pt-3 scrollbar-thin">
              {colTickets.length > 0 ? (
                colTickets.map((ticket) => {

                  let bottomTextColor = '#02882C';
                  if (ticket.status === 'New') {
                    bottomTextColor = '#4744E5';
                  } else if (ticket.priority === 'Critical') {
                    bottomTextColor = '#B91C1C';
                  }

                  return (
                    <div
                      key={`${ticket.id}-${ticket.status}-${ticket.createdAtTimestamp}`}
                      onClick={() => onTicketClick && onTicketClick(ticket)}
                      className="bg-white border border-[#E2E8F0]/50 rounded-[12px] p-4 cursor-pointer group"
                    >
                      {/* Top ID */}
                      <span className="text-[14px] font-semibold text-[#464652] block mb-2.5">
                        #{ticket.id}
                      </span>

                      {/* Customer Info Row */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-[18px] text-[10px] shrink-0 bg-[#F4F3FF] text-[#07006C]"
                        >
                          {ticket.customerInitials}
                        </div>
                        <span className="font-semibold text-[14px] text-[#131B2E] leading-tight truncate">
                          {ticket.customerName}
                        </span>
                      </div>

                      {/* Subject */}
                      <h4 className="text-[14px] text-[#464555] leading-snug mb-3">
                        {ticket.subject}
                      </h4>

                      <hr className="border-[1px] border-[#C7C5D4] my-2.5" />

                      <div className="flex justify-between items-center">

                        <div>
                          {ticket.status === 'In Progress' && 'Medium' ? (
                            <div className="w-[20px] h-[20px] rounded-full bg-[#EFF4FF] flex items-center justify-center text-[#004370]">
                              <User className="w-3 h-3" />
                            </div>
                          ) : (
                            <div className="w-[20px] h-[20px]" />
                          )}
                        </div>

                        {ticket.status === 'Waiting' ? (
                          <span className="bg-[#EFF4FF] text-[#004370] font-bold px-2 py-0.5 rounded-[5px] text-[10px] tracking-wider">
                            Awaiting info
                          </span>
                        ) : (
                          <div className="flex flex-col items-end gap-0.5">
                            <div className="flex items-center gap-1.5 text-[12px] font-bold" style={{ color: bottomTextColor }}>
                              <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: bottomTextColor }} />
                              <span>12m 40s</span>
                            </div>
                            <span className="text-[11px] font-semibold text-[#94A3B8]">
                              {ticket.created}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-[12px] text-slate-400 italic">
                  No tickets
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketGridView;
