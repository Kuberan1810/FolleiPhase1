import { Globe, Megaphone } from "lucide-react";
import profileImg from "../../../../assets/image.png";

const NewLeads = () => {
  const leads = [
    {
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      source: "Website",
      status: "NEW INQUIRY",
      statusType: "new",
      time: "2 mins ago",
      channel: "WhatsApp",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      email: "m.chen@techcorp.com",
      source: "LinkedIn",
      status: "CONTACTED",
      statusType: "contacted",
      time: "15 mins ago",
      channel: "Email",
      initials: "MC"
    },
    {
      name: "Emma Watson",
      email: "emma@design.co",
      source: "Website",
      status: "NEW INQUIRY",
      statusType: "new",
      time: "Not Yet Contacted",
      channel: "",
      initials: "EW"
    }
  ];

  return (
    <div className="BoxStyle shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full min-w-0 overflow-hidden">
      <div className="mb-6">
        <h2 className="font-manrope font-bold text-[20px] text-[#191C1E]">New Leads</h2>
        <p className="font-inter text-[13px] text-[#64748B]">Managing 08 New leads this hour</p>
      </div>

      <div className="overflow-x-auto leads-table-scroll w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="px-4 py-3 font-inter font-semibold text-[11px] uppercase tracking-widest text-[#434655] text-center">LEAD</th>
              <th className="px-4 py-3 font-inter font-semibold text-[11px] uppercase tracking-widest text-[#434655] text-center">SOURCE</th>
              <th className="px-4 py-3 font-inter font-semibold text-[11px] uppercase tracking-widest text-[#434655] text-center">STATUS</th>
              <th className="px-4 py-3 font-inter font-semibold text-[11px] uppercase tracking-widest text-[#434655] text-center">ACTIVITY</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, idx) => (
              <tr key={idx} className="border-b border-[#F1F5F9]">
                <td className="px-4 py-4 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImg}
                      alt="lead avatar"
                      className="h-10 w-10 rounded-full object-cover shrink-0 border border-[#E2E8F0]"
                    />
                    <div>
                      <div className="font-inter font-semibold text-[14px] text-[#191C1E]">{lead.name}</div>
                      <div className="text-[12px] text-[#64748B]">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center items-center">
                  <div className="flex justify-center">
                    <div className="bg-[#F1F5F9] rounded-[10px] p-2 inline-flex items-center justify-center">
                      {lead.source === "Website" ? <Globe size={18} color="#004370" /> : <Megaphone size={18} color="#004370" />}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center items-center">
                  <span className={`px-3 py-1 text-[11px] font-semibold ${lead.statusType === 'new' ? 'bg-[#E0F2FE] text-[#191C1E] rounded-[8px]' : 'bg-[#FFF7ED] text-[#191C1E] rounded-[8px]'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-center items-center">
                  {lead.time === "Not Yet Contacted" ? (
                    <span className="font-inter text-[12px] text-[#64748B]">Not Yet Contacted</span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="font-inter text-[12px] text-[#64748B]">{lead.time}</span>
                      <span className="font-inter font-bold text-[12px] text-[#004370] uppercase">{lead.channel}</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewLeads;
