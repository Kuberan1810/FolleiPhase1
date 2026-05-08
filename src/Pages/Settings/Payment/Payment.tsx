import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Payment = () => {
  // Mapping tabs to their actual URL paths
  const tabs = [
    { id: 'Overview', name: 'Overview', path: '/settings/payment' },
    { id: 'Plans', name: 'Plans', path: '/settings/payment/plans' },
    { id: 'Payment Method', name: 'Payment Method', path: '/settings/payment/paymentmethod' },
  ];

  return (
    <div className="w-full font-['Inter']">

      {/* Header */}
      <header className="mb-6">
        <p className="text-[12px] font-semibold text-[#004370] tracking-[1.2px] uppercase mb-1">
          Intelligence Hub
        </p>
        <h1 className="text-[32px] font-extrabold text-[#191C1E] font-[Manrope] tracking-tight">
          Payment and Subscription
        </h1>
      </header>

      {/* Tabs - Using NavLink instead of Button */}
      <nav className="flex gap-20 mb-8 border-b border-slate-200 font-regular">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            end={tab.path === '/settings/payment'} // Ensures exact match for Overview
            className={({ isActive }) =>
              `pb-4 text-[14px] font-semibold transition-all relative cursor-pointer ${
                isActive
                  ? 'text-[#004370] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0284C7]'
                  : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>

      {/* Content - Outlet renders the child routes defined in Routes.tsx */}
      <div className="mt-4 animate-in fade-in duration-500">
        <Outlet />
      </div>
    </div>
  );
};

export default Payment;