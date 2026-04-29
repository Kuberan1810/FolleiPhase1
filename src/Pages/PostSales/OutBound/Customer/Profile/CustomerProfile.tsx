import React from 'react';
import { 
  PhoneForwarded, 
  Mail, 
  MessageSquareText, 
  FilePlusCorner,
} from 'lucide-react';
import CustomerSidebar from './CustomerSidebar';
import CustomerActivity from './CustomerActivity';

const CustomerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('All Activity');

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-white font-manrope overflow-x-hidden">
      
      {/* Left Sidebar */}
      <CustomerSidebar />

      {/* Main Content Area */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 p-4 sm:p-6 lg:p-8 overflow-hidden">
        
        {/* Top Header / Actions */}
        <div className="bg-[#F8F8FE] rounded-2xl px-4 py-3 sm:px-[15px] sm:py-[10px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {[PhoneForwarded, Mail, MessageSquareText].map((Icon) => (
              <button key={Icon.toString()} className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-white text-[#004370] flex items-center justify-center transition-all duration-300 border border-slate-100 cursor-pointer hover:bg-slate-50 active:scale-95 shrink-0">
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-[10px] bg-white text-[13px] font-bold text-[#004370] border border-slate-100 transition-all duration-300 cursor-pointer hover:bg-slate-50 active:scale-95">
            <FilePlusCorner className="w-5 h-5" /> Add Note
          </button>
        </div>

        {/* Activity Tabs */}
        <div className="border-b border-slate-200 flex gap-6 sm:gap-8 mb-2 overflow-x-auto no-scrollbar">
          {['All Activity', 'Emails', 'Calls', 'Notes'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[13px] sm:text-[14px] font-semibold transition-all duration-300 relative cursor-pointer whitespace-nowrap ${activeTab === tab ? 'text-[#004370]' : 'text-slate-400'} leading-[20px]`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#004370] rounded-t-full"></div>}
            </button>
          ))}
        </div>

        {/* Timeline Component */}
        <CustomerActivity activeTab={activeTab} />

      </div>

    </div>
  );
};

export default CustomerProfile;
