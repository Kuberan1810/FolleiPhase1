import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RenewalStatCards from './RenewalStatCards';
import RenewalActionButtons from './RenewalActionButtons';
import RenewalListTable from './RenewalListTable';
import RenewalDetailsDrawer from './RenewalDetailsDrawer';
import { mockStatCards, mockRenewalListRows, mockRenewalDetail } from '../data/mockRenewalListData';
import type { RenewalListRow, RenewalDetail } from '../Renewal';


export default function RenewalListLayout() {
  const navigate = useNavigate();
  const [statCards] = useState(mockStatCards);
  const [renewalRows] = useState(mockRenewalListRows);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RenewalDetail | null>(null);


  const handleRowClick = () => {
    setSelectedDetail(mockRenewalDetail);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-[#EDF3FD] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
          >
            <ArrowLeft className="text-[#0D1C2E] w-5 h-5" />
          </button>
          <h1 className="m-0 font-extrabold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
            Renewal
          </h1>
        </div>
        <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
          Review and manage upcoming contract expirations across your accounts.
        </p>
      </div>

      <div className="mb-6">
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