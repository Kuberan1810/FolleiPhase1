import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { errorMessage } from '../../lib/axios';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import { useLeads, useAttentionLeads } from '../../hooks/useLeads';
import { getStoredUser } from '../../lib/auth';
import {
  previewCampaign,
  startCampaign,
  type CampaignPreview,
} from '../../api/campaign/campaign.api';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Flame, 
  CheckCircle2, 
  Calendar, 
  ChevronDown, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { AiFollowupModal, DisconnectModal } from './modal';
import ConfirmDialog from '../../Component/ConfirmDialog';

interface TopMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconColor: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('This Week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // AI Follow-up Automation State
  const [isFolleiActivated, setIsFolleiActivated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isCallingConfirmOpen, setIsCallingConfirmOpen] = useState(false);
  const [isStartingCampaign, setIsStartingCampaign] = useState(false);
  const [channels, setChannels] = useState({ call: false, whatsapp: false });
  const [preview, setPreview] = useState<CampaignPreview | null>(null);
  
  const { workspaceId, workspace } = useActiveWorkspace();
  const { leads } = useLeads(workspaceId);
  const { leads: attentionLeads } = useAttentionLeads(workspaceId);

  const storedUser = getStoredUser();
  const userName = storedUser?.full_name?.split(' ')[0] || storedUser?.email?.split('@')[0] || 'there';

  // Calculate live metrics from workspace leads
  const totalLeadsCount = leads.length;
  const hotLeadsCount = leads.filter((l) => l.score === 'Hot').length;
  const convertedLeadsCount = leads.filter((l) => l.status === 'Converted').length;
  const meetingsBookedCount = leads.filter((l) => l.status === 'Demo Scheduled').length;
  const coldLeadsCount = leads.filter((l) => l.score === 'Cold').length;

  // Real Health Score Calculation
  const healthScore = totalLeadsCount > 0
    ? Math.min(100, Math.round(((convertedLeadsCount * 3 + meetingsBookedCount * 2 + hotLeadsCount) / Math.max(totalLeadsCount, 1)) * 100))
    : 0;

  const healthLabel =
    totalLeadsCount === 0
      ? 'No leads yet'
      : healthScore >= 60
      ? 'Healthy'
      : healthScore >= 30
      ? 'Moderate'
      : 'Needs Attention';

  const healthColor =
    totalLeadsCount === 0
      ? 'text-[#64748B]'
      : healthScore >= 60
      ? 'text-[#16A34A]'
      : healthScore >= 30
      ? 'text-[#F59E0B]'
      : 'text-[#EA580C]';

  // Arc calculation for health gauge (180 deg arch)
  const maxDash = 298.45;
  const activeOffset = maxDash - (maxDash * (healthScore / 100));

  const handleStartFolleiClick = async () => {
    if (!workspaceId) {
      toast.error('Select a project first');
      return;
    }
    if (totalLeadsCount === 0) {
      toast.error('No leads found in this workspace. Please import or add leads first.');
      return;
    }
    setIsLoadingModal(true);
    try {
      const result = await previewCampaign(workspaceId);
      if (result.would_call === 0) {
        toast.error(result.reason || 'No eligible leads found to call. Please check lead phone numbers.');
        return;
      }
      setPreview(result);
      setIsAiModalOpen(true);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not load campaign preview'));
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleConfirmAutomation = (selectedChannels: { call: boolean; whatsapp: boolean }) => {
    setChannels(selectedChannels);
    setIsAiModalOpen(false);
    if (!selectedChannels.call && !selectedChannels.whatsapp) {
      setIsFolleiActivated(false);
      return;
    }
    if (!selectedChannels.call || !workspaceId) {
      setIsFolleiActivated(true);
      return;
    }
    setIsCallingConfirmOpen(true);
  };

  const handleExecuteCalling = async () => {
    if (!workspaceId) return;
    setIsStartingCampaign(true);
    try {
      const result = await startCampaign(workspaceId);
      setIsFolleiActivated(true);
      setIsCallingConfirmOpen(false);
      toast.success(`Calling ${result.placed} lead${result.placed === 1 ? '' : 's'}`);
      if (result.failed.length) {
        toast.error(`${result.failed.length} could not be dialled`);
      }
    } catch (error) {
      toast.error(errorMessage(error, 'Could not start calling'));
    } finally {
      setIsStartingCampaign(false);
    }
  };

  const handleDisconnect = () => {
    setIsFolleiActivated(false);
    setChannels({ call: false, whatsapp: false });
    setIsDisconnectModalOpen(false);
  };

  const topMetrics: TopMetric[] = [
    {
      label: 'TOTAL LEADS',
      value: totalLeadsCount.toLocaleString(),
      change: totalLeadsCount > 0 ? `${totalLeadsCount} active in pipeline` : 'No leads imported',
      icon: <Users className="size-3.5 text-[#2563EB]" />,
      iconColor: '#2563EB',
    },
    {
      label: 'HOT LEADS',
      value: hotLeadsCount.toLocaleString(),
      change: hotLeadsCount > 0 ? `${hotLeadsCount} high intent` : '0 hot leads',
      icon: <Flame className="size-3.5 text-[#EA580C]" />,
      iconColor: '#EA580C',
    },
    {
      label: 'CONVERTED',
      value: convertedLeadsCount.toLocaleString(),
      change: convertedLeadsCount > 0 ? `${convertedLeadsCount} sales closed` : '0 converted',
      icon: <CheckCircle2 className="size-3.5 text-[#16A34A]" />,
      iconColor: '#16A34A',
    },
    {
      label: 'MEETINGS BOOKED',
      value: meetingsBookedCount.toLocaleString(),
      change: meetingsBookedCount > 0 ? `${meetingsBookedCount} scheduled` : '0 booked',
      icon: <Calendar className="size-3.5 text-[#F59E0B]" />,
      iconColor: '#F59E0B',
    },
  ];

  return (
    <div className="w-full px-6 py-6 lg:px-10 lg:py-8">
      {/* Header Greeting & Start Follei / Activated Action */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
              <h1 className="font-medium text-[28px] leading-[35px] tracking-[0px] text-[#1E293B]">
                Good afternoon, {userName}
              </h1>
              <p className="font-normal text-[14px] leading-[20px] tracking-[0px] text-[#64748B] mt-1">
                {workspace?.name ? `Active workspace: ${workspace.name}` : 'Your AI is actively working on your sales pipeline.'}
              </p>
            </div>

            {/* Right End: Start Follei or Follei Activated Pill */}
            <div className="shrink-0 flex items-center">
              {isFolleiActivated ? (
                <button
                  type="button"
                  onClick={() => setIsDisconnectModalOpen(true)}
                  title="Click to disconnect Follei"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F4F4F0] border border-[#E2E8D8] px-4 py-2 text-[14px] font-medium text-[#1E293B] shadow-2xs hover:bg-[#EBEBE6] transition-all cursor-pointer"
                >
                  <span className="size-2 rounded-full bg-[#7A9601]" />
                  <span>Follei Activated</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartFolleiClick}
                  disabled={isLoadingModal}
                  className="inline-flex items-center gap-2 rounded-full bg-[#525252] hover:bg-[#3D3D3D] active:scale-[0.98] px-5 py-2 text-[14px] font-medium text-white shadow-2xs transition-all cursor-pointer disabled:opacity-80"
                >
                  {isLoadingModal && <Loader2 className="size-4 animate-spin text-white" />}
                  <span>Start Follei</span>
                </button>
              )}
            </div>
          </div>

          {/* Top Metrics Row */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#E2E8F0] divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0] py-[19px] mb-8">
            {topMetrics.map((metric, index) => (
              <div 
                key={index} 
                className={`flex flex-col justify-between ${
                  index === 0 ? 'pr-6 py-2 sm:py-0' : 
                  index === topMetrics.length - 1 ? 'pl-6 py-2 sm:py-0' : 
                  'px-6 py-2 sm:py-0'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {metric.icon}
                  <span className="font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#64748B]">
                    {metric.label}
                  </span>
                </div>
                <div className="font-semibold text-[30px] leading-[36px] tracking-[0px] text-[#1E293B]">
                  {metric.value}
                </div>
                <div className="font-normal text-[12px] leading-[16px] tracking-[0px] text-[#64748B] mt-1">
                  {metric.change}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid Layout (Left: Sales Health, Right: AI Attention & Top Campaign) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Card: Sales Health (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-[16px] border border-[#F3F4F6] p-[24px] flex flex-col justify-between">
              <div className="flex flex-col gap-[20px]">
                {/* Header & Filter */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-[18px] text-[#1E293B]">
                      Sales Health
                    </h2>
                    <p className="font-normal text-[14px] text-[#64748B] mt-0.5">
                      How your sales pipeline is performing
                    </p>
                  </div>

                  {/* Dropdown Filter */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5 text-[13px] font-medium text-[#475569] hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span>{timeRange}</span>
                      <ChevronDown className="size-3.5 text-[#64748B]" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-1.5 w-36 bg-white border border-[#E2E8F0] rounded-xl z-20 py-1 text-[13px]">
                        {['Today', 'This Week', 'This Month', 'This Quarter'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setTimeRange(item);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-1.5 hover:bg-[#F8FAFC] cursor-pointer transition-colors ${
                              timeRange === item ? 'font-semibold text-[#1E293B]' : 'text-[#64748B]'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Semicircular Gauge */}
                <div className="flex flex-col items-center justify-center my-4">
                  <div className="relative w-[240px] h-[140px] flex items-center justify-center">
                    <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible">
                      {/* Background Arch (180 deg) */}
                      <path
                        d="M 25 130 A 95 95 0 0 1 215 130"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="20.48"
                        strokeLinecap="round"
                      />

                      {/* Active Progress Arch */}
                      <path
                        d="M 25 130 A 95 95 0 0 1 215 130"
                        fill="none"
                        stroke="#9B87F5"
                        strokeWidth="20.48"
                        strokeLinecap="round"
                        strokeDasharray="298.45"
                        strokeDashoffset={activeOffset}
                        className="transition-all duration-700"
                      />
                    </svg>

                    {/* Value in center of gauge */}
                    <div className="absolute top-[64px] inset-x-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="flex items-baseline justify-center">
                        <span className="font-bold text-[44px] leading-[44px] text-[#111827] tracking-[0px]">
                          {healthScore}
                        </span>
                        <span className="font-semibold text-[22px] leading-[33px] text-[#6B7280] tracking-[0px] ml-0.5">
                          /100
                        </span>
                      </div>
                      <span className={`font-semibold text-[15px] leading-[20px] ${healthColor} mt-1.5 text-center`}>
                        {healthLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric Breakdown Rows */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <TrendingUp className="size-4 text-[#94A3B8]" />
                      <span>Pipeline Growth</span>
                    </div>
                    <span className="font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      {totalLeadsCount > 0 ? `+${totalLeadsCount} leads` : '0%'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <Users className="size-4 text-[#94A3B8]" />
                      <span>Lead-to-Meeting Rate</span>
                    </div>
                    <span className="font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      {totalLeadsCount > 0 ? `${((meetingsBookedCount / totalLeadsCount) * 100).toFixed(1)}%` : '0.0%'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <Zap className="size-4 text-[#94A3B8]" />
                      <span>Cold / Inactive Leads</span>
                    </div>
                    <span className="font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#64748B]">
                      {coldLeadsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Section */}
              <div className="border-t border-[#F1F5F9] pt-4 mt-6 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-semibold text-[11px] uppercase tracking-[0.6px] text-[#64748B]">
                    PIPELINE SUMMARY
                  </div>
                  <div className="font-semibold text-[16px] leading-[24px] tracking-[0px] text-[#111827] mt-0.5">
                    {hotLeadsCount > 0 ? `${hotLeadsCount} hot leads ready for closing` : 'Import leads to generate live pipeline insights'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/leads')}
                  className="font-medium text-[15px] leading-[22.5px] text-[#8B5CF6] hover:text-[#7C3AED] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View All Leads</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Right Column: 2 Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 1: AI Needs Your Attention */}
              <div className="bg-white rounded-[16px] border border-[#F3F4F6] p-[24px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[16px] text-[#1E293B]">
                    AI Needs Your Attention
                  </h3>
                  <div className="flex size-[28px] items-center justify-center rounded-full bg-[#F15B5B]/20 shadow-[0_0_10px_rgba(239,68,68,0.3)] text-[13px] font-bold text-[#F15B5B]">
                    {attentionLeads.length}
                  </div>
                </div>

                <p className="font-normal text-[15px] leading-[24.38px] text-[#9CA3AF] mt-2.5 mb-4">
                  {attentionLeads.length > 0
                    ? `${attentionLeads.length} lead${attentionLeads.length === 1 ? ' is' : 's are'} showing buying signals. Review high priority conversations.`
                    : 'All leads are currently in sync. No urgent manual attention required.'}
                </p>

                {/* Avatar Stack */}
                {attentionLeads.length > 0 && (
                  <div className="flex items-center mb-5">
                    {attentionLeads.slice(0, 4).map((lead, idx) => {
                      const initials = (lead.name || lead.email || 'L').slice(0, 2).toUpperCase();
                      const colors = [
                        { bg: 'bg-[#F8FAFC]', text: 'text-[#334155]' },
                        { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
                        { bg: 'bg-[#FFEDD5]', text: 'text-[#9A3412]' },
                        { bg: 'bg-[#FEF9C3]', text: 'text-[#854D0E]' },
                      ];
                      const col = colors[idx % colors.length];
                      return (
                        <div
                          key={lead.id}
                          className={`flex size-[40px] items-center justify-center rounded-full border-2 border-[#DBDEEE] text-[13px] font-semibold ${col.bg} ${col.text} ${
                            idx > 0 ? '-ml-2.5' : ''
                          }`}
                        >
                          {initials}
                        </div>
                      );
                    })}
                    {attentionLeads.length > 4 && (
                      <div className="flex size-[40px] items-center justify-center rounded-full border-2 border-[#DBDEEE] text-[13px] font-semibold bg-[#E2F4FF] text-[#0369A1] -ml-2.5">
                        +{attentionLeads.length - 4}
                      </div>
                    )}
                  </div>
                )}

                {/* Olive CTA Button */}
                <button
                  type="button"
                  onClick={() => navigate('/attention')}
                  className="w-full py-3 px-4 bg-[#7A9601] hover:bg-[#6C8501] active:scale-[0.99] text-white font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Review Now</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>

              {/* Card 2: Top Performing Campaign */}
              <div className="bg-white rounded-[16px] border border-[#F3F4F6] p-[24px]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="size-4 text-[#9333EA]" />
                  <h3 className="font-semibold text-[16px] text-[#1E293B]">
                    Top Performing Campaign
                  </h3>
                </div>

                {/* Campaign Name & Active Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-normal text-[14px] text-[#64748B]">
                    {workspace?.name ? `${workspace.name} Voice Outreach` : 'Outbound Calling Campaign'}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    workspace?.stage === 'VERIFIED' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {workspace?.stage === 'VERIFIED' ? 'Active' : 'Ready'}
                  </span>
                </div>

                {/* Stats 4-columns */}
                <div className="grid grid-cols-4 gap-2 text-left mb-5">
                  <div>
                    <div className="text-[12px] text-[#64748B]">Leads</div>
                    <div className="text-[16px] font-bold text-[#1E293B] mt-0.5">{totalLeadsCount}</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-[#64748B]">Hot</div>
                    <div className="text-[16px] font-bold text-[#1E293B] mt-0.5">{hotLeadsCount}</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-[#64748B]">Converted</div>
                    <div className="text-[16px] font-bold text-[#1E293B] mt-0.5">{convertedLeadsCount}</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-[#64748B]">Meetings</div>
                    <div className="text-[16px] font-bold text-[#1E293B] mt-0.5">{meetingsBookedCount}</div>
                  </div>
                </div>

                {/* View Campaign Report CTA Button */}
                <button
                  type="button"
                  onClick={() => navigate('/campaigns')}
                  className="w-full h-[48.5px] px-4 bg-[#0D0D0D]/5 hover:bg-[#0D0D0D]/10 border border-[#0D0D0D]/5 text-[#222222] font-medium text-[15px] leading-[22.5px] tracking-[0px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>View campaign report</span>
                  <ArrowRight className="size-4 text-[#222222]" />
                </button>
              </div>
            </div>
          </div>

        {/* AI Followup Setup Modal */}
        <AiFollowupModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onConfirm={handleConfirmAutomation}
          initialChannels={channels}
        />

        {/* Disconnect Confirmation Modal */}
        <DisconnectModal
          isOpen={isDisconnectModalOpen}
          onClose={() => setIsDisconnectModalOpen(false)}
          onConfirmDisconnect={handleDisconnect}
        />

        {/* Call Execution Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isCallingConfirmOpen}
          onClose={() => setIsCallingConfirmOpen(false)}
          onConfirm={handleExecuteCalling}
          title={`Start calling ${preview?.would_call ?? 0} lead${(preview?.would_call ?? 0) === 1 ? '' : 's'}?`}
          description="This will initiate automated voice calls using your approved sales script. Once placed, live outbound calls cannot be unmade."
          confirmText="Start Calling"
          cancelText="Cancel"
          variant="warning"
          isLoading={isStartingCampaign}
        />
    </div>
  );
};

export default Dashboard;
