import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Download, Plus, FileText, MoreVertical, Mail, MessageSquareIcon } from 'lucide-react';
import { Whatsapp } from 'iconsax-react';

const MOCK_DRAFTS = [
  {
    id: "1", name: "GrowthX",
    selectedChannels: ["whatsapp", "mail"],
    currentStep: 3, savedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2", name: "Customer Re-engagement Program",
    selectedChannels: ["whatsapp", "mail"],
    currentStep: 3, savedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3", name: "Product Awareness Campaign",
    selectedChannels: ["whatsapp", "mail", "phone"],
    currentStep: 3, savedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4", name: "Intelligent Outreach Flow",
    selectedChannels: [],
    currentStep: 1, savedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const getRelativeTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMinutes < 60) return `${diffInMinutes || 1} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays === 1) return `Yesterday`;
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  return `${diffInMonths} months ago`;
};

const CampaignDrafts = () => {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<any[]>([]);
  const [activeKebab, setActiveKebab] = useState<string | null>(null);
  const [kebabPos, setKebabPos] = useState<{top: number, left: number} | null>(null);
  const kebabBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("campaign_drafts");
      if (stored) {
        setDrafts(JSON.parse(stored));
      } else {
        setDrafts(MOCK_DRAFTS);
        localStorage.setItem("campaign_drafts", JSON.stringify(MOCK_DRAFTS));
      }
    } catch {
      setDrafts(MOCK_DRAFTS);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setActiveKebab(null);
    if (activeKebab) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeKebab]);

  const handleKebabClick = (e: React.MouseEvent, draftId: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setKebabPos({ top: rect.bottom, left: rect.left - 100 });
    setActiveKebab(activeKebab === draftId ? null : draftId);
  };

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 font-['Inter'] min-h-screen lg:mb-0 mb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-[#191C1E] font-extrabold text-[24px] sm:text-[30px] leading-[32px] sm:leading-[36px] tracking-[0px] font-manrope">
            Draft Campaigns
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#004370] hover:bg-[#001E40] text-white font-inter font-semibold text-[13px] px-4 py-2 rounded-[10px] transition-colors">
            <Download size={15} />
            Export
          </button>
          <button
            onClick={() => navigate("/presales/campaigns/create/step/1")}
            className="w-9 h-9 rounded-full bg-[#004370] hover:bg-[#001E40] flex items-center justify-center transition-colors">
            <Plus size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="bg-white mb-20 relative overflow-visible">
        <div className="overflow-x-auto overflow-y-visible relative">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F6FAFF] font-manrope font-bold text-[#434655] uppercase tracking-[1.1px] leading-none">
                <th className="px-8 py-4">Campaign</th>
                <th className="px-8 py-4">Channel</th>
                <th className="px-8 py-4">Progress</th>
                <th className="px-8 py-4">Last Edited</th>
                <th className="px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {drafts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-[80px]">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <FileText size={48} className="text-[#D9D9D9]" />
                      <p className="font-manrope font-semibold text-[18px] text-[#191C1E]">
                        No saved drafts yet
                      </p>
                      <p className="font-inter text-[14px] text-[#94A3B8]">
                        When you save a campaign as draft, it will appear here.
                      </p>
                      <button
                        onClick={() => navigate("/presales/campaigns/create/step/1")}
                        className="bg-[#004370] hover:bg-[#001E40] text-white font-inter font-semibold text-[14px] px-5 py-2.5 rounded-[10px] transition-colors mt-2">
                        Create Campaign
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                drafts.map((draft) => {
                  const progress = Math.round(((draft.currentStep - 1) / 3) * 100);
                  return (
                    <tr key={draft.id} className="transition-colors hover:bg-[#F8FAFC]">
                      <td className="px-8 py-8">
                        <div className="text-[18px] font-bold text-[#001E40] font-manrope">
                          {draft.name}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex gap-2 items-center">
                          <Whatsapp size={20} color="#004370" />
                          <Mail size={20} className="text-[#004370]" />
                          <MessageSquareIcon size={20} className="text-[#004370]" />
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-3">
                          <div className="w-[120px] h-[6px] bg-[#D9D9D9] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#004370] rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="font-manrope font-medium text-[14px] uppercase leading-none tracking-[0px] text-[#001E40]">
                            {String(progress).padStart(2, '0')}%
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className="font-manrope font-medium text-[18px] leading-[24px] tracking-[0px] text-[#001E40]">
                          {getRelativeTime(draft.savedAt)}
                        </span>
                      </td>
                      <td className="px-8 py-4 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleKebabClick(e, draft.id);
                          }}
                          className="text-[#94A3B8] hover:text-[#004370] transition-colors p-1"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {activeKebab === draft.id && kebabPos && ReactDOM.createPortal(
                          <div
                            onMouseDown={(e) => e.stopPropagation()}
                            style={{ position: 'fixed', top: kebabPos.top, left: kebabPos.left, zIndex: 9999 }}
                            className="bg-white border border-[#E2E8F0] rounded-[10px] shadow-sm w-[160px] py-1"
                          >
                            <button
                              onClick={() => {
                                localStorage.setItem("resume_draft_id", draft.id);
                                navigate(`/presales/campaigns/create/step/${draft.currentStep}`);
                              }}
                              className="w-full text-left px-4 py-2.5 font-manrope font-medium text-[12px] leading-none tracking-[0%] text-[#001E40] hover:bg-[#F6FAFF] transition-colors"
                            >
                              Continue Editing
                            </button>
                            <button
                              className="w-full text-left px-4 py-2.5 font-manrope font-medium text-[12px] leading-none tracking-[0%] text-[#001E40] hover:bg-[#F6FAFF] transition-colors"
                            >
                              Duplicate
                            </button>
                            <button
                              disabled
                              className="w-full text-left px-4 py-2.5 font-manrope font-medium text-[12px] leading-none tracking-[0%] text-[#94A3B8] cursor-not-allowed"
                            >
                              Launch
                            </button>
                            <button
                              onClick={() => {
                                const updated = drafts.filter(d => d.id !== activeKebab);
                                setDrafts(updated);
                                localStorage.setItem("campaign_drafts", JSON.stringify(updated));
                                setActiveKebab(null);
                              }}
                              className="w-full text-left px-4 py-2.5 font-manrope font-medium text-[12px] leading-none tracking-[0%] text-[#001E40] hover:bg-[#F6FAFF] transition-colors"
                            >
                              Delete
                            </button>
                          </div>,
                          document.body
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignDrafts;
