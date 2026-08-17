import React from 'react';

interface DynamicFactPayloadViewerProps {
  factType: string;
  payload: Record<string, unknown>;
}

export const DynamicFactPayloadViewer: React.FC<DynamicFactPayloadViewerProps> = ({ factType, payload }) => {
  // Render fields beautifully instead of just JSON stringify
  
  const entries = Object.entries(payload).filter((entry) => entry[1] !== undefined && entry[1] !== null);

  if (entries.length === 0) {
    return <span className="text-gray-400 italic">No details available</span>;
  }

  return (
    <div data-fact-type={factType} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2 bg-gray-50 p-3 rounded-md border border-gray-100">
      {entries.map(([key, value]) => {
        const displayLabel = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        let displayValue: React.ReactNode = String(value);

        if (Array.isArray(value)) {
          displayValue = value.join(', ');
        } else if (typeof value === 'object') {
          displayValue = JSON.stringify(value, null, 2);
        }

        // Special styling for long text like 'description'
        const isLongText = typeof value === 'string' && value.length > 50;

        return (
          <div key={key} className={`${isLongText ? 'sm:col-span-2' : ''}`}>
            <dt className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-0.5">{displayLabel}</dt>
            <dd className="text-sm text-gray-900 break-words">{displayValue}</dd>
          </div>
        );
      })}
    </div>
  );
};
