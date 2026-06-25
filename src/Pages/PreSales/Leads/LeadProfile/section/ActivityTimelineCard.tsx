import { useNavigate } from 'react-router-dom';
import { Whatsapp } from "iconsax-react"
import { Eye, Download } from 'lucide-react';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';

const ActivityTimelineCard = () => {
    const navigate = useNavigate();
    const activities = [
        {
            icon: Whatsapp,
            iconColor: 'text-green-500',
            iconBg: 'bg-green-50',
            title: 'WhatsApp replied',
            time: '2 mins ago',
            desc: '"Yes, I\'d like to know more about the enterprise plan."'
        },
        {
            icon: Eye,
            iconColor: 'text-purple-500',
            iconBg: 'bg-purple-50',
            title: 'Pricing page viewed',
            time: '1 hour ago',
            desc: 'Enterprise Pricing'
        },
        {
            icon: Download,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-50',
            title: 'Proposal downloaded',
            time: 'Yesterday',
            desc: 'Enterprise_Proposal.pdf'
        }
    ];

    return (
        <div className="BoxStyle">
            <div className="flex items-center justify-between mb-7">
                <h2 className="text-[20px] font-bold text-[#191C1E] ">Activity Timeline</h2>
                <BtnComSecondary
                    label='View All'
                    onClick={() => navigate('/presales/leads/profile/timeline')}
                />
            </div>

            <div className="">
                {/* Line centered inside the 40px circle (12px padding + 20px radius - 1px half-width = 31px) */}
                {/* <div className="absolute left-[31px] top-5 bottom-5 w-[2px] bg-[#EDF3FD]" /> */}

                <div className="flex flex-col gap-8">
                    {activities.map((act, i) => (
                        <div key={i} className="flex gap-4 relative z-10">
                            <div className={`w-10 h-10 rounded-full ${act.iconBg} flex items-center justify-center shrink-0`}>
                                <act.icon className={`${act.iconColor}`} color="currentColor" size={18} />
                            </div>
                            <div className="flex flex-col pt-0.5 w-full">
                                <div className="flex justify-between items-center">
                                    <span className="text-[16px] font-bold text-[#1E293B] mb-0.5">{act.title}</span>
                                    <span className="text-[14px] font-medium text-[#64748B]">{act.time}</span>
                                </div>
                                <span className="text-[14px] font-medium text-[#64748B]">{act.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ActivityTimelineCard;
