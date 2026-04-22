import React from 'react';
import { 
  User, Building, MapPin, Sparkles, Bold, Italic, 
  List, Link, Image as LucideImage, Plus, ChevronRight,
  ArrowLeft, CheckCircle2
} from 'lucide-react';

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

const Step2 = ({
  subject, setSubject,
  emailBody, setEmailBody,
  attachments, setAttachments,
  ctaEnabled, setCtaEnabled,
  fileInputRef, handleUpload, triggerUpload,
  onBack, onNext
}: Step2Props) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = emailBody;
    }
  }, [emailBody]);

  return (
    <div className="space-y-8 font-manrope animate-in slide-in-from-right-4 duration-500">
      <h2 className="text-[20px] font-bold text-[#001E40] leading-[100%] tracking-[0px]">Design Message Content</h2>
      
      {/* Personalization Section */}
      <section>
        <h3 className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">Personalization</h3>
        <div className="flex flex-wrap gap-3">
          { [
            { label: '{{first_name}}', icon: <User size={14} /> },
            { label: '{{company}}', icon: <Building size={14} /> },
            { label: '{{city}}', icon: <MapPin size={14} /> }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 px-3 py-1.5 bg-[#F2F4F6] text-[#001E40] rounded-[4px] text-[12px] font-[600] leading-[16px] border border-transparent select-none cursor-pointer hover:bg-[#E5E7EB] transition-colors"
            >
              <span className="text-[#001E40]">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Subject Line Section */}
      <section>
        <h3 className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">Subject Line</h3>
        <div className="relative">
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-[48px] bg-[#F2F4F6] rounded-[4px] px-4 text-[#191C1E] font-[500] text-[16px] leading-[24px] tracking-[0px] focus:outline-none transition-all placeholder:text-[#94A3B8]"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 text-[#004370] text-[10px] font-[600] leading-[15px] tracking-[0px] uppercase hover:text-[#003152] transition-colors cursor-pointer">
            <Sparkles size={12} /> Optimize
          </button>
        </div>
      </section>

      {/* Email Body Section */}
      <section>
        <h3 className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">Email Body</h3>
        <div className="border border-[#E2E8F0] rounded-[24px] overflow-hidden bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between h-[44px] px-4 bg-[#F2F4F6] border-b border-[#C3C6D1]/10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 min-w-max">
              <button 
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('bold', false); }}
                className="text-[#43474F] hover:text-[#004370] transition-colors cursor-pointer"
                title="Bold"
              >
                <Bold size={15} />
              </button>
              <button 
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('italic', false); }}
                className="text-[#43474F] hover:text-[#004370] transition-colors cursor-pointer"
                title="Italic"
              >
                <Italic size={15} />
              </button>
              <button 
                onMouseDown={(e) => { e.preventDefault(); document.execCommand('insertUnorderedList', false); }}
                className="text-[#43474F] hover:text-[#004370] transition-colors cursor-pointer"
                title="Bullet List"
              >
                <List size={15} />
              </button>
              <div className="w-[1px] h-5 bg-[#D1D5DB] mx-1" />
              <button className="text-[#43474F] hover:text-[#004370] transition-colors cursor-pointer"><Link size={15} /></button>
              <button className="text-[#43474F] hover:text-[#004370] transition-colors cursor-pointer"><LucideImage size={15} /></button>
            </div>
            <span className="text-[10px] text-[#43474F] font-semibold">Draft saved</span>
          </div>
          {/* Content Area */}
          <div className="p-8">
            <div
              ref={editorRef}
              contentEditable
              onInput={(e) => setEmailBody(e.currentTarget.innerHTML)}
              className="w-full min-h-[300px] text-[#191C1E] font-[500] text-[16px] leading-[24px] focus:outline-none font-manrope outline-none"
            />
          </div>
          {/* Visual Attachments Area */}
          <div className="p-4 bg-[#F2F4F6] border-t border-[#C3C6D1]/10">
            <div className="flex items-center gap-2 mb-4">
              <LucideImage size={14} className="text-[#64748B]" />
              <span className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px]">Visual Attachments ({attachments.length})</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {attachments.map((url, idx) => (
                <div key={idx} className="w-[100px] h-[100px] bg-white rounded-lg overflow-hidden border border-[#C3C6D1]/20 group cursor-pointer relative shadow-sm">
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
                className="w-[100px] h-[100px] bg-white border-2 border-dashed border-[#C3C6D1]/30 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Plus size={18} className="text-[#94A3B8]" />
                <span className="text-[11px] font-bold text-[#94A3B8]">Add</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[18px] font-extrabold text-[#001E40]">Call to Action Button</h2>
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
                className="w-full h-[52px] bg-[#F2F4F6] rounded-[4px] px-5 text-[#1E293B] font-medium focus:outline-none transition-all placeholder:text-[#94A3B8]"
              />
            </div>
            <div>
              <h3 className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-4">URL / Link</h3>
              <input 
                type="text" 
                placeholder="https://"
                className="w-full h-[52px] bg-[#F2F4F6] rounded-[4px] px-5 text-[#1E293B] font-medium focus:outline-none transition-all placeholder:text-[#94A3B8]"
              />
            </div>
          </div>
        )}
      </section>

      {/* Footer Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 mt-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 w-full sm:w-auto">
          <button 
            onClick={onBack}
            className="flex items-center justify-center gap-2 text-[#001E40] font-bold text-[14px] hover:translate-x-[-4px] transition-transform w-full sm:w-auto p-2 cursor-pointer"
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <div className="flex items-center gap-2 border-l-0 sm:border-l border-[#E2E8F0] px-0 sm:pl-12 h-auto sm:h-6">
            <CheckCircle2 size={18} className="text-[#004370]" />
            <p className="text-[13px] text-[#64748B] font-medium whitespace-nowrap">
              Spam analysis: <span className="font-bold text-[#004370]">Excellent</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 w-full sm:w-auto">
          <button className="text-[#001E40] font-bold text-[14px] hover:text-[#004370] transition-colors cursor-pointer w-full sm:w-auto p-2">
            Save as Template
          </button>
          <button 
            onClick={onNext}
            className="flex items-center justify-center gap-2 w-full sm:w-[210px] h-[48px] bg-[#004370] text-white rounded-[6px] font-bold text-[14px] hover:bg-[#003152] transition-all group cursor-pointer"
          >
            Continue <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
