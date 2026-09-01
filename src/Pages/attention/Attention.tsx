import React, { useState, useMemo } from 'react';
import {
  AttentionHeader,
  AttentionTable,
} from './section';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import { useAttentionLeads } from '../../hooks/useLeads';
import type { AttentionLead } from './types';

export const AttentionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { workspaceId } = useActiveWorkspace();
  const { leads: apiLeads } = useAttentionLeads(workspaceId);

  // The endpoint already returns them hottest and longest-silent first, so
  // this only reshapes the wire format for the table.
  const attentionLeads: AttentionLead[] = useMemo(
    () =>
      apiLeads.map((lead) => {
        const display = lead.name || lead.email || 'Unnamed lead';
        const parts = display.trim().split(/\s+/).filter(Boolean);
        return {
          id: lead.id,
          leadNumber: lead.row_index + 1,
          name: display,
          email: lead.email || '',
          phone: lead.phone || '',
          initials:
            parts.length >= 2
              ? (parts[0][0] + parts[1][0]).toUpperCase()
              : display.slice(0, 2).toUpperCase(),
          intent: (lead.temperature ?? 'COLD') as AttentionLead['intent'],
        };
      }),
    [apiLeads],
  );

  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return attentionLeads;
    const q = searchQuery.toLowerCase();
    return attentionLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.intent.toLowerCase().includes(q)
    );
  }, [searchQuery, attentionLeads]);

  return (
    <div className="flex-1 px-4 sm:px-8 py-6 lg:py-8 w-full flex flex-col min-h-0 overflow-hidden">
      {/* Header */}
      <div className="shrink-0">
        <AttentionHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Table */}
      <AttentionTable
        leads={filteredLeads}
        totalCount={1248}
        startRange={1}
        endRange={filteredLeads.length}
      />
    </div>
  );
};

export default AttentionPage;
