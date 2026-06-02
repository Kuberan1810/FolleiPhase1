import React, { useState, useEffect, useRef } from 'react';
import {
  User, Building, MapPin, Bold, Italic,
  List, Link, Image as LucideImage, Plus, ChevronRight,
  ArrowLeft, Clock, RefreshCw, Flame
} from 'lucide-react';
import { Flash, Magicpen } from 'iconsax-react';
import AiContent from '../../../../assets/icons/ai.svg'

interface Step2Props {
  subject: string;
  setSubject: (val: string) => void;
  emailBody: string;
  setEmailBody: (val: string) => void;
  attachments: string[];
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>;
  ctaEnabled: boolean;
  setCtaEnabled: (val: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerUpload: () => void;
  onBack: () => void;
  onNext: () => void;
}

type ToneType = 'Professional' | 'Friendly' | 'Urgent' | 'Casual';

const Step2 = ({
  subject, setSubject,
  emailBody, setEmailBody,
  attachments, setAttachments,
  ctaEnabled, setCtaEnabled,
  fileInputRef, handleUpload, triggerUpload,
  onBack, onNext
}: Step2Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const staticDraft = `Hi {{First Name}}, We noticed your recent interest in our services. We’d love to help you achieve better results.\nDon’t miss out! Limited slots are available for this week.`;
  const [activeTone, setActiveTone] = useState<ToneType>('Professional');
  const [generatedDraft, setGeneratedDraft] = useState<string>(staticDraft);

  const currentDraft = generatedDraft;

  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = emailBody;
    }
  }, [emailBody]);

  const handleUseDraft = () => {
    if (!currentDraft) return;

    const formattedDraft = currentDraft.replace(/\n/g, '<br>');
    setEmailBody(formattedDraft);
    if (editorRef.current) {
      editorRef.current.innerHTML = formattedDraft;
    }
  };

  const handleRegenerate = () => {
    setGeneratedDraft(staticDraft);
  };

  return (
    <div className="font-manrope animate-in slide-in-from-right-4 duration-500">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <h2 className="text-[20px] font-bold text-[#001E40] leading-[100%] tracking-[0px]">Design Message Content</h2>

          <section>
            <h3 className="text-[12px] font-[600] text-[#001E40] uppercase tracking-[1.1px] leading-[16.5px] mb-4">Personalization</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: '{{first_name}}', icon: <User size={14} /> },
                { label: '{{company}}', icon: <Building size={14} /> },
                { label: '{{city}}', icon: <MapPin size={14} /> }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#F2F4F6] text-[#001E40] rounded-[4px] text-[12px] font-[600] leading-[16px] border border-transparent select-none cursor-pointer hover:bg-[#E5ECF1] transition-colors"
                  onClick={() => {
                    if (editorRef.current) {
                      editorRef.current.focus();
                      document.execCommand('insertText', false, item.label);
                    }
                  }}
                  title="Click to insert at cursor"
                >
                  <span className="text-[#001E40]">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[14px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">Subject Line</h3>
            <div className="relative">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-[48px] bg-[#F2F4F6] rounded-[4px] px-4 text-[#191C1E] font-[500] text-[16px] leading-[24px] tracking-[0px] focus:outline-none transition-all placeholder:text-[#94A3B8] border border-transparent focus:border-[#004370]/20"
              />
            </div>
          </section>

          <section>
            <h3 className="text-[14px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">Email Body</h3>
            <div className="border border-[#E2E8F0] rounded-[24px] overflow-hidden bg-white shadow-sm">
              {/* Toolbar */}
              <div className="flex items-center justify-between h-[44px] px-4 bg-[#F2F4F6] border-b border-[#C3C6D1]/10 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1 min-w-max">
                  <button
                    onMouseDown={(e) => { e.preventDefault(); document.execCommand('bold', false); }}
                    className="p-1.5 rounded text-[#43474F] hover:text-[#004370] hover:bg-white/80 transition-all cursor-pointer"
                    title="Bold"
                  >
                    <Bold size={15} />
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); document.execCommand('italic', false); }}
                    className="p-1.5 rounded text-[#43474F] hover:text-[#004370] hover:bg-white/80 transition-all cursor-pointer"
                    title="Italic"
                  >
                    <Italic size={15} />
                  </button>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); document.execCommand('insertUnorderedList', false); }}
                    className="p-1.5 rounded text-[#43474F] hover:text-[#004370] hover:bg-white/80 transition-all cursor-pointer"
                    title="Bullet List"
                  >
                    <List size={15} />
                  </button>
                  <div className="w-[1px] h-5 bg-[#D1D5DB] mx-1" />
                  <button className="p-1.5 rounded text-[#43474F] hover:text-[#004370] hover:bg-white/80 transition-all cursor-pointer" title="Add Link"><Link size={15} /></button>
                  <button className="p-1.5 rounded text-[#43474F] hover:text-[#004370] hover:bg-white/80 transition-all cursor-pointer" title="Add Image"><LucideImage size={15} /></button>
                </div>
                <span className="text-[10px] text-[#43474F] font-semibold">Draft saved</span>
              </div>

              <div className="p-8">
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={(e) => setEmailBody(e.currentTarget.innerHTML)}
                  className="w-full min-h-[300px] text-[#191C1E] font-[500] text-[16px] leading-[24px] focus:outline-none font-manrope outline-none"
                />
              </div>

              <div className="p-4 bg-[#F2F4F6] border-t border-[#C3C6D1]/10">
                <div className="flex items-center gap-2 mb-4">
                  <LucideImage size={14} className="text-[#64748B]" />
                  <span className="text-[10px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px]">Visual Attachments ({attachments.length})</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {attachments.map((url, idx) => (
                    <div key={idx} className="w-[100px] h-[100px] bg-white rounded-[4px] overflow-hidden border border-[#C3C6D1]/20 group cursor-pointer relative">
                      <img
                        src={url}
                        alt={`Attachment ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[12px] cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    onClick={triggerUpload}
                    className="w-[100px] h-[100px] bg-white border-2 border-dashed border-[#C3C6D1]/30 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 hover:border-[#004370]/30 transition-colors cursor-pointer"
                  >
                    <Plus size={18} className="text-[#94A3B8]" />
                    <span className="text-[11px] font-bold text-[#94A3B8]">Add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[18px] font-semibold text-[#001E40]">Call to Action Button</h2>
              <button
                onClick={() => setCtaEnabled(!ctaEnabled)}
                className={`w-[52px] h-[28px] rounded-full transition-all duration-300 relative cursor-pointer ${ctaEnabled ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${ctaEnabled ? 'left-[26px]' : 'left-1'}`} />
              </button>
            </div>

            {ctaEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <h3 className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">Button Text</h3>
                  <input
                    type="text"
                    defaultValue="Visit the Website"
                    className="w-full h-[52px] bg-[#F2F4F6] rounded-[4px] px-5 text-[#1E293B] font-medium focus:outline-none transition-all placeholder:text-[#94A3B8] border border-transparent focus:border-[#004370]/20"
                  />
                </div>
                <div>
                  <h3 className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">URL / Link</h3>
                  <input
                    type="text"
                    placeholder="https://"
                    className="w-full h-[52px] bg-[#F2F4F6] rounded-[4px] px-5 text-[#1E293B] font-medium focus:outline-none transition-all placeholder:text-[#94A3B8] border border-transparent focus:border-[#004370]/20"
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* AI COLUMN: AI Content Assistant */}
        <div className="lg:col-span-4 lg:sticky lg:top-4 mt-8 lg:mt-0">

          <div className="bg-gradient-to-br from-[#4F46E5] via-[#EC4899] to-[#F97316] p-[1.5px] rounded-[22px] shadow-lg">
            <div className="bg-[#F7F9FB] rounded-[21px] p-5 space-y-6">

              {/* Header */}
              <div className="flex items-center gap-2.5 relative">

                <div className="p-1">
                  <img src={AiContent} alt="AI Content" />
                </div>
                <h3 className="text-[20px] font-bold text-[#0B1C30] tracking-[-0.2px]">AI Content Assistant</h3>
              </div>

              <hr className="border-gray-300 -mx-5" />

              {/* Current Tone Section */}
              <div>
                <h4 className="text-[15px] font-semibold text-[#222222] uppercase tracking-[1.2px] mb-3">Current Tone</h4>
                <div className="flex flex-wrap gap-2">
                  {(['Professional', 'Friendly', 'Urgent', 'Casual'] as ToneType[]).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setActiveTone(tone)}
                      className={`px-3 py-1.5 text-[12px] font-bold tracking-[0.2px] rounded-[10px] transition-all duration-200 cursor-pointer ${activeTone === tone
                          ? 'bg-[#004370] text-white scale-105 shadow-sm'
                          : 'bg-[#F2F4F5] text-[#0B1C30] hover:bg-gray-200/60'
                        }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Draft Card */}
              <div className="bg-[#F7FCFF] border-[1px] border-[#C7C4D8]/34 p-[16px] rounded-[16px] space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-[#004370] font-bold text-[12px] tracking-[0.8px]">
                  <Magicpen size={12} color='#004370' />
                  <span>Recommended Draft</span>
                </div>

                <p className="text-[14px] text-[#464555] font-[500] leading-[20px] whitespace-pre-line animate-in fade-in duration-300">
                  {currentDraft}
                </p>

                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    onClick={handleUseDraft}
                    disabled={!currentDraft}
                    className="flex-1 h-[36px] bg-[#004370] text-white rounded-[10px] font-semibold text-[12px] hover:bg-[#003152] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    Use This
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="flex-1 h-[36px] border border-[#C7C4D8] text-[#0B1C30] rounded-[10px] font-semibold text-[12px] hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={12} />
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Performance Prediction */}
              <div className="space-y-3.5">
                <h4 className="text-[15px] font-semibold text-[#222222] uppercase tracking-[1.2px]">Performance Prediction</h4>

                <div className="space-y-3 bg-[#FFFFFF] p-4 rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.01)] border border-gray-100">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-semibold text-[#0B1C30]">Readability</span>
                      <span className="font-bold text-[12px] text-[#0B1C30]">Good</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E5EEFF] rounded-[6px] overflow-hidden">
                      <div className="h-full bg-[#22C55E] rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-semibold text-[#0B1C30]">Engagement</span>
                      <span className="font-semibold text-[#3525CD]">72%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E5EEFF] rounded-[6px] overflow-hidden">
                      <div className="h-full bg-[#3525CD] rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-semibold text-[#0B1C30]">Spam Risk</span>
                      <span className="font-bold text-[#0B1C30]">Low</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E5EEFF] rounded-[6px] overflow-hidden">
                      <div className="h-full bg-[#A44100] rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Send Time */}
              <div className="bg-white rounded-[20px] p-5 space-y-3.5">
                <div className="flex items-center gap-2.5 text-[#001E40]">
                  <Clock size={18} className="text-[#004370]" />
                  <span className="text-[15px] font-extrabold tracking-[-0.1px] font-manrope">Smart Send Time</span>
                </div>
                <div>
                  <div className="text-[20px] font-semibold text-[#222222] tracking-[-0.3px] leading-tight font-manrope">
                    Tomorrow, 10:30 AM
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#64748B] mt-1.5">
                    <span className="text-[12px] leading-none"><Flash size={12} color='#64748B' /></span>
                    <span>92% confidence</span>
                  </div>
                </div>
              </div>

              {/* Strategic Routing */}
              <div className="space-y-3">

                <div className="bg-white p-4 rounded-[21px] space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <h4 className="text-[15px] font-semibold text-[#0B1C30] font-manrope">Strategic Routing</h4>

                  <div className="flex items-center justify-between bg-[#F7F9FB] px-4 py-3 rounded-[12px]">
                    <span className="text-[13px] font-bold text-[#43474F] font-manrope">Target Audience</span>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FEE2E2] text-[#B91C1C] rounded-[10px] text-[11px] font-bold select-none">
                      <Flame size={12} className="fill-[#B91C1C] text-[#B91C1C]" />
                      <span className="leading-none">Hot</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F9FB] p-4 rounded-[12px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#43474F] font-manrope">Primary Channel</span>
                      <div className="px-3 py-2 bg-[#DCE1FC] text-[#0B4FD5] rounded-[11px] text-[11px] font-extrabold border border-[#CDE5FF] select-none tracking-[0.5px]">
                        Email
                      </div>
                    </div>

                    <p className="text-[12px] font-[400] text-[#464555] leading-[17px] tracking-[0.1px] font-manrope">
                      Users in this segment show higher engagement with detailed email communication, with a 2.8x higher response rate when provided with structured content and clear value propositions.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 mt-12 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 text-[#001E40] font-bold text-[14px] hover:translate-x-[-4px] transition-transform w-full sm:w-auto p-2 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 w-full sm:w-auto">
          <button className="text-[#001E40] font-bold text-[14px] hover:text-[#004370] transition-colors cursor-pointer w-full sm:w-auto p-2">
            Save as Template
          </button>
          <button
            onClick={onNext}
            className="flex items-center justify-center gap-2 w-full sm:w-[210px] h-[48px] bg-[#004370] text-white rounded-[6px] font-bold text-[14px] hover:bg-[#003152] transition-all group cursor-pointer shadow-sm"
          >
            Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
