import { Download, Flame, Sun, Zap, FileText, Globe, CalendarPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockPriorityLeads = [
  {
    id: 1,
    name: "Sarah Jenkins",
    company: "CloudScale Solutions",
    role: "Director",
    avatar: "https://i.pravatar.cc/150?img=47",
    isOnline: true,
    matchScore: 98,
    intent: "Hot",
    behavioralSignals: "Opened proposal 4x today. Visited pricing page from mobile 10m ago.",
    cta: "Contact Now"
  },
  {
    id: 2,
    name: "Marcus Reed",
    company: "Roma Logistics",
    role: "VP Ops",
    avatar: "https://i.pravatar.cc/150?img=12",
    isOnline: false,
    matchScore: 85,
    intent: "Warm",
    behavioralSignals: "",
    cta: "Schedule Demo"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    company: "CloudScale Solutions",
    role: "Director",
    avatar: "https://i.pravatar.cc/150?img=47",
    isOnline: true,
    matchScore: 98,
    intent: "Hot",
    behavioralSignals: "Opened proposal 4x today. Visited pricing page from mobile 10m ago.",
    cta: "Contact Now"
  }
];

const mockAlerts = [
  {
    id: 1,
    dot: "#004370",
    title: "Reply Rate Dropped -12%",
    timeAgo: "2 HOURS AGO",
    link: "/dashboard/not-replied-leads",
    hasForensic: true,
    forensicItems: [
      "28 leads waiting > 48hrs",
      "Weekend response lag detected"
    ]
  },
  {
    id: 2,
    dot: "#F6810C",
    title: "24 Inactive Leads detected",
    timeAgo: "5 HOURS AGO",
    link: "/dashboard/inactive-leads",
    hasForensic: false,
    forensicItems: []
  }
];

const AIInsightsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-1.5 mb-2">
        <span
          onClick={() => navigate("/dashboard")}
          className="font-manrope font-bold text-[12px] leading-[16.8px] tracking-[0.36px] text-[#767586] cursor-pointer hover:text-[#004370] transition-colors"
        >
          Dashboard
        </span>
        <span className="text-[#767586] text-[12px]">›</span>
        <span className="font-manrope font-bold text-[12px] leading-[16.8px] tracking-[0.36px] text-[#004370]">
          AI Insights
        </span>
      </div>

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#0F172A] font-manrope">
            AI Insights Center
          </h1>
          <p className="text-[13px] md:text-base text-[#64748B] mt-1 font-inter font-normal">
            AI-powered lead intelligence, sales recommendations, forecasting, and performance analysis.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-[#004370] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#003152] transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-5">
        <div className="flex flex-col gap-5">
          <div className="BoxStyle p-6">
            <h2 className="font-manrope font-semibold text-[26px] leading-[33.6px] tracking-[0px] text-[#0F172A]">
              Intent Classification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="rounded-[10px] p-4 flex flex-col gap-2 bg-[#F0FDF4] border border-[#DCFCE7]">
                <div className="flex items-center justify-between">
                  <span className="font-manrope font-bold text-[16px] text-[#14532D]">Interested</span>
                  <a href="#" className="font-manrope font-bold text-[12px] text-[#004370] no-underline hover:underline whitespace-nowrap">View leads</a>
                </div>
                <span className="font-manrope font-normal text-[16px] text-[#16A34A]">64</span>
                <div className="w-full h-1.5 rounded-full bg-[#DCFCE7] mt-1 overflow-hidden">
                  <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="rounded-[10px] p-4 flex flex-col gap-2 bg-[#F8FAFC] border border-[#F1F5F9]">
                <div className="flex items-center justify-between">
                  <span className="font-manrope font-bold text-[16px] text-[#475569]">Neutral</span>
                </div>
                <span className="font-manrope font-normal text-[16px] text-[#475569]">28</span>
                <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] mt-1 overflow-hidden">
                  <div className="h-full bg-[#475569] rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>

              <div className="rounded-[10px] p-4 flex flex-col gap-2 bg-[#F8FAFC] border border-[#F1F5F9]">
                <div className="flex items-center justify-between">
                  <span className="font-manrope font-bold text-[16px] text-[#475569]">Not Interested</span>
                </div>
                <span className="font-manrope font-normal text-[16px] text-[#475569]">12</span>
                <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] mt-1 overflow-hidden">
                  <div className="h-full bg-[#475569] rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-[#EFF4FF] rounded-[10px] p-4 mt-4 flex flex-col gap-2">
              <h3 className="font-manrope font-bold text-[12px] leading-[19.5px] text-[#4648D4] uppercase">
                AI BEHAVIORAL ANALYSIS
              </h3>
              <p className="font-manrope font-normal text-[12px] leading-[19.5px] text-[#191C1E]">
                These leads actively viewed pricing (3+ times), requested product demos, or engaged with technical documentation.
              </p>
            </div>
          </div>

          <div className="BoxStyle p-6 overflow-hidden">
            <h2 className="font-manrope font-semibold text-[26px] leading-[33.6px] text-[#0F172A] mb-4">
              Smart Alerts
            </h2>
            <div className="flex flex-col">
              {mockAlerts.map((alert, index) => (
                <div key={alert.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: alert.dot }} />
                    {index !== mockAlerts.length - 1 ? (
                      <div className="flex-1 w-px bg-[#E2E8F0] mt-0.5" />
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-3 pb-8 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 w-full">
                      {/* Title row — always */}
                      <div className="flex items-center gap-2">
                        <span className="font-manrope font-bold text-[18px] leading-[28.8px] text-[#0F172A]">
                          {alert.title}
                        </span>
                        {/* View All — desktop inline */}
                        <span 
                          onClick={() => navigate(alert.link)}
                          className="hidden sm:inline font-manrope font-bold text-[14px] text-[#004370] cursor-pointer hover:underline whitespace-nowrap shrink-0"
                        >
                          View All
                        </span>
                      </div>

                      {/* Second row — mobile only: View All left, timestamp right */}
                      <div className="flex items-center justify-between sm:hidden">
                        <span 
                          onClick={() => navigate(alert.link)}
                          className="font-manrope font-bold text-[14px] text-[#004370] cursor-pointer hover:underline"
                        >
                          View All
                        </span>
                        <span className="font-manrope font-bold text-[12px] text-[#767586] whitespace-nowrap">
                          {alert.timeAgo}
                        </span>
                      </div>

                      {/* Timestamp — desktop only */}
                      <span className="hidden sm:block font-manrope font-bold text-[12px] text-[#767586] whitespace-nowrap shrink-0 ml-auto">
                        {alert.timeAgo}
                      </span>
                    </div>

                    {alert.hasForensic && (
                      <div className="bg-[#F7F9FB] rounded-[10px] p-4 flex flex-col gap-2">
                        <span className="font-manrope font-bold text-[12px] leading-[16px] text-[#464554] uppercase mb-1">
                          FORENSIC BREAKDOWN
                        </span>
                        {alert.forensicItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#004370]" />
                            <span className="font-manrope font-semibold text-[14px] leading-[19.6px] tracking-[0.14px] text-[#0B1C30]">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="BoxStyle p-6">
          <h2 className="font-manrope font-semibold text-[26px] leading-[33.6px] text-[#0F172A]">
            Priority Leads
          </h2>
          <hr className="border-t border-[#E2E8F0] mt-3 mb-4" />

          <div className="flex flex-col gap-3">
            {mockPriorityLeads.map((lead) => (
              <div key={lead.id} className="bg-[#F7F9FB] rounded-[12px] p-4 flex flex-col gap-3 relative overflow-hidden mb-3 last:mb-0">
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full translate-x-6 -translate-y-6" style={{ backgroundColor: 'rgba(70, 72, 212, 0.05)' }} />
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={lead.avatar} alt={lead.name} className="w-12 h-12 rounded-full object-cover" />
                    {lead.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#16A34A] border-2 border-white flex items-center justify-center">
                        <Zap size={7} color="white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-manrope font-bold text-[16px] leading-[25.6px] text-[#0F172A]">{lead.name}</span>
                    <span className="font-manrope font-normal text-[12px] leading-[16px] text-[#767586]">{lead.company} • {lead.role}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-1">
                  <div className="flex flex-col items-center gap-0.5 flex-1">
                    <span className="font-manrope font-bold text-[10px] leading-[15px] uppercase text-[#767586]">MATCH SCORE</span>
                    <span className="font-manrope font-normal text-[20px] leading-[28px] text-[#004370]">{lead.matchScore}</span>
                  </div>
                  <div className="w-px h-8 bg-[#C7C4D7]" />
                  <div className="flex flex-col items-center gap-0.5 flex-1">
                    <span className="font-manrope font-bold text-[10px] leading-[15px] uppercase text-[#767586]">INTENT</span>
                    {lead.intent === 'Hot' ? (
                      <span className="rounded-full px-2.5 py-1 flex items-center gap-1 bg-[#FEE2E2] text-[#B91C1C] font-manrope font-bold text-[14px]">
                        <Flame className="w-[10px] h-[11px] text-[#B91C1C]" /> Hot
                      </span>
                    ) : (
                      <span className="rounded-full px-2.5 py-1 flex items-center gap-1 bg-[#FFEDD5] text-[#C2410C] font-manrope font-bold text-[14px]">
                        <Sun className="w-[10px] h-[11px] text-[#C2410C]" /> Warm
                      </span>
                    )}
                  </div>
                  <div className="w-px h-8 bg-[#C7C4D7]" />
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <span className="font-manrope font-bold text-[10px] leading-[15px] uppercase text-[#767586]">SIGNALS</span>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-[9px] h-[12px] text-[#004370]" />
                      <Globe className="w-[9px] h-[12px] text-[#004370]" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#EFF4FF] rounded-[8px] p-3 flex flex-col gap-1 z-10 relative">
                  <div className="flex items-center gap-1">
                    <Zap className="w-[10px] h-[10px] text-[#464554]" />
                    <span className="font-manrope font-bold text-[10px] leading-[15px] text-[#464554] uppercase">BEHAVIORAL SIGNALS</span>
                  </div>
                  {lead.behavioralSignals && (
                    <span className="font-manrope font-normal text-[12px] leading-[15px] text-[#191C1E]">
                      {lead.behavioralSignals}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 z-10 relative">
                  {lead.cta === 'Contact Now' ? (
                    <>
                      <button className="flex-1 bg-[#004370] hover:bg-[#003152] text-white rounded-[10px] py-2.5 flex items-center justify-center gap-2 transition-colors cursor-pointer font-manrope font-bold text-[12px] leading-[16px]">
                        Contact Now
                      </button>
                      <button className="w-10 h-10 rounded-[10px] bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center cursor-pointer transition-colors shrink-0">
                        <CalendarPlus className="w-[19px] h-[20px] text-[#464554]" />
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 bg-[#EAF7FF] hover:bg-[#d6eef9] text-[#0B1C30] rounded-[10px] py-2.5 flex items-center justify-center transition-colors cursor-pointer font-manrope font-bold text-[12px] leading-[16px]">
                      Schedule Demo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AIInsightsPage;
