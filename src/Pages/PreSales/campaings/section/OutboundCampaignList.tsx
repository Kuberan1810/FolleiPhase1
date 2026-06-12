import React from "react";
import { Mail, MessageSquareIcon } from "lucide-react";
import { Sort , Whatsapp} from "iconsax-react";
import { campaigns } from "../campaignData";

interface OutboundCampaignListProps {
  onSelectCampaign?: (campaign: any) => void;
}

const OutboundCampaignList: React.FC<OutboundCampaignListProps> = ({ onSelectCampaign }) => {
  const [filterOpen, setFilterOpen] = React.useState(false);
  type ChannelType = "Email" | "Whatsapp" | "Call" | "Message";
  const [selectedChannels, setSelectedChannels] = React.useState<ChannelType[]>([]);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const [appliedChannels, setAppliedChannels] = React.useState<ChannelType[]>([]);
  const [appliedStatuses, setAppliedStatuses] = React.useState<string[]>([]);

  const [channelExpanded, setChannelExpanded] = React.useState(true);
  const [statusExpanded, setStatusExpanded] = React.useState(true);

  const filterPanelRef = React.useRef<HTMLDivElement>(null);
  const filterButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleChannel = (channel: ChannelType) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleApplyFilter = () => {
    setAppliedChannels(selectedChannels);
    setAppliedStatuses(selectedStatuses);
    setFilterOpen(false);
  };

  const handleCancel = () => {
    setSelectedChannels(appliedChannels);
    setSelectedStatuses(appliedStatuses);
    setFilterOpen(false);
  };

  const filteredCampaigns = campaigns.filter((camp) => {
    // Channel Filter
    if (appliedChannels.length > 0) {
      const campFigmaChannels: ChannelType[] = camp.channels.map((ch) => {
        if (ch === "mail") return "Email";
        if (ch === "whatsapp") return "Whatsapp";
        if (ch === "phone") return "Call";
        return "Message";
      });
      const hasChannel = appliedChannels.some((ch) => campFigmaChannels.includes(ch));
      if (!hasChannel) return false;
    }

    // Status Filter
    if (appliedStatuses.length > 0) {
      const statusMatch = appliedStatuses.some(
        (st) => st.toUpperCase() === camp.status.toUpperCase()
      );
      if (!statusMatch) return false;
    }

    return true;
  });

  const isFilterActive = appliedChannels.length > 0 || appliedStatuses.length > 0;

  return (
    <div className="bg-white mb-20 relative">
      <div className="py-4 flex flex-row flex-wrap justify-between items-center gap-4 w-full">
        <h2 className="text-[24px] sm:text-[32px] font-bold text-[#001E40] font-manrope px-3">Campaign List</h2>
        <div className="flex gap-4 px-2 relative self-auto">
          <button
            ref={filterButtonRef}
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 transition-all font-manrope font-bold text-[12px] leading-[16.5px] tracking-[0.55px] uppercase cursor-pointer relative ${
              isFilterActive
                ? "text-[#001E40] bg-[#EFF4FF] rounded-[8px]"
                : "text-[#434655] hover:text-gray-200 border border-transparent"
            }`} 
          >
            <Sort color="currentcolor" size={16} />
            FILTER
            {isFilterActive && (
              <span className="absolute -top-0.5 -right-0.5 animate-pulse" />
            )}
          </button>

          {filterOpen && (
            <div
              ref={filterPanelRef}
              className="absolute right-8 top-12 pb-3 w-[220px] bg-white border border-[#F1F5F9] shadow-sm px-0 font-manrope animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="mb-4">
                <div
                  onClick={() => setChannelExpanded(!channelExpanded)}
                  className="flex items-center gap-2.5 cursor-pointer py-4 px-5 bg-[#F6FAFF] select-none hover:bg-[#E0F2FE]/40 transition-colors w-full"
                >
                  <svg
                    width="8"
                    height="6"
                    viewBox="0 0 10 6"
                    className={`transition-transform duration-200 fill-[#004370] ${
                      channelExpanded ? "rotate-0" : "-rotate-90"
                    }`}
                  >
                    <polygon points="0,0 10,0 5,6" />
                  </svg>
                  <span className="text-[12px] font-extrabold text-[#004370] tracking-[0.8px] uppercase leading-none">
                    Channel
                  </span>
                </div>

                {channelExpanded && (
                  <div className="pt-4 pb-3 pl-[42px] pr-3 space-y-4 animate-in fade-in duration-200">
                    {(["Whatsapp", "Email", "Message", "Call"] as const).map((ch) => {
                      const isChecked = selectedChannels.includes(ch);
                      return (
                        <div
                          key={ch}
                          onClick={() => toggleChannel(ch)}
                          className="flex items-center gap-3.5 cursor-pointer group py-0.5"
                        >
                          <div
                            className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
                              isChecked
                                ? "bg-[#004370] border-[#004370]"
                                : "bg-white border-[#C3C6D1] group-hover:border-[#004370]/60"
                            }`}
                          >
                            {isChecked && (
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 1L3.5 6.5L1 4"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-[15px] font-medium text-[#191C1E] tracking-[0.2px] select-none">
                            {ch}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Status filter group */}
              <div className="mb-4">
                <div
                  onClick={() => setStatusExpanded(!statusExpanded)}
                  className="flex items-center gap-2.5 cursor-pointer py-4 px-5 bg-[#F6FAFF] select-none hover:bg-[#E0F2FE]/40 transition-colors w-full"
                >
                  <svg
                    width="8"
                    height="6"
                    viewBox="0 0 10 6"
                    className={`transition-transform duration-200 fill-[#004370] ${
                      statusExpanded ? "rotate-0" : "-rotate-90"
                    }`}
                  >
                    <polygon points="0,0 10,0 5,6" />
                  </svg>
                  <span className="text-[12px] font-extrabold text-[#004370] tracking-[0.8px] uppercase leading-none">
                    Status
                  </span>
                </div>

                {statusExpanded && (
                  <div className="pt-4 pb-3 pl-[42px] pr-3 space-y-4 animate-in fade-in duration-200">
                    {["Active", "Paused", "Completed", "Draft"].map((st) => {
                      const isChecked = selectedStatuses.includes(st);
                      return (
                        <div
                          key={st}
                          onClick={() => toggleStatus(st)}
                          className="flex items-center gap-3.5 cursor-pointer group py-0.5"
                        >
                          <div
                            className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
                              isChecked
                                ? "bg-[#004370] border-[#004370]"
                                : "bg-white border-[#C3C6D1] group-hover:border-[#004370]/60"
                            }`}
                          >
                            {isChecked && (
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 1L3.5 6.5L1 4"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-[15px] font-medium text-[#191C1E] tracking-[0.2px] select-none">
                            {st}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-3 px-6 border-t py-2 border-[#F1F5F9] mt-2">
                <button
                  onClick={handleCancel}
                  className="text-[#999999] hover:text-[#001E40] transition-colors font-bold text-[12px] cursor-pointer py-1 select-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyFilter}
                  className="bg-[#004370] hover:bg-[#003366] text-white px-3.5 py-1.5 rounded-[8px] font-bold text-[12px] cursor-pointer transition-colors shadow-sm select-none"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 text-[18px] bg-[#F6FAFF] font-manrope font-bold text-[#434655] uppercase tracking-[1.1px] leading-none">
              <th className="px-8 py-[23px]">Campaign</th>
              <th className="px-8 py-[23px]">Channel</th>
              <th className="px-8 py-[23px]">Status</th>
              <th className="px-8 py-[23px] text-center">Sent</th>
              <th className="px-8 py-[23px] text-center">Replies</th>
              <th className="px-8 py-[23px] text-center">Converted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredCampaigns.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-[30px] text-center text-gray-400 font-medium text-[15px]"
                >
                  No campaigns match the active filters.
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((camp) => (
                <tr
                  key={camp.id}
                  onClick={() => onSelectCampaign?.(camp)}
                  className="transition-colors hover:bg-[#F8FAFC] cursor-pointer group"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-[13px] sm:text-[18px] font-bold text-[#001E40] group-hover:text-[#004370] transition-colors max-w-[120px] sm:max-w-none truncate">
                          {camp.name}
                        </div>
                        <div className="text-[15px] text-[#94A3B8] font-medium">
                          {camp.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex gap-2">
                      {camp.channels.includes("mail") && (
                        <Mail size={20} className="text-[#004370]" />
                      )}
                      {camp.channels.includes("phone") && (
                        <MessageSquareIcon size={20} color="#004370" />
                      )}
                      {camp.channels.includes("whatsapp") && (
                        <Whatsapp
                          size={20}
                          color="#004370"
                        />
                      )}
                      {camp.channels.length === 0 && (
                        <span className="px-8 py-4 text-right text-[15px] text-[#94A3B8]">
                          0
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`px-2.5 py-1 ${camp.statusColor} text-[14px] font-bold uppercase rounded-[12px] tracking-wider`}
                    >
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-center text-[18px] text-[#000000] ">
                    {camp.sent}
                  </td>
                  <td className="px-8 py-4 text-center text-[18px] text-[#000000]">
                    {camp.replies}
                  </td>
                  <td className="px-8 py-4 text-center text-[18px] text-[#000000]">
                    {camp.converted}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default OutboundCampaignList;
