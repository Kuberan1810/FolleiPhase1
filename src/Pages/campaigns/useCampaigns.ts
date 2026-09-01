import { useState, useEffect, useCallback } from 'react';
import type { Campaign } from './types';
import { useActiveWorkspace } from '../../hooks/useWorkspace';
import { useLeads } from '../../hooks/useLeads';

const STORAGE_KEY = 'follei_campaigns';

export const useCampaigns = () => {
  const { workspace } = useActiveWorkspace();
  const { leads } = useLeads(workspace?.id);
  const [customCampaigns, setCustomCampaigns] = useState<Campaign[]>([]);

  // Load from localStorage on mount & listen to storage events
  useEffect(() => {
    const loadCampaigns = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCustomCampaigns(parsed);
          }
        }
      } catch (e) {
        console.error('Error loading campaigns:', e);
      }
    };

    loadCampaigns();
    window.addEventListener('storage', loadCampaigns);
    return () => window.removeEventListener('storage', loadCampaigns);
  }, []);

  // Add campaign helper
  const addCampaign = useCallback((newCampaign: Omit<Campaign, 'id'>) => {
    const item: Campaign = {
      ...newCampaign,
      id: `camp_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setCustomCampaigns((prev) => {
      const updated = [item, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving campaign:', e);
      }
      return updated;
    });

    return item;
  }, []);

  // Delete campaign by ID
  const deleteCampaign = useCallback((campaignId: string) => {
    setCustomCampaigns((prev) => {
      const updated = prev.filter((c) => c.id !== campaignId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error deleting campaign:', e);
      }
      return updated;
    });
  }, []);

  // Clear all custom campaigns
  const clearCampaigns = useCallback(() => {
    setCustomCampaigns([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing campaigns:', e);
    }
  }, []);

  const defaultCampaigns: Campaign[] = workspace
    ? [
        {
          id: workspace.id,
          name: `${workspace.name || 'Sales'} Voice Outreach`,
          channels: ['Call'],
          audienceCount: leads.length || 0,
          audienceLabel: `${leads.length} Leads`,
          status: workspace.stage === 'VERIFIED' ? 'Active' : 'Draft',
        },
      ]
    : [];

  const allCampaigns = [...customCampaigns, ...defaultCampaigns];

  return {
    campaigns: allCampaigns,
    addCampaign,
    deleteCampaign,
    clearCampaigns,
    customCampaigns,
  };
};

export default useCampaigns;
