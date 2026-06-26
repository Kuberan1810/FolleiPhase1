import { useState } from "react"
import { X, Flame, Phone, Ticket, Calendar, MailOpen, BellRing } from "lucide-react"
import { HomeTrendUp, Profile2User, Whatsapp } from "iconsax-react";

interface Props {
    open?: boolean, onClose?: () => void
}

const tabs = ["All", "Leads", " Renewals", "Support", "Communication"];

const notifications = [
    // Lead
    {
        id: 1,
        category: "Lead",
        title: "New Lead Assigned",
        description: "New lead 'Minibus Latis' assigned to Sales Team",
        action: "View Leads",
        time: "4 min Ago",
        icon: <Profile2User size="20" color="currentColor" />,
    },
    {
        id: 2,
        category: "Lead",
        title: "Hot Lead Detected",
        description: "Lead score for Aria Chen crossed 90%",
        action: "View Leads",
        time: "42 min Ago",
        icon: <Flame size="20" />,
    },

    // Renewals
    {
        id: 3,
        category: "Renewals",
        title: "Renewal Due Soon",
        description: "ABC Technologies contract expires in 7 days",
        action: "View Renewals",
        time: "4 min Ago",
        icon: <Phone size="20" />,
    },

    // Support
    {
        id: 4,
        category: "Support",
        title: "Customer Health Dropped",
        description: "Lumen Corp health score reduced below 50%",
        action: "View Account",
        time: "4 min Ago",
        icon: <HomeTrendUp size="20" color="currentColor" />,
    },
    {
        id: 5,
        category: "Support",
        title: "Critical Support Ticket",
        description: "High priority integration issue raised",
        action: "View Tickets",
        time: "42 min Ago",
        icon: <Ticket size="20" />,
    },

    // Communication
    {
        id: 6,
        category: "Communication",
        title: "New WhatsApp Reply",
        description: "Customer replied to follow-up message",
        action: "Open Chat",
        time: "4 min Ago",
        icon: <Whatsapp size="20" color="currentColor" />,
    },
    {
        id: 7,
        category: "Communication",
        title: "Email Opened",
        description: "Renewal proposal opened by customer",
        action: "View Email",
        time: "42 min Ago",
        icon: <MailOpen size="20" />,
    },
    {
        id: 8,
        category: "Communication",
        title: "Meeting Scheduled",
        description: "New customer meeting booked for Friday",
        action: "View Calendar",
        time: "4 min Ago",
        icon: <Calendar size="20" />,
    },
    {
        id: 9,
        category: "Communication",
        title: "Meeting Reminder",
        description: "Renewal proposal meeting with customer",
        action: "Join Meeting",
        time: "42 min Ago",
        icon: <BellRing size="20" />,
    },
];

const Notification = ({ open, onClose }: Props) => {
    const [active, setActive] = useState(0);

    const activeTab = tabs[active].trim();
    const filteredNotifications = notifications.filter(n => {
        if (activeTab === "All") return true;
        if (activeTab === "Leads" && n.category === "Lead") return true;
        return n.category.toLowerCase() === activeTab.toLowerCase();
    });

    const groupedNotifications = filteredNotifications.reduce((acc, note) => {
        const cat = note.category.trim();
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(note);
        return acc;
    }, {} as Record<string, typeof notifications>);

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={onClose}
                />
            )}

            <div
                className={`
                     fixed top-0 right-0
                     h-screen w-[460px]
                     bg-white shadow-xl
                     z-50 rounded-l-[10px]
                     transition-transform duration-300 ease-in-out
                  ${open ? "translate-x-0" : "translate-x-full"}
             `}
            >
                <div className="w-full flex p-3 border-b border-[#F3F4F6] ">
                    <h1 className="text-[18px] font-bold">Notification Center</h1>
                    <div className="ml-auto">
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-[#64748B] hover:text-[#0F172A]"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex flex-wrap mb-6 gap-4">
                        {tabs.map((tab, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActive(idx)}
                                className={`px-2 pt-[1px] pb-[2px] text-[12px] font-bold rounded-[4px] transition-colors cursor-pointer border ${active === idx
                                    ? "bg-[#014370] text-white"
                                    : "bg-[#004370]/5 text-[#64748B] border-transparent hover:bg-slate-100"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-y-auto h-[calc(100vh-200px)] space-y-6 pr-1 animate-fadeIn no-scrollbar">
                        {Object.entries(groupedNotifications).map(([category, items]) => (
                            <div key={category} className="space-y-3">
                                <h2 className="text-[18px] font-bold text-[#1E293B] pl-1">
                                    {category}
                                </h2>
                                <div className="space-y-3">
                                    {items.map((note, idx) => (
                                        <div key={idx}
                                            className="flex justify-between p-2.5 rounded-[10px] bg-[#F5F8FD]">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#DBEAFE] text-[#004370] shrink-0">
                                                    {note.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-[12px] font-bold text-[#1E293B]">{note.title}</h3>
                                                    <p className="text-[10px] text-[#64748B] mt-1">{note.description}</p>
                                                    {note.action && (
                                                        <button className="text-[9px] bg-[#004370]/10 font-bold text-[#004370] rounded-[4px] px-1.5 py-[2px] mt-2 block cursor-pointer hover:text-[#002f52] text-left">
                                                            {note.action}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-[#64748B] shrink-0">{note.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {filteredNotifications.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                                <p className="text-sm">No notifications in this category</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification