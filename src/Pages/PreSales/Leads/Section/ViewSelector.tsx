import React, { useState } from 'react';
import { ChevronDown, Pencil } from 'lucide-react';
import SettingsModal from './SettingsModal';

type ViewSelectorProps = {
  currentView: string;
  setCurrentView: (view: string) => void;
  onClearAll: () => void;
  setSelectedScores: (scores: string[]) => void;
  setSelectedStatuses: (statuses: string[]) => void;
  setSelectedSources: (sources: string[]) => void;
};

const ViewSelector: React.FC<ViewSelectorProps> = ({
  currentView,
  setCurrentView,
  onClearAll,
  setSelectedScores,
  setSelectedStatuses,
  setSelectedSources
}) => {
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* View Name Select Menu */}
        <div className="relative">
          <button
            onClick={() => setShowViewDropdown(!showViewDropdown)}
            className="flex items-center hover:bg-[#EAEAEA] transition-colors cursor-pointer text-slate-700"
            style={{
              height: '31px',
              borderRadius: '6px',
              paddingTop: '4px',
              paddingBottom: '4px',
              paddingLeft: '5px',
              paddingRight: '5px',
              gap: '7px',
              backgroundColor: '#F7F7F7',
              border: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            <span>{currentView}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
          
          {showViewDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowViewDropdown(false)} />
              <div className="absolute right-0 mt-2 w-[180px] bg-white border border-slate-200 rounded-2xl z-50 py-1.5 overflow-hidden">
                <div
                  onClick={() => {
                    setCurrentView('Default View');
                    onClearAll();
                    setShowViewDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Default View
                </div>
                <div
                  onClick={() => {
                    setCurrentView('Hot Leads');
                    setSelectedScores(['Hot']);
                    setShowViewDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Hot Leads
                </div>
                <div
                  onClick={() => {
                    setCurrentView('New Inquiries');
                    setSelectedStatuses(['NEW INQUIRY']);
                    setShowViewDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-[#0D1C2E] hover:bg-slate-50 cursor-pointer font-medium"
                >
                  New Inquiries
                </div>
                <div
                  onClick={() => {
                    setCurrentView('Ads Campaigns');
                    setSelectedSources(['campaign']);
                    setShowViewDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  Ads Campaigns
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edit Button */}
        <button
          onClick={() => {
            setShowSettingsModal(true);
          }}
          className="flex items-center justify-center hover:bg-[#E2EFFF] transition-all cursor-pointer text-[#004370]"
          style={{
            width: '31px',
            height: '31px',
            borderRadius: '8px',
            border: '1px solid #EAF3FF',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '5px',
            paddingRight: '5px',
            backgroundColor: '#F4F9FF'
          }}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Settings Modal Component */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        currentViewName={currentView}
        onSave={(newName) => {
          if (newName.trim()) {
            setCurrentView(newName.trim());
          }
          setShowSettingsModal(false);
        }}
      />
    </>
  );
};

export default ViewSelector;
