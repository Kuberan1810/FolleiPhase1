import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { OutlookSyncModal } from './modal/ToolConnectModal';

import googleIcon from '../../assets/icons/google.png';
import freshsalesIcon from '../../assets/icons/freshsales.png';
import hubspotIcon from '../../assets/icons/hubspot.png';
import outlookIcon from '../../assets/icons/outlook.png';
import salesforceIcon from '../../assets/icons/salesforce.png';
import slackIcon from '../../assets/icons/slack.png';
import whatsappIcon from '../../assets/icons/whatsapp.png';
import zohoIcon from '../../assets/icons/zoho.png';

const Microsoft365Icon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="#F25022" d="M1 1h10v10H1z" />
    <path fill="#7FBA00" d="M13 1h10v10H13z" />
    <path fill="#00A4EF" d="M1 13h10v10H1z" />
    <path fill="#FFB900" d="M13 13h10v10H13z" />
  </svg>
);

interface ToolItem {
  id: string;
  name: string;
  description: string;
  customIcon: React.ReactNode;
}

const toolItems: ToolItem[] = [
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    description: 'Unified productivity suite for teams.',
    customIcon: <img src={googleIcon} alt="Google Workspace" className="w-6 h-6 object-contain" />,
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Cloud-based subscription to office apps.',
    customIcon: <Microsoft365Icon />,
  },
  {
    id: 'freshsales',
    name: 'Freshsales',
    description: 'All-in-one sales CRM for better pipeline.',
    customIcon: <img src={freshsalesIcon} alt="Freshsales" className="w-6 h-6 object-contain" />,
  },
  {
    id: 'outlook',
    name: 'Outlook',
    description: 'Personal organizer and email manager.',
    customIcon: <img src={outlookIcon} alt="Outlook" className="w-6 h-6 object-contain" />,
  },
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business',
    description: "Reach customers on the world's most popular chat app.",
    customIcon: <img src={whatsappIcon} alt="WhatsApp Business" className="w-6 h-6 object-contain" />,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Where work happens—messaging and collaboration.',
    customIcon: <img src={slackIcon} alt="Slack" className="w-6 h-6 object-contain" />,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM, marketing, and sales software for growth.',
    customIcon: <img src={hubspotIcon} alt="HubSpot" className="w-6 h-6 object-contain" />,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: "The world's #1 customer relationship management platform.",
    customIcon: <img src={salesforceIcon} alt="Salesforce" className="w-6 h-6 object-contain" />,
  },
  {
    id: 'zoho-crm',
    name: 'Zoho CRM',
    description: 'Online CRM software for managing sales, marketing, and support.',
    customIcon: <img src={zohoIcon} alt="Zoho CRM" className="w-6 h-6 object-contain" />,
  },
];

const ConnectTools: React.FC = () => {
  const navigate = useNavigate();
  const [connectedTools, setConnectedTools] = useState<Record<string, boolean>>({});
  const [connectingTool, setConnectingTool] = useState<ToolItem | null>(null);

  const handleConnectClick = (tool: ToolItem) => {
    if (connectedTools[tool.id]) {
      setConnectedTools((prev) => ({
        ...prev,
        [tool.id]: false,
      }));
    } else {
      setConnectingTool(tool);
    }
  };

  const handleModalContinue = () => {
    if (connectingTool) {
      setConnectedTools((prev) => ({
        ...prev,
        [connectingTool.id]: true,
      }));
      setConnectingTool(null);
    }
  };

  const handleModalDisconnect = () => {
    if (connectingTool) {
      setConnectedTools((prev) => ({
        ...prev,
        [connectingTool.id]: false,
      }));
      setConnectingTool(null);
    }
  };

  const handleFinish = () => {
    navigate('/onboarding/final');
  };

  const hasConnectedTool = Object.values(connectedTools).some(Boolean);

  return (
    <div className="h-screen bg-[#F7F9FB] flex flex-col justify-between p-6 sm:p-10 font-sans overflow-hidden">
      {connectingTool && (
        <OutlookSyncModal
          toolName={connectingTool.name}
          toolLogo={connectingTool.customIcon}
          onContinue={handleModalContinue}
          onDisconnect={handleModalDisconnect}
        />
      )}

      {/* Header Section (Fixed at top) */}
      <div className="w-full mx-auto mb-6 shrink-0">
        <h1 className="text-[30px] font-bold text-[#111827] tracking-tight">
          Connect Your Tools
        </h1>
        <p className="text-[15px] text-[#6B7280] mt-2 max-w-2xl leading-relaxed">
          Supercharge your workflow by connecting your favorite communication and CRM tools. Sync data seamlessly across your existing ecosystem.
        </p>
      </div>

      {/* Tools Grid Container (Only this scrolls) */}
      <div className="w-full mx-auto flex-1 overflow-y-auto pr-2 onboarding-scroll min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 pb-6">
          {toolItems.map((tool) => {
            const isConnected = connectedTools[tool.id];

            return (
              <div
                key={tool.id}
                className="bg-white rounded-[8px] border border-gray-200/50 p-5 sm:p-6 flex flex-col justify-between shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10)] hover:shadow-md transition-all"
              >
                <div>
                  {/* Top Bar: Icon */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[4px] bg-[#ECEEF0] flex items-center justify-center">
                      {tool.customIcon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[20px] font-semibold text-[#191C1E]">
                    {tool.name}
                  </h3>
                  <p className="text-[14px] text-[#444748] mt-1 leading-relaxed min-h-[24px]">
                    {tool.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-5 pt-3">
                  <button
                    type="button"
                    onClick={() => handleConnectClick(tool)}
                    className={`w-full py-2.5 px-4 text-[14px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${isConnected
                      ? 'bg-[#D1FAE5] text-[#047C2E] border border-[#047C2E]/20 '
                      : 'bg-[#000000] text-white hover:bg-black shadow-sm'
                      }`}
                  >
                    {isConnected ? (
                      <>
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {/* 10th Card: See More / Other */}
          <div className="bg-white rounded-xl border border-gray-200/50 p-5 sm:p-6 flex flex-col justify-between items-center text-center shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10)] transition-all min-h-[190px]">
            <div className="my-auto flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 mb-2">
                <MoreHorizontal className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-400">More Integrations</span>
            </div>

            <button
              type="button"
              className="w-full py-2.5 px-4 bg-[#0F172A] hover:bg-black text-white text-[14px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>See more</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto pt-4 mt-2 border-t border-gray-200/80 flex items-center justify-between shrink-0 bg-[#F7F9FB]">
        <button
          type="button"
          onClick={handleFinish}
          className="text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
        >
          Skip for now
        </button>

        <button
          type="button"
          onClick={handleFinish}
          disabled={!hasConnectedTool}
          className={`h-[48px] px-6 text-[14px] font-semibold rounded-[4px] transition-all flex items-center gap-2 ${hasConnectedTool
            ? 'bg-[#000000] hover:bg-gray-900 text-white cursor-pointer shadow-sm'
            : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
            }`}
        >
          <span>Finish Setup</span>
        </button>
      </div>
    </div>
  );
};

export default ConnectTools;
