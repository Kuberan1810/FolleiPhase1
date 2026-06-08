import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSpreadsheet, FileText } from "lucide-react";
import { TfiVideoClapper } from "react-icons/tfi";
import { BiImageAlt } from "react-icons/bi";
import OnboardingProgress from "./OnboardingProgress";
import FolleiWhite from "../../assets/logo/FolleiLogo.svg";
import BtnCom from "../../Component/BtnCom";

interface UploadedFiles {
    images: File[];
    videos: File[];
    excelCsv: File[];
    documents: File[];
}

const UploadCompanyData = () => {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
        images: [],
        videos: [],
        excelCsv: [],
        documents: [],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof UploadedFiles) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setUploadedFiles((prev) => ({
                ...prev,
                [type]: [...prev[type], ...filesArray],
            }));
        }
    };

    const handleNext = () => {
        navigate("/onboarding/review");
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-28 fixed top-5">
                    <img src={FolleiWhite} alt="FolleiLogo" />
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
                <div className="BoxStyle p-6 sm:p-10 flex flex-col relative w-full max-w-[950px] shadow-lg border border-gray-100 min-h-0">
                    <div className="mb-8 text-left">

                        <h2 className="font-inter font-semibold text-[24px] text-[#0B1C30] leading-[30px] mb-2">
                            Upload Company Data
                        </h2>
                        <p className="font-inter text-[16px] text-[#424656] leading-[20px]">
                            Feed your AI with existing knowledge bases, marketing assets, and historical data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-6 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group min-h-[160px]">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "documents")}
                                accept=".pdf, .doc, .docx, .txt, .md"
                                multiple
                            />
                            <FileText size={30} className="text-[#004370] group-hover:scale-105 transition-transform duration-200" />
                            <span className="font-inter font-semibold text-[14px] text-[#004370] mt-4">
                                Upload Documents
                            </span>
                            <span className="font-inter text-[12px] text-[#5A6375] mt-1">
                                {uploadedFiles.documents.length > 0
                                    ? `${uploadedFiles.documents.length} file(s) selected`
                                    : "Drag & Drop or Browse"}
                            </span>
                        </label>

                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-6 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group min-h-[160px]">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "videos")}
                                accept="video/*"
                                multiple
                            />
                            <TfiVideoClapper size={30} className="text-[#004370] group-hover:scale-105 transition-transform duration-200" />
                            <span className="font-inter font-semibold text-[14px] text-[#004370] mt-4">
                                Upload Videos
                            </span>
                            <span className="font-inter text-[12px] text-[#5A6375] mt-1">
                                {uploadedFiles.videos.length > 0
                                    ? `${uploadedFiles.videos.length} file(s) selected`
                                    : "Drag & Drop or Browse"}
                            </span>
                        </label>

                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-6 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group min-h-[160px]">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "images")}
                                accept="image/*"
                                multiple
                            />
                            <BiImageAlt size={32} className="text-[#004370] group-hover:scale-105 transition-transform duration-200" />
                            <span className="font-inter font-semibold text-[14px] text-[#004370] mt-4">
                                Upload Images
                            </span>
                            <span className="font-inter text-[12px] text-[#5A6375] mt-1">
                                {uploadedFiles.images.length > 0
                                    ? `${uploadedFiles.images.length} file(s) selected`
                                    : "Drag & Drop or Browse"}
                            </span>
                        </label>

                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-6 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group min-h-[160px]">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "excelCsv")}
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                multiple
                            />
                            <FileSpreadsheet size={30} className="text-[#004370] group-hover:scale-105 transition-transform duration-200" />
                            <span className="font-inter font-semibold text-[14px] text-[#004370] mt-4">
                                Upload Excel/CSV
                            </span>
                            <span className="font-inter text-[12px] text-[#5A6375] mt-1">
                                {uploadedFiles.excelCsv.length > 0
                                    ? `${uploadedFiles.excelCsv.length} file(s) selected`
                                    : "Drag & Drop or Browse"}
                            </span>
                        </label>


                    </div>

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
                            className="px-8 sm:px-10!"
                        />
                    </div>
                </div>

                <OnboardingProgress currentStep={6} />
            </main>
        </div>
    );
};

export default UploadCompanyData;
