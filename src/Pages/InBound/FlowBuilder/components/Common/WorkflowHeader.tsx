import React from 'react';
import { Clock, MousePointer2 } from 'lucide-react';

const WorkflowHeader: React.FC = () => {
  return (
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
  );
};

export default WorkflowHeader;
