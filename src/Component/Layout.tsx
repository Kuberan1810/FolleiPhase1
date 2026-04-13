import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar";
import Header from "../Pages/Dashboard/Header";
import FloatingButton from "./FloatingButton";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F9FC] text-primary overflow-hidden font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-[32px] bg-[#F8F9FC] border-t border-l border-[#F0F2F5] shadow-inner relative">
          <div className="w-full mx-auto flex flex-col gap-5 sm:gap-6 lg:gap-[32px]">
            <Outlet />

            {/* Footer */}
            <footer className="mt-8 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200/30">
              <p
                className="text-[11px] font-medium font-['Inter'] uppercase"
                style={{ color: '#94A3B8', lineHeight: '16.5px', letterSpacing: '1.1px' }}
              >
                © 2026 CUSTOMER LIVE TRACKER • SYSTEM STATUS: OPERATIONAL
              </p>
              <div className="flex gap-4 lg:gap-8">
                <a href="#" className="text-[10px] lg:text-[11px] font-medium font-['Inter'] text-[#6B7A90] tracking-[0.05em] uppercase hover:text-[#0B3A64] transition-colors">Privacy Policy</a>
                <a href="#" className="text-[10px] lg:text-[11px] font-medium font-['Inter'] text-[#6B7A90] tracking-[0.05em] uppercase hover:text-[#0B3A64] transition-colors">Terms of Service</a>
                <a href="#" className="text-[10px] lg:text-[11px] font-medium font-['Inter'] text-[#6B7A90] tracking-[0.05em] uppercase hover:text-[#0B3A64] transition-colors">API Docs</a>
              </div>
            </footer>
          </div>
        </main>
        <FloatingButton />
      </div>
    </div>
  );
};

export default Layout;
