import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
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
    const location = useLocation();
    const navigate = useNavigate();
    const lead = location.state?.lead;

    return (
        <div className="min-h-screen pb-12 ">
            {/* Back Button */}
            <div className="pt-4 px-6 mb-5">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#464555] hover:text-[#004370] transition-all duration-300 cursor-pointer font-semibold group"
                >
                    <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
                    Back to Leads
                </button>
            </div>
            <div className="flex flex-col gap-6 w-full ">
                {/* Header Section */}
                <ProfileHeader lead={lead} />

                {/* Pipeline Stepper */}
                <ProfilePipeLine />

                {/* Metrics */}
                <MetricsCards />

                {/* Responsive Masonry / Two-Column Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full items-start">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        <ContactDetailsCard lead={lead} />
                        <UpcomingActivitiesCard />
                        <LeadNotesCard lead={lead} />
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