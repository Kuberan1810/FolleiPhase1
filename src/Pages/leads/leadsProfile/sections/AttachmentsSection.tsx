import React from 'react';
import type { LeadAttachment } from '../../types';

interface AttachmentsSectionProps {
  attachments?: LeadAttachment[];
}

export const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
  attachments = [
    {
      id: '1',
      title: 'Course Requirements.pdf',
      sentBy: 'Sent by Lead · Today, 10:42 AM',
    },
    {
      id: '2',
      title: 'Digital Marketing Brochure.pdf',
      sentBy: 'Sent by Admin · Yesterday, 4:15 PM',
    },
  ],
}) => {
  return (
    <div className="rounded-[15px] bg-white p-5 sm:p-6 border border-[#E5E7EB]">
      <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#464555]">
        Attachments
      </h3>

      <div className="mt-4 flex flex-col gap-3.5">
        {attachments.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-3 rounded-[4px] p-2 -mx-2 hover:bg-[#FAFAF9] transition-colors group cursor-pointer"
          >
            {/* Red PDF  */}
            <div className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-[#FEF2F2]">
              <svg
                className="size-5 text-[#EF4444]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>

            {/* File Info */}
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] font-medium text-[#1E293B] group-hover:text-[#6B8323] transition-colors truncate">
                {file.title}
              </span>
              <span className="text-[12px] text-[#94A3B8]">
                {file.sentBy}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentsSection;
