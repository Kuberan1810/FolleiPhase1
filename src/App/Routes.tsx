import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import Workspace from "../Pages/OnBoarding/Workspace";
import CompanyDetails from "../Pages/OnBoarding/CompanyDetails";
import DefineCustomer from "../Pages/OnBoarding/DefineCustomer";
import ConnectTools from "../Pages/OnBoarding/ConnectTools";
import FinalPage from "../Pages/OnBoarding/FinalPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Auth Routes */}
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />


      {/* Onboarding Routes */}
      <Route path="/onboarding/workspace" element={<Workspace />} />
      <Route path="/onboarding/company-details" element={<CompanyDetails />} />
      <Route path="/onboarding/define-customer" element={<DefineCustomer />} />
      <Route path="/onboarding/connect-tools" element={<ConnectTools />} />
      <Route path="/onboarding/final" element={<FinalPage />} />
      <Route path="/onboarding" element={<Navigate to="/onboarding/workspace" replace />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
