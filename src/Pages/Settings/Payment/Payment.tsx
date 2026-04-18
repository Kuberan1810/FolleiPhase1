import React, { useState } from 'react';
import BillingTable from './Section/BillingTable';
import PaymentOverview from './Section/PaymentOverview';
import Plans from './Section/Plans';


type TabType = 'Overview' | 'Plans' | 'Payment Method';

const Payment = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');

  return (
    <div className="w-full p-6 font-['Inter']">

      {/* Header */}
      <header className="mb-6">
        <p className="text-[12px] font-semibold text-[#004370] tracking-[1.2px] uppercase mb-1">
          Intelligence Hub
        </p>
        <h1 className="text-[32px] font-extrabold text-[#191C1E] font-[Manrope] tracking-tight">
          Payment and Subscription
        </h1>
      </header>

      {/* Tabs */}
      <nav className="flex gap-20 mb-8 border-b border-slate-200 font-regular">
        {['Overview', 'Plans', 'Payment Method'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`pb-4 text-[14px] font-semibold transition-all relative cursor-pointer ${
              activeTab === tab
                ? 'text-[#004370] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0284C7]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="mt-4">

        {activeTab === 'Overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <PaymentOverview />
            <BillingTable />
          </div>
        )}

        {activeTab === 'Plans' && (
          <div className="animate-in fade-in duration-500">
            <Plans />
          </div>
        )}

        {activeTab === 'Payment Method' && (
          <div className="py-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">
            Payment Method configuration will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;