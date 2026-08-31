import React from 'react';
import { Building2, Check, Users, Database, Sparkles, Plug, Loader2, UploadCloud, AlertCircle, ArrowUpRight } from 'lucide-react';
import type { WorkspaceContextItem } from '../types';

interface DashboardWorkspaceSectionProps {
  items: WorkspaceContextItem[];
  onItemAction?: (type: string) => void;
  showHeaderCount?: boolean;
}

export const DashboardWorkspaceSection: React.FC<DashboardWorkspaceSectionProps> = ({
  items,
  onItemAction,
  showHeaderCount = false,
}) => {
  if (items.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'business':
        return <Building2 className="size-3.5 text-[#717378]" />;
      case 'customer':
        return <Users className="size-3.5 text-[#717378]" />;
      case 'crm':
        return <Plug className="size-3.5 text-[#717378]" />;
      case 'data':
        return <Database className="size-3.5 text-[#717378]" />;
      default:
        return <Sparkles className="size-3.5 text-[#717378]" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 animate-fade-slide">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-[#8A8F98] tracking-wider uppercase">
          WORKSPACE
        </h3>
        {showHeaderCount && (
          <span className="text-[11.5px] text-[#717378]">
            {items.filter((i) => !i.isEmpty && i.status !== 'Needs attention').length} of {items.length} Ready
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => {
          const isItemLoading =
            item.isLoading ||
            item.status === 'Importing...' ||
            (Boolean(item.status) && item.status!.startsWith('Reading '));

          const isAttention =
            item.status === 'Needs attention' ||
            item.status === 'Upload failed' ||
            item.isEmpty;

          const isStatusBadge = item.type === 'business' || item.type === 'crm';

          return (
            <div
              key={item.id}
              className={`animate-fade-slide flex flex-col justify-between w-full rounded-[20px] border p-4.5 transition-all min-h-[96px] ${
                isItemLoading
                  ? 'border-[#A7F3D0]/60 bg-[#F4FBF7]'
                  : item.isEmpty
                  ? 'border-dashed border-[#CBD5E1] bg-white'
                  : 'border-[#E6E6E4] bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex flex-col gap-2">
                {/* Context Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#8A8F98] tracking-wider uppercase">
                    {getIcon(item.type)}
                    <span>{item.title}</span>
                  </div>

                  {item.isEmpty && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF5] border border-[#FDE68A] px-2 py-0.5 text-[11px] font-medium text-[#B45309]">
                      <AlertCircle className="size-3 text-[#D97706]" strokeWidth={2.2} />
                      <span>Empty</span>
                    </span>
                  )}
                </div>

                {/* Main Middle Row */}
                {isStatusBadge ? (
                  /* Checkmark Status Row (e.g. Ready / Connected) */
                  item.status && (
                    <div
                      className={`flex items-center gap-1.5 text-[13.5px] ${
                        isItemLoading
                          ? 'text-[#0D9488] font-medium'
                          : item.isEmpty
                          ? 'text-[#C2410C] font-semibold'
                          : isAttention
                          ? 'text-amber-600 font-medium'
                          : 'text-[#059669] font-medium'
                      }`}
                    >
                      {isItemLoading ? (
                        <Loader2 className="size-3.5 animate-spin text-[#0D9488]" aria-hidden="true" />
                      ) : item.isEmpty ? (
                        <span className="size-2 rounded-full bg-[#EA580C] shrink-0" />
                      ) : isAttention ? (
                        <span className="size-2 rounded-full bg-amber-500 shrink-0" />
                      ) : (
                        <Check className="size-3.5 stroke-[2.5] text-[#059669]" aria-hidden="true" />
                      )}
                      <span>{item.status}</span>
                    </div>
                  )
                ) : (
                  /* Bold Counter Value for Data / Leads (e.g. 24 files, 248 leads) */
                  item.value && (
                    <p className={`text-[14px] font-bold ${item.isEmpty ? 'text-[#475569]' : 'text-[#16171A]'} truncate`}>
                      {item.value}
                    </p>
                  )
                )}

                {/* Subtitle / Configured Value */}
                {isStatusBadge ? (
                  item.value && (
                    <p className="text-[13px] text-[#52525B] font-normal truncate">
                      {item.value}
                    </p>
                  )
                ) : (
                  item.subtitle && (
                    <p className="text-[12.5px] text-[#717378] font-normal truncate">
                      {item.subtitle}
                    </p>
                  )
                )}
              </div>

              {/* Action Button if Empty or Add More */}
              {item.actionLabel && item.isEmpty && (
                <div className="pt-2 mt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (item.onAction) item.onAction();
                      else if (onItemAction) onItemAction(item.type);
                    }}
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all cursor-pointer active:scale-95 bg-[#16171A] hover:bg-black text-white"
                  >
                    <UploadCloud className="size-3.5" />
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="size-3 opacity-70" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardWorkspaceSection;
