import React from 'react';
import { HelpCircle, } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {

  return (
    <section className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="w-full space-y-8">

        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col items-start gap-3.5">
            <div className="flex items-center gap-2 text-[14px] font-medium">
              <Link to="/settings" className="text-[#626262] hover:text-[#004370] transition-colors cursor-pointer">Settings</Link>
              <span className="text-[#626262]">{'>'}</span>
              <span className="text-[#004370] font-medium">Privacy Policy</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#004370] uppercase tracking-[0.15em] block">
                Intelligence Hub
              </span>
              <h1 className="text-[30px] font-bold text-[#191C1E] tracking-tight">Privacy policy</h1>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#004370]/10 flex items-center justify-center text-[#004370]">
                <HelpCircle size={16} />
              </div>
              <h2 className="text-[18px] font-bold text-[#191C1E]">1. Introduction</h2>
            </div>
            <div className="pl-11 space-y-4">
              <p className="text-[14px] text-[#434655] leading-relaxed">
                Welcome to EditorialCRM. We value your privacy and the trust you place in our intelligent canvas. This Privacy Policy explains how we collect, use, and protect your information as you interact with our suite of CRM tools.
              </p>
              <p className="text-[14px] text-[#434655] leading-relaxed">
                By using EditorialCRM, you agree to the terms outlined in this document. Our commitment is to maintain the highest standard of data integrity while providing you with a seamless editorial experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
