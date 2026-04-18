import { Plus, Mail } from "lucide-react";

const Activecs = () => {
  const customers = [
    {
      initials: "RS",
      bgColor: "bg-[#EBF4FE]",
      textColor: "text-[#0B3A64]",
      name: "Ravi Sharma",
      contact: "+91 98765 43210",
      source: "Website Hook",
      status: "NEW",
      statusColor: "bg-[#C4DDFE] text-[#0B3A64]",
      followUpTime: "Today, 4:30 PM",
      followUpNote: "Call regarding pricing"
    },
    {
      initials: "PM",
      bgColor: "bg-[#DFF5E8]",
      textColor: "text-[#0F5A3B]",
      name: "Priya Mehta",
      contact: "priya.m@techcorp.com",  
      source: "Referral",
      status: "CONVERTED",
      statusColor: "bg-[#A7F3D0] text-[#0F5A3B]",
      followUpTime: "Oct 28, 10:00 AM",
      followUpNote: "Onboarding session"
    },
    {
      initials: "JD",
      bgColor: "bg-[#FFECD6]",
      textColor: "text-[#9C4A00]",
      name: "John Doe",
      contact: "+1 555-0199",
      source: "Direct Inbound",
      status: "CONTACTED",
      statusColor: "bg-[#E5E9F0] text-[#4B5563]",
      followUpTime: "Tomorrow, 9:15 AM",
      followUpNote: "Demo Follow-up"
    },
    {
      initials: "AM",
      bgColor: "bg-[#FDE2E4]",
      textColor: "text-[#9F1239]",
      name: "Anita Malik",
      contact: "anita@globalops.in",
      source: "Cold Outreach",
      status: "NOT",
      statusColor: "bg-[#FDE2E4] text-[#9F1239]",
      followUpTime: "N/A",
      followUpNote: "Marked inactive"
    }
  ];

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-[#191C1E] text-[20px] font-bold font-manrope mb-0.5 sm:mb-1">Active Customers</h2>
          <p className="text-[#6B7A90] text-[13px] sm:text-[14px]">Managing 48 active leads this hour</p>
        </div>
        <button className="w-full sm:w-auto bg-[#004370] text-white h-[40px] px-5 rounded flex items-center justify-center gap-2 text-[13px] sm:text-[14px] font-semibold hover:bg-[#003152] transition-colors cursor-pointer shadow-sm shrink-0">
          <Plus size={14} strokeWidth={2.5} />
          Add New Customer
        </button>
      </div>

      <div className="bg-[#F8F9FA] rounded-xl border border-[#EEF2F5] overflow-hidden flex flex-col">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-10 gap-2 py-2 px-5 lg:px-6 border-b border-[#EEF2F5] text-[#9CA3AF] text-[10px] lg:text-[11px] font-bold tracking-wider uppercase items-center">
            <div className="col-span-3">Customer</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Follow-Up</div>
            <div className="col-span-1 text-right"></div>
          </div>
          <div className="bg-white">
            {customers.map((customer, index) => (
              <div key={index} className="grid grid-cols-10 gap-2 py-[34.5px] px-5 lg:px-6 border-b border-[#F1F5F9] items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-3 flex items-center gap-3 lg:gap-4">
                  <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-[12px] lg:text-[13px] shrink-0 ${customer.bgColor} ${customer.textColor}`}>
                    {customer.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[#191C1E] font-bold text-[14px] leading-[20px] tracking-normal truncate">{customer.name}</h4>
                    <p className="text-[#6B7A90] font-['Inter'] font-normal text-[11px] mt-0.5 truncate">{customer.contact}</p>
                  </div>
                </div>
                <div className="col-span-2 pr-2">
                  <p className="text-[#414750] text-[12px] font-medium font-inter leading-tight">{customer.source}</p>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold font-inter uppercase tracking-wider ${customer.statusColor}`}>
                    {customer.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-900 font-medium text-[12px] lg:text-[13px]">{customer.followUpTime}</p>
                  <p className="text-[#9CA3AF] text-[10px] lg:text-[11px] italic">{customer.followUpNote}</p>
                </div>
                <div className="col-span-1 flex justify-end items-center">
                  <button className="p-1.5 lg:p-2 text-[#C0C8D1] hover:text-[#0B3A64] transition-colors cursor-pointer">
                    <Mail size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden bg-white divide-y divide-[#EEF2F5]">
          {customers.map((customer, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${customer.bgColor} ${customer.textColor}`}>
                    {customer.initials}
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-[14px]">{customer.name}</h4>
                    <p className="text-[#9CA3AF] text-[12px]">{customer.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold font-inter uppercase tracking-wider ${customer.statusColor}`}>
                    {customer.status}
                  </span>
                  <button className="p-1.5 text-[#C0C8D1] hover:text-[#0B3A64] transition-colors cursor-pointer">
                    <Mail size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pl-12 text-[12px]">
                <span className="text-[#414750] font-medium font-inter">{customer.source}</span>
                <div className="text-right">
                  <p className="text-gray-700 font-medium">{customer.followUpTime}</p>
                  <p className="text-[#9CA3AF] text-[11px] italic">{customer.followUpNote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className=" py-3.5 px-5 lg:px-6 flex justify-between items-center text-[10px] lg:text-[11px] font-bold tracking-widest text-[#A6AEB8] uppercase bg-white border-t border-[#F1F5F9]">
          <div>Showing 1-10 of 2,410</div>
          <div className="flex gap-3 lg:gap-4">
            <button className="hover:text-[#0B3A64] transition-colors cursor-pointer">Previous</button>
            <button className="hover:text-[#0B3A64] transition-colors cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activecs;