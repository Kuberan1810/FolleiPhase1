"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronRight, FileText, Code2, CreditCard, Puzzle } from "lucide-react";

const docs = [
  { icon: "doc", category: "Getting started", title: "Quick start guide", desc: "Set up your account in minutes" },
  { icon: "doc", category: "Getting started", title: "Onboarding checklist", desc: "Complete your workspace setup" },
  { icon: "api", category: "API reference", title: "Authentication overview", desc: "API keys, OAuth, and tokens" },
  { icon: "api", category: "API reference", title: "Rate limits & quotas", desc: "Understand usage restrictions" },
  { icon: "billing", category: "Billing", title: "Upgrade your plan", desc: "Compare plans and pricing" },
  { icon: "billing", category: "Billing", title: "Invoice & receipts", desc: "Download past invoices" },
  { icon: "integration", category: "Integrations", title: "Slack integration", desc: "Connect Slack to your workspace" },
  { icon: "integration", category: "Integrations", title: "Webhooks setup", desc: "Configure real-time event notifications" },
  { icon: "doc", category: "Security", title: "SSO configuration", desc: "Set up single sign-on for your team" },
  { icon: "doc", category: "Security", title: "Two-factor authentication", desc: "Secure your account with 2FA" },
];

const iconMap = {
  doc: FileText,
  api: Code2,
  billing: CreditCard,
  integration: Puzzle,
};

const quickFilters = ["Getting started", "API reference", "Billing", "Integrations"];

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-blue-100 text-blue-800 rounded px-0.5">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function SaasSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? docs
        .filter(
          (d) =>
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.category.toLowerCase().includes(query.toLowerCase()) ||
            d.desc.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  }

  return (
    <div ref={wrapperRef} className="relative max-w-[480px] w-full">
      {/* Input */}
      <div className="relative">
        <Search
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            open && query ? "text-[#004370]" : "text-[#6B7280]"
          }`}
          size={16}
          strokeWidth={2}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search customer documentation..."
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => { if (query.trim()) setOpen(true); }}
          onKeyDown={handleKey}
          className={`w-full pl-10 pr-9 py-2.5 rounded-xl text-[14px] font-semibold text-[#004370] placeholder:text-[#6B7280] placeholder:font-medium transition-all outline-none ${
            open && query
              ? "bg-white border-[1.5px] border-[#004370] focus:outline-none focus:ring-1"
              : "bg-[#EFF4FF] border-[1.5px] border-[#E0E8FF] focus:bg-white focus:border-[#004370] focus:outline-none focus:ring-1"
          }`}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#004370] transition-colors cursor-pointer"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && query.trim() && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-gray-200 rounded-xl z-50 p-1.5 shadow-sm">
          {filtered.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-4">No results found</p>
          ) : (
            <ul>
              {filtered.map((item, i) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <li
                    key={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(-1)}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                      activeIndex === i ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-700">
                      <Icon size={13} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-900 truncate">
                        {highlight(item.title, query)}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {item.category} · {item.desc}
                      </p>
                    </div>
                    <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
                  </li>
                );
              })}
            </ul>
          )}

          {/* Quick filters */}
          <div className="border-t border-gray-100 mt-1 pt-1.5 flex gap-1.5 flex-wrap px-1">
            {quickFilters.map((f) => (
              <button
                key={f}
                onClick={() => { setQuery(f); setActiveIndex(-1); }}
                className="text-[11px] font-medium text-gray-400 bg-gray-50 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}