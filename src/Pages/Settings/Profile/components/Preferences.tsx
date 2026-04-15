import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface PreferencesProps {
    preferences: {
        theme: string;
        timezone: string;
        notifications: boolean;
    };
    setPreferences: React.Dispatch<React.SetStateAction<any>>;
}

const Preferences: React.FC<PreferencesProps> = ({ preferences, setPreferences }) => {
    return (
        <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden h-full">
            <div className="p-6 bg-white">
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
                            className={`p-1.5 rounded-md transition-all ${preferences.theme === 'light' ? 'bg-white text-[#0058BC]' : 'text-[#414755]'}`}
                        >
                            <Sun size={16} />
                        </button>
                        <button
                            onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                            className={`p-1.5 rounded-md transition-all ${preferences.theme === 'dark' ? 'bg-white text-[#0058BC]' : 'text-[#414755]'}`}
                        >
                            <Moon size={16} />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">

                        <label className="text-xs font-semibold text-[#414755]">Default Timezone</label>
                    </div>
                    <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-[8px] bg-[#F7F9FB] text-sm text-[#191C1D] outline-none hover:border-gray-200 transition-colors cursor-pointer"
                    >
                        <option>Indian Standard Time (IST) - India</option>
                    </select>
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
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0C4A6E]"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
