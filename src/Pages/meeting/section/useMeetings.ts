import { useState, useMemo } from 'react';
import { type Meeting, type MeetingStatus } from '../types';
import { initialMockMeetings } from '../data/mockMeetings';

export const useMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMockMeetings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | MeetingStatus>('All');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
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
      } else if (dateFilter === 'today') {
        matchesDate = meeting.date.includes('24 Aug');
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [meetings, searchQuery, statusFilter, dateFilter]);

  const handleAddMeeting = (newMeeting: Omit<Meeting, 'id'>) => {
    const meetingWithId: Meeting = {
      ...newMeeting,
      id: Date.now().toString(),
    };
    setMeetings((prev) => [meetingWithId, ...prev]);
    setIsScheduleModalOpen(false);
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setMeetings((prev) =>
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
    meetings,
    filteredMeetings,
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
