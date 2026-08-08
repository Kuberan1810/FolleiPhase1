import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import CompanyWebsite from "../Pages/OnBoarding/CompanyWebsite";
import ImportData from "../Pages/OnBoarding/ImportData/ImportData";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/onboarding/import-data" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Onboarding Routes */}
      <Route path="/onboarding" element={<Navigate to="/onboarding/import-data" replace />} />
      <Route path="/onboarding/company-website" element={<CompanyWebsite />} />
      <Route path="/onboarding/import-data" element={<ImportData />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/onboarding/import-data" replace />} />
    </Routes>
  );
}
