import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import EnablementHeader from './section/EnablementHeader';
import ProductUsage from './section/ProductUsage';
import ProductUnderstanding from './section/ProductUnderstanding';
import AiInsights from './section/AiInsights';
import HealthSummary from './section/HealthSummary';
import MilestoneTimeline from './section/MilestoneTimeline';

const mockCustomers = [
  { id: 'CUS-101', name: 'Sophia Miller', product: 'Acme Corp', plan: 'Enterprise', avatarBg: '#DDEBFF', avatarText: '#004370', stage: 'Account Setup', learningProgress: 80, adoptionScore: 88, lastLogin: '2 hours ago' },
  { id: 'CUS-102', name: 'Marcus Davids', product: 'Global Logistics', plan: 'Professional', avatarBg: '#E0F2FE', avatarText: '#0369A1', stage: 'Data Import', learningProgress: 65, adoptionScore: 45, lastLogin: '1 day ago' },
  { id: 'CUS-103', name: 'Riley Wong', product: 'TechFlow Inc.', plan: 'Enterprise', avatarBg: '#FFE4E6', avatarText: '#BE123C', stage: 'Data Import', learningProgress: 40, adoptionScore: 22, lastLogin: '5 days ago' },
  { id: 'CUS-104', name: 'Beth Lopez', product: 'Urban Design', plan: 'Basic', avatarBg: '#F1F5F9', avatarText: '#475569', stage: 'Account Setup', learningProgress: 25, adoptionScore: 5, lastLogin: '2 weeks ago' }
];

const CustomerEnablement: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Find customer from location state or mock list
  const stateCustomer = location.state?.customer;
  const customer = stateCustomer || mockCustomers.find(c => c.id === customerId) || mockCustomers[0];

  return (
    <div className="min-h-screen pt-4 pb-12">
      {/* Back button & Title Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
          >
            <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
          <div>
            <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
              Customer Enablement
            </h1>
            <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
              Track customer readiness and product adoption.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Header Card */}
      <EnablementHeader customer={customer} />

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Left Column - Product Usage & Understanding */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ProductUsage customerName={customer.name} />
          <ProductUnderstanding />
        </div>

        {/* Right Column - AI Insights & Health Summary */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <AiInsights />
          <HealthSummary customerName={customer.name} productName={customer.product} />
        </div>
      </div>

      {/* Bottom Timeline Section */}
      <div className="mt-8">
        <MilestoneTimeline />
      </div>
    </div>
  );
};

export default CustomerEnablement;
