import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"email" | "mobile">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const isFormValid = activeTab === "email" 
    ? (username.trim() !== "" && password.trim() !== "")
    : (username.trim() !== "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    
    if (activeTab === "mobile") {
      navigate("/verify-otp")
    } else {
      console.log("Login success")
    }
  }

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-12">
        <button
          onClick={() => {
            setActiveTab("email")
            setUsername("")
          }}
          className={`flex-1 py-3 text-[24px] font-normal font-inter rounded-lg transition-all ${
            activeTab === "email" ? "bg-[#003E6B] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Email id
        </button>
        <button
          onClick={() => {
            setActiveTab("mobile")
            setUsername("")
          }}
          className={`flex-1 py-3 text-[24px] font-normal font-inter rounded-lg transition-all ${
            activeTab === "mobile" ? "bg-[#003E6B] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Mobile Number
        </button>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-[34px] font-semibold font-urbanist text-gray-900 mb-[3px] leading-none">Login</h2>
        <p className="text-[12px] font-medium font-urbanist text-gray-500 leading-none">Let's Get You Started</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[14px] font-normal font-urbanist text-gray-700 mb-2 leading-none">
            {activeTab === "email" ? "Username / Email" : "Username / Mobile Number"}
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
            placeholder={activeTab === "email" ? "Enter your email" : "Enter Mobile Number"}
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003E6B]/20 focus:border-[#003E6B] transition-all font-urbanist"
          />
        </div>

        {activeTab === "email" && (
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[14px] font-normal font-urbanist text-gray-700 leading-none">Password</label>
              <a href="#" className="text-sm font-semibold text-[#003E6B] hover:underline font-urbanist">
                Forgot Password?
              </a>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003E6B]/20 focus:border-[#003E6B] transition-all font-urbanist"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
            isFormValid 
              ? "bg-[#003E6B] text-white shadow-lg shadow-[#003E6B]/20 border-transparent cursor-pointer" 
              : "border border-gray-200 text-gray-400 pointer-events-none"
          }`}
        >
          {activeTab === "email" ? "Login" : "Generate OTP"}
        </button>
      </form>

      <div className="flex items-center justify-center gap-4 my-12">
        <div className="w-[162px] h-[0.5px] bg-[#999999]"></div>
        <span className="text-xs text-gray-400 font-medium uppercase font-urbanist">OR</span>
        <div className="w-[162px] h-[0.5px] bg-[#999999]"></div>
      </div>

      <div className="flex justify-center mb-10">
        <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
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

      <p className="text-center text-gray-600 font-urbanist text-[15px]">
        Don't Have An Account?{" "}
        <a href="#" className="text-[#003E6B] font-bold hover:underline">
          Signup
        </a>
      </p>
    </div>
  )
}

export default LoginForm


  )
}
export default LoginForm