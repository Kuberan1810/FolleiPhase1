import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Network } from "lucide-react"

const VerifyOTP = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [activeTab, setActiveTab] = useState<"email" | "mobile">("mobile")
    const [username, setUsername] = useState("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [timer, setTimer] = useState(30)

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [step, timer])

    const isPhoneValid = username.trim().length >= 10
    const isOtpComplete = otp.every(d => d !== "")

    const handleGenerateOTP = (e: React.FormEvent) => {
        e.preventDefault()
        if (isPhoneValid) {
            setStep(2)
            setTimer(30)
        }
    }

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return
        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        // Move to next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handleResendOTP = () => {
        setTimer(30)
        // Add API call to resend OTP here if needed in the future
    }

    const handleConfirm = () => {
        if (isOtpComplete) {
            navigate("/onboarding")
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white md:bg-transparent">
            {/* Sidebar (Same as Login) */}
            <div className="hidden md:flex md:w-[45%] bg-[#003E6B] text-white p-6 lg:p-12 flex-col justify-between overflow-hidden relative">
                <div className="z-10 font-poppins">
                    <div className="flex items-center gap-3 mb-10 lg:mb-16">
                        <div className="bg-white p-2 rounded-lg">
                            <Network className="text-[#003E6B] size-6 lg:size-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-[35px] font-semibold tracking-tight leading-none">LiveTracker</h1>
                            <p className="text-[10px] lg:text-[15px] uppercase font-semibold tracking-widest opacity-80">Precision Orchestrator</p>
                        </div>
                    </div>

                    <div className="max-w-[519px]">
                        <h2 className="text-[32px] font-semibold font-poppins mb-[15px] leading-[18px] tracking-tight">Welcome to AI Agent</h2>
                        <p className="text-[16px] font-normal font-poppins opacity-90 leading-[22px] tracking-normal">
                            Manage your customer calls, messages & emails automatically with your AI agent
                        </p>
                    </div>
                </div>

                <div className="absolute -bottom-4 -right-12 hidden lg:block z-10 pointer-events-none">
                    <img src="/image 8.svg" alt="AI Agent Illustration" className="w-full max-w-[450px] xl:max-w-[5566px] h-auto object-contain" />
                </div>
                <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            {/* Right Content */}
            <div className="flex-1 bg-white flex flex-col justify-center items-center p-6 md:p-12 relative overflow-y-auto">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-[#F3F5F7] rounded-full mb-12 w-full max-w-md mx-auto">
                        <button
                            onClick={() => setActiveTab("email")}
                            className={`flex-1 h-[44px] text-[20px] font-normal font-inter rounded-full transition-all cursor-pointer ${activeTab === "email" ? "bg-[#004370] text-white shadow-sm" : "text-black hover:text-gray-700"}`}
                        >
                            Email id
                        </button>
                        <button
                            onClick={() => setActiveTab("mobile")}
                            className={`flex-1 h-[44px] text-[20px] font-normal font-inter rounded-full transition-all cursor-pointer ${activeTab === "mobile" ? "bg-[#004370] text-white shadow-sm" : "text-black hover:text-gray-700"}`}
                        >
                            Mobile Number
                        </button>
                    </div>

                    {step === 1 ? (
                        <>
                            <div className="text-center mb-10">
                                <h2 className="text-[28px] font-semibold font-inter text-gray-900 mb-[8px] leading-none">Login</h2>
                                <p className="text-[12px] font-medium font-manrope text-[#999999] leading-none">Let's Get You Started</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleGenerateOTP}>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[14px] font-normal font-manrope text-black leading-none">
                                        Username / Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value.replace(/[^0-9]/g, ""))}
                                        placeholder="Enter Mobile Number"
                                        className="w-full h-[50px] px-4 bg-white border border-[#B7AFAF] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] transition-all font-inter text-[16px] placeholder:text-gray-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isPhoneValid}
                                    className={`w-full h-[50px] rounded-[10px] font-normal font-inter text-[20px] transition-all duration-300 ${isPhoneValid ? "bg-[#004370] text-white shadow-lg shadow-[#004370]/20 cursor-pointer" : "bg-white border border-gray-200 text-gray-400 pointer-events-none"}`}
                                >
                                    Generate OTP
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="text-center mb-10">
                                <h2 className="text-[18px] font-bold font-inter text-black mb-[15px] leading-none">Verify your mobile number</h2>
                                <div className="inline-flex items-center justify-center min-w-[102px] px-3 h-[25px] bg-white border-[0.5px] border-black/40 rounded-[10px] shadow-[0_0_2px_rgba(0,0,0,0.1)] mb-[15px]">
                                    <span className="text-[12px] font-medium font-inter text-black/60 leading-none">{username || "99874561230"}</span>
                                </div>
                                <p className="text-[13px] text-[#333333] font-inter">Enter the code we sent to your mobile number.</p>
                            </div>

                            <div className="flex justify-between gap-3 mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-14 md:w-16 md:h-16 text-center text-2xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003E6B]/20 focus:border-[#003E6B] transition-all bg-white font-manrope shadow-sm"
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between items-center mb-12">
                                <button
                                    onClick={handleResendOTP}
                                    disabled={timer > 0}
                                    className={`font-bold text-sm ${timer > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#003E6B] hover:underline cursor-pointer"}`}
                                >
                                    Resend OTP
                                </button>
                                <span className="text-gray-400 text-sm font-medium">{timer}s</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={!isOtpComplete}
                                className={`w-full h-[50px] rounded-[10px] font-normal font-inter text-[20px] transition-all duration-300 cursor-pointer ${isOtpComplete ? "bg-[#004370] text-white shadow-lg shadow-[#004370]/20" : "bg-white border border-[#B7AFAF] text-gray-400 pointer-events-none"}`}
                            >
                                Confirm
                            </button>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-4 my-10">
                        <div className="flex-1 h-[0.5px] bg-[#999999]"></div>
                        <span className="text-xs text-gray-400 font-medium uppercase font-manrope shrink-0">OR</span>
                        <div className="flex-1 h-[0.5px] bg-[#999999]"></div>
                    </div>

                    <div className="flex justify-center mb-8">
                        <button className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-center text-gray-600 font-inter text-[12px] font-medium">
                        Don't Have An Account?{" "}
                        <Link to="/signup" className="text-[#003E6B] font-bold hover:underline">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP
