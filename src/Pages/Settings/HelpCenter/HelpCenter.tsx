import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, ChevronDown, ChevronUp, FileDown, FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
    {
        id: 'presales',
        title: 'Presales',
        icon: ShoppingCart,
        questions: [
            { q: 'What is the follei pricing model?', a: 'Detailed information about our pricing model will be provided here.' },
            { q: 'Do you offer a free trial for the Intelligence Canvas?', a: 'Yes, we offer a 14-day free trial for new users.' }
        ]
    },
    {
        id: 'postsales',
        title: 'Postsales',
        icon: ShieldCheck,
        questions: [
            { q: 'What is the follei pricing model?', a: 'Our pricing is based on a subscription model.' },
            { q: 'Do you offer a free trial for the Intelligence Canvas?', a: 'Contact our sales team for extended trial options.' },
            { q: 'How do I request a refund for an annual plan?', a: 'Refunds are processed according to our billing policy. Please contact support.' }
        ]
    },
    {
        id: 'inbound',
        title: 'Inbound',
        icon: FileDown,
        questions: [
            { q: 'Can I integrate my existing email provider?', a: 'Yes, we support integration with major email providers including Gmail and Outlook.' },
            { q: 'Do you offer a free trial for the Intelligence Canvas?', a: 'Yes, inbound features are included in the trial.' }
        ]
    },
    {
        id: 'outbound',
        title: 'Outboud',
        icon: FileUp,
        questions: [
            { q: 'Can I integrate my existing email provider?', a: 'Yes, outbound emails can be sent through your connected provider.' }
        ]
    }
];

const HelpCenter: React.FC = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col items-start gap-3.5 mb-8">
                <div className="flex items-center gap-2 text-[14px] font-medium">
                    <Link to="/settings" className="text-[#626262] hover:text-[#004370] transition-colors cursor-pointer">Settings</Link>
                    <span className="text-[#626262]">{'>'}</span>
                    <span className="text-[#004370] font-medium">Help Center</span>
                </div>
                <div className="space-y-1">
                    <span className="text-[12px] font-semibold text-[#004370] uppercase tracking-[0.15em]">
                        Intelligence Hub
                    </span>
                    <h1 className="text-[30px] font-bold text-[#000000] tracking-tight">
                        Help Center
                    </h1>
                </div>
            </div>

            <div className="flex flex-col w-full relative">
                {faqData.map((section, sectionIndex) => (
                    <div key={section.id} className="flex flex-col w-full">

                        <div className={`flex flex-col py-6 ${sectionIndex === 0 ? 'pt-2' : ''}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-[48px] h-[48px] bg-[#014370]/15 rounded-[12px] flex items-center justify-center text-[#014370]">
                                    <section.icon size={24} strokeWidth={2.5} />
                                </div>
                                <h2 className="text-[30px] font-[800] leading-[36px] tracking-[-0.75px] text-[#191C1E]">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="flex flex-col">
                                {section.questions.map((item, qIndex) => {
                                    const questionId = `${section.id}-${qIndex}`;

                                    return (
                                        <div key={questionId} className="flex flex-col">
                                            <div
                                                className="w-full py-4 flex items-center justify-between rounded-lg"
                                            >
                                                <span className="text-[18px] font-[600] leading-[28px] tracking-[0px] text-[#191C1E] text-left">
                                                    {item.q}
                                                </span>
                                                <ChevronDown className="text-[#191C1E] ml-4 shrink-0" size={20} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpCenter;
