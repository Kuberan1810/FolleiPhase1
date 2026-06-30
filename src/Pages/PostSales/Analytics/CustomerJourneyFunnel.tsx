import React, { useState, useEffect } from 'react';
import { User, Gem } from 'lucide-react';
import { Chart1, PresentionChart } from 'iconsax-react';

interface StageData {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  gradientId: string;
  cx: number;
  cy: number;
  path: string;
}

interface ConversionCardData {
  id: number;
  rate: string;
  label: string;
  description: string;
  fromStage?: string;
  toStage?: string;
}

const stagesData: StageData[] = [
  {
    id: 'new',
    label: 'New Customers',
    value: '1,246',
    icon: User,
    gradientId: 'funnelGrad1',
    cx: 55,
    cy: 55,
    path: 'M 0,20 C 60,20 80,80 110,80 L 110,200 L 0,200 Z'
  },
  {
    id: 'onboard',
    label: 'Onboarding Completed',
    value: '564',
    icon: PresentionChart,
    gradientId: 'funnelGrad2',
    cx: 170,
    cy: 100,
    path: 'M 115,80 C 175,80 195,120 225,120 L 225,200 L 115,200 Z'
  },
  {
    id: 'active',
    label: 'Actively Using Product',
    value: '345',
    icon: Chart1,
    gradientId: 'funnelGrad3',
    cx: 285,
    cy: 135,
    path: 'M 230,120 C 290,120 310,150 340,150 L 340,200 L 230,200 Z'
  },
  {
    id: 'renewal',
    label: 'Renewal Ready Customers',
    value: '213',
    icon: Gem,
    gradientId: 'funnelGrad4',
    cx: 400,
    cy: 160,
    path: 'M 345,150 C 405,150 425,170 455,170 L 455,200 L 345,200 Z'
  }
];

const conversionCards: ConversionCardData[] = [
  {
    id: 0,
    rate: '76%',
    label: 'Conversion rate',
    description: 'Customers who signed up in the selected period.',
    fromStage: 'New Customers',
    toStage: 'Onboarding Completed'
  },
  {
    id: 1,
    rate: '53%',
    label: 'Conversion rate',
    description: 'Customers who completed onboarding successfully.',
    fromStage: 'Onboarding Completed',
    toStage: 'Actively Using Product'
  },
  {
    id: 2,
    rate: '38%',
    label: 'Conversion rate',
    description: 'Customers who used key features in the last 7 days.',
    fromStage: 'Actively Using Product',
    toStage: 'Renewal Ready'
  },
  {
    id: 3,
    rate: '22%',
    label: 'Conversion rate',
    description: 'from New Customers to Renewal Ready'
  }
];

const defaultConversion = conversionCards[3];

const CustomerJourneyFunnel: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<any>(defaultConversion);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setActiveCard(conversionCards[hoveredIndex]);
    }
  }, [hoveredIndex]);

  const getCardPositionStyle = () => {
    if (isMobile) {
      return { left: '50%', transform: 'translateX(-50%)', top: '-20px' };
    }
    if (activeCard.id === 0) return { left: '25%', top: '5px' };
    if (activeCard.id === 1) return { left: '40%', top: '25px' };
    if (activeCard.id === 2) return { left: '55%', top: '35px' };
    if (activeCard.id === 3) return { right: '25px', top: '45px' };
    return { right: '20px', top: '10px' };
  };

  return (
    <div className="BoxStyle p-6 lg:pt-5 lg:pb-4 bg-white border border-[#EDF3FD] rounded-[24px] flex flex-col h-auto lg:h-[440px]">
      <div className="mb-4 text-left">
        <h3 className="tracking-normal font-semibold text-[#1E293B] text-[20px] leading-[20px]">
          Customer Journey Funnel
        </h3>
        <p className="text-[15px] text-slate-400 mt-1.5">
          Measure customer progress across key success milestones.
        </p>
      </div>

      <div className="relative flex flex-col justify-center flex-grow min-h-0 mt-4">
        <div
          className={`absolute bg-white shadow-[0px_1px_4px_0px_#0000002E] rounded-[8px] py-1.5 px-2 flex items-start gap-3 text-left transition-all duration-300 ease-out w-[240px] z-10 ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          style={getCardPositionStyle()}
        >
          <span className="text-[24px] font-bold text-[#004370] leading-none shrink-0">
            {activeCard.rate}
          </span>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#1E293B]">
              {activeCard.label}
            </span>
            <span className="text-[10px] text-[#64748B] mt-0.5 leading-tight">
              {activeCard.fromStage && activeCard.toStage
                ? `from ${activeCard.fromStage} to ${activeCard.toStage}`
                : activeCard.description}
            </span>
          </div>
        </div>

        <div className="w-full relative mt-3">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 455 210"
            preserveAspectRatio="xMidYMid meet"
            className="w-full"
          >
            <defs>
              <linearGradient id="funnelGrad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#CAB6FF" />
                <stop offset="49.11%" stopColor="#BD99FA" />
                <stop offset="100%" stopColor="#BD99FA" />
              </linearGradient>
              <linearGradient id="funnelGrad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8084FF" />
                <stop offset="49.52%" stopColor="#7459F4" />
                <stop offset="100%" stopColor="#7459F4" />
              </linearGradient>
              <linearGradient id="funnelGrad3" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#D6EBFF" />
                <stop offset="100%" stopColor="#B0BDFF" />
              </linearGradient>
              <linearGradient id="funnelGrad4" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C7E6F9" />
                <stop offset="100%" stopColor="#D6F5FF" />
              </linearGradient>
            </defs>

            {stagesData.map((stage, idx) => {
              const IconComponent = stage.icon;
              return (
                <g
                  key={stage.id}
                  className={`cursor-pointer transition-all duration-300 `}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <path
                    d={stage.path}
                    fill={`url(#${stage.gradientId})`}
                  />
                  <circle
                    cx={stage.cx}
                    cy={stage.cy}
                    r="18"
                    fill={`url(#${stage.gradientId})`}
                    stroke="rgba(255, 255, 255, 0.5)"
                    strokeWidth="1.5"
                  />
                  <g transform={`translate(${stage.cx - 8}, ${stage.cy - 8})`} className="text-white">
                    <IconComponent size={16} color="white" variant="Linear" />
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-4 gap-1 mt-2 text-center">
          {stagesData.map((stage, idx) => (
            <div
              key={stage.id}
              className={`flex flex-col items-center transition-all duration-300 ${hoveredIndex !== null &&
                (hoveredIndex === idx || (hoveredIndex === idx - 1 && idx > 0))
                ? 'scale-105 font-medium'
                : ''
                }`}
            >
              <span className="text-[14px] font-bold text-[#111827] leading-tight">
                {stage.value}
              </span>
              <span className="text-[10px] text-[#6B7280] font-semibold leading-tight mt-1 max-w-[120px] block">
                {stage.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerJourneyFunnel;
