import React, { useState } from 'react';
import RenewalStatCards from './RenewalStatCards';
import RenewalActionButtons from './RenewalActionButtons';
import RenewalListTable from './RenewalListTable';
import RenewalDetailsDrawer from './RenewalDetailsDrawer';
import { mockStatCards, mockRenewalListRows, mockRenewalDetail } from '../data/mockRenewalListData';
import type { RenewalListRow, RenewalDetail } from '../Renewal';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';

export default function RenewalListLayout() {
  const [statCards] = useState(mockStatCards);
  const [renewalRows] = useState(mockRenewalListRows);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RenewalDetail | null>(null);
  const navigate = useNavigate();

  const handleRowClick = (row: RenewalListRow) => {
    setSelectedDetail(mockRenewalDetail);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EDF3FD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft color="#0D1C2E" size={20} />
          </button>
          <h1 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: '30px',
            lineHeight: '36px',
            color: '#0D1C2E',
          }}>
            Renewal
          </h1>
        </div>
        <p style={{
          margin: 0,
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '36px',
          color: '#6B7280',
        }}>
          Review and manage upcoming contract expirations across your accounts.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <RenewalStatCards cards={statCards} />
      </div>
      
      <RenewalActionButtons />
      
      <RenewalListTable rows={renewalRows} onRowClick={handleRowClick} />

      <RenewalDetailsDrawer 
        isOpen={isDrawerOpen} 
        detail={selectedDetail} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </div>
  );
}