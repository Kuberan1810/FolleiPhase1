import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, 
  Building2, CheckCircle2, Clock, Globe2, CloudUpload, FileIcon, X
} from 'lucide-react';
import CustomDropdown from '../../components/ui/CustomDropdown';

const WorkspaceSetup: React.FC = () => {
  const navigate = useNavigate();
  
  const [companyName, setCompanyName] = useState('Acme Sales');
  const [website, setWebsite] = useState('https://companyname/');
  const [timeZone, setTimeZone] = useState('(GMT+05:30) India Standard Time (Asia/Kolkata)');
  const [country, setCountry] = useState('India');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const MAX_SIZE = 25 * 1024 * 1024; // 25 MB
      let hasError = false;
      
      const validFiles = files.filter(file => {
        if (file.size > MAX_SIZE) {
          hasError = true;
          return false;
        }
        return true;
      });

      if (hasError) {
        setFileError('One or more files exceeded the 25 MB limit.');
      } else {
        setFileError('');
      }

      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E8F0F8] via-[#F8FAFC] to-[#DCE6ED] p-4 md:p-8 font-inter overflow-hidden">
      
      {/* Background blur overlays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      {/* Main Content Card - Flex Layout Chassis */}
      <div className="relative z-10 w-full max-w-[1200px] h-full max-h-[900px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] flex flex-col animate-in fade-in zoom-in duration-500">
        
        {/* Sticky Top Header Area */}
        <div className="px-6 md:px-12 pt-6 md:pt-10 shrink-0 bg-white rounded-t-[24px] z-10 relative">
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent -mb-6 pointer-events-none z-20" />

          {/* Stepper */}
          <div className="flex items-center gap-3 w-full mb-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div 
                key={index} 
                className={`flex-1 h-1.5 rounded-full ${index < 3 ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`} 
              />
            ))}
          </div>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0D1C2E] mb-3 leading-tight tracking-[-0.9px]">
              Set Up Your Workspace
            </h1>
            <p className="text-[16px] font-normal text-[#767587]">
              Create your team's workspace to personalize your Follei experience.
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-4 onboarding-scroll z-0">
          <div className="w-full">

        {/* Form Fields */}
        <div className="flex flex-col gap-6 mb-8">
          
          {/* Company Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Company Name</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#94A3B8]">
                <Building2 size={18} strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-[48px] pl-11 pr-4 rounded-[10px] border border-[#E2E8F0] text-[#1E293B] text-[15px] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370]/20 transition-all bg-transparent"
                placeholder="Enter company name"
              />
            </div>
            <p className="text-[12px] text-[#94A3B8]">This will be your workspace display name.</p>
          </div>

          {/* Company Website */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Company Website</label>
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full h-[48px] pl-4 pr-11 rounded-[10px] border border-[#E2E8F0] text-[#1E293B] text-[15px] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370]/20 transition-all bg-transparent"
                placeholder="https://"
              />
              <div className="absolute right-4 text-[#10B981]">
                <CheckCircle2 size={18} strokeWidth={2} />
              </div>
            </div>
            <p className="text-[12px] text-[#94A3B8]">We'll use your website to personalize your workspace and company profile.</p>
          </div>

          {/* Time Zone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Time Zone</label>
            <CustomDropdown
              options={[
                { value: '(GMT+05:30) India Standard Time (Asia/Kolkata)', label: '(GMT+05:30) India Standard Time (Asia/Kolkata)' },
                { value: '(GMT-08:00) Pacific Time (US & Canada)', label: '(GMT-08:00) Pacific Time (US & Canada)' },
                { value: '(GMT+00:00) Greenwich Mean Time', label: '(GMT+00:00) Greenwich Mean Time' }
              ]}
              value={timeZone}
              onChange={setTimeZone}
              icon={<Clock size={18} strokeWidth={1.5} />}
            />
            <p className="text-[12px] text-[#94A3B8] mt-1">This will be used for time-based insights and reports.</p>
          </div>

          {/* Country / Region */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-bold text-[#334155]">Country / Region</label>
            <CustomDropdown
              options={[
                { value: 'India', label: 'India' },
                { value: 'United States', label: 'United States' },
                { value: 'United Kingdom', label: 'United Kingdom' },
                { value: 'Australia', label: 'Australia' }
              ]}
              value={country}
              onChange={setCountry}
              icon={<Globe2 size={18} strokeWidth={1.5} />}
            />
            <p className="text-[12px] text-[#94A3B8] mt-1">Helps us personalize your experience and compliance.</p>
          </div>

        </div>

        {/* Upload company data */}
        <div className="flex flex-col gap-2 mb-10">
          <label className="text-[14px] font-bold text-[#334155]">
            Upload company data <span className="font-normal text-[#64748B]">(Optional)</span>
          </label>
          <p className="text-[12px] text-[#94A3B8] mb-1">
            Upload your company documents to help Follei understand your business and deliver more accurate AI insights.
          </p>
          
          <label htmlFor="file-upload" className="w-full h-[140px] rounded-[16px] border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC]/50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#F1F5F9] hover:border-[#94A3B8] transition-all relative">
            <input id="file-upload" type="file" className="hidden" multiple onChange={handleFileUpload} />
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#004370] mb-1">
              <CloudUpload size={22} strokeWidth={2} />
            </div>
            <span className="text-[14px] font-bold text-[#1E293B]">
              Drag & drop files here
            </span>
            <span className="text-[11px] text-[#94A3B8]">
              Supports any file format • Max 25 MB per file
            </span>
          </label>
          
          {fileError && (
            <span className="text-[13px] text-red-500 font-medium mt-1">{fileError}</span>
          )}

          {uploadedFiles.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileIcon size={18} className="text-[#004370] shrink-0" />
                    <span className="text-[14px] text-[#334155] font-medium truncate">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-[12px] text-[#94A3B8]">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                    <button 
                      onClick={() => removeFile(index)} 
                      className="text-[#94A3B8] hover:text-red-500 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

          </div>
        </div>

        {/* Sticky Bottom Footer */}
        <div className="px-6 md:px-12 pb-6 md:pb-10 pt-6 shrink-0 bg-white rounded-b-[24px] border-t border-[#F1F5F9] z-10 relative">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent -mt-6 pointer-events-none z-20" />

          <div className="w-full flex items-center justify-between">
            <button 
              onClick={() => navigate('/onboarding/step-3')}
              className="flex items-center gap-2 text-[#64748B] font-semibold text-[15px] hover:text-[#0D1C2E] transition-colors px-2 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button 
              onClick={() => navigate('/onboarding/step-5')}
              className="h-[48px] px-8 bg-[#004370] text-white rounded-[10px] flex items-center justify-center gap-2 font-semibold text-[15px] hover:bg-[#003152] transition-colors cursor-pointer"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkspaceSetup;
