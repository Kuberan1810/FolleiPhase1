import React from 'react';
import { Check, ListTodo, Calendar, FileText, Diamond, Trophy } from 'lucide-react';

const stages = [
  { id: 1, label: 'New', status: 'completed', icon: Check },
  { id: 2, label: 'Contacted', status: 'completed', icon: Check },
  { id: 3, label: 'Qualified', status: 'active', icon: ListTodo },
  { id: 4, label: 'Demo Scheduled', status: 'pending', icon: Calendar },
  { id: 5, label: 'Proposal', status: 'pending', icon: FileText },
  { id: 6, label: 'Negotiation', status: 'pending', icon: Diamond },
  { id: 7, label: 'Won', status: 'pending', icon: Trophy },
];

const ProfilePipeLine = () => {
  return (
    <div className="w-full py-6 overflow-x-auto no-scrollbar">
      <div className="min-w-[800px] flex items-center justify-between relative px-8">
        <div className="absolute left-10 right-10 top-5 h-[2px] bg-[#EDF3FD] -z-10" />
        <div className="absolute left-10 top-5 h-[2px] bg-[#004370] -z-10" style={{ width: '30%' }} />

        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="flex flex-col items-center gap-3 relative z-10 bg-[#F8FAFC] px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                stage.status === 'completed' ? 'bg-[#004370] text-white' :
                stage.status === 'active' ? 'bg-[#004370] text-white shadow-[0_0_0_5px_#E2E8F0]' :
                'bg-[#EDF3FD] text-[#64748B]'
              }`}>
                <Icon className="w-4 h-4" strokeWidth={stage.status === 'pending' ? 1.5 : 2} />
              </div>
              <span className={`text-[12px] font-bold ${
                stage.status === 'pending' ? 'text-[#A0B0C0]' : 
                stage.status === 'active' ? 'text-[#004370]' : 'text-[#191C1E]'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProfilePipeLine;
