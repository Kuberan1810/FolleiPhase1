
import { Phone, MapPin, Building2 } from 'lucide-react';

const ContactDetailsCard = () => {
  const details = [
    { icon: Phone, label: 'PHONE', value: '+91 98765 43210' },
    { icon: MapPin, label: 'LOCATION', value: 'Bangalore, India' },
    { icon: Building2, label: 'COMPANY', value: 'ABC Technologies' },
  ];

  return (
    <div className="BoxStyle">
      <h2 className="text-[20px] font-bold text-[#191C1E] mb-7">Contact Details</h2>
      <div className="flex flex-col gap-6">
        {details.map((d, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="p-3 rounded-[12px] bg-[#F8FAFC] flex items-center justify-center shrink-0">
              <d.icon className="  text-[#004370]" color="currentColor" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#004370] tracking-wider uppercase mb-0.5">{d.label}</span>
              <span className="text-[14px] font-medium text-[#1E293B]">{d.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContactDetailsCard;
