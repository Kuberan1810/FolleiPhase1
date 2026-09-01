import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GoalDefinition } from './section/GoalDefinition';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import { useSalesPackageFlow } from '../../hooks/useSalesPackageFlow';
import SalesPackageReview from './section/SalesPackageReview';
import { getStoredUser } from '../../lib/auth';

/** The signed-in user, from the session the auth flow stored. */
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
  const [isReviewingPackage, setIsReviewingPackage] = useState(false);
  const { workspaceId, workspace } = useActiveWorkspace();
  const flow = useSalesPackageFlow(workspaceId);

  return (
    <div className="min-w-0 flex-1 flex flex-col">
      {/* Home Screen: Displays the Goal / Package UI or Prompt Goal Chat UI */}
      {isReviewingPackage ? (
        <div key={workspaceId} className="min-w-0 flex-1">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-10 md:py-14 animate-fade-slide">
            <div className="flex flex-col gap-2">
              <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#16171A] tracking-tight">
                {workspace?.name || 'Your project'}
              </h1>
              <p className="text-[15px] text-[#717378]">
                {workspace?.goal_text || 'Your workspace is being shaped around your ultimate goal.'}
              </p>
            </div>

            {/* Phases 4-7: Sales Package Review Studio */}
            <SalesPackageReview
              stage={flow.stage}
              requirements={flow.requirements}
              gapQuestions={flow.gapQuestions}
              salesPackage={flow.salesPackage}
              isWorking={flow.isWorking}
              onAnswer={flow.answerQuestion}
              onApprove={flow.approve}
              onRequestRevision={flow.requestRevision}
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
          key={workspaceId}
          userName={user.name}
          workspaceId={workspaceId}
          onProjectReady={() => {
            setIsReviewingPackage(true);
            void flow.start();
          }}
        />
      )}
    </div>
  );
};

export default Home;
