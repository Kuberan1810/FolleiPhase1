import React, { useState } from 'react';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import avatarImg from '../../../../../assets/avatar.png';
import CampaignDetailMetrics from './CampaignDetailMetrics';
import CampaignPerformanceChart from './CampaignPerformanceChart';
import RecentEngagementActivity, { type LeadActivity } from './RecentEngagementActivity';
import AIPerformanceInsight from './AIPerformanceInsight';

interface CampaignDetailsProps {
  campaign: {
    id: number;
    name: string;
    date: string;
    status: string;
    statusColor: string;
    sent: string;
    replies: string;
    converted: string;
  };
  onBack: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack }) => {
  const [selectedLead, setSelectedLead] = useState<LeadActivity | null>(null);

  const activities: LeadActivity[] = [
    {
      id: 1,
      name: "Sophia Miller",
      email: "sophia.m@gmail.com",
      avatar: avatarImg,
      status: "REPLIED",
      statusColor: "bg-[#FEF3C7] text-[#D97706]",
      score: "Hot",
      time: "2 mins ago",
      channel: "WHATSAPP",
      company: "Miller Organic Skincare",
      subject: "Expanding Miller Organic Skincare's market reach"
    },
    {
      id: 2,
      name: "David Foster",
      email: "david.f@gmail.com",
      avatar: avatarImg,
      status: "OPENED",
      statusColor: "bg-[#DBEAFE] text-[#1E40AF]",
      score: "Hot",
      time: "2 mins ago",
      channel: "WHATSAPP",
      company: "Foster Care Lab",
      subject: "Expanding Foster Care Lab's market reach"
    },
    {
      id: 3,
      name: "Marcus Bennett",
      email: "m.bennett@gmail.com",
      avatar: avatarImg,
      status: "OPENED",
      statusColor: "bg-[#DBEAFE] text-[#1E40AF]",
      score: "Hot",
      time: "Yesterday",
      channel: "EMAIL",
      company: "Bennett Aesthetics",
      subject: "Expanding Bennett Aesthetics' market reach"
    },
    {
      id: 4,
      name: "Sophia Miller",
      email: "sophia.m@gmail.com",
      avatar: avatarImg,
      status: "CLICKED LINK",
      statusColor: "bg-[#D1FAE5] text-[#065F46]",
      score: "Hot",
      time: "Yesterday",
      channel: "EMAIL",
      company: "Miller Organic Skincare",
      subject: "Expanding Miller Organic Skincare's market reach"
    },
    {
      id: 5,
      name: "David Foster",
      email: "david.f@gmail.com",
      avatar: avatarImg,
      status: "CLICKED LINK",
      statusColor: "bg-[#D1FAE5] text-[#065F46]",
      score: "Hot",
      time: "Yesterday",
      channel: "EMAIL",
      company: "Foster Care Lab",
      subject: "Expanding Foster Care Lab's market reach"
    }
  ];

  return (
    <div className="font-manrope animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
              {campaign.status}
            </span>
            <span className="text-[12px] text-[#464555] font-medium">Started {campaign.date}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="text-[#0B1C30] cursor-pointer flex items-center justify-center p-0.5"
            >
              <ArrowLeft size={28} strokeWidth={2.5} />
            </button>
            <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#0B1C30] tracking-[-0.8px] leading-none">
              {campaign.name}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4.5 self-end md:self-center">
          <button className="text-[#464555] cursor-pointer p-1">
            <Edit2 size={18} strokeWidth={2.2} />
          </button>
          <button className="text-[#464555] hover:text-[#004370] transition-colors cursor-pointer p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="10" y1="15" x2="10" y2="9" />
              <line x1="14" y1="15" x2="14" y2="9" />
            </svg>
          </button>
          <button className="text-[#BA1A1A] cursor-pointer p-1">
            <Trash2 size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <CampaignDetailMetrics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-8 space-y-8">
          
          {/* Campaign Performance Chart */}
          <CampaignPerformanceChart />

          {/* Recent Engagement Activity Table */}
          <RecentEngagementActivity 
            activities={activities}
            selectedLead={selectedLead}
            onSelectLead={(act) => {
              setSelectedLead(act);
            }}
          />
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-4">
          
          {/* AI Performance Insight Card */}
          <AIPerformanceInsight />

        </div>

      </div>

    </div>
  );
};

export default CampaignDetails;
