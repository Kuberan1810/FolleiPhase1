import { Search, Bell, HelpCircle, Settings } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-[88px] bg-white flex items-center justify-between px-10 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        {/* Search */}
        <div className="relative w-[540px] hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Search customer documentation..." 
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0B3A64]/20 transition-all placeholder:text-[#9CA3AF] font-medium text-gray-700"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2.5 text-[#6B7A90] hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <Bell size={22} strokeWidth={2} />
          <span className="absolute top-[8px] right-[10px] w-[9px] h-[9px] bg-[#E74C3C] rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2.5 text-[#6B7A90] hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <HelpCircle size={20} strokeWidth={2} />
        </button>
        <button className="p-2.5 text-[#6B7A90] hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <Settings size={22} strokeWidth={2} />
        </button>
        <div className="h-8 w-px bg-gray-200 mx-3"></div>
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
          <img 
            className="w-full h-full object-cover"
            src="https://ui-avatars.com/api/?name=Admin&background=0B3A64&color=fff"
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
