import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowRight, Plus, X, Copy, CheckCheck, Loader2, FileText, PanelRight } from 'lucide-react';
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
  'Grow your business...',
  'Find qualified leads for your product...',
  'Draft outreach campaigns...',
  'Target ideal buyer personas...',
];

const GROW_ACTIVE_PLACEHOLDERS = [
  'Message coirei to grow your pipeline...',
  'Find decision makers for outreach...',
  'Draft personalized emails for leads...',
  'Launch new growth campaign...',
];

function BuildIcon({ className = 'size-4' }: { className?: string }) {
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

      {/* Floating Circular Close Button (Matches Screenshot) */}
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
}) {
  const upload = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [internalMode, setInternalMode] = useState<ChatMode>('research');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentMode = mode !== undefined ? mode : internalMode;

  // Extract domain from turns if not provided in snapshot
  const detectedDomain = (() => {
    if (snapshot?.company?.domain) return snapshot.company.domain;
    const allText = turns.map((t) => t.message).join(' ') + ' ' + value;
    const match = allText.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)/i);
    return match ? match[1] : 'coirei.com';
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

  // Initial rich card composer (shown when starting / no chat messages yet, matches screenshot)
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

        {/* Right: Circular Send Button */}
        <button
          type="submit"
          aria-label="Send prompt"
          disabled={busy || (!value.trim() && !files.length)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#191512] hover:bg-black text-white disabled:opacity-40 disabled:hover:bg-[#191512] transition-all cursor-pointer active:scale-95"
        >
          <ArrowRight className="size-4.5" strokeWidth={2} />
        </button>
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

        <div className={`flex items-center gap-3 w-full ${files.length > 0 ? 'pl-0.5' : ''}`}>
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

          <button
            type="submit"
            aria-label="Send prompt"
            disabled={busy || (!value.trim() && !files.length)}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#191512] hover:bg-black text-white disabled:opacity-40 disabled:hover:bg-[#191512] transition-all cursor-pointer active:scale-95"
          >
            <ArrowRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </form>
  );

  // Top header bar matching screenshot exactly (centered [Research | Grow], right Upgrade + Panel toggle)
  const topHeaderBar = (
    <div className="w-full grid grid-cols-3 items-center px-4 sm:px-8 py-3.5 sticky top-0 z-20 bg-transparent">
      {/* Left spacer */}
      <div className="flex items-center" />

      {/* Center: Segmented Pill Switcher (Build | Grow, Matches Screenshot & Code) */}
      <div className="flex justify-center">
        <div className="relative inline-flex items-center p-0.5 home-mode-toggle h-8.5 border-0 gap-0 px-0 rounded-full bg-[#EAE5DF]">
          {/* Active sliding pill */}
          <div
            data-active-pill=""
            className="absolute left-0 top-0 bottom-0 transition-transform duration-200 ease-out motion-reduce:transition-none rounded-full border-[0.5px] border-black/5 bg-white shadow-2xs"
            style={{
              transform: currentMode === 'research' ? 'translateX(0px)' : 'translateX(78px)',
              width: '78px',
              height: '34px',
            }}
          />

          <button
            type="button"
            data-state={currentMode === 'research' ? 'active' : 'inactive'}
            onClick={() => handleModeChange('research')}
            className={`relative z-10 text-sm font-medium cursor-pointer transition-colors h-8 px-2.5 md:px-3 ${
              currentMode === 'research' ? 'text-[#2C241E] font-semibold' : 'text-[#6B5C53] hover:text-[#2C241E]'
            }`}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <BuildIcon className="size-4" />
              <span className="mode-label"><span>Build</span></span>
            </span>
          </button>

          <button
            type="button"
            data-state={currentMode === 'grow' ? 'active' : 'inactive'}
            onClick={() => handleModeChange('grow')}
            className={`relative z-10 text-sm font-medium cursor-pointer transition-colors h-8 px-2.5 md:px-3 ${
              currentMode === 'grow' ? 'text-[#2C241E] font-semibold' : 'text-[#6B5C53] hover:text-[#2C241E]'
            }`}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <GrowIcon className="size-4" />
              <span className="mode-label"><span>Grow</span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Right: Panel Toggle Icon */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className={`flex size-8 items-center justify-center rounded-xl transition-all cursor-pointer ${
            isDrawerOpen
              ? 'bg-[#EAE5DF] text-[#191512] shadow-2xs'
              : 'text-[#4A433E] hover:text-[#191512] hover:bg-black/5'
          }`}
          title="View scraped website data"
          aria-label="View scraped website data"
        >
          <PanelRight className="size-4.5" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );

  const drawerElement = (
    <ScrapedDataDrawer
      isOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      snapshot={snapshot}
      detectedDomain={detectedDomain}
      onOpenEvidence={onOpenEvidence}
    />
  );

  if (empty) {
    return (
      <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-screen justify-between bg-[#FDFDFC]">
        {topHeaderBar}
        {drawerElement}
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 py-10">
          <div className="w-full max-w-[680px] flex flex-col gap-6">
            <header className="flex flex-col gap-2 text-center">
              <h1 className="text-[32px] sm:text-[36px] font-semibold text-[#2C2622] tracking-tight">
                {currentMode === 'grow' ? 'Grow your business pipeline' : heading}
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
    <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-screen justify-between bg-[#FDFDFC]">
      {topHeaderBar}
      {drawerElement}

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-6 flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-5">
          {turns.map((turn, index) => {
            const isUser = turn.role === 'user';
            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start gap-3'}`}>
                {!isUser && (
                  <div className="flex size-7.5 shrink-0 items-center justify-center rounded-[10px] border border-[#ECE7DE] bg-white shadow-2xs mt-0.5 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xs">
                    <img src={CiLogo} alt="Coirei" className="size-5.5 object-contain transition-transform duration-500 hover:rotate-6" />
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

      {/* Sticky Bottom Bar for active chat with short, compact minimal composer */}
      <div className="sticky bottom-0 z-20 bg-[#FDFDFC]/95 backdrop-blur-xs px-4 sm:px-6 pb-4 pt-2">
        <div className="w-full max-w-[720px] mx-auto">{compactComposer}</div>
      </div>
    </div>
  );
}
