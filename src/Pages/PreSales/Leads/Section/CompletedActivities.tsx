import React from 'react';

const CompletedActivities: React.FC = () => {
  const [completedTab, setCompletedTab] = React.useState<'meetings' | 'calls'>('calls');

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
        COMPLETED ACTIVITIES
      </h3>
      <div className="flex gap-6 border-b border-slate-100 mb-4" style={{ height: '36px' }}>
        <button 
          onClick={() => setCompletedTab('meetings')}
          className="border-none transition-all"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7.99px',
            height: '36px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderBottom: completedTab === 'meetings' ? '2px solid #004370' : '2px solid transparent',
            color: completedTab === 'meetings' ? '#004370' : '#94A3B8',
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
              backgroundColor: completedTab === 'meetings' ? '#E2EFFF' : '#F1F5F9',
              color: completedTab === 'meetings' ? '#004370' : '#64748B'
            }}
          >
            3
          </span>
        </button>
        <button 
          onClick={() => setCompletedTab('calls')}
          className="border-none transition-all"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7.99px',
            height: '36px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderBottom: completedTab === 'calls' ? '2px solid #004370' : '2px solid transparent',
            color: completedTab === 'calls' ? '#004370' : '#94A3B8',
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
              backgroundColor: completedTab === 'calls' ? '#E2EFFF' : '#F1F5F9',
              color: completedTab === 'calls' ? '#004370' : '#64748B'
            }}
          >
            1
          </span>
        </button>
      </div>

      {completedTab === 'calls' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Subject</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Call Started Time</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Call Owner</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Call Result</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3.5 font-manrope font-medium" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>Initial call</td>
                <td className="px-4 py-3.5 font-manrope font-medium" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>21 Dec 2026, 06:00 am</td>
                <td className="px-4 py-3.5 font-manrope font-medium" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>AI Agent</td>
                <td className="px-4 py-3.5 text-sm font-manrope">
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '3.5px 12px',
                      borderRadius: '9999px',
                      backgroundColor: '#E2FFE9',
                      color: '#10B981',
                      height: '23px',
                      width: '97px',
                      boxSizing: 'border-box',
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Interested
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm font-manrope">
                  <button className="text-[#0A71B7] hover:underline font-bold bg-transparent border-none cursor-pointer" style={{ fontSize: '14px', lineHeight: '16px' }}>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Subject</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Meeting Time</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Organizer</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Status</th>
                <th className="px-4 py-3 font-manrope font-semibold" style={{ fontSize: '15px', lineHeight: '16px', color: '#464555' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { subject: 'Introductory Demo', time: '20 Dec 2026, 11:00 am', organizer: 'David Foster' },
                { subject: 'Discovery Call', time: '18 Dec 2026, 03:00 pm', organizer: 'David Foster' },
                { subject: 'Technical Q&A', time: '15 Dec 2026, 04:00 pm', organizer: 'AI Agent' }
              ].map((m, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 font-manrope font-medium" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>{m.subject}</td>
                  <td className="px-4 py-3.5 font-manrope font-medium" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>{m.time}</td>
                  <td className="px-4 py-3.5 font-manrope font-medium" style={{ fontSize: '14px', lineHeight: '16px', color: '#464555' }}>{m.organizer}</td>
                  <td className="px-4 py-3.5 text-sm font-manrope">
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '3.5px 12px',
                        borderRadius: '9999px',
                        backgroundColor: '#E2FFE9',
                        color: '#10B981',
                        height: '23px',
                        width: '97px',
                        boxSizing: 'border-box',
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Completed
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-manrope">
                    <button className="text-[#0A71B7] hover:underline font-bold bg-transparent border-none cursor-pointer" style={{ fontSize: '14px', lineHeight: '16px' }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedActivities;
