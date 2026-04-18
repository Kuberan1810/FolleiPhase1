import { useState } from 'react';
import { Download, FileUp } from 'lucide-react';

const rows = [
  { source: 'Customer_Name',  target: 'Full Name',     preview: 'Ravi Sharma'     },
  { source: 'Lead_Email_01',  target: 'Email Primary', preview: 'ravi@corp.in'    },
  { source: 'Phone_Personal', target: 'Phone Number',  preview: '+91 98XXX XXX01' },
];

const BulkDataImport = () => {
  const [url, setUrl] = useState('');

  return (
    <div className="BoxStyle flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1"  y="1"  width="7" height="7" rx="1.5" fill="#2563EB" />
              <rect x="10" y="1"  width="7" height="7" rx="1.5" fill="#2563EB" opacity="0.5" />
              <rect x="1"  y="10" width="7" height="7" rx="1.5" fill="#2563EB" opacity="0.5" />
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#2563EB" opacity="0.3" />
            </svg>
          </div>
          <span className="text-[18px] font-bold text-[#191C1E]">Bulk Data Import</span>
        </div>
        <span className="text-[11px] font-semibold text-[#9CA3AF] tracking-widest uppercase whitespace-nowrap">
          Excel / CSV Engine
        </span>
      </div>

      {/* URL Input */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
          Fetch &amp; Import Link
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://external-resource.io/data.csv"
            className="flex-1 min-w-0 text-[13px] text-[#374151] bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] transition-all placeholder:text-[#C4CDDA]"
          />
          <button className="shrink-0 flex items-center gap-2 border border-[#E5E7EB] bg-white hover:bg-[#F2F4F6] text-[#374151] text-[13px] font-bold px-5 py-3 rounded-xl cursor-pointer transition-colors">
            <Download size={14} />
            FETCH
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#E5E7EB] overflow-x-auto">
        <table className="w-full text-left" style={{ minWidth: 360 }}>
          <thead>
            <tr className="bg-[#F1F5F9]">
              <th className="px-5 py-3 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">Source Col</th>
              <th className="px-5 py-3 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">Target Mapping</th>
              <th className="px-5 py-3 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">Preview</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {rows.map((r, i) => (
              <tr key={i} className="bg-white hover:bg-[#FAFAFA] transition-colors">
                <td className="px-5 py-4 text-[13px] text-[#6B7280] font-medium whitespace-nowrap">{r.source}</td>
                <td className="px-5 py-4 text-[13px] text-[#2563EB] font-bold whitespace-nowrap">{r.target}</td>
                <td className="px-5 py-4 text-[13px] text-[#9CA3AF] font-medium whitespace-nowrap">{r.preview}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload button */}
      <button className="w-full flex items-center justify-center gap-2.5 bg-[#1B3A5C] hover:bg-[#152d47] text-white text-[15px] font-bold py-4 rounded-2xl cursor-pointer transition-colors">
        <FileUp size={18} />
        Upload &amp; Synchronize Data
      </button>
    </div>
  );
};

export default BulkDataImport;
