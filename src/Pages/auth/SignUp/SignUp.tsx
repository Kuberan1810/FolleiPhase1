
import { Network } from "lucide-react"
import { useState } from "react"

const SignUp = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // handle sign up logic here
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white md:bg-transparent">
            {/* Sidebar */}
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
                        <h2 className="text-3xl lg:text-[49px] font-semibold mb-[15px] leading-tight tracking-tight">Welcome to AI Agent</h2>
                        <p className="text-lg lg:text-[20px] font-medium opacity-90 leading-relaxed tracking-normal">
                            Manage your customer calls, messages & emails automatically with your AI agent
                        </p>
                    </div>
                </div>

                <div className="absolute -bottom-4 -right-12 hidden lg:block">
                    <img
                        src="/image 8.svg"
                        alt="AI Agent Illustration"
                        className="w-[450px] xl:w-[556px] h-auto object-contain"
                    />
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            {/* Right Content */}
            <div className="flex-1 bg-white flex flex-col justify-center items-center p-6 md:p-12 relative overflow-y-auto">
                {/* Mobile Heading & Logo */}
                <div className="md:hidden w-full max-w-md flex flex-col mb-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-[#003E6B] p-2 rounded-lg">
                            <Network className="text-white size-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#003E6B] font-['Poppins']">LiveTracker</h1>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                        <p className="text-gray-500">Join us and get started in seconds</p>
                    </div>
                </div>

                <div className="w-full max-w-md">
                    {/* Desktop heading */}
                    <div className="hidden md:block mb-8">
                        <h2 className="text-3xl lg:text-[32px] font-bold text-gray-900 mb-1 tracking-tight">Create Your Account</h2>
                        <p className="text-gray-500 text-sm">Join us and get started in seconds</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#003E6B] focus:ring-1 focus:ring-[#003E6B] transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#003E6B] focus:ring-1 focus:ring-[#003E6B] transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#003E6B] focus:ring-1 focus:ring-[#003E6B] transition-all"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#003E6B] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#002f52] transition-colors mt-1"
                        >
                            Sign up
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 font-medium">OR</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Google Sign Up */}
                        <button className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition-colors">
                            <svg className="size-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-sm text-gray-500">
                            Do you Have An Account?{" "}
                            <a href="/login" className="text-[#003E6B] font-semibold hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp

