
import { useNavigate } from 'react-router-dom';
import { PauseCircle, Trash, ArrowLeft } from 'iconsax-react';
import DetailStatCards from './section/DetailStatCards';
import RecentEngagement from './section/RecentEngagement';
import CampaignPlayback from './section/CampaignPlayback';
import AIInsightBanner from './section/AIInsightBanner';

export default function CampaignProfile() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <div className="flex items-start justify-between mb-6">
        {/* Left: back arrow + title + pill + date */}
        <div>
          {/* Back arrow */}
          <ArrowLeft 
            size="20" 
            color="#464555" 
            className="cursor-pointer inline" 
            onClick={() => navigate(-1)} 
          />

          {/* Title */}
          <h1 style={{
            fontWeight: 700,
            fontSize: '32px',
            lineHeight: '40px',
            letterSpacing: '-0.32px',
            color: '#0F172A',
            display: 'inline', marginLeft: '12px'
          }}>GrowthX</h1>

          {/* Below title: Active pill + date */}
          <div className="flex items-center gap-2 mt-1 ml-8">
            <span style={{
              fontWeight: 700, fontSize: '14px',
              lineHeight: '20px', color: '#2563EB',
              backgroundColor: '#EFF6FF',
              borderRadius: '9999px', padding: '2px 10px'
            }}>Active</span>

            <span style={{
              fontWeight: 400, fontSize: '12px',
              lineHeight: '16px', color: '#464555'
            }}>Started Oct 12, 2026</span>
          </div>
        </div>

        {/* Right: Pause + Trash icons */}
        <div className="flex items-center gap-3">
          <PauseCircle size="28" color="#464555" variant="Linear" className="cursor-pointer" />
          <Trash size="24" color="#BA1A1A" variant="Bold" className="cursor-pointer" />
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <DetailStatCards />

      {/* ── TWO COLUMN SECTION ── */}
      <div className="flex gap-4 mt-6 items-stretch">
        <div className="flex-1 min-w-0 h-full">
          <RecentEngagement />
        </div>
        <div className="w-[650px] shrink-0">
          <CampaignPlayback />
        </div>
      </div>

      {/* ── AI INSIGHT BANNER ── */}
      <AIInsightBanner />
    </div>
  );
}