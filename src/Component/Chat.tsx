import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import {
  ArrowRight,
  Plus,
  X,
  Copy,
  CheckCheck,
  Loader2,
  FileText,
  PanelRight,
  MoreVertical,
  Mail,
  Phone,
} from 'lucide-react';
import toast from 'react-hot-toast';
import CiLogo from '../assets/logo/CiLogo.png';
import ScrapedDataDrawer from './ScrapedDataDrawer';
import type { Snapshot, Data } from '../api/coirei';

export interface Turn {
  role: 'user' | 'assistant';
  message: string;
}

export type ChatMode = 'research' | 'grow';

const RESEARCH_DEFAULT_PLACEHOLDERS = [
  'Connect your website',
  'https://example.com',
  'https://yourcompany.com',
  'Tell coirei about your business...',
];

const RESEARCH_ACTIVE_PLACEHOLDERS = [
  'Message coirei...',
  'Find competitors for my business...',
  'Analyze market ICP & audience...',
  'Ask coirei anything...',
];

const GROW_DEFAULT_PLACEHOLDERS = [
  'Grow your business pipeline & revenue...',
  'Find high-intent accounts and decision makers...',
  'Draft personalized outreach campaigns...',
  'Target ideal customer profiles across industries...',
  'Find qualified leads and launch campaigns...',
];

const GROW_ACTIVE_PLACEHOLDERS = [
  'Message coirei to expand your pipeline...',
  'Find decision makers with verified contact info...',
  'Draft personalized emails for top prospects...',
  'Launch automated multi-channel growth campaigns...',
];

function ResearchIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.76 6.48C5.4 6.67 4.93 6.67 4 6.67C3.07 6.67 2.6 6.67 2.24 6.48C1.93 6.33 1.67 6.07 1.51 5.76C1.33 5.4 1.33 4.93 1.33 4C1.33 3.07 1.33 2.6 1.51 2.24C1.67 1.93 1.93 1.67 2.24 1.51C2.6 1.33 3.07 1.33 4 1.33C4.93 1.33 5.4 1.33 5.76 1.51C6.07 1.67 6.33 1.93 6.48 2.24C6.67 2.6 6.67 3.07 6.67 4C6.67 4.93 6.67 5.4 6.48 5.76C6.33 6.07 6.07 6.33 5.76 6.48Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M9.33 9.33V6.67C9.33 5.73 9.33 5.27 9.51 4.91C9.67 4.6 9.93 4.34 10.24 4.18C10.6 4 11.07 4 12 4C12.93 4 13.4 4 13.76 4.18C14.07 4.34 14.33 4.6 14.48 4.91C14.67 5.27 14.67 5.73 14.67 6.67V9.33H9.33Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M9.33 9.33H14.67V11.33C14.67 12.9 14.67 13.69 14.18 14.18C13.69 14.67 12.9 14.67 11.33 14.67H9.33V9.33Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M6.67 9.33H9.33V14.67H6.67C5.73 14.67 5.27 14.67 4.91 14.48C4.6 14.33 4.34 14.07 4.18 13.76C4 13.4 4 12.93 4 12C4 11.07 4 10.6 4.18 10.24C4.34 9.93 4.6 9.67 4.91 9.51C5.27 9.33 5.73 9.33 6.67 9.33Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

function GrowIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.38 10.5H3C1.9 10.5 1 11.4 1 12.5V13C1 14.1 1.9 15 3 15H5.38V10.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"></path>
      <path d="M10.19 6.5H7.38C6.27 6.5 5.38 7.4 5.38 8.5V15H10.19V6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"></path>
      <path d="M10.19 15V3C10.19 1.9 11.08 1 12.19 1H13C14.1 1 15 1.9 15 3V13C15 14.1 14.1 15 13 15H10.19Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"></path>
    </svg>
  );
}

/* Social Vector Brand Icons */
function InstagramIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chat-ig-grad" cx="30%" cy="107%" r="130%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#chat-ig-grad)" />
      <circle cx="12" cy="12" r="4.2" stroke="#ffffff" strokeWidth="1.8" fill="none" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="#ffffff" />
    </svg>
  );
}

function FacebookIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XTwitterIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.94-4.49V8.69a8.18 8.18 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function LinkedInIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function RedditIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF4500" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

function renderMessageWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex) && (part.startsWith('http') || part.includes('.'))) {
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0E7A7A] underline hover:text-[#005F5F] transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function FileThumbnail({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url: string | null = null;
    if (file.type.startsWith('image/')) {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => {
      clearTimeout(timer);
      if (url) URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="relative group size-[72px] shrink-0 rounded-[14px] overflow-visible">
      <div className="size-full rounded-[14px] overflow-hidden border border-black/8 bg-[#EAE6DF] flex items-center justify-center shadow-2xs">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full bg-[#8E8B87]">
            <Loader2 className="size-5 animate-spin text-white/90" />
          </div>
        ) : previewUrl ? (
          <img
            src={previewUrl}
            alt={file.name}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-1.5 text-center w-full h-full bg-[#F3EFE9]">
            <FileText className="size-5.5 text-[#7A736A] mb-0.5" />
            <span className="text-[9px] font-semibold uppercase text-[#5A534B] tracking-wider truncate max-w-full px-1">
              {file.name.split('.').pop() || 'DOC'}
            </span>
          </div>
        )}
      </div>

      {/* Floating Circular Close Button */}
      <button
        type="button"
        aria-label={`Remove ${file.name}`}
        onClick={onRemove}
        className="absolute -top-1.5 -right-1.5 z-10 size-5.5 rounded-full bg-[#E5E0DA] hover:bg-[#D5CFCE] text-[#3A332C] flex items-center justify-center shadow-xs cursor-pointer transition-transform hover:scale-110"
        title="Remove file"
      >
        <X className="size-3" strokeWidth={2.2} />
      </button>
    </div>
  );
}

export default function Chat({
  turns,
  value,
  onChange,
  onSubmit,
  files,
  onFiles,
  busy,
  thinking,
  children,
  heading = "Let's grow your business",
  subheading = '',
  placeholder = 'Connect your website',
  suggestions = [],
  userName: _userName = 'OP',
  mode,
  onModeChange,
  snapshot,
  onOpenEvidence,
  onStop,
}: {
  turns: Turn[];
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event?: FormEvent) => void;
  files: File[];
  onFiles: (files: File[]) => void;
  busy: boolean;
  thinking?: string;
  children?: ReactNode;
  heading?: string;
  subheading?: string;
  placeholder?: string;
  suggestions?: string[];
  userName?: string;
  mode?: ChatMode;
  onModeChange?: (mode: ChatMode) => void;
  snapshot?: Snapshot;
  onOpenEvidence?: (data: Data | null) => void;
  onStop?: () => void;
}) {
  const upload = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [internalMode, setInternalMode] = useState<ChatMode>('research');
  const [isResearchDrawerOpen, setIsResearchDrawerOpen] = useState(false);
  const [isGrowSidebarOpen, setIsGrowSidebarOpen] = useState(true);
  const researchRef = useRef<HTMLButtonElement>(null);
  const growRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 2, width: 0 });
  const currentMode = mode !== undefined ? mode : internalMode;

  const isPanelOpen = currentMode === 'grow' ? isGrowSidebarOpen : isResearchDrawerOpen;
  const togglePanel = () => {
    if (currentMode === 'grow') {
      setIsGrowSidebarOpen((prev) => !prev);
    } else {
      setIsResearchDrawerOpen((prev) => !prev);
    }
  };

  // Social handles connection state
  const [connectedHandles, setConnectedHandles] = useState<string[]>([]);
  const [isSetWebsiteModalOpen, setIsSetWebsiteModalOpen] = useState(false);
  const [customWebsiteInput, setCustomWebsiteInput] = useState('');

  const socialPlatforms = [
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'Facebook', icon: FacebookIcon },
    { name: 'X / Twitter', icon: XTwitterIcon },
    { name: 'Tiktok', icon: TikTokIcon },
    { name: 'LinkedIn', icon: LinkedInIcon },
    { name: 'YouTube', icon: YouTubeIcon },
    { name: 'Reddit', icon: RedditIcon },
  ];

  const toggleConnectHandle = (name: string) => {
    if (connectedHandles.includes(name)) {
      setConnectedHandles((prev) => prev.filter((h) => h !== name));
      toast.success(`Disconnected from ${name}`);
    } else {
      setConnectedHandles((prev) => [...prev, name]);
      toast.success(`Connected ${name} account successfully!`);
    }
  };

  useEffect(() => {
    const updatePill = () => {
      const target = currentMode === 'research' ? researchRef.current : growRef.current;
      if (target) {
        setPillStyle({
          left: target.offsetLeft,
          width: target.offsetWidth,
        });
      }
    };
    updatePill();
    const timer = setTimeout(updatePill, 50);
    return () => clearTimeout(timer);
  }, [currentMode]);

  // Extract domain from turns if not provided in snapshot
  const detectedDomain = (() => {
    if (customWebsiteInput.trim()) return customWebsiteInput.trim();
    if (snapshot?.company?.domain) return snapshot.company.domain;
    const allText = turns.map((t) => t.message).join(' ') + ' ' + value;
    const match = allText.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)/i);
    return match ? match[1] : null;
  })();

  useEffect(() => {
    if (!thinking) {
      setThinkingSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      setThinkingSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [thinking]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '\\' || e.code === 'Backslash')) {
        e.preventDefault();
        togglePanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMode]);

  const handleModeChange = (newMode: ChatMode) => {
    setInternalMode(newMode);
    onModeChange?.(newMode);
  };

  const empty = turns.length === 0;
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState(
    empty ? 'Connect your website' : 'Message coirei...'
  );

  // Animated rotating typewriter placeholder for both empty and active states based on currentMode
  useEffect(() => {
    const list = currentMode === 'grow'
      ? (empty ? GROW_DEFAULT_PLACEHOLDERS : GROW_ACTIVE_PLACEHOLDERS)
      : (empty ? RESEARCH_DEFAULT_PLACEHOLDERS : (placeholder && placeholder !== 'Connect your website' ? [placeholder, ...RESEARCH_ACTIVE_PLACEHOLDERS] : RESEARCH_ACTIVE_PLACEHOLDERS));

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentPhrase = list[phraseIndex] || list[0];

      if (isDeleting) {
        charIndex--;
        setAnimatedPlaceholder(currentPhrase.substring(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % list.length;
          timeoutId = setTimeout(tick, 450);
          return;
        }
        timeoutId = setTimeout(tick, 30);
      } else {
        charIndex++;
        setAnimatedPlaceholder(currentPhrase.substring(0, charIndex));
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 2200);
          return;
        }
        timeoutId = setTimeout(tick, 60);
      }
    };

    timeoutId = setTimeout(tick, 150);
    return () => clearTimeout(timeoutId);
  }, [empty, placeholder, currentMode]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns.length, thinking]);

  const copy = (message: string, index: number) => {
    void navigator.clipboard?.writeText(message).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    }).catch(() => undefined);
  };

  // Grow Mode 3 Sidebar Cards
  const growSidebar = (
    <div className="flex flex-col gap-4 w-full">
      {/* Card 1: Your Website */}
      <div className="rounded-[20px] border border-[#ECE7DE] bg-[#FAF8F5] p-5 flex flex-col gap-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-[#2C2622]">Your Website</h3>
          <button
            type="button"
            onClick={() => setIsSetWebsiteModalOpen((prev) => !prev)}
            className="text-[#7A736A] hover:text-[#2C2622] p-1 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Website options"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>
        <p className="text-[13px] text-[#8A8279] leading-relaxed">
          {detectedDomain
            ? `Connected: ${detectedDomain}`
            : 'Pick a default website and it will show up here.'}
        </p>

        {isSetWebsiteModalOpen ? (
          <div className="flex flex-col gap-2 pt-1 animate-in fade-in duration-150">
            <input
              type="text"
              placeholder="e.g. coirei.com"
              value={customWebsiteInput}
              onChange={(e) => setCustomWebsiteInput(e.target.value)}
              className="w-full text-[13px] px-3 py-1.5 rounded-xl border border-[#DED7CE] bg-white text-[#2C2622] outline-none focus:border-[#A89F91]"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (customWebsiteInput.trim()) {
                    toast.success(`Default website set to ${customWebsiteInput.trim()}`);
                  }
                  setIsSetWebsiteModalOpen(false);
                }}
                className="flex-1 py-1.5 rounded-full bg-[#191512] text-white text-[12.5px] font-medium hover:bg-black transition-colors cursor-pointer text-center"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsSetWebsiteModalOpen(false)}
                className="px-3 py-1.5 rounded-full border border-[#DED7CE] bg-white text-[12.5px] text-[#5A534B] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsSetWebsiteModalOpen(true)}
            className="w-full py-2 px-4 rounded-full border border-[#DED7CE] bg-white hover:bg-[#F3EFE9] text-[13px] font-medium text-[#2C2622] shadow-2xs transition-all cursor-pointer text-center active:scale-[0.99]"
          >
            Set default website
          </button>
        )}
      </div>

      {/* Card 2: Contact details */}
      <div className="rounded-[20px] border border-[#ECE7DE] bg-[#FAF8F5] p-5 flex flex-col gap-3 shadow-2xs">
        <h3 className="text-[15px] font-semibold text-[#2C2622]">Contact details</h3>
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => toast.success('Email setup: enter your outbound sending email in Settings')}
            className="flex items-center gap-3 text-[13.5px] text-[#2C2622] hover:text-black py-1.5 px-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer text-left group"
          >
            <Mail className="size-4.5 text-[#5A534B] group-hover:text-[#2C2622] transition-colors" strokeWidth={1.75} />
            <span className="font-normal text-[#2C2622]">Set up email</span>
          </button>
          <button
            type="button"
            onClick={() => toast.success('Phone setup: add Twilio / SIP number in Settings')}
            className="flex items-center gap-3 text-[13.5px] text-[#2C2622] hover:text-black py-1.5 px-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer text-left group"
          >
            <Phone className="size-4.5 text-[#5A534B] group-hover:text-[#2C2622] transition-colors" strokeWidth={1.75} />
            <span className="font-normal text-[#2C2622]">Get phone number</span>
          </button>
        </div>
      </div>

      {/* Card 3: Your handles */}
      <div className="rounded-[20px] border border-[#ECE7DE] bg-[#FAF8F5] p-5 flex flex-col gap-3.5 shadow-2xs">
        <h3 className="text-[15px] font-semibold text-[#2C2622]">Your handles</h3>
        <div className="flex flex-col gap-3">
          {socialPlatforms.map((platform) => {
            const isConnected = connectedHandles.includes(platform.name);
            return (
              <div key={platform.name} className="flex items-center justify-between py-0.5">
                <div className="flex items-center gap-2.5">
                  <platform.icon className="size-4.5 shrink-0" />
                  <span className="text-[13.5px] font-normal text-[#2C2622]">{platform.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleConnectHandle(platform.name)}
                  className={`py-1 px-3.5 rounded-full border text-[12px] font-medium transition-all cursor-pointer ${
                    isConnected
                      ? 'bg-[#EAE5DF] text-[#4A423B] border-transparent'
                      : 'bg-white border-[#DED7CE] text-[#2C2622] hover:bg-[#F3EFE9] shadow-2xs active:scale-95'
                  }`}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Initial rich card composer (shown when starting / no chat messages yet)
  const initialComposer = (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between rounded-[22px] border border-[#ECE7DE] bg-[#FAF8F5] p-4 sm:p-5 min-h-[125px] sm:min-h-[135px] w-full max-w-[680px] mx-auto shadow-xs focus-within:border-[#D5CFC5] transition-all"
    >
      <input
        ref={upload}
        aria-label="Attach product documents"
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.md,.csv,image/*"
        className="hidden"
        onChange={(event) => onFiles(Array.from(event.target.files || []))}
      />

      {/* Uploaded File Previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 pb-2.5">
          {files.map((file, index) => (
            <FileThumbnail
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => onFiles(files.filter((_, other) => other !== index))}
            />
          ))}
        </div>
      )}

      {/* Multiline Textarea */}
      <textarea
        aria-label="Message coirei"
        rows={2}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (value.trim() || files.length) onSubmit();
          }
        }}
        placeholder={animatedPlaceholder || placeholder}
        disabled={busy}
        className="min-w-0 flex-1 resize-none bg-transparent text-[15.5px] leading-relaxed text-[#2C2622] outline-none placeholder:text-[#6B5A50] font-normal py-0.5 max-h-[160px] overflow-y-auto"
      />

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-between pt-2">
        {/* Left: + Attach File Button */}
        <button
          type="button"
          disabled={busy}
          aria-label="Attach document"
          onClick={() => upload.current?.click()}
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-[#6B5A50] hover:text-[#2C2622] hover:bg-black/5 transition-colors cursor-pointer"
          title="Attach document"
        >
          <Plus className="size-5" strokeWidth={1.75} />
        </button>

        {/* Right: Circular Send or Stop Button */}
        <div className="flex items-center gap-2">
          {onStop && (busy || thinking) ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generation"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#191512] hover:bg-black text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Stop generation"
            >
              <div className="size-3.5 rounded-[3px] bg-white" />
            </button>
          ) : (
            <button
              type="submit"
              aria-label="Send prompt"
              disabled={busy || (!value.trim() && !files.length)}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#191512] hover:bg-black text-white disabled:opacity-40 disabled:hover:bg-[#191512] transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ArrowRight className="size-4.5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </form>
  );

  // Short minimal compact composer (shown during active conversation)
  const compactComposer = (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 w-full max-w-[720px] mx-auto"
    >
      <input
        ref={upload}
        aria-label="Attach product documents"
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.md,.csv,image/*"
        className="hidden"
        onChange={(event) => onFiles(Array.from(event.target.files || []))}
      />

      <div
        className={`w-full transition-all border border-[#ECE7DE] bg-[#FAF8F5] focus-within:border-[#D5CFC5] shadow-xs ${
          files.length > 0
            ? 'rounded-[24px] p-3 flex flex-col gap-2.5'
            : 'flex h-[52px] items-center gap-3 rounded-full pl-4 pr-2 py-1.5'
        }`}
      >
        {files.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 pl-1 pt-0.5">
            {files.map((file, index) => (
              <FileThumbnail
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => onFiles(files.filter((_, other) => other !== index))}
              />
            ))}
          </div>
        )}

        <div className={`flex items-center gap-2 w-full ${files.length > 0 ? 'pl-0.5' : ''}`}>
          <button
            type="button"
            disabled={busy}
            aria-label="Attach document"
            onClick={() => upload.current?.click()}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-[#6B5A50] hover:text-[#2C2622] hover:bg-black/5 transition-colors cursor-pointer"
            title="Attach document"
          >
            <Plus className="size-4.5" strokeWidth={1.8} />
          </button>

          <input
            type="text"
            aria-label="Message coirei"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                if (value.trim() || files.length) onSubmit();
              }
            }}
            placeholder={animatedPlaceholder || placeholder || 'Message coirei...'}
            disabled={busy}
            className="min-w-0 flex-1 bg-transparent text-[14.5px] text-[#2C2622] outline-none placeholder:text-[#6B5A50] font-normal py-1"
          />

          {onStop && (busy || thinking) ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generation"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#191512] hover:bg-black text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="Stop generation"
            >
              <div className="size-3 rounded-[2.5px] bg-white" />
            </button>
          ) : (
            <button
              type="submit"
              aria-label="Send prompt"
              disabled={busy || (!value.trim() && !files.length)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#191512] hover:bg-black text-white disabled:opacity-40 disabled:hover:bg-[#191512] transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ArrowRight className="size-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </form>
  );

  // Top header bar matching screenshot exactly (centered [Research | Grow], right Panel toggle)
  const topHeaderBar = (
    <div className="w-full grid grid-cols-3 items-center px-4 sm:px-8 py-3.5 sticky top-0 z-20 bg-transparent">
      {/* Left spacer */}
      <div className="flex items-center" />

      {/* Center: Segmented Pill Switcher (Research | Grow) - Only visible on homescreen before conversation starts */}
      <div className="flex justify-center min-h-[32px]">
        {empty && (
          <div className="relative inline-flex items-center p-0 home-mode-toggle h-8 border-0 gap-0 px-0 rounded-full bg-[#EAE5DF] animate-in fade-in duration-150">
            {/* Active sliding pill */}
            <div
              data-active-pill=""
              className="absolute top-0 bottom-0 left-0 h-full transition-all duration-200 ease-out motion-reduce:transition-none rounded-full border-[0.5px] border-black/5 bg-white shadow-2xs"
              style={{
                transform: `translateX(${pillStyle.left || 0}px)`,
                width: pillStyle.width ? `${pillStyle.width}px` : (currentMode === 'research' ? '102px' : '78px'),
              }}
            />

            <button
              ref={researchRef}
              type="button"
              data-state={currentMode === 'research' ? 'active' : 'inactive'}
              onClick={() => handleModeChange('research')}
              className={`relative z-10 text-sm font-medium cursor-pointer transition-colors h-8 px-3 rounded-full flex items-center justify-center ${
                currentMode === 'research' ? 'text-[#2C241E] font-semibold' : 'text-[#6B5C53] hover:text-[#2C241E]'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <ResearchIcon className="size-4" />
                <span className="mode-label"><span>Research</span></span>
              </span>
            </button>

            <button
              ref={growRef}
              type="button"
              data-state={currentMode === 'grow' ? 'active' : 'inactive'}
              onClick={() => handleModeChange('grow')}
              className={`relative z-10 text-sm font-medium cursor-pointer transition-colors h-8 px-3 rounded-full flex items-center justify-center ${
                currentMode === 'grow' ? 'text-[#2C241E] font-semibold' : 'text-[#6B5C53] hover:text-[#2C241E]'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <GrowIcon className="size-4" />
                <span className="mode-label"><span>Grow</span></span>
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Right: Panel Toggle Icon with Tooltip */}
      <div className="flex items-center justify-end gap-3">
        <div className="relative group flex items-center justify-center">
          <button
            type="button"
            onClick={togglePanel}
            className={`flex size-8.5 items-center justify-center rounded-[12px] transition-all cursor-pointer ${
              isPanelOpen
                ? 'bg-[#EAE5DF] text-[#191512] shadow-2xs'
                : 'text-[#4A433E] hover:text-[#191512] hover:bg-[#EAE5DF]'
            }`}
            aria-label={currentMode === 'grow' ? 'Toggle details sidebar' : 'View scraped data'}
          >
            <PanelRight className="size-4.5" strokeWidth={1.8} />
          </button>

          {/* Tooltip matching screenshot with arrow pointer */}
          <div className="absolute right-0 top-full mt-2 hidden group-hover:flex items-center gap-2.5 px-3 py-1.5 rounded-[10px] bg-[#FAF8F5] border border-black/8 shadow-md whitespace-nowrap z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="absolute -top-1 right-2.5 size-2 rotate-45 bg-[#FAF8F5] border-t border-l border-black/8" />
            <span className="relative z-10 text-[13px] font-normal text-[#191512]">
              {currentMode === 'grow'
                ? (isGrowSidebarOpen ? 'Hide details' : 'Show details')
                : 'View scraped data'}
            </span>
            <span className="relative z-10 text-[12px] font-normal text-[#78716C]">Ctrl \</span>
          </div>
        </div>
      </div>
    </div>
  );

  const drawerElement = currentMode === 'research' ? (
    <ScrapedDataDrawer
      isOpen={isResearchDrawerOpen}
      onClose={() => setIsResearchDrawerOpen(false)}
      snapshot={snapshot}
      detectedDomain={detectedDomain || 'coirei.com'}
      onOpenEvidence={onOpenEvidence}
    />
  ) : null;

  if (empty) {
    if (currentMode === 'grow') {
      return (
        <div className="flex flex-col h-screen w-full bg-[#FDFDFC] overflow-hidden">
          {topHeaderBar}

          <div className="relative flex-1 w-full h-[calc(100vh-60px)] flex items-center justify-center overflow-hidden">
            {/* Center Area: Heading + Composer (Smoothly adjusts when sidebar opens/closes) */}
            <div
              className={`w-full max-w-[680px] px-4 sm:px-6 flex flex-col items-center justify-center my-auto gap-6 z-10 transition-all duration-300 ease-out ${
                isGrowSidebarOpen
                  ? 'lg:-translate-x-[160px] xl:-translate-x-[170px]'
                  : 'translate-x-0'
              }`}
            >
              <header className="flex flex-col gap-2 text-center">
                <h1 className="text-[32px] sm:text-[36px] font-semibold text-[#2C2622] tracking-tight">
                  Let's grow your business
                </h1>
                {subheading && (
                  <p className="text-[14px] text-[#7A736A]">{subheading}</p>
                )}
              </header>

              <div className="w-full flex flex-col gap-4">
                {initialComposer}
                {children}
              </div>
            </div>

            {/* Right Column: Grow Sidebar Cards (No visible scrollbar, smooth slide transition) */}
            <div
              className={`hidden lg:flex flex-col gap-4 absolute right-4 xl:right-8 top-2 bottom-4 w-[320px] xl:w-[340px] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden z-20 transition-all duration-300 ease-out ${
                isGrowSidebarOpen
                  ? 'translate-x-0 opacity-100 pointer-events-auto'
                  : 'translate-x-12 opacity-0 pointer-events-none'
              }`}
            >
              {growSidebar}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-screen w-full bg-[#FDFDFC] overflow-hidden">
        {topHeaderBar}
        {drawerElement}
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 py-10 overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="w-full max-w-[680px] flex flex-col gap-6 my-auto">
            <header className="flex flex-col gap-2 text-center">
              <h1 className="text-[32px] sm:text-[36px] font-semibold text-[#2C2622] tracking-tight">
                {heading}
              </h1>
              {subheading && (
                <p className="text-[14px] text-[#7A736A]">{subheading}</p>
              )}
            </header>

            <div className="flex flex-col gap-4">
              {initialComposer}

              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 justify-center">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => onChange(suggestion)}
                      className="rounded-full border border-[#E6E6E4] bg-white px-3.5 py-1.5 text-[12.5px] text-[#2C2E31] hover:border-[#CBD5E1] hover:bg-[#F8F8F6] hover:text-[#16171A] cursor-pointer shadow-2xs"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#FDFDFC] overflow-hidden">
      {topHeaderBar}
      {drawerElement}

      <div className="relative flex-1 w-full h-[calc(100vh-60px)] flex overflow-hidden">
        {/* Main Conversation Stream (independently scrollable without visible scrollbar, smoothly shifts) */}
        <div className="flex-1 h-full overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 pt-2 pb-24 flex flex-col items-center">
          <div
            className={`w-full max-w-[760px] flex flex-col gap-6 transition-all duration-300 ease-out ${
              currentMode === 'grow' && isGrowSidebarOpen
                ? 'lg:-translate-x-[160px] xl:-translate-x-[170px]'
                : 'translate-x-0'
            }`}
          >
            <div className="flex flex-col gap-5">
              {turns.map((turn, index) => {
                const isUser = turn.role === 'user';
                return (
                  <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start gap-3'}`}>
                    {!isUser && (
                      <div className="flex size-7 shrink-0 items-center justify-center mt-1">
                        <img src={CiLogo} alt="Coirei" className="size-6 object-contain" />
                      </div>
                    )}

                    <div
                      className={`group relative max-w-[85%] sm:max-w-[80%] ${
                        isUser
                          ? 'rounded-[18px] bg-[#F4EFEA] text-[#2C2622] px-5 py-3 text-[14.5px] shadow-2xs font-normal'
                          : 'rounded-[18px] bg-white border border-[#ECE7DE] text-[#16171A] px-5 py-3 shadow-2xs hover:border-[#D1D5DB]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="whitespace-pre-wrap text-[14.5px] leading-relaxed font-normal flex-1">
                          {renderMessageWithLinks(turn.message)}
                        </p>
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => copy(turn.message, index)}
                            className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-[#16171A] cursor-pointer p-0.5 transition-opacity shrink-0 mt-0.5"
                            title="Copy reply"
                          >
                            {copiedIndex === index
                              ? <CheckCheck className="size-3.5 text-[#0D9488]" />
                              : <Copy className="size-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {thinking && (
                <div className="flex items-center gap-2 text-[13.5px] text-[#8C857B] font-normal py-1 px-1 select-none">
                  <span>Thinking {thinkingSeconds}s</span>
                </div>
              )}
            </div>

            {children}
            <div ref={bottom} />
          </div>
        </div>

        {/* Right Grow Sidebar when in Grow mode (No visible scrollbar, smoothly slides in/out) */}
        {currentMode === 'grow' && (
          <div
            className={`hidden lg:flex flex-col gap-4 absolute right-4 xl:right-8 top-2 bottom-20 w-[320px] xl:w-[340px] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden z-20 transition-all duration-300 ease-out ${
              isGrowSidebarOpen
                ? 'translate-x-0 opacity-100 pointer-events-auto'
                : 'translate-x-12 opacity-0 pointer-events-none'
            }`}
          >
            {growSidebar}
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar for active chat */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#FDFDFC]/95 backdrop-blur-xs px-4 sm:px-6 pb-4 pt-2 border-t border-transparent">
        <div
          className={`w-full max-w-[720px] mx-auto transition-all duration-300 ease-out ${
            currentMode === 'grow' && isGrowSidebarOpen
              ? 'lg:-translate-x-[160px] xl:-translate-x-[170px]'
              : 'translate-x-0'
          }`}
        >
          {compactComposer}
        </div>
      </div>
    </div>
  );
}

