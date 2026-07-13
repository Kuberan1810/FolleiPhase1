import React, { useState } from "react";
import { FileSpreadsheet, FileText } from "lucide-react";
import { TfiVideoClapper } from "react-icons/tfi";
import { BiImageAlt } from "react-icons/bi";

interface UploadedFiles {
    images: File[];
    videos: File[];
    excelCsv: File[];
    documents: File[];
}

const UploadCompanyData = () => {
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

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="mb-2">
                <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
                    Upload Company Data
                </h1>
                <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
                    Feed your AI with existing knowledge bases, marketing assets, and historical data.
                </p>
            </div>

            <div className="BoxStyle w-full">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-4 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group">
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

                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-4 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group">
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

                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-4 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group">
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

                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#004370]/50 rounded-[12px] p-4 text-center cursor-pointer transition-all duration-200 bg-white hover:bg-[#F8FAFC] hover:border-[#004370] group">
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
                </div>
            </div>
        </div>
    );
};

export default UploadCompanyData;
