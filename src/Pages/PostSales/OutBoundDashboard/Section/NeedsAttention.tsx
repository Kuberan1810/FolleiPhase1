import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnComSecondary from "../../../../Component/BtnComSecondary";
import NeedsAttentionDrawer from "./NeedsAttentionDrawer";

const NeedsAttention: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const attentionLeads = [
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
  ];

  return (
    <div
      className="col-span-12 lg:col-span-7 BoxStyle flex flex-col gap-[15px]"
      style={{
        boxShadow: '0px 4px 4px 0px rgba(229, 236, 251, 0.25)'
      }}
    >
      <div className="flex justify-between items-center w-full capitalize">
        <h3 className="text-[20px] font-bold text-[#000000] leading-[24px] tracking-[0.6px]">Needs attention now</h3>
        <BtnComSecondary label="View All" onClick={() => navigate("/postsales/dashboard/needs-attention")} />
      </div>

      <div
        className="w-full bg-white border border-[#EDF3FD] rounded-[10px] flex flex-col overflow-hidden"
      >
        {/* Responsive Horizontal Scroll Wrapper */}
        <div className="w-full overflow-x-auto scrollbar-thin">
          <div className="min-w-[600px] w-full">
            {/* Header */}
            <div className="grid grid-cols-12 items-center px-5 py-3 bg-[#F3F5FF] border-b border-[#EDF3FD] rounded-t-[10px]">
              <div className="col-span-3 text-[16px] font-semibold text-[#191C1E]">Lead</div>
              <div className="col-span-5 text-[16px] font-semibold text-[#191C1E]">Issue</div>
              <div className="col-span-2 text-center text-[16px] font-semibold text-[#191C1E]">Priority</div>
              <div className="col-span-2"></div>
            </div>

            {/* Body */}
            <div className="flex-1 divide-y divide-[#EDF3FD]">
              {attentionLeads.map((lead, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-center px-5 h-[61px] bg-[#FAFBFF] hover:bg-slate-50/50 transition-colors"
                >
                  <div className="col-span-3 text-[16px] font-medium text-black leading-[1.2] tracking-[0.6px]">{lead.name}</div>
                  <div className="col-span-5 text-[16px] font-medium text-black leading-[1.2] tracking-[0.6px] truncate pr-2" title={lead.issue}>{lead.issue}</div>
                  <div className="col-span-2 flex justify-center">
                    <span className="bg-[#FF8A8A] text-white w-[54px] h-[27px] rounded-[60px] text-[12px] font-bold flex items-center justify-center">
                      {lead.priority}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end">
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
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
        lead={selectedLead} 
      />
    </div>
  );
};

export default NeedsAttention;
