import { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarCheck2, ClipboardList, XCircle, Info } from 'lucide-react';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// Events shown per day: date → dot color
const eventDots: Record<number, string> = {
  17: 'bg-yellow-400',
  18: 'bg-red-500',
};

const upcomingEvents = [
  {
    name: 'Ravi Sharma',
    time: 'APR 15 • 10:30 AM',
    timeColor: 'text-[#004370]',
    Icon: CalendarCheck2,
    iconColor: 'text-[#0EA5E9]',
    iconBg: 'bg-[#E0F2FE]',
  },
  {
    name: 'Priya Mehta',
    time: 'APR 17 • 11:15 AM',
    timeColor: 'text-[#D97706]',
    Icon: ClipboardList,
    iconColor: 'text-[#F59E0B]',
    iconBg: 'bg-[#FEF3C7]',
  },
  {
    name: 'Indhu',
    time: 'APR 18 • 02:00 PM',
    timeColor: 'text-[#DC2626]',
    Icon: XCircle,
    iconColor: 'text-[#EF4444]',
    iconBg: 'bg-[#FEE2E2]',
  },
];

function buildCells(year: number, month: number) {
  // days from prev month to fill gap
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const offset = (firstDay + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: { day: number; curr: boolean }[] = [];
  for (let i = offset - 1; i >= 0; i--)
    cells.push({ day: prevDays - i, curr: false });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, curr: true });
  return cells;
}

const ScheduleSection = () => {
  const [cal, setCal] = useState({ year: 2024, month: 3 }); // April 2024

  const cells = buildCells(cal.year, cal.month);
  const label = new Date(cal.year, cal.month, 1).toLocaleString('default', { month: 'long' });

  const prev = () => setCal(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const next = () => setCal(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  const TODAY = 15;

  return (
    <div className="BoxStyle p-8!">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── LEFT: Calendar ── */}
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between  mb-8">
            <div>
              <h2 className="text-[22px] md:text-2xl font-bold text-[#191C1E] font-manrope">
                {label} {cal.year}
              </h2>
              <p className="text-[11px] font-bold text-[#64748B] uppercase  mt-1">
                Fleet Schedule View
              </p>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <button
                onClick={prev}
                className="w-8 h-8 flex items-center justify-center rounded-full border bg-[#F1F5F9] border-[#E5E7EB] hover:bg-[#e5e9ec] text-[#6B7280] cursor-pointer transition-colors"
              >
                <ChevronLeft size={16} strokeWidth={3} />
              </button>
              <button
                onClick={next}
                className="w-8 h-8 flex items-center justify-center rounded-full border bg-[#F1F5F9] border-[#E5E7EB] hover:bg-[#e5e9ec] text-[#6B7280] cursor-pointer transition-colors"
              >
                <ChevronRight size={16}  strokeWidth={3}/>
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[11px] font-bold text-[#64748B] uppercase  py-2 px-5">
                {d}
              </div>
            ))}

            {/* Day cells */}
            {cells.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div
                  className={` w-full aspect-square flex items-center justify-center rounded-[10px] text-[15px] text-[#0F172A] font-medium cursor-pointer transition-all 
                    ${c.curr && c.day === TODAY
                      ? 'bg-[#1B3A5C] text-white  border-6 border-[#E6EFF5]'
                      : c.curr
                        ? 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E0EAF4] hover:text-[#004370]'
                        : 'bg-transparent text-[#CBD5E1]'
                    }`}
                >
                  {c.day}
                </div>
                {/* Event dot */}
                {c.curr && eventDots[c.day] && (
                  <div className={`w-1.5 h-1.5 rounded-full ${eventDots[c.day]}`} />
                )}
                {c.curr && c.day === TODAY && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                )}
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2.5 border border-[#E5E7EB] rounded-xl p-3.5 bg-white">
            <Info size={15} className="text-[#F59E0B] shrink-0 mt-0.5" />
            <p className="text-[12px] text-[#374151] leading-relaxed">
              Outbound system connectivity is nominal.{' '}
              <span className="text-[#9CA3AF]">(If toggle were OFF, warnings would appear here)</span>
            </p>
          </div>
        </div>

        {/* ── RIGHT: Upcoming ── */}
        <div className="flex flex-col gap-4 lg:border-l lg:border-[#F1F5F9] lg:pl-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-[#191C1E]">Upcoming</h3>
            <button className="text-[11px] font-bold text-[#374151] bg-[#F1F5F9] hover:bg-[#E5E7EB] px-4 py-2 rounded-full cursor-pointer transition-colors tracking-wide">
              + SCHEDULE
            </button>
          </div>

          {/* Events */}
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-[#E5E7EB] bg-white hover:shadow-sm transition-shadow">
                <div>
                  <p className="text-[14px] font-bold text-[#191C1E]">{ev.name}</p>
                  <p className={`text-[12px] font-semibold mt-0.5 ${ev.timeColor}`}>{ev.time}</p>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ev.iconBg} shrink-0`}>
                  <ev.Icon size={18} className={ev.iconColor} />
                </div>
              </div>
            ))}
          </div>

          {/* Sync status */}
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest text-center mt-auto pt-2">
            Calendar Sync: 100% Verified
          </p>
        </div>

      </div>
    </div>
  );
};

export default ScheduleSection;
