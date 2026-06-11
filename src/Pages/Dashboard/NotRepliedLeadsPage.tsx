import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, AlertTriangle, CircleDollarSign, Hourglass } from 'lucide-react';

const AVATAR_COLORS = ["#004370", "#8B5CF6", "#10B981", "#3B82F6", "#EC4899", "#F59E0B"];
const getAvatarColor = (name: string): string => {
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const leads = [
  {
    id: 1,
    name: "Sophia Miller",
    email: "sophia.m@gmail.com",
    dropReason: "Competitor mentioned",
    dropType: "negative",
    sentiment: "NEGATIVE",
    sentimentScore: 28,
    sentimentBar: 28,
    lastInteraction: "3 days ago",
    lastInteractionSub: "Replied to pricing email"
  },
  {
    id: 2,
    name: "James Carter",
    email: "j.carter@outlook.com",
    dropReason: "Budget concerns",
    dropType: "neutral",
    sentiment: "NEUTRAL",
    sentimentScore: 45,
    sentimentBar: 45,
    lastInteraction: "Ghosted after demo",
    lastInteractionSub: ""
  },
  {
    id: 3,
    name: "Priya Nair",
    email: "priya.nair@corp.in",
    dropReason: "Budget concerns",
    dropType: "neutral",
    sentiment: "NEUTRAL",
    sentimentScore: 45,
    sentimentBar: 45,
    lastInteraction: "Ghosted after demo",
    lastInteractionSub: ""
  },
  {
    id: 4,
    name: "Lucas Fernandez",
    email: "lucas.f@bizmail.com",
    dropReason: "Budget concerns",
    dropType: "neutral",
    sentiment: "NEUTRAL",
    sentimentScore: 45,
    sentimentBar: 45,
    lastInteraction: "Ghosted after demo",
    lastInteractionSub: ""
  },
  {
    id: 5,
    name: "Aisha Bello",
    email: "aisha.b@gmail.com",
    dropReason: "Budget concerns",
    dropType: "neutral",
    sentiment: "NEUTRAL",
    sentimentScore: 45,
    sentimentBar: 45,
    lastInteraction: "Ghosted after demo",
    lastInteractionSub: ""
  },
  {
    id: 6,
    name: "Ryan Thompson",
    email: "ryan.t@outlook.com",
    dropReason: "Budget concerns",
    dropType: "neutral",
    sentiment: "NEUTRAL",
    sentimentScore: 45,
    sentimentBar: 45,
    lastInteraction: "Ghosted after demo",
    lastInteractionSub: ""
  },
  {
    id: 7,
    name: "Elena Vasquez",
    email: "elena.v@corp.mx",
    dropReason: "Internal decision delay",
    dropType: "positive",
    sentiment: "POSITIVE",
    sentimentScore: 62,
    sentimentBar: 62,
    lastInteraction: "Opened Proposal 4x",
    lastInteractionSub: ""
  },
  {
    id: 8,
    name: "Omar Shaikh",
    email: "omar.s@bizmail.ae",
    dropReason: "Internal decision delay",
    dropType: "positive",
    sentiment: "POSITIVE",
    sentimentScore: 62,
    sentimentBar: 62,
    lastInteraction: "Opened Proposal 4x",
    lastInteractionSub: ""
  },
  {
    id: 9,
    name: "Nina Patel",
    email: "nina.p@gmail.com",
    dropReason: "Internal decision delay",
    dropType: "positive",
    sentiment: "POSITIVE",
    sentimentScore: 62,
    sentimentBar: 62,
    lastInteraction: "Opened Proposal 4x",
    lastInteractionSub: ""
  },
  {
    id: 10,
    name: "Carlos Mendes",
    email: "carlos.m@outlook.com",
    dropReason: "Internal decision delay",
    dropType: "positive",
    sentiment: "POSITIVE",
    sentimentScore: 62,
    sentimentBar: 62,
    lastInteraction: "Opened Proposal 4x",
    lastInteractionSub: ""
  },
  {
    id: 11,
    name: "Yuki Tanaka",
    email: "yuki.t@corp.jp",
    dropReason: "Internal decision delay",
    dropType: "positive",
    sentiment: "POSITIVE",
    sentimentScore: 62,
    sentimentBar: 62,
    lastInteraction: "Opened Proposal 4x",
    lastInteractionSub: ""
  }
];

const NotRepliedLeadsPage = () => {
  const navigate = useNavigate();

  const getDropReasonInfo = (type: string) => {
    switch (type) {
      case 'negative':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-[#BA1A1A]" />,
          textColor: 'text-[#BA1A1A]',
          sentimentColor: 'text-[#BA1A1A]',
          barColor: 'bg-[#BA1A1A]'
        };
      case 'neutral':
        return {
          icon: <CircleDollarSign className="w-4 h-4 text-[#904900]" />,
          textColor: 'text-[#904900]',
          sentimentColor: 'text-[#904900]',
          barColor: 'bg-[#904900]'
        };
      case 'positive':
        return {
          icon: <Hourglass className="w-4 h-4 text-[#4648D4]" />,
          textColor: 'text-[#4648D4]',
          sentimentColor: 'text-[#4648D4]',
          barColor: 'bg-[#4648D4]'
        };
      default:
        return {
          icon: null,
          textColor: 'text-[#0F172A]',
          sentimentColor: 'text-[#0F172A]',
          barColor: 'bg-[#004370]'
        };
    }
  };

  return (
    <>
      <div className="flex items-center gap-1.5 mb-2">
        <span onClick={() => navigate("/dashboard")}
          className="font-manrope font-bold text-[12px] leading-[16.8px] tracking-[0.36px] text-[#767586] cursor-pointer hover:text-[#004370] transition-colors">
          Dashboard
        </span>
        <span className="text-[#767586] text-[12px]">›</span>
        <span onClick={() => navigate("/dashboard/ai-insights")}
          className="font-manrope font-bold text-[12px] leading-[16.8px] tracking-[0.36px] text-[#004370] cursor-pointer hover:underline">
          AI Insights
        </span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <ChevronLeft 
            size={28} 
            className="text-[#0F172A] cursor-pointer hover:text-[#004370] transition-colors" 
            onClick={() => navigate("/dashboard/ai-insights")} 
          />
          <h1 className="font-manrope font-bold text-[22px] sm:text-[32px] leading-[40px] tracking-[-0.32px] text-[#0F172A]">
            12 Not Replied Leads
          </h1>
        </div>
        <button
          className="flex items-center gap-2 bg-[#004370] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#003152] transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      <div className="bg-white rounded-[12px] overflow-x-auto mt-6">
        <table className="w-full text-left">
          <thead className="bg-[#F6FAFF]">
            <tr>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554] text-center">LEAD</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554] text-center">AI DROP REASON</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554] text-center">SENTIMENT</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554] text-center">LAST INTERACTION</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const info = getDropReasonInfo(lead.dropType);
              return (
                <tr key={lead.id} className="bg-white hover:bg-[#F8FAFC] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 font-manrope font-bold text-[14px] sm:text-[16px] text-white"
                        style={{ backgroundColor: getAvatarColor(lead.name) }}>
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-inter font-semibold text-[14px] sm:text-[18px] leading-[24px] text-[#0F172A]">{lead.name}</span>
                        <span className="font-inter font-normal text-[11px] sm:text-[14px] leading-[20px] text-[#767586]">{lead.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {info.icon}
                      <span className={`font-manrope font-semibold text-[12px] sm:text-[14px] leading-[19.6px] tracking-[0.14px] ${info.textColor}`}>
                        {lead.dropReason}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 w-[120px]">
                      <div className="flex items-center justify-between">
                        <span className={`font-manrope font-bold text-[10px] leading-[100%] ${info.sentimentColor}`}>
                          {lead.sentiment}
                        </span>
                        <span className={`font-manrope font-bold text-[10px] leading-[100%] ${info.sentimentColor}`}>
                          {lead.sentimentScore}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#DCE9FF] overflow-hidden">
                        <div className={`h-full rounded-full ${info.barColor}`} style={{ width: `${lead.sentimentBar}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-manrope font-medium text-[12px] sm:text-[14px] leading-[21px] text-[#0F172A]">
                        {lead.lastInteraction}
                      </span>
                      {lead.lastInteractionSub && (
                        <span className="font-manrope font-medium text-[11px] sm:text-[12px] leading-[16px] text-[#767586]">
                          {lead.lastInteractionSub}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NotRepliedLeadsPage;
