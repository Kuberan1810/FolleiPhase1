import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Sidebar from '../../../Component/Sidebar';
import { useActiveWorkspace } from '../../../hooks/useWorkspace';
import { useLeads } from '../../../hooks/useLeads';
import { getLead } from '../../../api/leads/leads.api';
import { queryKeys } from '../../../lib/queryClient';
import type { LeadProfileDetail } from '../types';
import {
  LeadProfileHeader,
  AiInsightSection,
  ContactInfoSection,
  CourseInterestSection,
  AttachmentsSection,
  UpcomingMeetingSection,
  RecentActivitySection,
} from './sections';

const STATUS_MAP: Record<string, any> = {
  NEW_INQUIRY: 'New Inquiry',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  DEMO_SCHEDULED: 'Demo Scheduled',
  PROPOSAL: 'Proposal',
  NEGOTIATION: 'Negotiation',
  CONVERTED: 'Converted',
  NOT_CONVERTED: 'Not Converted',
};

export const LeadsProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { workspaceId } = useActiveWorkspace();
  const { leads: allWorkspaceLeads, isLoading: isLeadsLoading } = useLeads(workspaceId);

  const { data: apiLead, isLoading: isDetailLoading } = useQuery({
    queryKey: queryKeys.lead(workspaceId ?? '', id ?? ''),
    queryFn: () => getLead(workspaceId!, id!),
    enabled: Boolean(workspaceId && id),
    retry: false,
  });

  const leadData: LeadProfileDetail | null = useMemo(() => {
    if (apiLead) {
      const name = apiLead.name || apiLead.email || 'Unnamed Lead';
      const initials = (apiLead.name || apiLead.email || 'L').slice(0, 2).toUpperCase();
      const courseName = apiLead.fields?.course_interested || apiLead.fields?.course || 'General Program';
      const city = apiLead.fields?.city || 'Not specified';

      return {
        id: apiLead.id,
        leadNumber: apiLead.row_index + 1,
        name,
        email: apiLead.email || 'No email provided',
        initials,
        avatarBg: '#DCE2F7',
        avatarText: '#1E293B',
        date: apiLead.created_at ? new Date(apiLead.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent',
        status: (STATUS_MAP[apiLead.status] || 'New Inquiry'),
        score: apiLead.temperature === 'HOT' ? 'Hot' : apiLead.temperature === 'WARM' ? 'Warm' : 'Cold',
        source: (apiLead.source as any) || 'Import',
        lastInteraction: apiLead.last_interaction_at ? new Date(apiLead.last_interaction_at).toLocaleString() : undefined,
        createdDate: apiLead.created_at ? new Date(apiLead.created_at).toLocaleDateString() : 'Recent',
        phoneNumber: apiLead.phone || 'No phone provided',
        interestedCourse: courseName,
        courseInterest: {
          mode: 'Online / In-Person',
          batch: 'Regular Batch',
          courseName,
          preferredStart: 'Upcoming Session',
          courseFee: apiLead.fields?.fee || 'Standard Pricing',
        },
        aiInsight: {
          summary: `Lead registered interest for ${courseName} from ${city}. Showing ${apiLead.temperature || 'moderate'} interest signals in automated follow-ups.`,
          recommendedAction: apiLead.temperature === 'HOT' ? 'Schedule discovery demo call' : 'Continue nurturing via automated outreach',
          why: `Source: ${apiLead.source || 'Direct import'}. Current status is ${STATUS_MAP[apiLead.status] || 'Active'}.`,
        },
        upcomingMeeting: apiLead.status === 'DEMO_SCHEDULED' ? {
          title: `${courseName} Demo Session`,
          time: apiLead.last_interaction_at ? new Date(apiLead.last_interaction_at).toLocaleString() : 'Scheduled Soon',
          status: 'Confirmed',
        } : undefined,
        attachments: [],
        recentActivities: [
          {
            id: '1',
            title: 'Lead imported to workspace',
            description: `Added via ${apiLead.source || 'CSV Import'}`,
            time: apiLead.created_at ? new Date(apiLead.created_at).toLocaleDateString() : 'Recent',
          },
        ],
      };
    }

    // Fallback to finding in workspace leads list
    const foundInList = allWorkspaceLeads.find((l) => l.id === id || String(l.leadNumber) === id);
    if (foundInList) {
      return {
        id: foundInList.id,
        leadNumber: foundInList.leadNumber,
        name: foundInList.name,
        email: foundInList.email || 'No email provided',
        initials: foundInList.initials || 'L',
        avatarBg: '#DCE2F7',
        avatarText: '#1E293B',
        date: foundInList.date || 'Recent',
        status: foundInList.status,
        score: foundInList.score,
        source: foundInList.source || 'Import',
        lastInteraction: foundInList.lastInteraction,
        createdDate: foundInList.createdDate || 'Recent',
        phoneNumber: 'Direct Contact',
        interestedCourse: 'Sales Program',
        courseInterest: {
          mode: 'Online / In-Person',
          batch: 'Regular Batch',
          courseName: 'Sales Program',
          preferredStart: 'Upcoming Session',
          courseFee: 'Standard Pricing',
        },
        aiInsight: {
          summary: `Lead active in pipeline with status ${foundInList.status}.`,
          recommendedAction: 'Engage via AI voice outreach',
          why: `Source: ${foundInList.source || 'Import'}. Temperature: ${foundInList.score || 'Standard'}.`,
        },
        attachments: [],
        recentActivities: [
          {
            id: '1',
            title: 'Lead record active',
            description: `Pipeline status: ${foundInList.status}`,
            time: foundInList.date || 'Recent',
          },
        ],
      };
    }

    return null;
  }, [apiLead, allWorkspaceLeads, id]);

  const isLoading = isDetailLoading && isLeadsLoading;

  return (
    <div className="flex h-screen w-full bg-[#FDFDFC] text-[#16171A] antialiased overflow-hidden font-sans">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="leads"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 flex flex-col h-screen overflow-y-auto bg-[#FDFDFC]">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E6E6E4] bg-white px-4 py-3 lg:hidden sticky top-0 z-30 shrink-0">
          <button
            type="button"
            aria-label="Back to leads"
            onClick={() => navigate('/leads')}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="size-4" />
          </button>
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            Lead Profile
          </span>
          <div className="size-8" />
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-[#717378]" />
          </div>
        ) : !leadData ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
            <h3 className="text-[16px] font-semibold text-[#16171A]">Lead not found</h3>
            <button
              type="button"
              onClick={() => navigate('/leads')}
              className="mt-4 rounded-full bg-[#16171A] px-5 py-2 text-[13.5px] font-medium text-white hover:bg-black cursor-pointer"
            >
              Back to Leads
            </button>
          </div>
        ) : (
          <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 max-w-7xl w-full mx-auto">
            {/* Top Navigation */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => navigate('/leads')}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#717378] hover:text-[#16171A] transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Leads</span>
              </button>
            </div>

            {/* Profile Header */}
            <LeadProfileHeader lead={leadData} />

            {/* AI Insight Section */}
            {leadData.aiInsight && (
              <div className="mt-6">
                <AiInsightSection aiInsight={leadData.aiInsight} />
              </div>
            )}

            {/* Main Details Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left Column (8 cols) */}
              <div className="flex flex-col gap-6 lg:col-span-8">
                <ContactInfoSection lead={leadData} />
                {leadData.courseInterest && (
                  <CourseInterestSection courseInterest={leadData.courseInterest} />
                )}
                {leadData.attachments && leadData.attachments.length > 0 && (
                  <AttachmentsSection attachments={leadData.attachments} />
                )}
              </div>

              {/* Right Column (4 cols) */}
              <div className="flex flex-col gap-6 lg:col-span-4">
                {leadData.upcomingMeeting && (
                  <UpcomingMeetingSection upcomingMeeting={leadData.upcomingMeeting} />
                )}
                {leadData.recentActivities && (
                  <RecentActivitySection activities={leadData.recentActivities} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LeadsProfilePage;
