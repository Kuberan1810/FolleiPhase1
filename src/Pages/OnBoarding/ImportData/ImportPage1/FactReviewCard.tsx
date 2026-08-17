import React, { useState } from 'react';
import { DynamicFactPayloadViewer } from './DynamicFactPayloadViewer';
import type { CategoryItem } from '../../../../api/onboarding/types';
import { onboardingApi } from '../../../../api/onboarding/onboardingApi';
import { Check, X, ExternalLink, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

interface FactReviewCardProps {
  item: CategoryItem;
  onStatusChange: () => void;
}

export const FactReviewCard: React.FC<FactReviewCardProps> = ({ item, onStatusChange }) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await onboardingApi.reviewCategoryItem(item.id);
      toast.success('Fact approved');
      onStatusChange();
    } catch {
      toast.error('Failed to approve fact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    setIsSubmitting(true);
    try {
      await onboardingApi.rejectCategoryItem(item.id, {
        reason: rejectReason,
      });
      toast.success('Fact rejected');
      setIsRejecting(false);
      onStatusChange();
    } catch {
      toast.error('Failed to reject fact');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isApproved = item.review_status === 'approved';
  const isRejected = item.review_status === 'rejected';

  return (
    <div className={`border rounded-[12px] p-4 bg-white transition-all ${isApproved ? 'border-green-200 bg-green-50/30' : isRejected ? 'border-red-200 bg-red-50/30' : 'border-gray-200 shadow-sm'}`}>
      
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wide">
              {item.fact_type.replace(/_/g, ' ')}
            </span>
            {item.confidence && (
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${item.confidence > 0.8 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {Math.round(item.confidence * 100)}% Match
              </span>
            )}
          </div>
          <h4 className="text-[15px] font-bold text-gray-900 mt-1">
            {String(item.payload.name || item.payload.title || item.fact_type.replace(/_/g, ' '))}
          </h4>
        </div>

        {/* Action Buttons */}
        {item.review_status === 'pending' && !isRejecting && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRejecting(true)}
              disabled={isSubmitting}
              className="text-xs px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              disabled={isSubmitting}
              className="text-xs px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              Approve
            </button>
          </div>
        )}

        {isApproved && (
          <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <Check className="w-4 h-4" /> Approved
          </div>
        )}

        {isRejected && (
          <div className="flex items-center gap-1.5 text-red-600 text-sm font-medium">
            <X className="w-4 h-4" /> Rejected
          </div>
        )}
      </div>

      <DynamicFactPayloadViewer factType={item.fact_type} payload={item.payload} />

      {item.citation && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-500">
          <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
          <div>
            <span className="font-medium text-gray-700">Source:</span> {item.citation.source}
            {item.citation.heading_path && (
              <span className="ml-1 text-gray-400">({item.citation.heading_path.join(' > ')})</span>
            )}
          </div>
        </div>
      )}

      {/* Rejection Form */}
      {isRejecting && (
        <div className="mt-4 pt-3 border-t border-red-100 bg-red-50/50 -mx-4 -mb-4 p-4 rounded-b-[12px]">
          <label className="block text-xs font-medium text-gray-700 mb-1">Reason for rejection:</label>
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              className="flex-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 bg-white px-3 py-1.5"
              placeholder="e.g. Inaccurate pricing, outdated feature..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRejectSubmit()}
            />
            <button
              onClick={handleRejectSubmit}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-md font-medium disabled:opacity-50"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsRejecting(false)}
              disabled={isSubmitting}
              className="text-gray-500 hover:text-gray-700 text-xs px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isRejected && item.review_reason && (
        <div className="mt-3 pt-3 border-t border-red-100 flex items-start gap-2 text-xs text-red-600">
          <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span><span className="font-semibold">Reason:</span> {item.review_reason}</span>
        </div>
      )}
    </div>
  );
};
