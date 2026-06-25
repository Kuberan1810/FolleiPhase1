import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Phone, Mail, MailOpen, Reply, MessageSquare, Eye, FileText, Globe, Play, FileDown, } from "lucide-react";

interface TimelineActivity {
  type: string;
  title: string;
  desc: string;
  linkText?: string;
  time: string;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  hasAudio?: boolean;
  audioDuration?: string;
  audioCurrent?: string;
  attachment?: string;
}

const ActivityTimelinePage: React.FC = () => {
  const navigate = useNavigate();

  const timelineActivities: TimelineActivity[] = [
    {
      type: "meeting",
      title: "Scheduled Meeting",
      desc: "Product demo with the sales team.",
      time: "1 hour ago",
      icon: Calendar,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
    {
      type: "email_reply",
      title: "Replied to email",
      desc: "Confirmed attendance for the discovery session.",
      time: "2 hours ago",
      icon: Reply,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
    {
      type: "call",
      title: "Call : Discovery Session",
      desc: "Discussed current pain points regarding scale. The prospect was highly engaged during the live demo of the automation engine. Scheduled a follow-up with their technical architect.",
      time: "4 hours ago",
      icon: Phone,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
      hasAudio: true,
      audioDuration: "03:45",
      audioCurrent: "00:00",
    },
    {
      type: "email_open",
      title: "Opened email",
      desc: "Email clicked: ",
      linkText: "CloudScale_Proposal_V2.pdf (1.2MB)",
      time: "4 hours ago",
      icon: MailOpen,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
    {
      type: "email_sent",
      title: "Email Sent : Enterprise Proposal V2",
      desc: "Hi Alex, as promised, attached is the revised proposal reflecting the 20% growth margin we discussed yesterday. Let me know if you have any questions before our sync on Friday.",
      attachment: "CloudScale_Proposal_V2.pdf (1.2MB)",
      time: "4 hours ago",
      icon: Mail,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
    {
      type: "message",
      title: "Message Sent",
      desc: "Congratulated Alex on their recent Tech innovator award. They responded within 10 minutes thanking us and mentioning they'd seen our recent blog post.",
      time: "4 hours ago",
      icon: MessageSquare,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
    {
      type: "view",
      title: "Viewed pricing page (3rd time)",
      desc: "Session duration: 4m 12s",
      time: "Yesterday",
      icon: Eye,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
    {
      type: "form",
      title: "Submitted contact form",
      desc: "Initial inquiry regarding CRM automation",
      time: "2 days ago",
      icon: FileText,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
    {
      type: "visit",
      title: "Visited homepage",
      desc: "Source: Organic Google Search",
      time: "2 days ago",
      icon: Globe,
      iconBg: "bg-[#EAF2FF]",
      iconColor: "text-[#004370]",
    },
  ];

  return (
    <div className="w-full pb-6 font-urbanist animate-fade-in relative text-left">
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
          >
            <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E] ml-3">
            Activity Timeline
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full relative">
        {timelineActivities.map((act, i) => {
          const Icon = act.icon;
          return (
            <div key={i} className="flex gap-4 items-stretch w-full relative">
              <div className="w-10 shrink-0 relative">
                <div className={`w-10 h-10 rounded-full ${i === 0 ? "bg-[#004370] border-[#004370]" : "bg-[#F3F4FC] border-[#DBDFFF]"} flex items-center justify-center shadow-sm border z-10 absolute top-[30px] left-0 -translate-y-1/2`}>
                  <Icon className={`${i === 0 ? "text-white" : "text-[#004370]"}`} size={18} />
                </div>
                {i < timelineActivities.length - 1 && (
                  <div className="absolute left-[19px] top-[30px] bottom-[-46px] w-[2px] bg-[#E2E8F0] z-0 pointer-events-none" />
                )}
              </div>

              <div className="flex-1 bg-white rounded-[10px] p-4 flex flex-col md:flex-row md:justify-between md:items-start gap-4 z-10">
                <div className="flex flex-col flex-1 text-left min-w-0">
                  <span className="text-[18px] font-semibold text-[#191C1E] mb-1">
                    {act.title}
                  </span>

                  <div className="text-[14px] text-[#464555] leading-relaxed">
                    {act.desc}
                    {act.linkText && (
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[#004370]hover:underline"
                      >
                        {act.linkText}
                      </a>
                    )}
                  </div>

                  {act.hasAudio && (
                    <div className="border border-[#EDF3FD] rounded-[10px] p-2.5 pl-3 pr-5 flex items-center gap-4 bg-[#F8FAFC] mt-3 select-none shadow-xs w-fit max-w-full">
                      <button className="w-9 h-9 rounded-[12px] bg-[#004370] hover:bg-[#003152] flex items-center justify-center text-white cursor-pointer transition-colors border-none shrink-0">
                        <Play size={18} color="#fff" fill="#fff" className="ml-0.5" />
                      </button>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-end gap-[3px] h-[22px] px-1">
                          {[4, 6, 3, 4, 7, 10, 8, 6, 5, 8, 11, 9, 7, 6, 4, 5, 7, 9, 6, 5, 9, 11, 7, 9, 6, 5, 8].map((height, i) => (
                            <div
                              key={i}
                              className="w-[4px] rounded-full"
                              style={{
                                height: height ? `${height * 1.8}px` : undefined,
                                backgroundColor: i % 3 === 0 ? "#ACDEFF" : i % 3 === 1 ? "#0C6EB1" : "#004370"
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-[#64748B] font-normal px-1">
                          <span>00:00</span>
                          <span>{act.audioDuration}</span>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-none cursor-pointer p-1 ml-auto flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {act.attachment && (
                    <div className="flex items-center gap-2.5 mt-3 w-fit max-w-full">
                      <span className="text-[13px] font-medium text-[#475569] truncate">
                        Attached:
                      </span>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[13px] font-medium text-[#004370] hover:underline truncate"
                      >
                        {act.attachment}
                      </a>
                    </div>
                  )}
                </div>

                <span className="text-[12px] font-semibold text-[#64748B] shrink-0 md:pt-1">
                  {act.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimelinePage;
