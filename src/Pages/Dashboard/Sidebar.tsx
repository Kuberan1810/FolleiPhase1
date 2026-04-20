import { LayoutDashboard, Users, BarChart, Settings, LogOut, X, Activity } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, onClose }: { open?: boolean; onClose?: () => void }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-4 px-6 lg:px-8 py-3 lg:py-3.5 transition-colors border-l-4
    ${isActive
      ? 'bg-[#F2F8FE] text-[#0B3A64] font-semibold border-[#0B3A64]'
      : 'text-[#6B7A90] hover:bg-gray-50 hover:text-gray-900 font-medium border-transparent'}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-[256px] bg-white flex flex-col h-full shrink-0 border-r border-[#F0F2F5]
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 sm:h-20 lg:h-24 flex items-center px-6 lg:px-8 shrink-0 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#0B3A64] rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-black text-[17px] lg:text-[18px] text-[#0C4A6E] leading-[18px] mb-1 font-['Inter']">LiveTracker</h1>
              <p className="text-[9px] lg:text-[10px] text-[#A6AEB8] font-semibold tracking-widest uppercase">Precision Orchestrator</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button onClick={onClose} className="lg:hidden p-1 text-[#6B7A90] hover:bg-gray-100 rounded-full">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          <NavLink to="/" onClick={onClose} className={navLinkClass} end>
            <LayoutDashboard size={19} strokeWidth={2.5} />
            <span className="text-[14px] lg:text-[15px]">Dashboard</span>
          </NavLink>
          <NavLink to="/customer-insights" onClick={onClose} className={navLinkClass}>
            <Users size={19} strokeWidth={2} />
            <span className="text-[14px] lg:text-[15px]">Customer Insights</span>
          </NavLink>
          <NavLink to="/reports" onClick={onClose} className={navLinkClass}>
            <BarChart size={19} strokeWidth={2} />
            <span className="text-[14px] lg:text-[15px]">Reports</span>
          </NavLink>
          <NavLink to="/flow-builder" onClick={onClose} className={navLinkClass}>
            <Activity size={19} strokeWidth={2.5} />
            <span className="text-[14px] lg:text-[15px]">Flow Builder</span>
          </NavLink>
        </nav>

        {/* Bottom section */}
        <div className="p-4 lg:p-6 shrink-0 mt-auto">
          <div className="bg-[#EAF1F8] p-4 lg:p-5 rounded-xl mb-4 lg:mb-6 border border-[#D5E1F2]/50 shadow-sm">
            <h4 className="font-semibold text-[#0B3A64] text-[14px] lg:text-[15px] mb-1">Upgrade Plan</h4>
            <p className="text-[12px] lg:text-[13px] text-[#6B7A90] mb-3 lg:mb-4 leading-relaxed">Get advanced analytics and automation tools.</p>
            <button className="w-full bg-[#0B3A64] text-white py-2 lg:py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-[#092e4f] cursor-pointer">
              Upgrade Now
            </button>
          </div>

          <div className="space-y-1">
            <NavLink to="/settings" onClick={onClose} className="w-full flex items-center gap-4 px-8 py-2 text-[#6B7A90] hover:text-[#0B3A64] font-medium transition-colors cursor-pointer">
              <Settings size={19} strokeWidth={2} />
              <span className="text-[14px] lg:text-[15px]">Settings</span>
            </NavLink>
            <button className="w-full flex items-center gap-4 px-8 py-2 text-[#6B7A90] hover:text-[#0B3A64] font-medium transition-colors cursor-pointer">
              <LogOut size={19} strokeWidth={2} />
              <span className="text-[14px] lg:text-[15px]">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;