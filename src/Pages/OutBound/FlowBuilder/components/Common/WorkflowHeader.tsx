import React from 'react';
import { Clock, Zap, NetworkIcon, Activity } from 'lucide-react';
import { Hierarchy } from 'iconsax-react';

const WorkflowHeader: React.FC = () => {
  return (
    <div className="hidden md:grid grid-cols-[390px_1fr_390px] gap-0 mb-6 items-center pl-10 pr-8">
      <div className="flex items-center gap-3">
        <div className="text-[#004370] p-2 bg-[#DBEAFE] rounded-[5px]">
          <Hierarchy size={22} variant="Linear" color="#004370" />
        </div>
        <span className="text-[16px] font-[700] text-[#191C1E] tracking-wider">Outreach steps</span>
      </div>
      <div></div>
      <div className="flex items-center gap-3">
        <div className="text-[#004370] p-2 bg-[#DBEAFE] rounded-[5px]">
          <Activity size={22} />
        </div>
        <span className="text-[16px] font-[700] text-[#191C1E] tracking-wider">Automation</span>
      </div>
    </div>
  );
};

export default WorkflowHeader;
