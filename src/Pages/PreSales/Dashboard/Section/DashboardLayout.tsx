import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardCard from "./DashboardCard";
import NewLeads from "./NewLeads";
import ChannelBreakdown from "./ChannelBreakdown";
import PendingTasks from "./PendingTasks";
import AIInsights from "./AIInsights";
import FloatingButton from "../../../../Component/FloatingButton";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardCard />
      <div className="grid xl:grid-cols-12 gap-6 items-start pb-20">
        <div className="xl:col-span-8 flex flex-col gap-6">
          <NewLeads />
          <div className="grid md:grid-cols-2 gap-6">
            <ChannelBreakdown />
            <PendingTasks />
          </div>
        </div>
        <div className="xl:col-span-4 h-full">
          <AIInsights />
        </div>
      </div>
      <FloatingButton />
    </>
  );
};

export default DashboardLayout;