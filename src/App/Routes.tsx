import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import ImportData from "../Pages/OnBoarding/ImportData/ImportData";
import Workspace from "../Pages/OnBoarding/Workspace";
import CompanyDetails from "../Pages/OnBoarding/CompanyDetails";
import DefineCustomer from "../Pages/OnBoarding/DefineCustomer";
import ConnectTools from "../Pages/OnBoarding/ConnectTools";
import FinalPage from "../Pages/OnBoarding/FinalPage";

import AuthCallback from "../Pages/auth/Callback/AuthCallback";
import ProtectedRoute from "./ProtectedRoute";
import LeadImport from "../Pages/Leads/LeadImport";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="login" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/integrations/google/callback" element={<AuthCallback />} />
        <Route path="/onboarding/workspace" element={<Workspace />} />
        <Route path="/onboarding/company-details" element={<CompanyDetails />} />
        <Route path="/onboarding/Bussiness-module" element={<DefineCustomer />} />
        <Route path="/onboarding/connect-tools" element={<ConnectTools />} />
        <Route path="/onboarding/import-data" element={<ImportData />} />
        <Route path="/onboarding/final" element={<FinalPage />} />
        <Route path="/leads/import" element={<LeadImport />} />
        <Route path="/dashboard" element={<Navigate to="/onboarding/final" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />


      
    </Routes>
  );
}
