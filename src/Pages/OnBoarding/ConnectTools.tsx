import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MoreHorizontal } from 'lucide-react';
import { integrationsApi } from '../../api/integrations/integrationsApi';
import { onboardingApi } from '../../api/onboarding/onboardingApi';

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
  const [hubSpotToken, setHubSpotToken] = useState('');
  const [showHubSpotModal, setShowHubSpotModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectClick = async (tool: ToolItem) => {
    if (tool.id === 'google-workspace') {
      if (connectedTools[tool.id]) {
        toast('Google Workspace is already connected');
        return;
      }
      try {
        const authorizationUrl = await integrationsApi.startGoogleWorkspace();
        window.location.assign(authorizationUrl);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to start Google Workspace connection');
      }
      return;
    }
    if (tool.id === 'hubspot') {
      setShowHubSpotModal(true);
      return;
    }
    toast(`${tool.name} is not supported by the current backend yet`);
  };

  useEffect(() => {
    const fetchConnections = async () => {
      const [googleResult, crmResult] = await Promise.allSettled([
        integrationsApi.listGoogleConnections(),
        integrationsApi.listCrmConnections(),
      ]);
      if (googleResult.status === 'fulfilled') {
        const googleConnections = googleResult.value;
        if (googleConnections.some((connection) =>
          connection.oauth_connected || connection.status === 'active' || connection.status === 'configured')) {
          setConnectedTools((prev) => ({
            ...prev,
            'google-workspace': true,
          }));
        }
      } else {
        console.warn('Could not load Google Workspace connection state', googleResult.reason);
      }
      if (crmResult.status === 'fulfilled') {
        const crmConnections = crmResult.value;
        if (crmConnections.some((connection) => connection.provider === 'hubspot' && connection.status === 'active')) {
          setConnectedTools((prev) => ({ ...prev, hubspot: true }));
        }
      } else {
        console.warn('Could not load CRM connection state', crmResult.reason);
      }
    };
    fetchConnections();
  }, []);

  const connectHubSpot = async () => {
    if (hubSpotToken.trim().length < 10) {
      toast.error('Enter a valid HubSpot private-app access token');
      return;
    }
    setIsConnecting(true);
    try {
      await integrationsApi.connectHubSpot(hubSpotToken.trim());
      const result = await integrationsApi.syncHubSpot();
      setConnectedTools((previous) => ({ ...previous, hubspot: true }));
      setHubSpotToken('');
      setShowHubSpotModal(false);
      toast.success(`HubSpot connected and synced ${Object.values(result.object_counts).reduce((a, b) => a + b, 0)} records`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'HubSpot connection failed');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFinish = async () => {
    try {
      await onboardingApi.complete();
      navigate('/onboarding/final');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not complete onboarding');
    }
  };

  const hasConnectedTool = Object.values(connectedTools).some(Boolean);

  return (
    <div className="h-screen bg-[#F7F9FB] flex flex-col justify-between p-6 sm:p-10 font-sans overflow-hidden">
      {showHubSpotModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-slate-900">Connect HubSpot</h2>
            <p className="text-sm text-slate-500 mt-2">
              Enter a HubSpot private-app access token. Follei encrypts it and imports contacts, companies, and deals.
            </p>
            <input
              type="password"
              value={hubSpotToken}
              onChange={(event) => setHubSpotToken(event.target.value)}
              placeholder="pat-..."
              autoComplete="off"
              className="mt-5 w-full border border-slate-300 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900"
            />
            <div className="flex justify-end gap-3 mt-5">
              <button type="button" onClick={() => setShowHubSpotModal(false)} className="px-4 py-2 text-sm border rounded-lg" disabled={isConnecting}>Cancel</button>
              <button type="button" onClick={connectHubSpot} className="px-4 py-2 text-sm bg-black text-white rounded-lg disabled:opacity-50" disabled={isConnecting}>
                {isConnecting ? 'Connecting…' : 'Connect and sync'}
              </button>
            </div>
          </div>
        </div>
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
            const isSupported = tool.id === 'google-workspace' || tool.id === 'hubspot';

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
                    disabled={!isSupported}
                    className={`w-full py-2.5 px-4 text-[14px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${isConnected
                      ? 'bg-[#D1FAE5] text-[#047C2E] border border-[#047C2E]/20 '
                      : isSupported ? 'bg-[#000000] text-white hover:bg-black shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    {isConnected ? (
                      <>
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <span>{isSupported ? 'Connect' : 'Coming soon'}</span>
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
