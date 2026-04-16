import React, { useState } from 'react';
import { Eye, EyeOff, Check, } from 'lucide-react';

interface ChangePasswordModalProps {
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose }) => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const passwordRequirements = [
        { label: 'At least 8 characters', met: newPassword.length >= 8 },
        { label: '1 special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
        { label: '1 uppercase letter', met: /[A-Z]/.test(newPassword) },
        { label: '1 number', met: /[0-9]/.test(newPassword) },
    ];

    const strength = (passwordRequirements.filter(r => r.met).length / passwordRequirements.length) * 100;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 duration-200 overflow-y-auto">
            <div className="bg-white rounded-[12px] w-full max-w-[596px] h-fit flex flex-col overflow-hidden mx-auto">
                <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-4 sm:pb-6 flex items-start justify-between shrink-0">
                    <div className="space-y-1">
                        <h2 className="text-[24px] font-bold text-[#191C1D] leading-tight">Change Password</h2>
                        <p className="text-[14px] text-[#414755] leading-relaxed">Ensure your account stays secure by choosing a strong password.</p>
                    </div>
                </div>

                <div className="px-6 sm:px-10 space-y-4 sm:space-y-5 flex-1 ">
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-semibold text-[#414755]">Current Password</label>
                        <div className="relative">
                            <input
                                type={showCurrent ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="w-full h-[50px] px-5 py-4 rounded-[8px] border-b-[0.5px] border-[#000000]/15 bg-[#F7F9FB] text-[16px] text-[#717786]/50 outline-none transition-all placeholder:text-[#717786]/50"
                            />
                            <button
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717786] hover:text-[#191C1E] transition-colors cursor-pointer"
                            >
                                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-semibold text-[#414755]">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter New Password"
                                className="w-full h-[50px] px-5 py-4 rounded-[8px] border-b-[0.5px] border-[#000000]/15 bg-[#F7F9FB] text-[16px] text-[#191C1E] outline-none transition-all placeholder:text-[#B1B5C0]"
                            />
                            <button
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717786] hover:text-[#191C1E] transition-colors cursor-pointer"
                            >
                                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="flex items-center justify-between pt-0.5">
                            <label className="text-[12px] font-semibold text-[#414755]">Password Strength</label>
                            <span className="text-[12px] font-bold text-[#004370]">
                                {strength <= 25 ? 'Weak' : strength <= 50 ? 'Fair' : strength <= 75 ? 'Medium' : 'Strong'}
                            </span>
                        </div>

                        <div className="pt-0.5 flex items-center gap-2">
                            {[1, 2, 3].map((segment) => (
                                <div
                                    key={segment}
                                    className={`h-[4px] flex-1 rounded-full transition-all duration-300 ${(strength / 33.33) >= segment ? 'bg-[#004370]' : 'bg-[#E2E8F0]'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-semibold text-[#414755]">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                className="w-full h-[50px] px-5 py-4 rounded-[8px] border-b-[0.5px] border-[#000000]/15 bg-[#F7F9FB] text-[16px] text-[#191C1E] outline-none transition-all placeholder:text-[#B1B5C0]"
                            />
                            <button
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717786] hover:text-[#191C1E] transition-colors cursor-pointer"
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#F7F9FB] rounded-[8px] p-4 sm:p-5">
                        <p className="text-[12px] font-semibold text-[#191C1D] uppercase tracking-wider mb-2 sm:mb-3">Requirements</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-3">
                            {passwordRequirements.map((req, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    {req.met ? (
                                        <div className="w-[16px] h-[16px] rounded-full bg-[#014370] flex items-center justify-center shrink-0">
                                            <Check size={10} className="text-white" strokeWidth={4} />
                                        </div>
                                    ) : (
                                        <div className="w-[16px] h-[16px] rounded-full border-2 border-[#B1B5C0] shrink-0" />
                                    )}
                                    <span className={`text-[12px] sm:text-[13px] ${req.met ? 'text-[#191C1D] font-medium' : 'text-[#717786]'}`}>{req.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-end gap-3 sm:gap-4 shrink-0">
                    <button
                        onClick={onClose}
                        className="flex-1 sm:flex-none sm:w-[124px] py-2 sm:py-2.5 bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#191C1E] text-[14px] font-semibold border-b-[0.5px] border-[#000000]/15 rounded-[8px] cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 sm:flex-none sm:w-[160px] py-2 sm:py-2.5 bg-[#014370] hover:bg-[#00365a] text-white text-[14px] font-semibold rounded-[8px] cursor-pointer transition-all"
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
