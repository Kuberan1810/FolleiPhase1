import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface CompanyDetailsData {
    companyName: string;
    industryType: string;
    websiteUrl: string;
    companySize: string;
    location: string;
    contactPerson: string;
    email: string;
    phone: string;
}

const Details = () => {
    const [formData, setFormData] = useState<CompanyDetailsData>({
        companyName: "",
        industryType: "Technology",
        websiteUrl: "",
        companySize: "1-10 Employees",
        location: "",
        contactPerson: "",
        email: "",
        phone: "",
    });

    const [openDropdown, setOpenDropdown] = useState<"industry" | "size" | null>(null);

    const industryRef = useRef<HTMLDivElement>(null);
    const sizeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                industryRef.current &&
                !industryRef.current.contains(event.target as Node) &&
                sizeRef.current &&
                !sizeRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const industryOptions = [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Other",
    ];

    const sizeOptions = [
        "1-10 Employees",
        "11-50 Employees",
        "51-200 Employees",
        "201-500 Employees",
        "500+ Employees",
    ];

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="mb-2">
                <h2 className="font-inter font-semibold text-[24px] text-[#0B1C30] leading-[30px] mb-2">
                    Organization Setup
                </h2>
                <p className="font-inter text-[16px] text-[#424656] leading-[20px]">
                    Tell us about your organization to personalize your AI environment.
                </p>
            </div>

            <div className="BoxStyle w-full">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-1">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Company Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="e.g. Acme Corp"
                                className="w-full px-4 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5" ref={industryRef}>
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Industry Type
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setOpenDropdown(openDropdown === "industry" ? null : "industry")}
                                className="w-full text-left pl-4 pr-10 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#0B1C30] transition-all duration-200 cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                            >
                                <span>{formData.industryType}</span>
                            </button>
                            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#94A3B8]">
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${openDropdown === "industry" ? "rotate-180" : ""}`} />
                            </span>

                            {openDropdown === "industry" && (
                                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-[12px] shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                                    {industryOptions.map((option) => (
                                        <div
                                            key={option}
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, industryType: option }));
                                                setOpenDropdown(null);
                                            }}
                                            className={`px-4 py-2.5 text-[14px] font-inter cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] ${formData.industryType === option
                                                ? "bg-[#3525CD]/5 text-[#004370] font-semibold"
                                                : "text-[#191C1E]"
                                                }`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Website URL
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                name="websiteUrl"
                                value={formData.websiteUrl}
                                onChange={handleChange}
                                placeholder="https://www.acme.com"
                                className="w-full px-4 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5" ref={sizeRef}>
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Company Size
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}
                                className="w-full text-left px-4 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#0B1C30] transition-all duration-200 cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                            >
                                <span>{formData.companySize}</span>
                            </button>
                            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#94A3B8]">
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${openDropdown === "size" ? "rotate-180" : ""}`} />
                            </span>

                            {openDropdown === "size" && (
                                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-[12px] shadow-lg z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                                    {sizeOptions.map((option) => (
                                        <div
                                            key={option}
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, companySize: option }));
                                                setOpenDropdown(null);
                                            }}
                                            className={`px-4 py-2.5 text-[14px] font-inter cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] ${formData.companySize === option
                                                ? "bg-[#3525CD]/5 text-[#004370] font-semibold"
                                                : "text-[#191C1E]"
                                                }`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, Country"
                                className="w-full px-4 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Contact Person
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="contact@acme.com"
                                className="w-full px-4 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter font-semibold text-[14px] text-[#424656]">
                            Phone
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                className="w-full px-4 py-3 bg-[#F7FAFC] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white transition-all duration-200"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Details;
