import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { folleiApi, type Lead as ApiLead } from '../../../api/follei';
import { type Lead, type LeadFilterState } from '../types';

const INITIAL_FILTERS: LeadFilterState = {
  aiSearch: '',
  statuses: [],
  score: null,
  sources: [],
  lastInteraction: null,
  createdDate: null,
};

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'L';
}

function toViewLead(lead: ApiLead, index: number): Lead {
  const name = lead.name || lead.reference_number;
  return {
    id: lead.id,
    leadNumber: index + 1,
    name,
    email: lead.email || lead.phone || lead.reference_number,
    initials: initials(name),
    date: new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
      .format(new Date(lead.created_at)),
    status: 'Imported',
    source: lead.source || 'Import',
    createdDate: lead.created_at,
  };
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<LeadFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const load = useCallback(async () => {
    setError(null);
    try {
      const businesses = await folleiApi.listBusinesses();
      if (!businesses.length) {
        setLeads([]);
        setWorkspaceId(null);
        return;
      }
      const workspaces = await folleiApi.listWorkspaces(businesses[0].id);
      const workspace = workspaces[0];
      if (!workspace) {
        setLeads([]);
        setWorkspaceId(null);
        return;
      }
      setWorkspaceId(workspace.id);
      const rows = await folleiApi.listLeads(workspace.id);
      setLeads(rows.map(toViewLead));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load leads.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const importLeadCsv = async (file: File) => {
    if (!workspaceId) {
      toast.error('Create Project 1 before importing leads.');
      return;
    }
    setLoading(true);
    try {
      const result = await folleiApi.uploadLeads(workspaceId, file);
      toast.success(`${result.imported} leads imported.`);
      const rows = await folleiApi.listLeads(workspaceId);
      setLeads(rows.map(toViewLead));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lead import failed.');
    } finally {
      setLoading(false);
    }
  };

  const activeFilterCount = useMemo(() => {
    let count = filters.statuses.length + filters.sources.length;
    if (filters.score) count += 1;
    if (filters.lastInteraction) count += 1;
    if (filters.createdDate) count += 1;
    if (filters.aiSearch.trim()) count += 1;
    return count;
  }, [filters]);

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const searchable = `${lead.name} ${lead.email} ${lead.status} ${lead.source || ''}`.toLowerCase();
    if (searchQuery.trim() && !searchable.includes(searchQuery.toLowerCase())) return false;
    if (filters.aiSearch.trim() && !searchable.includes(filters.aiSearch.toLowerCase())) return false;
    if (filters.statuses.length && !filters.statuses.includes(lead.status)) return false;
    if (filters.sources.length && (!lead.source || !filters.sources.includes(lead.source))) return false;
    return true;
  }), [leads, searchQuery, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredLeads, currentPage]);

  return {
    leads: paginatedLeads,
    totalCount: filteredLeads.length,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    filters,
    activeFilterCount,
    handleApplyFilters: (next: LeadFilterState) => { setFilters(next); setCurrentPage(1); },
    handleResetFilters: () => { setFilters(INITIAL_FILTERS); setCurrentPage(1); },
    importLeadCsv,
    loading,
    error,
    retry: load,
  };
};

export default useLeads;
