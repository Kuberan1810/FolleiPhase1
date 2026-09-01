import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Sparkles, X } from 'lucide-react';
import Sidebar from '../../../Component/Sidebar';
import { getStoredUser } from '../../../lib/auth';
import { useActiveWorkspace } from '../../../hooks/useWorkspace';
import {
  CampaignCreationHeader,
  CampaignSuggestionChips,
  CampaignPromptInput,
  CampaignWizardWidget,
} from './section';
import { useCampaigns } from '../useCampaigns';
import type { CampaignFormState } from './types';
import toast from 'react-hot-toast';

const SUGGESTIONS = [
  'Create a lead campaign',
  'Follow up with new leads',
  'Promote a service',
];

const currentUser = () => {
  const stored = getStoredUser();
  const name = stored?.full_name?.trim() || stored?.email?.split('@')[0] || 'there';
  const parts = name.split(/\s+/).filter(Boolean);
  return {
    name: parts[0] || name,
    email: stored?.email || 'Free plan',
    initials: (parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase(),
  };
};

const INITIAL_STATE: CampaignFormState = {
  campaignName: '',
  objective: 'Generate Leads',
  customObjective: '',
  audienceType: 'all',
  selectedStatuses: ['New', 'Qualified'],
  selectedSources: ['Website', 'Referral'],
  leadsCount: 124,
  selectedNumber: '+91 98765 43210',
  messageText: '',
  scheduleOption: 'now',
  scheduledDate: '09/01/2026',
  scheduledTime: '10:00 AM',
  currentStepIndex: 0,
  isCompleted: false,
};

export const CampaignCreation: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useState(currentUser);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileWizardOpen, setIsMobileWizardOpen] = useState(false);
  const { workspaceId } = useActiveWorkspace();

  const [formState, setFormState] = useState<CampaignFormState>(INITIAL_STATE);
  const [isLaunched, setIsLaunched] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [isSubmittingPrompt, setIsSubmittingPrompt] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleUpdateField = <K extends keyof CampaignFormState>(
    field: K,
    value: CampaignFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleStatus = (status: string) => {
    setFormState((prev) => {
      const exists = prev.selectedStatuses.includes(status);
      const updated = exists
        ? prev.selectedStatuses.filter((s) => s !== status)
        : [...prev.selectedStatuses, status];

      if (updated.length === 0 && prev.selectedSources.length === 0) {
        return {
          ...prev,
          audienceType: 'all',
          selectedStatuses: [],
          selectedSources: [],
          leadsCount: 124,
        };
      }

      return {
        ...prev,
        audienceType: 'custom',
        selectedStatuses: updated,
        leadsCount: Math.max(15, updated.length * 32 + prev.selectedSources.length * 18),
      };
    });
  };

  const handleToggleSource = (source: string) => {
    setFormState((prev) => {
      const exists = prev.selectedSources.includes(source);
      const updated = exists
        ? prev.selectedSources.filter((s) => s !== source)
        : [...prev.selectedSources, source];

      if (updated.length === 0 && prev.selectedStatuses.length === 0) {
        return {
          ...prev,
          audienceType: 'all',
          selectedStatuses: [],
          selectedSources: [],
          leadsCount: 124,
        };
      }

      return {
        ...prev,
        audienceType: 'custom',
        selectedSources: updated,
        leadsCount: Math.max(15, prev.selectedStatuses.length * 32 + updated.length * 18),
      };
    });
  };

  const handleNextStep = () => {
    setFormState((prev) => ({
      ...prev,
      currentStepIndex: Math.min(prev.currentStepIndex + 1, 5),
    }));
  };

  const handlePrevStep = () => {
    setFormState((prev) => ({
      ...prev,
      currentStepIndex: Math.max(prev.currentStepIndex - 1, 0),
    }));
  };

  const handleGoToStep = (index: number) => {
    setFormState((prev) => ({ ...prev, currentStepIndex: index }));
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setPromptText(suggestion);
    if (!formState.campaignName) {
      handleUpdateField('campaignName', suggestion);
    }
  };

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = promptText.trim();
    if (!trimmed || isSubmittingPrompt) return;

    setIsSubmittingPrompt(true);

    if (formState.currentStepIndex === 0) {
      handleUpdateField('campaignName', trimmed);
    } else if (formState.currentStepIndex === 3) {
      handleUpdateField('messageText', trimmed);
    }

    setTimeout(() => {
      setIsSubmittingPrompt(false);
      setPromptText('');
      setFormState((prev) => ({
        ...prev,
        currentStepIndex: Math.min(prev.currentStepIndex + 1, 5),
      }));
      toast.success('Campaign updated from prompt!');
    }, 400);
  };

  const { addCampaign } = useCampaigns();

  const handleLaunchCampaign = () => {
    setIsLaunching(true);

    setTimeout(() => {
      setIsLaunching(false);
      setIsLaunched(true);
    }, 300);
  };

  const handleViewCampaign = () => {
    addCampaign({
      name: formState.campaignName || 'Untitled Campaign',
      channels: ['WhatsApp'],
      audienceCount: formState.leadsCount || 124,
      audienceLabel: `${formState.leadsCount || 124} leads`,
      status: formState.scheduleOption === 'later' ? 'Scheduled' : 'Active',
      scheduledFor:
        formState.scheduleOption === 'later'
          ? `${formState.scheduledDate} ${formState.scheduledTime}`
          : undefined,
    });

    toast.success('Campaign launched successfully!');
    navigate('/campaigns');
  };

  const handleCreateAnother = () => {
    setFormState(INITIAL_STATE);
    setIsLaunched(false);
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased font-sans">
      {/* Left Reusable Sidebar */}
      <Sidebar
        user={user}
        activeItem="campaigns"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#FDFDFC]">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E6E6E4] bg-white px-4 py-3 lg:hidden sticky top-0 z-30">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <button
            type="button"
            onClick={() => setIsMobileWizardOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-medium text-[#16171A] shadow-2xs cursor-pointer"
          >
            <Sparkles className="size-3 text-[#7A9601]" />
            <span>Wizard ({formState.currentStepIndex + 1}/6)</span>
          </button>
        </div>

        {/* 2-Column Split: Left Centered Prompt Section + Right Sticky 6-Step Wizard */}
        <div className="flex-1 flex flex-col lg:flex-row justify-between min-h-[calc(100vh-60px)] lg:min-h-screen">
          {/* Left Column: Lower-middle centered prompt area matching screenshot */}
          <div className="min-w-0 flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-10 lg:pt-32 lg:pb-16 animate-fade-slide">
            <div className="w-full max-w-xl flex flex-col items-center gap-5">
              {/* Title & Subtitle */}
              <CampaignCreationHeader />

              {/* Suggestion Chips */}
              <CampaignSuggestionChips
                suggestions={SUGGESTIONS}
                onSelectSuggestion={handleSelectSuggestion}
                disabled={isSubmittingPrompt}
              />

              {/* Prompt Input Bar */}
              <CampaignPromptInput
                value={promptText}
                onChange={setPromptText}
                onSubmit={handlePromptSubmit}
                placeholder="Tell Follei what you want to campaign..."
                isSubmitting={isSubmittingPrompt}
              />
            </div>
          </div>

          {/* Right Column: 6-Step Assistant Card (Sticky on Large Screens) */}
          <div className="hidden lg:block shrink-0 py-6 pr-8 pl-4">
            <div className="sticky top-6 w-[360px]">
              <CampaignWizardWidget
                formState={formState}
                isLaunched={isLaunched}
                onUpdateField={handleUpdateField}
                onToggleStatus={handleToggleStatus}
                onToggleSource={handleToggleSource}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                onGoToStep={handleGoToStep}
                onLaunchCampaign={handleLaunchCampaign}
                onViewCampaign={handleViewCampaign}
                onCreateAnother={handleCreateAnother}
                isLaunching={isLaunching}
              />
            </div>
          </div>
        </div>

        {/* Mobile Slide-over Drawer for Wizard */}
        {isMobileWizardOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-xs lg:hidden animate-fade-in">
            <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-white p-4 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                <span className="text-[13.5px] font-semibold text-[#16171A]">
                  Campaign Setup
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileWizardOpen(false)}
                  className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <CampaignWizardWidget
                formState={formState}
                isLaunched={isLaunched}
                onUpdateField={handleUpdateField}
                onToggleStatus={handleToggleStatus}
                onToggleSource={handleToggleSource}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                onGoToStep={handleGoToStep}
                onLaunchCampaign={() => {
                  handleLaunchCampaign();
                }}
                onViewCampaign={() => {
                  setIsMobileWizardOpen(false);
                  handleViewCampaign();
                }}
                onCreateAnother={() => {
                  handleCreateAnother();
                }}
                isLaunching={isLaunching}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CampaignCreation;