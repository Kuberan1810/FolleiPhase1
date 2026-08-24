import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Plus, 
  Flame, 
  Download, 
  Mail, 
  Phone, 
  ArrowUpRight 
} from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import toast from 'react-hot-toast';

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  status: 'Hot' | 'Warm' | 'Cold' | 'Converted';
  score: number;
  lastContacted: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Isha Nair',
    title: 'VP of Growth',
    company: 'FinTrack Labs',
    email: 'isha@fintrack.io',
    phone: '+91 98765 43210',
    status: 'Hot',
    score: 94,
    lastContacted: '2 hours ago',
  },
  {
    id: '2',
    name: 'Harsh Mehta',
    title: 'Head of Sales',
    company: 'CloudSphere AI',
    email: 'harsh@cloudsphere.ai',
    phone: '+91 98123 45678',
    status: 'Hot',
    score: 88,
    lastContacted: 'Yesterday',
  },
  {
    id: '3',
    name: 'Gaurav Mukherjee',
    title: 'Founder & CEO',
    company: 'NexTrade Solutions',
    email: 'gaurav@nextrade.com',
    phone: '+91 98234 56789',
    status: 'Warm',
    score: 72,
    lastContacted: '3 days ago',
  },
  {
    id: '4',
    name: 'Ananya Patel',
    title: 'Product Director',
    company: 'OmniFlow Tech',
    email: 'ananya@omniflow.io',
    phone: '+91 98345 67890',
    status: 'Warm',
    score: 65,
    lastContacted: '5 days ago',
  },
  {
    id: '5',
    name: 'Rohan Deshmukh',
    title: 'Operations Lead',
    company: 'Apex Logistics',
    email: 'rohan@apexlog.com',
    phone: '+91 98456 78901',
    status: 'Converted',
    score: 98,
    lastContacted: '1 week ago',
  },
  {
    id: '6',
    name: 'Kavita Sundaram',
    title: 'Marketing Manager',
    company: 'Zenith Retail',
    email: 'kavita@zenith.in',
    phone: '+91 98567 89012',
    status: 'Cold',
    score: 41,
    lastContacted: '2 weeks ago',
  },
];

export const Leads: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Hot' | 'Warm' | 'Cold' | 'Converted'>('All');
  const [leads] = useState<Lead[]>(INITIAL_LEADS);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'Hot':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFEDD5] px-2.5 py-0.5 text-xs font-semibold text-[#EA580C]">
            <Flame className="size-3" />
            Hot
          </span>
        );
      case 'Warm':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF9C3] px-2.5 py-0.5 text-xs font-semibold text-[#854D0E]">
            Warm
          </span>
        );
      case 'Cold':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-xs font-semibold text-[#64748B]">
            Cold
          </span>
        );
      case 'Converted':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#16A34A]">
            Converted
          </span>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FDFDFC] text-[#16171A] font-sans antialiased overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeItem="leads"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0 bg-white">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#EBEBE8] bg-white px-4 py-3 lg:hidden sticky top-0 z-30 shrink-0">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Menu className="size-4" />
          </button>
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            Follei Leads
          </span>
          <div className="size-8" />
        </div>

        {/* Leads Container */}
        <main className="w-full font-['Manrope'] px-6 py-6 lg:px-10 lg:py-8">
          {/* Header Area */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[28px] font-semibold text-[#1E293B] tracking-tight">
                Leads
              </h1>
              <p className="text-[14px] text-[#64748B] mt-1">
                Manage, score and convert prospective customers with AI assistance.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toast.success('Exporting leads data...')}
                className="flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[13px] font-medium text-[#475569] hover:bg-gray-50 transition-colors cursor-pointer shadow-xs"
              >
                <Download className="size-4 text-[#64748B]" />
                <span>Export</span>
              </button>

              <button
                type="button"
                onClick={() => toast.success('Add Lead dialog')}
                className="flex items-center gap-1.5 rounded-xl bg-[#16171A] hover:bg-black text-white px-4 py-2 text-[13px] font-semibold transition-all cursor-pointer shadow-xs"
              >
                <Plus className="size-4" />
                <span>Add Lead</span>
              </button>
            </div>
          </div>

          {/* Search & Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search leads by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[13.5px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#94A3B8] focus:bg-white transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl border border-[#E2E8F0]">
                {(['All', 'Hot', 'Warm', 'Cold', 'Converted'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      statusFilter === filter
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Leads Table Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11.5px] font-bold uppercase tracking-wider text-[#64748B]">
                  <tr>
                    <th className="py-3.5 px-5">Lead Name</th>
                    <th className="py-3.5 px-5">Company</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">AI Score</th>
                    <th className="py-3.5 px-5">Contact</th>
                    <th className="py-3.5 px-5">Last Activity</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#F8FAFC]/80 transition-colors group">
                        <td className="py-4 px-5">
                          <div className="font-semibold text-[#1E293B] text-[14px]">
                            {lead.name}
                          </div>
                          <div className="text-[12px] text-[#64748B]">
                            {lead.title}
                          </div>
                        </td>
                        <td className="py-4 px-5 text-[#334155] font-medium text-[13.5px]">
                          {lead.company}
                        </td>
                        <td className="py-4 px-5">
                          {getStatusBadge(lead.status)}
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[13.5px] text-[#1E293B]">
                              {lead.score}
                            </span>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  lead.score > 80 ? 'bg-emerald-500' :
                                  lead.score > 60 ? 'bg-amber-500' : 'bg-slate-400'
                                }`}
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${lead.email}`}
                              title={lead.email}
                              className="size-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Mail className="size-3.5" />
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              title={lead.phone}
                              className="size-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Phone className="size-3.5" />
                            </a>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-[13px] text-[#64748B]">
                          {lead.lastContacted}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => toast.success(`Viewing details for ${lead.name}`)}
                            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <ArrowUpRight className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500 text-sm">
                        No leads found matching your search and filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leads;