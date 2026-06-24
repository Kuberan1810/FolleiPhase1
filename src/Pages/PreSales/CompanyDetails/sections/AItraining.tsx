import React, { useState } from "react";

interface AITrainingData {
    preferredLanguage: string;
    rules: string;
    avoid: string;
}

const AITraining = () => {
    const [formData, setFormData] = useState<AITrainingData>({
        preferredLanguage: "English",
        rules: "",
        avoid: "",
    });

    const handleLanguageChange = (language: string) => {
        setFormData((prev) => ({ ...prev, preferredLanguage: language }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const languages = ["English", "Tamil", "Hindi"];

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="mb-2">
                <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
                    AI Training & Tone
                </h1>
                <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
                    Define how your AI assistant interacts with the world.
                </p>
            </div>

            <div className="BoxStyle flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="font-inter font-normal text-[14px] text-[#424656]">
                        Preferred Language
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {languages.map((lang) => {
                            const isSelected = formData.preferredLanguage === lang;
                            return (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`px-6 py-2 rounded-full font-inter text-[14px] transition-all duration-200 cursor-pointer ${isSelected
                                        ? "bg-[#004370] text-white font-semibold"
                                        : "bg-[#F7F9FB] text-[#64748B] hover:bg-[#F1F5F9]"
                                        }`}
                                >
                                    {lang}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter font-normal text-[14px] text-[#424656]">
                            Important rules for AI
                        </label>
                        <textarea
                            name="rules"
                            value={formData.rules}
                            onChange={handleChange}
                            placeholder="e.g. Always mention the 10% discount for first-time buyers..."
                            className="w-full px-4 pt-4 pb-16 bg-[#F7F9FB] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-inter font-normal text-[14px] text-[#424656]">
                            Things AI should avoid
                        </label>
                        <textarea
                            name="avoid"
                            value={formData.avoid}
                            onChange={handleChange}
                            placeholder="e.g. Never promise delivery dates without checking inventory..."
                            className="w-full px-4 pt-4 pb-16 bg-[#F7F9FB] rounded-[12px] font-inter text-[16px] text-[#6B7280] placeholder-[#94A3B8] transition-all duration-200 resize-none min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] focus:bg-white"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AITraining;
