export function OutlookLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Microsoft Outlook">
      <path fill="#0364B8" d="M28 12h16.2c1 0 1.8.8 1.8 1.8v20.4c0 1-.8 1.8-1.8 1.8H28V12z" />
      <path fill="#0A2767" d="M46 15.2v18.3l-9.6-4.2L46 15.2z" opacity=".35" />
      <path fill="#28A8EA" d="M28 12h9v9h-9zM37 21h9v9h-9zM28 21h9v9h-9z" opacity=".9" />
      <path fill="#14447D" d="M28 30h9v6h-9z" opacity=".9" />
      <path fill="#0078D4" d="M2 9.6 25.2 6c.9-.1 1.8.6 1.8 1.6v32.8c0 1-.9 1.7-1.8 1.6L2 38.4c-.7-.1-1.2-.7-1.2-1.4V11c0-.7.5-1.3 1.2-1.4z" />
      <path
        fill="#fff"
        d="M13.9 15.4c-4 0-6.6 3.4-6.6 8.2s2.5 8.1 6.4 8.1 6.5-3.4 6.5-8.3c0-4.7-2.4-8-6.3-8zm-.1 13c-2.1 0-3.4-2-3.4-4.9s1.3-4.9 3.4-4.9 3.3 2 3.3 4.8c0 3-1.2 5-3.3 5z"
      />
    </svg>
  );
}

export function FolleiLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Follei">
      <rect x="2" y="2" width="44" height="44" rx="13" fill="#2563EB" />
      <path
        d="M17 33V16.5c0-1.4 1.1-2.5 2.5-2.5H32v3.8h-11v5h9.3V26H21v7h-4z"
        fill="#FFFFFF"
      />
      <circle cx="31" cy="31.5" r="2.6" fill="#FFFFFF" opacity=".85" />
    </svg>
  );
}