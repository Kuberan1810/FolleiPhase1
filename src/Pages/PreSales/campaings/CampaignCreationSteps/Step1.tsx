import React, { useState, useRef } from 'react';
import { Mail, MessageSquare, Smartphone, Phone, Check, ChevronRight, Camera, Users, Flame, Thermometer, Snowflake, Upload, ListFilter } from 'lucide-react';

interface Step1Props {
  selectedChannels: string[];
  setSelectedChannels: React.Dispatch<React.SetStateAction<string[]>>;
  selectedAudience: string;
  setSelectedAudience: (id: string) => void;
  onNext: () => void;
}

const Step1 = ({
  selectedChannels,
  setSelectedChannels,
  selectedAudience,
  setSelectedAudience,
  onNext
}: Step1Props) => {
  const [logo, setLogo] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  const isStepValid = logo && name.trim() !== '' && description.trim() !== '' && selectedChannels.length > 0 && selectedAudience !== '';

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };
  const channels = [
    { id: 'email', name: 'Email', sub: 'High-volume transactional', icon: <Mail className="text-blue-600" size={24} /> },
    { id: 'whatsapp', name: 'WhatsApp', sub: 'Direct personal engagement', icon: <MessageSquare className="text-emerald-600" size={24} /> },
    { id: 'sms', name: 'SMS', sub: 'Short-form urgent updates', icon: <Smartphone className="text-purple-600" size={24} /> },
  ];

  const audiences = [
    {
      id: 'all-customers',
      name: 'All Customers',
      sub: 'Broadcast to your entire verified customer database.',
      count: '124,802',
      badge: 'GLOBAL SYNC',
      badgeColor: 'bg-[#F2F4F7] text-[#43474F]',
      icon: <Users className="text-[#0D47A1]" size={16} />,
      iconBg: 'bg-[#D5E3FF]'
    },
    {
      id: 'hot-leads',
      name: 'Hot Leads',
      sub: 'Users with high intent and recent active sessions.',
      count: '18,442',
      badge: 'PRIORITY',
      badgeColor: 'bg-[#FFDBCA] text-[#9A4F2C]',
      icon: <Flame className="text-[#E11D48]" size={16} />,
      iconBg: 'bg-[#FFE2E2]'
    },
    {
      id: 'warm-leads',
      name: 'Warm Leads',
      sub: 'Engaged users who have explored pricing or demos.',
      count: '45,109',
      badge: 'STEADY',
      badgeColor: 'bg-[#89F5E7] text-[#0D7A6E]',
      icon: <Thermometer className="text-[#00796B]" size={16} />,
      iconBg: 'bg-[#E0F2F1]'
    },
    {
      id: 'cold-leads',
      name: 'Cold Leads',
      sub: 'Dormant users who haven\'t interacted in 60+ days.',
      count: '61,251',
      badge: 'RE-ACTIVATION',
      badgeColor: 'bg-slate-100 text-slate-700',
      icon: <Snowflake className="text-[#1565C0]" size={16} />,
      iconBg: 'bg-[#D5E3FF]'
    },
  ];

  const toggleChannel = (id: string) => {
    setSelectedChannels(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Campaign Details */}
      <section>
        <h3 className="text-[16px] font-semibold text-[#001E40] uppercase tracking-[0.55px] leading-[16.5px] mb-4">Campaign Logo / Brand Image</h3>
        <input 
          type="file"
          ref={logoInputRef}
          onChange={handleLogoChange}
          accept="image/*"
          className="hidden"
        />
        <div 
          onClick={() => logoInputRef.current?.click()}
          className="w-full h-[180px] bg-[#F2F4F6] border-2 border-dashed border-[#E2E8F0] rounded-[20px] flex flex-col items-center justify-center cursor-pointer transition-colors group overflow-hidden"
        >
          {logo ? (
            <img src={logo} alt="Campaign Logo" className="w-full h-full object-contain" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Camera className="text-[#64748B]" size={24} />
              </div>
              <p className="text-[#001E40] font-semibold text-[14px] leading-[20px] tracking-[0px] mb-1">Upload Campaign Image</p>
              <p className="text-[#94A3B8] text-[13px]">PNG, JPG or SVG (max. 5MB)</p>
            </>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-10">
        <section>
          <h3 className="text-[16px] font-semibold text-[#001E40] uppercase tracking-[0.55px] leading-[16.5px] mb-4">Campaign Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Q4 Executive Outreach 2024"
            className="w-full h-[62px] bg-[#F2F4F6] rounded-[14px] px-6 text-[#191C1E] font-medium text-[16px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 transition-all placeholder:text-[#6B7280]"
          />
        </section>

        <section>
          <h3 className="text-[16px] font-semibold text-[#001E40] uppercase tracking-[0.55px] leading-[16.5px] mb-4">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe the purpose of this campaign for internal tracking..."
            className="w-full h-[140px] bg-[#F2F4F6] rounded-[14px] p-6 text-[#191C1E] font-medium text-[16px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 transition-all placeholder:text-[#6B7280] resize-none"
          />
        </section>
      </div>

      {/* Channel Selection */}
      <section>
        <h2 className="text-[20px] font-extrabold text-[#001E40] leading-[100%] tracking-[0px] mb-4">Channel Selection</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => toggleChannel(channel.id)}
              className={`h-[100px] px-8 rounded-[20px] border transition-all cursor-pointer flex items-center gap-6 ${selectedChannels.includes(channel.id)
                ? 'bg-white border-[#C3C6D1]/47'
                : 'bg-white border-transparent hover:border-[#E2E8F0]'
                }`}
            >
              <div className={`w-[24px] h-[24px] rounded-lg border flex items-center justify-center transition-all ${selectedChannels.includes(channel.id)
                ? 'bg-[#001E40] border-[#001E40]'
                : 'bg-white border-[#E2E8F0]'
                }`}>
                {selectedChannels.includes(channel.id) && <Check size={16} className="text-white" strokeWidth={4} />}
              </div>
              <div>
                <p className="text-[#001E40] font-[600] text-[16px] leading-[24px] mb-0.5">{channel.name}</p>
                <p className="text-[#43474F] text-[12px] font-normal leading-[16px]">{channel.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience Selection */}
      <section>
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-[22px] font-extrabold text-[#001E40]">Select Audience</h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button className="flex items-center gap-[8px] h-[32px] px-[16px] bg-[#E0E3E5] text-[#001E40] rounded-[4px] text-[12px] font-[600] hover:bg-[#D1D5D8] transition-colors whitespace-nowrap cursor-pointer">
              <Upload size={14} /> Upload Contacts
            </button>
            <button className="flex items-center gap-[8px] h-[32px] px-[16px] bg-[#E0E3E5] text-[#001E40] rounded-[4px] text-[12px] font-[600] hover:bg-[#D1D5D8] transition-colors whitespace-nowrap cursor-pointer">
              <ListFilter size={14} /> Choose Segment
            </button>
          </div>
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {audiences.map((audience) => (
            <div
              key={audience.id}
              onClick={() => setSelectedAudience(audience.id)}
              className={`flex flex-col gap-[6px] p-5 min-h-[118px] bg-white rounded-[20px] border transition-all cursor-pointer relative group ${selectedAudience === audience.id
                ? 'border-[#C3C6D1]/47'
                : 'border-transparent hover:border-[#C3C6D1]/80'
                }`}
            >
              {selectedAudience === audience.id && (
                <div className="absolute top-5 right-5 w-6 h-6 bg-[#001E40] rounded-full flex items-center justify-center border-2 border-white">
                  <Check size={14} className="text-white" strokeWidth={4} />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-[36px] h-[36px] rounded-[4px] flex items-center justify-center shrink-0 ${audience.iconBg || 'bg-[#F8FAFC]'}`}>
                  {audience.icon}
                </div>
                <div className="flex-1 pr-6">
                  <p className="text-[#191C1E] font-[800] text-[16px] mb-0.5">{audience.name}</p>
                  <p className="text-[#43474F] text-[12px] font-normal leading-[16px]">
                    {audience.sub}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 ml-[64px]">
                <span className="text-[18px] font-semibold text-[#001E40] leading-[28px] tabular-nums">{audience.count}</span>
                <span className={`px-2.5 py-1 rounded-[12px] text-[10px] font-extrabold uppercase tracking-wider ${audience.badgeColor}`}>
                  {audience.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-8 shrink-0">
        <button className="flex items-center justify-center w-full sm:w-[189px] h-[40px] sm:h-[32px] bg-[#E5ECF1] text-[#191C1E] rounded-[4px] font-bold text-[14px] hover:bg-[#DDE5ED] transition-colors cursor-pointer">
          Cancel
        </button>
        <button
          onClick={onNext}
          disabled={!isStepValid}
          className={`flex items-center justify-center gap-[8px] w-full sm:w-[189px] h-[48px] sm:h-[32px] rounded-[4px] font-bold text-[14px] transition-all group ${
            isStepValid 
              ? 'bg-[#004370] text-white hover:bg-[#003152] cursor-pointer' 
              : 'bg-[#E5ECF1] text-[#004370] cursor-not-allowed'
          }`}
        >
          Continue <ChevronRight size={18} className={isStepValid ? "group-hover:translate-x-1 transition-transform" : ""} />
        </button>
      </div>
    </div>
  );
};

export default Step1;
