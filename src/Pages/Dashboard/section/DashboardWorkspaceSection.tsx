import React from 'react';
import { Building2, Check, Users, Database, Sparkles, Plug, Loader2 } from 'lucide-react';
import type { WorkspaceContextItem } from '../types';

interface DashboardWorkspaceSectionProps {
  items: WorkspaceContextItem[];
}

export const DashboardWorkspaceSection: React.FC<DashboardWorkspaceSectionProps> = ({ items }) => {
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
      <h3 className="text-[11.5px] font-semibold text-[#717378] tracking-wider uppercase">
        WORKSPACE
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => {
          const isItemLoading = item.isLoading || item.status === 'Importing...';

          return (
            <div
              key={item.id + (item.value || '') + item.status}
              className={`animate-fade-slide flex flex-col gap-1.5 w-full rounded-[20px] border p-4.5 shadow-2xs transition-all ${
                isItemLoading
                  ? 'border-[#A7F3D0]/60 bg-[#F4FBF7]'
                  : 'border-[#E6E6E4] bg-white'
              }`}
            >
              {/* Context Header */}
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#717378] tracking-wider uppercase">
                {getIcon(item.type)}
                <span>{item.title}</span>
              </div>

              {/* Status indicator (if no subtitle) */}
              {!item.subtitle && item.status && (
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#0D9488]">
                  {isItemLoading ? (
                    <Loader2 className="size-3.5 animate-spin text-[#0D9488]" aria-hidden="true" />
                  ) : (
                    <Check className="size-3.5 stroke-[2.5] pop-in" aria-hidden="true" />
                  )}
                  <span>{item.status}</span>
                </div>
              )}

              {/* Configured Value without subtitle */}
              {!item.subtitle && item.value && (
                <p className="text-[13.5px] text-[#2C2E31] font-normal truncate transition-colors duration-200">
                  {item.value}
                </p>
              )}

              {/* Configured Value with subtitle (e.g. 24 files + 12 products · 8 services · 5 pricing plans) */}
              {item.subtitle && (
                <div className="flex flex-col gap-0.5 mt-0.5">
                  {item.value && (
                    <p className="text-[13.5px] font-semibold text-[#16171A] tracking-tight">
                      {item.value}
                    </p>
                  )}
                  <p className="text-[12.5px] text-[#717378] font-normal leading-normal">
                    {item.subtitle}
                  </p>
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
