import { useState, useRef, useEffect } from "react";
import { Mail, MessageSquare, Filter, Download, Smile, Frown, Meh } from "lucide-react";


const Activecs = () => {
  const [selectedStatus, setSelectedStatus] = useState("Filter");
  const [showFilter, setShowFilter] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allCustomers = [
    {
      name: "Julianne Smith",
      contact: "+91 98765 43210",
      issue: "Refund Request",
      issueType: "message",
      sentiment: "happy",
      status: "Open",
      statusColor: "bg-[#006A6A]/9 text-[#006A6A]",
      agent: "David .K"
    },
    {
      name: "Robert Krause",
      contact: "Robert@techcorp.com",
      issue: "Shipping Delay",
      issueType: "mail",
      sentiment: "sad",
      status: "In Progress",
      statusColor: "bg-[#BA1A1A]/8 text-[#BA1A1A]",
      agent: "Priya .M"
    },
    {
      name: "Marcus Lee",
      contact: "+1 555-0199",
      issue: "Missing Component",
      issueType: "message",
      sentiment: "neutral",
      status: "In Progress",
      statusColor: "bg-[#BA1A1A]/8 text-[#BA1A1A]",
      agent: "Sarath .K"
    },
    {
      name: "Anita Malik",
      contact: "anita@globalops.in",
      issue: "Missing Component",
      issueType: "message",
      sentiment: "neutral",
      status: "Queued",
      statusColor: "bg-[#004370]/9 text-[#004370]",
      agent: "N/A"
    }
  ];

  const customers = (selectedStatus === "Filter" || selectedStatus === "All")
    ? allCustomers
    : allCustomers.filter(c => c.status === selectedStatus);


  const statuses = ["All", "Open", "In Progress", "Queued"];

  return (
    <div className="w-full min-w-0">
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-[#0C4A6E] text-[18px] sm:text-[20px] font-bold font-manrope">Active Support Inbound</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-[#64748B] text-[12px] font-bold transition-colors cursor-pointer tracking-wider hover:text-[#0C4A6E]"
            >
              <Filter size={14} />
              {selectedStatus}
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-[#E2E8F0] rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[13px] transition-colors hover:bg-[#F8F9FA] ${selectedStatus === status ? 'text-[#0C4A6E] font-bold bg-[#F8F9FA]' : 'text-[#64748B]'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 text-[#64748B] text-[12px] font-bold transition-colors cursor-pointer tracking-wider hover:text-[#0C4A6E]">
            <Download size={14} />
            <span >Export</span>
          </button>
        </div>
      </div>


      <div className="bg-[#F2F4F6] rounded-xl border border-[#E2E8F0]/50 overflow-hidden flex flex-col">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-10 gap-2 py-6 px-5 lg:px-6 border-b border-[#E2E8F0]/50 text-[#94A3B8] text-[11px] lg:text-[13px] font-bold tracking-wider uppercase items-center">
            <div className="col-span-3">Customer</div>
            <div className="col-span-2">Issuse</div>
            <div className="col-span-2 text-center">Sentiment</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-right">Agent</div>


          </div>
          <div className="bg-white">
            {customers.map((customer, index) => (
              <div key={index} className="grid grid-cols-10 gap-2 py-[30px] px-5 lg:px-6 border-b border-[#F1F5F9] items-center ">
                <div className="col-span-3 flex items-center gap-3 lg:gap-4">
                  <div className="min-w-0">
                    <h4 className="text-[#191C1E] font-bold text-[14px] leading-[20px] tracking-normal truncate">{customer.name}</h4>
                    <p className="text-[#94A3B8] font-['Inter'] font-normal text-[11px] mt-0.5 truncate">{customer.contact}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <div className="text-[#94A3B8] shrink-0">
                    {customer.issueType === "mail" ? <Mail size={14} /> : <MessageSquare size={14} />}
                  </div>
                  <p className="text-[#191C1E] text-[12px] font-medium font-inter leading-[1.2] max-w-[80px]">
                    {customer.issue}
                  </p>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {customer.sentiment === "happy" && <Smile className="text-[#006A61]" size={20} />}
                  {customer.sentiment === "sad" && <Frown className="text-[#BA1A1A]" size={20} />}
                  {customer.sentiment === "neutral" && <Meh className="text-[#737780]" size={20} />}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold font-inter tracking-wider ${customer.statusColor}`}>
                    {customer.status}
                  </span>
                </div>
                <div className="col-span-1 text-right">
                  <p className="text-[#222222] text-[12px] font-bold font-inter">{customer.agent}</p>
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
                  <div className="text-[#9CA3AF]">
                    {customer.issueType === "mail" ? <Mail size={14} /> : <MessageSquare size={14} />}
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-[14px]">{customer.name}</h4>
                    <p className="text-[#9CA3AF] text-[12px]">{customer.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold font-inter tracking-wider ${customer.statusColor}`}>
                    {customer.status}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between pl-8 text-[12px]">
                <div className="flex items-start gap-2">
                  <span className="text-[#191C1E] font-bold font-inter leading-tight max-w-[80px]">{customer.issue}</span>
                  <div className="mt-0.5">
                    {customer.sentiment === "happy" && <Smile className="text-[#006A61]" size={20} />}
                    {customer.sentiment === "sad" && <Frown className="text-[#BA1A1A]" size={20} />}
                    {customer.sentiment === "neutral" && <Meh className="text-[#737780]" size={20} />}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-700 font-bold">Agent: {customer.agent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Footer */}
        <div className=" py-3.5 px-5 lg:px-6 flex justify-between items-center text-[10px] lg:text-[11px] font-bold tracking-widest text-[#A6AEB8] uppercase bg-[#F2F4F6] border-t border-[#F1F5F9]">
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