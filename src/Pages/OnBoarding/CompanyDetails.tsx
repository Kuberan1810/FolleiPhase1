import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../auth/Components/Input';
import { Select } from '../auth/Components/Select';
import { onboardingApi } from '../../api/onboarding/onboardingApi';
import toast from 'react-hot-toast';

const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

const industries = [
  'SaaS',
  'E-commerce',
  'Financial Services',
  'Insurance',
  'Healthcare',
  'Education',
  'Logistics & Transportation',
  'Manufacturing',
  'IT Services & Consulting',
  'Telecommunications',
  'Real Estate',
  'Media & Entertainment',
  'Other',
];

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'India',
  'Germany',
  'France',
  'Singapore',
];

const timezones = [
  'America/Los_Angeles',
  'America/New_York',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Australia/Sydney',
];

const CompanyDetails: React.FC = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [companySize, setCompanySize] = useState('11-50');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !industry || !timezone) {
      toast.error('Company Name, Industry, and Time Zone are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onboardingApi.createCompanyProfile({
        company_name: companyName,
        website: website || undefined,
        timezone: timezone,
        country_region: country || undefined,
        // The current backend activates the Insurance pack from Financial
        // Services. Keep the UI label until the backend enum accepts Insurance.
        industry: industry === 'Insurance' ? 'Financial Services' : industry,
        industry_other: industry === 'Other' ? customIndustry : null,
        company_size: companySize,
      });
      navigate('/onboarding/Bussiness-module');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to save company details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        {/* Step Indicator & Header Title */}
        <div className="text-center mb-6">
          <span className="text-[12px] font-medium uppercase tracking-widest text-[#505F76] block mb-1">
            STEP 2 OF 3
          </span>
          <h1 className="text-[32px] font-bold text-[#000000] tracking-tight">
            Company Details
          </h1>
          <p className="text-[14px] text-[#444748] mt-2 font-normal">
            Tell us about your organization to help us tailor your experience.
          </p>
        </div>

        {/* Card Box */}
        <div className="w-full bg-white rounded-[8px] border border-[#E2E8F0] shadow-[0_4px_6px_-4px_rgba(236,238,240,0.5),0_10px_15px_-3px_rgba(236,238,240,0.5)] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section 1: BASIC INFO */}
            <div>
              <label className="block text-[14px] font-medium uppercase tracking-wider text-[#191C1E] mb-3">
                BASIC INFO
              </label>
              <div className="space-y-3">
                <Input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                  required
                />
                <Input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Company Website"
                />
              </div>
            </div>

            {/* Section 2: INDUSTRY & SECTOR */}
            <div>
              <label className="block text-[14px] font-medium uppercase tracking-wider text-[#191C1E] mb-3">
                INDUSTRY & SECTOR
              </label>
              <Select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Select Industry"
                options={industries}
              />
              {industry === 'Other' && (
                <div className="mt-3">
                  <Input
                    type="text"
                    value={customIndustry}
                    onChange={(e) => setCustomIndustry(e.target.value)}
                    placeholder="Specify your industry / sector"
                  />
                </div>
              )}
            </div>

            {/* Section 3: COMPANY SIZE */}
            <div>
              <label className="block text-[14px] font-medium uppercase tracking-wider text-[#191C1E] mb-3">
                COMPANY SIZE
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                {companySizes.map((size) => {
                  const isSelected = companySize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setCompanySize(size)}
                      className={`p-3.5 border rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${isSelected
                        ? 'border-black bg-black text-white shadow-sm'
                        : 'border-[#C4C7C7] bg-white text-[#191C1E] hover:bg-gray-50'
                        }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: LOCATION */}
            <div>
              <label className="block text-[14px] font-medium uppercase tracking-wider text-[#191C1E] mb-3">
                LOCATION
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Country */}
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  options={countries}
                />

                {/* Time Zone */}
                <Select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="Time Zone"
                  options={timezones}
                />
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-6">
              {/* <div className="flex items-center gap-1.5">
                <div className="w-5 h-[2px] bg-[#E2E8F0] rounded-full" />
                <div className="w-5 h-[2px] bg-[#E2E8F0] rounded-full" />
                <div className="w-8 h-[3px] bg-[#000000] rounded-full" />
                <span className="text-[12px] text-[#64748B] font-normal ml-1">
                  Setup nearly complete
                </span>
              </div> */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto h-[48px] px-6 bg-[#000000] hover:bg-gray-900 text-white text-[14px] font-semibold shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10),0_4px_6px_-1px_rgba(0,0,0,0.10)] transition-all cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Saving...' : 'Complete Setup'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-2 h-2 bg-[#CBD5E1] rounded-full transition-all" />
          <span className="w-2.5 h-2.5 bg-[#0F172A] rounded-full transition-all" />
          <span className="w-2 h-2 bg-[#CBD5E1] rounded-full transition-all" />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
