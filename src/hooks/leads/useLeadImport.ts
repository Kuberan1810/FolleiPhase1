import { useState } from 'react';
import axiosInstance from '../../lib/axios';

export const useLeadImport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const previewImport = async (fileIdOrData: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/v1/leads/import/preview', { data: fileIdOrData });
      return response.data;
    } catch (err) {
      console.error('Failed to preview lead import', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const editRow = async (rowId: string, updatedData: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/v1/leads/import/preview/${rowId}`, updatedData);
      return response.data;
    } catch (err) {
      console.error('Failed to edit lead import row', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const ignoreRow = async (rowId: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/api/v1/leads/import/preview/${rowId}/ignore`);
      return response.data;
    } catch (err) {
      console.error('Failed to ignore lead import row', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const commitImport = async (importSessionId: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/v1/leads/import/commit', { session_id: importSessionId });
      return response.data;
    } catch (err) {
      console.error('Failed to commit lead import', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    previewImport,
    editRow,
    ignoreRow,
    commitImport
  };
};
