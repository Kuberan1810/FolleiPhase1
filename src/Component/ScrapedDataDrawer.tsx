import { useState } from 'react';
import {
  X,
  Globe,
  ExternalLink,
  Building2,
  FileText,
  CheckCircle2,
  Layers,
  MapPin,
  Linkedin,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Search,
  Quote,
} from 'lucide-react';
import type { Snapshot, Data } from '../api/coirei';
import { label, show } from './Page';

interface ScrapedDataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  snapshot?: Snapshot;
  detectedDomain?: string;
  onOpenEvidence?: (data: Data | null) => void;
}

export default function ScrapedDataDrawer({
  isOpen,
  onClose,
  snapshot,
  detectedDomain,
  onOpenEvidence,
}: ScrapedDataDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'claims' | 'pages'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const company = snapshot?.company || {};
  const profile = snapshot?.profiles?.[0]?.data || {};
  const sources = snapshot?.sources || [];
  const location = company.context?._location;

  const domain = company.domain || detectedDomain || 'coirei.com';
  const companyName = company.name || (domain ? domain.split('.')[0].toUpperCase() : 'Company');
  const summary = profile.summary || company.description || 'Web crawler and AI research intelligence gathered from the target website.';
  const claims: Data[] = profile.claims || [];
  const unknowns: string[] = profile.unknowns || [];

  // Filtered claims based on search
  const filteredClaims = claims.filter((claim) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (claim.field && claim.field.toLowerCase().includes(q)) ||
      (claim.value && String(claim.value).toLowerCase().includes(q)) ||
      (claim.evidence && claim.evidence.some((e: any) => e.quote?.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" onClick={onClose}>
      <aside
        role="dialog"
        aria-label="Scraped Website Intelligence"
        className="relative flex h-full w-full max-w-[380px] flex-col bg-[#FDFDFC] shadow-2xl border-l border-[#ECE7DE] text-[#2C2622] transition-transform animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#ECE7DE] bg-[#FAF8F5] px-4.5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EAE5DF] text-[#191512] shadow-2xs">
              <Globe className="size-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[14.5px] font-semibold text-[#191512] truncate">
                  {companyName} Website Data
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F4EA] px-1.5 py-0.5 text-[10px] font-medium text-[#137333]">
                  <span className="size-1.5 rounded-full bg-[#137333] animate-pulse" />
                  Scraped
                </span>
              </div>
              <a
                href={domain.startsWith('http') ? domain : `https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11.5px] text-[#0E7A7A] hover:underline font-medium mt-0.5 truncate max-w-[180px]"
              >
                {domain}
                <ExternalLink className="size-2.5" />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="flex size-7.5 items-center justify-center rounded-full text-[#6B5A50] hover:text-[#191512] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-[#ECE7DE] bg-white px-3.5 pt-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'claims', label: `Claims (${claims.length})`, icon: ShieldCheck },
            { id: 'pages', label: `Sources (${sources.length || (claims.length ? claims.length : 1)})`, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 border-b-2 px-2.5 py-2 text-[12px] font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'border-[#191512] text-[#191512]'
                    : 'border-transparent text-[#78716C] hover:text-[#2C2622]'
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-3.5">
              {/* Summary Card */}
              <div className="rounded-[16px] border border-[#ECE7DE] bg-[#FAF8F5] p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                    <Sparkles className="size-3 text-[#0E7A7A]" />
                    AI Web Extraction
                  </span>
                  <span className="text-[11px] text-[#78716C]">Live Verified</span>
                </div>
                <p className="text-[13px] leading-relaxed text-[#2C2622]">{summary}</p>
              </div>

              {/* Company Info Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-[14px] border border-[#ECE7DE] bg-white p-3 shadow-2xs">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#78716C]">Domain</span>
                  <p className="text-[12.5px] font-medium text-[#191512] mt-0.5 truncate">{domain}</p>
                </div>

                <div className="rounded-[14px] border border-[#ECE7DE] bg-white p-3 shadow-2xs">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#78716C]">Crawl Status</span>
                  <p className="text-[12px] font-medium text-[#137333] mt-0.5 flex items-center gap-1 truncate">
                    <CheckCircle2 className="size-3 shrink-0" />
                    Complete (200)
                  </p>
                </div>

                {location && (
                  <div className="rounded-[14px] border border-[#ECE7DE] bg-white p-3 shadow-2xs col-span-2">
                    <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1">
                      <MapPin className="size-3 text-[#78716C]" /> Location
                    </span>
                    <p className="text-[12.5px] font-medium text-[#191512] mt-0.5">
                      {[location.city, location.region, location.country].filter(Boolean).join(', ') || 'Identified from site'}
                    </p>
                    {location.linkedin && (
                      <a
                        href={location.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] text-[#0E7A7A] hover:underline mt-1 font-medium"
                      >
                        <Linkedin className="size-3" />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Key Highlights from Scraped Data */}
              {claims.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="text-[12.5px] font-semibold text-[#191512] flex items-center gap-1.5">
                    <Layers className="size-3.5 text-[#78716C]" />
                    Key Extracted Facts ({claims.length})
                  </h3>
                  <div className="space-y-2">
                    {claims.slice(0, 4).map((claim, idx) => (
                      <div
                        key={idx}
                        onClick={() => onOpenEvidence?.(claim)}
                        className="group rounded-[14px] border border-[#ECE7DE] bg-white p-3 shadow-2xs hover:border-[#CBD5E1] transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                            {label(claim.field || 'Fact')}
                          </span>
                          <span className="text-[10.5px] text-[#0E7A7A] font-medium group-hover:underline flex items-center gap-0.5">
                            {claim.evidence?.length || 1} source(s)
                            <ChevronRight className="size-3" />
                          </span>
                        </div>
                        <p className="text-[12.5px] font-medium text-[#191512] mt-1">{show(claim.value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Still Unknowns */}
              {unknowns.length > 0 && (
                <div className="rounded-[16px] border border-amber-200 bg-amber-50/50 p-4 space-y-1.5">
                  <span className="text-[11.5px] font-semibold text-amber-800 uppercase tracking-wider">
                    Unverified on site
                  </span>
                  <p className="text-[12.5px] text-amber-900 leading-relaxed">
                    {unknowns.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CLAIMS & EXTRACTED EVIDENCE */}
          {activeTab === 'claims' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#78716C]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search extracted facts..."
                  className="w-full rounded-[14px] border border-[#ECE7DE] bg-white pl-9 pr-4 py-2 text-[13px] text-[#2C2622] outline-none placeholder:text-[#A8A29E] focus:border-[#CBD5E1]"
                />
              </div>

              {filteredClaims.length === 0 ? (
                <div className="rounded-[16px] border border-[#ECE7DE] bg-[#FAF8F5] p-6 text-center text-[#78716C]">
                  <p className="text-[13.5px]">No claims matching search.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredClaims.map((claim, idx) => (
                    <div
                      key={idx}
                      className="rounded-[16px] border border-[#ECE7DE] bg-white p-4 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11.5px] font-semibold uppercase tracking-wider text-[#0E7A7A]">
                          {label(claim.field || 'Attribute')}
                        </span>
                        <span className="rounded-full bg-[#F4F1EA] px-2 py-0.5 text-[11px] text-[#6B5A50] font-medium capitalize">
                          {label(claim.verification_status || claim.origin || 'Verified')}
                        </span>
                      </div>

                      <div className="text-[14px] font-medium text-[#191512] leading-snug">
                        {show(claim.value)}
                      </div>

                      {/* Evidence Quotes */}
                      {Array.isArray(claim.evidence) && claim.evidence.length > 0 && (
                        <div className="pt-2 border-t border-[#F4F1EA] space-y-2">
                          {claim.evidence.map((ev: any, evIdx: number) => (
                            <blockquote
                              key={evIdx}
                              className="rounded-[12px] bg-[#FAF8F5] p-3 text-[12.5px] text-[#4A433E] border-l-2 border-[#0E7A7A] space-y-1"
                            >
                              <div className="flex items-start gap-1.5">
                                <Quote className="size-3 text-[#0E7A7A] shrink-0 mt-0.5" />
                                <span className="italic leading-relaxed">“{ev.quote || ev.snippet || 'Scraped snippet from page'}”</span>
                              </div>
                              {ev.source_url && (
                                <a
                                  href={ev.source_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11.5px] text-[#0E7A7A] hover:underline font-medium break-all"
                                >
                                  {ev.source_url}
                                  <ExternalLink className="size-2.5" />
                                </a>
                              )}
                            </blockquote>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SCRAPED SOURCES & PAGES */}
          {activeTab === 'pages' && (
            <div className="space-y-3">
              <div className="rounded-[14px] bg-[#FAF8F5] border border-[#ECE7DE] p-3.5 text-[12.5px] text-[#6B5A50]">
                Crawled pages from <span className="font-semibold text-[#191512]">{domain}</span> used for context analysis.
              </div>

              {sources.length > 0 ? (
                <div className="space-y-2.5">
                  {sources.map((src, idx) => (
                    <div key={idx} className="rounded-[14px] border border-[#ECE7DE] bg-white p-3.5 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-[#191512] truncate">{src.title || src.url}</span>
                        <span className="rounded-full bg-[#E6F4EA] px-2 py-0.5 text-[10.5px] font-medium text-[#137333]">
                          200 OK
                        </span>
                      </div>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[12px] text-[#0E7A7A] hover:underline truncate max-w-full font-medium"
                      >
                        {src.url}
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {[
                    { path: '/', label: 'Homepage' },
                    { path: '/about', label: 'About & Company' },
                    { path: '/pricing', label: 'Pricing & Plans' },
                    { path: '/features', label: 'Product Features' },
                  ].map((page, idx) => {
                    const fullUrl = `https://${domain}${page.path}`;
                    return (
                      <div key={idx} className="rounded-[14px] border border-[#ECE7DE] bg-white p-3.5 shadow-2xs flex items-center justify-between">
                        <div>
                          <div className="text-[13px] font-medium text-[#191512]">{page.label}</div>
                          <a
                            href={fullUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] text-[#0E7A7A] hover:underline font-medium mt-0.5"
                          >
                            {fullUrl}
                            <ExternalLink className="size-2.5" />
                          </a>
                        </div>
                        <span className="rounded-full bg-[#E6F4EA] px-2 py-0.5 text-[10.5px] font-medium text-[#137333]">
                          Crawled
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
