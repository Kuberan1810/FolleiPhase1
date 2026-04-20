import React from 'react';
import { Download } from 'lucide-react';

const BillingTable: React.FC = () => {
  const billingData = [
    { id: "INV-2026-001", date: "Aug 02, 2026", amount: "$89.00", status: "Paid" },
    { id: "INV-2026-002", date: "Jul 02, 2026", amount: "$89.00", status: "Paid" },
    { id: "INV-2026-003", date: "Jun 02, 2026", amount: "$89.00", status: "Paid" },
    { id: "INV-2026-002", date: "Jul 02, 2026", amount: "$89.00", status: "Paid" },
    { id: "INV-2026-003", date: "Jun 02, 2026", amount: "$89.00", status: "Paid" },
  ];

  return (
    
    <div className="w-full mt-0 font-['Inter']">
       <div className="pb-6">
          <h1 className="text-[20px] font-bold text-[#191C1E] font-[Manrope]" >Recent Billing Activities</h1>
          <p className="text-[#64748B] text-[14px]">Access your complete billing and invoice history</p>
        </div>
      <div className="bg-white border border-[#F1F5F9] rounded-[24px] overflow-hidden shadow-sm">
        
       
        {/* Header Section */}
        {/* <div className="px-8 py-6 border-b border-[#F1F5F9]">
          <h2 className="text-[18px] font-bold text-[#0F172A]">Billing History</h2>
        </div> */}

        {/* Desktop Table View (Hidden on Mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse font-[Inter]">
            <thead>
              <tr className="border-b border-[#F1F5F9] bg-[#F8FAFC]/50">
                <th className="px-8 py-4 text-[18px ] font-semibold text-[#004370]">Date</th>
                <th className="px-8 py-4 text-[18px ] font-semibold text-[#004370]">Invoice Id</th>
                <th className="px-8 py-4 text-[18px ] font-semibold text-[#004370]">Amount</th>
                <th className="px-8 py-4 text-[18px ] font-semibold text-[#004370]">Status</th>
                <th className="px-8 py-4 text-[18px ] font-semibold text-[#004370]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {billingData.map((row, index) => (
                <tr key={index} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-8 py-6 text-[14px] text-[#64748B] align-middle">
                    {row.date}
                  </td>
                  <td className="px-8 py-6 text-[14px] text-[#0F172A] font-medium align-middle">
                    {row.id}
                  </td>
                  {/* Amount Column - Manrope 500, 20px */}
                  <td className="px-8 py-6 text-[20px] font-medium text-[#0F172A]  align-middle">
                    {row.amount}
                  </td>
                  <td className="px-8 py-6 align-middle">
                    <span className="px-3 py-1 bg-[#00A40B]/20 text-[#00A40B] text-[14px]  rounded-[10px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 align-middle">
                    <button className="flex items-center gap-2 text-[#004370] hover:text-[#0284C7] transition-colors text-[14px] font-semibold">
                      <Download size={16} />
                      <span>Download PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Card List) */}
        <div className="md:hidden divide-y divide-[#F1F5F9]">
          {billingData.map((row, index) => (
            <div key={index} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] text-[#64748B] mb-1">{row.date}</p>
                  <p className="text-[14px] font-bold text-[#0F172A]">{row.id}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-full">
                  {row.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[20px] font-medium text-[#0F172A] font-['Manrope']">
                  {row.amount}
                </p>
                <button className="flex items-center gap-2 text-[#004370] text-[13px] font-bold">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BillingTable;