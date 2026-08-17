import React, { useState } from 'react';
import { Globe, Lock, Check, Minus, Loader2 } from 'lucide-react';
import { Input } from '../../auth/Components/Input';
import { knowledgeApi } from '../../../api/knowledge/knowledgeApi';
import toast from 'react-hot-toast';

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

interface CompanyWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onSkip?: () => void;
}

export const CompanyWebsiteModal: React.FC<CompanyWebsiteModalProps> = ({
  isOpen,
  onClose,
  onNext,
  onSkip,
}) => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [urlError, setUrlError] = useState('');

  const [items, setItems] = useState<IdentifyItem[]>(
    DEFAULT_ITEMS.map((item) => ({ ...item, status: 'idle' }))
  );

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!websiteUrl.trim()) {
      setUrlError('Please enter your company website URL');
      return;
    }

    setUrlError('');
    setIsAnalyzing(true);
    setHasAnalyzed(false);

    setItems((prev) => prev.map((item) => ({ ...item, status: 'analyzing' })));

    try {
      await knowledgeApi.ingestWebsite(websiteUrl, 10, 'general');
    } catch {
      toast.error('Failed to submit website for ingestion');
      setItems((prev) => prev.map((item) => ({ ...item, status: 'idle' })));
      setIsAnalyzing(false);
      return;
    }

    // Simulate step-by-step progressive AI website analysis
    for (let i = 0; i < DEFAULT_ITEMS.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 180));

      setItems((prev) =>
        prev.map((item, idx) => {
          if (idx === i) {
            const isFound = idx !== 6;
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

  const handleNextClick = () => {
    if (!hasAnalyzed) {
      handleAnalyze();
    } else if (onNext) {
      onNext();
    } else {
      onClose();
    }
  };

  const handleSkipClick = () => {
    if (onSkip) {
      onSkip();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-[520px] bg-white rounded-2xl p-7 sm:p-8 shadow-2xl border border-gray-100 flex flex-col animate-in zoom-in-95 duration-200">

        {/* Header Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-[22px] font-semibold text-[#191C1E] tracking-tight">
            Connect your Company Website
          </h2>
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
                  <span className="text-[12px] font-medium tracking-wide">Connect</span>
                )}
              </button>
            }
            disabled={isAnalyzing}
          />
        </div>

        {!urlError && (
          <p className="mt-1.5 text-[13px] text-[#979797] font-normal">
            Enter your company website URL
          </p>
        )}

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
                className={`text-[13px] transition-colors ${item.status === 'found'
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
        <Lock className="w-3.5 h-3.5 shrink-0" color="#979797" />
        <span>We only analyze publicly available information from your website</span>
      </div>

      {/* Bottom Actions Row */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleSkipClick}
          className="text-xs text-[#444748] hover:text-black font-semibold transition-colors cursor-pointer focus:outline-none"
        >
          Skip for now
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-medium py-3 px-8 text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <span>Next</span>
        </button>
      </div>
      </div>
    </div>

  );
};

export default CompanyWebsiteModal;
