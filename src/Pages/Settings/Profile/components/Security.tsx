import React from 'react';
import { Lock, ChevronRight, ShieldCheck } from 'lucide-react';

interface SecurityProps {
    onOpenPasswordModal: () => void;
}

const Security: React.FC<SecurityProps> = ({ onOpenPasswordModal }) => {
    return (
        <div className="h-[180px] bg-white rounded-[20px] overflow-hidden m-4">
            <div className="p-6 bg-white">
                <h2 className="text-[14px] font-bold text-[#414755] uppercase tracking-wider">
                    Security
                </h2>
            </div>

            <div className="px-6 pb-4 space-y-1">
                <button
                    onClick={onOpenPasswordModal}
                    className="w-full flex items-center justify-between p-2 -mx-2 rounded-lg transition-colors hover:bg-gray-50 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <Lock size={16} className="text-[#414755]" />
                        <span className="text-[14px] font-medium text-[#191C1D]">Change Password</span>
                    </div>
                    <ChevronRight size={16} className="text-[#717786]" />
                </button>

                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={16} className="text-[#414755]" />
                        <h3 className="text-[14px] font-medium text-[#191C1D]">Two-factor Authentication (2FA)</h3>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-[36px] h-[20px] bg-[#F3F4F5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[16px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-[#004370]"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Security;
