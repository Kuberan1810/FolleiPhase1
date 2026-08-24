import React, { useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
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
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#16171A] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="meetings"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeItem="meetings"
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#F8F9FA]">
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
          <span className="text-[14px] font-bold tracking-tight text-[#16171A]">
            Follei
          </span>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Bell className="size-4" />
          </button>
        </div>

        {/* Desktop Top Right Icons Header */}
        <div className="hidden lg:flex items-center justify-end gap-3 px-8 pt-5 pb-2">
          <button
            type="button"
            aria-label="Search"
            className="flex size-9 items-center justify-center rounded-full text-[#717378] hover:bg-[#F3F3F0] hover:text-[#16171A] transition-colors cursor-pointer"
          >
            <Search className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-9 items-center justify-center rounded-full text-[#717378] hover:bg-[#F3F3F0] hover:text-[#16171A] transition-colors cursor-pointer"
          >
            <Bell className="size-4.5" />
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-12 pt-2 max-w-7xl w-full">
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