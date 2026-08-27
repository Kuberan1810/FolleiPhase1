import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { errorMessage } from '../../lib/axios';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import { useDashboardStats } from '../../hooks/useDashboardStats';
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
  Menu,
  Loader2
} from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import { AiFollowupModal, DisconnectModal } from './modal';

interface TopMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconColor: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('This Week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // AI Follow-up Automation State
  const [isFolleiActivated, setIsFolleiActivated] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [channels, setChannels] = useState({ call: false, whatsapp: false });
  const [preview, setPreview] = useState<CampaignPreview | null>(null);
  const { workspaceId } = useActiveWorkspace();
  const { stats } = useDashboardStats();

  // Preview before the modal. A campaign dials real people and spends real
  // telephony credit, so the user should see who is about to be called and
  // whether calling is even configured before confirming anything.
  const handleStartFolleiClick = async () => {
    if (!workspaceId) {
      toast.error('Select a project first');
      return;
    }
    setIsLoadingModal(true);
    try {
      const result = await previewCampaign(workspaceId);
      setPreview(result);
      if (result.would_call === 0) {
        toast('No leads with a phone number to call yet', { icon: 'ℹ️' });
        return;
      }
      if (!result.telephony_ready) {
        toast.error(result.reason || 'Calling is not configured');
        return;
      }
      setIsAiModalOpen(true);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not start Follei'));
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleModalConfirm = async (selectedChannels: { call: boolean; whatsapp: boolean }) => {
    setChannels(selectedChannels);
    setIsAiModalOpen(false);
    if (!selectedChannels.call && !selectedChannels.whatsapp) {
      setIsFolleiActivated(false);
      return;
    }
    if (!selectedChannels.call || !workspaceId) {
      // Only the call channel is wired to anything today.
      setIsFolleiActivated(true);
      return;
    }
    // This is the point of no return: it dials.
    const count = preview?.would_call ?? 0;
    if (!window.confirm(`Start calling ${count} lead${count === 1 ? '' : 's'} now? Calls cannot be unmade.`)) {
      return;
    }
    try {
      const result = await startCampaign(workspaceId);
      setIsFolleiActivated(true);
      toast.success(`Calling ${result.placed} lead${result.placed === 1 ? '' : 's'}`);
      if (result.failed.length) {
        toast.error(`${result.failed.length} could not be dialled`);
      }
    } catch (error) {
      toast.error(errorMessage(error, 'Could not start calling'));
    }
  };

  const handleDisconnect = () => {
    setIsFolleiActivated(false);
    setChannels({ call: false, whatsapp: false });
    setIsDisconnectModalOpen(false);
  };

  // Real counts from the workspace. A metric with no backing data shows a
  // dash rather than a number -- an invented figure on a dashboard is worse
  // than an obvious gap, because it gets believed.
  const fmt = (n: number) => n.toLocaleString();
  const delta = (change: number | null, unit: string) =>
    change === null ? '—' : `${change >= 0 ? '+' : ''}${change} ${unit}`;

  const topMetrics: TopMetric[] = [
    {
      label: 'TOTAL LEADS',
      value: stats ? fmt(stats.total_leads.value) : '—',
      change: stats ? delta(stats.total_leads.change, 'this week') : '',
      icon: <Users className="size-3.5 text-[#2563EB]" />,
      iconColor: '#2563EB',
    },
    {
      label: 'HOT LEADS',
      value: stats ? fmt(stats.hot_leads.value) : '—',
      change: stats ? delta(stats.hot_leads.change, 'today') : '',
      icon: <Flame className="size-3.5 text-[#EA580C]" />,
      iconColor: '#EA580C',
    },
    {
      label: 'CONVERTED',
      value: stats ? fmt(stats.converted.value) : '—',
      change: stats ? delta(stats.converted.change, 'this week') : '',
      icon: <CheckCircle2 className="size-3.5 text-[#16A34A]" />,
      iconColor: '#16A34A',
    },
    {
      label: 'CALLS MADE',
      value: stats ? fmt(stats.calls_made) : '—',
      change:
        stats && stats.leads_called_share !== null
          ? `${Math.round(stats.leads_called_share * 100)}% of leads reached`
          : '',
      icon: <Calendar className="size-3.5 text-[#F59E0B]" />,
      iconColor: '#F59E0B',
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#FDFDFC] text-[#16171A] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeItem="dashboard"
      />

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#FDFDFC]">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#EBEBE8] bg-white px-4 py-3 lg:hidden sticky top-0 z-30 shrink-0">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Menu className="size-4" />
          </button>
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <div className="size-8" />
        </div>

        {/* Dashboard Main Container - Full Width */}
        <div className="w-full px-6 py-6 lg:px-10 lg:py-8">
          {/* Header Greeting & Start Follei / Activated Action */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-medium text-[28px] leading-[35px] tracking-[0px] text-[#1E293B]">
                Good afternoon, Pragya
              </h1>
              <p className="font-normal text-[14px] leading-[20px] tracking-[0px] text-[#64748B] mt-1">
                Your AI is actively working on your sales pipeline.
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

          {/* AI Follow-up Automation Modal */}
          <AiFollowupModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
            onConfirm={handleModalConfirm}
            initialChannels={channels}
          />

          {/* Disconnect Alert Modal */}
          <DisconnectModal
            isOpen={isDisconnectModalOpen}
            onClose={() => setIsDisconnectModalOpen(false)}
            onConfirmDisconnect={handleDisconnect}
          />

          {/* Top Metrics Row (Figma specs: Fill 100% width, border-t & border-b: 1px #E2E8F0, py: 19px) */}
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

          {/* Main Grid Layout (Left: Call Coverage, Right: AI Attention & Top Campaign) */}
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
                      How much of your lead list Follei has reached
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

                      {/* Active Progress Arch (78%) */}
                      <path
                        d="M 25 130 A 95 95 0 0 1 215 130"
                        fill="none"
                        stroke="#9B87F5"
                        strokeWidth="20.48"
                        strokeLinecap="round"
                        strokeDasharray="298.45"
                        strokeDashoffset="65.66"
                      />
                    </svg>

                    {/* Value in center of gauge */}
                    <div className="absolute top-[64px] inset-x-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="flex items-baseline justify-center">
                        <span className="font-bold text-[44px] leading-[44px] text-[#111827] tracking-[0px]">
                          {stats && stats.leads_called_share !== null
                            ? Math.round(stats.leads_called_share * 100)
                            : '—'}
                        </span>
                        <span className="font-semibold text-[22px] leading-[33px] text-[#6B7280] tracking-[0px] ml-0.5">
                          %
                        </span>
                      </div>
                      <span className="font-semibold text-[15px] leading-[20px] text-[#16A34A] mt-1.5 text-center">
                        {stats && stats.leads_called_share !== null
                          ? 'of leads reached'
                          : 'No calls yet'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric Breakdown Rows */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <TrendingUp className="size-4 text-[#94A3B8]" />
                      <span>New leads this week</span>
                    </div>
                    <span className="font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      {stats?.total_leads.change ?? '—'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <Users className="size-4 text-[#94A3B8]" />
                      <span>Leads reached</span>
                    </div>
                    <span className="font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      {stats && stats.leads_called_share !== null
                        ? `${Math.round(stats.leads_called_share * 100)}%`
                        : '—'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <Zap className="size-4 text-[#94A3B8]" />
                      <span>Calls made</span>
                    </div>
                    <span className="font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      {stats?.calls_made ?? '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Section */}
              <div className="border-t border-[#F1F5F9] pt-4 mt-6 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-semibold text-[11px] uppercase tracking-[0.6px] text-[#64748B]">
                    COVERAGE
                  </div>
                  <div className="font-semibold text-[16px] leading-[24px] tracking-[0px] text-[#111827] mt-0.5">
                    {stats
                      ? `${stats.hot_leads.value} hot of ${stats.total_leads.value} leads`
                      : 'No lead data yet'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.success('Viewing latest sales insights')}
                  className="font-medium text-[15px] leading-[22.5px] text-[#8B5CF6] hover:text-[#7C3AED] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View Sales Insights</span>
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
                    {stats?.needs_attention ?? 0}
                  </div>
                </div>

                <p className="font-normal text-[15px] leading-[24.38px] text-[#9CA3AF] mt-2.5 mb-4">
                  {stats?.needs_attention
                    ? `${stats.needs_attention} lead${stats.needs_attention === 1 ? '' : 's'} showing buying signals. Review the most important conversations.`
                    : 'No leads need attention yet. They appear here once a call has read their intent.'}
                </p>

                {/* Avatar Stack */}
                <div className="flex items-center mb-5">
                  {[
                    { initials: 'IN', bg: 'bg-[#F8FAFC]', text: 'text-[#334155]' },
                    { initials: 'HM', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
                    { initials: 'GM', bg: 'bg-[#FFEDD5]', text: 'text-[#9A3412]' },
                    { initials: 'AP', bg: 'bg-[#FEF9C3]', text: 'text-[#854D0E]' },
                    { initials: '+3', bg: 'bg-[#E2F4FF]', text: 'text-[#0369A1]' },
                  ].map((av, idx) => (
                    <div
                      key={idx}
                      className={`flex size-[40px] items-center justify-center rounded-full border-2 border-[#DBDEEE] text-[13px] font-semibold ${av.bg} ${av.text} ${
                        idx > 0 ? '-ml-2.5' : ''
                      }`}
                    >
                      {av.initials}
                    </div>
                  ))}
                </div>

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

                {/* Campaigns have no backend yet. Showing invented send and
                    open rates here would be the most misleading thing on the
                    page, because they look like measured results. */}
                <p className="text-[13px] leading-relaxed text-[#64748B]">
                  Campaigns aren't set up yet. Once Follei starts calling, campaign
                  performance will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
