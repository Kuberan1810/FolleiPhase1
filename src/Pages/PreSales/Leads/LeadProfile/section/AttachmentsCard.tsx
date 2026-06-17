import React from 'react';
import { FileText, FileSpreadsheet, FileIcon } from 'lucide-react';

const AttachmentsCard = () => {
  const files = [
    { icon: FileText, name: 'Enterprise_Proposal.pdf', size: '2.4 MB • PDF', color: 'text-red-500', bg: 'bg-red-50' },
    { icon: FileIcon, name: 'Requirements.docx', size: '1.1 MB • DOCX', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: FileSpreadsheet, name: 'Pricing_Sheet.xlsx', size: '850 KB • XLSX', color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#EDF3FD]">
      <h2 className="text-[16px] font-extrabold text-[#191C1E] mb-7">Attachments</h2>
      <div className="flex flex-col gap-5">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-[12px] ${f.bg} flex items-center justify-center shrink-0`}>
              <f.icon className={`w-5 h-5 ${f.color}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#191C1E] mb-0.5">{f.name}</span>
              <span className="text-[11px] font-semibold text-[#A0B0C0] uppercase tracking-wide">{f.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default AttachmentsCard;
