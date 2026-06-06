
import { Link, NavLink, Outlet } from 'react-router-dom';


const Payment = () => {
  // Mapping tabs to their actual URL paths
  const tabs = [
    { id: 'Overview', name: 'Overview', path: '/settings/payment' },
    { id: 'Plans', name: 'Plans', path: '/settings/payment/plans' },
    { id: 'Payment Method', name: 'Payment Method', path: '/settings/payment/paymentmethod' },
  ];

  return (
    <div className="w-full font-['Inter']">

      {/* Breadcrumb + Header */}
      <div className="flex flex-col items-start gap-4 mb-6">
        <div className="flex flex-col items-start gap-3.5">
          <div className="flex items-center gap-2 text-[14px] font-medium">
            <Link to="/settings" className="text-[#626262] hover:text-[#004370] transition-colors cursor-pointer">Settings</Link>
            <span className="text-[#626262]">{'>'}</span>
            <span className="text-[#004370] font-medium">Payment and Subscription</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-[#004370] uppercase tracking-[0.15em] block">
              Intelligence Hub
            </span>
            <h1 className="text-[30px] font-bold text-[#191C1E] tracking-tight">Payment and Subscription</h1>
          </div>
        </div>
      </div>

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