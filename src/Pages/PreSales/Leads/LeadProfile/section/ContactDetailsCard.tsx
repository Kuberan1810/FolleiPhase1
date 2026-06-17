import React from 'react';
import { Phone, MapPin, Building2 } from 'lucide-react';

const ContactDetailsCard = () => {
  const details = [
    { icon: Phone, label: 'PHONE', value: '+91 98765 43210' },
    { icon: MapPin, label: 'LOCATION', value: 'Bangalore, India' },
    { icon: Building2, label: 'COMPANY', value: 'ABC Technologies' },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#EDF3FD]">
      <h2 className="text-[16px] font-extrabold text-[#191C1E] mb-7">Contact Details</h2>
      <div className="flex flex-col gap-6">
        {details.map((d, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-[12px] bg-[#F7F9FB] flex items-center justify-center shrink-0">
              <d.icon className="w-5 h-5 text-[#004370]" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#004370] tracking-wider uppercase mb-0.5">{d.label}</span>
              <span className="text-[13px] font-semibold text-[#191C1E]">{d.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContactDetailsCard;
