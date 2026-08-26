/**
 * Leads data + mutations. Owns loading/error/refetch so pages stay
 * presentational, per the api -> hook -> page split.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorMessage } from '../lib/axios';
import { queryKeys } from '../lib/queryClient';
import {
  createLead,
  deleteLead,
  getLead,
  listAttentionLeads,
  importLeadsCsv,
  listLeads,
  updateLead,
  type LeadWritePayload,
} from '../api/leads/leads.api';

export const useLeads = (workspaceId: string | undefined) => {
  const query = useQuery({
    queryKey: queryKeys.leads(workspaceId ?? ''),
    queryFn: () => listLeads(workspaceId!),
    // Without a workspace there is no endpoint to call; staying disabled keeps
    // the hook safe to mount before one is selected.
    enabled: Boolean(workspaceId),
  });

  return {
    leads: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? errorMessage(query.error, 'Could not load leads') : null,
    refetch: query.refetch,
  };
};

export const useLead = (workspaceId: string | undefined, leadId: string | undefined) => {
  const query = useQuery({
    queryKey: queryKeys.lead(workspaceId ?? '', leadId ?? ''),
    queryFn: () => getLead(workspaceId!, leadId!),
    enabled: Boolean(workspaceId && leadId),
  });
  return {
    lead: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error ? errorMessage(query.error, 'Could not load this lead') : null,
  };
};

export const useAttentionLeads = (workspaceId: string | undefined, limit = 50) => {
  const query = useQuery({
    queryKey: queryKeys.attention(workspaceId ?? ''),
    queryFn: () => listAttentionLeads(workspaceId!, limit),
    enabled: Boolean(workspaceId),
  });
  return {
    leads: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? errorMessage(query.error, 'Could not load attention leads') : null,
  };
};

/** Create/update/delete/import. Each invalidates the list and the attention
 *  feed, since a status or score change can move a lead in or out of it. */
export const useLeadMutations = (workspaceId: string | undefined) => {
  const client = useQueryClient();

  const invalidate = () => {
    client.invalidateQueries({ queryKey: queryKeys.leads(workspaceId ?? '') });
    client.invalidateQueries({ queryKey: queryKeys.attention(workspaceId ?? '') });
  };

  const create = useMutation({
    mutationFn: (payload: LeadWritePayload) => createLead(workspaceId!, payload),
    onSuccess: () => {
      invalidate();
      toast.success('Lead added');
    },
    onError: (error) => toast.error(errorMessage(error, 'Could not add the lead')),
  });

  const update = useMutation({
    mutationFn: ({ leadId, payload }: { leadId: string; payload: LeadWritePayload }) =>
      updateLead(workspaceId!, leadId, payload),
    onSuccess: (_data, variables) => {
      invalidate();
      client.invalidateQueries({ queryKey: queryKeys.lead(workspaceId ?? '', variables.leadId) });
    },
    onError: (error) => toast.error(errorMessage(error, 'Could not update the lead')),
  });

  const remove = useMutation({
    mutationFn: (leadId: string) => deleteLead(workspaceId!, leadId),
    onSuccess: () => {
      invalidate();
      toast.success('Lead deleted');
    },
    onError: (error) => toast.error(errorMessage(error, 'Could not delete the lead')),
  });

  const importCsv = useMutation({
    mutationFn: (file: File) => importLeadsCsv(workspaceId!, file),
    onSuccess: (result) => {
      invalidate();
      const skipped = result.skipped_duplicates;
      if (result.imported === 0 && skipped > 0) {
        // Every row already existed. Reporting this as a success reading
        // "Imported 0 leads" looks like a failure.
        toast(`Already imported — all ${skipped} lead${skipped === 1 ? '' : 's'} are in this project`, {
          icon: 'ℹ️',
        });
        return;
      }
      toast.success(
        `Imported ${result.imported} lead${result.imported === 1 ? '' : 's'}` +
          (skipped ? ` · skipped ${skipped} already here` : ''),
      );
    },
    onError: (error) => toast.error(errorMessage(error, 'Could not import the CSV')),
  });

  return { create, update, remove, importCsv };
};
