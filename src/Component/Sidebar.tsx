import React, { useState } from 'react';
import {
  Home,
  ChevronDown,
  ChevronRight,
  Plus,
  Sparkles,
  Settings,
  Folder,
  LayoutDashboard,
  Users,
  Calendar,
  Megaphone,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserProfile } from '../Pages/DashboardSetup/types';
import { getStoredUser } from '../lib/auth';
import { setActiveWorkspaceId } from '../hooks/useWorkspace';
import { useProjects } from '../hooks/useProjects';

interface SidebarProps {
  user?: UserProfile;
  projects?: string[];
  isOpen?: boolean;
  onClose?: () => void;
  onNewProject?: () => void;
  onAskFollei?: () => void;
  onOpenSettings?: () => void;
  activeItem?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  projects,
  isOpen = false,
  onClose,
  onNewProject,
  onAskFollei,
  onOpenSettings,
  activeItem,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isProject1Open, setIsProject1Open] = useState(true);
  const storedUser = getStoredUser();
  const { projects: workspaces, create: createProject, rename: renameProject } = useProjects();
  // Inline rename, ChatGPT style: click the name, type, Enter to save.
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const resolvedUser: UserProfile = user ?? {
    name: storedUser?.full_name || storedUser?.email || 'Follei user',
    email: storedUser?.email || 'Free plan',
    initials: (storedUser?.full_name || storedUser?.email || 'F')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase(),
  };

  // Real workspaces so each row carries its id -- needed to rename it and to
  // switch the active project. `projects` (names only) stays supported for
  // callers that still pass it.
  const projectRows = workspaces.length
    ? workspaces
    : (projects ?? []).map((name, index) => ({ id: `local-${index}`, name }) as { id: string; name: string });

  const currentPath = location.pathname;

  
  const getActiveNav = () => {
    if (activeItem) return activeItem;
    if (currentPath === '/dashboard' || currentPath === '/main-dashboard') return 'dashboard';
    if (currentPath.startsWith('/lead')) return 'leads';
    if (currentPath.startsWith('/meet')) return 'meetings';
    if (currentPath.startsWith('/campaign')) return 'campaigns';
    if (currentPath === '/home' || currentPath === '/dashboard-setup' || currentPath === '/') return 'home';
    return 'home';
  };


  const activeNav = getActiveNav();

  const navTo = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const content = (
    <div className="flex h-full w-60 flex-col justify-between border-r border-[#EBEBE8] bg-[#F9F9F7] px-3.5 py-4 font-sans select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col gap-4">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between px-2 pt-1 pb-1">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navTo('/home')}>
            <div className="flex size-7 items-center justify-center rounded-full bg-[#16171A] text-white font-bold text-[13px] tracking-wider shadow-xs">
              F
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-[#16171A]">
              Follei
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden flex size-7 items-center justify-center rounded-lg text-[#717378] hover:bg-black/5 hover:text-gray-900"
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1">
          {/* Home Link */}
          <button
            type="button"

            onClick={() => navTo('/home')}
            className={`flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13.5px] transition-colors cursor-pointer ${
              activeNav === 'home'

                ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                : 'text-[#5C5E62] hover:bg-black/5 hover:text-[#16171A] font-normal'
            }`}
          >
            <Home className={`size-4 ${activeNav === 'home' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
            <span>Home</span>
          </button>

          {/* Projects Section */}
          <div className="flex flex-col gap-0.5 pt-1">
            <button
              type="button"
              onClick={() => setIsProjectsOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 text-[13.5px] font-medium text-[#16171A] hover:bg-black/5 rounded-xl transition-colors cursor-pointer text-left"
            >
              <Folder className="size-4 text-[#717378]" />
              <span>Projects</span>
            </button>

            {isProjectsOpen && (
              <div className="flex flex-col gap-0.5 pl-4 pr-1 mt-0.5">
                {/* Project 1 Collapsible */}
                <div className="flex flex-col">
                  {renamingId === (projectRows[0]?.id ?? '') ? (
                    <input
                      autoFocus
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      onBlur={() => setRenamingId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && draftName.trim() && projectRows[0]) {
                          renameProject.mutate({ workspaceId: projectRows[0].id, name: draftName.trim() });
                          setRenamingId(null);
                        }
                        if (e.key === 'Escape') setRenamingId(null);
                      }}
                      className="mx-2 my-1 rounded-md border border-[#D1D5DB] px-2 py-1 text-[13px] text-[#16171A] outline-none focus:border-[#94A3B8]"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsProject1Open((prev) => !prev)}
                      onDoubleClick={() => {
                        if (!projectRows[0] || projectRows[0].id.startsWith('local-')) return;
                        setDraftName(projectRows[0].name);
                        setRenamingId(projectRows[0].id);
                      }}
                      title="Double-click to rename"
                      className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
                    >
                      {isProject1Open ? (
                        <ChevronDown className="size-3 text-[#717378]" />
                      ) : (
                        <ChevronRight className="size-3 text-[#717378]" />
                      )}
                      <span>{projectRows[0]?.name || 'New project'}</span>
                    </button>
                  )}

                  {isProject1Open && (
                    <div className="flex flex-col gap-0.5 pl-5 pr-1 py-0.5">
                      <button
                        type="button"
                        onClick={() => navTo('/project')}
                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          currentPath.startsWith('/project')
                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                        }`}
                      >
                        <Settings className={`size-3.5 ${currentPath.startsWith('/project') ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Setup</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navTo('/dashboard')}

                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          activeNav === 'dashboard'

                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                          }`}
                      >
                        <LayoutDashboard className={`size-3.5 ${activeNav === 'dashboard' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Dashboard</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navTo('/leads')}

                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          activeNav === 'leads'

                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                          }`}
                      >
                        <Users className={`size-3.5 ${activeNav === 'leads' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Leads</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navTo('/meeting')}

                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          activeNav === 'meetings'

                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                          }`}
                      >
                        <Calendar className={`size-3.5 ${activeNav === 'meetings' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Meetings</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navTo('/campaigns')}
                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          activeNav === 'campaigns'
                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                        }`}
                      >
                        <Megaphone className={`size-3.5 ${activeNav === 'campaigns' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Campaigns</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* + New Project Action */}
                <button
                  type="button"
                  onClick={() => {
                    if (onNewProject) {
                      onNewProject();
                      return;
                    }
                    // Create the workspace, make it active, and start it at
                    // onboarding -- a new project has no business data, leads or
                    // goal yet, so dropping the user on /home would skip the
                    // steps that produce them.
                    createProject.mutate(undefined, {
                      onSuccess: (workspace) => {
                        setActiveWorkspaceId(workspace.id);
                        navTo('/dashboard-setup');
                      },
                    });
                  }}
                  disabled={createProject.isPending}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-normal text-[#717378] transition-colors hover:text-[#16171A] cursor-pointer mt-0.5"
                >
                  <Plus className="size-3.5 text-[#717378]" />
                  <span>New Project</span>
                </button>
              </div>
            )}
          </div>

          {/* Divider line */}
          <div className="border-t border-[#EBEBE8] my-1.5" />

          {/* Ask Follei Action */}
          <button
            type="button"
            onClick={() => {
              onAskFollei?.();
            }}

            className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${activeNav === 'ask-follei'

                ? 'bg-[#EFEFE9] text-[#16171A]'
                : 'text-[#16171A] hover:bg-black/5'
              }`}
          >
            <Sparkles className="size-4 text-[#717378]" />
            <span>Ask Follei</span>
          </button>
        </div>
      </div>

      {/* Bottom Settings & User Profile */}
      <div className="flex flex-col gap-2">
        {/* Settings button */}
        <button
          type="button"
          onClick={() => {
            onOpenSettings?.();
          }}

          className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${activeNav === 'settings'

              ? 'bg-[#EFEFE9] text-[#16171A]'
              : 'text-[#16171A] hover:bg-black/5'
            }`}
        >
          <Settings className="size-4 text-[#717378]" />
          <span>Settings</span>
        </button>

        {/* User Card Pill */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#EBEBE8] bg-[#F4F4F0]/60 p-2.5 hover:bg-[#EFEFEA] transition-colors cursor-pointer">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#E5E5DE] text-[12px] font-semibold text-[#16171A]">
            {resolvedUser.initials || resolvedUser.name.charAt(0) || 'F'}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-semibold text-[#16171A] leading-tight">
              {resolvedUser.name}
            </span>
            <span className="truncate text-[11px] text-[#717378] leading-tight mt-0.5">
              {resolvedUser.email === 'Free plan' ? 'Free plan' : (resolvedUser.email || 'Free plan')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen shrink-0 sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative z-10 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
