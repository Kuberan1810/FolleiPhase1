/**
 * Workspace documents with live ingestion status.
 *
 * Ingestion runs as a background task on the server, so the only way to know
 * where it got to is to ask. This polls while anything is still in flight and
 * stops once everything has settled, so an idle workspace costs nothing.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorMessage } from '../lib/axios';
import { listDocuments, reingestAllDocuments, type WorkspaceDocument } from '../api/setup/setup.api';
import { queryKeys } from '../lib/queryClient';

const IN_FLIGHT = new Set(['UPLOADED', 'PROCESSING']);

export const useDocuments = (workspaceId: string | undefined) => {
  const query = useQuery({
    queryKey: queryKeys.documents(workspaceId ?? ''),
    queryFn: () => listDocuments(workspaceId!),
    enabled: Boolean(workspaceId),
    refetchInterval: (q) => {
      const docs = (q.state.data ?? []) as WorkspaceDocument[];
      // Poll only while work is outstanding. Embedding is slow on a CPU-only
      // host, so 4s is often enough to see a change without hammering the API.
      return docs.some((d) => IN_FLIGHT.has(d.status)) ? 4_000 : false;
    },
  });

  const client = useQueryClient();
  const documents = query.data ?? [];

  const retryAll = useMutation({
    mutationFn: () => reingestAllDocuments(workspaceId!),
    onSuccess: (queued) => {
      client.invalidateQueries({ queryKey: queryKeys.documents(workspaceId ?? '') });
      toast.success(`Re-reading ${queued.length} document${queued.length === 1 ? '' : 's'}`);
    },
    onError: (error) => toast.error(errorMessage(error, 'Could not retry ingestion')),
  });

  return {
    retryAll,
    documents,
    processing: documents.filter((d) => IN_FLIGHT.has(d.status)),
    processed: documents.filter((d) => d.status === 'PROCESSED'),
    failed: documents.filter((d) => d.status === 'FAILED'),
    isIngesting: documents.some((d) => IN_FLIGHT.has(d.status)),
    isLoading: query.isLoading,
  };
};
