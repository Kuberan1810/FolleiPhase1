// import React from 'react';
// import { Link } from 'react-router-dom';
// import { User, CreditCard, Bell, MessageSquare, ShieldCheck, FileText, CircleHelp, ChevronRight, Settings as SettingsIcon } from 'lucide-react';

// const SettingsItem = ({ icon: Icon, label, to }: { icon: any, label: string, to: string }) => (
//   <Link
//     to={to}
//     className="flex items-center justify-between p-5 transition-all duration-200 last:border-0"
//   >
//     <div className="flex items-center gap-4">
//       <div className="flex items-center justify-center text-[#004370] ">
//         <Icon size={20} strokeWidth={1.5} />
//       </div>
//       <span className="text-[15px] font-medium text-[#191C1E]">
//         {label}
//       </span>
//     </div>
//     <ChevronRight size={20} className="text-[#004370] md:w-[6px] md:h-[12px]" />
//   </Link>
// );

// const Settings = () => {
//   const settingsOptions = [
//     { icon: User, label: "Profile Settings", to: "/settings/profile" },
//     { icon: CreditCard, label: "Payment and Subscription", to: "/settings/payment" },
//     { icon: Bell, label: "Notification", to: "/settings/notification" },
//     { icon: MessageSquare, label: "Feedback", to: "/settings/feedback" },
//     { icon: ShieldCheck, label: "Privacy Policy", to: "/settings/privacy" },
//     { icon: FileText, label: "Terms and Conditions", to: "/settings/terms" },
//     { icon: CircleHelp, label: "Help center", to: "/settings/help" },
//   ];

//   return (
//     <div className="min-h-screen pb-12 -mx-4 lg:-mx-8 -mt-4 bg-[#F7F9FB]">
//       <div className="bg-[#014370] pt-12 md:pt-16 pb-20 md:pb-28 px-6 md:px-8 rounded-b-[48px] md:rounded-b-[72px] relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-64 h-64 md:w-[1143px] md:h-[528px] bg-white/5 rounded-full -mr-16 md:-mr-32 -mt-16 md:-mt-32 blur-[40px] md:blur-[80px]"></div>
//         <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-[#014370] rounded-full -ml-16 md:-ml-20 -mb-16 md:-mb-20 blur-[40px] md:blur-[60px]"></div>

//         <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-start text-left">
//           <span className="text-[9px] md:text-[12px] font-bold text-white uppercase tracking-[0.25em] mb-2 md:mb-1">
//             Intelligence Hub
//           </span>
//           <div className="flex items-center gap-2 -ml-1.5">
//             <div className="p-1.5 md:p-2 backdrop-blur-sm">
//               <SettingsIcon size={32} className="text-white md:w-[32px] md:h-[32px]" />
//             </div>
//             <h1 className="text-2xl md:text-[30px] font-bold text-white tracking-tight">Settings</h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-3xl mx-auto -mt-10 md:-mt-14 px-4 relative z-20">
//         <div className="bg-white rounded-2xl md:rounded-[16px] overflow-hidden shadow-[0px_1px_6px_0px_rgba(0,0,0,0.25)] border border-white/20 backdrop-blur-xl">
//           <div className="flex flex-col">
//             {settingsOptions.map((option, index) => (
//               <SettingsItem
//                 key={index}
//                 icon={option.icon}
//                 label={option.label}
//                 to={option.to}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;


import React from 'react';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, MessageSquare, ShieldCheck, FileText, CircleHelp, ChevronRight } from 'lucide-react';

interface SettingsItemProps {
  icon: React.ElementType;
  label: string;
  description: string;
  to: string;
  className?: string;
}

const SettingsItem = ({ icon: Icon, label, description, to, className = "" }: SettingsItemProps) => (
  <Link
    to={to}
    className={`bg-[#FFFFFF] w-full h-[88px] rounded-[24px] p-[20px] flex items-center justify-between group hover:bg-[#014370]/5 transition-all duration-200 ${className}`}
  >
    <div className="flex items-center gap-5">
      <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#014370]/15 rounded-[12px] text-[#014370] shrink-0">
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-semibold text-[#191C1E]">
          {label}
        </span>
        <span className="text-[14px] text-[#434655]">
          {description}
        </span>
      </div>
    </div>
    <div className="text-[#434655] transition-transform duration-300 ease-out group-hover:translate-x-1.5">
      <ChevronRight size={20} strokeWidth={2.5} />
    </div>
  </Link>
);

const Settings = () => {
  const accountOptions = [
    { icon: User, label: "Profile Settings", description: "Update personal info and verification details", to: "/settings/profile" },
    { icon: CreditCard, label: "Payment & Subscription", description: "Manage billing cycles and payment methods", to: "/settings/payment" },
    { icon: Bell, label: "Notifications", description: "Configure email alerts and desktop pings", to: "/settings/notification" },
  ];

  const supportGridOptions = [
    { icon: MessageSquare, label: "Feedback", description: "Help us improve", to: "/settings/feedback" },
    { icon: CircleHelp, label: "Help Center", description: "Documentation & support", to: "/settings/help" },
  ];

  const legalOptions = [
    { icon: ShieldCheck, label: "Privacy Policy", description: "Your privacy matters to us. We keep your data safe and secure.", to: "/settings/privacy" },
    { icon: FileText, label: "Terms and Conditions", description: "Follow our rules while using this platform.", to: "/settings/terms" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4">
      <div className="w-full space-y-3">
        <div className="space-y-1 ">
          <span className="text-[12px] font-semibold text-[#004370] uppercase tracking-[0.15em]">
            Intelligence Hub
          </span>
          <h1 className="text-[30px] font-bold text-[#000000] tracking-tight">
            Settings
          </h1>
        </div>

        <div className="space-y-4 pb-2">
          <h2 className="text-[12px] font-bold text-[#434655] uppercase tracking-wider pl-3">
            ACCOUNT MANAGEMENT
          </h2>
          <div className="grid gap-3">
            {accountOptions.map((option, index) => (
              <SettingsItem
                key={index}
                icon={option.icon}
                label={option.label}
                description={option.description}
                to={option.to}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[12px] font-bold text-[#434655] uppercase tracking-wider pl-3">
            SUPPORT & LEGAL
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {supportGridOptions.map((option, index) => (
                <SettingsItem
                  key={index}
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                  to={option.to}
                />
              ))}
            </div>

            <div className="grid gap-3">
              {legalOptions.map((option, index) => (
                <SettingsItem
                  key={index}
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                  to={option.to}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;