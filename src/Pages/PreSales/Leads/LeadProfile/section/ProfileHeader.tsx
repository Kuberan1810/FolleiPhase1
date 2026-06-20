import Email from "../../../../../assets/socialMediaIcons/Gmail.svg"
import Whatsapp from "../../../../../assets/socialMediaIcons/WhatsApp.svg"
import Messenger from "../../../../../assets/socialMediaIcons/Messenger.svg"
import Calls from "../../../../../assets/socialMediaIcons/Calls.svg"
import { Edit, Global } from "iconsax-react";
import { Flame, Sun, Snowflake } from "lucide-react"

const getTempInfo = (temp: string) => {
    switch(temp) {
        case 'Hot':
            return { icon: Flame, color: '#DC2626', bg: '#B91C1C10', text: '#DC2626' };
        case 'Warm':
            return { icon: Sun, color: '#EA580C', bg: '#EA580C10', text: '#EA580C' };
        case 'Cold':
        default:
            return { icon: Snowflake, color: '#2563EB', bg: '#2563EB10', text: '#2563EB' };
    }
}

const ProfileHeader = ({ lead }: { lead?: any }) => {
    const name = lead?.name || "Sophia Miller";
    const initials = name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
    const company = lead?.company || "ABC Technologies";
    const title = lead?.title || "Senior Procurement Manager";
    const temp = lead?.temperature || "Hot";
    const source = lead?.source || "Website";
    const date = lead?.addedTime || "22 Dec, 2025";
    
    const TempIcon = getTempInfo(temp).icon;
    const tempBg = getTempInfo(temp).bg;
    const tempText = getTempInfo(temp).text;

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between BoxStyle">
            <div className="flex flex-col sm:flex-row items-start gap-5">
                {/* Avatar */}
                <div className={`w-[100px] h-[100px] rounded-[20px] ${lead?.bgColor || 'bg-[#E1EDFE]'} border border-[#EDF3FD] flex items-center justify-center shrink-0`}>
                    <span className={`${lead?.textColor || 'text-[#131B2E]'} text-[32px] font-semibold tracking-wide`}>{initials}</span>
                </div>

                {/* Lead Info */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="md:text-[32px] text-xl font-semibold text-[#131B2E] leading-tight ">
                            {name}
                        </h1>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[16px] font-bold" style={{ backgroundColor: tempBg, color: tempText }}>
                            <TempIcon size={18} color="currentColor" />
                            {temp}
                        </div>
                    </div>

                    <p className="text-[18px] text-[#464555] font-semibold ">
                        {title} @ {company}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-1">
                        <div className="flex items-center gap-2.5 text-[16px] font-medium text-[#0B1C30] capitalize">
                            <Global className=" text-[#004370]" color="currentColor" size={18} />
                            {source}
                        </div>
                        <div className="flex items-center gap-2.5 text-[16px] font-medium text-[#0B1C30]">
                            <Edit className="text-[#004370] " color="currentColor" size={18} />
                            {date}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 mt-4 sm:mt-0">
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Messenger} alt="Messenger" />

                </button>
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Email} alt="Email" />
                </button>
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Whatsapp} alt="Whatsapp" />

                </button>
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Calls} alt="Phone-calls" />

                </button>
            </div>
        </div>
    )
}

export default ProfileHeader