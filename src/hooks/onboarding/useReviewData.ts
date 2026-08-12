import { useState } from 'react';
import axiosInstance from '../../lib/axios';

export const useReviewData = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Fetch paginated facts for enumerable categories
  const fetchCategoryFacts = async (categoryId: string, page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/v1/knowledge/categories/${categoryId}/facts`, {
        params: { page, limit }
      });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch category facts', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Edit Fact
  const editFact = async (factId: string, updatedData: any) => {
    try {
      const response = await axiosInstance.patch(`/api/v1/knowledge/facts/${factId}`, updatedData);
      return response.data;
    } catch (err) {
      console.error('Failed to edit fact', err);
      throw err;
    }
  };

  // Approve Fact
  const approveFact = async (factId: string) => {
    try {
      const response = await axiosInstance.post(`/api/v1/knowledge/facts/${factId}/approve`);
      return response.data;
    } catch (err) {
      console.error('Failed to approve fact', err);
      throw err;
    }
  };

  // Reject Fact
  const rejectFact = async (factId: string) => {
    try {
      const response = await axiosInstance.post(`/api/v1/knowledge/facts/${factId}/reject`);
      return response.data;
    } catch (err) {
      console.error('Failed to reject fact', err);
      throw err;
    }
  };

  // Submit Confirmations (Missing Data)
  const submitConfirmations = async (confirmations: Record<string, any>) => {
    try {
      const response = await axiosInstance.post('/api/v1/onboarding/confirmations', { confirmations });
      return response.data;
    } catch (err) {
      console.error('Failed to submit confirmations', err);
      throw err;
    }
  };

  return {
    isLoading,
    fetchCategoryFacts,
    editFact,
    approveFact,
    rejectFact,
    submitConfirmations
  };
};
