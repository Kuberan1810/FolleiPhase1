import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import AuthCallback from "../Pages/auth/Callback/AuthCallback";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MainDashboard from "../Pages/MainDashboard/MainDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/main-dashboard" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Dashboard Routes */}
      <Route path="/main-dashboard" element={<MainDashboard />} />
      <Route path="/home" element={<MainDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

