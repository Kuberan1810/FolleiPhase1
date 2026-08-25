import React, { useState } from 'react';
import Sidebar from '../../Component/Sidebar';
import {
  MeetingsHeader,
  MeetingsToolbar,
  MeetingsTable,
  useMeetings,
} from './section';

export const MeetingPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="meetings"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#FDFDFC]">
       

        {/* Page Content */}
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
      </main>


    </div>
  );
};

export default MeetingPage;