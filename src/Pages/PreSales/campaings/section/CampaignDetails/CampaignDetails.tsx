import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import avatarImg from '../../../../../assets/img/avat.jpg';
import CampaignDetailMetrics from './CampaignDetailMetrics';
import CampaignPerformanceChart from './CampaignPerformanceChart';
import RecentEngagementActivity, { type LeadActivity } from './RecentEngagementActivity';
import AllEngagementActivities from './AllEngagementActivities';
import AIPerformanceInsight from './AIPerformanceInsight';
import ViewRecipientExperience from './ViewRecipientExperience';
import EmailView from './EmailView';
import WhatsAppView from './WhatsAppView';

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
  initialViewMode?: 'details' | 'email' | 'whatsapp' | 'activities';
}


const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack, initialViewMode }) => {
  const [selectedLead, setSelectedLead] = useState<LeadActivity | null>(null);
  const [viewMode, setViewMode] = useState<'details' | 'email' | 'whatsapp' | 'activities'>(initialViewMode || 'details');
  const [exportCallback, setExportCallback] = useState<(() => void) | null>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  React.useEffect(() => {
    if (viewMode === 'activities') {
      if (!window.location.pathname.endsWith('/activities')) {
        navigate(`/presales/campaigns/${campaign.id}/activities`);
      }
    } else if (viewMode === 'details') {
      if (window.location.pathname.endsWith('/activities')) {
        navigate(`/presales/campaigns/${campaign.id}`);
      }
    }
  }, [viewMode, campaign.id, navigate]);

  const activities: LeadActivity[] = [
    {
      id: 1,
      name: "Sophia Miller",
      email: "sophia.m@gmail.com",
      avatar: avatarImg,
      status: "REPLIED",
      statusColor: "bg-[#FFF5E4] text-[#222222]",
      score: "Hot",
      time: "2 mins ago",
      channel: "WHATSAPP",
      company: "Miller Organic Skincare",
      subject: "Expanding Miller Organic Skincare's market reach",
      budget: 12000,
      timestamp: Date.now() - 2 * 60 * 1000
    },
    {
      id: 2,
      name: "David Foster",
      email: "david.f@gmail.com",
      avatar: avatarImg,
      status: "OPENED",
      statusColor: "bg-[#E4EDFF] text-[#222222]",
      score: "Hot",
      time: "5 mins ago",
      channel: "WHATSAPP",
      company: "Foster Care Lab",
      subject: "Expanding Foster Care Lab's market reach",
      budget: 8000,
      timestamp: Date.now() - 5 * 60 * 1000
    },
    {
      id: 3,
      name: "Marcus Bennett",
      email: "m.bennett@gmail.com",
      avatar: avatarImg,
      status: "CLICKED LINK",
      statusColor: "bg-[#E4FFE7] text-[#222222]",
      score: "Warm",
      time: "1 hour ago",
      channel: "EMAIL",
      company: "Bennett Aesthetics",
      subject: "Expanding Bennett Aesthetics' market reach",
      budget: 15000,
      timestamp: Date.now() - 60 * 60 * 1000
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.j@gmail.com",
      avatar: avatarImg,
      status: "DEMO SCHEDULED",
      statusColor: "bg-[#E4EDFF] text-[#222222]",
      score: "Hot",
      time: "3 hours ago",
      channel: "EMAIL",
      company: "Johnson & Partners",
      subject: "Expanding Johnson & Partners' market reach",
      budget: 25000,
      timestamp: Date.now() - 3 * 60 * 60 * 1000
    },
    {
      id: 5,
      name: "Robert Chen",
      email: "robert.c@gmail.com",
      avatar: avatarImg,
      status: "PROPOSAL",
      statusColor: "bg-[#E4FFE7] text-[#222222]",
      score: "Warm",
      time: "Yesterday",
      channel: "EMAIL",
      company: "Chen Logistics",
      subject: "Expanding Chen Logistics' market reach",
      budget: 18000,
      timestamp: Date.now() - 24 * 60 * 60 * 1000
    },
    {
      id: 6,
      name: "Emma Watson",
      email: "emma.w@gmail.com",
      avatar: avatarImg,
      status: "NEGOTIATION",
      statusColor: "bg-[#FFF5E4] text-[#222222]",
      score: "Cold",
      time: "2 days ago",
      channel: "WHATSAPP",
      company: "Watson Media Group",
      subject: "Expanding Watson Media's market reach",
      budget: 32000,
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000
    },
    {
      id: 7,
      name: "Liam Neeson",
      email: "liam.n@gmail.com",
      avatar: avatarImg,
      status: "CONVERTED",
      statusColor: "bg-[#DCFCE7] text-[#222222]",
      score: "Hot",
      time: "3 days ago",
      channel: "EMAIL",
      company: "Taken Enterprises",
      subject: "Expanding Taken Enterprises' market reach",
      budget: 45000,
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
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
            <span className="text-[12px] text-[#464555] font-medium">
              {campaign.date.toLowerCase().startsWith('started') ? campaign.date : `Started ${campaign.date}`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (viewMode !== 'details') {
                  setViewMode('details');
                } else {
                  onBack();
                }
              }}
              className="text-[#0B1C30] cursor-pointer flex items-center justify-center p-0.5 hover:opacity-85 transition-opacity"
            >
              <ArrowLeft size={28} strokeWidth={2.5} />
            </button>
            <h1 className="text-[18px] sm:text-[32px] font-extrabold text-[#0B1C30] tracking-[-0.8px] leading-none">
              {campaign.name}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4.5 self-end md:self-center">
          <button className="text-[#464555] cursor-pointer p-1 hover:text-[#004370] transition-colors">
            <Edit2 size={18} strokeWidth={2.2} />
          </button>
          <button className="text-[#464555] hover:text-[#004370] transition-colors cursor-pointer p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="10" y1="15" x2="10" y2="9" />
              <line x1="14" y1="15" x2="14" y2="9" />
            </svg>
          </button>
          <button className="text-[#BA1A1A] cursor-pointer p-1 hover:opacity-80 transition-opacity">
            <Trash2 size={18} strokeWidth={2.2} />
          </button>
          
          {viewMode === 'activities' && (
            <button 
              onClick={() => exportCallback?.()}
              className="flex items-center gap-2 bg-[#004370] rounded-[10px] px-[16px] py-[8px] text-white hover:bg-[#003356] transition-colors font-manrope font-bold text-[11px] leading-[16.5px] tracking-[0.55px] cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export
            </button>
          )}
        </div>
      </div>

      {viewMode === 'details' && (
        <>
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
                onViewAll={() => setViewMode('activities')}
              />
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-4 space-y-6">
              
              {/* View Recipient Experience Card */}
              <ViewRecipientExperience onSelectView={(mode) => setViewMode(mode)} />

              {/* AI Performance Insight Card */}
              <AIPerformanceInsight />

            </div>

          </div>
        </>
      )}

      {viewMode === 'email' && (
        <div className="animate-in fade-in slide-in-from-right duration-350">
          <EmailView onBack={() => setViewMode('details')} />
        </div>
      )}

      {viewMode === 'whatsapp' && (
        <div className="animate-in fade-in slide-in-from-right duration-350">
          <WhatsAppView onBack={() => setViewMode('details')} />
        </div>
      )}

      {viewMode === 'activities' && (
        <div className="animate-in fade-in slide-in-from-right duration-350">
          <AllEngagementActivities 
            campaign={campaign} 
            activities={activities} 
            onBack={() => setViewMode('details')} 
            setExportCallback={setExportCallback}
          />
        </div>
      )}

    </div>
  );
};

export default CampaignDetails;

