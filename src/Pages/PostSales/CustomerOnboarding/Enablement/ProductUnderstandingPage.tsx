import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EnablementHeader from './section/EnablementHeader';
import LearningProgress from './section/LearningProgress';
import ProductDemoVideos from './section/ProductDemoVideos';
import TrainingSessions from './section/TrainingSessions';

const mockCustomers = [
  { id: 'CUS-101', name: 'Sophia Miller', product: 'Acme Corp', plan: 'Enterprise', avatarBg: '#DDEBFF', avatarText: '#004370', stage: 'Account Setup', learningProgress: 80, adoptionScore: 88, lastLogin: '2 hours ago' },
  { id: 'CUS-102', name: 'Marcus Davids', product: 'Global Logistics', plan: 'Professional', avatarBg: '#E0F2FE', avatarText: '#0369A1', stage: 'Data Import', learningProgress: 65, adoptionScore: 45, lastLogin: '1 day ago' },
  { id: 'CUS-103', name: 'Riley Wong', product: 'TechFlow Inc.', plan: 'Enterprise', avatarBg: '#FFE4E6', avatarText: '#BE123C', stage: 'Data Import', learningProgress: 40, adoptionScore: 22, lastLogin: '5 days ago' },
  { id: 'CUS-104', name: 'Beth Lopez', product: 'Urban Design', plan: 'Basic', avatarBg: '#F1F5F9', avatarText: '#475569', stage: 'Account Setup', learningProgress: 25, adoptionScore: 5, lastLogin: '2 weeks ago' },

];

const ProductUnderstandingPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const location = useLocation();

  const stateCustomer = location.state?.customer;
  const customer = stateCustomer || mockCustomers.find(c => c.id === customerId) || mockCustomers[0];

  return (
    <div className="min-h-screen pt-4 pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>

          <h1
            className="tracking-tight"
            style={{
              fontWeight: 700,
              fontSize: '36px',
              lineHeight: '44px',
              letterSpacing: '-0.72px',
              color: '#191C1E'
            }}
          >
            Product Understanding
          </h1>
          <p
            className="mt-1"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#434655'
            }}
          >
            Track how well customers understand and use the product.
          </p>
        </div>
      </div>

      {/* Customer Header Card */}
      <EnablementHeader customer={customer} />

      {/* Top Section Layout  */}
      <div className="mt-8">
        <LearningProgress customer={customer} />
      </div>

      {/* Bottom Side-by-Side Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Left Card: Product Demo Videos table */}
        <div className="lg:col-span-7">
          <ProductDemoVideos />
        </div>

        {/* Right Card: Training Sessions list */}
        <div className="lg:col-span-5">
          <TrainingSessions />
        </div>
      </div>
    </div>
  );
};

export default ProductUnderstandingPage;
