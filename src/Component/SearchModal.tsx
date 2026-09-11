import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SearchNormal1, ArrowUp2, ArrowDown2 } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject?: () => void;
  onAskFollei?: () => void;
}

/** A real "X ago" from the project's actual created_at -- was previously a
 * hardcoded "22h ago" for every single workspace, regardless of age. */
function timeAgo(isoDate: string): string {
  const seconds = Math.max(0, (Date.now() - new Date(isoDate).getTime()) / 1000);
  const units: [number, string][] = [[60, 's'], [60, 'm'], [24, 'h'], [7, 'd'], [4.345, 'w'], [12, 'mo'], [Infinity, 'y']];
  let value = seconds;
  for (const [size, label] of units) {
    if (value < size || size === Infinity) return `${Math.max(1, Math.floor(value))}${label} ago`;
    value /= size;
  }
  return 'just now';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNewProject,
  onAskFollei: _onAskFollei,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { projects: workspaces } = useProjects();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global ESC and navigation handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  // Build items list
  const projectItems = (workspaces || []).map((p) => ({
    id: p.id,
    type: 'project' as const,
    title: p.name || 'Untitled workspace',
    time: p.created_at ? timeAgo(p.created_at) : '',
    action: () => {
      navigate('/p/' + p.id);
      onClose();
    },
  }));

  const defaultActions = [
    {
      id: 'untitled-workspace',
      type: 'project' as const,
      title: 'Untitled workspace',
      time: '',
      action: () => {
        if (onNewProject) onNewProject();
        else navigate('/');
        onClose();
      },
    },
  ];

  const baseItems = projectItems.length > 0 ? projectItems : defaultActions;

  const filteredItems = query.trim()
    ? baseItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase().trim())
    )
    : baseItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === null ? 0 : (prev + 1) % Math.max(1, filteredItems.length)
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === null
          ? filteredItems.length - 1
          : (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length)
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex !== null && filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      } else if (filteredItems.length > 0) {
        filteredItems[0].action();
      }
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Soft Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Spotlight Card Modal (Matches exact #F9F6F3 bg color, flat with crisp border, no shadow) */}
      <div className="relative z-10 w-full max-w-[540px] min-h-[350px] rounded-[22px] border border-[#ECE7DE] bg-[#F9F6F3] overflow-hidden text-[#2C2622] animate-in zoom-in-95 fade-in duration-150 flex flex-col justify-between select-none">

        {/* Top Area: Search Input + Results List */}
        <div className="flex flex-col flex-1">
          {/* Top Search Input Header Bar */}
          <div className="flex items-center gap-3 px-4.5 py-3 border-b border-[#EBE5DB]">
            <SearchNormal1 size={17} color="#6B5A50" className="shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search your workspaces..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(null);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[14px] text-[#2C2622] placeholder:text-[#9A9389] outline-none font-normal"
            />
            {/* ESC Button (44.6px x 28px, rounded-8px, fill #FEFDFB 40%, stroke #000000 5%) */}
            <button
              type="button"
              onClick={onClose}
              className="flex h-[28px] w-[44.6px] items-center justify-center rounded-[8px] border border-black/5 bg-[#FEFDFB]/40 px-2.5 text-[12px] font-medium text-[#6B5A50] hover:bg-[#FEFDFB]/80 transition-colors cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* Section Category Header */}
          <div className="px-4.5 pt-3.5 pb-1 text-[10px] font-semibold tracking-wider text-[#9A9389] uppercase">
            {query.trim() ? 'SEARCH RESULTS' : 'RECENT WORKSPACES'}
          </div>

          {/* Chat List Items with #F5F1EE hover color only on hover */}
          <div className="flex flex-col gap-0.5 px-2 flex-1 overflow-y-auto max-h-[220px]">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-[#9A9389] text-[13px]">
                No workspaces found for "{query}"
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = selectedIndex !== null && index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseLeave={() => setSelectedIndex(null)}
                    className={`mx-1.5 px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#F5F1EE] text-[#1F1E1D]'
                        : 'hover:bg-[#F5F1EE] text-[#2C2622]'
                    }`}
                  >
                    <span className="text-[13.5px] font-normal leading-normal truncate">
                      {item.title}
                    </span>

                    <span className="text-[12px] text-[#6B5A50] shrink-0 pl-3">
                      {item.time}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Footer Status Row (Exact Figma Specs) */}
        <div className="flex items-center justify-end gap-3.5 px-6 py-3 border-t border-[#EAE5DC] text-[12.5px] text-[#6B5A50]">
          {/* Navigate [Kbd] (35.6px x 20px, rounded-8px, fill #FEFDFB 40%, stroke #000000 5%) + Label */}
          <div className="flex items-center gap-2">
            <div className="flex h-[20px] w-[35.6px] items-center justify-center gap-1 rounded-[8px] border border-black/5 bg-[#FEFDFB]/40 px-1">
              <ArrowUp2 size={9.5} color="#6B5A50" />
              <ArrowDown2 size={9.5} color="#6B5A50" />
            </div>
            <span className="text-[12.5px] text-[#6B5A50] font-normal">Navigate</span>
          </div>

          {/* Open [Kbd] (24px x 20px, rounded-8px, fill #FEFDFB 40%, stroke #000000 5%) + Label */}
          <div className="flex items-center gap-2">
            <div className="flex h-[20px] min-w-[24px] items-center justify-center rounded-[8px] border border-black/5 bg-[#FEFDFB]/40 px-1.5">
              <svg
                className="size-3 text-[#6B5A50]"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.5 4.5v4a2 2 0 0 1-2 2H4" />
                <polyline points="6 8 3.5 10.5 6 13" />
              </svg>
            </div>
            <span className="text-[12.5px] text-[#6B5A50] font-normal">Open</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
