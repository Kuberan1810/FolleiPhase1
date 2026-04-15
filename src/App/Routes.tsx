import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "../Pages/auth/Login/Login";
import SignUp from "../Pages/auth/SignUp/SignUp";

// Layout & Guard
import MainLayout from "../Component/MainLayout";
// import ProtectedRoute from "./ProtectedRoute";

// App Pages
import Dashboard from "../Pages/Dashboard/Dashboard";
import FlowBuilder from "../Pages/FlowBuilder/FlowBuilder";
import CustomerInsights from "../Pages/CustomerInsights/CustomerInsights";
import Reports from "../Pages/Reports/Reports";
import Settings from "../Pages/Settings/Settings";
import OnBoarding from "../Pages/OnBoarding/OnBoarding";

import ProfileSettings from "../Pages/Settings/Profile/ProfileSettings";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />


      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes – wrapped in MainLayout */}
      {/* <Route element={<ProtectedRoute />}> */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flow-builder" element={<FlowBuilder />} />
        <Route path="/customer-insights" element={<CustomerInsights />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/onboarding" element={<OnBoarding />} />
      </Route>
      {/* </Route> */}



      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
