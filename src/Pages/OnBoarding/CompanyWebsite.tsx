import React, { useState } from 'react';
import { Globe, Lock, Check, Minus, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../auth/Components/Input';
import { Lock1 } from 'iconsax-react';

export interface IdentifyItem {
  id: string;
  label: string;
  status: 'idle' | 'analyzing' | 'found' | 'not_found';
}

const DEFAULT_ITEMS: Omit<IdentifyItem, 'status'>[] = [
  { id: '1', label: 'Products & Services' },
  { id: '2', label: 'Pricing & Plans' },
  { id: '3', label: 'Key Features' },
  { id: '4', label: 'Customer Segments' },
  { id: '5', label: 'Use Cases' },
  { id: '6', label: 'Value Propositions' },
  { id: '7', label: 'FAQs' },
  { id: '8', label: 'Sales Messaging' },
  { id: '9', label: 'Industries Served' },
  { id: '10', label: 'Contact Information' },
];

export const CompanyWebsite: React.FC = () => {
  const navigate = useNavigate();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [urlError, setUrlError] = useState('');

  // Items status state
  const [items, setItems] = useState<IdentifyItem[]>(
    DEFAULT_ITEMS.map((item) => ({ ...item, status: 'idle' }))
  );

  const handleAnalyze = async () => {
    if (!websiteUrl.trim()) {
      setUrlError('Please enter your company website URL');
      return;
    }

    setUrlError('');
    setIsAnalyzing(true);
    setHasAnalyzed(false);

    // Set all items to analyzing state
    setItems((prev) => prev.map((item) => ({ ...item, status: 'analyzing' })));

    // Simulate step-by-step progressive AI website analysis
    for (let i = 0; i < DEFAULT_ITEMS.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 180));
      
      setItems((prev) =>
        prev.map((item, idx) => {
          if (idx === i) {
            // Most items are identified (found), while some edge items (e.g. FAQs or Pricing depending on site) show not_found (-)
            // For demonstration, item 7 (FAQs) or items based on pattern can be not_found if custom
            const isFound = idx !== 6; // item 6 (FAQs) demonstrates not_found (-) if not detected
            return {
              ...item,
              status: isFound ? 'found' : 'not_found',
            };
          }
          return item;
        })
      );
    }

    setIsAnalyzing(false);
    setHasAnalyzed(true);
  };

  const handleNext = () => {
    if (!hasAnalyzed) {
      handleAnalyze();
    } else {
      console.log('Proceeding to next step with website:', websiteUrl);
      navigate('/onboarding/workspace');
    }
  };

  const handleSkip = () => {
    console.log('Skipping company website step');
    navigate('/onboarding/workspace');
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center p-4 sm:p-6 font-inter">
      <div className="w-full max-w-[480px]">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-[#C4C7C7]/30  p-7 sm:p-8 w-full">
          
          {/* Header Title & Subtitle */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-[22px] font-semibold text-[#191C1E] tracking-tight">
              Connect your Company Website
            </h1>
            <p className="mt-2 text-xs sm:text-xs text-[#444748] font-normal leading-relaxed">
              Let Follei understand your business automatically by analyzing your public website
            </p>
          </div>

          {/* Company Website Input Section */}
          <div className="mb-6">
            <Input
              label="Company Website"
              placeholder="https://yourcompany.com"
              value={websiteUrl}
              onChange={(e) => {
                setWebsiteUrl(e.target.value);
                if (urlError) setUrlError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && websiteUrl.trim() && !isAnalyzing) {
                  e.preventDefault();
                  handleAnalyze();
                }
              }}
              error={urlError}
              leftIcon={<Globe className="w-4 h-4 stroke-[1.75]" />}
              rightElement={
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!websiteUrl.trim() || isAnalyzing}
                  className="bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-medium px-4 py-3 rounded-md text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <span>Analyze</span>
                  )}
                </button>
              }
            />
            {!urlError && (
              <p className="mt-1.5 text-[13px] text-[#979797] font-normal">
                Enter your company website URL
              </p>
            )}
          </div>

          {/* "Follei will automatically identify" Container */}
          <div className="border border-[#C4C7C7] rounded-xl p-4 sm:p-5 bg-white mb-5">
            <h3 className="text-sm sm:text-base font-medium text-[#191C1E] mb-4">
              Follei will automatically identify
            </h3>

            {/* 2-Column Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2.5">
                  {/* Status Indicator Icon */}
                  {item.status === 'idle' && (
                    <div className="w-4 h-4 rounded-full border border-gray-300 bg-white shrink-0" />
                  )}

                  {item.status === 'analyzing' && (
                    <div className="w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin shrink-0" />
                  )}

                  {item.status === 'found' && (
                    <div className="w-4 h-4 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#16A34A] stroke-[3]" />
                    </div>
                  )}

                  {item.status === 'not_found' && (
                    <div className="w-4 h-4 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0">
                      <Minus className="w-2.5 h-2.5 text-[#64748B] stroke-[3]" />
                    </div>
                  )}

                  {/* Label Text */}
                  <span
                    className={`text-[13px] transition-colors ${
                      item.status === 'found'
                        ? 'text-[#979797] font-normal'
                        : item.status === 'not_found'
                        ? 'text-[#979797] font-normal'
                        : 'text-[#979797] font-normal'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Disclaimer */}
          <div className="flex items-center gap-2 text-[12px] text-[#979797] font-normal mb-8">
            <Lock size={14} color='#979797' className=" shrink-0" />
            <span>We only analyze publicly available information from your website</span>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs text-[#444748] hover:text-black font-semibold transition-colors cursor-pointer focus:outline-none"
            >
              Skip for now
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-medium py-3 px-8 text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>Next</span>
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyWebsite;
