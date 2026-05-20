import SalesToggleSwitch from "../../../../Component/SalesToggleSwitch";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="font-inter text-[11px] uppercase tracking-widest text-[#64748B]">
          INTELLIGENCE HUB
        </div>
        <div className="font-manrope font-bold text-[30px] text-[#191C1E]">
          Dashboard
        </div>
      </div>
      <div>
        <SalesToggleSwitch />
      </div>
    </div>
  );
};

export default DashboardHeader;