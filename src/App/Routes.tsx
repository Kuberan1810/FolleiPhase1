import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import LeadsPage from "../Pages/leads/leads";
import CallLabPage from "../Pages/callLab/CallLabPage";
import AuthCallback from "../Pages/auth/Callback/AuthCallback";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* App Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard-setup" element={<Navigate to="/dashboard" replace />} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main-dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/meeting" element={<Navigate to="/dashboard" replace />} />
        <Route path="/meetings" element={<Navigate to="/dashboard" replace />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/call-lab" element={<CallLabPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
