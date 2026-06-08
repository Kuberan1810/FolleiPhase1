import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import OnboardingProgress from "./OnboardingProgress";
import FolleiWhite from "../../assets/logo/FolleiLogo.svg";
import BtnCom from "../../Component/BtnCom";

interface GeneralInfoData {
    companyName: string;
    industryType: string;
    websiteUrl: string;
    companySize: string;
    location: string;
}

const GeneralInformation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<GeneralInfoData>({
        companyName: "",
        industryType: "SaaS / Technology",
        websiteUrl: "",
        companySize: "1-10 Employees",
        location: "",
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

    const handleNext = () => {
        navigate("/onboarding/product-info");
    };

    const industryOptions = [
        "SaaS / Technology",
        "Healthcare",
        "Finance",
        "Education",
        "E-commerce",
        "Other",
    ];

    const sizeOptions = [
        "1-10 Employees",
        "11-50 Employees",
        "51-200 Employees",
        "201-500 Employees",
        "500+ Employees",
    ];

    const isFormComplete =
        formData.companyName.trim() !== "" &&
        formData.industryType.trim() !== "" &&
        formData.websiteUrl.trim() !== "" &&
        formData.companySize.trim() !== "" &&
        formData.location.trim() !== "";

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-4 sm:px-5 pt-5">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-28 fixed top-5">
                    <img src={FolleiWhite} alt="FolleiLogo" />
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 mt-12 sm:mt-0">
                <div className="BoxStyle p-5 sm:p-8 md:p-10 flex flex-col relative w-full max-w-[750px] shadow-xs min-h-0">
                    <div className="mb-6 sm:mb-8 text-left">
                        <span className="text-[#464555] text-[12px] font-semibold tracking-wider uppercase font-inter block mb-1">
                            ORGANIZATION
                        </span>
                        <h2 className="text-[#191C1D] text-[24px] font-semibold leading-none font-manrope">
                            General Information
                        </h2>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6 sm:mb-8 md:mb-10 text-left" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Company Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="e.g. Acme Corp"
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5" ref={industryRef}>
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Industry Type
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenDropdown(openDropdown === "industry" ? null : "industry")}
                                    className="w-full text-left pl-4 px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
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

                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Website URL
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="websiteUrl"
                                    value={formData.websiteUrl}
                                    onChange={handleChange}
                                    placeholder="https://www.yourcompany.com"
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5" ref={sizeRef}>
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Company Size
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}
                                    className="w-full text-left px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
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
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Headquarters Location
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City, Country"
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>
                    </form>

                    <div className="mt-auto flex items-center justify-end gap-3 sm:gap-4">
                        <BtnCom
                            title="Go Back"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="px-6 sm:px-10!"
                        />
                        <BtnCom
                            title="Next"
                            variant="primary"
                            onClick={handleNext}
                            disabled={!isFormComplete}
                            className="px-6 sm:px-10!"
                        />
                    </div>
                </div>

                <OnboardingProgress currentStep={6} />
            </main>
        </div>
    );
};

export default GeneralInformation;
