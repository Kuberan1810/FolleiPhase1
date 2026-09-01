import React, { useRef } from 'react';
import { Link as LinkIcon, Image as ImageIcon, X, FileText, Film } from 'lucide-react';
import { StepActionButtons } from '../StepActionButtons';
import { CapsuleButton } from '../CapsuleButton';
import toast from 'react-hot-toast';

interface Step4MessageProps {
  messageText: string;
  onMessageTextChange: (val: string) => void;
  mediaUrl?: string;
  mediaName?: string;
  mediaSize?: string;
  onMediaChange?: (media: { url: string; name: string; size: string } | null) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const Step4Message: React.FC<Step4MessageProps> = ({
  messageText,
  onMessageTextChange,
  mediaUrl,
  mediaName,
  mediaSize,
  onMediaChange,
  onBack,
  onContinue,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const VARIABLES = [
    { label: '+ First Name', value: '{First Name}' },
    { label: '+ Company', value: '{Company}' },
    { label: '+ Last Name', value: '{Last Name}' },
    { label: '+ City', value: '{City}' },
    { label: '+ Lead Source', value: '{Lead Source}' },
  ];

  const handleInsertVariable = (val: string) => {
    onMessageTextChange(messageText ? `${messageText} ${val}` : val);
  };

  const handleAddMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 25MB)
    if (file.size > 25 * 1024 * 1024) {
      toast.error('File size exceeds 25MB limit');
      return;
    }

    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const url = URL.createObjectURL(file);

    onMediaChange?.({
      url,
      name: file.name,
      size: formattedSize,
    });

    toast.success(`Attached ${file.name}`);
    // Reset file input value so same file can be re-selected if removed
    e.target.value = '';
  };

  const handleRemoveMedia = () => {
    onMediaChange?.(null);
  };

  const isImage = mediaName?.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);
  const isVideo = mediaName?.match(/\.(mp4|mov|avi|mkv|webm)$/i);

  const charCount = messageText.length;
  const canContinue = messageText.trim().length > 0 || !!mediaUrl;

  return (
    <div className="flex flex-col gap-2.5 animate-fade-slide">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,application/pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Title & Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[14.5px] font-semibold text-[#16171A]">
          Create your message
        </h3>
        <p className="text-[12px] text-[#717378]">
          Write the message you want to send to your audience.
        </p>
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col">
        <textarea
          rows={4}
          value={messageText}
          onChange={(e) => onMessageTextChange(e.target.value)}
          placeholder="Write your campaign message..."
          className="w-full rounded-[14px] border border-[#E2E8F0] bg-white p-3 text-[12.5px] text-[#16171A] placeholder-[#9CA3AF] focus:border-[#7A9601] focus:outline-none transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Attached Media Preview Box */}
      {mediaUrl && (
        <div className="flex items-center justify-between gap-2.5 rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-2 text-[12px] animate-fade-slide">
          <div className="flex items-center gap-2.5 min-w-0">
            {isImage ? (
              <img
                src={mediaUrl}
                alt="Media preview"
                className="size-9 rounded-lg object-cover border border-gray-200 shrink-0"
              />
            ) : isVideo ? (
              <div className="flex size-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 shrink-0">
                <Film className="size-4" />
              </div>
            ) : (
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <FileText className="size-4" />
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <span className="font-medium text-[#16171A] truncate max-w-[170px]">
                {mediaName || 'Attached Media'}
              </span>
              <span className="text-[10.5px] text-[#64748B]">
                {mediaSize || 'Attachment'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemoveMedia}
            aria-label="Remove media"
            className="flex size-6 items-center justify-center rounded-full text-[#64748B] hover:bg-gray-200 hover:text-[#16171A] transition-colors cursor-pointer shrink-0"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Dynamic Variables Pill Row */}
      <div className="flex flex-wrap gap-1.5">
        {VARIABLES.map((v) => (
          <CapsuleButton
            key={v.label}
            onClick={() => handleInsertVariable(v.value)}
          >
            {v.label}
          </CapsuleButton>
        ))}
      </div>

      {/* Add Link / Add Media & Character Count Row */}
      <div className="flex items-center justify-between text-[11.5px] text-[#64748B] pt-0.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onMessageTextChange(messageText ? `${messageText} https://` : 'https://')}
            className="inline-flex items-center gap-1 hover:text-[#16171A] transition-colors cursor-pointer"
          >
            <LinkIcon className="size-3" />
            <span>Add link</span>
          </button>
          <button
            type="button"
            onClick={handleAddMediaClick}
            className={`inline-flex items-center gap-1 transition-colors cursor-pointer ${
              mediaUrl ? 'text-[#7A9601] font-medium' : 'hover:text-[#16171A]'
            }`}
          >
            <ImageIcon className="size-3" />
            <span>{mediaUrl ? 'Change media' : 'Add media'}</span>
          </button>
        </div>

        <span className="font-normal text-[#94A3B8] text-[10.5px]">
          {charCount} characters
        </span>
      </div>

      {/* Reusable Action Buttons */}
      <StepActionButtons
        onBack={onBack}
        canContinue={canContinue}
        onContinue={onContinue}
      />
    </div>
  );
};

export default Step4Message;
