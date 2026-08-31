import React from 'react';

interface DashboardGreetingProps {
  userName?: string;
  isWorkspaceReady?: boolean;
}

export const DashboardGreeting: React.FC<DashboardGreetingProps> = ({
  userName = 'Aditya',
}) => {
  return (
    <header className="flex flex-col gap-1.5 animate-fade-slide">
      <h1 className="text-[28px] font-bold text-[#16171A] tracking-tight">
        Good morning, {userName}
      </h1>
      <p className="text-[15px] font-medium text-[#2C2E31]">
        Let's set up your workspace.
      </p>
      <p className="text-[13.5px] text-[#717378]">
        I'll help you get everything ready, one step at a time.
      </p>
    </header>
  );
};

export default DashboardGreeting;
