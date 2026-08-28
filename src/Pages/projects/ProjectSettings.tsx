import React, { useState } from 'react';
import { Menu, Check, Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../../Component/Sidebar';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import { useProjects } from '../../hooks/useProjects';
import { useDocuments } from '../../hooks/useDocuments';
import { useBusinessAnalysis } from '../../hooks/useBusinessAnalysis';
import { uploadDocument } from '../../api/setup/setup.api';
import { importLeadsCsv } from '../../api/leads/leads.api';
import { useLeads } from '../../hooks/useLeads';
import { listBusinesses, type Business } from '../../api/dashboard/dashboard.api';
import { errorMessage } from '../../lib/axios';
import BusinessAnalysisCard from '../DashboardSetup/setupwidgets/BusinessAnalysisCard';
import { getFileFormatIcon } from '../../Component/fileFormatIcons';

const Field: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] font-medium uppercase tracking-wider text-[#717378]">{label}</span>
    <span className="text-[14px] text-[#16171A]">{value?.trim() || '—'}</span>
  </div>
);

/**
 * Everything about one project in one place: its name, the business profile
 * behind it (category, customer type, CRM), and its documents.
 *
 * These answers were previously only reachable through the onboarding widget,
 * so once setup finished there was no way to see or change them.
 */
export const ProjectSettings: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { workspace, workspaceId } = useActiveWorkspace();
  const { rename } = useProjects();
  const ingestion = useDocuments(workspaceId);
  const { analysis, isAnalysing } = useBusinessAnalysis(
    workspaceId,
    ingestion.processed.length > 0 && !ingestion.isIngesting,
  );

  const [business, setBusiness] = useState<Business | null>(null);
  const [draftName, setDraftName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isImportingLeads, setIsImportingLeads] = useState(false);
  const { leads, refetch: refetchLeads } = useLeads(workspaceId);

  React.useEffect(() => {
    listBusinesses().then((rows) => setBusiness(rows[0] ?? null)).catch(() => setBusiness(null));
  }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length || !workspaceId) return;
    setIsUploading(true);
    try {
      for (const file of Array.from(files)) await uploadDocument(workspaceId, file);
      toast.success(`Uploaded ${files.length} document${files.length === 1 ? '' : 's'}`);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not upload'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleLeadCsv = async (files: FileList | null) => {
    if (!files?.length || !workspaceId) return;
    setIsImportingLeads(true);
    try {
      let imported = 0;
      let skipped = 0;
      for (const file of Array.from(files)) {
        const result = await importLeadsCsv(workspaceId, file);
        imported += result.imported;
        skipped += result.skipped_duplicates;
      }
      if (imported === 0 && skipped > 0) {
        toast(`Already imported — all ${skipped} lead${skipped === 1 ? '' : 's'} are in this project`, {
          icon: 'ℹ️',
        });
      } else {
        toast.success(
          `Imported ${imported} lead${imported === 1 ? '' : 's'}` +
          (skipped ? ` · skipped ${skipped} already here` : ''),
        );
      }
      void refetchLeads();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not import leads'));
    } finally {
      setIsImportingLeads(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased">
      <Sidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} activeItem="setup" />

      <main className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-[#E6E6E4] bg-white px-4 py-3 lg:hidden">
          <button type="button" onClick={() => setIsMobileSidebarOpen(true)} aria-label="Open navigation">
            <Menu className="size-4" />
          </button>
          <span className="text-[13px] font-semibold">Project</span>
          <div className="size-8" />
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
          <div className="flex flex-col gap-2">
            {isEditingName ? (
              <input
                autoFocus
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && draftName.trim() && workspaceId) {
                    rename.mutate({ workspaceId, name: draftName.trim() });
                    setIsEditingName(false);
                  }
                  if (e.key === 'Escape') setIsEditingName(false);
                }}
                className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-[26px] font-semibold outline-none focus:border-[#94A3B8]"
              />
            ) : (
              <h1
                onClick={() => {
                  setDraftName(workspace?.name ?? '');
                  setIsEditingName(true);
                }}
                title="Click to rename"
                className="cursor-text text-[28px] font-semibold tracking-tight"
              >
                {workspace?.name || 'Your project'}
              </h1>
            )}
            <p className="text-[14px] text-[#717378]">
              {workspace?.goal_text || 'No goal set yet.'}
            </p>
          </div>

          <section className="flex flex-col gap-4 rounded-2xl border border-[#E6E6E4] bg-white p-5">
            <h2 className="text-[15px] font-medium">Business</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Business name" value={business?.name} />
              <Field label="What you do" value={business?.category} />
              <Field label="Customer type" value={business?.customer_type} />
              <Field label="CRM" value={business?.crm_provider || 'No CRM'} />
              <Field label="Calling language" value={workspace?.language} />
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-[#E6E6E4] bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-medium">Business data</h2>
              <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#E6E6E4] px-3 py-1.5 text-[12.5px] hover:bg-gray-50">
                {isUploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                <span>Upload</span>
                <input type="file" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
              </label>
            </div>

            {ingestion.documents.length === 0 ? (
              <p className="text-[13px] text-[#717378]">No documents yet.</p>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {ingestion.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between text-[13px] py-1 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex size-6 shrink-0 items-center justify-center">
                        {getFileFormatIcon(doc.filename, 'size-5 object-contain')}
                      </div>
                      <span className="truncate text-[#2C2E31] font-medium">{doc.filename}</span>
                    </div>
                    <span
                      className={
                        doc.status === 'PROCESSED'
                          ? 'text-[#047857]'
                          : doc.status === 'FAILED'
                            ? 'text-red-600'
                            : 'text-[#717378]'
                      }
                    >
                      {doc.status === 'PROCESSED' ? <Check className="size-3.5" /> : doc.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {ingestion.failed.length > 0 && (
              <button
                type="button"
                onClick={() => ingestion.retryAll.mutate()}
                className="self-start rounded-full border border-[#E6E6E4] px-3 py-1.5 text-[12.5px] hover:bg-gray-50"
              >
                Retry {ingestion.failed.length} failed
              </button>
            )}

            <BusinessAnalysisCard
              analysis={analysis}
              isAnalysing={isAnalysing}
              processedCount={ingestion.processed.length}
              totalCount={ingestion.documents.length}
            />
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-[#E6E6E4] bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-medium">Leads</h2>
              <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#E6E6E4] px-3 py-1.5 text-[12.5px] hover:bg-gray-50">
                {isImportingLeads ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                <span>Import CSV</span>
                <input type="file" accept=".csv" multiple className="hidden" onChange={(e) => handleLeadCsv(e.target.files)} />
              </label>
            </div>
            <p className="text-[13px] text-[#717378]">
              {leads.length
                ? `${leads.length} lead${leads.length === 1 ? '' : 's'} in this project.`
                : 'No leads yet. Import a CSV to get started.'}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProjectSettings;
