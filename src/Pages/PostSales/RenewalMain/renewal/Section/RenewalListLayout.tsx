import React, { useState } from 'react';
import RenewalStatCards from './RenewalStatCards';
import RenewalActionButtons from './RenewalActionButtons';
import RenewalListTable from './RenewalListTable';
import RenewalDetailsDrawer from './RenewalDetailsDrawer';
import { mockStatCards, mockRenewalListRows, mockRenewalDetail } from '../data/mockRenewalListData';
import type { RenewalListRow, RenewalDetail } from '../Renewal';

export default function RenewalListLayout() {
  const [statCards] = useState(mockStatCards);
  const [renewalRows] = useState(mockRenewalListRows);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RenewalDetail | null>(null);

  const handleRowClick = (row: RenewalListRow) => {
    setSelectedDetail(mockRenewalDetail);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          margin: 0,
          fontFamily: 'Urbanist',
          fontWeight: 800,
          fontSize: '30px',
          lineHeight: '36px',
          color: '#0D1C2E',
        }}>
          Renewal
        </h1>
        <p style={{
          margin: 0,
          fontFamily: 'Urbanist',
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