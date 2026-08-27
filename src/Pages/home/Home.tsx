import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import { GoalDefinition } from './section/GoalDefinition';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import { useSalesPackageFlow } from '../../hooks/useSalesPackageFlow';
import SalesPackageReview from './section/SalesPackageReview';
import { getStoredUser } from '../../lib/auth';

/** The signed-in user, from the session the auth flow stored. The previous
 *  hardcoded default greeted every account by the same name. */
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

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useState(currentUser);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // Local only for the moment the goal is confirmed in this session. The
  // real answer lives on the workspace: without deriving it, navigating away
  // and back dropped the user at the goal form again with the pipeline
  // already running behind it.
  const [justConfirmed, setJustConfirmed] = useState(false);
  const { workspaceId, workspace } = useActiveWorkspace();
  // Confirming the goal starts Phases 4-7; this owns that pipeline.
  const flow = useSalesPackageFlow(workspaceId);
  // A workspace with a goal has passed this step, whatever this tab knows.
  const isProjectReady = justConfirmed || Boolean(workspace?.goal_text);

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased">
      {/* Reusable Left Sidebar */}
      <Sidebar
        user={user}
        projects={workspace ? [workspace.name] : []}
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
                <h1 className="text-[28px] font-semibold text-[#16171A] tracking-tight">
                  {workspace?.name || 'Your project'}
                </h1>
                <p className="text-[15px] text-[#717378]">
                  {workspace?.goal_text || 'Your workspace is being shaped around your ultimate goal.'}
                </p>
              </div>

              {/* Phases 4-7 run here, in the same place the goal was set,
                  rather than on a separate screen the user has to find. */}
              <SalesPackageReview
                stage={flow.stage}
                requirements={flow.requirements}
                gapQuestions={flow.gapQuestions}
                salesPackage={flow.salesPackage}
                isWorking={flow.isWorking}
                onAnswer={flow.answerQuestion}
                onApprove={flow.approve}
              />

              {flow.stage === 'verified' && (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#16171A] hover:bg-black text-white px-6 py-2.5 text-[14px] font-medium transition-all shadow-sm cursor-pointer"
                >
                  <span>Go to workspace</span>
                  <ArrowRight className="size-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <GoalDefinition
            userName={user.name}
            workspaceId={workspaceId}
            onProjectReady={() => {
              setJustConfirmed(true);
              // Confirming the goal is what kicks off requirements ->
              // gap questions -> sales package.
              void flow.start();
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
