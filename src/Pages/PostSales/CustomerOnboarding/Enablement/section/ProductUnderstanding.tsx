import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TickCircle } from 'iconsax-react';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';

interface ModuleItem {
  title: string;
  status: 'Completed' | 'Pending';
}

const modules: ModuleItem[] = [
  { title: 'Welcome Video', status: 'Completed' },
  { title: 'Product Demo', status: 'Completed' },
  { title: 'User Guide', status: 'Completed' },
  { title: 'Knowledge Base', status: 'Completed' },
  { title: 'Advanced Certification', status: 'Pending' }
];

const ProductUnderstanding: React.FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams<{ customerId: string }>();

  return (
    <div className="BoxStyle flex flex-col gap-5">
      <div className="flex justify-between items-center gap-3">
        <h3 className="text-[15px] sm:text-[20px] font-bold text-[#191C1E] whitespace-nowrap shrink-0">Product understanding</h3>
        <BtnComSecondary
          label="View All"
          className="px-2 py-1 text-[12px] sm:text-[14px] sm:px-3 sm:py-1.5 shrink-0 whitespace-nowrap"
          onClick={() => navigate(`/postsales/onboarding/enablement/${customerId}/understanding`)}
        />
      </div>

      <div className="flex flex-col gap-3">
        {modules.map((m, idx) => {
          const isCompleted = m.status === 'Completed';

          return (
            <div
              key={idx}
              className="flex justify-between items-center p-3 rounded-[12px] bg-[#F7F9FB] hover:bg-slate-50 transition-colors gap-3"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {isCompleted ? (
                  <TickCircle size="20" color="#16A34A" variant="Bold" className="shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#6B7280] shrink-0" />
                )}
                <span className={`text-[14px] sm:text-[16px] font-semibold leading-tight ${isCompleted ? 'text-[#191C1E]' : 'text-slate-400'}`}>
                  {m.title}
                </span>
              </div>
              <span
                className={`text-[14px] sm:text-[16px] font-medium shrink-0 ${isCompleted ? 'text-[#16A34A]' : 'text-[#6B7280]'
                  }`}
              >
                {m.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductUnderstanding;
