import { useState } from 'react';
import { Rocket, Headset, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const Toggle = ({ isOn, onToggle }: ToggleProps) => (
  <button
    onClick={onToggle}
    className={`w-[60px] h-[30px] shrink-0 rounded-full p-1 transition-colors duration-200 ease-in-out relative flex items-center cursor-pointer ${isOn ? 'bg-[#004370]' : 'bg-[#004370]/20'
      }`}
  >
    <div
      className={`w-[22px] h-[22px] shrink-0 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out cursor-pointer ${isOn ? 'translate-x-[30px] bg-white' : 'translate-x-0 bg-[#004370]'
        }`}
    />
  </button>
);

const NotificationSettings = () => {
  const [toggles, setToggles] = useState({
    presales: false,
    postsales: false,
    inbound: false,
    inboundCalls: false,
    inboundMessages: false,
    inboundEmails: false,
    outbound: false,
    outboundCalls: false,
    outboundMessages: false,
    outboundEmails: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full space-y-6">
          <div className="flex flex-col items-start gap-3.5">
          <div className="flex items-center gap-2 text-[14px] font-medium">
            <Link to="/settings" className="text-[#626262] hover:text-[#004370] transition-colors cursor-pointer">Settings</Link>
            <span className="text-[#626262]">{'>'}</span>
            <span className="text-[#004370] font-medium">Notification</span>
          </div>
          <div className="space-y-[4.5px]">
            <span className="text-[12px] font-extrabold text-[#004370] font-inter leading-[16px] tracking-[1.2px] uppercase">
              Intelligence Hub
            </span>
            <h1 className="text-[30px] font-extrabold text-[#191C1E] font-manrope leading-[36px] tracking-[0px]">
              Notification
            </h1>
          </div>
        </div>

        <div className="space-y-6 ">
          {/* First Card */}
          <div className='BoxStyle p-6! space-y-6'>

            {/* Presales */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-[36px] h-[36px] shrink-0 bg-[#004370]/10 rounded-lg text-[#004370]">
                  <Rocket size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[20px] font-extrabold text-[#191C1E] font-inter leading-[28px] tracking-[-0.5px]">
                  Presales
                </span>
              </div>
              <Toggle isOn={toggles.presales} onToggle={() => handleToggle('presales')} />
            </div>

            {/* Postsales */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-[36px] h-[36px] shrink-0 bg-[#004370]/10 rounded-lg text-[#004370]">
                  <Headset size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[20px] font-extrabold text-[#191C1E] font-inter leading-[28px] tracking-[-0.5px]">
                  Postsales
                </span>
              </div>
              <Toggle isOn={toggles.postsales} onToggle={() => handleToggle('postsales')} />
            </div>
          </div>
          <div className="BoxStyle p-6! space-y-6">


            {/* Inbound Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#004370]/10 rounded-lg text-[#004370]">
                  <ArrowDownLeft size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[20px] font-extrabold text-[#191C1E] font-inter leading-[28px] tracking-[-0.5px]">
                  Inbound
                </span>
              </div>
            </div>

            {/* Inbound Items */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[16px] font-semibold text-[#191C1E] font-inter leading-[24px] tracking-[0px]">calls</span>
                  <span className="text-[14px] font-normal text-[#434655] font-inter leading-[20px] tracking-[0px]">
                    Real-time alerts for incoming VoIP calls and missed voicemails.
                  </span>
                </div>
                <Toggle isOn={toggles.inboundCalls} onToggle={() => handleToggle('inboundCalls')} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[16px] font-semibold text-[#191C1E] font-inter leading-[24px] tracking-[0px]">messages</span>
                  <span className="text-[14px] font-normal text-[#434655] font-inter leading-[20px] tracking-[0px]">
                    Direct message alerts from connected social and chat platforms.
                  </span>
                </div>
                <Toggle isOn={toggles.inboundMessages} onToggle={() => handleToggle('inboundMessages')} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[16px] font-semibold text-[#191C1E] font-inter leading-[24px] tracking-[0px]">emails</span>
                  <span className="text-[14px] font-normal text-[#434655] font-inter leading-[20px] tracking-[0px]">
                    Summarized digest of prioritized incoming email threads.
                  </span>
                </div>
                <Toggle isOn={toggles.inboundEmails} onToggle={() => handleToggle('inboundEmails')} />
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="BoxStyle p-6! space-y-8">
            {/* Outbound Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#004370]/10 rounded-lg text-[#004370]">
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[20px] font-extrabold text-[#191C1E] font-inter leading-[28px] tracking-[-0.5px]">
                  Outbound
                </span>
              </div>
            </div>

            {/* Outbound Items */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[16px] font-semibold text-[#191C1E] font-inter leading-[24px] tracking-[0px]">calls</span>
                  <span className="text-[14px] font-normal text-[#434655] font-inter leading-[20px] tracking-[0px]">
                    Real-time alerts for incoming VoIP calls and missed voicemails.
                  </span>
                </div>
                <Toggle isOn={toggles.outboundCalls} onToggle={() => handleToggle('outboundCalls')} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[16px] font-semibold text-[#191C1E] font-inter leading-[24px] tracking-[0px]">messages</span>
                  <span className="text-[14px] font-normal text-[#434655] font-inter leading-[20px] tracking-[0px]">
                    Direct message alerts from connected social and chat platforms.
                  </span>
                </div>
                <Toggle isOn={toggles.outboundMessages} onToggle={() => handleToggle('outboundMessages')} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[16px] font-semibold text-[#191C1E] font-inter leading-[24px] tracking-[0px]">emails</span>
                  <span className="text-[14px] font-normal text-[#434655] font-inter leading-[20px] tracking-[0px]">
                    Summarized digest of prioritized incoming email threads.
                  </span>
                </div>
                <Toggle isOn={toggles.outboundEmails} onToggle={() => handleToggle('outboundEmails')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
