import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import NeedsAttentionDrawer from "./Section/NeedsAttentionDrawer";

const NeedsAttentionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const attentionLeads = [
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
  ];

  return (
    <div className="w-full pb-6 font-urbanist animate-fade-in relative">
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
          >
            <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E] ml-3">
            Needs attention now
          </h1>
        </div>
        <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280] ml-10">
          Track 120 activities needing immediate attention.
        </p>
      </div>

      <div className="w-full bg-white border border-[#EDF3FD] rounded-[10px] overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[600px] w-full flex flex-col">
            <div className="grid grid-cols-12 items-center px-5 py-3 bg-[#F3F5FF] border-b border-[#EDF3FD] rounded-t-[10px]">
              <div className="col-span-3 text-[16px] font-semibold text-[#191C1E] text-left">Lead</div>
              <div className="col-span-5 text-[16px] font-semibold text-[#191C1E] text-left">Issue</div>
              <div className="col-span-2 text-center text-[16px] font-semibold text-[#191C1E]">Priority</div>
              <div className="col-span-2 text-center text-[16px] font-semibold text-[#191C1E]">Action</div>
            </div>

            <div className="flex-1">
              {attentionLeads.map((lead, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 items-center px-5 h-[61px] bg-[#FAFBFF] ${idx !== attentionLeads.length - 1 ? "border-b border-[#EDF3FD]" : ""
                    }`}
                >
                  <div className="col-span-3 text-[16px] font-medium text-black leading-[1.2] tracking-[0.6px] text-left truncate pr-2">
                    {lead.name}
                  </div>
                  <div className="col-span-5 text-[16px] font-medium text-black leading-[1.2] tracking-[0.6px] truncate pr-2 text-left">
                    {lead.issue}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span className="bg-[#FF8A8A] text-white w-[54px] h-[27px] rounded-[60px] text-[12px] font-bold flex items-center justify-center">
                      {lead.priority}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-[16px] border border-[#EDF3FD] bg-white text-[#191C1E] font-medium px-4 py-1.5 rounded-[10px] text-xs transition-colors cursor-pointer hover:bg-slate-50"
                    >
                      view
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NeedsAttentionDrawer
        isOpen={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
};

export default NeedsAttentionPage;
