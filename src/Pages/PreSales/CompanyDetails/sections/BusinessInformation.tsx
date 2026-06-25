import React, { useState } from "react";

interface BusinessInformationData {
    companyDescription: string;
    productsServices: string;
    targetCustomers: string;
    salesProcess: string;
    supportProcess: string;
    commonQuestions: string;
}

const BusinessInformation = () => {
    const [formData, setFormData] = useState<BusinessInformationData>({
        companyDescription: "",
        productsServices: "",
        targetCustomers: "",
        salesProcess: "",
        supportProcess: "",
        commonQuestions: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="mb-2">
                <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
                    Business Information
                </h1>
                <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
                    Help our AI understand your business model and customer journey.
                </p>
            </div>

            <div className="BoxStyle w-full">
                <form className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-1.5 md:col-span-6">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            What does your company do?
                        </label>
                        <textarea
                            name="companyDescription"
                            value={formData.companyDescription}
                            onChange={handleChange}
                            placeholder="Provide a brief summary of your core mission..."
                            className="w-full px-4 pt-4 pb-[64px] bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-3">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Products/Services
                        </label>
                        <textarea
                            name="productsServices"
                            value={formData.productsServices}
                            onChange={handleChange}
                            placeholder="List your key offerings..."
                            className="w-full px-4 pt-4 pb-[64px] bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-3">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Target Customers
                        </label>
                        <textarea
                            name="targetCustomers"
                            value={formData.targetCustomers}
                            onChange={handleChange}
                            placeholder="Describe your ideal persona..."
                            className="w-full px-4 pt-4 pb-[64px] bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Sales Process
                        </label>
                        <textarea
                            name="salesProcess"
                            value={formData.salesProcess}
                            onChange={handleChange}
                            placeholder="Steps to close a deal..."
                            className="w-full px-4 pt-4 pb-[64px] bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Support Process
                        </label>
                        <textarea
                            name="supportProcess"
                            value={formData.supportProcess}
                            onChange={handleChange}
                            placeholder="How you handle tickets..."
                            className="w-full px-4 pt-4 pb-[64px] bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Common Questions
                        </label>
                        <textarea
                            name="commonQuestions"
                            value={formData.commonQuestions}
                            onChange={handleChange}
                            placeholder="What users ask most..."
                            className="w-full px-4 pt-4 pb-[64px] bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessInformation;
