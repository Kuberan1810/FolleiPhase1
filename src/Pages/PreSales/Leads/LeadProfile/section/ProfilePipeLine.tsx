import React from 'react';
import { Check, ClipboardEdit, Users, FileText, Handshake, Trophy } from 'lucide-react';

const stages = [
  { id: 1, label: 'New', status: 'completed', icon: Check },
  { id: 2, label: 'Contacted', status: 'completed', icon: Check },
  { id: 3, label: 'Qualified', status: 'active', icon: ClipboardEdit },
  { id: 4, label: 'Demo Scheduled', status: 'pending', icon: Users },
  { id: 5, label: 'Proposal', status: 'pending', icon: FileText },
  { id: 6, label: 'Negotiation', status: 'pending', icon: Handshake },
  { id: 7, label: 'Won', status: 'pending', icon: Trophy },
];

const ProfilePipeLine = () => {
  // Assuming 7 stages, index 0 to 6. Active is index 2.
  // 6 segments total. 2 segments filled = 33.33%.
  const fillPercentage = '33.33%';

  return (
    <div className="w-full py-8 overflow-x-auto no-scrollbar">
      <div className="min-w-[700px] max-w-5xl mx-auto flex items-start justify-between relative">
        
        {/* Background Line container */}
        <div className="absolute left-[48px] right-[48px] top-[19px] h-[3px] bg-[#E5EEFF] z-0">
          {/* Active Filling Line */}
          <div className="absolute left-0 top-0 bottom-0 bg-[#004370] transition-all duration-500" style={{ width: fillPercentage }} />
        </div>

        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = stage.status === 'active';
          const isCompleted = stage.status === 'completed';
          const isPending = stage.status === 'pending';

          return (
            <div key={stage.id} className="flex flex-col items-center relative z-10 w-24">
              <div 
                className={`rounded-full flex items-center justify-center transition-all ${
                  isCompleted ? 'w-10 h-10 bg-[#004370] text-white' :
                  isActive ? 'w-[48px] h-[48px] bg-[#004370] text-white shadow-[0_0_0_6px_white,0_4px_15px_rgba(0,0,0,0.15)] -mt-1' :
                  'w-10 h-10 bg-[#EAF2FF] text-[#464555]'
                }`}
              >
                <Icon className={isActive ? "w-5 h-5" : "w-4 h-4"} strokeWidth={isPending ? 1.5 : 2.5} />
              </div>
              
              <span 
                className={`mt-4 text-[14px] text-center whitespace-nowrap ${
                  isCompleted ? 'text-[#191C1E] font-bold' : 
                  isActive ? 'text-[#004370] font-bold' : 
                  'text-[#464555] font-medium '
                }`}
              >
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
