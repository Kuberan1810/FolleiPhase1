import React from 'react';
import { FileText, FileSpreadsheet, FileIcon } from 'lucide-react';

const AttachmentsCard = () => {
  const files = [
    { icon: FileText, name: 'Invoice_June_2026.pdf', size: '2.4 MB • PDF', color: 'text-[#EF4444]', bg: 'bg-[#EF444410]' },
    { icon: FileIcon, name: 'Implementation_Plan.docx', size: '1.1 MB • DOCX', color: 'text-[#3B82F6]', bg: 'bg-[#3B82F610]' },
    { icon: FileSpreadsheet, name: 'Pricing_Sheet.xlsx', size: '850 KB • XLSX', color: 'text-[#22C55E]', bg: 'bg-[#22C55E10]' },
  ];

  return (
    <div className="BoxStyle">
      <h2 className="text-[20px] font-bold text-[#191C1E] mb-7">Attachments</h2>
      <div className="flex flex-col gap-5">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-[12px] ${f.bg} flex items-center justify-center shrink-0`}>
              <f.icon className={`w-5 h-5 ${f.color}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-[#1E293B] mb-0.5">{f.name}</span>
              <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">{f.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default AttachmentsCard;
