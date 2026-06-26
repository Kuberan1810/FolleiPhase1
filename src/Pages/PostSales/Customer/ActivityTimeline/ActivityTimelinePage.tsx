import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  CornerUpLeft, 
  Phone, 
  Mail, 
  MessageSquare, 
  Eye, 
  ClipboardList, 
  Globe,
  Play
} from 'lucide-react';

const ActivityTimelinePage = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      icon: Calendar,
      iconBg: 'bg-[#004370]',
      iconColor: 'text-white',
      title: 'Scheduled Meeting',
      desc: 'Product demo with the Sale team.',
      time: '1 hour ago',
    },
    {
      id: 2,
      icon: CornerUpLeft,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Replied to email',
      desc: 'Confirmed attendance for the discovery session.',
      time: '2 hours ago',
    },
    {
      id: 3,
      icon: Phone,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Call : Discovery Session',
      desc: 'Discussed current pain points regarding scale. The prospect was highly engaged during the live demo of the automation engine. Scheduled a follow-up with their technical architect.',
      time: '4 hours ago',
      type: 'audio',
    },
    {
      id: 4,
      icon: Mail,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Opened email',
      desc: 'Email clicked: ',
      linkText: 'CloudScale_Proposal_V2.pdf (1.2MB)',
      time: '4 hours ago',
    },
    {
      id: 5,
      icon: Mail,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Email Sent : Enterprise Proposal V2',
      desc: 'Hi Alex, as promised, attached is the revised proposal reflecting the 20% growth margin we discussed yesterday. Let me know if you have any questions before our sync on Friday.',
      descExtra: 'Attached: ',
      linkText: 'CloudScale_Proposal_V2.pdf (1.2MB)',
      time: '4 hours ago',
    },
    {
      id: 6,
      icon: MessageSquare,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Message Sent',
      desc: 'Congratulated Alex on their recent \'Tech Innovator\' award. They responded within 10 minutes thanking us and mentioning they\'d seen our recent blog post.',
      time: '4 hours ago',
    },
    {
      id: 7,
      icon: Eye,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Viewed pricing page(3rd time)',
      desc: 'Session duration: ',
      boldDesc: '4m 12s',
      time: 'Yesterday',
    },
    {
      id: 8,
      icon: ClipboardList,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Submitted contact form',
      desc: 'Initial inquiry regarding CRM automation.',
      time: '2 days ago',
    },
    {
      id: 9,
      icon: Globe,
      iconBg: 'bg-[#F3F4FC] border border-[#DBDFFF]',
      iconColor: 'text-[#004370]',
      title: 'Visited homepage',
      desc: 'Source: Organic Google Search',
      time: '2 days ago',
    }
  ];

  // Helper to render the audio player mock
  const renderAudioPlayer = () => {
    // Generate some random heights for the audio wave bars
    const bars = Array.from({ length: 45 }).map((_, i) => {
      const h = Math.max(20, Math.floor(Math.random() * 100));
      return (
        <div key={i} className="w-[3px] bg-[#004370] rounded-full mx-[1px]" style={{ height: `${h}%` }}></div>
      );
    });

    return (
      <div className="mt-4 bg-[#F8FAFC] rounded-2xl p-4 flex flex-col gap-2 max-w-[400px]">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 shrink-0 bg-[#004370] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#003152] transition-colors">
            <Play className="w-5 h-5 ml-1" fill="currentColor" />
          </button>
          <div className="flex-1 flex items-center h-10 overflow-hidden">
            {bars}
          </div>
        </div>
        <div className="flex justify-between items-center text-[11px] font-semibold text-[#64748B] px-[52px]">
          <span>00:00</span>
          <span>02:45</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="mb-2">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#464555] hover:text-[#004370] transition-all duration-300 cursor-pointer font-semibold group mb-4"
        >
          <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
          Back
        </button>
        <h1 className="text-[24px] font-bold text-[#191C1E]">Activity Timeline</h1>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full">
        {/* Continuous Vertical Line */}
        <div className="absolute left-[23px] top-[10px] bottom-[10px] w-[2px] bg-[#EDF3FD] z-0" />

        <div className="flex flex-col gap-8 relative z-10">
          {events.map((event) => (
            <div key={event.id} className="flex gap-6 w-full">
              {/* Icon Circle */}
              <div className={`w-12 h-12 rounded-full ${event.iconBg} ${event.iconColor} flex items-center justify-center shrink-0 border-4 border-[#F8FAFC]`}>
                <event.icon className="w-5 h-5" />
              </div>

              {/* Event Card */}
              <div className="flex-1 BoxStyle">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-[16px] font-semibold text-[#191C1E]">{event.title}</h3>
                  <span className="text-[13px] font-medium text-[#64748B] shrink-0">{event.time}</span>
                </div>
                
                <p className="text-[14px] text-[#64748B] leading-relaxed">
                  {event.desc}
                  {event.linkText && (
                    <span className="text-[#004370] font-medium cursor-pointer hover:underline">{event.linkText}</span>
                  )}
                  {event.boldDesc && (
                    <span className="font-semibold text-[#191C1E]">{event.boldDesc}</span>
                  )}
                </p>

                {event.descExtra && (
                  <p className="text-[14px] text-[#64748B] mt-2">
                    {event.descExtra}
                    <span className="text-[#004370] font-medium cursor-pointer hover:underline">{event.linkText}</span>
                  </p>
                )}

                {/* Conditional Content (e.g. Audio Player) */}
                {event.type === 'audio' && renderAudioPlayer()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimelinePage;
