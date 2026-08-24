import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import { GoalDefinition } from './section/GoalDefinition';
import { DEFAULT_USER } from './data';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useState(DEFAULT_USER);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProjectReady, setIsProjectReady] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased">
      {/* Reusable Left Sidebar */}
      <Sidebar
        user={user}
        projects={isProjectReady ? ['Project 1'] : []}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeItem="home"
      />

      {/* Main Center Area */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen">
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
          <span className="text-[13px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <div className="size-8" />
        </div>

        {/* Content based on Project state */}
        {isProjectReady ? (
          <div className="min-w-0 flex-1">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-6 px-6 py-14 md:py-20 animate-fade-slide">
              <div className="flex flex-col gap-2">
                <h1 className="text-[28px] font-semibold text-[#16171A] tracking-tight">Project 1</h1>
                <p className="text-[15px] text-[#717378]">
                  Your workspace is being shaped around your ultimate goal.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/main-dashboard')}
                className="inline-flex items-center gap-2 rounded-full bg-[#16171A] hover:bg-black text-white px-6 py-2.5 text-[14px] font-medium transition-all shadow-sm cursor-pointer"
              >
                <span>Go to workspace</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        ) : (
          <GoalDefinition
            userName={user.name}
            onProjectReady={() => setIsProjectReady(true)}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;