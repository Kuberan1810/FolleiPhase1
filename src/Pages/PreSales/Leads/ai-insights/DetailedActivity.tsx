import React from 'react';
import {
  Phone,
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  Globe,
  MousePointerClick
} from 'lucide-react';
import type { LogItem } from './types';

interface DetailedActivityProps {
  filteredLogs: LogItem[];
}

const DetailedActivity: React.FC<DetailedActivityProps> = ({ filteredLogs }) => {
  const getIconForLog = (type: LogItem['type'], title: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4 text-slate-500" />;
      case 'email':
        return <Mail className="w-4 h-4 text-slate-500" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-slate-500" />;
      case 'note':
        if (title.toLowerCase().includes('message')) {
          return <MessageSquare className="w-4 h-4 text-slate-500" />;
        }
        return <FileText className="w-4 h-4 text-slate-500" />;
      case 'web':
        return <Globe className="w-4 h-4 text-slate-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-[20px] border border-slate-200/60 p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <h2 className="text-[20px] font-bold text-slate-800 font-inter mb-4 sm:mb-6">Detailed Activity</h2>

      {filteredLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Calendar className="w-12 h-12 stroke-[1.5] mb-3 text-slate-300" />
          <p className="font-manrope text-[15px] font-bold text-slate-500">No activities logged yet</p>
          <p className="font-manrope text-xs text-slate-400 mt-1">Activities of this type will appear here.</p>
        </div>
      ) : (
        <div className="relative ml-2 py-2">
          {filteredLogs.map((log, index) => (
            <div key={log.id} className="relative pl-10 sm:pl-14 pb-6 sm:pb-8 last:pb-0">
              {/* Timeline Connection Stick */}
              {index !== filteredLogs.length - 1 && (
                <div className="absolute left-[15px] sm:left-[19px] top-[20px] bottom-[-20px] w-[2px] bg-[#E2E8F0]" />
              )}

              {/* Circle Icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E0E3E5] border border-[#C7C4D8] flex items-center justify-center absolute left-0 top-0">
                {getIconForLog(log.type, log.title)}
              </div>

              {/* Log Details Container */}
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div className="flex items-center flex-wrap gap-2.5">
                    <span className="font-bold text-[14px] sm:text-[16px] text-slate-800 font-inter">{log.title}</span>
                    {log.badge && (
                      <span className="inline-flex items-center gap-[6px] bg-[#EEF2FF] px-2 py-0.5 rounded-[10px] h-6 box-border">
                        <MousePointerClick style={{ width: '12px', height: '12px', color: '#004370' }} />
                        <span className="font-manrope font-bold text-[9px] sm:text-[10px] text-[#004370] leading-none uppercase tracking-[0.05em]">
                          {log.badge}
                        </span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-manrope">{log.time}</span>
                </div>

                {log.duration && (
                  <p className="font-manrope font-normal text-[12px] sm:text-[13px] leading-[16px] sm:leading-[18px] text-slate-600 mt-1">
                    Duration : {log.duration}
                  </p>
                )}

                {log.details && (
                  <p className="font-manrope font-normal text-[12px] sm:text-[13px] leading-[16px] sm:leading-[18px] text-slate-600 mt-1">
                    {log.details}
                  </p>
                )}

                {log.attachedFile && (
                  <p className="font-inter font-normal text-[12px] sm:text-[13px] leading-[16px] sm:leading-[18px] text-[#464555] mt-1.5">
                    Attached:{' '}
                    <a
                      href="#"
                      className="font-manrope font-medium text-[12px] sm:text-[13px] text-[#004370] no-underline hover:underline"
                      onClick={e => e.preventDefault()}
                    >
                      {log.attachedFile.name} ({log.attachedFile.size})
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailedActivity;