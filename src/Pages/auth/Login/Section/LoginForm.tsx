
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

const LoginForm = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"email" | "mobile">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const isFormValid = username.trim() !== "" && password.trim() !== ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      navigate("/onboarding")
    }
  }

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-[#F3F5F7] rounded-full mb-12 w-full max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("email")}
          className={`flex-1 h-[44px] text-[20px] font-normal font-inter rounded-full transition-all cursor-pointer ${activeTab === "email" ? "bg-[#004370] text-white shadow-sm" : "text-black hover:text-gray-700"
            }`}
        >
          Email id
        </button>
        <button
          onClick={() => setActiveTab("mobile")}
          className={`flex-1 h-[44px] text-[20px] font-normal font-inter rounded-full transition-all cursor-pointer ${activeTab === "mobile" ? "bg-[#004370] text-white shadow-sm" : "text-black hover:text-gray-700"
            }`}
        >
          Mobile Number
        </button>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-[28px] font-semibold font-inter text-gray-900 mb-[8px] leading-none">Login</h2>
        <p className="text-[12px] font-medium font-manrope text-[#999999] leading-none">Let's Get You Started</p>
      </div>


      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-normal font-manrope text-black leading-none">
            {activeTab === "email" ? "Username / Email" : "Mobile Number"}
          </label>
            <input
              type={activeTab === "email" ? "text" : "tel"}
              value={username}
              onChange={(e) => {
                const val = e.target.value
                if (activeTab === "mobile") {
                  const numericValue = val.replace(/[^0-9]/g, "")
                  setUsername(numericValue)
                } else {
                  setUsername(val)
                }
              }}
              placeholder={activeTab === "email" ? "Enter your email" : "Enter mobile number"}
              className="w-full h-[50px] px-4 bg-white border border-[#B7AFAF] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] transition-all font-inter text-[16px] text-black placeholder:text-gray-400"
            />
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[14px] font-normal font-manrope text-black leading-none">Password</label>
            <a href="#" className="text-sm font-medium text-[#003E6B] hover:underline font-manrope">
              Forgot Password?
            </a>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-[50px] px-4 bg-white border border-[#B7AFAF] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#004370]/20 focus:border-[#004370] transition-all font-inter text-[16px] text-black placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full h-[50px] rounded-[10px] font-normal font-inter text-[20px] transition-all duration-300 ${isFormValid
            ? "bg-[#004370] text-white shadow-lg shadow-[#004370]/20 border-transparent cursor-pointer"
            : "border border-[#B7AFAF] text-gray-400 hover:border-gray-300 pointer-events-none"
            }`}
        >
          {activeTab === "mobile" ? "Generate OTP" : "Login"}
        </button>

      </form>

      <div className="flex items-center justify-center gap-4 my-12">
        <div className="flex-1 h-[0.5px] bg-[#999999]"></div>
        <span className="text-xs text-gray-400 font-medium uppercase font-manrope shrink-0">OR</span>
        <div className="flex-1 h-[0.5px] bg-[#999999]"></div>
      </div>


      <div className="flex justify-center mb-10">
        <button className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>
      </div>

      <p className="text-center text-gray-600 font-inter text-[12px] font-medium">
        Don't Have An Account?{" "}
        <Link to="/signup" className="text-[#003E6B] font-bold hover:underline">
          Signup
        </Link>
      </p>
    </div>

  )
}

export default LoginForm