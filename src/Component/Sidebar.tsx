import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Add,
  Folder2,
  Home2,
  SearchNormal1,
  Notification,
  ArrowRight2,
  ArrowDown2,
  Profile,
  Setting2,
  Magicpen,
  Diagram,
  Profile2User,
  DirectSend,
  Trash,
  Logout,
  Category,
  LampCharge,
} from 'iconsax-react';
import { X, PanelLeft } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getStoredUser, clearSession } from '../lib/auth';
import { useProjects } from '../hooks/useProjects';
import { coirei } from '../api/coirei';
import ConfirmDialog from './ConfirmDialog';
import SearchModal from './SearchModal';
import ciLogo from '../assets/logo/CiLogo.png';

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  avatar?: string;
}

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
  activeItem,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('follei.sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const userMenuRef = useRef<HTMLDivElement>(null);
  const storedUser = getStoredUser();

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('follei.sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const { projectId } = useParams();
  const {
    projects: workspaces,
    isLoading: isWorkspacesLoading,
    rename: renameProject,
    remove: removeProject,
  } = useProjects();
  const getActiveWorkspaceId = () => projectId ?? null;
  const setActiveWorkspaceId = (_id: string) => {};

  // Inline rename: click/double-click the name, type, Enter to save.
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');

  const resolvedUser: UserProfile = user ?? {
    name: storedUser?.full_name || storedUser?.email?.split('@')[0] || 'Follei User',
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

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isUserMenuOpen]);

  const getActiveNav = () => {
    if (activeItem) return activeItem;
    const tail = currentPath.replace(/^\/p\/[^/]+\/?/, '');
    if (tail.startsWith('competitors')) return 'competitors';
    if (tail.startsWith('leads')) return 'leads';
    if (tail.startsWith('campaigns')) return 'campaigns';
    if (tail.startsWith('outreach')) return 'outreach';
    if (currentPath === '/' || currentPath === '/home') return 'home';
    return 'home';
  };

  const activeNav = getActiveNav();

  const navTo = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const isProjectExpanded = (projId: string, index: number) => {
    if (expandedProjects[projId] !== undefined) {
      return expandedProjects[projId];
    }
    const activeId = getActiveWorkspaceId();
    if (activeId) {
      return projId === activeId;
    }
    return index === 0;
  };

  const toggleProjectExpanded = (projId: string, index: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projId]: !isProjectExpanded(projId, index),
    }));
  };

  const handleNewProject = () => {
    if (onNewProject) {
      onNewProject();
      return;
    }
    navTo('/');
  };

  const handleConfirmLogout = () => {
    void coirei.signOut().catch(() => undefined);
    clearSession();
    setIsLogoutModalOpen(false);
    setIsUserMenuOpen(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const projectsList = workspaces || [];

  const userMenuDropdown = isUserMenuOpen && (
    <div className="absolute bottom-[calc(100%+10px)] left-0 w-60 rounded-2xl border border-[#E5E0D6] bg-white p-1.5 shadow-2xl z-50 font-sans animate-in fade-in zoom-in-95 duration-150">
      {/* Top User Row */}
      <div
        onClick={() => {
          setIsUserMenuOpen(false);
          onOpenSettings?.();
        }}
        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-[#F5F3EF] cursor-pointer"
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#E5E0D6] text-[12px] font-semibold text-[#2C2622]">
          {resolvedUser.initials || resolvedUser.name.charAt(0) || 'F'}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[13px] font-semibold text-[#2C2622] leading-tight">
            {resolvedUser.name}
          </span>
          <span className="truncate text-[11px] text-[#7A736A] leading-tight mt-0.5">
            {resolvedUser.email === 'Free plan'
              ? 'Free plan'
              : resolvedUser.email || 'Free plan'}
          </span>
        </div>
        <ArrowRight2 size={14} color="#7A736A" />
      </div>

      <div className="border-t border-[#EFECE6] my-1" />

      {/* Menu Items */}
      <button
        type="button"
        onClick={() => {
          setIsUserMenuOpen(false);
          toast('Pro plans coming soon!', { icon: '✨' });
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#2C2622] hover:bg-[#F5F3EF] cursor-pointer"
      >
        <Magicpen size={17} color="#7A736A" />
        <span>Upgrade plan</span>
      </button>

      <button
        type="button"
        onClick={() => {
          setIsUserMenuOpen(false);
          toast('Personalization settings coming soon', { icon: '⚙️' });
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#2C2622] hover:bg-[#F5F3EF] cursor-pointer"
      >
        <Category size={17} color="#7A736A" />
        <span>Personalization</span>
      </button>

      <button
        type="button"
        onClick={() => {
          setIsUserMenuOpen(false);
          if (onOpenSettings) onOpenSettings();
          else toast('Settings live in your server .env file', { icon: '⚙️' });
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#2C2622] hover:bg-[#F5F3EF] cursor-pointer"
      >
        <Profile size={17} color="#7A736A" />
        <span>Profile</span>
      </button>

      <button
        type="button"
        onClick={() => {
          setIsUserMenuOpen(false);
          if (onOpenSettings) onOpenSettings();
          else toast('Settings live in your server .env file', { icon: '⚙️' });
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#2C2622] hover:bg-[#F5F3EF] cursor-pointer"
      >
        <Setting2 size={17} color="#7A736A" />
        <span>Settings</span>
      </button>

      <div className="border-t border-[#EFECE6] my-1" />

      <button
        type="button"
        onClick={() => {
          setIsUserMenuOpen(false);
          toast('Need help? Contact support@follei.com', { icon: '💡' });
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#2C2622] hover:bg-[#F5F3EF] cursor-pointer"
      >
        <LampCharge size={17} color="#7A736A" />
        <span className="flex-1 text-left">Help</span>
        <ArrowRight2 size={14} color="#7A736A" />
      </button>

      {/* Logout Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsUserMenuOpen(false);
          setIsLogoutModalOpen(true);
        }}
        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-[13px] font-medium text-[#DC2626] hover:bg-red-50 cursor-pointer"
      >
        <Logout size={17} color="#DC2626" />
        <span>Log out</span>
      </button>
    </div>
  );

  // Full Expanded Sidebar Content
  const expandedContent = (
    <div className="flex h-full w-64 flex-col justify-between border-r border-[#EAE6DF] bg-[#F5F3EF] px-3.5 py-4 font-sans select-none relative text-[#2C2622] transition-all duration-200">
      {/* Top Header & Navigation Area */}
      <div className="flex flex-col gap-3">
        {/* Top Header Row with CiLogo and Action Icons */}
        <div className="flex items-center justify-between px-1.5 pt-0.5 pb-1">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
            onClick={() => navTo('/')}
          >
            <img src={ciLogo} alt="Ci Logo" className="size-6.5 object-contain" />
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex size-7.5 items-center justify-center rounded-lg text-[#5A544D] hover:bg-[#EAE5DE] hover:text-[#1F1E1D] transition-colors cursor-pointer"
              title="Search (Ctrl+K)"
              aria-label="Search"
            >
              <SearchNormal1 size={17} color="#5A544D" />
            </button>

            <button
              type="button"
              onClick={toggleCollapse}
              className="flex size-7.5 items-center justify-center rounded-lg text-[#5A544D] hover:bg-[#EAE5DE] hover:text-[#1F1E1D] transition-colors cursor-pointer"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeft className="size-4.5 text-[#5A544D]" strokeWidth={1.75} />
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden flex size-7.5 items-center justify-center rounded-lg text-[#5A544D] hover:bg-[#EAE5DE] hover:text-[#1F1E1D] transition-colors cursor-pointer ml-1"
                aria-label="Close sidebar"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="flex flex-col gap-0.5 mt-1">
          {/* Ask Follei / AI Assistant (Commented Out) */}
          {/* <button
            type="button"
            onClick={() => {
              onAskFollei?.();
              navTo('/');
            }}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] font-normal cursor-pointer transition-colors ${
              activeNav === 'ask-follei'
                ? 'bg-[#EAE5DE] text-[#1F1E1D] font-medium'
                : 'text-[#4A453F] hover:bg-[#ECE6DE]/70 hover:text-[#1F1E1D]'
            }`}
          >
            <Magicpen size={18} color="#5A544D" />
            <span>Ask Follei</span>
          </button> */}

          {/* Collapsible Projects Section Header */}
          <div className="flex flex-col gap-0.5 mt-1">
            <button
              type="button"
              onClick={() => setIsProjectsOpen((prev) => !prev)}
              className="flex items-center justify-between px-3 py-2 text-[13.5px] font-normal text-[#4A453F] hover:bg-[#ECE6DE]/70 hover:text-[#1F1E1D] rounded-xl cursor-pointer text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <Folder2 size={18} color="#5A544D" />
                <span>Projects</span>
              </div>
              <div className="text-[#7A736A] flex items-center justify-center">
                {isProjectsOpen ? (
                  <ArrowDown2 size={14} color="#7A736A" />
                ) : (
                  <ArrowRight2 size={14} color="#7A736A" />
                )}
              </div>
            </button>

            {/* Projects List Container */}
            {isProjectsOpen && (
              <div className="flex flex-col gap-0.5 pl-3 pr-1 mt-0.5">
                {isWorkspacesLoading ? (
                  <div className="flex flex-col gap-2 py-1.5" aria-label="Loading workspaces">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <div className="size-3 rounded-full bg-[#E5E0D8]" />
                      <div className="h-3.5 w-28 rounded-md bg-[#E5E0D8]" />
                    </div>
                    <div className="flex flex-col gap-2 pl-5">
                      <div className="h-3 w-20 rounded bg-[#EBE6DE]" />
                      <div className="h-3 w-24 rounded bg-[#EBE6DE]" />
                    </div>
                  </div>
                ) : projectsList.length > 0 ? (
                  projectsList.map((project, index) => {
                    const isExpanded = isProjectExpanded(project.id, index);
                    const isProjectActive =
                      getActiveWorkspaceId() === project.id || workspaces?.length === 1;

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
                                renameProject.mutate({
                                  workspaceId: project.id,
                                  name: draftName.trim(),
                                });
                                setRenamingId(null);
                              }
                              if (e.key === 'Escape') setRenamingId(null);
                            }}
                            className="mx-2 my-1 rounded-lg border border-[#D0C9BF] bg-white px-2 py-1 text-[13px] text-[#2C2622] outline-none focus:border-[#2C2622]"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveWorkspaceId(project.id);
                              toggleProjectExpanded(project.id, index);
                              navTo('/p/' + project.id);
                            }}
                            onDoubleClick={() => {
                              setDraftName(project.name);
                              setRenamingId(project.id);
                            }}
                            title="Double-click to rename"
                            className={`group flex flex-1 items-center gap-2 px-2.5 py-1.5 text-[13px] font-medium rounded-xl cursor-pointer w-full text-left transition-colors ${
                              isProjectActive
                                ? 'text-[#1F1E1D] font-semibold'
                                : 'text-[#4A453F] hover:bg-[#ECE6DE]/70 hover:text-[#1F1E1D]'
                            }`}
                          >
                            <div className="shrink-0 flex items-center justify-center">
                              {isExpanded ? (
                                <ArrowDown2 size={13} color="#7A736A" />
                              ) : (
                                <ArrowRight2 size={13} color="#7A736A" />
                              )}
                            </div>
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
                                setProjectToDelete({
                                  id: project.id,
                                  name: project.name || 'Untitled project',
                                });
                              }}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  event.stopPropagation();
                                  event.currentTarget.click();
                                }
                              }}
                              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-black/5"
                            >
                              <Trash size={14} color="#7A736A" />
                            </span>
                          </button>
                        )}

                        {/* Project Sub-Navigation Items */}
                        {isExpanded && (
                          <div className="flex flex-col gap-0.5 pl-4.5 pr-1 py-0.5 mt-0.5 border-l border-[#E5E0D6] ml-3.5">
                            {/* Home */}
                            <button
                              type="button"
                              onClick={() => navTo('/p/' + project.id)}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg cursor-pointer transition-colors ${
                                activeNav === 'home' && isProjectActive
                                  ? 'bg-[#EAE5DE] font-medium text-[#1F1E1D]'
                                  : 'text-[#5A544D] hover:text-[#1F1E1D] hover:bg-[#ECE6DE]/70 font-normal'
                              }`}
                            >
                              <Home2
                                size={15}
                                color={activeNav === 'home' && isProjectActive ? '#1F1E1D' : '#7A736A'}
                              />
                              <span>Home</span>
                            </button>

                            {/* Competitors */}
                            <button
                              type="button"
                              onClick={() => navTo('/p/' + project.id + '/competitors')}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg cursor-pointer transition-colors ${
                                activeNav === 'competitors' && isProjectActive
                                  ? 'bg-[#EAE5DE] font-medium text-[#1F1E1D]'
                                  : 'text-[#5A544D] hover:text-[#1F1E1D] hover:bg-[#ECE6DE]/70 font-normal'
                              }`}
                            >
                              <Diagram
                                size={15}
                                color={activeNav === 'competitors' && isProjectActive ? '#1F1E1D' : '#7A736A'}
                              />
                              <span>Competitors</span>
                            </button>

                            {/* Leads */}
                            <button
                              type="button"
                              onClick={() => navTo('/p/' + project.id + '/leads')}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg cursor-pointer transition-colors ${
                                activeNav === 'leads' && isProjectActive
                                  ? 'bg-[#EAE5DE] font-medium text-[#1F1E1D]'
                                  : 'text-[#5A544D] hover:text-[#1F1E1D] hover:bg-[#ECE6DE]/70 font-normal'
                              }`}
                            >
                              <Profile2User
                                size={15}
                                color={activeNav === 'leads' && isProjectActive ? '#1F1E1D' : '#7A736A'}
                              />
                              <span>Leads</span>
                            </button>

                            {/* Campaigns */}
                            <button
                              type="button"
                              onClick={() => navTo('/p/' + project.id + '/campaigns')}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg cursor-pointer transition-colors ${
                                activeNav === 'campaigns' && isProjectActive
                                  ? 'bg-[#EAE5DE] font-medium text-[#1F1E1D]'
                                  : 'text-[#5A544D] hover:text-[#1F1E1D] hover:bg-[#ECE6DE]/70 font-normal'
                              }`}
                            >
                              <DirectSend
                                size={15}
                                color={activeNav === 'campaigns' && isProjectActive ? '#1F1E1D' : '#7A736A'}
                              />
                              <span>Campaigns</span>
                            </button>

                            {/* Outreach */}
                            <button
                              type="button"
                              onClick={() => navTo('/p/' + project.id + '/outreach')}
                              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg cursor-pointer transition-colors ${
                                activeNav === 'outreach' && isProjectActive
                                  ? 'bg-[#EAE5DE] font-medium text-[#1F1E1D]'
                                  : 'text-[#5A544D] hover:text-[#1F1E1D] hover:bg-[#ECE6DE]/70 font-normal'
                              }`}
                            >
                              <DirectSend
                                size={15}
                                color={activeNav === 'outreach' && isProjectActive ? '#1F1E1D' : '#7A736A'}
                              />
                              <span>Outreach</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="px-2 py-1.5 text-[13px] text-[#9A9389] font-normal select-none">
                    No projects yet
                  </div>
                )}

                {/* + New Project Action Button */}
                <button
                  type="button"
                  onClick={handleNewProject}
                  className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-normal text-[#5A544D] hover:text-[#1F1E1D] hover:bg-[#ECE6DE]/70 rounded-xl cursor-pointer mt-0.5 transition-colors"
                >
                  <Add size={16} color="#7A736A" />
                  <span>New Project</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom User Profile & Actions Footer */}
      <div className="border-t border-[#EAE6DF] pt-3.5 mt-auto relative" ref={userMenuRef}>
        {userMenuDropdown}

        <div className="flex items-center gap-2">
          {/* User Card Pill */}
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className={`flex flex-1 items-center gap-2.5 rounded-full border p-1.5 pr-3.5 cursor-pointer text-left transition-all ${
              isUserMenuOpen
                ? 'border-[#2C2622]/40 bg-[#EAE5DE]'
                : 'border-[#E0DBD2] bg-transparent hover:bg-[#EAE5DE]/60'
            }`}
          >
            <div className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-[#DAD4C9] text-[12.5px] font-semibold text-[#2C2622] overflow-hidden">
              {resolvedUser.avatar ? (
                <img
                  src={resolvedUser.avatar}
                  alt={resolvedUser.name}
                  className="size-full object-cover"
                />
              ) : (
                resolvedUser.initials || resolvedUser.name.charAt(0) || 'F'
              )}
            </div>
            <span className="truncate text-[14px] font-medium text-[#2C2622] flex-1">
              {resolvedUser.name}
            </span>
          </button>

          {/* Notification Bell Button */}
          <button
            type="button"
            onClick={() => toast('No new notifications', { icon: '🔔' })}
            title="Notifications"
            aria-label="Notifications"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E0DBD2] bg-transparent hover:bg-[#EAE5DE]/60 active:bg-[#E2DDD3] text-[#2C2622] transition-colors cursor-pointer"
          >
            <Notification size={20} color="#2C2622" />
          </button>
        </div>
      </div>
    </div>
  );

  // Short Mini Rail (Collapsed) Sidebar Content (Matches Screenshot)
  const collapsedContent = (
    <div className="flex h-full w-[60px] flex-col justify-between items-center border-r border-[#EAE6DF] bg-[#F5F3EF] px-2 py-4 font-sans select-none relative text-[#2C2622] transition-all duration-200">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Top Logo / Expand button */}
        <button
          type="button"
          onClick={toggleCollapse}
          className="flex size-9 items-center justify-center rounded-xl hover:bg-[#EAE5DE] transition-colors cursor-pointer"
          title="Expand sidebar"
          aria-label="Expand sidebar"
        >
          <img src={ciLogo} alt="Ci Logo" className="size-6 object-contain" />
        </button>

        {/* Stack of Icon Navigation Buttons */}
        <div className="flex flex-col items-center gap-1.5 mt-1 w-full">
          {/* Search Icon */}
          <button
            type="button"
            onClick={() => {
              setIsCollapsed(false);
              setIsSearchOpen(true);
            }}
            className="group relative flex size-9 items-center justify-center rounded-xl text-[#5A544D] hover:bg-[#ECE6DE]/80 hover:text-[#1F1E1D] transition-colors cursor-pointer"
            title="Search"
            aria-label="Search"
          >
            <SearchNormal1 size={18} color="#5A544D" />
            <span className="pointer-events-none absolute left-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[#2C2622] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
              Search
            </span>
          </button>

          {/* Ask Follei Icon (Commented Out) */}
          {/* <button
            type="button"
            onClick={() => {
              onAskFollei?.();
              navTo('/');
            }}
            className={`group relative flex size-9 items-center justify-center rounded-xl transition-colors cursor-pointer ${
              activeNav === 'ask-follei'
                ? 'bg-[#EAE5DE] text-[#1F1E1D]'
                : 'text-[#5A544D] hover:bg-[#ECE6DE]/80 hover:text-[#1F1E1D]'
            }`}
            title="Ask Follei"
            aria-label="Ask Follei"
          >
            <Magicpen size={18} color="#5A544D" />
            <span className="pointer-events-none absolute left-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[#2C2622] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
              Ask Follei
            </span>
          </button> */}

          {/* Projects Icon */}
          <button
            type="button"
            onClick={() => {
              setIsCollapsed(false);
              setIsProjectsOpen(true);
            }}
            className="group relative flex size-9 items-center justify-center rounded-xl text-[#5A544D] hover:bg-[#ECE6DE]/80 hover:text-[#1F1E1D] transition-colors cursor-pointer"
            title="Projects"
            aria-label="Projects"
          >
            <Folder2 size={18} color="#5A544D" />
            <span className="pointer-events-none absolute left-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[#2C2622] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
              Projects
            </span>
          </button>

          {/* Expand Sidebar Toggle Icon */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="group relative flex size-9 items-center justify-center rounded-xl text-[#5A544D] hover:bg-[#ECE6DE]/80 hover:text-[#1F1E1D] transition-colors cursor-pointer mt-1"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="size-4.5 text-[#5A544D]" strokeWidth={1.75} />
            <span className="pointer-events-none absolute left-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[#2C2622] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
              Expand sidebar
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Mini Footer */}
      <div className="flex flex-col items-center gap-2.5 w-full pt-3 relative" ref={userMenuRef}>
        {userMenuDropdown}

        {/* Notification Bell Button */}
        <button
          type="button"
          onClick={() => toast('No new notifications', { icon: '🔔' })}
          className="group relative flex size-9 items-center justify-center rounded-full text-[#4A453F] hover:bg-[#ECE6DE]/80 hover:text-[#1F1E1D] transition-colors cursor-pointer"
          title="Notifications"
          aria-label="Notifications"
        >
          <Notification size={20} color="#2C2622" />
          <span className="pointer-events-none absolute left-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[#2C2622] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
            Notifications
          </span>
        </button>

        {/* User Avatar Circle */}
        <button
          type="button"
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
          className="group relative flex size-8.5 items-center justify-center rounded-full bg-[#DAD4C9] text-[12.5px] font-semibold text-[#2C2622] overflow-hidden hover:ring-2 hover:ring-[#2C2622]/20 transition-all cursor-pointer"
          title={resolvedUser.name}
          aria-label="User Profile"
        >
          {resolvedUser.avatar ? (
            <img
              src={resolvedUser.avatar}
              alt={resolvedUser.name}
              className="size-full object-cover"
            />
          ) : (
            resolvedUser.initials || resolvedUser.name.charAt(0) || 'F'
          )}
          <span className="pointer-events-none absolute left-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[#2C2622] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
            {resolvedUser.name}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Smooth transition between expanded w-64 and mini w-[60px]) */}
      <aside className={`hidden lg:flex h-screen shrink-0 sticky top-0 z-30 transition-all duration-200 ${isCollapsed ? 'w-[60px]' : 'w-64'}`}>
        {isCollapsed ? collapsedContent : expandedContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className="relative z-10 h-full shadow-2xl">
            {expandedContent}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setIsLogoutModalOpen(false)}
            />
            <div className="relative z-10 w-full max-w-[360px] rounded-[24px] bg-white border border-[#EAE6DF] p-6 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-[18px] font-semibold text-[#2C2622] tracking-tight mb-5">
                  Are you sure you want to log out?
                </h3>

                {/* User Card Box */}
                <div className="w-full flex items-center gap-3 rounded-2xl border border-[#EAE6DF] bg-[#F5F3EF] p-3 mb-6 text-left">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E5E0D6] text-[13px] font-semibold text-[#2C2622]">
                    {resolvedUser.initials || resolvedUser.name.charAt(0) || 'F'}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[13.5px] font-semibold text-[#2C2622] leading-tight">
                      {resolvedUser.name}
                    </span>
                    <span className="truncate text-[12px] text-[#7A736A] leading-tight mt-0.5">
                      {resolvedUser.email}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleConfirmLogout}
                    className="w-full rounded-full bg-[#16171A] hover:bg-black text-white font-medium py-3 text-[14px] cursor-pointer shadow-xs"
                  >
                    Log out
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="w-full rounded-full border border-[#EAE6DF] bg-[#F5F3EF] hover:bg-[#ECE7DF] text-[#2C2622] font-medium py-3 text-[14px] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Delete Confirmation Modal */}
      {createPortal(
        <ConfirmDialog
          isOpen={Boolean(projectToDelete)}
          onClose={() => setProjectToDelete(null)}
          onConfirm={() => {
            if (projectToDelete) {
              removeProject.mutate(projectToDelete.id, {
                onSuccess: () => {
                  navigate('/');
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

      {/* Global Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNewProject={handleNewProject}
        onAskFollei={onAskFollei}
      />
    </>
  );
};

export default Sidebar;
