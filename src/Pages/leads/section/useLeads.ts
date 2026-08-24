import { useState, useMemo } from 'react';
import { type Lead, type LeadFilterState } from '../types';
import { initialMockLeads } from '../data/mockLeads';

const INITIAL_FILTERS: LeadFilterState = {
  aiSearch: '',
  statuses: [],
  score: null,
  sources: [],
  lastInteraction: null,
  createdDate: null,
};

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(initialMockLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<LeadFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const pageSize = 10;

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.statuses.length;
    if (filters.score) count += 1;
    count += filters.sources.length;
    if (filters.lastInteraction) count += 1;
    if (filters.createdDate) count += 1;
    if (filters.aiSearch.trim()) count += 1;
    return count;
  }, [filters]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Text search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = lead.name.toLowerCase().includes(q);
        const matchEmail = lead.email.toLowerCase().includes(q);
        const matchStatus = lead.status.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchStatus) return false;
      }

      // 2. AI semantic/keyword filter
      if (filters.aiSearch.trim()) {
        const aiQ = filters.aiSearch.toLowerCase();
        const fullString = `${lead.name} ${lead.email} ${lead.status} ${lead.score || ''} ${lead.source || ''}`.toLowerCase();
        if (!fullString.includes(aiQ) && !aiQ.split(' ').some((word) => word.length > 2 && fullString.includes(word))) {
          return false;
        }
      }

      // 3. Status filter
      if (filters.statuses.length > 0) {
        if (!filters.statuses.includes(lead.status)) return false;
      }

      // 4. Score filter
      if (filters.score) {
        if (lead.score !== filters.score) return false;
      }

      // 5. Source filter
      if (filters.sources.length > 0) {
        if (!lead.source || !filters.sources.includes(lead.source)) return false;
      }

      // 6. Last Interaction
      if (filters.lastInteraction) {
        if (lead.lastInteraction !== filters.lastInteraction) return false;
      }

      // 7. Created Date
      if (filters.createdDate) {
        if (lead.createdDate !== filters.createdDate) return false;
      }

      return true;
    });
  }, [leads, searchQuery, filters]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));

  // Paginated leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  // Handle Add Lead
  const handleAddLead = (newLead: Omit<Lead, 'id' | 'leadNumber'>) => {
    const created: Lead = {
      ...newLead,
      id: Date.now().toString(),
      leadNumber: leads.length + 1,
    };
    setLeads((prev) => [created, ...prev]);
  };

  // Filter setters
  const handleApplyFilters = (newFilters: LeadFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

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
    handleApplyFilters,
    handleResetFilters,
    isAddModalOpen,
    setIsAddModalOpen,
    handleAddLead,
  };
};
export default useLeads;
