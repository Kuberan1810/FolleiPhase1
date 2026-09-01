import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  Trash2,
  X,
  LogOut,
  SlidersHorizontal,
  User,
  HelpCircle,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { UserProfile } from '../Pages/DashboardSetup/types';
import { getStoredUser, clearSession } from '../lib/auth';
import { getActiveWorkspaceId, setActiveWorkspaceId } from '../hooks/useWorkspace';
import { useProjects } from '../hooks/useProjects';
import ConfirmDialog from './ConfirmDialog';
import { resetSetupMemoryStore } from '../Pages/DashboardSetup/data/setupMemoryStore';

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
  isOpen = false,
  onClose,
  onNewProject,
  onAskFollei,
  onOpenSettings,
  activeItem = 'home',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const storedUser = getStoredUser();

  const {
    projects: workspaces,
    isLoading: isWorkspacesLoading,
    create: createProject,
    rename: renameProject,
    remove: removeProject,
  } = useProjects();

  // Inline rename: click/double-click the name, type, Enter to save.
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

  const currentPath = location.pathname;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const getActiveNav = () => {
    if (activeItem) return activeItem;
    if (currentPath === '/dashboard-setup' || currentPath === '/project' || currentPath === '/projects') return 'setup';
    if (currentPath === '/dashboard' || currentPath === '/main-dashboard') return 'dashboard';
    if (currentPath.startsWith('/lead')) return 'leads';
    if (currentPath.startsWith('/meet')) return 'meetings';
    if (currentPath.startsWith('/campaign')) return 'campaigns';
    if (currentPath === '/home' || currentPath === '/') return 'home';
    return 'home';
  };

  const activeNav = getActiveNav();

  const navTo = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const isProjectExpanded = (projectId: string, index: number) => {
    if (expandedProjects[projectId] !== undefined) {
      return expandedProjects[projectId];
    }
    const activeId = getActiveWorkspaceId();
    if (activeId) {
      return projectId === activeId;
    }
    return index === 0;
  };

  const toggleProjectExpanded = (projectId: string, index: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !isProjectExpanded(projectId, index),
    }));
  };

  const handleNewProject = () => {
    resetSetupMemoryStore();
    if (onNewProject) {
      onNewProject();
      return;
    }
    createProject.mutate(undefined, {
      onSuccess: (workspace) => {
        setActiveWorkspaceId(workspace.id);
        navTo('/dashboard-setup');
      },
      onError: () => {
        navTo('/dashboard-setup');
      },
    });
  };

  const handleConfirmLogout = () => {
    clearSession();
    setIsLogoutModalOpen(false);
    setIsUserMenuOpen(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const hasProjects = workspaces && workspaces.length > 0;

  const content = (
    <div className="flex h-full w-60 flex-col justify-between border-r border-[#EBEBE8] bg-[#F9F9F7] px-3.5 py-4 font-sans select-none relative">
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
                {isWorkspacesLoading ? (
                  <div className="flex flex-col gap-2 py-1.5 animate-pulse" aria-label="Loading workspaces">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <div className="size-3 rounded-full bg-[#E5E7EB]" />
                      <div className="h-3.5 w-28 rounded-md bg-[#E5E7EB]" />
                    </div>
                    <div className="flex flex-col gap-2 pl-5">
                      <div className="h-3 w-20 rounded bg-[#F1F3F5]" />
                      <div className="h-3 w-24 rounded bg-[#F1F3F5]" />
                      <div className="h-3 w-16 rounded bg-[#F1F3F5]" />
                    </div>
                  </div>
                ) : hasProjects ? (
                  workspaces.map((project, index) => {
                    const isExpanded = isProjectExpanded(project.id, index);
                    const isProjectActive = getActiveWorkspaceId() === project.id || workspaces.length === 1;

                    return (
                      <div key={project.id} className="flex flex-col">
                        {renamingId === project.id ? (
                          <input
                            autoFocus
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                            onBlur={() => setRenamingId(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && draftName.trim()) {
                                renameProject.mutate({ workspaceId: project.id, name: draftName.trim() });
                                setRenamingId(null);
                              }
                              if (e.key === 'Escape') setRenamingId(null);
                            }}
                            className="mx-2 my-1 rounded-md border border-[#D1D5DB] px-2 py-1 text-[13px] text-[#16171A] outline-none focus:border-[#94A3B8]"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveWorkspaceId(project.id);
                              toggleProjectExpanded(project.id, index);
                              navTo('/home');
                            }}
                            onDoubleClick={() => {
                              setDraftName(project.name);
                              setRenamingId(project.id);
                            }}
                            title="Double-click to rename"
                            className="group flex flex-1 items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-black/5 rounded-lg transition-colors cursor-pointer w-full text-left"
                          >
                            {isExpanded ? (
                              <ChevronDown className="size-3 text-[#717378] shrink-0" />
                            ) : (
                              <ChevronRight className="size-3 text-[#717378] shrink-0" />
                            )}
                            <span className="flex-1 truncate text-left capitalize">
                              {project.name || 'Untitled project'}
                            </span>
                            <span
                              role="button"
                              tabIndex={0}
                              aria-label="Delete project"
                              title="Delete project"
                              onClick={(event) => {
                                event.stopPropagation();
                                setProjectToDelete({ id: project.id, name: project.name || 'Untitled project' });
                              }}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.stopPropagation();
                                  event.currentTarget.click();
                                }
                              }}
                              className="opacity-0 transition-opacity group-hover:opacity-100 p-0.5"
                            >
                              <Trash2 className="size-3.5 text-[#717378] hover:text-red-600" />
                            </span>
                          </button>
                        )}

                        {isExpanded && (
                          <div className="flex flex-col gap-0.5 pl-5 pr-1 py-0.5">
                           

                            {/* Dashboard */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveWorkspaceId(project.id);
                                navTo('/dashboard');
                              }}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                                (activeNav === 'dashboard' || currentPath === '/dashboard' || currentPath === '/main-dashboard') && isProjectActive
                                  ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                                  : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                              }`}
                            >
                              <LayoutDashboard className={`size-3.5 ${(activeNav === 'dashboard' || currentPath === '/dashboard' || currentPath === '/main-dashboard') && isProjectActive ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                              <span>Dashboard</span>
                            </button>

                            {/* Leads */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveWorkspaceId(project.id);
                                navTo('/leads');
                              }}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                                (activeNav === 'leads' || currentPath.startsWith('/lead')) && isProjectActive
                                  ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                                  : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                              }`}
                            >
                              <Users className={`size-3.5 ${(activeNav === 'leads' || currentPath.startsWith('/lead')) && isProjectActive ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                              <span>Leads</span>
                            </button>

                            {/* Meetings */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveWorkspaceId(project.id);
                                navTo('/meeting');
                              }}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                                (activeNav === 'meetings' || currentPath.startsWith('/meet')) && isProjectActive
                                  ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                                  : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                              }`}
                            >
                              <Calendar className={`size-3.5 ${(activeNav === 'meetings' || currentPath.startsWith('/meet')) && isProjectActive ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                              <span>Meetings</span>
                            </button>

                            {/* Campaigns */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveWorkspaceId(project.id);
                                navTo('/campaigns');
                              }}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                                (activeNav === 'campaigns' || currentPath.startsWith('/campaign')) && isProjectActive
                                  ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                                  : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                              }`}
                            >
                              <Megaphone className={`size-3.5 ${(activeNav === 'campaigns' || currentPath.startsWith('/campaign')) && isProjectActive ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                              <span>Campaigns</span>
                            </button>

                            {/* Setup */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveWorkspaceId(project.id);
                                navTo('/dashboard-setup');
                              }}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${(activeNav === 'setup' || currentPath === '/dashboard-setup' || currentPath.startsWith('/project')) && isProjectActive
                                  ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                                  : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                                }`}
                            >
                              <Settings className={`size-3.5 ${(activeNav === 'setup' || currentPath === '/dashboard-setup' || currentPath.startsWith('/project')) && isProjectActive ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                              <span>Setup</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="px-2 py-1.5 text-[13px] text-[#9CA3AF] font-normal select-none">
                    No project
                  </div>
                )}

                {/* + New Project Action */}
                <button
                  type="button"
                  onClick={handleNewProject}
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
            className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
              activeNav === 'ask-follei'
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
      <div className="flex flex-col gap-2 relative" ref={userMenuRef}>
        {/* User Popover / Dropdown Menu */}
        {isUserMenuOpen && (
          <div className="absolute bottom-[calc(100%+8px)] left-0 w-full rounded-2xl border border-[#EBEBE8] bg-white p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 font-sans">
            {/* Top User Row */}
            <div
              onClick={() => {
                setIsUserMenuOpen(false);
                onOpenSettings?.();
              }}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-[#F4F4F0] transition-colors cursor-pointer"
            >
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
              <ChevronRight className="size-3.5 text-[#717378] shrink-0" />
            </div>

            <div className="border-t border-[#EBEBE8] my-1" />

            {/* Menu Items */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                toast('Pro plans coming soon!', { icon: '✨' });
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
            >
              <Sparkles className="size-4 text-[#717378]" />
              <span>Upgrade plan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                toast('Personalization settings coming soon', { icon: '⚙️' });
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="size-4 text-[#717378]" />
              <span>Personalization</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                if (onOpenSettings) onOpenSettings();
                else navTo('/project');
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
            >
              <User className="size-4 text-[#717378]" />
              <span>Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                if (onOpenSettings) onOpenSettings();
                else navTo('/project');
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
            >
              <Settings className="size-4 text-[#717378]" />
              <span>Settings</span>
            </button>

            <div className="border-t border-[#EBEBE8] my-1" />

            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                toast('Need help? Contact support@follei.com', { icon: '💡' });
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
            >
              <HelpCircle className="size-4 text-[#717378]" />
              <span className="flex-1 text-left">Help</span>
              <ChevronRight className="size-3.5 text-[#717378]" />
            </button>

            {/* Logout Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#DC2626] hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="size-4 text-[#DC2626]" />
              <span>Log out</span>
            </button>
          </div>
        )}

        {/* Settings button */}
        {/* <button
          type="button"
          onClick={() => {
            onOpenSettings?.();
          }}
          className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
            activeNav === 'settings'
              ? 'bg-[#EFEFE9] text-[#16171A]'
              : 'text-[#16171A] hover:bg-black/5'
          }`}
        >
          <Settings className="size-4 text-[#717378]" />
          <span>Settings</span>
        </button> */}

        {/* User Card Pill (Click to toggle menu) */}
        <button
          type="button"
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
          className={`flex w-full items-center gap-3 rounded-2xl border p-2.5 transition-all cursor-pointer text-left ${
            isUserMenuOpen
              ? 'border-[#16171A]/20 bg-[#EFEFEA] shadow-xs'
              : 'border-[#EBEBE8] bg-[#F4F4F0]/60 hover:bg-[#EFEFEA]'
          }`}
        >
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
          <ChevronRight className={`size-3.5 text-[#717378] transition-transform duration-200 ${isUserMenuOpen ? '-rotate-90' : ''}`} />
        </button>
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

      {/* Logout Confirmation Modal rendered into document.body to stay above all elements */}
      {isLogoutModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-[360px] rounded-[24px] bg-white border border-[#EBEBE8] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-[18px] font-semibold text-[#16171A] tracking-tight mb-5">
                Are you sure you want to log out?
              </h3>

              {/* User Card Box */}
              <div className="w-full flex items-center gap-3 rounded-2xl border border-[#EBEBE8] bg-[#F9F9F7] p-3 mb-6 text-left">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E5E5DE] text-[13px] font-semibold text-[#16171A]">
                  {resolvedUser.initials || resolvedUser.name.charAt(0) || 'F'}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[13.5px] font-semibold text-[#16171A] leading-tight">
                    {resolvedUser.name}
                  </span>
                  <span className="truncate text-[12px] text-[#717378] leading-tight mt-0.5">
                    {resolvedUser.email}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="w-full rounded-full bg-[#16171A] hover:bg-black text-white font-medium py-3 text-[14px] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Log out
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="w-full rounded-full border border-[#EBEBE8] bg-[#F4F4F0] hover:bg-[#EAEAE5] text-[#16171A] font-medium py-3 text-[14px] transition-all cursor-pointer active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Custom Delete Confirmation Modal */}
      {createPortal(
        <ConfirmDialog
          isOpen={Boolean(projectToDelete)}
          onClose={() => setProjectToDelete(null)}
          onConfirm={() => {
            if (projectToDelete) {
              removeProject.mutate(projectToDelete.id, {
                onSuccess: () => {
                  navigate('/dashboard-setup');
                },
              });
              setProjectToDelete(null);
            }
          }}
          title="Delete project?"
          itemName={projectToDelete?.name || 'this project'}
          description="All goals, requirements, documents, and sales packages in this project will be permanently removed."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          isLoading={removeProject.isPending}
        />,
        document.body
      )}
    </>
  );
};

export default Sidebar;
