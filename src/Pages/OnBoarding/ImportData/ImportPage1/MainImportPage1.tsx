import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import PageHeaderSection from "./PageHeaderSection";
import FileUploadSection from "./FileUploadSection";
import UploadedFilesCardSection from "./UploadedFilesCardSection";
import KnowledgeExtractedSection from "./KnowledgeExtractedSection";
import FileFormatSection from "./FileFormatSection";
import ImportSourceSection from "./ImportSourceSection";
import UnderstandingChecklistSection from "./UnderstandingChecklistSection";
import FooterSection from "./FooterSection";
import ExtractedDetailsModal from "./ExtractedDetailsModal";
import MissingInfoModal from "./MissingInfoModal";
import type { UploadedFile, UnderstandingCategory, AnalysisStage, ChecklistItem } from "./types";
import { INITIAL_UNDERSTANDING_CATEGORIES } from "./types";

interface MainImportPage1Props {
  onNext?: () => void;
  onSkip?: () => void;
}

const MainImportPage1: React.FC<MainImportPage1Props> = ({
  onNext,
  onSkip,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [stage, setStage] = useState<AnalysisStage>("idle");
  const [categories, setCategories] = useState<UnderstandingCategory[]>(INITIAL_UNDERSTANDING_CATEGORIES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<ChecklistItem | null>(null);
  const [isMissingInfoModalOpen, setIsMissingInfoModalOpen] = useState(false);

  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger analysis sequence whenever files transition into 'analyzing'
  const startAnalysisSequence = () => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
    }

    setStage("analyzing");

    // Flatten all items with category pointers
    const itemsSequence: { catIndex: number; itemIndex: number }[] = [];
    INITIAL_UNDERSTANDING_CATEGORIES.forEach((cat, cIdx) => {
      cat.items.forEach((_, iIdx) => {
        itemsSequence.push({ catIndex: cIdx, itemIndex: iIdx });
      });
    });

    let currentStep = 0;
    const totalSteps = itemsSequence.length;

    simulationIntervalRef.current = setInterval(() => {
      if (currentStep < totalSteps) {
        const { catIndex, itemIndex } = itemsSequence[currentStep];

        setCategories((prev) => {
          const next = prev.map((cat, cIdx) => {
            if (cIdx !== catIndex) return cat;
            return {
              ...cat,
              items: cat.items.map((it, iIdx) => {
                if (iIdx === itemIndex) {
                  // Resolve based on item template (policies, followup, comm_prefs are not_found)
                  const isNotFound = it.id === "policies" || it.id === "followup" || it.id === "comm_prefs";
                  return {
                    ...it,
                    status: isNotFound ? "not_found" : "found",
                  };
                }
                if (iIdx === itemIndex + 1) {
                  return { ...it, status: "analyzing" };
                }
                return it;
              }),
            };
          });
          return next;
        });

        currentStep++;
      } else {
        if (simulationIntervalRef.current) {
          clearInterval(simulationIntervalRef.current);
          simulationIntervalRef.current = null;
        }

        // Mark all files as analyzed
        setFiles((prev) =>
          prev.map((f) => ({ ...f, status: "analyzed" }))
        );
        setStage("analyzed");
        toast.success("Business knowledge extracted successfully!");
      }
    }, 120); // Smooth live progression
  };

  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  const handleFilesAdded = (newRawFiles: File[]) => {
    const newFiles: UploadedFile[] = newRawFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type || file.name.split(".").pop() || "pdf",
      status: "analyzing",
    }));

    const combined = [...files, ...newFiles];
    setFiles(combined);
    toast.success(`Analyzing ${newFiles[0]?.name || "file"}...`);
    startAnalysisSequence();
  };

  const handleRemoveFile = (fileId: string) => {
    const updated = files.filter((f) => f.id !== fileId);
    setFiles(updated);
    if (updated.length === 0) {
      setStage("idle");
      setCategories(INITIAL_UNDERSTANDING_CATEGORIES);
    }
  };

  const handleSourceSelect = (sourceId: string) => {
    const sourceNames: Record<string, string> = {
      google_drive: "Google Drive",
      crm: "CRM",
      connect_website: "Website Connector",
    };
    toast(`Connecting to ${sourceNames[sourceId] || sourceId}...`, {
      icon: "🔗",
    });
  };

  const handleContinueClick = () => {
    if (stage === "analyzed") {
      // Open Missing Information Warning Modal
      setIsMissingInfoModalOpen(true);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        if (onNext) {
          onNext();
        } else {
          toast.success("Proceeding to next step!");
        }
      }, 600);
    }
  };

  const handleContinueAnyway = () => {
    setIsMissingInfoModalOpen(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onNext) {
        onNext();
      } else {
        toast.success("Continuing to workspace setup...");
      }
    }, 500);
  };

  const handleUploadMore = () => {
    setIsMissingInfoModalOpen(false);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      toast("Skipped for now");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between py-10 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1460px] w-full mx-auto">
        {/* Page Header */}
        <PageHeaderSection
          title="Import Your Business Data"
          subtitle="Help Follei understand your business, products, customers, pricing, and sales process."
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Upload or Uploaded Card + Formats + Sources */}
          <div className="lg:col-span-7 flex flex-col">
            {files.length === 0 ? (
              <FileUploadSection
                files={files}
                onFilesChange={(newFiles) => {
                  if (newFiles.length > 0) {
                    handleFilesAdded(newFiles.map((nf) => nf.file).filter(Boolean) as File[]);
                  }
                }}
              />
            ) : (
              <UploadedFilesCardSection
                files={files}
                onRemoveFile={handleRemoveFile}
                onAddFiles={handleFilesAdded}
              />
            )}

            <FileFormatSection />

            <ImportSourceSection
              onSelectSource={handleSourceSelect}
              onUploadCsvClick={() => {
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) fileInput.click();
              }}
            />
          </div>

          {/* Right Column: Knowledge Extracted (if analyzed) + Live Checklist */}
          <div className="lg:col-span-5 flex flex-col">
            {stage === "analyzed" && (
              <KnowledgeExtractedSection
                categoriesCount={24}
                insightsCount={186}
                productsServicesCount={42}
                customerSegmentsCount={18}
              />
            )}

            <UnderstandingChecklistSection
              categories={categories}
              showTitle={stage !== "analyzed"}
              onItemClick={(item) => setSelectedModalItem(item)}
              title={
                stage === "analyzing"
                  ? "Analyzing your business data..."
                  : "What Follei will understand"
              }
              subtitle={
                stage === "analyzing"
                  ? "Follei is extracting useful information from your files."
                  : "Follei automatically analyzes your files and builds business context for your AI-powered sales workspace."
              }
            />
          </div>
        </div>

        {/* Bottom Footer Section */}
        <FooterSection
          onSkip={handleSkip}
          onContinue={handleContinueClick}
          isLoading={isSubmitting}
          isAnalyzed={stage === "analyzed"}
        />
      </div>

      {/* Extracted Sub-items Detail Modal */}
      <ExtractedDetailsModal
        isOpen={!!selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
        item={selectedModalItem}
      />

      {/* Missing Information Modal */}
      <MissingInfoModal
        isOpen={isMissingInfoModalOpen}
        onClose={() => setIsMissingInfoModalOpen(false)}
        onUploadMore={handleUploadMore}
        onContinueAnyway={handleContinueAnyway}
      />
    </div>
  );
};

export default MainImportPage1;
