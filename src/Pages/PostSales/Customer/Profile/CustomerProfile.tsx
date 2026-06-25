import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProfileHeader from './section/ProfileHeader';
import MetricsCards from './section/MetricsCards';
import ContactDetailsCard from './section/ContactDetailsCard';
import PurchasedProductsCard from './section/PurchasedProductsCard';
import UpcomingActivitiesCard from './section/UpcomingActivitiesCard';
import LeadNotesCard from './section/LeadNotesCard';
import SupportTicketsCard from './section/SupportTicketsCard';
import AttachmentsCard from './section/AttachmentsCard';
import ActivityTimelineCard from './section/ActivityTimelineCard';

const defaultCustomer = {
  id: 'CUS-000124',
  name: 'Sophia Miller',
  email: 'sophia.m@gmail.com',
  initials: 'SM',
  status: 'Active',
  renewalDate: 'Jan 28, 2026',
  daysRemaining: '45 days',
  usage: 'High',
  lastActivity: '2 mins ago',
  lastActivityPlatform: 'Whatsapp',
  phone: '+91 93765 43210',
  location: 'Bangalore, India',
  company: 'ABC Technologies',
  title: 'Senior Procurement Manager',
  activeProducts: 4
};

const CustomerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customer = location.state?.customer || defaultCustomer;
  const [showDetailedProducts, setShowDetailedProducts] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="pt-4 px-6 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#464555] hover:text-[#004370] transition-all duration-300 cursor-pointer font-semibold group"
        >
          <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
          Back
        </button>
      </div>
      <div className="flex flex-col gap-6 w-full px-6">
        {/* Header Section */}
        <ProfileHeader customer={customer} />

        {/* Metrics */}
        {!showDetailedProducts && <MetricsCards />}

        {showDetailedProducts ? (
          <div className="w-full">
            <PurchasedProductsCard
              customer={customer}
              isDetailedView={true}
              onBack={() => setShowDetailedProducts(false)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <ContactDetailsCard />
              <PurchasedProductsCard
                customer={customer}
                onViewAllClick={() => setShowDetailedProducts(true)}
              />
              <UpcomingActivitiesCard />
              <LeadNotesCard />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <SupportTicketsCard />
              <AttachmentsCard />
              <ActivityTimelineCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;