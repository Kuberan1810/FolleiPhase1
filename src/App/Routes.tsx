import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import AuthCallback from "../Pages/auth/Callback/AuthCallback";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MeetingPage from "../Pages/meeting/meeting";
import Leads from "../Pages/leads/leads";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="login" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Meeting Routes */}
      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/meetings" element={<MeetingPage />} />

      {/* Leads Route */}
      <Route path="/leads" element={<Leads />} />
    </Routes>
  );
}
