import { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarCheck, ClipboardClock, XCircle, Info, Plus } from 'lucide-react';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const upcomingEvents = [
  {
    name: 'Ravi Sharma',
    time: 'APR 15 • 10:30 AM',
    timeColor: 'text-[#005B96]',
    dotColor: 'bg-[#005B96]',
    Icon: CalendarCheck,
    iconColor: 'text-[#005B96]',
    iconBg: 'bg-[#E0F2FE]',
  },
  {
    name: 'Priya Mehta',
    time: 'APR 17 • 11:15 AM',
    timeColor: 'text-[#D97706]',
    dotColor: 'bg-[#D97706]',
    Icon: ClipboardClock,
    iconColor: 'text-[#D97706]',
    iconBg: 'bg-[#FEF3C7]',
  },
  {
    name: 'Indhu',
    time: 'APR 18 • 02:00 PM',
    timeColor: 'text-[#DC2626]',
    dotColor: 'bg-[#DC2626]',
    Icon: XCircle,
    iconColor: 'text-[#DC2626]',
    iconBg: 'bg-[#FEE2E2]',
  },
];

// Dynamically build eventDots from upcomingEvents — day number → dot bg color
const eventDots: Record<number, string> = Object.fromEntries(
  upcomingEvents
    .map(ev => {
      const match = ev.time.match(/\w+ (\d+)/); // e.g. "APR 15"
      const day = match ? parseInt(match[1]) : null;
      return day ? [day, ev.dotColor] : null;
    })
    .filter(Boolean) as [number, string][]
);



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
    <div className="">
      <div className="flex w-full flex-col lg:flex-row gap-6 lg:gap-0 "> 

        {/* ── LEFT: Calendar ── */}
        <div className="flex flex-col gap-8 BoxStyle border-r-0! md:p-8!    lg:rounded-r-none! flex-3"> 
          {/* Header */}
          <div className="flex items-start justify-between  ">
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
              <div key={d} className="text-center text-[11px] font-bold text-[#64748B] uppercase  py-2 px-5 ">
                {d}
              </div>
            ))}

            {/* Day cells */}
            {cells.map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                {c.curr && c.day === TODAY ? (
                  // TODAY: outer light-blue ring → inner navy cell
                  <div className="w-full aspect-square bg-[#E6EFF5] rounded-2xl p-1 md:p-[6px] cursor-pointer " >
                    <div className="w-full h-full bg-[#005B96] rounded-xl flex flex-col items-center justify-center text-white text-[15px] font-bold gap-2 ">
                      <span>{c.day}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white " />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full aspect-square flex flex-col items-center justify-center rounded-[10px] text-[15px] font-medium cursor-pointer transition-all
                      ${c.curr
                        ? 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E0EAF4] hover:text-[#004370]'
                        : 'bg-transparent text-[#CBD5E1]'
                      }`}
                  >
                    <span>{c.day}</span>
                    {c.curr && eventDots[c.day] && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-2.5 ${eventDots[c.day]}`} />
                    )}
                  </div>
                )}
              </div>
            ))}


          </div>

          {/* Warning */}
          <div className="flex items-center gap-2.5  rounded-x! bg-[#F8FAFC]! BoxStyle ">
            <Info size={20} className="text-[#F59E0B] shrink-0 " />
            <p className="text-[12px] text-[#64748B] leading-relaxed">
              Outbound system connectivity is nominal.{' '}
              <span className="text-[#94A3B8]">(If toggle were OFF, warnings would appear here)</span>
            </p>
          </div>
        </div>

        {/* ── RIGHT: Upcoming ── */}
        <div className="flex flex-col gap-4 md:gap-8 lg:border-l lg:border-[#F1F5F9] lg:pl-8 BoxStyle p-8! rounded-[12px]! rounded-l-none! flex-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] md:text-xl font-bold text-[#0F172A] font-manrope">Upcoming</h3>
            <button className="text-[12px] font-bold text-[#005B96] bg-[#005B96]/10 hover:bg-[#E0EAF4] px-4 py-2 rounded-full  transition-colors tracking-wide flex items-center gap-2 cursor-pointer hover:shadow-xs">
            <Plus size={14} strokeWidth={   2.5} /> SCHEDULE
            </button>
          </div>

          {/* Events */}
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="flex items-center justify-between gap-3 BoxStyle cursor-pointer transition-all hover:shadow-xs hover:shadow-[#E2E8F0] border-[#005B9620]! ">
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A]">{ev.name}</p>
                  <p className={`text-[12px] font-semibold mt-0.5 mb-3 ${ev.timeColor}`}>{ev.time}</p>
                </div>
                {/* <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ev.iconBg} shrink-0`}> */}
                  <ev.Icon size={20} className={ev.iconColor} />
                {/* </div> */}
              </div>
            ))}
          </div>

          {/* Sync status */}
          <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-widest text-center mt-auto pt-2">
            Calendar Sync: 100% Verified
          </p>
        </div>

      </div>
    </div>
  );
};

export default ScheduleSection;
