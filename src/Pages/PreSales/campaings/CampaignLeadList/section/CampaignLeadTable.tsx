import { useState, useEffect } from 'react';
import { ArrowDown2 } from 'iconsax-react';

const leads = [
  {
    id: 1,
    initials: 'SM',
    name: 'Sophia Miller',
    email: 'sophia.m@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'Replied 2',
    status: 'Converted',
    revenue: '₹48K',
    revenueLabel: 'Revenue',
    activity: 'Whatsapp',
    ago: '2 mins ago'
  },
  {
    id: 2,
    initials: 'EW',
    name: 'Emma Wilson',
    email: 'emmaw@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'Replied 2',
    status: 'Converted',
    revenue: '₹38K',
    revenueLabel: 'Revenue',
    activity: 'Whatsapp',
    ago: '2 mins ago'
  },
  {
    id: 3,
    initials: 'LA',
    name: 'Liam Anderson',
    email: 'andersonl@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'Downloaded Brochure',
    status: 'Demo Requested',
    revenue: '₹40K',
    revenueLabel: 'Potential',
    activity: 'Email',
    ago: '2 mins ago'
  },
  {
    id: 4,
    initials: 'ND',
    name: 'Noah Davis',
    email: 'noah03@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'Downloaded Brochure',
    status: 'Demo Requested',
    revenue: '₹28K',
    revenueLabel: 'Potential',
    activity: 'Email',
    ago: '2 mins ago'
  },
  {
    id: 5,
    initials: 'JM',
    name: 'James Miller',
    email: 'james32@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'Downloaded Brochure',
    status: 'Demo Requested',
    revenue: '₹47K',
    revenueLabel: 'Potential',
    activity: 'Email',
    ago: '2 mins ago'
  },
  {
    id: 6,
    initials: 'MT',
    name: 'Mia Thompson',
    email: 'miathom89@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'Downloaded Brochure',
    status: 'Demo Requested',
    revenue: '₹24K',
    revenueLabel: 'Potential',
    activity: 'Email',
    ago: '2 mins ago'
  },
  {
    id: 7,
    initials: 'BC',
    name: 'Benjamin Clark',
    email: 'ben02@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'No Replied Yet',
    status: 'Proposal Sent',
    revenue: '₹39K',
    revenueLabel: 'Potential',
    activity: 'Whatsapp',
    ago: '2 mins ago'
  },
  {
    id: 8,
    initials: 'AK',
    name: 'Arjun Kumar',
    email: 'arjun.k@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'No Replied Yet',
    status: 'Proposal Sent',
    revenue: '₹41K',
    revenueLabel: 'Potential',
    activity: 'Whatsapp',
    ago: '2 mins ago'
  },
  {
    id: 9,
    initials: 'MN',
    name: 'Meera Nair',
    email: 'meera34@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'No Replied Yet',
    status: 'Proposal Sent',
    revenue: '₹40K',
    revenueLabel: 'Potential',
    activity: 'Whatsapp',
    ago: '2 mins ago'
  },
  {
    id: 10,
    initials: 'AR',
    name: 'Ananya Rao',
    email: 'ananya62@gmail.com',
    engagement1: 'Opened 2 , Clicked 1',
    engagement2: 'No Replied Yet',
    status: 'Proposal Sent',
    revenue: '₹50K',
    revenueLabel: 'Potential',
    activity: 'Whatsapp',
    ago: '2 mins ago'
  }
];

const renderStatus = (status: string) => {
  const styles: Record<string, { color: string; bg: string }> = {
    'Converted': { color: '#10B981', bg: '#EDFFEF' },
    'Demo Requested': { color: '#9333EA', bg: '#FAF5FF' },
    'Proposal Sent': { color: '#4744E5', bg: '#F3F3FF' },
  };
  const s = styles[status] || { color: '#131B2E', bg: '#F3F4F6' };
  return (
    <span className="inline-flex items-center justify-center rounded-full px-3 py-1"
      style={{ backgroundColor: s.bg, color: s.color, fontWeight: 700, fontSize: '14px', lineHeight: '16px', textTransform: 'capitalize' }}>
      {status}
    </span>
  );
};

export default function CampaignLeadTable({ appliedFilters }: { appliedFilters?: { search: string, statuses: string[], revenue: [number, number] } }) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setOpenMenuId(null);
    if (openMenuId !== null) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [openMenuId]);

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-2xl overflow-x-auto w-full"
        style={{ border: '1px solid #DDEBFF' }}>
        <table className="w-full border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#FAFBFF]">
              {/* LEAD with A-Z sort */}
              <th className="px-6 py-3 text-left"
                style={{ fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>
                <div className="flex items-center gap-1">
                  LEAD
                  <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>A-Z</span>
                  <ArrowDown2 size="10" color="#64748B" variant="Linear" />
                </div>
              </th>
              {['CAMPAIGN LEAD', 'STATUS', 'REVENUE / POT', 'ACTIVITY'].map((col) => (
                <th key={col}
                  className={`px-6 py-3 ${['STATUS', 'REVENUE / POT', 'ACTIVITY'].includes(col) ? 'text-center' : 'text-left'}`}
                  style={{ fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.filter(row => {
              if (!appliedFilters) return true;

              // 1. Search Filter (name, email, initials)
              const q = appliedFilters.search.toLowerCase();
              if (q && !row.name.toLowerCase().includes(q) && !row.email.toLowerCase().includes(q) && !row.initials.toLowerCase().includes(q)) {
                return false;
              }

              // 2. Status Filter
              if (appliedFilters.statuses.length > 0 && !appliedFilters.statuses.includes(row.status)) {
                return false;
              }

              // 3. Revenue Filter
              const revValueStr = row.revenue.replace(/[^0-9.]/g, '');
              const revValue = parseFloat(revValueStr) * 1000;
              if (revValue < appliedFilters.revenue[0] || revValue > appliedFilters.revenue[1]) {
                return false;
              }

              return true;
            }).map((row) => (
              <tr key={row.id} className="hover:bg-[#F8FBFF] transition-colors duration-150"
                style={{ height: '72px', borderTop: '1px solid #F3F4F6' }}>

                {/* LEAD */}
                <td className="px-6 py-0" style={{ verticalAlign: 'middle' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#F4F3FF' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '1px', color: '#07006C' }}>
                        {row.initials}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: '#111827' }}>
                        {row.name}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: '12px', lineHeight: '16px', color: '#6B7280' }}>
                        {row.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* ENGAGEMENT */}
                <td className="px-6 py-0 text-left" style={{ verticalAlign: 'middle' }}>
                  <div className="flex flex-col">
                    <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#000000' }}>
                      {row.engagement1}
                    </span>
                    <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#636365' }}>
                      {row.engagement2}
                    </span>
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-6 py-0 text-center" style={{ verticalAlign: 'middle' }}>
                  {renderStatus(row.status)}
                </td>

                {/* REVENUE / POT */}
                <td className="px-6 py-0 text-center" style={{ verticalAlign: 'middle' }}>
                  <div className="flex flex-col items-center">
                    <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '100%', color: '#131B2E' }}>
                      {row.revenue}
                    </span>
                    <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#636365' }}>
                      {row.revenueLabel}
                    </span>
                  </div>
                </td>

                {/* ACTIVITY */}
                <td className="px-6 py-0 text-center" style={{ verticalAlign: 'middle' }}>
                  <div className="flex flex-col items-center">
                    <span style={{ fontWeight: 500, fontSize: '14px', lineHeight: '16px', color: '#222222', textTransform: 'capitalize' }}>
                      {row.activity}
                    </span>
                    <span style={{ fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#94A3B8' }}>
                      {row.ago}
                    </span>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination — same as campaign dash */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[#64748B] hover:bg-[#F1F5F9]">‹</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] bg-[#004370] text-white"
            style={{ fontWeight: 600, fontSize: '14px' }}>1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[#64748B] hover:bg-[#F1F5F9]">›</button>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontWeight: 400, fontSize: '14px', color: '#94A3B8' }}>Rows per page:</span>
          <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-[6px] px-2 py-1 cursor-pointer">
            <span style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A' }}>10</span>
            <ArrowDown2 size="12" color="#0F172A" variant="Linear" />
          </div>
        </div>
      </div>
    </>
  );
}
