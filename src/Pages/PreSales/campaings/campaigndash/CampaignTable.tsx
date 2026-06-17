import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown2, More } from 'iconsax-react';
import GmailIcon from '../../../../assets/icons/Gmail - Email by Google.svg';
import WhatsAppIcon from '../../../../assets/icons/WhatsApp Messenger.svg';
import MessengerIcon from '../../../../assets/icons/Messenger for Messages.svg';

const campaigns = [
  { id: 1, name: 'Summer Apparel Drop', date: 'Started Date', channels: ['gmail', 'whatsapp', 'messenger'], status: 'Active', sent: '2,450', replies: '1,200', converted: '700' },
  { id: 2, name: 'Campaign name', date: 'Started Date', channels: ['gmail', 'whatsapp'], status: 'Completed', sent: '2,450', replies: '1,200', converted: '700' },
  { id: 3, name: 'Campaign name', date: 'Started Date', channels: ['gmail', 'whatsapp', 'messenger'], status: 'Completed', sent: '2,450', replies: '1,200', converted: '700' },
  { id: 4, name: 'Campaign name', date: 'Started Date', channels: ['gmail', 'whatsapp'], status: 'Completed', sent: '2,450', replies: '1,200', converted: '700' },
  { id: 5, name: 'Campaign name', date: 'Started Date', channels: ['gmail', 'whatsapp'], status: 'Completed', sent: '2,450', replies: '1,200', converted: '700' },
  { id: 6, name: 'Campaign name', date: 'Started Date', channels: ['gmail', 'whatsapp', 'messenger'], status: 'Paused', sent: '2,450', replies: '1,200', converted: '700' },
];

export default function CampaignTable() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => setOpenMenuId(null);
    if (openMenuId !== null) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [openMenuId]);

  const renderChannelIcon = (channel: string, index: number) => {
    const iconMap: Record<string, string> = {
      gmail: GmailIcon,
      whatsapp: WhatsAppIcon,
      messenger: MessengerIcon,
    };
    const src = iconMap[channel];
    if (!src) return null;
    return (
      <img key={`${channel}-${index}`} src={src} alt={channel} width={24} height={24} style={{ borderRadius: '50%' }} />
    );
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center justify-center rounded-full px-3 py-1" style={{ backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: '14px', lineHeight: '20px', fontFamily: 'Manrope' }}>Active</span>;
      case 'Completed':
        return <span className="inline-flex items-center justify-center rounded-full px-3 py-1" style={{ backgroundColor: '#EFFFF5', color: '#047C2E', fontWeight: 700, fontSize: '14px', lineHeight: '20px', fontFamily: 'Manrope' }}>Completed</span>;
      case 'Paused':
        return <span className="inline-flex items-center justify-center rounded-full px-3 py-1" style={{ backgroundColor: '#FFEFEF', color: '#B91C1C', fontWeight: 700, fontSize: '14px', lineHeight: '20px', fontFamily: 'Manrope' }}>Paused</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden mt-6 w-full" style={{ fontFamily: 'Manrope, sans-serif', border: '1px solid #DDEBFF' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#FAFBFF]">
              <th className="px-6 py-3 text-left" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>CAMPAIGN</th>
              <th className="px-6 py-3 text-left" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>CHANNEL</th>
              <th className="px-6 py-3 text-left" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>STATUS</th>
              <th className="px-6 py-3 text-center" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>SENT</th>
              <th className="px-6 py-3 text-center" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>REPLIES</th>
              <th className="px-6 py-3 text-center" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>CONVERTED</th>
              <th className="px-6 py-3 text-center" style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-[#F8FBFF] transition-colors duration-150 cursor-pointer" 
                style={{ height: '76px', borderTop: '1px solid #F3F4F6' }}
                onClick={() => navigate(`/presales/campaigns/${row.id}`)}
              >
                <td className="px-6 py-0" style={{ verticalAlign: 'middle' }}>
                  <div className="flex flex-col gap-0.5">
                    <span style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: '#111827' }}>{row.name}</span>
                    <span style={{ fontWeight: 700, fontSize: '12px', lineHeight: '16px', color: '#6B7280' }}>{row.date}</span>
                  </div>
                </td>
                <td className="px-[10px] py-0" style={{ verticalAlign: 'middle' }}>
                  <div className="flex items-center gap-1.5">
                    {row.channels.map((ch, i) => renderChannelIcon(ch, i))}
                  </div>
                </td>
                <td className="px-[10px] py-0" style={{ verticalAlign: 'middle' }}>
                  <div className="flex justify-center">
                    {renderStatus(row.status)}
                  </div>
                </td>
                <td className="px-[10px] py-0 text-center" style={{ verticalAlign: 'middle', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#111827', fontFamily: 'Manrope' }}>
                  {row.sent}
                </td>
                <td className="px-[10px] py-0 text-center" style={{ verticalAlign: 'middle', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#111827', fontFamily: 'Manrope' }}>
                  {row.replies}
                </td>
                <td className="px-[10px] py-0 text-center" style={{ verticalAlign: 'middle', fontWeight: 400, fontSize: '14px', lineHeight: '16px', color: '#111827', textTransform: 'capitalize', fontFamily: 'Manrope' }}>
                  {row.converted}
                </td>
                <td className="px-[10px] py-0 text-center relative" style={{ verticalAlign: 'middle' }}>
                  <div className="relative inline-block text-left">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === row.id ? null : row.id); }}
                      className="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                      <More size="20" color="#6B7280" variant="Linear" style={{ transform: 'rotate(90deg)' }}/>
                    </button>
                    {openMenuId === row.id && (
                      <div className="absolute right-0 top-8 z-50 bg-white rounded-xl shadow-lg w-[120px] py-1 overflow-hidden">
                        <button className="block w-full text-left px-4 py-2 hover:bg-[#F9FAFB] cursor-pointer" style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#111827' }}>Edit</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-[#F9FAFB] cursor-pointer" style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#111827' }}>Pause</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-[#FFEFEF] cursor-pointer" style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#B91C1C' }}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-4">
        {/* Left: page controls */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[#64748B] hover:bg-[#F1F5F9]">
            ‹
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] bg-[#004370] text-white"
            style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px', fontFamily: 'Manrope' }}>
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[#64748B] hover:bg-[#F1F5F9]">
            ›
          </button>
        </div>

        {/* Right: rows per page */}
        <div className="flex items-center gap-2">
          <span style={{ fontWeight: 400, fontSize: '14px', color: '#94A3B8', fontFamily: 'Manrope' }}>Rows per page:</span>
          <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-[6px] px-2 py-1 cursor-pointer">
            <span style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A', fontFamily: 'Manrope' }}>10</span>
            <ArrowDown2 size="12" color="#0F172A" variant="Linear" />
          </div>
        </div>
      </div>
    </>
  );
}
