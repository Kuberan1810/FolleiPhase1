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
    className={`bg-[#FFFFFF] w-full h-[88px] rounded-[24px] p-[20px] flex items-center justify-between ${className}`}
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
    <div className="text-[#434655]">
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="w-full space-y-3">
        <div className="space-y-1 ">
          <span className="text-[12px] font-semibold text-[#004370] uppercase tracking-[0.15em]">
            Intelligence Hub
          </span>
          <h1 className="text-[30px] font-bold text-[#000000] tracking-tight">
            Settings
          </h1>
        </div>

        <div className="space-y-4 pl-3 pb-2">
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

        <div className="space-y-4 pl-3">
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