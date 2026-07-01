import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface UpsellItem {
    id: string;
    name: string;
    email: string;
    currentPlan: string;
    oppId: string;
    planValue: string;
    status: 'High' | 'Medium' | 'Low';
    aiScore: number;
}

const mockUpsells: UpsellItem[] = [
    { id: '1', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'High', aiScore: 92 },
    { id: '2', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'Medium', aiScore: 87 },
    { id: '3', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'High', aiScore: 92 },
    { id: '4', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'Medium', aiScore: 87 },
    { id: '5', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'High', aiScore: 92 },
    { id: '6', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'Medium', aiScore: 87 },
    { id: '7', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'High', aiScore: 92 },
    { id: '8', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'High', aiScore: 92 },
    { id: '9', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'Medium', aiScore: 87 },
    { id: '10', name: 'Sophia Miller', email: 'sophia.m@gmail.com', currentPlan: 'ENTERPRISE', oppId: 'OPP-4565', planValue: '$55,000', status: 'Medium', aiScore: 87 },
];

const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.trim().charAt(0).toUpperCase();
};

export default function UpsellOpportunityTable() {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center p-1.5 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
                    >
                        <ChevronLeft size={24} className="transition-transform duration-300 group-hover:-translate-x-1" />
                    </button>
                    <div>
                        <h1 className="m-0 font-extrabold text-[24px] md:text-[28px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
                            Upsell Opportunities
                        </h1>
                        <p className="m-0 mt-1 font-normal text-xs md:text-sm leading-5 text-[#64748B]">
                            View and manage all upsell opportunities in one place.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden w-full border border-[#DDEBFF]">
                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-[#FAFBFF] border-b border-[#EDF3FD] h-[52px]">
                                <th className="px-6 text-left font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655] w-[25%] whitespace-nowrap">CUSTOMER NAME</th>
                                <th className="px-6 text-center font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655] w-[20%] whitespace-nowrap">CURRENT PLAN</th>
                                <th className="px-6 text-center font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655] w-[15%] whitespace-nowrap">OPP ID</th>
                                <th className="px-6 text-center font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655] w-[15%] whitespace-nowrap">PLAN</th>
                                <th className="px-6 text-center font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655] w-[15%] whitespace-nowrap">STATUS</th>
                                <th className="px-6 text-center font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655] w-[15%] whitespace-nowrap">AI SCORE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {mockUpsells.map((row, index) => {
                                let statusColor = '';
                                let statusBg = '';
                                if (row.status === 'High') {
                                    statusColor = 'text-[#047857]';
                                    statusBg = 'bg-[#ECFDF5]';
                                } else if (row.status === 'Medium') {
                                    statusColor = 'text-[#F59E0B]';
                                    statusBg = 'bg-[#F59E0B]/10';
                                } else {
                                    statusColor = 'text-[#64748B]';
                                    statusBg = 'bg-[#F1F5F9]';
                                }

                                const scoreColor = row.aiScore >= 90 ? '#10B981' : '#F59E0B';

                                return (
                                    <tr
                                        key={index}
                                        className="h-[80px] border-b border-[#F1F5F9] hover:bg-[#F8FBFF] transition-colors duration-150"
                                    >
                                        <td className="px-6 py-0 align-middle whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 bg-[#E4EDFF] text-[#004370]">
                                                    {getInitials(row.name)}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-semibold text-[18px] leading-[22px] text-[#0D1C2E] truncate">
                                                        {row.name}
                                                    </span>
                                                    <span className="font-normal text-[14px] leading-[18px] text-[#434655] truncate">
                                                        {row.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-0 text-center align-middle whitespace-nowrap">
                                            <div className="flex justify-center">
                                                <span className="font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#222222] bg-[#E4EDFF] rounded-[10px] px-[12px] py-[3.5px] w-fit whitespace-nowrap">
                                                    {row.currentPlan}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-0 text-center align-middle whitespace-nowrap">
                                            <span className="font-medium text-[16px] leading-[22px] text-[#0D1C2E] whitespace-nowrap">
                                                {row.oppId}
                                            </span>
                                        </td>

                                        <td className="px-6 py-0 text-center align-middle whitespace-nowrap">
                                            <span className="font-medium text-[16px] leading-[22px] text-[#047857] whitespace-nowrap">
                                                {row.planValue}
                                            </span>
                                        </td>

                                        <td className="px-6 py-0 text-center align-middle whitespace-nowrap">
                                            <div className="flex justify-center">
                                                <span className={`font-bold text-[14px] leading-[16px] rounded-[10px] px-2 py-1 w-fit whitespace-nowrap ${statusColor} ${statusBg}`}>
                                                    {row.status}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-0 text-center align-middle whitespace-nowrap">
                                            <div className="flex justify-center items-center gap-3 whitespace-nowrap">
                                                <div className="w-[96px] h-[8px] rounded-full bg-[#EAE7E9] overflow-hidden shrink-0">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${row.aiScore}%`, backgroundColor: scoreColor }}
                                                    ></div>
                                                </div>
                                                <span className="font-bold text-[12px] leading-[16px] tracking-[0.12px] w-6 text-right whitespace-nowrap" style={{ color: scoreColor }}>
                                                    {row.aiScore}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
