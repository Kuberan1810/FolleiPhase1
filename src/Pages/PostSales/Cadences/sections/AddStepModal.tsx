import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, Mail, Phone, MessageSquare } from 'lucide-react';

interface AddStepModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (stepData: {
        title: string;
        type: 'email' | 'call' | 'message';
        description: string;
        waitDuration: string;
        timeUnit: string;
    }) => void;
}

const AddStepModal: React.FC<AddStepModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [stepName, setStepName] = useState('Initial Discovery Call');
    const [stepType, setStepType] = useState('email');
    const [description, setDescription] = useState('');
    const [waitDuration, setWaitDuration] = useState('2');
    const [timeUnit, setTimeUnit] = useState('Days');
    const [skipWeekends, setSkipWeekends] = useState(true);
    const [conditionTrigger, setConditionTrigger] = useState(true);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);

    React.useEffect(() => {
        if (isOpen) {
            setStepName('Initial Discovery Call');
            setStepType('email');
            setDescription('');
            setWaitDuration('2');
            setTimeUnit('Days');
            setSkipWeekends(true);
            setConditionTrigger(true);
            setIsTypeDropdownOpen(false);
            setIsUnitDropdownOpen(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        onAdd({
            title: stepName,
            type: stepType as 'email' | 'call' | 'message',
            description: description || (stepType === 'call' ? 'Refer to the value prop email from Day 1' : 'Briefly describe the purpose of this step...'),
            waitDuration,
            timeUnit
        });
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 bg-[#0F172A]/40 flex items-center justify-center z-[9999] p-4 animate-fade-in">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-[576px] shadow-[0px_20px_50px_rgba(0,0,0,0.1)] border border-[#E2E8F0] flex flex-col gap-5 animate-scale-in">

                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-[24px] font-bold text-[#001E40] leading-tight">Add Step</h3>
                        <p className="text-[14px] text-[#43474F] mt-1">Configure a new action for your workflow sequence</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#737780] hover:text-[#1E293B] transition-colors cursor-pointer focus:outline-none"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 mt-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-[11px] font-semibold text-[#43474F] uppercase tracking-wider mb-2">Step Name</label>
                            <input
                                type="text"
                                value={stepName}
                                onChange={(e) => setStepName(e.target.value)}
                                className="w-full bg-[#F8F8F8] rounded-[10px] px-[16px] py-[12px] text-[14px] text-[#191C1E] font-medium placeholder-[#94A3B8] focus:outline-none transition-all"
                                placeholder="Enter step name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[11px] font-bold text-[#43474F] uppercase tracking-wider mb-2">Step Type</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                    className="w-full bg-[#F8F8F8] rounded-[10px] px-[16px] py-[12px] text-[14px] text-[#191C1E] font-medium focus:outline-none transition-all cursor-pointer flex items-center justify-between pl-10"
                                >
                                    <span className="capitalize">{stepType}</span>
                                    <ChevronDown size={16} className={`text-[#737780] transition-transform duration-200 ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#004370]">
                                    {stepType === 'email' && <Mail size={16} />}
                                    {stepType === 'call' && <Phone size={16} />}
                                    {stepType === 'message' && <MessageSquare size={16} />}
                                </div>

                                {isTypeDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-[12px] shadow-lg z-[9999] overflow-hidden animate-scale-in">
                                        {['email', 'call', 'message'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => {
                                                    setStepType(type as 'email' | 'call' | 'message');
                                                    setIsTypeDropdownOpen(false);
                                                }}
                                                className={`w-full px-4 py-2.5 text-[14px] font-medium text-left flex items-center gap-2.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer ${stepType === type ? 'text-[#004370] bg-[#EFF6FF]' : 'text-[#1E293B]'
                                                    }`}
                                            >
                                                <span className="text-[#004370]">
                                                    {type === 'email' && <Mail size={16} />}
                                                    {type === 'call' && <Phone size={16} />}
                                                    {type === 'message' && <MessageSquare size={16} />}
                                                </span>
                                                <span className="capitalize">{type}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[11px] font-normal text-[#43474F] uppercase tracking-wider mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#F8F8F8] rounded-[10px] px-[16px] py-[12px] text-[14px] text-[#6B7280] font-medium placeholder-[#94A3B8] focus:outline-none transition-all resize-none h-[80px]"
                            placeholder="Briefly describe the purpose of this step..."
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-[4px] h-[12px] bg-[#004370] rounded-[12px]"></div>
                        <span className="text-[14px] font-bold text-[#004370] uppercase tracking-wider">Scheduling</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-[11px] font-semibold text-[#43474F] uppercase tracking-wider mb-2">Wait Duration</label>
                                <input
                                    type="text"
                                    value={waitDuration}
                                    onChange={(e) => setWaitDuration(e.target.value)}
                                    className="w-full bg-[#F8F8F8] rounded-[10px] px-[16px] py-[12px] text-[14px] text-[#191C1E] font-medium focus:outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[11px] font-semibold text-[#43474F] uppercase tracking-wider mb-2">Time Unit</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                                        className="w-full bg-[#F8F8F8] rounded-[10px] px-[16px] py-[12px] text-[14px] text-[#191C1E] font-medium focus:outline-none transition-all cursor-pointer flex items-center justify-between"
                                    >
                                        <span>{timeUnit}</span>
                                        <ChevronDown size={16} className={`text-[#737780] transition-transform duration-200 ${isUnitDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isUnitDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-[12px] shadow-lg z-[9999] overflow-hidden animate-scale-in">
                                            {['Days', 'Hours', 'Weeks'].map((unit) => (
                                                <button
                                                    key={unit}
                                                    type="button"
                                                    onClick={() => {
                                                        setTimeUnit(unit);
                                                        setIsUnitDropdownOpen(false);
                                                    }}
                                                    className={`w-full px-4 py-2.5 text-[14px] font-medium text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer ${timeUnit === unit ? 'text-[#004370] bg-[#EFF6FF]' : 'text-[#1E293B]'
                                                        }`}
                                                >
                                                    {unit}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer group mt-1">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={skipWeekends}
                                    onChange={(e) => setSkipWeekends(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-[2px] border transition-all flex items-center justify-center ${skipWeekends
                                    ? 'bg-[#004370] border-[#004370]'
                                    : 'border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]'
                                    }`}>
                                    {skipWeekends && (
                                        <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-[14px] font-medium text-[#43474F]">Skip weekends and holidays</span>
                        </label>
                    </div>
                </div>


                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-[4px] h-[12px] bg-[#004370] rounded-[12px]"></div>
                        <span className="text-[14px] font-bold text-[#004370] uppercase tracking-wider">Visual Preferences</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-[14px] font-semibold text-[#001E40]">Condition Trigger</h4>
                            <p className="text-[11px] text-[#43474F] mt-0.5 font-medium">Only if previous step was completed</p>
                        </div>
                        <button
                            onClick={() => setConditionTrigger(!conditionTrigger)}
                            className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer p-0.5 ${conditionTrigger ? 'bg-[#EFF6FF]' : 'bg-[#F1F5F9]'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full shadow-sm transform duration-200 ease-in-out ${conditionTrigger ? 'translate-x-5 bg-[#004370]' : 'translate-x-0 bg-[#94A3B8]'
                                }`} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <button
                        onClick={onClose}
                        className="text-[14px] font-semibold text-[#222222] hover:text-[#1E293B] transition-colors cursor-pointer focus:outline-none"
                    >
                        Cancel
                    </button>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleSave}
                            className="text-[14px] font-semibold text-[#001E40] hover:text-[#004370]/80 transition-colors cursor-pointer focus:outline-none"
                        >
                            Save & Add Another
                        </button>
                        <button
                            onClick={handleSave}
                            className="py-[12px] px-[32px] bg-[#004370] text-white font-semibold text-[14px] rounded-[13px] hover:bg-[#004370]/90 transition-all cursor-pointer focus:outline-none"
                        >
                            Add Step
                        </button>
                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
};

export default AddStepModal;
