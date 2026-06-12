import React from 'react';

const ScheduledActivities: React.FC = () => {
  const [scheduledTab, setScheduledTab] = React.useState<'meetings' | 'calls'>('meetings');

  return (
    <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <h3 
        className="font-manrope uppercase tracking-wide mb-5"
        style={{
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '18px',
          color: '#464555'
        }}
      >
        SCHEDULED ACTIVITIES
      </h3>
      <div className="flex gap-6 border-b border-slate-100 mb-4" style={{ height: '36px' }}>
        <button 
          onClick={() => setScheduledTab('meetings')}
          className="border-none transition-all"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7.99px',
            height: '36px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderBottom: scheduledTab === 'meetings' ? '2px solid #004370' : '2px solid transparent',
            color: scheduledTab === 'meetings' ? '#004370' : '#94A3B8',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 700,
            fontSize: '13px'
          }}
        >
          <span>Meetings</span>
          <span 
            className="px-1.5 py-0.5 text-[10px] rounded-md font-bold"
            style={{
              backgroundColor: scheduledTab === 'meetings' ? '#E2EFFF' : '#F1F5F9',
              color: scheduledTab === 'meetings' ? '#004370' : '#64748B'
            }}
          >
            3
          </span>
        </button>
        <button 
          onClick={() => setScheduledTab('calls')}
          className="border-none transition-all"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7.99px',
            height: '36px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderBottom: scheduledTab === 'calls' ? '2px solid #004370' : '2px solid transparent',
            color: scheduledTab === 'calls' ? '#004370' : '#94A3B8',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 700,
            fontSize: '13px'
          }}
        >
          <span>Calls</span>
          <span 
            className="px-1.5 py-0.5 text-[10px] rounded-md font-bold"
            style={{
              backgroundColor: scheduledTab === 'calls' ? '#E2EFFF' : '#F1F5F9',
              color: scheduledTab === 'calls' ? '#004370' : '#64748B'
            }}
          >
            0
          </span>
        </button>
      </div>

      {scheduledTab === 'meetings' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 font-manrope font-semibold whitespace-nowrap" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Title</th>
                <th className="px-4 py-3 font-manrope font-semibold whitespace-nowrap" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>From</th>
                <th className="px-4 py-3 font-manrope font-semibold whitespace-nowrap" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>To</th>
                <th className="px-4 py-3 font-manrope font-semibold whitespace-nowrap" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Host</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Product Name Demo', from: 'Jan 21, 10:00 am', to: 'Jan 21, 11:00 am', host: 'Admin' },
                { title: 'Product Name Demo', from: 'Jan 21, 10:00 am', to: 'Jan 21, 11:00 am', host: 'Admin' }
              ].map((m, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 font-manrope font-medium whitespace-nowrap" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>{m.title}</td>
                  <td className="px-4 py-3.5 font-manrope font-medium whitespace-nowrap" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>{m.from}</td>
                  <td className="px-4 py-3.5 font-manrope font-medium whitespace-nowrap" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>{m.to}</td>
                  <td className="px-4 py-3.5 font-manrope font-medium whitespace-nowrap" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>{m.host}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 font-manrope text-sm bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
          No scheduled calls found.
        </div>
      )}
    </div>
  );
};

export default ScheduledActivities;
