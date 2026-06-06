import React from 'react';
import { History, FileText, Plus, Pencil } from 'lucide-react';

const PaymentMethod: React.FC = () => {
  return (
    <div className="w-full py-8 px-4 max-w-7xl mx-auto font-[Inter] animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Left Section: Saved Payment Method */}
        {/* <div className="flex-[2]  bg-white rounded-[24px] p-8 border border-[#E2E8F0] "> */}
        <div className='BoxStyle'>
          <h2 className=" flex items-start text-[20px] font-bold text-[#0F172A] mb-2">Saved Payment Method</h2>
          <p className="flex 
           text-[#64748B] text-[14px] mb-8">
            Manage your default payment source for automated renewals and recurring usage fees.
          </p>

          {/* Credit Card UI matching Figma */}
          <div className="relative w-full max-w-[420px] aspect-[1.6/1] bg-[#191C1E] rounded-[20px] p-8 text-white shadow-2xl mb-10 overflow-hidden group">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-semibold">Card Holder</p>
                <p className="text-[18px] font-bold tracking-tight">ALEXANDER R. CURATOR</p>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded text-[12px] font-bold tracking-widest border border-white/10">VISA</div>
            </div>

            <div className="mb-10">
              <p className="text-[24px] tracking-[0.25em] font-medium text-white/90">
                **** **** **** 4242
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-semibold">Expiry</p>
                <p className="text-[16px] font-bold">12/26</p>
              </div>
              <div className="opacity-80">
                 <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-[#103960] text-white px-6 py-3 rounded-[12px] font-bold text-[14px] hover:bg-[#0c2d4d] transition-all shadow-lg shadow-blue-900/10 cursor-pointer">
              <Pencil size={16} />
              Update Card
            </button>
            <button className="flex items-center gap-2 bg-[#F1F5F9] text-[#475569] px-6 py-3 rounded-[12px] font-bold text-[14px] hover:bg-[#E2E8F0] transition-all cursor-pointer">
              <Plus size={16} />
              Add New Payment Method
            </button>
          </div>
        </div>

        {/* Right Section: Sidebar Info */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Secure Payments - Figma Match: Icon beside Title + Centered Content */}
          <div className="bg-[#F8FAFC] rounded-[24px] p-8 border border-[#E2E8F0]  ">
            <div className="flex  gap-3 mb-5">
              <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-[#F1F5F9]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold text-[#0F172A] tracking-tight mt-2">Secure Payments</h3>
            </div>
            
            <p className="text-[#64748B] text-[14px] leading-relaxed  mb-6">
              Your payment information is encrypted and processed via our secure partner. We never store your full card details on our servers.
            </p>
            
            <div className="flex gap-2">
              {['VISA', 'MC', 'AMEX'].map(brand => (
                <span key={brand} className="text-[8px] font-semibold text-[#191C1E] border border-[#E2E8F0] px-3 py-1.5 rounded bg-white shadow-sm tracking-tighter">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[24px] p-8 border border-[#E2E8F0] flex flex-col items-start shadow-sm">
            <h3 className="text-[16px] font-bold text-[#0F172A] items-start mb-6 ">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                <History size={20} className="text-[#64748B] group-hover:text-[#103960]" />
                <span className="text-[14px] font-medium text-[#475569]">Transaction History</span>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                <FileText size={20} className="text-[#64748B] group-hover:text-[#103960]" />
                <span className="text-[14px] font-medium text-[#475569]">Download Last Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>

     <div className="p-2 relative w-full">
  {/* Flex-col and items-start ensures everything stays on the left */}
  <div className="flex flex-col items-start gap-y-6 max-w-4xl">
    
    {/* Billing Email Section */}
    <div className="w-full flex flex-col items-start gap-1.5">
      <label className="text-[12px] font-medium text-[#414755] capitalize">
        Billing Email
      </label>
      <input
        type="email"
        placeholder="alexander@curator.com"
        disabled
        className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none cursor-not-allowed"
      />
    </div>

    {/* Billing Phone Number Section */}
    <div className="w-full flex flex-col items-start gap-1.5">
      <label className="text-[12px] font-medium text-[#414755] capitalize">
        Billing Phone Number
      </label>
      <input
        type="tel"
        placeholder="+1 (555) 000-0000"
        className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none"
      />
    </div>

    {/* Transaction ID Section */}
    <div className="w-full flex flex-col items-start gap-1.5">
      <label className="text-[12px] font-medium text-[#414755] capitalize">
        Transaction-ID
      </label>
      <input
        type="text"
        placeholder="TXN-987654321"
        className="w-full px-[16px] py-[12px] border-b-[0.5px] border-[#000000]/15 rounded-[8px] bg-[#F7F9FB] text-[14px] text-[#191C1D] outline-none"
      />
    </div>

    {/* Footer Section */}
    <div className="w-full mt-6 pt-8 border-t border-[#F1F5F9] flex justify-between items-center">
      <p className="text-[13px] text-[#94A3B8]">
        Changes will apply to your next billing cycle.
      </p>
      <button className="text-[#DC2626] font-bold text-[14px] hover:bg-red-50 px-6 py-2 rounded-lg transition-all border border-transparent hover:border-red-100 cursor-pointer">
        Cancel Subscription
      </button>
    </div>
  </div>
</div>
    </div>
  );
};

export default PaymentMethod;
