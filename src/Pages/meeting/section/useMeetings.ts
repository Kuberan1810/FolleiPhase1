import { useState, useMemo } from 'react';
import { type Meeting, type MeetingStatus } from '../types';
import { useActiveWorkspace } from '../../../hooks/useWorkspace';
import { useLeads } from '../../../hooks/useLeads';

export const useMeetings = () => {
  const { workspaceId } = useActiveWorkspace();
  const { leads, isLoading } = useLeads(workspaceId);
  const [customMeetings, setCustomMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | MeetingStatus>('All');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Derive meetings in real-time from active workspace leads
  const derivedMeetings = useMemo(() => {
    const demoLeads = leads.filter(
      (l) => l.status === 'Demo Scheduled' || l.status === 'Proposal' || l.status === 'Negotiation'
    );

    const fromLeads: Meeting[] = demoLeads.map((lead) => ({
      id: lead.id,
      date: lead.lastInteraction || lead.date || 'Upcoming',
      time: '10:30 AM',
      lead: {
        name: lead.name,
        email: lead.email,
        initials: lead.initials,
        bgColor: '#F8FAFC',
        textColor: '#1E293B',
      },
      status: lead.status === 'Demo Scheduled' ? 'Upcoming' : 'Completed',
    }));

    return [...customMeetings, ...fromLeads];
  }, [leads, customMeetings]);

  const filteredMeetings = useMemo(() => {
    return derivedMeetings.filter((meeting) => {
      // Search matching (lead name or date/time)
      const matchesSearch =
        searchQuery.trim() === '' ||
        meeting.lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.time.toLowerCase().includes(searchQuery.toLowerCase());

      // Status matching
      const matchesStatus =
        statusFilter === 'All' || meeting.status.toLowerCase() === statusFilter.toLowerCase();

      // Date matching
      let matchesDate = true;
      if (dateFilter === 'upcoming') {
        matchesDate = meeting.status === 'Upcoming';
      } else if (dateFilter === 'completed') {
        matchesDate = meeting.status === 'Completed';
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [derivedMeetings, searchQuery, statusFilter, dateFilter]);

  const handleAddMeeting = (newMeeting: Omit<Meeting, 'id'>) => {
    const meetingWithId: Meeting = {
      ...newMeeting,
      id: Date.now().toString(),
    };
    setCustomMeetings((prev) => [meetingWithId, ...prev]);
    setIsScheduleModalOpen(false);
  };

  const handleDeleteMeeting = (id: string) => {
    setCustomMeetings((prev) => prev.filter((m) => m.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setCustomMeetings((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: m.status === 'Upcoming' ? 'Completed' : 'Upcoming',
          };
        }
        return m;
      })
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setDateFilter('all');
  };

  return {
    meetings: derivedMeetings,
    filteredMeetings,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    isDateDropdownOpen,
    setIsDateDropdownOpen,
    handleAddMeeting,
    handleDeleteMeeting,
    handleToggleStatus,
    resetFilters,
  };
};

export default useMeetings;
