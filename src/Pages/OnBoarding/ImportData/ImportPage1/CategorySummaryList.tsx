import React, { useState, useEffect } from 'react';
import { onboardingApi } from '../../../../api/onboarding/onboardingApi';
import type { CategoryItem } from '../../../../api/onboarding/types';
import { FactReviewCard } from './FactReviewCard';
import { Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface CategorySummaryListProps {
  categoryKey: string;
}

export const CategorySummaryList: React.FC<CategorySummaryListProps> = ({ categoryKey }) => {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchItems = async (targetPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await onboardingApi.getCategoryItems(categoryKey, targetPage, 10);
      setItems(response.data.items);
      setTotalPages(response.data.pagination.pages);
      setPage(response.data.pagination.page);
    } catch (error: unknown) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'Failed to load facts.');
      toast.error('Failed to load extracted facts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // The category key is an external navigation input; load its records once it changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryKey]);

  if (isLoading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <p className="text-sm text-gray-500">Loading extracted facts...</p>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-500">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="text-sm">{error}</p>
        <button onClick={() => fetchItems(page)} className="mt-4 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">Retry</button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-gray-500">No extracted facts found for this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map(item => (
        <FactReviewCard key={item.id} item={item} onStatusChange={() => fetchItems(page)} />
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t">
          <button
            disabled={page === 1 || isLoading}
            onClick={() => fetchItems(page - 1)}
            className="px-3 py-1.5 border rounded text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages || isLoading}
            onClick={() => fetchItems(page + 1)}
            className="px-3 py-1.5 border rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
