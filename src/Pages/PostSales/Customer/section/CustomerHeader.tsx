import * as React from 'react';
import { Users, Heart, Calendar, CheckCircle, Clock } from 'lucide-react';

const CustomerHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      {/* Total Accounts Card */}
      <div className="relative bg-white rounded-[20px] p-6 border border-slate-100 min-h-[132px] flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col">
          <p className="text-[11px] font-bold text-[#454655] uppercase tracking-[0.55px] font-manrope mb-1">TOTAL ACCOUNTS</p>
          <h2 className="text-[28px] font-bold text-[#0F172A] leading-[42px] font-manrope">248</h2>
        </div>
        <p className="text-[12px] font-medium text-[#004370] font-manrope flex items-center gap-1 leading-[16px]">
          <span className="text-[#004370]">↑</span> 12% vs last month
        </p>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-[4px] bg-[#EFF6FF] flex items-center justify-center text-[#004370]">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Portfolio Health Card */}
      <div className="relative bg-white rounded-[20px] p-6 border border-slate-100 min-h-[132px] flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col">
          <p className="text-[11px] font-bold text-[#454655] uppercase tracking-[0.55px] font-manrope mb-1">PORTFOLIO HEALTH</p>
          <h2 className="text-[28px] font-bold text-[#0F172A] leading-[42px] font-manrope">92.4%</h2>
        </div>
        <p className="text-[12px] font-medium text-[#16A34A] font-manrope flex items-center gap-1 leading-[16px]">
          <CheckCircle className="w-[14px] h-[14px]" /> Stable momentum
        </p>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-[4px] bg-[#ECFDF5] flex items-center justify-center text-[#16A34A]">
          <Heart className="w-5 h-5" />
        </div>
      </div>

      {/* Upcoming Renewals Card */}
      <div className="relative bg-white rounded-[20px] p-6 border border-slate-100 min-h-[132px] flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col">
          <p className="text-[11px] font-bold text-[#454655] uppercase tracking-[0.55px] font-manrope mb-1">UPCOMING RENEWALS</p>
          <h2 className="text-[28px] font-bold text-[#0F172A] leading-[42px] font-manrope">$142,500</h2>
        </div>
        <p className="text-[12px] font-medium text-[#D97706] font-manrope flex items-center gap-1 leading-[16px]">
          <Clock className="w-[14px] h-[14px]" /> 8 accounts this quarter
        </p>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-[4px] bg-[#FFFBEB] flex items-center justify-center text-[#B45309]">
          <Calendar className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;
