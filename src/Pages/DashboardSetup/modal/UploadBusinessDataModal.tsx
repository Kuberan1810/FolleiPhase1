import React, { useState, useRef, useEffect } from 'react';
import { X, UploadCloud, FileText, Check, Loader2 } from 'lucide-react';

export interface AnalysisStep {
  id: string;
  label: string;
  result: string;
}

export interface UploadDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDone: (files: File[]) => void;
  title?: string;
  subtitle?: string;
  analysisTitle?: string;
  analysisSubtitle?: string;
  analysisSteps?: AnalysisStep[];
}

const DEFAULT_BUSINESS_STEPS: AnalysisStep[] = [
  { id: '1', label: 'Reading business data', result: '1,248 records found' },
  { id: '2', label: 'Identifying data categories', result: '8 categories identified' },
  { id: '3', label: 'Mapping information', result: '8 fields mapped' },
  { id: '4', label: 'Finding duplicates', result: '0 duplicates found' },
  { id: '5', label: 'Checking missing data', result: 'Verified & complete' },
  { id: '6', label: 'Analyzing data quality', result: 'High confidence' },
];

const DEFAULT_LEADS_STEPS: AnalysisStep[] = [
  { id: '1', label: 'Reading lead data', result: '1,248 leads found' },
  { id: '2', label: 'Identifying lead fields', result: '8 fields identified' },
  { id: '3', label: 'Mapping information', result: '8 fields mapped' },
  { id: '4', label: 'Finding duplicates', result: '0 duplicates found' },
  { id: '5', label: 'Checking missing data', result: 'Verified & complete' },
  { id: '6', label: 'Analyzing lead quality', result: 'High confidence' },
];

export const UploadDataModal: React.FC<UploadDataModalProps> = ({
  isOpen,
  onClose,
  onDone,
  title = 'Upload Business Data',
  subtitle = 'Bring your business data into Follei..',
  analysisTitle = 'Analyzing your uploaded business data...',
  analysisSubtitle = 'Reading your file and understanding the business data.',
  analysisSteps = DEFAULT_BUSINESS_STEPS,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state on modal open
  useEffect(() => {
    if (isOpen) {
      setFiles([]);
      setCompletedSteps(0);
      setActiveStepIndex(0);
      setIsAnalysisComplete(false);
    }
  }, [isOpen]);

  // Start analysis ONLY when files are present
  useEffect(() => {
    if (!isOpen || files.length === 0) {
      setCompletedSteps(0);
      setActiveStepIndex(0);
      setIsAnalysisComplete(false);
      return;
    }

    setCompletedSteps(0);
    setActiveStepIndex(0);
    setIsAnalysisComplete(false);

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Animate through each analysis step progressively
    analysisSteps.forEach((_, idx) => {
      timers.push(
        setTimeout(() => {
          setActiveStepIndex(idx);
        }, idx * 600)
      );

      timers.push(
        setTimeout(() => {
          setCompletedSteps(idx + 1);
        }, (idx + 1) * 600)
      );
    });

    // Mark complete
    timers.push(
      setTimeout(() => {
        setIsAnalysisComplete(true);
      }, (analysisSteps.length + 0.5) * 600)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen, files, analysisSteps]);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(newFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '304 KB';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDone = () => {
    if (!isAnalysisComplete || files.length === 0) return;
    onDone(files);
    onClose();
  };

  const hasFiles = files.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 sm:p-6 font-sans select-none overflow-y-auto animate-in fade-in duration-200">
      {/* Container holding the popups */}
      <div
        className={`flex flex-col lg:flex-row items-stretch justify-center gap-6 w-full transition-all duration-300 ${
          hasFiles ? 'max-w-[1040px]' : 'max-w-[540px]'
        }`}
      >
        {/* POPUP 1 (Left Card): Upload Screen */}
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full flex-1 rounded-[24px] bg-white p-7 sm:p-8 shadow-2xl border border-gray-100 flex flex-col justify-between animate-in zoom-in-95 duration-200"
        >
          {/* Top Right Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="size-4.5" />
          </button>

          <div>
            {/* Header */}
            <div>
              <h2 className="text-[22px] font-bold tracking-tight text-[#16171A]">
                {title}
              </h2>
              <p className="mt-1 text-[14px] text-[#64748B] font-normal">
                {subtitle}
              </p>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.csv,.xlsx,.xls,.txt,.json"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drag and drop upload zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`my-5 flex min-h-[175px] cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed p-5 text-center transition-all ${
                isDragging
                  ? 'border-[#7A9601] bg-[#7A9601]/5 scale-[0.99]'
                  : 'border-[#CBD5E1] bg-white hover:bg-[#F9FAFB]'
              }`}
            >
              {/* Green Upload Cloud Icon */}
              <div className="flex size-12 items-center justify-center rounded-full bg-[#7A9601] text-white shadow-xs mb-3">
                <UploadCloud className="size-6 stroke-[2.2]" />
              </div>

              <h3 className="text-[15px] font-semibold text-[#16171A]">
                Drag & drop files here, or click to browse
              </h3>
              <p className="mt-1 text-[12.5px] text-[#64748B] font-normal">
                Up to 20 MB per file
              </p>
            </div>

            {/* Uploaded files section */}
            {hasFiles && (
              <div className="mb-4 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[13px] text-[#16171A] font-semibold">
                  <span>Uploaded files</span>
                  <span className="text-[#64748B] font-normal">
                    {files.length} {files.length === 1 ? 'file' : 'files'}
                  </span>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200/80 bg-white p-3 shadow-2xs"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                          <FileText className="size-5 text-gray-500 stroke-[1.8]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="truncate text-[13.5px] font-medium text-[#111827] leading-tight">
                            {file.name}
                          </span>
                          <span className="text-[12px] text-[#64748B] leading-tight mt-0.5">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Analyzing or Ready status pill badge */}
                        {!isAnalysisComplete ? (
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-3 py-1 text-[12px] font-medium text-[#475569]">
                            <Loader2 className="size-3.5 animate-spin text-[#64748B]" />
                            <span>Analyzing</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1 text-[12px] font-medium text-[#059669]">
                            <Check className="size-3.5 stroke-[2.5]" />
                            <span>Ready</span>
                          </div>
                        )}

                        {/* Remove file button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(idx);
                          }}
                          className="flex size-6 items-center justify-center rounded-md text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-[14px] font-semibold text-[#16171A] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!isAnalysisComplete || !hasFiles}
              onClick={handleDone}
              className={`px-6 py-2.5 text-[14px] font-semibold rounded-xl shadow-xs transition-all ${
                isAnalysisComplete && hasFiles
                  ? 'bg-[#A3B84A] hover:bg-[#8EA338] active:bg-[#7B8F2B] text-white cursor-pointer'
                  : 'bg-[#CBD5E1] text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              Done
            </button>
          </div>
        </div>

        {/* POPUP 2 (Right Card): Analyzing Live Progress */}
        {hasFiles && (
          <div
            role="dialog"
            aria-modal="true"
            className="relative flex-1 max-w-[470px] rounded-[24px] bg-white p-7 sm:p-8 shadow-2xl border border-gray-100 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-300"
          >
            {/* Top Right Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="size-4.5" />
            </button>

            <div>
              {/* Header */}
              <div>
                <h2 className="text-[20px] font-bold tracking-tight text-[#16171A] pr-6">
                  {analysisTitle}
                </h2>
                <p className="mt-1.5 text-[13.5px] text-[#64748B] font-normal leading-relaxed">
                  {analysisSubtitle}
                </p>
              </div>

              {/* Checklist Items */}
              <div className="mt-7 space-y-4">
                {analysisSteps.map((step, idx) => {
                  const isCompleted = idx < completedSteps;
                  const isCurrent = idx === activeStepIndex && !isCompleted;

                  return (
                    <div
                      key={step.id}
                      className="flex items-center justify-between transition-all"
                    >
                      {/* Left Icon & Label */}
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <div className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-[#10B981] bg-[#10B981]/10 text-[#10B981]">
                            <Check className="size-3 stroke-[2.8]" />
                          </div>
                        ) : isCurrent ? (
                          /* Custom Circular Loader with light-blue track and blue rotating arc */
                          <div className="relative flex size-[18px] shrink-0 items-center justify-center">
                            <svg className="size-[18px] animate-spin" viewBox="0 0 20 20" fill="none">
                              {/* Light blue base circle track */}
                              <circle
                                cx="10"
                                cy="10"
                                r="7.5"
                                stroke="#D0E2FF"
                                strokeWidth="2.2"
                              />
                              {/* Vibrant blue rotating indicator arc */}
                              <circle
                                cx="10"
                                cy="10"
                                r="7.5"
                                stroke="#3B82F6"
                                strokeWidth="2.2"
                                strokeDasharray="14 34"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="size-[18px] shrink-0 rounded-full border border-[#E2E8F0] bg-transparent" />
                        )}

                        {/* Step Name matching typography spec: Inter 400 14px 20px #1F2937 */}
                        <span
                          className={`font-normal text-[14px] leading-[20px] tracking-[0px] ${
                            isCompleted || isCurrent ? 'text-[#1F2937]' : 'text-[#9CA3AF]'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>

                      {/* Right Result / Status */}
                      <div>
                        {isCompleted ? (
                          /* Completed result matching spec: Inter 400 12px 16px #9CA3AF */
                          <span className="font-normal text-[12px] leading-[16px] tracking-[0px] text-[#9CA3AF]">
                            {step.result}
                          </span>
                        ) : isCurrent ? (
                          /* Analyzing text matching spec: Inter 400 12px 16px #6099F7 */
                          <span className="font-normal text-[12px] leading-[16px] tracking-[0px] text-[#6099F7]">
                            Analyzing
                          </span>
                        ) : (
                          <span className="font-normal text-[12px] leading-[16px] tracking-[0px] text-[#9CA3AF]/60">
                            Analyzing
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const UploadBusinessDataModal: React.FC<Omit<UploadDataModalProps, 'title' | 'subtitle' | 'analysisTitle' | 'analysisSubtitle' | 'analysisSteps'>> = (props) => (
  <UploadDataModal
    {...props}
    title="Upload Business Data"
    subtitle="Bring your business data into Follei.."
    analysisTitle="Analyzing your uploaded business data..."
    analysisSubtitle="Reading your file and understanding the business data."
    analysisSteps={DEFAULT_BUSINESS_STEPS}
  />
);

export const UploadLeadsModal: React.FC<Omit<UploadDataModalProps, 'title' | 'subtitle' | 'analysisTitle' | 'analysisSubtitle' | 'analysisSteps'>> = (props) => (
  <UploadDataModal
    {...props}
    title="Upload Leads"
    subtitle="Bring your leads into Follei.."
    analysisTitle="Analyzing your uploaded leads..."
    analysisSubtitle="Reading your file and understanding the lead data."
    analysisSteps={DEFAULT_LEADS_STEPS}
  />
);

export default UploadBusinessDataModal;
