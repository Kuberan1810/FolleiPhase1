import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, } from 'lucide-react';

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

    const getStrengthColor = () => {
        if (strength <= 25) return 'bg-[#0058BC]/30';
        if (strength <= 50) return 'bg-[#0058BC]/60';
        if (strength <= 75) return 'bg-[#0058BC]/80';
        return 'bg-[#0058BC]';
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 duration-200">
            <div className="bg-white rounded-[12px] w-full max-w-[576px] h-[620px] overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="pt-4 px-8 pb-2 flex items-start justify-between">
                    <div className="space-y-1.5">
                        <h2 className="text-[24px] font-bold text-[#191C1D] leading-tight">Change Password</h2>
                        <p className="text-[16px] text-[#414755] leading-relaxed">Ensure your account stays secure by choosing a strong password.</p>
                    </div>

                </div>

                <div className="px-8 pb-8 space-y-5">
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#414755]">Current Password</label>
                        <div className="relative">
                            <input
                                type={showCurrent ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="w-full px-3 py-3 rounded-[8px] border-none bg-[#F7F9FB] text-[16px] text-[#717786]/50 outline-none transition-all placeholder:text-[#717786]/50"
                            />
                            <button
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717786] transition-colors"
                            >
                                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#414755]">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-[8px] border-none bg-[#F7F9FB] text-[16px] text-[#191C1E] outline-none transition-all placeholder:text-[#B1B5C0]"
                            />
                            <button
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717786] hover:text-[#191C1E] transition-colors"
                            >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <label className="text-[12px] font-medium text-[#414755]">Password Strength</label>

                        <div className="pt-1 flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-[#004370] rounded-full overflow-hidden">

                                <div
                                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                                    style={{ width: `${strength}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-[#004370] uppercase tracking-wider min-w-[45px] text-right">
                                {strength <= 25 ? 'Weak' : strength <= 50 ? 'Fair' : strength <= 75 ? 'Medium' : 'Strong'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#414755]">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-[8px] border-none bg-[#F7F9FB] text-sm text-[#191C1E] outline-none transition-all placeholder:text-[#B1B5C0]"
                            />
                            <button
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717786] hover:text-[#191C1E] transition-colors"
                            >

                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <p className="text-[12px] font-bold text-[#191C1D] uppercase tracking-[0.1em] mb-4">Requirements</p>
                        <div className="grid grid-cols-2 gap-y-3">
                            {passwordRequirements.map((req, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    {req.met ? (
                                        <div className="w-[15px] h-[15px] rounded-full bg-[#004370] flex items-center justify-center">
                                            <CheckCircle2 size={12} className="text-white" />
                                        </div>
                                    ) : (
                                        <div className="w-[15px] h-[15px] rounded-full bg-transparent border-2 border-[#717786]" />
                                    )}
                                    <span className={`text-[12px] ${req.met ? 'text-[#414755] font-medium' : 'text-[#414755]'}`}>{req.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-8 pt-2 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#F5F5F5] border border-[#E2E8F0] text-[#414755] text-[14px] font-bold rounded-[8px] hover:bg-[#F3F4F5] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-[#014370] text-white text-[14px] font-bold rounded-[8px] hover:bg-[#00365a] transition-all"
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
