import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}


