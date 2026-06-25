import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import RenewalStatCards from './RenewalStatCards';
import RenewalActionButtons from './RenewalActionButtons';
import RenewalListTable from './RenewalListTable';
import RenewalDetailsDrawer from './RenewalDetailsDrawer';
import { mockStatCards, mockRenewalListRows, mockRenewalDetail } from '../data/mockRenewalListData';
import type { RenewalDetail } from '../Renewal';


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
            className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
          >
            <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
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
