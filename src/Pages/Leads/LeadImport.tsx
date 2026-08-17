import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSpreadsheet, Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { leadImportApi, type LeadImportCommit, type LeadImportPreview } from '../../api/leads/leadImportApi';

const LeadImport = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [preview, setPreview] = useState<LeadImportPreview | null>(null);
  const [result, setResult] = useState<LeadImportCommit | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  const upload = async () => {
    if (!file) return toast.error('Choose a lead file first');
    setIsWorking(true);
    setResult(null);
    try {
      const uploadResult = await leadImportApi.upload(file);
      const id = uploadResult.job_id || uploadResult.id;
      if (!id) throw new Error('Lead import did not return a job ID');
      setJobId(id);
      const previewResult = await leadImportApi.preview(id);
      setPreview(previewResult);
      toast.success('Lead file is ready for review');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Lead import failed');
    } finally {
      setIsWorking(false);
    }
  };

  const commit = async () => {
    if (!jobId) return;
    setIsWorking(true);
    try {
      const commitResult = await leadImportApi.commit(jobId);
      setResult(commitResult);
      setPreview(null);
      toast.success(commitResult.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not commit leads');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <button type="button" onClick={() => navigate('/onboarding/final')} className="text-sm text-slate-500 hover:text-black">← Back to setup</button>
        <h1 className="text-3xl font-bold text-slate-950 mt-6">Import leads</h1>
        <p className="text-sm text-slate-500 mt-2">Upload a CSV, Excel, PDF, DOCX, text, or supported image. Follei will validate and deduplicate it before anything is committed.</p>

        <div className="bg-white border border-slate-200 rounded-xl p-6 mt-7 shadow-sm">
          <label className="border-2 border-dashed border-slate-200 rounded-xl min-h-48 flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition-colors">
            <input
              type="file"
              className="hidden"
              accept=".csv,.xlsx,.xls,.pdf,.docx,.txt,.png,.jpg,.jpeg"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setPreview(null);
                setResult(null);
              }}
            />
            {file ? <FileSpreadsheet className="w-9 h-9 text-emerald-600" /> : <Upload className="w-9 h-9 text-slate-400" />}
            <span className="mt-3 text-sm font-semibold text-slate-800">{file?.name || 'Choose lead file'}</span>
            <span className="text-xs text-slate-400 mt-1">The file is not committed until you confirm the preview.</span>
          </label>

          {!preview && !result && (
            <button type="button" onClick={upload} disabled={!file || isWorking} className="w-full mt-5 py-3 bg-black text-white rounded-lg text-sm font-semibold disabled:opacity-40 flex items-center justify-center gap-2">
              {isWorking && <Loader2 className="w-4 h-4 animate-spin" />}
              Analyze file
            </button>
          )}

          {preview && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Review summary</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {[
                  ['Total', preview.total_rows],
                  ['New', preview.new_rows.length],
                  ['Updates', preview.update_rows.length],
                  ['Duplicates', preview.duplicate_rows.length],
                  ['Conflicts', preview.conflict_rows.length],
                  ['Invalid', preview.invalid_rows.length],
                ].map(([label, count]) => (
                  <div key={String(label)} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                    <div className="text-xs text-slate-500">{label}</div>
                    <div className="text-xl font-bold mt-1">{count}</div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={commit} disabled={isWorking} className="w-full mt-5 py-3 bg-black text-white rounded-lg text-sm font-semibold disabled:opacity-40 flex items-center justify-center gap-2">
                {isWorking && <Loader2 className="w-4 h-4 animate-spin" />}
                Commit selected leads
              </button>
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-100 p-5">
              <h2 className="font-semibold text-emerald-900">Import complete</h2>
              <p className="text-sm text-emerald-800 mt-1">{result.message}</p>
              <button type="button" onClick={() => navigate('/onboarding/final')} className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm">Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadImport;
