import React, { useState } from 'react';
import { UserPlus, MessageSquare, Inbox, RefreshCw, Bell, MousePointer2, Clock, X, Mail, Phone, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface InsightCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  status: string;
  delay?: number;
}

const InsightCard: React.FC<InsightCardProps> = ({
  icon: Icon,
  title,
  description,
  status,
}) => {
  return (
    <div
      className="bg-white rounded-[10px] p-[15px] border border-[#C1C7D1]/20 w-full max-w-[390px] h-[152px] flex flex-col justify-between group cursor-pointer transition-all font-['Manrope'] shadow-[0_1px_2px_rgba(0,0,0,0.05)] mx-auto md:mx-0"
    >
      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#DBEAFE] rounded-[5px] text-[#004370]">
            <Icon size={18} />
          </div>
          <h3 className="text-[16px] font-[600] text-[#191C1E]">{title}</h3>
        </div>
        <p className="text-[14px] text-[#595C5E] leading-[1.6]">
          {description}
        </p>
      </div>

      <div className="mt-1">
        <div className="w-full h-[1.5px] bg-[#C1C7D1]/20 mb-2" />
        <span className="text-[14px] font-medium text-[#004370]">
          {status}
        </span>
      </div>
    </div>
  );
};

const CustomerInsights: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const workflows = [
    {
      trigger: {
        icon: UserPlus,
        title: "New lead",
        description: "Triggers when a prospect fills out the website contact form.",
        status: "1.2k Active"
      },
      action: {
        icon: MessageSquare,
        title: "Send Message",
        description: "Automated personalized intro via email and calls.",
        status: "High Priority"
      }
    },
    {
      trigger: {
        icon: MessageSquare,
        title: "No Response",
        description: "Triggers after 48h of inactivity following initial outreach.",
        status: "236 Waiting"
      },
      action: {
        icon: RefreshCw,
        title: "Update Status",
        description: "Move contact to \"Active Prospect\" in CRM database.",
        status: "Syncing"
      }
    },
    {
      trigger: {
        icon: Inbox,
        title: "Reply Received",
        description: "Triggers when an email or SMS response is detected.",
        status: "105 Matches"
      },
      action: {
        icon: Bell,
        title: "Notify Sales Rep",
        description: "Push notification to Slack channel #sales-alerts.",
        status: "Instant"
      }
    }
  ];

  return (
    <div className="px-9 py-2 w-full min-h-screen font-['Manrope'] bg-[#F7F9FB] relative overflow-x-hidden">
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[60] transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div className="flex flex-col gap-1">
              <h2 className="text-[#004370] text-[22px] font-bold">Edit Action</h2>
              <p className="text-[#64748B] text-[14px]">Automation node</p>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-[#004370] rounded-full transition-colors text-[#FFFFFF]">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-10">
              <div>
                <label className="text-[15px] font-bold text-[#191C1E] block mb-5">Select Channel</label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: MessageSquare, label: 'SMS' },
                    { icon: Mail, label: 'Email' },
                    { icon: Phone, label: 'Phone' },
                    { icon: MessageCircle, label: 'WhatsApp' }
                  ].map((item, i) => (
                    <button key={i} className={`flex flex-col items-center gap-2.5 p-3 rounded-[10px] border transition-all ${i === 2 ? 'border-[#004370] bg-[#DBEAFE]/20' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'}`}>
                      <div className="text-[#004370]">
                        <item.icon size={20} />
                      </div>
                      <span className="text-[12px] font-bold text-[#595C5E]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[15px] font-bold text-[#191C1E]">Message Template</label>
                  <button className="text-[13px] font-bold text-[#1D7EBE] hover:underline">Create New</button>
                </div>
                <div className="flex items-center justify-between p-3.5 border border-[#E2E8F0] rounded-[8px] bg-[#F8FAFC] group cursor-pointer hover:border-[#CBD5E1] transition-all">
                  <span className="text-[14px] text-[#191C1E] font-medium">Welcome Email - New Leads</span>
                  <div className="flex items-center gap-2">
                    <button className="text-[#64748B] p-1.5 hover:bg-white rounded-md border border-transparent hover:border-[#E2E8F0] transition-all">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[15px] font-bold text-[#191C1E] block mb-4">Delay before sending</label>
                <div className="flex gap-4">
                  <div className="flex-[0.35] p-3 border border-[#E2E8F0] rounded-[8px] flex justify-between items-center bg-[#F8FAFC]">
                    <span className="text-[14px] text-[#191C1E] font-bold">15</span>
                    <div className="flex flex-col gap-0">
                      <button className="text-[#64748B] hover:text-[#004370]"><ChevronUp size={14} /></button>
                      <button className="text-[#64748B] hover:text-[#004370]"><ChevronDown size={14} /></button>
                    </div>
                  </div>
                  <div className="flex-1 p-3 border border-[#E2E8F0] rounded-[8px] flex justify-between items-center bg-[#F8FAFC] group cursor-pointer">
                    <span className="text-[14px] text-[#191C1E]">Minutes</span>
                    <ChevronDown size={18} className="text-[#64748B]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-5 bg-[#004370] rounded-full relative p-1 cursor-pointer">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1" />
                    </div>
                    <span className="text-[14px] font-medium text-[#595C5E]">Send within business hours only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-auto border-t border-[#E2E8F0] flex gap-4">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 h-[48px] rounded-[10px] bg-[#F1F5F9] text-[#64748B] font-bold text-[15px] hover:bg-[#E2E8F0] transition-colors"
            >
              Cancel
            </button>
            <button
              className="flex-1 h-[48px] rounded-[10px] text-white font-bold text-[15px] shadow-sm hover:shadow-lg transition-all"
              style={{
                background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)',
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 max-w-[1400px] mx-auto">
        <div>
          <h1 className="text-[30px] font-[800] text-[#0F172A] mb-2 tracking-tight">Customer Insights</h1>
          <p className="text-[14px] text-[#64748B] font-[500]">Define triggers and actions to automate your workflow</p>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="text-white rounded-[8px] text-[15px] font-[700] w-[148px] h-[40px] flex items-center justify-center transition-all"
          style={{
            background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)',
            boxShadow: '0 4px 6px -4px rgba(17, 98, 157, 0.2), 0 10px 15px -3px rgba(17, 98, 157, 0.2)'
          }}
        >
          Edit Action
        </button>
      </div>

      <div className="w-full">
        <div className="hidden md:grid grid-cols-[390px_1fr_390px] gap-0 mb-6 items-center">
          <div className="flex items-center gap-3">
            <div className="text-[#004370] p-2 bg-[#DBEAFE] rounded-[5px]">
              <Clock size={22} />
            </div>
            <span className="text-[16px] font-[700] text-[#191C1E] tracking-wider">Trigger</span>
          </div>
          <div></div>
          <div className="flex items-center gap-3">
            <div className="text-[#004370] p-2 bg-[#DBEAFE] rounded-[5px]">
              <MousePointer2 size={22} />
            </div>
            <span className="text-[16px] font-[700] text-[#191C1E] tracking-wider">Action</span>
          </div>
        </div>

        <div className="space-y-8 md:space-y-12">
          {workflows.map((workflow, index) => (
            <div key={index} className="flex flex-col md:grid md:grid-cols-[390px_1fr_390px] items-center gap-4 md:gap-0 w-full group">
              <div className="w-full flex justify-center md:justify-start">
                <InsightCard {...workflow.trigger} />
              </div>

              <div className="flex items-center justify-center relative px-0 w-full">
                <div
                  className="hidden md:block h-[1.5px] w-full max-w-[252px] rounded-[10px] relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #004370 0%, #80A1B7 33%, #BFD0DB 66%, #005B96 100%)'
                  }}
                />
                <div
                  className="md:hidden w-[1.5px] h-[32px]"
                  style={{
                    background: 'linear-gradient(180deg, #004370 0%, #80A1B7 33%, #BFD0DB 66%, #005B96 100%)'
                  }}
                />
              </div>

              <div className="w-full flex justify-center md:justify-end">
                <InsightCard {...workflow.action} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;
