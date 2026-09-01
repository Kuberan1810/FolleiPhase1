import React from 'react';
import {
  MeetingsHeader,
  MeetingsToolbar,
  MeetingsTable,
  useMeetings,
} from './section';

export const MeetingPage: React.FC = () => {
  const {
    filteredMeetings,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    setIsScheduleModalOpen,
  } = useMeetings();

  return (
    <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 max-w-7xl w-full">
      {/* Header Section */}
      <MeetingsHeader
        onScheduleMeeting={() => setIsScheduleModalOpen(true)}
      />

      {/* Search & Filter Toolbar */}
      <MeetingsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      {/* Meetings Table Card */}
      <MeetingsTable meetings={filteredMeetings} />
    </div>
  );
};

export default MeetingPage;