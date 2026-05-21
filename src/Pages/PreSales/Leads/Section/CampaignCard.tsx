import React from 'react';
import { ChevronUp, Check } from 'lucide-react';

const CampaignCard: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

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
        CAMPAIGN
      </h3>

      <div className="bg-[#F8FAFC] rounded-[16px] border border-slate-100 p-6">
        {/* Campaign Header Row */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h4 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#191C1E',
                margin: 0
              }}
            >
              Campaign Name
            </h4>
            <p 
              className="mt-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '20px',
                color: '#000000',
                margin: 0
              }}
            >
              Type : Direct mail
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Active Badge */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '67.3px',
                height: '28px',
                borderRadius: '10px',
                backgroundColor: '#0E9F6E',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                boxSizing: 'border-box',
                padding: '2px 10px'
              }}
            >
              Active
            </div>

            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '20px',
                color: '#000000'
              }}
            >
              End Date : 20/05/2026
            </span>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 hover:bg-slate-200 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-slate-500"
            >
              <ChevronUp 
                className="w-5 h-5 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
              />
            </button>
          </div>
        </div>

        {/* Accordion Expandable Content */}
        <div 
          className="transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: isOpen ? '1000px' : '0px',
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? '20px' : '0px'
          }}
        >
          {/* Progress Section */}
          <div className="flex justify-between items-center mb-2">
            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#191C1E'
              }}
            >
              Step 3: Follow-up Email
            </span>
            <span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#464555'
              }}
            >
              60%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200/60 rounded-full mb-6 relative overflow-hidden">
            <div 
              className="h-full bg-[#004370] rounded-full transition-all duration-500"
              style={{ width: '60%' }}
            />
          </div>

          {/* Full Cadence Steps Header */}
          <h5 
            className="mb-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#464555',
              margin: '24px 0 16px 0'
            }}
          >
            Full Cadence Steps
          </h5>

          {/* Steps Timeline */}
          <div className="relative pl-8 space-y-6">
            {/* Vertical Connector Line */}
            <div 
              className="absolute left-[11px] top-4 w-[2px] bg-slate-200"
              style={{ bottom: '16px' }}
            />

            {/* Step 1 */}
            <div className="relative flex items-start justify-between">
              {/* Circle Indicator */}
              <div 
                className="absolute left-[-32px] top-0 w-6 h-6 rounded-full flex items-center justify-center bg-[#004370] text-white"
              >
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
              
              <div>
                <h6 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '20px',
                    color: '#191C1E',
                    margin: 0
                  }}
                >
                  Day 1: Introductory Email
                </h6>
                <p 
                  className="mt-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '18px',
                    color: '#64748B',
                    margin: 0
                  }}
                >
                  Sent on Jan 12, 2026
                </p>
              </div>

              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#0E9F6E'
                }}
              >
                Completed
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start justify-between">
              {/* Circle Indicator */}
              <div 
                className="absolute left-[-32px] top-0 w-6 h-6 rounded-full flex items-center justify-center bg-[#004370] text-white"
              >
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
              
              <div>
                <h6 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '20px',
                    color: '#191C1E',
                    margin: 0
                  }}
                >
                  Day 3: LinkedIn Connect
                </h6>
                <p 
                  className="mt-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '18px',
                    color: '#64748B',
                    margin: 0
                  }}
                >
                  Accepted on Jan 15, 2026
                </p>
              </div>

              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#0E9F6E'
                }}
              >
                Completed
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start justify-between">
              {/* Circle Indicator */}
              <div 
                className="absolute left-[-32px] top-0 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-[#004370]"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#004370]" />
              </div>
              
              <div>
                <h6 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '16px',
                    color: '#191C1E',
                    margin: 0
                  }}
                >
                  Day 7: Value Proposition Email
                </h6>
                <p 
                  className="mt-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '18px',
                    color: '#64748B',
                    margin: 0
                  }}
                >
                  Scheduled for Tomorrow, 9:00 AM
                </p>
              </div>

              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#0A71B7'
                }}
              >
                In Progress
              </span>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-start justify-between">
              {/* Circle Indicator */}
              <div 
                className="absolute left-[-32px] top-0 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-slate-200"
              />
              
              <div>
                <h6 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '20px',
                    color: '#94A3B8',
                    margin: 0
                  }}
                >
                  Day 14: Final Follow-up
                </h6>
                <p 
                  className="mt-1"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '18px',
                    color: '#94A3B8',
                    margin: 0
                  }}
                >
                  Pending current step
                </p>
              </div>

              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#94A3B8'
                }}
              >
                Scheduled
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
