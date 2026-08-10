import React, { useRef, useState, useEffect, useCallback } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import type { UnderstandingCategory, ChecklistItem } from "./types";

interface UnderstandingChecklistSectionProps {
  categories: UnderstandingCategory[];
  showTitle?: boolean;
  title?: string;
  subtitle?: string;
  onItemClick?: (item: ChecklistItem) => void;
}

const UnderstandingChecklistSection: React.FC<UnderstandingChecklistSectionProps> = ({
  categories,
  showTitle = true,
  title = "What Follei will understand",
  subtitle = "Follei automatically analyzes your files and builds business context for your AI-powered sales workspace.",
  onItemClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(64);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  // Sync thumb position with scroll
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !trackRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const trackHeight = trackRef.current.clientHeight;

    if (scrollHeight <= clientHeight) {
      setThumbHeight(trackHeight);
      setThumbTop(0);
      return;
    }

    const calculatedThumbHeight = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      40
    );
    setThumbHeight(calculatedThumbHeight);

    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - calculatedThumbHeight;
    const currentThumbTop = (scrollTop / maxScroll) * maxThumbTop;
    setThumbTop(currentThumbTop);
  }, []);

  // Update on resize or categories change
  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [categories, handleScroll]);

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -140, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 140, behavior: "smooth" });
    }
  };

  // Click on scroll track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !scrollContainerRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const { scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;

    const targetScroll = (clickY / trackHeight) * maxScroll;
    scrollContainerRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Drag thumb
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    if (scrollContainerRef.current) {
      dragStartScrollTop.current = scrollContainerRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current || !scrollContainerRef.current) return;
      const deltaY = e.clientY - dragStartY.current;
      const trackHeight = trackRef.current.clientHeight;
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;

      if (maxThumbTop > 0) {
        const scrollDelta = (deltaY / maxThumbTop) * maxScroll;
        scrollContainerRef.current.scrollTop = dragStartScrollTop.current + scrollDelta;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, thumbHeight]);

  return (
    <div className="w-full">
      {/* Header Info */}
      {showTitle && (
        <div className="mb-4">
          <h2 className="text-[15px] sm:text-[16px] font-bold text-[#0F172A] tracking-[-0.01em]">
            {title}
          </h2>
          <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}

      {/* Main Card Container */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden flex flex-row">
        {/* Left: Scrollable Categories List */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 p-6 sm:p-7 max-h-[520px] overflow-y-auto no-scrollbar space-y-6"
        >
          {categories.map((category) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                  {category.title}
                </h3>
              </div>

              {/* Items List */}
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      if (item.status === "found" || item.status === "not_found") {
                        onItemClick?.(item);
                      }
                    }}
                    className={`flex items-center justify-between text-[13px] sm:text-[14px] -mx-2 px-2 py-1.5 rounded-lg transition-colors group ${
                      item.status === "found" || item.status === "not_found"
                        ? "hover:bg-[#F8FAFC] cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    {/* Left: Icon Marker + Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      {item.status === "idle" && (
                        <span className="w-4 h-4 rounded-full border border-[#CBD5E1] bg-white shrink-0 inline-block group-hover:border-[#94A3B8] transition-colors" />
                      )}

                      {item.status === "analyzing" && (
                        <svg
                          className="animate-spin h-4 w-4 text-[#0284C7] shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}

                      {item.status === "found" && (
                        <span className="w-4 h-4 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      )}

                      {item.status === "not_found" && (
                        <span className="w-4 h-4 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                          <X size={11} strokeWidth={3} />
                        </span>
                      )}

                      <span
                        className={`truncate font-normal group-hover:text-[#0284C7] transition-colors ${
                          item.status === "analyzing" || item.status === "found"
                            ? "text-[#0F172A] font-medium"
                            : item.status === "not_found"
                            ? "text-[#475569]"
                            : "text-[#334155]"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {/* Right: Status text / Discovered count */}
                    <div className="shrink-0 ml-3 text-right">
                      {item.status === "analyzing" && (
                        <span className="text-[12px] font-medium text-[#0284C7]">
                          Analyzing
                        </span>
                      )}

                      {item.status === "found" && (
                        <span className="text-[12px] text-[#64748B]">
                          {item.resultText || "Found"}
                        </span>
                      )}

                      {item.status === "not_found" && (
                        <span className="text-[12px] text-[#94A3B8]">
                          {item.resultText || "Not found"}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right: Custom Dedicated Scrollbar Rail */}
        <div
          className="w-[30px] shrink-0 select-none flex flex-col items-center justify-between py-3"
          style={{
            backgroundColor: "rgba(249, 250, 251, 0.8)",
            borderLeft: "1px solid #F9FAFB",
          }}
        >
          {/* Top Chevron */}
          <button
            type="button"
            onClick={scrollUp}
            className="text-[#94A3B8] hover:text-[#0F172A] p-0.5 transition-colors cursor-pointer"
            aria-label="Scroll up"
          >
            <ChevronUp size={15} strokeWidth={2.4} />
          </button>

          {/* Scroll Track */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            className="relative flex-1 w-full my-1 flex justify-center cursor-pointer"
          >
            {/* Scroll Thumb Pill */}
            <div
              onMouseDown={handleThumbMouseDown}
              className="absolute w-[6px] rounded-full bg-[#94A3B8] hover:bg-[#64748B] transition-colors cursor-grab active:cursor-grabbing"
              style={{
                height: `${thumbHeight}px`,
                transform: `translateY(${thumbTop}px)`,
              }}
            />
          </div>

          {/* Bottom Chevron */}
          <button
            type="button"
            onClick={scrollDown}
            className="text-[#94A3B8] hover:text-[#0F172A] p-0.5 transition-colors cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown size={15} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingChecklistSection;
