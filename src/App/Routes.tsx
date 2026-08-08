import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import CompanyWebsite from "../Pages/OnBoarding/CompanyWebsite";
import ImportData from "../Pages/OnBoarding/ImportData/ImportData";
import Workspace from "../Pages/OnBoarding/Workspace";
import CompanyDetails from "../Pages/OnBoarding/CompanyDetails";
import DefineCustomer from "../Pages/OnBoarding/DefineCustomer";
import ConnectTools from "../Pages/OnBoarding/ConnectTools";
import FinalPage from "../Pages/OnBoarding/FinalPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="login" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Onboarding Routes */}
      <Route path="/onboarding" element={<Navigate to="/onboarding/company-website" replace />} />
      <Route path="/onboarding/company-website" element={<CompanyWebsite />} />
      <Route path="/onboarding/workspace" element={<Workspace />} />
      <Route path="/onboarding/company-details" element={<CompanyDetails />} />
      <Route path="/onboarding/define-customer" element={<DefineCustomer />} />
      <Route path="/onboarding/connect-tools" element={<ConnectTools />} />
      <Route path="/onboarding/import-data" element={<ImportData />} />
      <Route path="/onboarding/final" element={<FinalPage />} />

      
    </Routes>
  );
}
