import React from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Flame, 
  Sun, 
  Snowflake, 
  Trash2 
} from 'lucide-react';
import type { Lead } from '../Leads';
import { getSourceIcon } from './LeadsTable';

type LeadDrawerProps = {
  lead: Lead;
  onClose: () => void;
  onDelete: (id: string) => void;
};

const LeadDrawer: React.FC<LeadDrawerProps> = ({ lead, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-999 flex justify-end animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-1000 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {lead.avatar ? (
              <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${lead.bgColor} ${lead.textColor}`}>
                {lead.initials}
              </div>
            )}
            <div>
              <h3 className="text-[17px] font-bold text-[#191C1E]">{lead.name}</h3>
              <span className="text-[12px] text-slate-500 font-medium">{lead.company || 'Individual Lead'}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Email Address</span>
              <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {lead.email}
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Phone Number</span>
              <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {lead.phone}
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Lead Score</span>
              <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                  lead.temperature === 'Hot' ? 'text-red-500' : lead.temperature === 'Warm' ? 'text-amber-500' : 'text-blue-500'
                }`}>
                  {lead.temperature === 'Hot' ? <Flame className="w-3.5 h-3.5" /> :
                   lead.temperature === 'Warm' ? <Sun className="w-3.5 h-3.5" /> :
                   <Snowflake className="w-3.5 h-3.5" />}
                </div>
                {lead.score}% ({lead.temperature})
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Source channel</span>
              <div className="text-slate-700 text-xs font-semibold capitalize flex items-center gap-1.5">
                {getSourceIcon(lead.source)}
                {lead.source}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Internal Notes</h4>
            <div className="p-4 border border-slate-100 bg-[#FAFBFD] rounded-2xl text-[13px] text-slate-600 leading-relaxed">
              {lead.notes || 'No notes added for this lead yet. Write notes in the form below.'}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              Recent Activity
            </h4>
            <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-4">
              <div className="relative">
                <span className="absolute left-[-33px] top-0 w-5 h-5 bg-[#004370] rounded-full border-4 border-white flex items-center justify-center text-white" />
                <div className="flex justify-between items-baseline gap-2">
                  <p className="text-xs font-semibold text-slate-700">{lead.activityType} completed</p>
                  <span className="text-[10px] font-medium text-slate-400 shrink-0">{lead.activityTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer text-center"
          >
            Close Profile
          </button>
          <button
            onClick={() => onDelete(lead.id)}
            className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Delete Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDrawer;
