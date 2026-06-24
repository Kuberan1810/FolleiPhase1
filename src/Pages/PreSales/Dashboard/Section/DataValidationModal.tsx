import React, { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft, Layers2 } from "lucide-react";

interface DataValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSuccessContinue: (action: "view_leads" | "dashboard") => void;
  sourceName: string;
}

const validationMetricsConfig = [
  { label: "TOTAL RECORDS", multiplier: 12482, color: "text-[#0D1C2E]" },
  { label: "VALID RECORDS", multiplier: 11586, color: "text-[#005B96]" },
  { label: "DUPLICATE FOUND", multiplier: 256, color: "text-[#0D1C2E]" },
];

const DataValidationModal: React.FC<DataValidationModalProps> = ({
  isOpen,
  onBack,
  onSuccessContinue,
  sourceName,
}) => {
  const [step, setStep] = useState<"validation" | "success">("validation");
  const [validationProgress, setValidationProgress] = useState(0);

  const successMetrics = [
    { label: "TOTAL RECORDS", value: "1,250", valueColor: "text-[#001E40]" },
    { label: "ELAPSED TIME", value: "1m 42s", valueColor: "text-[#001E40]" },
    { label: "DUPLICATE SKIPPED", value: "42", valueColor: "text-[#D91C1C]", },
    { label: "LAST SYNC TIME", value: "2m ago", valueColor: "text-[#001E40]", },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep("validation");
      setValidationProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && step === "validation") {
      setValidationProgress(0);
      const totalDuration = 2000;
      const intervalTime = 30;
      const stepValue = 100 / (totalDuration / intervalTime);

      const interval = setInterval(() => {
        setValidationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + stepValue;
        });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const getSourceDisplayName = () => {
    return sourceName || "sales_leads_q4.csv";
  };

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (validationProgress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#EDF3FD] shadow-2xl w-full max-w-[580px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-center relative">

        {step === "validation" ? (
          /*                 VALIDATION SCREEN         */
          <div className="text-left flex flex-col w-full">
            <div className="p-6 md:p-8 flex justify-between items-start">
              <div>
                <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
                  Data Validation
                </h1>
                <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
                  We've completed the initial scan of your source file.
                </p>
              </div>
            </div>

            <div className="p-4 md:p-8 overflow-y-auto max-h-[calc(100vh-220px)] flex flex-col">
              {/* Circular Progress Indicator */}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="relative w-[180px] h-[180px]">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="90"
                      cy="90"
                      r="80"
                      strokeWidth="10"
                      stroke="#EDF3FD"
                      fill="transparent"
                    />
                    <circle
                      cx="90"
                      cy="90"
                      r="80"
                      strokeWidth="10"
                      stroke="#004370"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-100 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[35px] font-bold text-[#004370]">
                      {Math.round(validationProgress)}%
                    </span>
                    <span className="text-[13px] font-semibold text-[#434655] uppercase tracking-widest leading-none mt-1">
                      Data validation
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats List */}
              <div className="space-y-3 w-full mt-3">
                {validationMetricsConfig.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2.5 px-5 bg-white border border-[#F3F4F6] rounded-xl">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-semibold text-[#434655] tracking-wider uppercase">
                        {metric.label}
                      </span>
                      <span className="text-[14px] text-[#434655] truncate max-w-[260px] font-medium">
                        Source: {getSourceDisplayName()}
                      </span>
                    </div>
                    <span className="text-[32px] font-bold text-[#004370]">
                      {Math.floor((validationProgress / 100) * metric.multiplier).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-1 px-4 py-2 border border-[#E2E8F0] hover:bg-slate-50 text-[#464555] rounded-[12px] text-[16px] font-semibold cursor-pointer transition-colors"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <button
                onClick={() => setStep("success")}
                disabled={validationProgress < 100}
                className="px-6 py-2.5 bg-[#004370] hover:bg-[#003152] disabled:opacity-50 disabled:pointer-events-none text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (

          // success
          <div className="flex flex-col p-6 md:p-8">
            <div className="flex flex-col items-center mt-4 mb-6">
              <div className="w-20 h-20 bg-[#0c7351ff] text-[#10B981] flex items-center justify-center rounded-full mb-4">
                <CheckCircle2 size={40} className="text-white" fill="#0c7351ff" />
              </div>
              <h2 className="text-[32px] font-bold text-[#191C1D] leading-tight">
                Imported Successfull
              </h2>
              <p className="text-[16px] text-[#434655] mt-1">
                Your data has been imported into Follei.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {successMetrics.map((metric, idx) => {
                return (
                  <div key={idx} className="bg-[#F7F9FB] border border-[#F1F7FF] rounded-[32px] p-6 flex flex-col items-start gap-3 text-left">
                    <div className="w-10 h-10 flex items-center justify-center rounded-[12px] bg-[#E6EDF1] text-[#004370]">
                      <Layers2 size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">
                        {metric.label}
                      </span>
                      <span className={`text-[32px] md:text-[22px] font-bold mt-0.5 ${metric.valueColor}`}>
                        {metric.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => onSuccessContinue("view_leads")}
                className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-[14px] font-bold cursor-pointer transition-colors"
              >
                View Leads
              </button>
              <button
                onClick={() => onSuccessContinue("dashboard")}
                className="flex-1 py-3 bg-[#004370] hover:bg-[#003152] text-white rounded-xl text-[14px] font-bold cursor-pointer transition-colors"
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        )
        }
      </div >
    </div >
  );
};

export default DataValidationModal;
