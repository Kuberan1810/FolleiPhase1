import React from 'react';
import {  ShieldCheck, CircleOff, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';


const TermsAndConditions: React.FC = () => {
    return (
        <section className="min-h-screen   pb-12">
            <div className="w-full space-y-8">

                <div className="flex flex-col items-start gap-4">
                    <div className="flex flex-col items-start gap-3.5">
                        <div className="flex items-center gap-2 text-[14px] font-medium">
                            <Link to="/settings" className="text-[#626262] hover:text-[#004370] transition-colors cursor-pointer">Settings</Link>
                            <span className="text-[#626262]">{'>'}</span>
                            <span className="text-[#004370] font-medium">Terms and Conditions</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[12px] font-semibold text-[#004370] uppercase tracking-[0.15em] block">
                                Intelligence Hub
                            </span>
                            <h1 className="text-[30px] font-bold text-[#191C1E] tracking-tight">Terms and Conditions</h1>
                        </div>
                    </div>
                </div>

                <div className="space-y-16 BoxStyle p-6!">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[14px] font-bold bg-[#F2F4F6] text-[#0D4D77] w-[40px] h-[40px] flex items-center justify-center rounded-[12px]">01</span>
                            <h2 className="text-xl md:text-[24px]  font-bold text-[#191C1E]">Acceptance of Terms</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[16px] text-[#434655] leading-relaxed w-full">
                                By registering for an account or using the services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, you must immediately cease all use of the platform.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-[16px] text-[#434655]">
                                    <div className="text-[#0D4D77]">
                                        <CircleCheck size={18} />
                                    </div>
                                    <span>You must be at least 18 years of age or the legal age of majority in your jurisdiction to use this service.</span>
                                </div>
                                <div className="flex items-center gap-3 text-[16px] text-[#434655]">
                                    <div className="text-[#0D4D77]">
                                        <CircleCheck size={18} />
                                    </div>
                                    <span>The service is provided "as-is" and "as-available" without any warranties of any kind.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[14px] font-bold bg-[#F2F4F6] text-[#0D4D77] w-[40px] h-[40px] flex items-center justify-center rounded-[12px]">02</span>
                            <h2 className="text-xl md:text-[24px]  font-bold text-[#191C1E]">Privacy & Data Governance</h2>
                        </div>
                        <div className="space-y-6">
                            <p className="text-[16px] text-[#434655] leading-relaxed w-full">
                                Your privacy is paramount. EditorialCRM operates under a strict "Intelligent Privacy" model. We collect only the metadata necessary to optimize your editorial workflows.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="bg-[#F2F4F6]/50! rounded-[16px] p-6! BoxStyle space-y-3">
                                    <div className="flex items-center gap-2.5">
                                        <ShieldCheck color='currentColor' size={20} className="text-[#191C1E]" />
                                        <h3 className="text-[16px] font-bold text-[#191C1E]">Data Encryption</h3>
                                    </div>
                                    <p className="text-[14px] text-[#434655] leading-relaxed">
                                        All editorial content is encrypted at rest and in transit using industry-standard protocols.
                                    </p>
                                </div>
                                <div className="bg-[#F2F4F6]/50! rounded-[16px] p-6! BoxStyle space-y-3">
                                    <div className="flex items-center gap-2.5">
                                        <CircleOff size={20} className="text-[#191C1E]" />
                                        <h3 className="text-[16px] font-bold text-[#191C1E]">No Sale Policy</h3>
                                    </div>
                                    <p className="text-[14px] text-[#434655] leading-relaxed">
                                        We never sell your contact databases or editorial insights to third-party advertisers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[14px] font-bold bg-[#F2F4F6] text-[#0D4D77] w-[40px] h-[40px] flex items-center justify-center rounded-[12px]">03</span>
                            <h2 className="text-xl md:text-[24px]  font-bold text-[#191C1E]">Usage Restrictions</h2>
                        </div>
                        <div>
                            <div className="bg-[#F2F4F6]/30 border-l-4 border-[#BA1A1A]/20 rounded-r-[16px] p-8 md:p-10 space-y-6 w-full">
                                <p className="text-[16px] text-[#434655] font-medium opacity-80">
                                    Users are strictly prohibited from utilizing EditorialCRM for the following activities:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]" />
                                        <span className="text-[14px] text-[#191C1E]">Automated bulk scraping</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]" />
                                        <span className="text-[14px] text-[#191C1E]">Reverse engineering the UI</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]" />
                                        <span className="text-[14px] text-[#191C1E]">Hosting illegal materials</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]" />
                                        <span className="text-[14px] text-[#191C1E]">Bypassing security protocols</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[14px] font-bold bg-[#F2F4F6] text-[#0D4D77] w-[40px] h-[40px] flex items-center justify-center rounded-[12px]">04</span>
                            <h2 className="text-xl md:text-[24px]  font-bold text-[#191C1E]">Intellectual Property</h2>
                        </div>
                        <div className="space-y-6">
                            <p className="text-[16px] text-[#434655] leading-relaxed w-full">
                                You retain all ownership rights to the content you create and upload to EditorialCRM. We claim no ownership over your intellectual property. By using our platform, you grant us a limited, worldwide license to host and display your content solely for the purpose of providing the service to you.
                            </p>

                            <div className="bg-[#E6E8EA]/40 rounded-[24px] p-8 md:p-10 space-y-4 w-full">
                                <span className="text-[12px] font-extrabold text-[#0D4D77] uppercase tracking-wider block">
                                    PLATFORM IDENTITY
                                </span>
                                <p className="text-[14px] text-[#434655] font-medium leading-relaxed opacity-80">
                                    The EditorialCRM brand, logos, "Intelligent Canvas" proprietary layout engine, and visual design tokens are the exclusive property of EditorialCRM Inc. Any unauthorized reproduction is strictly prohibited.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;