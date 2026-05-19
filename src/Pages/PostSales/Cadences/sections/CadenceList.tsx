import React from 'react';
import { Plus } from 'lucide-react';
import type { Cadence } from '../Cadences';

interface CadenceListProps {
  cadences: Cadence[];
  selectedId: string;
  setSelectedId: (id: string) => void;
}

const CadenceList: React.FC<CadenceListProps> = ({ cadences, selectedId, setSelectedId }) => {
  return (
    <div className="w-[320px] border-r border-[#EBEBEB] flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {cadences.map((cadence) => (
          <div
            key={cadence.id}
            onClick={() => setSelectedId(cadence.id)}
            className={`p-4 m-3 cursor-pointer outline-none select-none ${selectedId === cadence.id ? 'bg-[#EFF6FF] rounded-[8px] border-[1px] border-[#DBEAFE]' : ''
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`text-[12px] font-bold ${cadence.status === 'ACTIVE'
                  ? 'text-[#004370]'
                  : cadence.status === 'PAUSED'
                    ? 'text-[#94A3B8]'
                    : 'text-[#FB923C]'
                  }`}
              >
                {cadence.status}
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium">{cadence.updatedTime}</span>
            </div>
            <h3 className="text-[14px] font-bold text-[#0F172A] mb-1">{cadence.title}</h3>
            <p className="text-[12px] text-[#64748B]">
              {cadence.leadsCount} leads • {cadence.stepsCount} steps
            </p>
          </div>
        ))}
      </div>
      <div className="p-4">
        <button className="w-full py-[10px] bg-[#004370] text-white font-bold text-[14px] rounded-[4px] flex items-center justify-center gap-2 hover:bg-[#004370]/90 cursor-pointer transition-all focus:outline-none">
          <Plus size={16} />
          Create Cadence
        </button>
      </div>
    </div >
  );
};

export default CadenceList;
