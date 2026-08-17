import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { knowledgeApi } from "../../../../api/knowledge/knowledgeApi";
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
import type { UploadedFile, UnderstandingCategory, AnalysisStage, ChecklistItem, ItemAnalysisStatus } from "./types";
import { INITIAL_UNDERSTANDING_CATEGORIES } from "./types";

interface MainImportPage1Props {
  onNext?: () => void;
  onSkip?: () => void;
}

import { useOnboardingState } from "../../../../providers/OnboardingStateProvider";

// ... Inside the component
const MainImportPage1: React.FC<MainImportPage1Props> = ({
  onNext,
  onSkip,
}) => {
  const { onboardingState, refreshState } = useOnboardingState();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [stage, setStage] = useState<AnalysisStage>("idle");
  // const [categories, setCategories] = useState<UnderstandingCategory[]>(INITIAL_UNDERSTANDING_CATEGORIES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<ChecklistItem | null>(null);
  const [isMissingInfoModalOpen, setIsMissingInfoModalOpen] = useState(false);

  const processingRef = useRef(true);

  const categorySummaries = onboardingState?.category_summaries;
  const categories: UnderstandingCategory[] = React.useMemo(() => {
    if (!categorySummaries) return INITIAL_UNDERSTANDING_CATEGORIES;

    const groupMap: Record<string, ChecklistItem[]> = {};
    categorySummaries.forEach(cs => {
      const group = cs.category_group || "Other";
      if (!groupMap[group]) groupMap[group] = [];
      
      let mappedStatus: ItemAnalysisStatus = "idle";
      if (cs.status === 'in_progress') mappedStatus = "analyzing";
      else if (cs.status === 'found' || cs.status === 'completed') {
        mappedStatus = cs.count > 0 ? "found" : "not_found";
      }

      groupMap[group].push({
        id: cs.key,
        name: cs.label,
        status: mappedStatus,
        resultText: cs.count > 0 ? `${cs.count} items found` : undefined,
        // Optional sub-items can be fetched on demand now
      });
    });

    return Object.keys(groupMap).map((key, idx) => ({
      id: `group-${idx}`,
      title: key,
      items: groupMap[key]
    }));
  }, [categorySummaries]);

  const [activeJobIds, setActiveJobIds] = useState<string[]>([]);

  useEffect(() => () => {
    processingRef.current = false;
  }, []);

  const pollJobs = async (jobIds: string[]) => {
    for (let attempt = 0; attempt < 120 && processingRef.current; attempt += 1) {
      const jobs = await Promise.all(jobIds.map((jobId) => knowledgeApi.getJob(jobId)));
      const failed = jobs.find((job) => ['failed', 'dead_lettered'].includes(job.status));
      if (failed) throw new Error(failed.last_error || 'Knowledge extraction failed');
      if (jobs.every((job) => ['completed', 'indexed'].includes(job.status) || job.disposition === 'indexed')) {
        setStage('analyzed');
        setActiveJobIds([]);
        setFiles((previous) => previous.map((file) => ({ ...file, status: 'analyzed' })));
        await refreshState();
        toast.success('Business knowledge extracted successfully!');
        return;
      }
      await new Promise((resolve) => window.setTimeout(resolve, 2500));
    }
    if (processingRef.current) throw new Error('Processing is taking longer than expected. You can return later.');
  };

  const handleFilesAdded = async (newRawFiles: File[]) => {
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
    toast.success(`Uploading ${newFiles[0]?.name || "file"}...`);

    try {
      const uploads = await Promise.all(newRawFiles.map((file) => knowledgeApi.uploadDocument(file, 'general')));
      const jobIds = uploads.map((upload) => upload.job_id);
      setActiveJobIds(jobIds);
      setStage('analyzing');
      void pollJobs(jobIds).catch((error) => {
        setActiveJobIds([]);
        setStage('idle');
        setFiles((previous) => previous.map((file) => ({ ...file, status: 'error' })));
        toast.error(error instanceof Error ? error.message : 'File processing failed');
      });
    } catch (error) {
      setStage('idle');
      setFiles((previous) => previous.map((file) => ({ ...file, status: 'error' })));
      toast.error(error instanceof Error ? error.message : 'File upload failed');
    }
  };

  const handleRemoveFile = (fileId: string) => {
    const updated = files.filter((f) => f.id !== fileId);
    setFiles(updated);
    if (updated.length === 0) {
      setStage("idle");
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

  const missingItems = React.useMemo(() => {
    if (!categorySummaries) return [];
    return categorySummaries
      .filter(cs => cs.status === 'pending' || cs.status === 'failed' || (cs.status === 'completed' && cs.count === 0))
      .map(cs => ({
        id: cs.key,
        name: cs.label,
        category: cs.category_group || 'General'
      }));
  }, [categorySummaries]);

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col justify-between py-6 sm:py-8 px-6 sm:px-10 lg:px-16 overflow-hidden font-sans">
      {/* Page Header (Fixed at top) */}
      <div className="max-w-[1460px] w-full mx-auto shrink-0 mb-4 sm:mb-6">
        <PageHeaderSection
          title="Import Your Business Data"
          subtitle="Help Follei understand your business, products, customers, pricing, and sales process."
        />
      </div>

      {/* Two-Column Scrollable Layout */}
      <div className="max-w-[1460px] w-full mx-auto flex-1 overflow-y-auto pr-2 onboarding-scroll min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-6">
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

            {activeJobIds.length > 0 && stage === "analyzing" && (
              <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                Processing {activeJobIds.length} document{activeJobIds.length === 1 ? '' : 's'} securely. This page will update when indexing is complete.
              </div>
            )}

            <UnderstandingChecklistSection
              categories={categories}
              showTitle={stage !== "analyzed"}
              onItemClick={(item) => setSelectedModalItem(item)}
              maxHeightClass={stage === "analyzed" ? "max-h-[260px]" : "max-h-[520px]"}
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
      </div>

      {/* Bottom Footer Section (Fixed at bottom) */}
      <div className="max-w-[1460px] w-full mx-auto shrink-0 bg-[#F8FAFC]">
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
        missingCount={missingItems.length}
        totalCount={onboardingState?.category_summaries?.length || 0}
        missingItems={missingItems}
      />
    </div>
  );
};

export default MainImportPage1;
