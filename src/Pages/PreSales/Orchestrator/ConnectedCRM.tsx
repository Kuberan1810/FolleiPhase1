import { useState } from "react";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import hubspotIcon from "../../../assets/crm/hubsoft.png";
import zohoIcon from "../../../assets/crm/zoho.png";
import pipedriveIcon from "../../../assets/crm/pipe.png";
import copperIcon from "../../../assets/crm/cooper.png";
import keapIcon from "../../../assets/crm/keap.png";

// Logo components
const SalesforceLogo = () => (
  <svg className="w-10 h-10 shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.8 9.5C18.2 6.5 15.5 4.3 12.3 4.3c-2.3 0-4.3 1.1-5.6 2.8C6.3 6.8 5.8 6.7 5.3 6.7c-2.6 0-4.8 2.1-4.8 4.8 0 .1 0 .3.1.4C.2 12.2 0 12.6 0 13c0 2.2 1.8 4 4 4h14.5c2.5 0 4.5-2 4.5-4.5 0-2.3-1.7-4.2-4.2-4.5z"
      fill="#00A1E0"
    />
  </svg>
);

const HubSpotLogo = () => (
  <img src={hubspotIcon} className="w-10 h-10 object-contain shrink-0" alt="HubSpot" />
);

const ZohoLogo = () => (
  <img src={zohoIcon} className="w-10 h-10 object-contain shrink-0" alt="Zoho" />
);

const PipedriveLogo = () => (
  <img src={pipedriveIcon} className="w-10 h-10 object-contain shrink-0" alt="Pipedrive" />
);

const CopperLogo = () => (
  <img src={copperIcon} className="w-10 h-10 object-contain shrink-0" alt="Copper" />
);

const KeapLogo = () => (
  <img src={keapIcon} className="w-10 h-10 object-contain shrink-0" alt="Keap" />
);

const CircleCheckFilled = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <circle cx="8" cy="8" r="8" />
    <path
      d="M5.5 8L7 9.5L10.5 6"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

interface CRMItem {
  id: string;
  name: string;
  connectedText: string;
  logo: React.ComponentType;
  isConnected: boolean;
}

const ConnectedCRM = () => {
  const navigate = useNavigate();
  const [crms, setCrms] = useState<CRMItem[]>([
    { id: "salesforce", name: "Salesforce CRM", connectedText: "Connected 2d ago", logo: SalesforceLogo, isConnected: true },
    { id: "hubspot", name: "HubSpot CRM", connectedText: "Connected on 12 Jan 2026", logo: HubSpotLogo, isConnected: true },
    { id: "zoho", name: "Zoho CRM", connectedText: "Connected on 12 Jan 2026", logo: ZohoLogo, isConnected: true },
    { id: "pipedrive", name: "Pipedrive", connectedText: "Connected on 12 Jan 2026", logo: PipedriveLogo, isConnected: true },
    { id: "copper", name: "Copper CRM", connectedText: "Connected on 12 Jan 2026", logo: CopperLogo, isConnected: true },
    { id: "keap", name: "Keap", connectedText: "Connected on 12 Jan 2026", logo: KeapLogo, isConnected: true }
  ]);
  const [disconnectingCrm, setDisconnectingCrm] = useState<CRMItem | null>(null);

  const disconnectCRM = (id: string) => {
    setCrms(prev => prev.filter(c => c.id !== id));
    toast.success("CRM integration removed successfully");
  };

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 font-['Inter'] min-h-screen lg:mb-0 mb-20">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 w-full">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
        >
          <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
        {/* <button
          onClick={() => navigate("/presales/data-import")}
          className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center animate-in fade-in zoom-in-50 duration-300"
        >
          <ArrowLeft className="w-6 h-6 text-[#0B1C30]" />
        </button> */}
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#0F172A] font-manrope">
            Connected CRM
          </h1>
          <p className="text-[13px] md:text-base text-[#64748B] mt-1 font-regular font-inter">
            Manage your integrated enterprise ecosystems and synchronize AI-driven customer insights across your connected platforms.
          </p>
        </div>
      </div>

      {/* CRM list */}
      <div className="flex flex-col gap-4">
        {crms.map(crm => {
          const Logo = crm.logo;
          return (
            <div
              key={crm.id}
              className="BoxStyle p-5 md:p-6 flex items-center justify-between gap-4 border border-[#EDF3FD] bg-white transition-all duration-300 hover:shadow-xs hover:border-[#005B96]/30"
            >
              <div
                onClick={() => navigate(`/presales/connected-crm/${crm.id}`)}
                className="flex items-center gap-4 cursor-pointer group/item flex-1"
              >
                <Logo />
                <div>
                  <h3 className="font-manrope font-bold text-[16px] md:text-[18px] text-[#191C1E] group-hover/item:text-[#005B96] transition-colors">
                    {crm.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-[#464555] text-[13px]">
                    {crm.isConnected ? (
                      <>
                        <CircleCheckFilled size={14} className="shrink-0" />
                        <span>{crm.connectedText}</span>
                      </>
                    ) : (
                      <span className="text-[#94A3B8]">Disconnected</span>
                    )}
                  </div>
                </div>
              </div>
              {crm.isConnected && (
                <button
                  onClick={() => setDisconnectingCrm(crm)}
                  className="text-[13px] md:text-[14px] font-semibold px-5 py-2.5 rounded-xl cursor-pointer border border-[#E2E8F0] bg-white hover:bg-[#DC262610] hover:text-[#333] hover:border-[#DC2626] text-[#64748B] transition-all duration-300"
                >
                  Disconnect
                </button> 
              )}
            </div>
          );
        })}
      </div>

      {/* Disconnect Confirmation Modal */}
      {disconnectingCrm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full mx-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
            {/* Warning Icon Banner */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF2F2] border border-[#FEE2E2] shrink-0">
              <AlertTriangle className="h-7 w-7 text-[#DC2626]" />
            </div>
            
            {/* Title & Description */}
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-[20px] font-semibold text-[#191C1E] font-manrope">
                Disconnect {disconnectingCrm.name}?
              </h2>
              <p className="text-[14px] text-[#64748B] leading-relaxed  max-w-sm">
                Disconnecting will stop real-time lead synchronization and AI insight generation for this platform. This action may affect your active workflows.
              </p>
            </div>
            
            {/* Button Actions */}
            <div className="flex items-center gap-4 w-full mt-2">
              <button
                onClick={() => setDisconnectingCrm(null)}
                className="flex-1 border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50 text-[14px] font-bold py-3.5 rounded-xl cursor-pointer transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  disconnectCRM(disconnectingCrm.id);
                  setDisconnectingCrm(null);
                }}
                className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[14px] font-bold py-3.5 rounded-xl cursor-pointer transition-all active:scale-[0.98] shadow-md shadow-red-600/10"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectedCRM;
