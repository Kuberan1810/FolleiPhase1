import React from 'react';
import StatsSection from './section/StatsSection';
import OnboardingTable from './section/OnboardingTable';

const CustomerOnboarding: React.FC = () => {
  return (
    <div className="min-h-screen pt-4 pb-12">
      {/* Header Section */}
      <div className="mb-8">
        <h1
          className="text-[28px] md:text-[36px] font-bold leading-[34px] md:leading-[44px] tracking-tight text-[#0D1C2E]"
          style={{ letterSpacing: '-0.72px' }}
        >
          Customer Onboarding
        </h1>
        <p
          className="mt-1 text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-[#434655]"
        >
          Track customer onboarding progress and completion.
        </p>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Table Section */}
      <div className="mt-8">
        <OnboardingTable />
      </div>
    </div>
  );
};

export default CustomerOnboarding;
