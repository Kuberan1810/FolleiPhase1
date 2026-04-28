import React from 'react';
import { ShieldCheck, User, Monitor, CheckCircle2, Mail, Database, HelpCircle, Settings, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const usageItems = [
    "Personalizing your editorial dashboard and workflow recommendations.",
    "Enhancing our predictive analytics for better customer relationship management.",
    "Maintaining secure authentication and preventing unauthorized access to sensitive CRM data."
  ];

  return (
    <section className="min-h-screen pb-12">
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

        <div className="space-y-16 BoxStyle p-6!">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[12px] bg-[#014370]/15 flex items-center justify-center text-[#044672]">
                <HelpCircle size={16} />
              </div>
              <h2 className="text-[24px] font-bold text-[#191C1E]">1. Introduction</h2>
            </div>
            <div className="space-y-4">
              <p className="text-[16px] text-[#434655] leading-relaxed">
                Welcome to EditorialCRM. We value your privacy and the trust you place in our intelligent canvas. This Privacy Policy explains how we collect, use, and protect your information as you interact with our suite of CRM tools.
              </p>
              <p className="text-[16px] text-[#434655] leading-relaxed">
                By using EditorialCRM, you agree to the terms outlined in this document. Our commitment is to maintain the highest standard of data integrity while providing you with a seamless editorial experience.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[12px] bg-[#014370]/15 flex items-center justify-center text-[#044672]">
                <Database size={16} />
              </div>
              <h2 className="text-[24px] font-bold text-[#191C1E]">2. Data Collection</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FFFFFF] rounded-[12px] p-6! space-y-6 BoxStyle">
                <div className="flex items-center justify-start text-[#044672]">
                  <User size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[16px] font-bold text-[#191C1E]">Personal Identity</h3>
                  <p className="text-[14px] text-[#434655] leading-relaxed">
                    Names, email addresses, and professional profiles provided during account registration.
                  </p>
                </div>
              </div>
              <div className="bg-[#F2F4F6]! rounded-[12px] p-6! space-y-6 BoxStyle">
                <div className=" flex items-center justify-start text-[#044672]">
                  <Monitor size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[16px] font-bold text-[#191C1E]">Technical Data</h3>
                  <p className="text-[14px] text-[#64748B] leading-relaxed">
                    IP addresses, browser types, and operating system information collected automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[12px] bg-[#014370]/15 flex items-center justify-center text-[#044672]">
                <Settings size={16} />
              </div>
              <h2 className="text-[24px] font-bold text-[#191C1E]">3. How We Use Data</h2>
            </div>
            <div className="space-y-6">
              <p className="text-[16px] text-[#434655]">
                We leverage collected data to provide the "Intelligent Canvas" experience, specifically for:
              </p>
              <div className="space-y-4">
                {usageItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-[#0A4A76] shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-[16px] text-[#434655]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#004370] rounded-[24px] p-8 text-white relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10 mb-6">
                <div className="w-8 h-8 rounded-[12px] bg-white/20 flex items-center justify-center text-white">
                  <ShieldCheck size={16} />
                </div>
                <h2 className="text-[20px] sm:text-[24px] font-bold ">4. Security Protocols</h2>
              </div>
              <div className="space-y-6 relative z-10">
                <p className="text-[14px] sm:text-[16px] text-white/80 leading-relaxed w-full">
                  We treat security with mathematical precision. All data is encrypted using AES-256 standards both at rest and in transit. Our infrastructure is monitored 24/7 by dedicated security response teams to ensure your editorial workspace remains error-free.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-[12px] border border-white/20">
                  <ShieldCheck size={16} className="text-white" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">ISO 27001 COMPLIANT</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#004370] blur-[100px] opacity-20 -mr-32 -mt-32"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[12px] bg-[#E6E8EA] flex items-center justify-center text-[#004370]">
                <Scale size={16} />
              </div>
              <h2 className="text-[24px] font-bold text-[#191C1E]">5. Your Rights</h2>
            </div>
            <div>
              <div className="bg-[#F2F4F6] rounded-[16px] p-8 space-y-6 border border-[#00437010]">
                {[
                  { id: '01', title: 'Right to Access', desc: 'You have the right to request copies of your personal data held within EditorialCRM.' },
                  { id: '02', title: 'Right to Erasure', desc: 'Under certain conditions, you may request the deletion of your account and all associated metadata.' },
                  { id: '03', title: 'Right to Object', desc: 'You can opt-out of data processing for marketing or analytics purposes at any time via your account settings.' }
                ].map((right, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#E2E8F0]/50">
                      <span className="text-[16px] font-bold text-[#044672]">{right.id}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[16px] font-bold text-[#191C1E]">{right.title}</h3>
                      <p className="text-[14px] text-[#434655] leading-relaxed">
                        {right.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" space-y-6">
            <div className="space-y-2">
              <h2 className="text-[24px] font-bold text-[#191C1E]">Still have questions?</h2>
              <p className="text-[16px] text-[#64748B]">Our legal and privacy compliance team is ready to assist you with any concerns regarding your data.</p>
            </div>
            <div className="flex flex-row gap-3 w-full">
              <button className="flex-1 h-[48px] px-3 sm:px-6 bg-[#044672] text-white rounded-[14px] text-[13px] sm:text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-[#00365a] transition-all cursor-pointer">
                <Mail size={16} className="shrink-0" />
                <span className="truncate">Contact Privacy Team</span>
              </button>
              <button className="flex-1 h-[48px] px-3 sm:px-6 bg-[#E2E8F0] text-[#191C1E] rounded-[12px] text-[13px] sm:text-[16px] font-bold flex items-center justify-center hover:bg-[#CBD5E1] transition-all cursor-pointer">
                <span className="truncate">Visit Help Center</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;