import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../../Component/Sidebar';
import { initialMockLeads } from '../data/mockLeads';
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

export const LeadsProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Find lead by id or fallback to default Sophia Miller
  const leadData: LeadProfileDetail = useMemo(() => {
    const found = initialMockLeads.find((l) => l.id === id);

    const baseLead = found || {
      id: id || '1',
      leadNumber: 1,
      name: 'Sophia Miller',
      email: 'sophia.m@gmail.com',
      initials: 'SM',
      avatarBg: '#DCE2F7',
      avatarText: '#1E293B',
      date: '12 Jan, 2026',
      status: 'New Inquiry' as const,
      score: 'Warm' as const,
      source: 'Website' as const,
      lastInteraction: '12, Jun 2026 at 02:00 pm',
      createdDate: 'Last 30 days',
    };

    return {
      ...baseLead,
      phoneNumber: '+91 2222 88888',
      interestedCourse: 'Digital Marketing',
      courseInterest: {
        mode: 'Online •',
        batch: 'Weekend',
        courseName: 'Digital Marketing',
        preferredStart: 'September 2026',
        courseFee: '₹45,000',
      },
      aiInsight: {
        summary:
          'Lead has viewed the Digital Marketing course page multiple times and recently attended a demo. Follow up recommended regarding batch timings.',
        recommendedAction: 'Follow up on pricing interest',
        why: 'Lead viewed the fee details twice and asked about payment options.',
      },
      upcomingMeeting: {
        title: 'Course Counselling',
        time: 'Tomorrow · 3:00 PM',
        status: 'Confirmed',
      },
      attachments: [
        {
          id: '1',
          title: 'Course Requirements.pdf',
          sentBy: 'Sent by Lead · Today, 10:42 AM',
        },
        {
          id: '2',
          title: 'Digital Marketing Brochure.pdf',
          sentBy: 'Sent by Admin · Yesterday, 4:15 PM',
        },
      ],
      recentActivities: [
        {
          id: '1',
          title: 'WhatsApp received',
          description: 'Is the weekend batch still available?',
          time: '3 hrs ago',
        },
        {
          id: '2',
          title: 'File shared',
          description: 'Weekend Batch Brochure.pdf · 2.4 MB',
          time: '3 hrs ago',
        },
        {
          id: '3',
          title: 'WhatsApp sent',
          description: 'Here are the weekend batch details',
          time: '3 hrs ago',
        },
        {
          id: '4',
          title: 'AI insight updated',
          description: 'High interest detected · Weekend Batch',
          time: '5 hrs ago',
        },
        {
          id: '5',
          title: 'WhatsApp sent',
          description: 'Course fee and batch details shared',
          time: 'Yesterday',
        },
      ],
    };
  }, [id]);

  const handleOpenInbox = () => {
    navigate('/leads');
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#16171A] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="leads"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#F8F9FF]">
        {/* Page Content */}
        <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 w-full max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <LeadProfileHeader
            lead={leadData}
            onOpenInbox={handleOpenInbox}
          />

          {/* AI Insight Section */}
          <AiInsightSection aiInsight={leadData.aiInsight} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <ContactInfoSection lead={leadData} />
              <CourseInterestSection courseInterest={leadData.courseInterest} />
              <AttachmentsSection attachments={leadData.attachments} />
            </div>

            {/* Right Column  */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <UpcomingMeetingSection meeting={leadData.upcomingMeeting} />
              <RecentActivitySection activities={leadData.recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadsProfilePage;
