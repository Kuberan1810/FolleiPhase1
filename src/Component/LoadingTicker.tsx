/**
 * LoadingTicker: a spinner plus a rotating one-line status. Used anywhere a
 * research phase is genuinely still working but has nothing to show yet --
 * so it never just looks like nothing is happening.
 */
import { useEffect, useState } from 'react';

interface LoadingTickerProps {
  messages: string[];
  intervalMs?: number;
  size?: 'sm' | 'lg';
}

export default function LoadingTicker({ messages, intervalMs = 2200, size = 'sm' }: LoadingTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (messages.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), intervalMs);
    return () => clearInterval(id);
  }, [messages, intervalMs]);

  const spinnerSize = size === 'lg' ? 'size-5' : 'size-3.5';
  const textSize = size === 'lg' ? 'text-[13.5px]' : 'text-[12px]';

  return (
    <span className={`inline-flex items-center gap-2 font-medium text-[#C2410C] ${textSize}`}>
      <svg className={`${spinnerSize} animate-spin shrink-0`} viewBox="0 0 24 24" fill="none">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
      </svg>
      <span key={index} className="animate-in fade-in duration-300">
        {messages[index] || 'Working…'}
      </span>
    </span>
  );
}
