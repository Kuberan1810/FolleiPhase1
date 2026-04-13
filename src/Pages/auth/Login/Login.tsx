import LoginForm from "./Section/LoginForm"
import { Network } from "lucide-react"

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white md:bg-transparent">
            {/* sideeebar */}
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Please enter your details to sign in</p>
                    </div>
                </div>

                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}


export default Login