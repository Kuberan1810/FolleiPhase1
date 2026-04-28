import { useState } from 'react';
import { Download, FileUp, Import, LayoutGrid } from 'lucide-react';
import { ImportCurve } from 'iconsax-react';
import { Icon } from "@iconify/react";

const rows = [
    { source: 'Customer_Name', target: 'Full Name', preview: 'Ravi Sharma' },
    { source: 'Lead_Email_01', target: 'Email Primary', preview: 'ravi@corp.in' },
    { source: 'Phone_Personal', target: 'Phone Number', preview: '+91 98XXX XXX01' },
];

const BulkDataImport = () => {
    const [url, setUrl] = useState('');

    return (
        <div className="BoxStyle md:p-8! flex flex-col gap-8">

            {/* Header */}
            <div className="flex  flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="p-1 rounded-lg bg-[#005B9620] flex items-center justify-center shrink-0">
                        <LayoutGrid size={20} color='#005B96' className='hidden md:flex' />
                        <LayoutGrid size={16} color='#005B96' className='md:hidden flex' />

                    </div>
                    <span className="md:text-[18px] text-base font-bold text-[#191C1E]">Bulk Data Import</span>
                </div>
                <span className=" md:text-[12px] text-[10px] font-bold text-[#64748B] tracking-widest uppercase whitespace-nowrap">
                    Excel / CSV Engine
                </span>
            </div>

            {/* URL Input */}
            <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-[#64748B] uppercase tracking-widest">
                    Fetch &amp; Import Link
                </label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="https://external-resource.io/data.csv"
                        className="flex-1 min-w-0 text-[14px] text-[#374151] bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#004370]/20  transition-all placeholder:text-[#94A3B8] placeholder:font-medium"
                    />
                    <button className="shrink-0 flex items-center gap-2 border border-[#E5E7EB] bg-white hover:bg-[#F2F4F6] text-[#374151] text-[13px] font-bold px-6 py-3.5 rounded-xl cursor-pointer transition-colors">
                        <Download size={14} />
                        FETCH
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-[#E5E7EB] overflow-x-auto">
                <table className="w-full text-left" style={{ minWidth: 360 }}>
                    <thead>
                        <tr className="bg-[#F1F5F9]">
                            <th className="px-5 py-3.5 text-[12px] font-bold text-[#64748B] uppercase tracking-wider whitespace-nowrap">Source Col</th>
                            <th className="px-5 py-3.5 text-[12px] font-bold text-[#64748B] uppercase tracking-wider whitespace-nowrap">Target Mapping</th>
                            <th className="px-5 py-3.5 text-[12px] font-bold text-[#64748B] uppercase tracking-wider whitespace-nowrap">Preview</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                        {rows.map((r, i) => (
                            <tr key={i} className="bg-white hover:bg-[#FAFAFA] transition-colors">
                                <td className="px-5 py-4 text-[14px] text-[#64748B] font-light whitespace-nowrap">{r.source}</td>
                                <td className="px-5 py-4 text-[14px] text-[#005B96] font-bold whitespace-nowrap">{r.target}</td>
                                <td className="px-5 py-4 text-[14px] text-[#64748B] font-normal whitespace-nowrap">{r.preview}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Upload button */}
            <button className="w-full flex items-center justify-center gap-2.5 bg-[#005B96] hover:bg-[#076aac] text-white text-[18px] font-bold py-4 rounded-xl cursor-pointer transition-colors">
                <ImportCurve  color='white' size={24} />
                {/* <Icon icon="solar:import-outline" width="24" height="24" color='white' style={{ strokeWidth: 6 }} /> */}
                Upload &amp; Synchronize Data
            </button>
        </div>
    );
};

export default BulkDataImport;
