import React from 'react';

interface DashboardGreetingProps {
  userName?: string;
  isWorkspaceReady?: boolean;
}

export const DashboardGreeting: React.FC<DashboardGreetingProps> = ({
  userName = 'Aditya',
  isWorkspaceReady = false,
}) => {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-[26px] font-semibold text-[#16171A] tracking-tight">
        Good morning, {userName}
      </h1>
      {!isWorkspaceReady && (
        <>
          <p className="text-[16px] text-[#2C2E31]">
            Let's set up your workspace.
          </p>
          <p className="text-[14px] text-[#717378]">
            I'll help you get everything ready, one step at a time.
          </p>
        </>
      )}
    </header>
  );
};

export default DashboardGreeting;
