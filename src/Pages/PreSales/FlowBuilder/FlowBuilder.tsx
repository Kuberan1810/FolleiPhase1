import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, RotateCcw, TimerReset, MessageSquareDot, Bot, Waves, PhoneOutgoing, MonitorDot, Play, FileCog, BellRing, CalendarDays, UserCheck, Activity, Mail, SquareDashed, RefreshCcwDot, CalendarRange, Users } from 'lucide-react';

import EditActionDrawer from './components/Drawers/EditAction/EditActionDrawer';
import NewLeadDrawer from './components/Drawers/NewLead/NewLeadDrawer';
import NoResponseDrawer from './components/Drawers/NoResponse/NoResponseDrawer';
import NotifySalesDrawer from './components/Drawers/NotifySales/NotifySalesDrawer';
import ReplyReceivedDrawer from './components/Drawers/ReplyReceived/ReplyReceivedDrawer';
import SendMessageDrawer from './components/Drawers/SendMessage/SendMessageDrawer';
import UpdateStatusDrawer from './components/Drawers/UpdateStatus/UpdateStatusDrawer';
import BtnCom from '../../../Component/BtnCom';

const nodeStyles: Record<string, { border: string, shadow: string }> = {
  "New Lead": { border: 'none', shadow: 'none' },
  "Activity Review": { border: 'none', shadow: 'none' },
  "Send Message": { border: '1px solid #06B6D4', shadow: 'none' },
  "WhatsApp Connect": { border: '1px solid #06B6D4', shadow: 'none' },
  "Quick Call": { border: '1px solid #06B6D4', shadow: 'none' },
  "Weekly Connect": { border: '1px solid #06B6D4', shadow: 'none' },
  "Email Campaign": { border: '1px solid #06B6D4', shadow: 'none' },
  "Reminder Trigger": { border: '1px solid #06B6D4', shadow: 'none' },
  "AI Insights": { border: '1px solid #8B5CF6', shadow: 'none' },
  "AI Lead Score": { border: '1px solid #8B5CF6', shadow: 'none' },
  "Lead Conversion": { border: '1px solid #8B5CF6', shadow: 'none' },
  "AI Analysis": { border: '1px solid #8B5CF6', shadow: 'none' },
  "Hot": { border: '1px solid #AA382E', shadow: 'none' },
  "Warm": { border: '1px solid #F59E0B', shadow: 'none' },
  "Cold": { border: '1px solid #64748B', shadow: 'none' },
  "Follow-up Call": { border: '1px solid #2A1B08', shadow: 'none' },
  "Monthly Reach": { border: '1px solid #2A1B08', shadow: 'none' },
  "Assign Executive": { border: '1px solid #004370', shadow: 'none' },
  "Schedule Meeting": { border: '1px solid #004370', shadow: 'none' },
  "Lead Nurturing": { border: '1px solid #004370', shadow: 'none' },
};

const nodeIcons: Record<string, any> = {
  "New Lead": TimerReset,
  "Send Message": MessageSquareDot,
  "AI Insights": Bot,
  "Hot": Waves,
  "Quick Call": PhoneOutgoing,
  "AI Lead Score": MonitorDot,
  "Follow-up Call": Play,
  "Assign Executive": FileCog,
  "Reminder Trigger": BellRing,
  "Schedule Meeting": CalendarDays,
  "Lead Conversion": UserCheck,
  "Warm": Activity,
  "WhatsApp Connect": "WHATSAPP",
  "Email Campaign": Mail,
  "Activity Review": Activity,
  "Lead Nurturing": SquareDashed,
  "Cold": Waves,
  "Weekly Connect": RefreshCcwDot,
  "AI Analysis": MonitorDot,
  "Monthly Reach": CalendarRange,
};

const FlowNode = ({ type, title, description, x, y, onClick }: { type: string, title: string, description: string, x: number, y: number, onClick?: () => void }) => {
  if (false) { console.log(onClick); }
  const style = nodeStyles[title] || { border: '1px solid transparent', shadow: 'none' };
  const Icon = nodeIcons[title] || Users;
  const isWhatsApp = title === "WhatsApp Connect";

  return (
    <div
      className="absolute cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] z-20"
      style={{ left: x - 90, top: y, width: 180, height: 56 }}
    >
      {/* External Badge */}
      <div
        className="absolute -top-[14px] left-0 font-inter font-bold text-[6px] flex items-center justify-center rounded-full leading-none whitespace-nowrap"
        style={{ color: '#93000A', backgroundColor: '#FFDAD6', width: 39, height: 10 }}
      >
        {type}
      </div>

      {/* Card */}
      <div
        className="w-full h-full bg-[#F9FBFD] rounded-[5px] p-[5px] flex flex-col justify-center gap-0"
        style={{ border: style.border, boxShadow: style.shadow }}
      >
        {/* Title row with icon */}
        <div className="flex items-center gap-[6px]">
          <div className="flex-shrink-0 w-7 h-7 rounded-[6px] bg-[#EFF6FF] flex items-center justify-center">
            {isWhatsApp ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#075985">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            ) : (
              <Icon size={14} color="#004370" />
            )}
          </div>
          <div className="font-manrope font-semibold text-[12px] text-[#191C1E] leading-none whitespace-nowrap">
            {title}
          </div>
        </div>
        {/* Description sits below, indented to clear icon */}
        <div className="font-inter font-normal text-[8px] text-[#64748B] leading-[1.1] pl-[34px]">
          {description}
        </div>
      </div>
    </div>
  );
};

const DiamondDecision = ({ x, y, glowColor, text, textColor }: { x: number, y: number, glowColor: string, text: string, textColor: string }) => {
  return (
    <div
      className="absolute flex items-center justify-center z-20"
      style={{ left: x - 28, top: y - 28, width: 56, height: 56 }}
    >
      <div
        className="absolute w-[40px] h-[40px] bg-white"
        style={{
          transform: 'rotate(45deg)',
          border: `1px solid ${glowColor}80`,
          boxShadow: `0 0 15px 0 ${glowColor}80`,
          borderRadius: '4px'
        }}
      />
      <span className="relative z-10 font-inter font-medium text-[7px] text-center" style={{ color: textColor }}>
        {text}
      </span>
    </div>
  );
};

const SVGConnectors = () => (
  <svg className="absolute inset-0 pointer-events-none z-10" style={{ width: 1200, height: 1100 }}>
    <g
      className="flow-line"
      stroke="#004370"
      strokeOpacity="0.3"
      strokeWidth="1.5"
      strokeDasharray="6 5"
    >
      {/* Main Trunk */}
      <line x1={550} y1={106} x2={550} y2={166} />
      <line x1={550} y1={222} x2={550} y2={282} />

      {/* Split below AI Insights */}
      {/* Single vertical from AI Insights bottom — STOPS before labels */}
      <line x1={550} y1={338} x2={550} y2={368} />

      {/* NO line above or through the Hot/Warm/Cold labels */}

      {/* Hot: starts BELOW label, short vertical then bends left horizontally */}
      <line x1={460} y1={390} x2={460} y2={405} />
      <line x1={150} y1={405} x2={460} y2={405} />
      <line x1={150} y1={405} x2={150} y2={440} />

      {/* Warm: starts BELOW label, straight vertical down */}
      <line x1={550} y1={390} x2={550} y2={440} />

      {/* Cold: starts BELOW label, short vertical then bends right horizontally */}
      <line x1={640} y1={390} x2={640} y2={405} />
      <line x1={640} y1={405} x2={950} y2={405} />
      <line x1={950} y1={405} x2={950} y2={440} />

      {/* Hot Trunk */}
      <line x1={150} y1={456} x2={150} y2={516} />
      <line x1={150} y1={572} x2={150} y2={580} />
      {/* Diamond split */}
      <line x1={50} y1={580} x2={250} y2={580} />
      <line x1={50} y1={580} x2={50} y2={588} />
      <line x1={250} y1={580} x2={250} y2={588} />

      {/* Hot - Answered branch */}
      <line x1={50} y1={672} x2={50} y2={690} />
      <line x1={50} y1={746} x2={50} y2={806} />
      <line x1={50} y1={862} x2={50} y2={900} />
      <line x1={250} y1={862} x2={250} y2={900} />
      <line x1={50} y1={900} x2={250} y2={900} />
      <line x1={150} y1={900} x2={150} y2={922} />
      <line x1={150} y1={978} x2={150} y2={1038} />

      {/* Hot - No Answered branch */}
      <line x1={250} y1={672} x2={250} y2={690} />
      <line x1={250} y1={746} x2={250} y2={806} />

      {/* Warm Trunk */}
      <line x1={550} y1={456} x2={550} y2={516} />
      <line x1={550} y1={572} x2={550} y2={632} />
      <line x1={550} y1={688} x2={550} y2={748} />
      <line x1={550} y1={804} x2={550} y2={840} />
      <line x1={450} y1={840} x2={670} y2={840} />
      <line x1={450} y1={840} x2={450} y2={864} />
      <line x1={670} y1={840} x2={670} y2={864} />

      {/* Cold Trunk */}
      <line x1={950} y1={456} x2={950} y2={516} />
      <line x1={950} y1={572} x2={950} y2={632} />
      <line x1={950} y1={688} x2={950} y2={748} />
      <line x1={950} y1={804} x2={950} y2={864} />
    </g>
  </svg>
);

const FlowBuilder = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistRef = useRef<number | null>(null);

  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  // EditActionDrawer mocks
  const [delayValue, setDelayValue] = useState(1);
  const [delayUnit, setDelayUnit] = useState('Days');
  const [isBizHours, setIsBizHours] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const cw = containerRef.current.clientWidth;
      setPan({ x: (cw - 1200) / 2, y: 20 });
    }
  }, []);

  const handleZoomIn = () => setScale(s => Math.min(1.5, s + 0.1));
  const handleZoomOut = () => setScale(s => Math.max(0.5, s - 0.1));
  const handleReset = () => {
    setScale(1);
    if (containerRef.current) {
      const cw = containerRef.current.clientWidth;
      setPan({ x: (cw - 1200) / 2, y: 20 });
    }
  };

  const open = (name: string) => setActiveDrawer(name);
  const close = () => setActiveDrawer(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouchRef.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      };
      lastPinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDistRef.current = Math.sqrt(dx * dx + dy * dy);
      lastTouchRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && lastTouchRef.current) {
      setPan({
        x: e.touches[0].clientX - lastTouchRef.current.x,
        y: e.touches[0].clientY - lastTouchRef.current.y
      });
    } else if (e.touches.length === 2 && lastPinchDistRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const delta = newDist - lastPinchDistRef.current;
      setScale(s => Math.min(1.5, Math.max(0.5, s + delta * 0.005)));
      lastPinchDistRef.current = newDist;
    }
  };

  const handleTouchEnd = () => {
    lastTouchRef.current = null;
    lastPinchDistRef.current = null;
  };

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 font-['Inter'] min-h-screen lg:mb-0 mb-20 ">
      <div className="px-4 lg:px-6 pt-4 lg:pt-6">
        <div className="flex items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
              Flow Builder
            </h1>
            <p className="text-[13px] md:text-base text-[#64748B] mt-1 font-regular font-inter whitespace-nowrap">
              Automate Every Customer Interaction
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">


            <BtnCom
              title="Edit Action"
              onClick={() => navigate('/presales/flow-builder/edit-action')}
              variant='primary'
              className='px-10'

            />


          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`relative overflow-hidden flex-1 z-10 touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative min-w-[1200px] min-h-[1100px]"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'top left',
            transition: isDragging ? 'none' : 'transform 200ms ease-out'
          }}
        >
          <SVGConnectors />

          {/* Main Trunk */}
          <FlowNode x={550} y={50} type="TRIGGER" title="New Lead" description="Instantly triggers when lead arrives" onClick={() => open('NewLead')} />
          <FlowNode x={550} y={166} type="COMM" title="Send Message" description="Instantly welcomes every new lead" onClick={() => open('SendMessage')} />
          <FlowNode x={550} y={282} type="DECISION" title="AI Insights" description="AI tracks customer engagement" onClick={() => open('EditAction')} />

          {/* Inline labels below AI Insights */}
          <div className="absolute font-inter font-medium text-[8px] z-20" style={{ color: '#FF6B35', left: 440, top: 370 }}>Hot</div>
          <div className="absolute font-inter font-medium text-[8px] z-20" style={{ color: '#FFC857', left: 535, top: 370 }}>Warm</div>
          <div className="absolute font-inter font-medium text-[8px] z-20" style={{ color: '#7B8FA1', left: 625, top: 370 }}>Cold</div>

          {/* Hot Column */}
          <FlowNode x={150} y={440} type="HOT LEAD" title="Hot" description="High intent potential customer" onClick={() => open('EditAction')} />
          <FlowNode x={150} y={516} type="COMM" title="Quick Call" description="Instantly connect with hot leads" onClick={() => open('EditAction')} />

          <DiamondDecision x={50} y={630} glowColor="#10B981" text="Answered" textColor="#10B98180" />
          <DiamondDecision x={250} y={630} glowColor="#AA382E" text="No Answered" textColor="#AA382E80" />

          <FlowNode x={50} y={690} type="AI" title="AI Lead Score" description="Analyze customer engagement after call" onClick={() => open('EditAction')} />
          <FlowNode x={250} y={690} type="DELAY" title="Follow-up Call" description="Retry call if customer unavailable" onClick={() => open('NoResponse')} />

          <FlowNode x={50} y={806} type="ACTION" title="Assign Executive" description="Automatically assign best sales agent" onClick={() => open('NotifySales')} />
          <FlowNode x={250} y={806} type="COMM" title="Reminder Trigger" description="Smart follow-up reminder triggered" onClick={() => open('EditAction')} />

          <FlowNode x={150} y={922} type="ACTION" title="Schedule Meeting" description="Arrange meeting for qualified customer" onClick={() => open('EditAction')} />
          <FlowNode x={150} y={1038} type="AI" title="Lead Conversion" description="Lead successfully converted to customer" onClick={() => open('ReplyReceived')} />

          {/* Warm Column */}
          <FlowNode x={550} y={440} type="WARM LEAD" title="Warm" description="Customer showing moderate interest" onClick={() => open('EditAction')} />
          <FlowNode x={550} y={516} type="COMM" title="WhatsApp Connect" description="Instantly engage customer on WhatsApp" onClick={() => open('EditAction')} />
          <FlowNode x={550} y={632} type="COMM" title="Email Campaign" description="Instantly engage customer on email" onClick={() => open('EditAction')} />
          <FlowNode x={550} y={748} type="DECISION" title="Activity Review" description="Analyze interaction status again" onClick={() => open('UpdateStatus')} />
          <FlowNode x={450} y={864} type="AI" title="AI Lead Score" description="Analyze customer engagement after call" onClick={() => open('EditAction')} />
          <FlowNode x={670} y={864} type="ACTION" title="Lead Nurturing" description="Nurture leads with smart follow-ups" onClick={() => open('EditAction')} />

          {/* Cold Column */}
          <FlowNode x={950} y={440} type="COLD LEAD" title="Cold" description="Low engagement customer detected" onClick={() => open('EditAction')} />
          <FlowNode x={950} y={516} type="ACTION" title="Lead Nurturing" description="Nurture leads with smart follow-ups" onClick={() => open('EditAction')} />
          <FlowNode x={950} y={632} type="ACTION" title="Weekly Connect" description="Instantly engage customer on WhatsApp" onClick={() => open('EditAction')} />
          <FlowNode x={950} y={748} type="ACTION" title="AI Analysis" description="AI analyzes customer behavior" onClick={() => open('EditAction')} />
          <FlowNode x={950} y={864} type="ACTION" title="Monthly Reach" description="Reconnect with leads every month" onClick={() => open('EditAction')} />
        </div>
      </div>

      <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-[60]">
        <button onClick={handleZoomIn} className="w-9 h-9 bg-white border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] rounded-[8px] flex items-center justify-center hover:bg-[#F8FAFC] active:scale-95 transition-all text-[#64748B] hover:text-[#004370] cursor-pointer">
          <Plus size={18} strokeWidth={2.5} />
        </button>
        <button onClick={handleReset} className="w-9 h-9 bg-white border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] rounded-[8px] flex items-center justify-center hover:bg-[#F8FAFC] active:scale-95 transition-all text-[#64748B] hover:text-[#004370] cursor-pointer">
          <RotateCcw size={16} strokeWidth={2.5} />
        </button>
        <button onClick={handleZoomOut} className="w-9 h-9 bg-white border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] rounded-[8px] flex items-center justify-center hover:bg-[#F8FAFC] active:scale-95 transition-all text-[#64748B] hover:text-[#004370] cursor-pointer">
          <Minus size={18} strokeWidth={2.5} />
        </button>
      </div>

      <EditActionDrawer isOpen={activeDrawer === 'EditAction'} onClose={close} delayValue={delayValue} setDelayValue={setDelayValue} delayUnit={delayUnit} setDelayUnit={setDelayUnit} isBusinessHoursOnly={isBizHours} setIsBusinessHoursOnly={setIsBizHours} />
      <NewLeadDrawer isOpen={activeDrawer === 'NewLead'} onClose={close} />
      <SendMessageDrawer isOpen={activeDrawer === 'SendMessage'} onClose={close} />
      <NotifySalesDrawer isOpen={activeDrawer === 'NotifySales'} onClose={close} />
      <NoResponseDrawer isOpen={activeDrawer === 'NoResponse'} onClose={close} />
      <ReplyReceivedDrawer isOpen={activeDrawer === 'ReplyReceived'} onClose={close} />
      <UpdateStatusDrawer isOpen={activeDrawer === 'UpdateStatus'} onClose={close} />
    </div>
  );
};

export default FlowBuilder;
