import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, ChevronDown, FileDown, FileUp } from 'lucide-react';
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
        title: 'Outbound',
        icon: FileUp,
        questions: [
            { q: 'Can I integrate my existing email provider?', a: 'Yes, outbound emails can be sent through your connected provider.' }
        ]
    }
];

const HelpCenter: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleQuestion = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col items-start gap-3.5 mb-8">
                <div className="flex items-center gap-2 text-[14px] font-medium">
                    <Link to="/settings" className="text-[#626262] hover:text-[#004370] transition-colors cursor-pointer">Settings</Link>
                    <span className="text-[#626262]">{'>'}</span>
                    <span className="text-[#004370] font-medium">Help Center</span>
                </div>
                <div className="space-y-1 font-manrope">

                    <h1 className="text-[30px] font-bold text-[#000000] tracking-tight">
                        Help Center
                    </h1>
                </div>
            </div>

            <div className="flex flex-col w-full relative">
                {faqData.map((section) => (
                    <div key={section.id} className="flex flex-col w-full bg-white rounded-[24px] p-6 sm:p-8 border border-[#F1F5F9] mb-8">

                        <div className="flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-[48px] h-[48px] bg-[#014370]/15 rounded-[12px] flex items-center justify-center text-[#014370]">
                                    <section.icon size={24} strokeWidth={2.5} />
                                </div>
                                <h2 className="text-[20px] font-[800] leading-[28px] tracking-[-0.5px] text-[#191C1E]">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="flex flex-col">
                                {section.questions.map((item, qIndex) => {
                                    const questionId = `${section.id}-${qIndex}`;

                                    return (
                                        <div key={questionId} className="flex flex-col border-b border-gray-50 last:border-0 font-manrope">
                                            <div
                                                className="w-full py-4 flex items-center justify-between cursor-pointer group transition-all duration-200"
                                                onClick={() => toggleQuestion(questionId)}
                                            >
                                                <span className={`text-[18px] font-[600] leading-[28px] tracking-[0px] transition-colors duration-200 ${expandedId === questionId ? 'text-[#014370]' : 'text-[#191C1E]'} group-hover:text-[#014370] text-left pr-4`}>
                                                    {item.q}
                                                </span>
                                                <div className={`transition-transform duration-300 ${expandedId === questionId ? 'rotate-180' : ''}`}>
                                                    <ChevronDown className={`transition-colors ${expandedId === questionId ? 'text-[#014370]' : 'text-[#191C1E]'}`} size={20} strokeWidth={2.5} />
                                                </div>
                                            </div>

                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedId === questionId ? 'max-h-[300px] mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <p className="text-[#475569] text-[16px] leading-[24px] font-medium pr-12 pb-2">
                                                    {item.a}
                                                </p>
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
