import React from 'react';
import StatsSection from './section/StatsSection';
import OnboardingTable from './section/OnboardingTable';

const CustomerOnboarding: React.FC = () => {
  return (
    <div className="min-h-screen pt-4 pb-12">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">

          Customer Onboarding
        </h1>
        <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">

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
