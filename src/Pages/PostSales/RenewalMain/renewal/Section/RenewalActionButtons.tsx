import React from 'react';
import { Import, Add } from 'iconsax-react';

export default function RenewalActionButtons() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '16px' }}>
      <button className="hover:bg-[#003258] transition-colors duration-200" style={{
        backgroundColor: '#004370',
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: '16px',
        textAlign: 'center',
        borderRadius: '8px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        border: 'none'
      }}>
        <Import style={{ width: '13.33px', height: '13.33px' }} />
        Export
      </button>

      <button className="hover:bg-[#003258] transition-colors duration-200" style={{
        backgroundColor: '#004370',
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: '16px',
        textAlign: 'center',
        borderRadius: '8px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        border: 'none'
      }}>
        <Add style={{ width: '13.33px', height: '13.33px' }} />
        Add Entry
      </button>
    </div>
  );
}