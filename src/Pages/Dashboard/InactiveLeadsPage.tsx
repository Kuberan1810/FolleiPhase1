import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Globe, Snowflake } from 'lucide-react';

const AVATAR_COLORS = ["#004370", "#8B5CF6", "#10B981", "#3B82F6", "#EC4899", "#F59E0B"];
const getAvatarColor = (name: string): string => {
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const rawLeads = [
  { name: "Sophia Miller", email: "sophia.m@gmail.com", daysInactive: 16 },
  { name: "James Carter", email: "j.carter@outlook.com", daysInactive: 23 },
  { name: "Priya Nair", email: "priya.nair@corp.in", daysInactive: 23 },
  { name: "Lucas Fernandez", email: "lucas.f@bizmail.com", daysInactive: 31 },
  { name: "Aisha Bello", email: "aisha.b@gmail.com", daysInactive: 18 },
  { name: "Ryan Thompson", email: "ryan.t@outlook.com", daysInactive: 23 },
  { name: "Elena Vasquez", email: "elena.v@corp.mx", daysInactive: 27 },
  { name: "Omar Shaikh", email: "omar.s@bizmail.ae", daysInactive: 23 },
  { name: "Nina Patel", email: "nina.p@gmail.com", daysInactive: 19 },
  { name: "Carlos Mendes", email: "carlos.m@outlook.com", daysInactive: 23 },
  { name: "Yuki Tanaka", email: "yuki.t@corp.jp", daysInactive: 34 },
  { name: "Fatima Al-Hassan", email: "fatima.h@bizmail.com", daysInactive: 23 },
  { name: "David Kim", email: "david.k@gmail.com", daysInactive: 21 },
  { name: "Sara Lindqvist", email: "sara.l@outlook.se", daysInactive: 23 },
];

const leads = rawLeads.map((item, i) => ({
  ...item,
  id: i + 1,
  source: "web",
  status: "Contacted",
  score: "Cold"
}));

const InactiveLeadsPage = () => {
  const navigate = useNavigate();

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
            24 Inactive Leads Detected
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
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">LEAD</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">SOURCE</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">STATUS</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">SCORE</th>
              <th className="px-6 py-4 font-manrope font-bold text-[12px] tracking-[0.8px] uppercase text-[#464554]">DAYS INACTIVE</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
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
                  <div className="w-8 h-8 rounded-[8px] bg-[#F7F6F7] flex items-center justify-center">
                    <Globe className="w-[15px] h-[15px] text-[#004370]" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="rounded-full px-3 py-1 font-inter font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#222222] bg-[#FFE3C6]">
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="rounded-full px-3 py-1 flex items-center gap-1.5 w-fit font-manrope font-bold text-[14px] leading-[15px] text-[#1D4ED8] bg-[#DBEAFE]">
                    <Snowflake className="w-[13px] h-[13px] text-[#1D4ED8]" />
                    {lead.score}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-inter font-normal text-[12px] sm:text-[14px] leading-[20px] text-[#191C1E]">
                    {lead.daysInactive} Days
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InactiveLeadsPage;
