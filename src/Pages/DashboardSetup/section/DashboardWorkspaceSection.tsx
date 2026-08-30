import React from 'react';
import { Building2, Check, Users, Database, Sparkles, Plug, Loader2, UploadCloud, AlertCircle, ArrowUpRight } from 'lucide-react';
import type { WorkspaceContextItem } from '../types';

interface DashboardWorkspaceSectionProps {
  items: WorkspaceContextItem[];
  onItemAction?: (type: string) => void;
}

export const DashboardWorkspaceSection: React.FC<DashboardWorkspaceSectionProps> = ({
  items,
  onItemAction,
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
        <h3 className="text-[11.5px] font-semibold text-[#717378] tracking-wider uppercase">
          WORKSPACE CONFIGURATION & DATA
        </h3>
        <span className="text-[11.5px] text-[#717378]">
          {items.filter((i) => !i.isEmpty && i.status !== 'Needs attention').length} of {items.length} Ready
        </span>
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

          return (
            <div
              key={item.id}
              className={`animate-fade-slide flex flex-col justify-between w-full rounded-[22px] border p-4.5 shadow-2xs transition-all ${
                isItemLoading
                  ? 'border-[#A7F3D0]/60 bg-[#F4FBF7]'
                  : item.isEmpty
                  ? 'border-dashed border-[#CBD5E1] bg-[#FAFAF9]'
                  : 'border-[#E6E6E4] bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex flex-col gap-1.5">
                {/* Context Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#717378] tracking-wider uppercase">
                    {getIcon(item.type)}
                    <span>{item.title}</span>
                  </div>

                  {item.isEmpty && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/80 px-2 py-0.5 text-[10.5px] font-medium text-amber-700">
                      <AlertCircle className="size-3 text-amber-600" />
                      <span>Empty</span>
                    </span>
                  )}
                </div>

                {/* Status indicator */}
                {item.status && (
                  <div
                    className={`flex items-center gap-1.5 text-[13px] font-medium ${
                      isItemLoading
                        ? 'text-[#0D9488]'
                        : item.isEmpty
                        ? 'text-amber-700'
                        : isAttention
                        ? 'text-amber-600'
                        : 'text-[#0D9488]'
                    }`}
                  >
                    {isItemLoading ? (
                      <Loader2 className="size-3.5 animate-spin text-[#0D9488]" aria-hidden="true" />
                    ) : item.isEmpty ? (
                      <span className="size-2 rounded-full bg-amber-500" />
                    ) : isAttention ? (
                      <span className="size-2 rounded-full bg-amber-500" />
                    ) : (
                      <Check className="size-3.5 stroke-[2.5] pop-in" aria-hidden="true" />
                    )}
                    <span>{item.status}</span>
                  </div>
                )}

                {/* Configured Value */}
                {item.value && (
                  <p className="text-[13.5px] text-[#2C2E31] font-normal truncate transition-colors duration-200">
                    {item.value}
                  </p>
                )}

                {/* Subtitle */}
                {item.subtitle && (
                  <p className="text-[12px] text-[#717378] font-normal truncate">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Action Button if Empty or Add More */}
              {item.actionLabel && (
                <div className="pt-2.5 mt-2 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (item.onAction) item.onAction();
                      else if (onItemAction) onItemAction(item.type);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all cursor-pointer active:scale-95 shadow-2xs ${
                      item.isEmpty
                        ? 'bg-[#16171A] hover:bg-black text-white'
                        : 'bg-[#F4F4F0] hover:bg-[#EBEBE8] text-[#16171A]'
                    }`}
                  >
                    <UploadCloud className="size-3.5" />
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="size-3 opacity-60" />
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
