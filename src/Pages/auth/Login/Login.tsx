import LoginForm from "./Section/LoginForm"
import FolleiLogo from "../../../assets/logo/follei-dark.svg"
import AuthSidebar from "../../../Component/AuthSidebar"

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen md:h-screen md:overflow-hidden bg-white">
            <AuthSidebar />

            {/* Right Content */}
            <div className="flex-1 bg-white flex flex-col md:justify-center items-center px-6 py-4 md:py-0 overflow-y-auto">
                {/* Mobile Logo */}
                <div className="md:hidden w-full max-w-sm flex flex-col items-start mb-6">
                    <div className="w-24 mb-5">
                        <img src={FolleiLogo} alt="Follei" />
                    </div>
                    <h2 className="text-[26px] font-bold text-gray-900 mb-1 font-manrope">Welcome back</h2>
                    <p className="text-[14px] text-gray-500 font-inter">Sign in to continue to Follei</p>
                </div>

                <div className="w-full max-w-sm md:max-w-md">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login
