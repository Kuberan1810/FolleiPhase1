import React from 'react';
import { CircleDollarSign, CalendarDays } from 'lucide-react';
import BillingTable from './BillingTable';

const PaymentOverview: React.FC = () => {

    const subscription = {
        plan: "Pro Plan - $89 / mo",
        status: "Active",
        creditsUsed: 7500,
        totalCredits: 10000,
        nextPaymentDate: "August 02, 2026",
        upcomingAmount: "$ 89.00",
        resetDate: "July 02"
    };

    const usagePercentage = (subscription.creditsUsed / subscription.totalCredits) * 100;

    return (
        /* Layout Fix: 
           - Removed 'lg:ml-64' because MainLayout handles the flex-1 positioning.
           - w-full ensures it stretches across the entire main content area.
        */
        <div className="w-full font-['Inter'] transition-all duration-300">
            {/* Padding is minimal (py-6) because MainLayout already provides 
               lg:px-8. This will align it perfectly with your Header.
            */}
            <div className="py-6">



                {/* Grid Container - Matches Figma Spacing */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">

                    {/* Current Plan Card (White) */}
                    <div className="bg-white border border-[#F1F5F9] rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-[380px] font-[Manrope]">
                        <div>
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="text-[#64748B]">
                                        <CircleDollarSign size={24} />
                                    </div>
                                    <span className="text-[15px] font-[Inter] text-[#64748B]">Current plan</span>
                                </div>
                                <span className="px-3.5 py-1.5 bg-[#014370]/20 text-[#004370] text-[14px] font-regular font-[Manrope] rounded-[10px] ">
                                    {subscription.status}
                                </span>
                            </div>

                            <h2 className="text-[25px] font-bold text-[#0F172A] mb-10 font-[Manrope]">
                                {subscription.plan}
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[14px] text-[#64748B]">AI Credits Usage</span>
                                    <span className="text-[14px]  text-[#0F172A] ">
                                        {subscription.creditsUsed.toLocaleString()} / {subscription.totalCredits.toLocaleString()} Credits
                                    </span>
                                </div>

                                <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#004370] rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${usagePercentage}%` }}
                                    />
                                </div>

                                <p className="text-[14px] text-[#64748B] leading-relaxed">
                                    {usagePercentage}% used. Upgrade or wait until {subscription.resetDate} for reset.
                                </p>
                            </div>
                        </div>

                        <button className="mt-10 w-full py-4 bg-[#004370] hover:bg-[#00355a] text-white text-[20px] font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                            Upgrade Plan

                        </button>
                    </div>

                    {/* Next Payment Card (Blue) */}
                    <div className="bg-[#00426e] rounded-[24px] p-6 md:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-xl relative overflow-hidden">
                        {/* Figma Light Glow Effect */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <CalendarDays size={26} className="text-white" />
                                    <span className="text-[15px] font-normal text-white">Next Payment</span>
                                </div>
                                <span className="px-3.5 py-1.5 bg-[#D9E3EA] text-[#004370] text-[15px]  rounded-lg border border-white/20">
                                    Automated Renewal
                                </span>
                            </div>

                            <h2 className="text-[38px] md:text-[24px] font-bold leading-tight  mb-4">
                                on {subscription.nextPaymentDate}
                            </h2>
                        </div>

                        <div className="relative z-10 pt-4">
                            <div className="flex justify-between items-end mb-10">
                                <span className="text-[20px] text-white font-medium">Upcoming Amount</span>
                                <span className="text-[22px] font-semibold  leading-none">
                                    {subscription.upcomingAmount}
                                </span>
                            </div>

                            <button className="w-full py-4 bg-white text-[#00426e] text-[20px] font-extrabold rounded-xl hover:bg-slate-50 transition-all shadow-2xl cursor-pointer">
                                Manage Payments
                            </button>
                        </div>
                    </div>

                </div>
                <div className="mt-4">

                    <BillingTable />
                </div>
            </div>
        </div>
    );
};

export default PaymentOverview;