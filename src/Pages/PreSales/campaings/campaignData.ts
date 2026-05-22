export interface Campaign {
  id: number;
  name: string;
  date: string;
  channels: string[];
  status: string;
  statusColor: string;
  sent: string;
  replies: string;
  converted: string;
  iconBg: string;
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: "GrowthX",
    date: "Started Oct 12, 2023",
    channels: [ "whatsapp","mail"],
    status: "ACTIVE",
    statusColor: "bg-[#DEFFE9] text-[#004F1A]",
    sent: "2,450",
    replies: "184",
    converted: "42",
    iconBg: "bg-purple-100"
  },
  {
    id: 2,
    name: "Customer Re-engagement Program",
    date: "Paused 2 days ago",
    channels:[ "whatsapp","mail"],
    status: "PAUSED",
    statusColor: "bg-[#FFDEDE] text-[#BA0108]",
    sent: "1,200",
    replies: "56",
    converted: "8",
    iconBg: "bg-purple-100"
  },
  {
    id: 3,
    name: "Product Awareness Campaign",
    date: "Completed Nov 30",
    channels: [ "whatsapp","mail","phone"],
    status: "COMPLETED",
    statusColor: "bg-[#EFF0FF] text-[#470AC0]",
    sent: "500",
    replies: "112",
    converted: "28",
    iconBg: "bg-purple-100"
  },
  {
    id: 4,
    name: "Intelligent Outreach Flow",
    date: "Started Dec 05, 2023",
    channels: [ "whatsapp","mail","phone"],
    status: "ACTIVE",
    statusColor: "bg-[#DEFFE9] text-[#004F1A]",
    sent: "320",
    replies: "68",
    converted: "14",
    iconBg: "bg-purple-100"
  },
  {
    id: 5,
    name: "New Feature Announcement",
    date: "Updated 4h ago",
    channels: [],
    status: "DRAFT",
    statusColor: "bg-[#FFF3ED] text-[#9E4904]",
    sent: "0",
    replies: "0",
    converted: "0",
    iconBg: "bg-purple-100"
  }
];
