import { Mail, MessageCircle, Phone } from "lucide-react";

const OutboundCampaignList = () => {
  const campaigns = [
    {
      id: 1,
      name: "Q4 Product Launch",
      date: "Started Oct 12, 2023",
      channels: ["mail", "whatsapp"],
      status: "ACTIVE",
      statusColor: "bg-emerald-100 text-emerald-700",
      sent: "2,450",
      replies: "184",
      converted: "42",
      rate: "22.8%",
      iconBg: "bg-purple-100"
    },
    {
      id: 2,
      name: "Re-engagement - Cold Leads",
      date: "Paused 2 days ago",
      channels: ["mail"],
      status: "PAUSED",
      statusColor: "bg-gray-200 text-gray-700",
      sent: "1,200",
      replies: "56",
      converted: "8",
      rate: "14.2%",
      iconBg: "bg-purple-100"
    },
    {
      id: 3,
      name: "Enterprise Outreach",
      date: "Completed Nov 30",
      channels: ["whatsapp"],
      status: "COMPLETED",
      statusColor: "bg-blue-100 text-blue-700",
      sent: "500",
      replies: "112",
      converted: "28",
      rate: "25.0%",
      iconBg: "bg-purple-100"
    },
    {
      id: 4,
      name: "Demo Follow-up Sequence",
      date: "Started Dec 05, 2023",
      channels: ["mail", "phone"],
      status: "ACTIVE",
      statusColor: "bg-emerald-100 text-emerald-700",
      sent: "320",
      replies: "68",
      converted: "14",
      rate: "20.6%",
      iconBg: "bg-purple-100"
    },
    {
      id: 5,
      name: "New Feature Announcement",
      date: "Updated 4h ago",
      channels: ["mail", "phone", "whatsapp"],
      status: "DRAFT",
      statusColor: "bg-orange-100 text-orange-700",
      sent: "0",
      replies: "0",
      converted: "0",
      rate: "0.0%",
      iconBg: "bg-purple-100"
    }
  ];

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] overflow-hidden mb-20 px-4 sm:px-6">
      <div className="py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-[18px] sm:text-[20px] font-bold text-[#191C1E] font-manrope">Campaign List</h2>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 text-[#64748B] hover:text-black transition-colors font-manrope font-bold text-[11px] leading-[16.5px] tracking-[0.55px] uppercase cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            FILTER
          </button>
          <button
            className="flex items-center gap-2 text-[#64748B] hover:text-black transition-colors font-manrope font-bold text-[11px] leading-[16.5px] tracking-[0.55px] uppercase cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            EXPORT
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-manrope font-bold text-[#94A3B8] uppercase tracking-[1.1px] leading-none">
              <th className="px-8 py-4">Campaign</th>
              <th className="px-8 py-4">Channel</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Sent</th>
              <th className="px-8 py-4 text-right">Replies</th>
              <th className="px-8 py-4 text-right">Converted</th>
              <th className="px-8 py-4 text-right">Conversion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {campaigns.map((camp) => (
              <tr key={camp.id} className="transition-colors">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${camp.iconBg} flex items-center justify-center opacity-60`}></div>
                    <div>
                      <div className="text-[15px] font-bold text-[#191C1E]">{camp.name}</div>
                      <div className="text-[13px] text-gray-400">{camp.date}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex gap-2">
                    {camp.channels.includes('mail') && <Mail size={16} className="text-blue-500" />}
                    {camp.channels.includes('phone') && <Phone size={16} className="text-blue-500" />}
                    {camp.channels.includes('whatsapp') && <MessageCircle size={16} className="text-emerald-500" />}
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className={`px-2.5 py-1 ${camp.statusColor} text-[11px] font-bold uppercase rounded-md tracking-wider`}>
                    {camp.status}
                  </span>
                </td>
                <td className="px-8 py-4 text-right text-[15px] text-gray-600">{camp.sent}</td>
                <td className="px-8 py-4 text-right text-[15px] text-gray-600">{camp.replies}</td>
                <td className="px-8 py-4 text-right text-[15px] text-gray-600">{camp.converted}</td>
                <td className="px-8 py-4 text-right text-[15px] font-extrabold text-[#191C1E]">{camp.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-6 flex justify-between items-center text-[12px] font-bold text-gray-400 uppercase tracking-wider border-t border-gray-100">
        <div>SHOWING {campaigns.length} OF {campaigns.length} CAMPAIGNS</div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutboundCampaignList;
