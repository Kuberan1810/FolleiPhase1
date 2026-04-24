import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NoResponseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoResponseDrawer: React.FC<NoResponseDrawerProps> = ({ isOpen, onClose }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const allLeads = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', status: 'No Response', initials: 'RS' },
    { name: 'John Doe', phone: '+1 555-0199', status: 'Interested', initials: 'JD' },
    { name: 'Anita Malik', phone: 'anita@globalops.in', status: 'No Response', initials: 'AM' },
    { name: 'Priya Mehta', phone: 'priyam@techcorp.com', status: 'Not Interested', initials: 'PM' },
    { name: 'Suresh Raina', phone: '+91 92837 46554', status: 'No Response', initials: 'SR' },
    { name: 'Megha Gupta', phone: 'megha@example.com', status: 'Interested', initials: 'MG' },
    { name: 'Rahul Verma', phone: '+91 98123 45678', status: 'Not Interested', initials: 'RV' },
  ];

  const filteredLeads = allLeads.filter(lead =>
    activeTab === 'All' || lead.status === activeTab
  );

  const visibleLeads = showAll ? filteredLeads : filteredLeads.slice(0, 4);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      const onMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      };
      const onMouseLeave = () => {
        isDown = false;
      };
      const onMouseUp = () => {
        isDown = false;
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 2;
        el.scrollLeft = scrollLeft - walk;
      };

      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('mouseleave', onMouseLeave);
      el.addEventListener('mouseup', onMouseUp);
      el.addEventListener('mousemove', onMouseMove);

      return () => {
        el.removeEventListener('mousedown', onMouseDown);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.removeEventListener('mouseup', onMouseUp);
        el.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300 cursor-pointer"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out rounded-l-[10px] ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="pt-[30px] px-[20px] flex justify-between items-start bg-white border-b border-[#5A5A5A]/20 rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">No Response</h2>
              <p className="text-[#64748B] text-[12px]">Leads without response after outreach</p>
            </div>
            <button
              onClick={onClose}
              className="w-[20px] h-[20px] bg-[#004370] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[20px] no-scrollbar bg-white">
            <div className="mb-6">
              <h3 className="text-[12px] font-bold text-[#000000] mb-3">Response Overview</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'TOTAL LEADS', value: allLeads.length.toString() },
                  { label: 'NOT RESPOND', value: allLeads.filter(l => l.status === 'No Response').length.toString() },
                  { label: 'INTERESTED', value: allLeads.filter(l => l.status === 'Interested').length.toString() },
                  { label: 'NOT INTERESTED', value: allLeads.filter(l => l.status === 'Not Interested').length.toString() }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#F2F4F6] p-[5px] rounded-[5px] flex flex-col items-center">
                    <span className="text-[8px] font-bold text-[#64748B] mb-1 text-center whitespace-nowrap">{stat.label}</span>
                    <span className="text-[16px] font-extrabold text-[#004370]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[12px] font-bold text-[#000000]">Lead Status List</h3>
              </div>

              <div
                ref={scrollRef}
                className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar cursor-grab active:cursor-grabbing"
              >
                {['All', 'Interested', 'Not Interested', 'No Response'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-[5px] text-[14px] font-bold transition-all 
                      ${activeTab === tab
                        ? 'bg-[#004370] text-white'
                        : 'text-[#64748B] hover:bg-slate-50'} cursor-pointer`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {visibleLeads.length > 0 ? (
                  visibleLeads.map((item, i) => (
                    <div key={i} className="p-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[12px] font-bold ${[
                            'bg-blue-100 text-blue-700',
                            'bg-purple-100 text-purple-700',
                            'bg-green-100 text-green-700',
                            'bg-amber-100 text-amber-700',
                            'bg-pink-100 text-pink-700',
                            'bg-indigo-100 text-indigo-700',
                            'bg-emerald-100 text-emerald-700',
                            'bg-rose-100 text-rose-700',
                            'bg-sky-100 text-sky-700',
                            'bg-orange-100 text-orange-700'
                          ][i % 10]}`}>
                            {item.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12px] font-bold text-[#191C1E]">{item.name}</span>
                            <span className="text-[11px] text-[#94A3B8]">{item.phone}</span>
                          </div>
                        </div>
                        <span className={`text-[6px] font-bold px-2 py-0.5 rounded-[5px] tracking-tighter ${item.status === 'Interested' ? 'bg-green-100 text-green-700' :
                          item.status === 'No Response' ? 'bg-[#DFE0E0] text-[#6B7280]' :
                            item.status === 'Not Interested' ? 'bg-[#FEE2E2] text-[#BA1A1A]' :
                              'bg-[#236C11]/30 text-[#115700]'
                          }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-[#F4F6F8] rounded-[5px]">
                    <p className="text-[#64748B] text-[13px]">No leads found in this category.</p>
                  </div>
                )}
              </div>

              {filteredLeads.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full mt-5 h-[48px] text-[13px] font-bold text-[#878788] bg-[#E6E7E9] rounded-[5px] hover:bg-[#DEDFE1] transition-colors cursor-pointer"
                >
                  {showAll ? 'See less' : 'See more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoResponseDrawer;
