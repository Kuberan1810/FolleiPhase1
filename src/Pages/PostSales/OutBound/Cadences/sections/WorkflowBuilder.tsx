import React from 'react';
import { Mail, Phone, MessageSquare, Clock, Plus, MoreVertical, CheckCircle, Cloud, Trash2 } from 'lucide-react';
import type { Cadence } from '../Cadences';

interface WorkflowBuilderProps {
  cadence: Cadence;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ cadence }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5 text-[#004370] " />;
      case 'call': return <Phone className="w-5 h-5 text-[#004370]" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-[#004370]" />;
      default: return <Mail className="w-5 h-5 text-[#004370]" />;
    }
  };

  if (!cadence.workflow || cadence.workflow.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-[#F8FAFC]">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-[18px] font-bold text-[#1E293B] mb-2">No Steps in Workflow</h3>
          <p className="text-[14px] text-[#64748B] max-w-[300px] mb-6">
            This cadence is empty. Start building your outreach sequence by adding steps.
          </p>
          <button className="py-2.5 px-4 bg-[#004370] text-white font-bold text-[14px] rounded-[12px] flex items-center gap-2 hover:bg-[#004370]/90 cursor-pointer transition-all">
            <Plus size={16} /> Add First Step
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="p-8 flex flex-col items-center w-full">
          <div className="w-full max-w-[600px] relative flex flex-col items-center pb-10">
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-full px-[24px] py-[12px] flex items-center gap-2 mb-8 relative z-10">
              <span className="w-[8px] h-[8px] rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Start Flow</span>
              <span className="text-[14px] font-semibold text-[#1E293B]">Lead Added to Segment</span>
            </div>

            {/* Connector Line */}
            <div className="absolute top-[40px] bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#E2E8F0] z-0"></div>

            {/* Workflow Steps */}
            {cadence.workflow.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <div className="w-full bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative z-10 mb-6 group hover:border-[#CBD5E1] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-2 border-2 border-[#004370] rounded-[12px]">
                      {getIcon(step.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-0.5">
                            {step.day}
                          </span>
                          <h4 className="text-[16px] font-semibold text-[#0F172A]">{step.title}</h4>
                        </div>
                        <div className="flex items-center gap-3">
                          {step.stats && (
                            (() => {
                              const match = step.stats.match(/^(.*?)\s*(\d+%|\d+)$/);
                              const label = match ? match[1] : 'STATS';
                              const value = match ? match[2] : step.stats;
                              return (
                                <div className="flex flex-col items-end leading-tight">
                                  <span className="text-[10px] font-normal text-[#94A3B8] uppercase tracking-wider">{label}</span>
                                  <span className="text-[14px] font-bold text-[#059669]">{value}</span>
                                </div>
                              );
                            })()
                          )}
                          <button className="text-[#94A3B8] hover:text-[#64748B] cursor-pointer">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>

                      {step.type === 'call' ? (
                        <div className="bg-[#EFF6FF] rounded-[20px] p-3 text-[14px] font-medium text-[#004370] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
                          {step.content}
                        </div>
                      ) : (
                        <p className="text-[14px] text-[#475569] bg-[#F8FAFC] p-3 rounded-[8px] border border-[#F1F5F9] font-medium">
                          {step.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {index < cadence.workflow.length - 1 && (
                  <div className="relative z-10 my-4 flex flex-col items-center gap-4">
                    {step.waitTime && (
                      <div className="bg-#F1F5F9] text-[#64748B] text-[12px] font-bold px-3 py-1 rounded-[4px] flex items-center gap-1.5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
                        <Clock size={14} />
                        {step.waitTime}
                      </div>
                    )}
                    <button className="w-8 h-8 rounded-[12px] bg-[#F1F5F9] border-dashed border-[2px] border-[#E2E8F0] hover:border-[#004370] flex items-center justify-center text-[#94A3B8] hover:text-[#004370] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all cursor-pointer focus:outline-none">
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Add Last Step Button */}
            <button className="mt-4 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] hover:border-[#004370] flex items-center justify-center text-[#94A3B8] hover:text-[#004370] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative z-10 transition-all cursor-pointer focus:outline-none">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Bar inside the scrollable area */}
        <div className="bg-white px-8 py-4 border-t border-[#EBEBEB] flex justify-between items-center w-full mt-auto">
          <div className="flex items-center gap-6 text-[13px] text-[#64748B]">
            <div className="flex items-center gap-1.5 text-[#10B981] font-bold">
              <CheckCircle size={16} />
              <span>No template errors</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Cloud size={16} />
              <span>Auto-saved 12:45 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[14px] font-bold text-[#64748B] hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1.5">
              <Trash2 size={16} />
              Delete
            </button>
            <button className="py-2.5 px-6 bg-[#004370] text-white font-bold text-[14px] rounded-[12px] hover:bg-[#004370]/90 cursor-pointer transition-all shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:outline-none">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
