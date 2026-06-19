import React from 'react';
import { X, AlertTriangle, ShieldCheck, Smile, CheckCircle2, Ticket, Star } from 'lucide-react';

interface TicketStatsProps {
    onClose: () => void;
    openCount: number;
    criticalCount: number;
}

const TicketStats: React.FC<TicketStatsProps> = ({ onClose }) => {

    const statCardsData = [
        {
            id: 'open',
            title: 'Open Tickets',
            value: '123',
            trend: '-12%',
            trendType: 'percentage-green',
            badgeText: 'Overall',
            icon: <Ticket className="w-5 h-5" />,
            bgColor: 'bg-[#E6EDF1]',
            textColor: 'text-[#004370]'
        },
        {
            id: 'critical',
            title: 'Critical Tickets',
            value: '12',
            trendType: 'rose-text',
            subText: '8 require attention',
            icon: <AlertTriangle className="w-5 h-5" />,
            bgColor: 'bg-[#FFF6F6]',
            textColor: 'text-[#B91C1C]'
        },
        {
            id: 'sla',
            title: 'SLA Compliance',
            value: '98.4%',
            trend: '↑ 12%',
            trendType: 'percentage-green-no-bg',
            subText: 'Target: 95%',
            icon: <ShieldCheck className="w-5 h-5" />,
            bgColor: 'bg-[#E6EDF1]',
            textColor: 'text-[#004370]'
        },
        {
            id: 'csat',
            title: 'CSAT Score',
            value: '4.8/5',
            trend: 'Excellent',
            trendType: 'badge-green',
            subText: 'stars',
            icon: <Smile className="w-5 h-5" />,
            bgColor: 'bg-[#E6EDF1]',
            textColor: 'text-[#004370]'
        },
        {
            id: 'resolved',
            title: 'Resolved Today',
            value: '02',
            trend: 'Live',
            trendType: 'live',
            subText: '86% daily goal met',
            icon: <CheckCircle2 className="w-5 h-5 fill-[#004370]" />,
            bgColor: 'bg-[#E5EEFF]',
            textColor: 'text-white '
        }
    ];

    return (
        <div className="relative mb-8 ">
            <button
                onClick={onClose}
                className="absolute top-[-42px] right-0 text-[#6B7280] hover:text-slate-600 transition-colors cursor-pointer z-10 p-1"
                title="Dismiss metrics panel"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {statCardsData.map((card) => (
                    <div
                        key={card.id}
                        className="BoxStyle relative flex flex-col justify-between min-h-[140px]"
                    >
                        <div>
                            <div className="flex justify-between items-start">
                                <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${card.bgColor} ${card.textColor}`}>
                                    {card.icon}
                                </div>
                                {card.badgeText && (
                                    <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
                                        {card.badgeText}
                                    </span>
                                )}
                                {card.trendType === 'percentage-green-no-bg' && (
                                    <span className="text-[12px] font-bold text-[#006A61] flex items-center gap-0.5">
                                        {card.trend}
                                    </span>
                                )}
                                {card.trendType === 'badge-green' && (
                                    <span className="text-[12px] font-bold text-[#006A61] bg-[#E6F1F1] px-2 py-0.5 rounded-[12px]">
                                        {card.trend}
                                    </span>
                                )}
                                {card.trendType === 'live' && (
                                    <span className="text-[12px] font-bold text-[#006A6A] bg-[#E6F1F1] px-2 py-0.5 rounded-[12px] flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        {card.trend}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-[#64748B]/60 text-[11px] font-bold uppercase tracking-wider mt-4">
                                {card.title}
                            </h3>
                        </div>

                        {card.trendType === 'percentage-green' ? (
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-[32px] font-bold text-[#001E40]">{card.value}</span>
                                <span className="text-[12px] font-bold text-[#006A61]">
                                    {card.trend}
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col mt-2">
                                <span className="text-[32px] font-bold text-[#001E40]">{card.value}</span>
                                {card.subText === 'stars' ? (
                                    <div className="flex items-center gap-0.5 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-[12px] text-[#94A3B8] font-semibold mt-1 ">
                                        {card.subText}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketStats;
