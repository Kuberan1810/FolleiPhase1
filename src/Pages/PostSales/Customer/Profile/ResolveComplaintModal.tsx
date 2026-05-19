import React, { useState } from 'react';
import { ShieldAlert, X, Clock, ChevronDown, Plus } from 'lucide-react';

interface ResolveComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResolveComplaintModal: React.FC<ResolveComplaintModalProps> = ({ isOpen, onClose }) => {
  const [resolutionType, setResolutionType] = useState('Refund');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [resolutionStatus, setResolutionStatus] = useState('In Progress');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 p-4 py-10 sm:py-12 backdrop-blur-[2px]">
      <div className="bg-white rounded-[20px] w-full max-w-[560px] flex flex-col font-manrope shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[70vh] sm:max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start p-5 pb-4 border-b border-slate-100">
          <div className="flex gap-4 items-center">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-[#FFEBEB] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-[#BA1A1A] stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[#111827] leading-[25px] tracking-normal">Resolve Complaint</h2>
              <p className="text-[12px] font-medium text-[#6B7280] leading-[16px] uppercase tracking-[0.6px]">CASE #COMP-8821 • CLOUDSCALE AI</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer rounded-full hover:bg-slate-50 mt-1">
            <X className="w-6 h-6 stroke-2" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-5 overflow-y-auto max-h-[40vh] sm:max-h-[70vh]">
          
          {/* Complaint Summary */}
          <div>
            <h3 className="text-[10px] font-bold text-[#9CA3B8] leading-[15px] uppercase tracking-[1px] mb-2">Complaint Summary</h3>
            <div className="rounded-[12px] border border-slate-200 p-5">
              <div className="flex justify-between items-start mb-2.5">
                <h4 className="text-[14px] font-bold text-[#1F2937] leading-[20px] tracking-normal">Billing Discrepancy: Double Charge February</h4>
                <span className="px-2.5 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-[-0.25px] leading-[15px] text-[#E20400] bg-[#FFEBEB] whitespace-nowrap">High Priority</span>
              </div>
              <p className="text-[12px] font-normal text-[#4B5563] leading-[19.5px] tracking-normal">Customer reported a double charge for the month of February on their Enterprise subscription. They are requesting an immediate refund and an explanation of the automated billing logic error.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Resolution Status */}
            <div>
              <h3 className="text-[10px] font-bold text-[#9CA3B8] leading-[15px] uppercase tracking-[1px] mb-2">Resolution Status</h3>
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full text-left rounded-[10px] border px-4 py-3 text-[14px] font-medium text-[#0F172A] outline-none bg-white cursor-pointer transition-colors flex justify-between items-center ${isDropdownOpen ? 'border-[#004370] ring-1 ring-[#004370]' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {resolutionStatus}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)} 
                    />
                    <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-200 rounded-[10px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden z-20 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      {['In Progress', 'Resolved'].map(status => (
                        <button
                          key={status}
                          onClick={() => {
                            setResolutionStatus(status);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors cursor-pointer ${
                            resolutionStatus === status 
                              ? 'bg-slate-50 text-[#004370] font-semibold' 
                              : 'text-slate-700 hover:bg-slate-50 font-medium'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* SLA & Timing */}
            <div>
              <h3 className="text-[10px] font-bold text-[#9CA3B8] leading-[15px] uppercase tracking-[1px] mb-2">SLA & Timing</h3>
              <div className="rounded-[10px] bg-slate-50 border border-slate-100 px-4 py-[10px] flex items-center gap-3">
                <Clock className="w-[18px] h-[18px] text-[#0F172A]" />
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.5px] leading-[10px]">Time to Resolve</p>
                  <p className="text-[13px] font-medium text-[#0F172A] leading-[16px]">6h 12m</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Type */}
          <div>
            <h3 className="text-[10px] font-bold text-[#9CA3B8] leading-[15px] uppercase tracking-[1px] mb-2">Resolution Type</h3>
            <div className="grid grid-cols-4 gap-3">
              {['Refund', 'Apology', 'Credit', 'Other'].map(type => (
                <button
                  key={type}
                  onClick={() => setResolutionType(type)}
                  className={`py-2.5 rounded-[10px] border text-[13px] font-medium transition-colors cursor-pointer ${
                    resolutionType === type 
                      ? 'border-[#004370] text-[#004370] bg-[#F8F8FE] shadow-[0_0_0_1px_#004370]' 
                      : 'border-slate-200 text-[#475569] hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution Notes */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-[10px] font-bold text-[#9CA3B8] leading-[15px] uppercase tracking-[1px]">Resolution Notes (Markdown Supported)</h3>
              <p className="text-[10px] font-medium text-[#94A3B8] flex items-center gap-[6px]">
                <span className="w-[3px] h-[14px] bg-slate-300 rounded-full"></span>
                External visibility: Private
              </p>
            </div>
            <textarea 
              rows={4} 
              placeholder="Describe how the complaint was handled and the final outcome..."
              className="w-full rounded-[12px] border border-slate-200 p-4 text-[13px] outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370] resize-none placeholder:text-[#94A3B8] transition-all"
            ></textarea>
          </div>

          {/* Attachments */}
          <div>
            <h3 className="text-[10px] font-bold text-[#9CA3B8] leading-[15px] uppercase tracking-[1px] mb-2">Attachments</h3>
            <div className="h-[60px] rounded-[10px] border-2 border-dashed border-slate-200 bg-transparent flex items-center justify-center cursor-pointer transition-colors hover:border-slate-300">
              <Plus className="w-5 h-5 text-slate-400" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 pt-3 flex justify-between items-center border-t border-transparent">
          <button onClick={onClose} className="px-6 py-2.5 rounded-[10px] border border-slate-200 text-[14px] font-semibold text-[#475569] hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
            Cancel
          </button>
          <div className="flex items-center gap-6">
            <button className="text-[13px] font-semibold text-[#94A3B8] hover:text-slate-600 transition-colors cursor-pointer">
              Save as Draft
            </button>
            <button className="px-[28px] py-[11px] rounded-[10px] bg-[#004370] text-white text-[14px] font-bold hover:bg-[#003355] transition-colors shadow-sm cursor-pointer active:scale-95">
              Resolve Complaint
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResolveComplaintModal;
