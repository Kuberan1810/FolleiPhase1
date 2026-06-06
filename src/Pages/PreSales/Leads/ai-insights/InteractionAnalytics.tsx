import React from 'react';
import {
  Eye,
  Clock,
  MousePointerClick,
  TrendingUp
} from 'lucide-react';

const InteractionAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] h-fit">
      <h2 className="text-[20px] font-bold text-slate-800 font-inter mb-6">Interaction Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* EMAIL OPENS */}
        <div className="bg-[#F8FAFC] rounded-[12px] p-5 border border-slate-100/50 flex flex-col justify-between min-h-[128px]">
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '1',
                color: '#464555',
                textTransform: 'uppercase'
              }}
            >
              <Eye className="w-4 h-4 text-[#004370]" />
              <span>Email Opens</span>
            </div>
            <div className="text-[28px] font-bold text-slate-800 font-inter mt-3 leading-none">12</div>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              color: '#16A34A',
              marginTop: '8px'
            }}
          >
            <TrendingUp style={{ width: '14px', height: '14px', color: '#16A34A' }} />
            <span>14% vs avg</span>
          </div>
        </div>

        {/* AVG DURATION */}
        <div className="bg-[#F8FAFC] rounded-[12px] p-5 border border-slate-100/50 flex flex-col justify-between min-h-[128px]">
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '1',
                color: '#464555',
                textTransform: 'uppercase'
              }}
            >
              <Clock className="w-4 h-4 text-[#004370]" />
              <span>Avg Duration</span>
            </div>
            <div className="text-[28px] font-bold text-slate-800 font-inter mt-3 leading-none">8m 22s</div>
          </div>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              color: '#464555',
              marginTop: '8px'
            }}
          >
            Stable engagement
          </div>
        </div>

        {/* RESPONSE TIME */}
        <div className="bg-[#F8FAFC] rounded-[12px] p-5 border border-slate-100/50 flex flex-col justify-between min-h-[128px]">
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '1',
                color: '#464555',
                textTransform: 'uppercase'
              }}
            >
              <Clock className="w-4 h-4 text-[#004370]" />
              <span>Response Time</span>
            </div>
            <div className="text-[28px] font-bold text-slate-800 font-inter mt-3 leading-none">45m</div>
          </div>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              color: '#16A34A',
              marginTop: '8px'
            }}
          >
            Fast follow-up
          </div>
        </div>

        {/* LINK CLICKS */}
        <div className="bg-[#F8FAFC] rounded-[12px] p-5 border border-slate-100/50 flex flex-col justify-between min-h-[128px]">
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '1',
                color: '#464555',
                textTransform: 'uppercase'
              }}
            >
              <MousePointerClick className="w-4 h-4 text-[#004370]" />
              <span>Link Clicks</span>
            </div>
            <div className="text-[28px] font-bold text-slate-800 font-inter mt-3 leading-none">5</div>
          </div>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              color: '#16A34A',
              marginTop: '8px'
            }}
          >
            High intent
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionAnalytics;
