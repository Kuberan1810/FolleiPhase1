import { Tag, Heart } from 'iconsax-react';
import { Shield, ArrowUpRight } from 'lucide-react';

const data = [
    {
        icon: Tag,
        iconColor: '#3B82F6',
        iconBg: '#EFF6FF',
        title: 'Summer Win-Back',
        actions: [
            { label: 'Opened', color: '#3B82F6', bgColor: '#EFF6FF' },
            { label: 'Clicked', color: '#3B82F6', bgColor: '#EFF6FF' },
            { label: 'Replied', color: '#10B981', bgColor: '#ECFDF5' },
        ],
    },
    {
        icon: ArrowUpRight,
        iconColor: '#10B981',
        iconBg: '#ECFDF5',
        title: 'Product Launch',
        actions: [
            { label: 'WhatsApp Replied', color: '#3B82F6', bgColor: '#EFF6FF' },
            { label: 'Purchased', color: '#10B981', bgColor: '#ECFDF5' },
        ],
    },
    {
        icon: Heart,
        iconColor: '#EF4444',
        iconBg: '#FEF2F2',
        title: 'Referral Program',
        actions: [
            { label: 'No Engagement', color: '#64748B', bgColor: '#F1F5F9' },
        ],
    },
];

const CampaignParticipationCard = () => {
    return (
        <div className="BoxStyle">
            <h2 className="text-[20px] font-bold text-[#191C1E] mb-7">
                Campaign Participation
            </h2>

            <div className="flex flex-col gap-6">
                {data.map((campaign) => {
                    const Icon = campaign.icon;

                    return (
                        <div
                            key={campaign.title}
                            className="flex items-center gap-4"
                        >
                            <div
                                className="p-3 rounded-[12px] flex items-center justify-center shrink-0"
                                style={{ backgroundColor: campaign.iconBg }}
                            >
                                <Icon
                                    size={18}
                                    color={campaign.iconColor}
                                />
                            </div>

                            <div className="flex flex-col pt-0.5">
                                <span className="text-[16px] font-bold text-[#1E293B] mb-2">
                                    {campaign.title}
                                </span>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {campaign.actions.map((action) => (
                                        <span
                                            key={action.label}
                                            className="text-[12px] font-regular px-2 py-0.5 rounded-md"
                                            style={{
                                                color: action.color,
                                                backgroundColor: action.bgColor,
                                            }}
                                        >
                                            {action.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CampaignParticipationCard;
