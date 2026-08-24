import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import DashboardSetup from "../Pages/Dashboard/DashboardSetup";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MainDashboard from "../Pages/MainDashboard/MainDashboard";
import MeetingPage from "../Pages/meeting/meeting";
import Leads from "../Pages/leads/leads";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard-setup" element={<DashboardSetup />} />
      <Route path="/home" element={<Dashboard />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/main-dashboard" element={<MainDashboard />} />

      <Route path="/meeting" element={<MeetingPage />} />
      <Route path="/meetings" element={<MeetingPage />} />
      <Route path="/leads" element={<Leads />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

