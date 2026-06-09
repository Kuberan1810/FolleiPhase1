import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import OnboardingProgress from "./OnboardingProgress";
import FolleiWhite from "../../assets/logo/FolleiLogo.svg";
import BtnCom from "../../Component/BtnCom";

interface ProductInfoData {
    productName: string;
    productCategory: string;
    productType: string;
    pricingModel: string;
    productDescription: string;
    keyFeatures: string;
    targetAudience: string;
}

const ProductInformation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProductInfoData>({
        productName: "",
        productCategory: "Software as a Service",
        productType: "",
        pricingModel: "",
        productDescription: "",
        keyFeatures: "",
        targetAudience: "",
    });

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        navigate("/onboarding/upload-data");
    };

    const categoryOptions = [
        "Software as a Service",
        "Hardware / Physical Goods",
        "Professional Services",
        "Consulting",
        "Digital Products",
        "Other",
    ];

    const isFormComplete =
        formData.productName.trim() !== "" &&
        formData.productCategory.trim() !== "" &&
        formData.productType.trim() !== "" &&
        formData.pricingModel.trim() !== "" &&
        formData.productDescription.trim() !== "" &&
        formData.keyFeatures.trim() !== "" &&
        formData.targetAudience.trim() !== "";

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-28 fixed top-5">
                    <img src={FolleiWhite} alt="FolleiLogo" />
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
                <div className="BoxStyle p-6 sm:p-10 flex flex-col relative w-full max-w-[850px] shadow-lg border border-gray-100 min-h-0">
                    <div className="mb-8 text-left">

                        <h2 className="text-[#464555] text-[24px] font-semibold tracking-wider uppercase font-inter block mb-1">
                            Product Information
                        </h2>
                        <p className="text-[#191C1D] text-[14px] font-semibold leading-none font-manrope">
                            Define the offerings and technical capabilities that your AI assistant will represent.
                        </p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8 text-left" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Product Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    placeholder="e.g. Follei Analytics Pro"
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5" ref={dropdownRef}>
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Product Category
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                    className="w-full text-left pl-4 px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                >
                                    <span>{formData.productCategory}</span>
                                </button>
                                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#94A3B8]">
                                    <ChevronDown size={18} className={`transform transition-transform duration-200 ${openDropdown ? "rotate-180" : ""}`} />
                                </span>

                                {openDropdown && (
                                    <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-[12px] shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                                        {categoryOptions.map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, productCategory: option }));
                                                    setOpenDropdown(false);
                                                }}
                                                className={`px-4 py-2.5 text-[14px] font-inter cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] ${formData.productCategory === option
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
                                Product Type
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="productType"
                                    value={formData.productType}
                                    onChange={handleChange}
                                    placeholder="e.g. Subscription Software"
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Pricing Model
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="pricingModel"
                                    value={formData.pricingModel}
                                    onChange={handleChange}
                                    placeholder="e.g. Tiered Monthly Billing"
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Product Description
                            </label>
                            <div className="relative">
                                <textarea
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    placeholder="Describe what the product does and how it solves customer pain points..."
                                    rows={4}
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Key Features
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="keyFeatures"
                                    value={formData.keyFeatures}
                                    onChange={handleChange}
                                    placeholder="Separate features with commas"
                                    className="w-full px-[12px] py-[14px] bg-[#FFFFFF] rounded-[8px] border border-[#C7C4D8]/30 font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370]/20 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter font-semibold text-[12px] text-[#464555]">
                                Target Audience
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="targetAudience"
                                    value={formData.targetAudience}
                                    onChange={handleChange}
                                    placeholder="e.g. Mid-size Marketing Agencies"
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
                            className="px-8 sm:px-10!"
                        />
                        <BtnCom
                            title="Next"
                            variant="primary"
                            onClick={handleNext}
                            disabled={!isFormComplete}
                            className="px-8 sm:px-10!"
                        />
                    </div>
                </div>

                <OnboardingProgress currentStep={5} />
            </main>
        </div>
    );
};

export default ProductInformation;
