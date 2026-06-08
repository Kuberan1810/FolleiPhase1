import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Calendar, 
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockLogs } from './mockLogs';
import DetailedActivity from './DetailedActivity';
import InteractionAnalytics from './InteractionAnalytics';

interface ActivityLogsViewProps {
  onBack?: () => void;
  leadName?: string;
}

const ActivityLogsView: React.FC<ActivityLogsViewProps> = ({ onBack, leadName }) => {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(-1));
  const [activeTab, setActiveTab] = useState<'all' | 'call' | 'email' | 'meeting' | 'note'>('all');

  const filteredLogs = mockLogs.filter(log => {
    if (activeTab === 'all') return true;
    return log.type === activeTab;
  });

  return (
    <div className="flex flex-col gap-6 font-sans pb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header back button & filter tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-slate-800" />
          </button>
          <h1 className="text-[24px] font-bold text-[#0B1C30] font-inter">View Logs {leadName ? `- ${leadName}` : ''}</h1>
        </div>

        {/* Tabs / Filter Chips */}
        <div className="flex items-center flex-wrap gap-2">
          {/* All Logs */}
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-[13px] font-bold rounded-full font-manrope transition-colors cursor-pointer border border-transparent ${
              activeTab === 'all'
                ? 'bg-[#004370] text-white'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80'
            }`}
          >
            All Logs
          </button>

          {/* Calls */}
          <button
            onClick={() => setActiveTab('call')}
            className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-full font-manrope transition-colors cursor-pointer border ${
              activeTab === 'call'
                ? 'bg-[#004370] text-white border-transparent'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Calls
          </button>

          {/* Emails */}
          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-full font-manrope transition-colors cursor-pointer border ${
              activeTab === 'email'
                ? 'bg-[#004370] text-white border-transparent'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Emails
          </button>

          {/* Meetings */}
          <button
            onClick={() => setActiveTab('meeting')}
            className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-full font-manrope transition-colors cursor-pointer border ${
              activeTab === 'meeting'
                ? 'bg-[#004370] text-white border-transparent'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Meetings
          </button>

          {/* Notes */}
          <button
            onClick={() => setActiveTab('note')}
            className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-full font-manrope transition-colors cursor-pointer border ${
              activeTab === 'note'
                ? 'bg-[#004370] text-white border-transparent'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/80'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Notes
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Detailed Activity */}
        <DetailedActivity filteredLogs={filteredLogs} />

        {/* Right Column: Interaction Analytics */}
        <InteractionAnalytics />
      </div>
    </div>
  );
};

export default ActivityLogsView;
