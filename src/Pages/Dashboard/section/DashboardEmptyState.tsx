import React from 'react';

interface DashboardEmptyStateProps {
  message?: string;
}

export const DashboardEmptyState: React.FC<DashboardEmptyStateProps> = ({
  message = 'No projects, leads, or data yet — Follei will fill this in as you go.',
}) => {
  return (
    <p className="text-[13px] text-[#717378] font-normal transition-opacity duration-300">
      {message}
    </p>
  );
};

export default DashboardEmptyState;
