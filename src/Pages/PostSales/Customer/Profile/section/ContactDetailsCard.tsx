import React from 'react';
import { Phone, MapPin, Building2 } from 'lucide-react';

interface ContactDetailsCardProps {
  customer: {
    phone: string;
    location: string;
    company: string;
  };
}

const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({ customer }) => {
  const contactData = [
    {
      label: 'Phone',
      value: customer.phone,
      icon: Phone
    },
    {
      label: 'Location',
      value: customer.location,
      icon: MapPin
    },
    {
      label: 'Company',
      value: customer.company,
      icon: Building2
    }
  ];

  return (
    <div className="bg-white border border-[#EEF0FF] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col gap-4">
      <h3 className="text-[16px] font-bold text-[#1E293B] uppercase tracking-wider">Contact Details</h3>
      <div className="flex flex-col gap-4">
        {contactData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[12px] bg-[#F8FAFC] flex items-center justify-center text-[#004370] shrink-0">
                <IconComponent className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#004370] font-semibold uppercase tracking-wider">{item.label}</span>
                <span className="text-[12px] font-medium text-[#131B2E]">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactDetailsCard;
