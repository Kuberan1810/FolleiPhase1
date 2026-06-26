import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";
import BtnCom from "../../../../Component/BtnCom";

import salesforceLogo from "../../../../assets/crm/salesforce.png";
import hubspotLogo from "../../../../assets/crm/hubsoft.png";
import zohoLogo from "../../../../assets/crm/zoho.png";
import pipedriveLogo from "../../../../assets/crm/pipe.png";
import microsoftLogo from "../../../../assets/crm/microsoft.png";
import freshsalesLogo from "../../../../assets/crm/freshsales.png";
import copperLogo from "../../../../assets/crm/cooper.png";
import insightlyLogo from "../../../../assets/crm/insight.png";
import keapLogo from "../../../../assets/crm/keap.png";

const CRM_LIST = [
  { id: "salesforce", name: "Salesforce", logo: salesforceLogo },
  { id: "hubspot", name: "HubSpot CRM", logo: hubspotLogo },
  { id: "zoho", name: "Zoho CRM", logo: zohoLogo },
  { id: "pipedrive", name: "Pipedrive", logo: pipedriveLogo },
  { id: "microsoft", name: "Microsoft D365", logo: microsoftLogo },
  { id: "freshsales", name: "Freshsales", logo: freshsalesLogo },
  { id: "copper", name: "Copper CRM", logo: copperLogo },
  { id: "insightly", name: "Insightly CRM", logo: insightlyLogo },
  { id: "keap", name: "Keap", logo: keapLogo },
];

const CrmConnect: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrm, setSelectedCrm] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseAll = () => {
    setIsConnecting(false);
    setShowSuccess(false);
    setIsModalOpen(false);
    setSelectedCrm(null);
  };

  const handleConnectCrm = () => {
    if (!selectedCrm) return;
    setIsConnecting(true);
    setShowSuccess(false);

    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  };

  return (
    <div className="col-span-12 lg:col-span-7 BoxStyle flex flex-col justify-between">
      <h3 className="text-[20px] font-bold text-[#000000] mb-3.5 leading-[1.2] tracking-[0.6px]">CRM Connect</h3>
      <div className="flex items-center gap-[15px] w-full">
        <input
          type="text"
          readOnly
          value="https://follei-vercel-eta.vercel.app/presales/data-import"
          className="flex-1 px-4 py-2 bg-white border border-[#CAD4E0] rounded-[10px] text-sm text-slate-800 focus:outline-none focus:border-[#014370] transition-colors"
        />
        <button
          className="text-[#000000] font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center rounded-[218px] shrink-0"
          style={{
            width: '91px',
            height: '34px',
            backgroundColor: '#E5ECF1',
            boxShadow: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          Connect
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[#000000] font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center rounded-[218px] shrink-0 px-4 whitespace-nowrap hover:opacity-90 active:scale-95"
          style={{
            height: '34px',
            backgroundColor: '#DCEFFE',
            boxShadow: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          Available CRM
        </button>
      </div>

      {/* Available CRM Popup Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/55 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => {
            if (!isConnecting || showSuccess) {
              handleCloseAll();
            }
          }}
        >
          <div
            className="bg-white rounded-[10px] w-full max-w-[1100px] p-6 flex flex-col gap-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[24px] leading-[20px] text-[#000000] font-inter">Available CRM</h2>
              <button
                disabled={isConnecting && !showSuccess}
                onClick={handleCloseAll}
                className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <X size={18} />
              </button>
            </div>

            {/* CRM Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
              {CRM_LIST.map((crm) => {
                const isSelected = selectedCrm === crm.id;
                return (
                  <div
                    key={crm.id}
                    onClick={() => {
                      if (!isConnecting) {
                        setSelectedCrm(crm.id);
                      }
                    }}
                    className={`border rounded-[10px] w-full p-5 flex flex-col justify-between items-start cursor-pointer select-none transition-all duration-200
                      ${isSelected
                        ? 'border-[#005B96] bg-[#005B96]/5 ring-1 ring-[#005B96]'
                        : 'border-[#DCD7D7] bg-white hover:bg-slate-50'
                      }`}
                  >
                    <div className="w-[46px] h-[46px] flex items-center justify-center shrink-0">
                      <img src={crm.logo} className="max-w-full max-h-full object-contain" alt={crm.name} />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                      <span className="font-semibold text-[20px] text-black leading-tight ">{crm.name}</span>
                      <span className="text-[14px] text-[#868686] font-medium">No connection yet</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-2">
              <BtnCom
                disabled={!selectedCrm || isConnecting}
                onClick={handleConnectCrm}
                title="Connect"
                variant="primary"
                className="w-[91px]! h-[34px]! py-0! px-0! rounded-[10px]! text-sm!"
              />
            </div>

            {/* Connecting & Success  */}
            {isConnecting && (
              <div className="absolute inset-0 bg-black/65 rounded-[10px] flex items-center justify-center z-[10000] animate-in fade-in duration-200">
                <div className="bg-white rounded-[10px] w-[600px] h-[430px] p-6 flex flex-col items-center justify-center gap-6 relative animate-in zoom-in-95 duration-200">

                  {!showSuccess ? (
                    <>
                      {/* Central Wave Animation - Liquid Circle */}
                      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden bg-white shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)] border border-[#E2E8F0] flex items-center justify-center">
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{ y: "-20%" }}
                          transition={{ duration: 4.2, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute inset-0 w-full h-[150%]"
                        >
                          {/* Wave 1 - Deepest */}
                          <motion.svg
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            className="absolute bottom-0 w-[400%] h-[150%] -left-[100%]"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <path d="M0,80 C150,120 300,40 450,80 C600,120 750,40 900,80 C1050,120 1200,40 1350,80 V120 H0 Z" fill="url(#crm-grad-deep)" />
                            <defs>
                              <linearGradient id="crm-grad-deep" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#7E87FE" />
                                <stop offset="100%" stopColor="#D45EFF" />
                              </linearGradient>
                            </defs>
                          </motion.svg>

                          {/* Wave 2 - Mid */}
                          <motion.svg
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            className="absolute bottom-0 w-[400%] h-[135%] -left-[150%]"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                            style={{ opacity: 0.85 }}
                          >
                            <path d="M0,70 C150,30 300,110 450,70 C600,30 750,110 900,70 C1050,30 1200,110 1350,70 V120 H0 Z" fill="url(#crm-grad-mid)" />
                            <defs>
                              <linearGradient id="crm-grad-mid" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#905EFF" />
                                <stop offset="100%" stopColor="#7E87FE" />
                              </linearGradient>
                            </defs>
                          </motion.svg>

                          {/* Wave 3 - Top / Lightest */}
                          <motion.svg
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            className="absolute bottom-0 w-[400%] h-[120%] -left-[50%]"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            style={{ opacity: 0.95 }}
                          >
                            <path d="M0,60 C150,100 300,20 450,60 C600,100 750,20 900,60 C1050,100 1200,20 1350,60 V120 H0 Z" fill="url(#crm-grad-top)" />
                            <defs>
                              <linearGradient id="crm-grad-top" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#D45EFF" />
                                <stop offset="100%" stopColor="#7E87FE" />
                              </linearGradient>
                            </defs>
                          </motion.svg>
                        </motion.div>
                      </div>

                      <span className="text-[#6E6E6E] font-semibold text-[20px]">
                        Your Connector is Getting Ready...
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Success Checkmark Circle Filled with Gradient */}
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="relative w-[80px] h-[80px] rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{
                          background: 'linear-gradient(180deg, #7E87FE 0%, #D45EFF 100%)'
                        }}
                      >
                        <Check size={50} strokeWidth={3.5} />
                      </motion.div>

                      <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#005B96] font-bold text-[16px] font-inter"
                      >
                        Connected Successfully!
                      </motion.span>

                      {/* Done Button to close modal manually */}
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-2"
                      >
                        <BtnCom
                          onClick={handleCloseAll}
                          title="Done"
                          variant="primary"
                          className="w-[91px]! h-[34px]! py-0! px-0! rounded-[10px]! text-sm!"
                        />
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrmConnect;
