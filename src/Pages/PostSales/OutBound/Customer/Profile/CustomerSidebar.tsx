import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  LineChart, 
  MessageSquare, 
  Plus,
  Check
} from 'lucide-react';
import xlogo from '../../../../../assets/logo/X_logo_2023.svg';
import linkedinLogo from '../../../../../assets/logo/linkedin.svg';

const CustomerSidebar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("alexbennett@cloudscale.ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 lg:p-8 shrink-0">
      
      {/* Profile Card */}
      <div className="text-center relative pb-8 border-b border-slate-200">
        <div className="w-24 h-24 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#004370] text-3xl font-bold mx-auto mb-6 relative">
          AB
          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#22C55E] border-4 border-white"></div>
        </div>
        <h1 className="text-[24px] font-semibold text-[#0B1C30] leading-[32px] tracking-[-0.48px] mb-1">Alex Bennett</h1>
        <p className="text-[14px] font-normal text-[#454655] leading-[20px] tracking-normal mb-6">VP of Operations @ CloudScale AI</p>
        <div className="flex justify-center gap-2">
          <span className="px-[10px] py-[2px] rounded-full bg-[#E0E7FF] text-[#4338CA] text-[11px] font-bold uppercase tracking-wider">DECISION MAKER</span>
          <span className="px-[10px] py-[2px] rounded-full bg-[#F1F5F9] border border-[#D6E7FE] text-slate-600 text-[11px] font-bold uppercase tracking-wider">ENTERPRISE</span>
        </div>
      </div>

      {/* Contact Details */}
      <div>
        <h3 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.55px] leading-[16px] mb-4">Contact Details</h3>
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#94A3B8] leading-[16px] mb-0.5">Email</p>
              <p className="text-[13px] font-normal text-[#334155] leading-[18px] truncate">alexbennett@cloudscale.ai</p>
            </div>
            <button 
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-600 transition-all cursor-pointer active:scale-95"
              title="Copy Email"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#94A3B8] leading-[16px] mb-0.5">Phone</p>
              <p className="text-[13px] font-normal text-[#334155] leading-[18px]">+91 90380 93849</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#64748B]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#94A3B8] leading-[16px] mb-0.5">Location</p>
              <p className="text-[13px] font-normal text-[#334155] leading-[18px]">Chennai, TN (India)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Presence */}
      <div>
        <h3 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.55px] leading-[16px] mb-4">Social Presence</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-100 transition-colors">
            <img src={linkedinLogo} alt="LinkedIn Logo" className="w-5 h-5 object-contain" />
            <span className="text-xs font-bold text-slate-600">LinkedIn</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-100 transition-colors">
            <img src={xlogo} alt="X Logo" className="w-5 h-5 object-contain" />
            <span className="text-xs font-bold text-slate-600">X / Twitter</span>
          </button>
        </div>
      </div>

      {/* Active Cadence */}
      <div className="bg-[#EEF2FF]/50 rounded-[8px] p-[16px] border border-[#E0E7FF]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[12px] font-bold text-[#222222] uppercase leading-none">Active Cadence</h3>
          <LineChart className="w-5 h-5 text-[#222222]" />
        </div>
        <h4 className="text-[14px] font-semibold text-[#004370] leading-[20px] mb-4">Enterprise Expansion Q4</h4>
        <div className="w-full bg-[#E0F2FE] h-1.5 rounded-full mb-2 overflow-hidden">
          <div className="bg-[#004370] h-full rounded-full" style={{ width: '35%' }}></div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-normal leading-[15px] mb-6">
          <span className="text-[#004370]">35% Complete</span>
          <span className="text-[#94A3B8] font-bold text-[10px] leading-[15px] tracking-normal">Day 4/8</span>
        </div>
        <div className="bg-white rounded-[8px] p-4 border border-[#E0E7FF]">
          <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.55px] leading-[11px] mb-2">Next Step</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#004370]" />
            </div>
            <p className="text-[12px] font-medium text-[#0F172A] leading-[16px]">Initial Discovery Call</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.55px] leading-[16px] mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['High Intent', 'SF Market'].map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-lg border border-slate-100 text-[11px] font-medium text-[#475569] leading-[16.5px]">{tag}</span>
          ))}
          <button className="px-3 py-1.5 rounded-lg border border-slate-100 text-[11px] font-medium text-slate-400 transition-colors flex items-center gap-1">
            <Plus className="w-5 h-5" /> Add tag
          </button>
        </div>
      </div>

    </div>
  );
};

export default CustomerSidebar;
