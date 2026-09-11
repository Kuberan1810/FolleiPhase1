/**
 * The Follei conversation surface, lifted verbatim from the original
 * GoalDefinition screen: the same hero, bubbles, thinking pill and composer.
 * `children` renders between the transcript and the composer, which is where
 * Home puts its result cards.
 */
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowUp, Plus, X, Copy, CheckCheck } from 'lucide-react';
import FolleiLogo from '../assets/logo/folleinew.svg';

export interface Turn {
  role: 'user' | 'assistant';
  message: string;
}

export default function Chat({
  turns, value, onChange, onSubmit, files, onFiles, busy, thinking, children,
  heading = 'Let’s grow your business',
  subheading = 'Tell Follei who you are, what you run, and your website.',
  placeholder = 'I’m Asha, founder of Acme. We build an LMS. Our website is…',
  suggestions = [], userName = 'OP',
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
}) {
  const upload = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns.length, thinking]);

  const copy = (message: string, index: number) => {
    void navigator.clipboard?.writeText(message).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    }).catch(() => undefined);
  };

  const empty = turns.length === 0;

  const composer = (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center rounded-[24px] border border-[#E6E6E4] bg-white px-4 py-3 min-h-[64px] focus-within:border-gray-400 focus-within:shadow-xs"
    >
      <input
        ref={upload}
        aria-label="Attach product documents"
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.md"
        className="hidden"
        onChange={(event) => onFiles(Array.from(event.target.files || []))}
      />

      {files.map((file, index) => (
        <div
          key={index}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] px-3 py-1 text-[12px] font-medium mb-2 self-start "
        >
          <span className="max-w-[200px] truncate">{file.name}</span>
          <button
            type="button"
            aria-label={`Remove ${file.name}`}
            onClick={() => onFiles(files.filter((_, other) => other !== index))}
            className="hover:text-red-600 focus:outline-none cursor-pointer text-[#94A3B8] ml-0.5"
          >
            <X className="size-3" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-2.5 w-full">
        <button
          type="button"
          disabled={busy}
          aria-label="Attach document"
          onClick={() => upload.current?.click()}
          className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-[#F4F4F0] text-[#4B5563] hover:bg-[#EBEBE8] hover:text-[#111827] cursor-pointer shadow-2xs "
        >
          <Plus className="size-4 stroke-[2.2]" />
        </button>

        <textarea
          aria-label="Message Follei"
          rows={2}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              if (value.trim() || files.length) onSubmit();
            }
          }}
          placeholder={placeholder}
          disabled={busy}
          className="min-w-0 flex-1 resize-none bg-transparent text-[14px] leading-[22px] text-[#16171A] outline-none placeholder:text-[#717378] py-0.5 max-h-[140px] overflow-y-auto"
        />

        <button
          type="submit"
          aria-label="Send prompt"
          disabled={busy || (!value.trim() && !files.length)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#16171A] hover:bg-black text-white disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] cursor-pointer "
        >
          <ArrowUp className="size-4 stroke-[2.5]" />
        </button>
      </div>
    </form>
  );

  if (empty) {
    return (
      <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-screen justify-between bg-[#FDFDFC]">
        <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16 flex flex-col gap-8 flex-1 ">
          <header className="flex flex-col gap-1.5 ">
            <h1 className="text-[28px] font-bold text-[#16171A] tracking-tight">{heading}</h1>
            <p className="text-[13.5px] text-[#717378]">{subheading}</p>
          </header>

          <div className="flex flex-col gap-4">
            {composer}

            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 ">
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
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-screen justify-between bg-[#FDFDFC]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-8 flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-5">
          {turns.map((turn, index) => {
            const isUser = turn.role === 'user';
            return (
              <div key={index} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-white shadow-xs mt-1">
                    <img src={FolleiLogo} alt="" />
                  </div>
                )}

                <div
                  className={`group relative max-w-[85%] sm:max-w-[80%] rounded-[22px] px-5 py-3.5 shadow-2xs ${ isUser ? 'bg-[#16171A] text-white rounded-tr-xs'
                      : 'bg-white border border-[#E6E6E4] text-[#16171A] rounded-tl-xs hover:border-[#D1D5DB]'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-gray-100">
                      <span className="text-[11px] font-semibold tracking-wider text-[#0D9488] uppercase flex items-center gap-1">
                        Follei AI
                      </span>
                      <button
                        type="button"
                        onClick={() => copy(turn.message, index)}
                        className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-[#16171A] cursor-pointer p-0.5"
                        title="Copy reply"
                      >
                        {copiedIndex === index
                          ? <CheckCheck className="size-3.5 text-[#0D9488]" />
                          : <Copy className="size-3.5" />}
                      </button>
                    </div>
                  )}

                  <p className="whitespace-pre-wrap text-[14.5px] leading-relaxed font-normal">{turn.message}</p>
                </div>

                {isUser && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] shadow-2xs mt-1 font-semibold text-[11px]">
                    {userName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}

          {thinking && (
            <div className="flex gap-3 justify-start ">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full mt-1 p-1">
                <img src={FolleiLogo} alt="Follei AI" className="size-full object-contain " />
              </div>
              <div className="relative overflow-hidden rounded-[22px] rounded-tl-xs bg-white/50 border border-[#E6E6E4] px-5 py-3 shadow-xs flex items-center gap-3">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#EAEAEA]/80 to-transparent pointer-events-none" />
                <span className="relative text-[13.5px] text-[#717378]">{thinking}</span>
              </div>
            </div>
          )}
        </div>

        {children}
        <div ref={bottom} />
      </div>

      <div className="sticky bottom-0 z-20 bg-[#FDFDFC]/95 px-4 sm:px-6 pb-5 pt-3">
        <div className="w-full max-w-5xl mx-auto">{composer}</div>
      </div>
    </div>
  );
}
