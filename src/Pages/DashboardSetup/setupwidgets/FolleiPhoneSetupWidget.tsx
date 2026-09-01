import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { setupMemoryStore } from '../data/setupMemoryStore';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
];

interface FolleiPhoneSetupWidgetProps {
  onComplete?: () => void;
  initialStep?: number;
}

export const FolleiPhoneSetupWidget: React.FC<FolleiPhoneSetupWidgetProps> = ({
  onComplete,
  initialStep = 1,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(() => setupMemoryStore.phoneSetupCurrentStep || initialStep);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Step 2 (WhatsApp) States: 'input' | 'verify' | 'connected'
  const [step2SubStep, setStep2SubStep] = useState<'input' | 'verify' | 'connected'>(() => setupMemoryStore.step2SubStep || 'input');
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>(() => setupMemoryStore.whatsAppNumber || '');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [otp, setOtp] = useState<string[]>(() => setupMemoryStore.otp || ['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

const isPersonalEmail = (email: string) => {
  const domain = email.trim().toLowerCase().split('@')[1] || '';
  const personalDomains = [
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in',
    'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com',
    'protonmail.com', 'live.com', 'ymail.com', 'msn.com'
  ];
  return personalDomains.includes(domain);
};

// Step 3 (Company Email) States: 'input' | 'check-inbox' | 'verified'
  const [step3SubStep, setStep3SubStep] = useState<'input' | 'check-inbox' | 'verified'>(() => setupMemoryStore.step3SubStep || 'input');
  const [workEmail, setWorkEmail] = useState<string>(() => setupMemoryStore.workEmail || '');
  const [emailError, setEmailError] = useState<string | null>(null);

  // Sync memory store
  useEffect(() => {
    setupMemoryStore.phoneSetupCurrentStep = currentStep;
  }, [currentStep]);

  useEffect(() => {
    setupMemoryStore.step2SubStep = step2SubStep;
  }, [step2SubStep]);

  useEffect(() => {
    setupMemoryStore.whatsAppNumber = whatsAppNumber;
  }, [whatsAppNumber]);

  useEffect(() => {
    setupMemoryStore.otp = otp;
  }, [otp]);

  useEffect(() => {
    setupMemoryStore.step3SubStep = step3SubStep;
  }, [step3SubStep]);

  useEffect(() => {
    setupMemoryStore.workEmail = workEmail;
  }, [workEmail]);

  const phoneNumbers = [
    {
      id: 'num1',
      label: 'FOLLEI NUMBER 1',
      number: '+91 98765 43210',
    },
    {
      id: 'num2',
      label: 'FOLLEI NUMBER 2',
      number: '+91 98765 43211',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '');
    if (!cleanVal && val !== '') return;

    const newOtp = [...otp];

    if (cleanVal.length > 1) {
      const digits = cleanVal.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      setupMemoryStore.otp = newOtp;
      const nextIdx = Math.min(digits.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    newOtp[index] = cleanVal.slice(-1);
    setOtp(newOtp);
    setupMemoryStore.otp = newOtp;

    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        setupMemoryStore.otp = newOtp;
        otpInputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        setupMemoryStore.otp = newOtp;
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleSendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsAppNumber.length === 10) {
      setStep2SubStep('verify');
      setupMemoryStore.step2SubStep = 'verify';
      setOtp(['', '', '', '', '', '']);
      setupMemoryStore.otp = ['', '', '', '', '', ''];
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 50);
    }
  };

  const isOtpComplete = otp.every((digit) => digit.trim() !== '');

  const handleVerifyNumber = () => {
    if (!isOtpComplete) return;
    setStep2SubStep('connected');
    setupMemoryStore.step2SubStep = 'connected';
  };

  const handleContinueFromStep2 = () => {
    setCurrentStep(3);
    setupMemoryStore.phoneSetupCurrentStep = 3;
    setStep3SubStep('input');
    setupMemoryStore.step3SubStep = 'input';
  };

  const handleWorkEmailChange = (val: string) => {
    setWorkEmail(val);
    const trimmed = val.trim().toLowerCase();
    if (isPersonalEmail(trimmed)) {
      setEmailError('Please enter a valid company email');
    } else {
      setEmailError(null);
    }
  };

  const handleSendEmailVerification = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = workEmail.trim().toLowerCase();
    if (isPersonalEmail(trimmed)) {
      setEmailError('Please enter a valid company email');
      return;
    }
    if (!trimmed.includes('@') || !trimmed.includes('.')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (trimmed.length > 3) {
      setEmailError(null);
      setStep3SubStep('check-inbox');
      setupMemoryStore.step3SubStep = 'check-inbox';
    }
  };

  const handleVerifiedEmailDone = () => {
    setStep3SubStep('verified');
    setupMemoryStore.step3SubStep = 'verified';
  };

  const getMaskedNumber = () => {
    const raw = whatsAppNumber.replace(/\D/g, '');
    const last4 = raw.length >= 4 ? raw.slice(-4) : raw || '9274';
    return `${countryCode} ••••••${last4}`;
  };

  const getDisplayPhone = () => {
    const raw = whatsAppNumber.trim() || '8344437371';
    return `${countryCode} ${raw}`;
  };

  const getDisplayEmail = () => {
    return workEmail.trim() || 'info@coirei.com';
  };

  return (
    <aside className="rounded-[22px] border border-[#E6E6E4] bg-white overflow-hidden transition-all">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-100 px-5 h-[52px]">
        <span className="text-[15px] font-bold tracking-tight text-[#16171A]">
          {currentStep === 1
            ? 'Follei Setup'
            : currentStep === 2
            ? step2SubStep === 'verify'
              ? 'Verify WhatsApp number'
              : 'Connect WhatsApp'
            : step3SubStep === 'check-inbox'
            ? 'Check your inbox'
            : 'Company email'}
        </span>
        <span className="text-[11.5px] font-semibold text-[#7A9601] bg-[#F4F8E6] px-2.5 py-0.5 rounded-full">
          {currentStep} of 3
        </span>
      </header>

      {/* Body */}
      <div className="flex flex-col gap-4.5 p-5">
        {/* ========================================================================= */}
        {/* STEP 1: Follei Phone Numbers */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-fade-slide">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-[14px] font-semibold text-[#16171A]">
                Follei Phone Numbers
              </h4>
              <p className="text-[12.5px] text-[#717378]">
                Follei has provided these numbers for your workspace.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {phoneNumbers.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-[14px] bg-[#F8F8F6] border border-[#E6E6E4] px-3.5 py-3 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium tracking-wider text-[#717378] uppercase">
                      {item.label}
                    </span>
                    <span className="text-[14px] font-semibold text-[#16171A] mt-0.5">
                      {item.number}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.number)}
                    title="Copy number"
                    aria-label={`Copy ${item.label}`}
                    className="flex size-7 items-center justify-center rounded-lg text-[#717378] hover:bg-white hover:text-[#16171A] transition-colors cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <Check className="size-3.5 text-[#7A9601] stroke-[2.5]" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-[14px] bg-[#F8FAF0] border border-[#E5ECC8] p-3 text-[12px] leading-relaxed text-[#556900]">
              These numbers will be used with your Follei workspace. Ensure they are added to your authorized contacts.
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center gap-1.5 pt-1">
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#E6E6E4]" />
              <div className="h-1 flex-1 rounded-full bg-[#E6E6E4]" />
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full py-2.5 rounded-[10px] bg-[#7A9601] hover:bg-[#688001] text-white font-semibold text-[13.5px] transition-colors cursor-pointer flex items-center justify-center"
            >
              Continue
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2A: Connect WhatsApp (Phone Input) */}
        {/* ========================================================================= */}
        {currentStep === 2 && step2SubStep === 'input' && (
          <form onSubmit={handleSendVerification} className="flex flex-col gap-4 animate-fade-slide">
            <div className="flex flex-col gap-0.5">
              <p className="text-[12.5px] text-[#717378]">
                Provide the WhatsApp number you want to connect with Follei.
              </p>
            </div>

            {/* Input Row */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-[12px] font-medium text-[#717378]">
                WhatsApp number
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex items-center gap-1.5 px-3 py-2 border border-[#CBD5E1] rounded-[10px] bg-white text-[14px] text-[#16171A] font-medium shrink-0 hover:border-[#7A9601] transition-colors cursor-pointer">
                  <span>{countryCode}</span>
                  <ChevronDown className="size-3.5 text-[#717378]" />
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 text-[14px]"
                    aria-label="Select country code"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={`${item.code}-${item.country}`} value={item.code}>
                        {item.flag} {item.code} ({item.country})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                 
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-[10px] bg-white text-[14px] text-[#16171A] focus:border-[#7A9601] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* 3-segment progress indicator */}
            <div className="flex items-center gap-1.5 pt-2">
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#E6E6E4]" />
              <div className="h-1 flex-1 rounded-full bg-[#E6E6E4]" />
            </div>

            <button
              type="submit"
              disabled={whatsAppNumber.length !== 10}
              className={`w-full py-2.5 rounded-[10px] font-semibold text-[13.5px] transition-colors flex items-center justify-center ${
                whatsAppNumber.length === 10
                  ? 'bg-[#7A9601] hover:bg-[#688001] text-white cursor-pointer'
                  : 'bg-[#7A9601] opacity-40 text-white cursor-not-allowed'
              }`}
            >
              Send verification
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2B: Verify WhatsApp Number (OTP Input) */}
        {/* ========================================================================= */}
        {currentStep === 2 && step2SubStep === 'verify' && (
          <div className="flex flex-col gap-3.5 animate-fade-slide">
            <div className="flex flex-col gap-0.5">
              <p className="text-[12.5px] text-[#717378] leading-snug">
                We've sent a verification code to your WhatsApp number.
              </p>
            </div>

            <div className="text-[14px] font-bold text-[#16171A] tracking-wide pt-0.5">
              {getMaskedNumber()}
            </div>

            {/* OTP Code Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#717378]">
                Verification code
              </label>
              <div className="grid grid-cols-6 border border-[#CBD5E1] rounded-[10px] overflow-hidden bg-white">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`h-11 w-full text-center text-[15px] font-semibold text-[#16171A] bg-transparent outline-none caret-transparent select-none ${
                      idx !== 0 ? 'border-l border-[#CBD5E1]' : ''
                    } focus:bg-slate-50/50`}
                  />
                ))}
              </div>
            </div>

            {/* 3-segment progress indicator */}
            <div className="flex items-center gap-1.5 pt-2">
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#E6E6E4]" />
            </div>

            {/* Buttons */}
            <button
              type="button"
              onClick={handleVerifyNumber}
              disabled={!isOtpComplete}
              className={`w-full py-2.5 rounded-[10px] font-semibold text-[13.5px] transition-colors flex items-center justify-center ${
                isOtpComplete
                  ? 'bg-[#7A9601] hover:bg-[#688001] text-white cursor-pointer'
                  : 'bg-[#7A9601] opacity-40 text-white cursor-not-allowed'
              }`}
            >
              Verify number
            </button>

            <button
              type="button"
              onClick={() => {
                setOtp(['', '', '', '', '', '']);
                setupMemoryStore.otp = ['', '', '', '', '', ''];
                otpInputRefs.current[0]?.focus();
              }}
              className="text-[13px] font-semibold text-[#16171A] hover:underline text-center cursor-pointer transition-all pt-0.5"
            >
              Resend code
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2C: WhatsApp Connected Success State */}
        {/* ========================================================================= */}
        {currentStep === 2 && step2SubStep === 'connected' && (
          <div className="flex flex-col gap-4 animate-fade-slide">
            {/* Success Box */}
            <div className="rounded-[12px] bg-[#F8FAF0] border border-[#D1E094] px-4 py-3 flex items-center gap-2 text-[#7A9601] font-semibold text-[13.5px]">
              <Check className="size-4 stroke-[2.5]" />
              <span>WhatsApp connected</span>
            </div>

            {/* Connected Phone Display */}
            <div className="text-[13px] text-[#717378] font-normal -mt-1 pl-0.5">
              {getDisplayPhone()}
            </div>

            {/* 3-segment progress indicator */}
            <div className="flex items-center gap-1.5 pt-2">
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#E6E6E4]" />
            </div>

            <button
              type="button"
              onClick={handleContinueFromStep2}
              className="w-full py-2.5 rounded-[10px] bg-[#7A9601] hover:bg-[#688001] text-white font-semibold text-[13.5px] transition-colors cursor-pointer flex items-center justify-center"
            >
              Continue
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3A: Company Email Input */}
        {/* ========================================================================= */}
        {currentStep === 3 && step3SubStep === 'input' && (
          <form onSubmit={handleSendEmailVerification} className="flex flex-col gap-4 animate-fade-slide">
            <div className="flex flex-col gap-0.5">
              <p className="text-[12.5px] text-[#717378]">
                Provide your company email to complete your Follei setup.
              </p>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-[12px] font-medium text-[#717378]">
                Work email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={workEmail}
                onChange={(e) => handleWorkEmailChange(e.target.value)}
                className={`w-full px-3.5 py-2 border rounded-[10px] bg-white text-[14px] text-[#16171A] focus:outline-none transition-colors ${
                  emailError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#CBD5E1] focus:border-[#7A9601]'
                }`}
              />
              {emailError && (
                <p className="text-[12px] font-medium text-red-500 mt-0.5">
                  {emailError}
                </p>
              )}
            </div>

            {/* 3-segment progress indicator */}
            <div className="flex items-center gap-1.5 pt-2">
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#E6E6E4]" />
            </div>

            <button
              type="submit"
              disabled={!workEmail.trim() || isPersonalEmail(workEmail) || Boolean(emailError)}
              className={`w-full py-2.5 rounded-[10px] font-semibold text-[13.5px] transition-colors flex items-center justify-center ${
                workEmail.trim() && !isPersonalEmail(workEmail) && !emailError
                  ? 'bg-[#7A9601] hover:bg-[#688001] text-white cursor-pointer'
                  : 'bg-[#7A9601] opacity-40 text-white cursor-not-allowed'
              }`}
            >
              Verify email
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 3B: Check Your Inbox */}
        {/* ========================================================================= */}
        {currentStep === 3 && step3SubStep === 'check-inbox' && (
          <div className="flex flex-col gap-3.5 animate-fade-slide">
            <div className="flex flex-col gap-0.5">
              <p className="text-[12.5px] text-[#717378] leading-snug">
                We've sent a verification link to your company email.
              </p>
            </div>

            <div className="text-[14px] font-bold text-[#16171A] tracking-wide pt-0.5">
              {getDisplayEmail()}
            </div>

            {/* 3-segment progress indicator (All 3 segments filled) */}
            <div className="flex items-center gap-1.5 pt-2">
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={handleVerifiedEmailDone}
                className="w-full py-2.5 rounded-[10px] bg-[#7A9601] hover:bg-[#688001] text-white font-semibold text-[13.5px] transition-colors cursor-pointer flex items-center justify-center"
              >
                I've verified my email
              </button>

              <button
                type="button"
                onClick={() => {}}
                className="w-full py-2.5 rounded-[10px] bg-[#F4F8E6] hover:bg-[#EAEFD4] text-[#7A9601] font-semibold text-[13.5px] transition-colors cursor-pointer flex items-center justify-center"
              >
                Resend email
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3C: Email Verified Success State -> Finish Setup */}
        {/* ========================================================================= */}
        {currentStep === 3 && step3SubStep === 'verified' && (
          <div className="flex flex-col gap-4 animate-fade-slide">
            {/* Success Box */}
            <div className="rounded-[12px] bg-[#F8FAF0] border border-[#D1E094] px-4 py-3 flex items-center gap-2 text-[#7A9601] font-semibold text-[13.5px]">
              <Check className="size-4 stroke-[2.5]" />
              <span>Email verified</span>
            </div>

            {/* Verified Email Display */}
            <div className="text-[13px] text-[#717378] font-normal -mt-1 pl-0.5">
              {getDisplayEmail()}
            </div>

            {/* 3-segment progress indicator (All 3 segments filled) */}
            <div className="flex items-center gap-1.5 pt-2">
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
              <div className="h-1 flex-1 rounded-full bg-[#7A9601]" />
            </div>

            <button
              type="button"
              onClick={onComplete}
              className="w-full py-2.5 rounded-[10px] bg-[#7A9601] hover:bg-[#688001] text-white font-semibold text-[13.5px] transition-colors cursor-pointer flex items-center justify-center"
            >
              Finish Setup
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FolleiPhoneSetupWidget;
