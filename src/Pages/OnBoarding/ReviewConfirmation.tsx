import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft,
  Phone, Mail, CheckCircle2, User, Check
} from 'lucide-react';
import folleiCircle from '../../assets/logo/follei-new.png';

const ReviewConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8F0F8] via-[#F8FAFC] to-[#DCE6ED] p-4 md:p-8 font-inter">

      {/* Background blur overlays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] min-h-[600px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-500">

        <div className="w-full md:w-[35%] bg-gradient-to-b from-[#0065A8] to-[#004370] p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Follie Background Watermark effect (Optional) */}
          <div className="absolute top-[-20%] right-[-20%] w-[150%] h-[150%] bg-white opacity-[0.03] rounded-full pointer-events-none blur-3xl"></div>

          <div>
            {/* Logo area */}
            <div className="flex items-center gap-3 mb-16">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img src={folleiCircle} alt="Follei" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-[20px] font-bold tracking-wide">Follei</span>
            </div>

            {/* Headers */}
            <h1 className="text-[32px] font-semibold leading-[1.2] mb-4">
              Review &<br />Confirmation
            </h1>
            <p className="text-white/80 text-[15px] leading-relaxed mb-12">
              Review your information below. Once submitted, you'll be all set to explore Follei.
            </p>
          </div>

          {/* Info Rows */}
          <div className="flex flex-col gap-6 mt-auto">
            {/* Phone */}
            <div className="flex items-center gap-4 p-3 rounded-[12px] relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Phone size={18} className="text-white/90" />
              </div>
              <span className="text-[14px] text-white/90 font-medium tracking-wide">Not Provided</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-3 rounded-[12px] relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Mail size={18} className="text-white/90" />
              </div>
              <span className="text-[14px] text-white font-medium tracking-wide">indhu23@follei.com</span>
              <div className="absolute right-4">
                <CheckCircle2 size={20} className="text-[#10B981] fill-[#10B981] text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area (White Form) */}
        <div className="w-full md:w-[65%] p-10 flex flex-col justify-between">

          <div className="flex flex-col">
            {/* Form Header */}
            <div className="flex items-start gap-4 mb-12">
              <div className="w-12 h-12 rounded-[12px] bg-[#F0F6FC] flex items-center justify-center text-[#004370]">
                <User size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[24px] font-bold text-[#0D1C2E] mb-1 leading-none">Contact Info</h2>
                <p className="text-[14px] text-[#64748B]">Primary identity details for system verification</p>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-12">

              {/* Full Name */}
              <div className="flex flex-col relative">
                <label className="text-[11px] font-bold text-[#94A3B8] tracking-widest uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pb-2 text-[15px] text-[#1E293B] bg-transparent border-b border-[#E2E8F0] focus:outline-none focus:border-[#004370] transition-colors placeholder:text-[#94A3B8]"
                />
              </div>

              {/* Email ID */}
              <div className="flex flex-col relative">
                <label className="text-[11px] font-bold text-[#94A3B8] tracking-widest uppercase mb-2">Email ID</label>
                <input
                  type="text"
                  defaultValue="indhu23@follei.com"
                  readOnly
                  className="w-full pb-2 text-[15px] font-medium text-[#1E293B] bg-transparent border-b border-[#E2E8F0] focus:outline-none"
                />
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col relative">
                <label className="text-[11px] font-bold text-[#94A3B8] tracking-widest uppercase mb-2">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full pb-2 text-[15px] text-[#1E293B] bg-transparent border-b border-[#E2E8F0] focus:outline-none focus:border-[#004370] transition-colors placeholder:text-[#94A3B8]"
                />
              </div>

              {/* Role */}
              <div className="flex flex-col relative">
                <label className="text-[11px] font-bold text-[#94A3B8] tracking-widest uppercase mb-2">Role</label>
                <input
                  type="text"
                  placeholder="Your Role"
                  className="w-full pb-2 text-[15px] text-[#1E293B] bg-transparent border-b border-[#E2E8F0] focus:outline-none focus:border-[#004370] transition-colors placeholder:text-[#94A3B8]"
                />
              </div>

            </div>

            {/* Confirmation Checkbox */}
            <div
              className="flex items-center gap-3 cursor-pointer mt-4"
              onClick={() => setConfirmed(!confirmed)}
            >
              <div className={`w-5 h-5 rounded-[4px] border-[1.5px] flex items-center justify-center transition-colors
                ${confirmed ? 'bg-[#004370] border-[#004370]' : 'border-[#CBD5E1] bg-white'}`}>
                {confirmed && <Check size={14} color="white" strokeWidth={3} />}
              </div>
              <span className="text-[14px] text-[#475569]">
                I confirm my information is accurate and understand it will be used for system setup
              </span>
            </div>

          </div>

          {/* Bottom Navigation */}
          <div className="w-full flex items-center justify-between pt-8 mt-12">
            <button
              onClick={() => navigate('/onboarding/step-6')}
              className="flex items-center gap-2 text-[#64748B] font-semibold text-[15px] hover:text-[#0D1C2E] transition-colors px-2 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={() => navigate('/onboarding/loading')}
              disabled={!confirmed}
              className={`h-[48px] px-8 text-white rounded-[10px] flex items-center justify-center gap-2 font-semibold text-[15px] transition-colors cursor-pointer
                ${confirmed ? 'bg-[#004370] hover:bg-[#003152]' : 'bg-[#94A3B8] cursor-not-allowed'}
              `}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReviewConfirmation;
