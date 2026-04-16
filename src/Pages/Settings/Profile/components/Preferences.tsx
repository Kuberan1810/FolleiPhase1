import React, { useState } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';

interface PreferencesProps {
    preferences: {
        theme: string;
        timezone: string;
        notifications: boolean;
    };
    setPreferences: React.Dispatch<React.SetStateAction<any>>;
}

const Preferences: React.FC<PreferencesProps> = ({ preferences, setPreferences }) => {
    const [isOpen, setIsOpen] = useState(false);

    const timezones = [
        'Indian Standard Time (IST) - India',
    ];

    return (
        <div className="bg-white rounded-[20px] h-full overflow-hidden">
            <div className="p-6">
                <h2 className="text-[14px] font-bold text-[#414755] uppercase tracking-wider">
                    Preferences
                </h2>
            </div>

            <div className="px-6 pb-4 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h3 className="text-[14px] font-semibold text-[#191C1D]">Theme Mode</h3>
                        <p className="text-[12px] text-[#414755]">Switch between Light and Dark mode</p>
                    </div>
                    <div className="flex items-center p-1 bg-[#F3F4F5] rounded-[8px]">
                        <button
                            onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${preferences.theme === 'light' ? 'bg-white text-[#0058BC]' : 'text-[#414755] hover:bg-white/50'}`}
                        >
                            <Sun size={16} />
                        </button>
                        <button
                            onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                            className={`p-1.5 rounded-md transition-all cursor-pointer ${preferences.theme === 'dark' ? 'bg-white text-[#0058BC]' : 'text-[#414755] hover:bg-white/50'}`}
                        >
                            <Moon size={16} />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-[#414755]">Default Timezone</label>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-[#F7F9FB] hover:bg-[#F1F3F5] rounded-[8px] text-[14px] text-[#191C1D] cursor-pointer transition-colors"
                        >
                            <span className="flex items-center gap-2">

                                {preferences.timezone}
                            </span>
                            <ChevronDown size={18} className={`text-[#414755] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-100 rounded-[12px] z-50 overflow-hidden">
                                    <div className="max-h-[240px] overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-200">
                                        {timezones.map((tz) => (
                                            <div
                                                key={tz}
                                                onClick={() => {
                                                    setPreferences(prev => ({ ...prev, timezone: tz }));
                                                    setIsOpen(false);
                                                }}
                                                className="px-5 py-3 hover:bg-gray-50 flex items-center justify-between cursor-pointer text-sm text-[#414755] transition-colors"
                                            >
                                                <span>{tz}</span>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[14px] font-semibold text-[#191C1D]">Notification</h3>
                        </div>
                        <p className="text-[12px] text-[#414755]">Receive product updates and tips</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={preferences.notifications}
                            onChange={() => setPreferences(prev => ({ ...prev, notifications: !prev.notifications }))}
                        />
                        <div className="w-[36px] h-[20px] bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[16px] 
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                        after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-[#004370]">
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
