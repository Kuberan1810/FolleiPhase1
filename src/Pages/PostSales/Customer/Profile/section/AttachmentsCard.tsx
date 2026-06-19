import React from 'react';
import { FileText } from 'lucide-react';

const AttachmentsCard: React.FC = () => {
  const files = [
    { name: 'Invoice_June_2026.pdf', size: '2.4 MB', type: 'PDF', color: 'text-[#EF4444]', bg: 'bg-[#FEF2F2]' },
    { name: 'Implementation_plan.docx', size: '1.8 MB', type: 'DOCX', color: 'text-[#3B82F6]', bg: 'bg-[#EFF6FF]' },
    { name: 'Pricing_Sheet.xlsx', size: '1.2 MB', type: 'XLSX', color: 'text-[#22C55E]', bg: 'bg-[#F0FDF4]' }
  ];

  return (
    <div className="bg-white border border-[#EEF0FF] rounded-[20px] p-6 shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col gap-4">
      <h3 className="text-[16px] font-bold text-[#0D1C2E] ">Attachments</h3>

      <div className="flex flex-col gap-3">
        {files.map((file, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-[4px] ${file.bg} ${file.color} flex items-center justify-center shrink-0`}>
                <FileText className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-[#1E293B] truncate">{file.name}</span>
                <span className="text-[9px] text-[#94A3B8] font-medium mt-0.5">
                  {file.size} • {file.type}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentsCard;
