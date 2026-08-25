import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import CallLab from '../Dashboard/CallLab';
import { folleiApi, type Lead, type Workspace } from '../../api/follei';

/**
 * Standalone Call Lab page.
 *
 * CallLab itself takes an already-resolved workspace and lead list, so this
 * wrapper owns the loading: business -> workspace -> leads. Call Lab needs a
 * workspace whose sales package has been verified, which is why the "not ready"
 * state below explains that rather than just rendering an empty panel.
 */
export const CallLabPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const businesses = await folleiApi.listBusinesses();
        if (!businesses.length) {
          setError('Finish your business profile before using Call Lab.');
          return;
        }
        const workspaces = await folleiApi.listWorkspaces(businesses[0].id);
        const active = workspaces[0] || null;
        if (!active) {
          setError('Create a project before using Call Lab.');
          return;
        }
        setWorkspace(active);
        // Leads are optional — Call Lab falls back to a practice lead.
        try {
          setLeads(await folleiApi.listLeads(active.id));
        } catch {
          setLeads([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load Call Lab.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#16171A] antialiased">
      <Sidebar
        activeItem="call-lab"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#FDFDFC]">
        <div className="flex items-center gap-3 px-4 sm:px-8 pt-6 lg:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="rounded-lg border border-black/10 p-2"
          >
            <Menu size={18} />
          </button>
        </div>

        <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 w-full font-['Manrope']">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Call Lab</h1>
            <p className="text-sm text-black/60 mt-1">
              Practise a live call with Follei using this project's approved sales package.
            </p>
          </header>

          {loading && <p className="text-sm text-black/60">Loading…</p>}
          {!loading && error && (
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <p className="text-sm text-black/70">{error}</p>
            </div>
          )}
          {!loading && !error && workspace && workspace.stage !== 'VERIFIED' && (
            <div className="rounded-xl border border-black/10 bg-white p-6">
              <p className="text-sm text-black/70">
                Call Lab opens once this project's sales package is verified. Current stage:{' '}
                <span className="font-medium">{workspace.stage}</span>.
              </p>
            </div>
          )}
          {!loading && !error && workspace && workspace.stage === 'VERIFIED' && (
            <CallLab workspace={workspace} leads={leads} />
          )}
        </div>
      </main>
    </div>
  );
};

export default CallLabPage;
