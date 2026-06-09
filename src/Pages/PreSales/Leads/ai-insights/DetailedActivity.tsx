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
    <div className="lg:col-span-2 bg-white rounded-[20px] border border-slate-200/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <h2 className="text-[20px] font-bold text-slate-800 font-inter mb-6">Detailed Activity</h2>

      {filteredLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Calendar className="w-12 h-12 stroke-[1.5] mb-3 text-slate-300" />
          <p className="font-manrope text-[15px] font-bold text-slate-500">No activities logged yet</p>
          <p className="font-manrope text-xs text-slate-400 mt-1">Activities of this type will appear here.</p>
        </div>
      ) : (
        <div className="relative ml-2 py-2">
          {filteredLogs.map((log, index) => (
            <div key={log.id} className="relative pl-14 pb-8 last:pb-0">
              {/* Timeline Connection Stick */}
              {index !== filteredLogs.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '19px',
                    top: '20px',
                    bottom: '-20px',
                    width: '2px',
                    backgroundColor: '#E2E8F0'
                  }}
                />
              )}

              {/* Circle Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '9999px',
                  backgroundColor: '#E0E3E5',
                  border: '1px solid #C7C4D8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  left: '0px',
                  top: '0px'
                }}
              >
                {getIconForLog(log.type, log.title)}
              </div>

              {/* Log Details Container */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-wrap gap-2.5">
                    <span className="font-bold text-[16px] text-slate-800 font-inter">{log.title}</span>
                    {log.badge && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#EEF2FF',
                          padding: '1.5px 8px 2.5px 8px',
                          borderRadius: '10px',
                          height: '24px',
                          boxSizing: 'border-box'
                        }}
                      >
                        <MousePointerClick style={{ width: '12px', height: '12px', color: '#004370' }} />
                        <span
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontWeight: 700,
                            fontSize: '10px',
                            color: '#004370',
                            lineHeight: '1',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {log.badge}
                        </span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-manrope">{log.time}</span>
                </div>

                {log.duration && (
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 400,
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#475569',
                      marginTop: '4px'
                    }}
                  >
                    Duration : {log.duration}
                  </p>
                )}

                {log.details && (
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 400,
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#475569',
                      marginTop: '4px'
                    }}
                  >
                    {log.details}
                  </p>
                )}

                {log.attachedFile && (
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#464555',
                      marginTop: '6px'
                    }}
                  >
                    Attached:{' '}
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 500,
                        fontSize: '13px',
                        color: '#004370',
                        textDecoration: 'none'
                      }}
                      className="hover:underline"
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