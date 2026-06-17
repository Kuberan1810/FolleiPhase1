import ProfileHeader from "./section/ProfileHeader";
import ProfilePipeLine from "./section/ProfilePipeLine";
import MetricsCards from "./section/MetricsCards";
import ContactDetailsCard from "./section/ContactDetailsCard";
import UpcomingActivitiesCard from "./section/UpcomingActivitiesCard";
import LeadNotesCard from "./section/LeadNotesCard";
import CampaignParticipationCard from "./section/CampaignParticipationCard";
import AttachmentsCard from "./section/AttachmentsCard";
import ActivityTimelineCard from "./section/ActivityTimelineCard";

const LeadProfile = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-12 font-manrope">
            <div className="flex flex-col gap-6 w-full">
                {/* Header Section */}
                <ProfileHeader />

                {/* Pipeline Stepper */}
                <ProfilePipeLine />

                {/* Metrics */}
                <MetricsCards />
                
                {/* Responsive Masonry / Two-Column Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full items-start">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        <ContactDetailsCard />
                        <UpcomingActivitiesCard />
                        <LeadNotesCard />
                    </div>
                    
                    {/* Right Column */}
                    <div className="flex flex-col gap-6">
                        <CampaignParticipationCard />
                        <AttachmentsCard />
                        <ActivityTimelineCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadProfile;