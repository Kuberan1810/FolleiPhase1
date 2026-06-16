import React from "react";

const NeedsAttention: React.FC = () => {
  const attentionLeads = [
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Custom pricing asked — Follei can't ..", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
    { name: "Klen", issue: "Unsubscribed — confirm archive?", priority: "High" },
  ];

  return (
    <div className="lg:col-span-7 BoxStyle font-urbanist">
      <h3 className="text-[20px] font-bold text-[#000000] mb-5 leading-[1.2] tracking-[0.6px]">Needs attention now</h3>
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-12 items-center rounded-t-[10px] px-5 h-11">
          <div className="col-span-3 text-[14px] font-semibold text-[#191C1E] opacity-80">Lead</div>
          <div className="col-span-5 text-[14px] font-semibold text-center text-[#191C1E] opacity-80">Issue</div>
          <div className="col-span-2 text-center text-[14px] font-semibold text-[#191C1E] opacity-80">Priority</div>
          <div className="col-span-2"></div>
        </div>
        
        {/* Body */}
        <div className="space-y-2 mt-2">
          {attentionLeads.map((lead, idx) => (
            <div key={idx} className="grid grid-cols-12 items-center px-5 h-[48px] bg-[#FAFBFF] border border-[#EDF3FD] rounded-[8px] transition-colors hover:bg-[#F3F5FF]">
              <div className="col-span-3 text-[16px] font-medium text-black leading-[1.2] tracking-[0.6px]">{lead.name}</div>
              <div className="col-span-5 text-[16px] font-medium text-black leading-[1.2] tracking-[0.6px] truncate pr-2">{lead.issue}</div>
              <div className="col-span-2 flex justify-center">
                <span className="bg-[#FF8A8A] text-white w-[54px] h-[27px] rounded-[60px] text-[12px] font-bold flex items-center justify-center">
                  {lead.priority}
                </span>
              </div>
              <div className="col-span-2 flex justify-end">
                <button className="border border-[#EDF3FD] hover:bg-slate-50 text-[#191C1E] font-medium px-4 py-1.5 rounded-[10px] text-xs transition-colors cursor-pointer">
                  view
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeedsAttention;
