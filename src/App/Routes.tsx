import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Component/Layout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Onboarding from "../Pages/OnBoarding/Onboarding";
import ContactDetails from "../Pages/OnBoarding/ContactDetails";
import ContactDetailsFinal from "../Pages/OnBoarding/ContactDetailsFinal";
import WhatsAppVerification from "../Pages/OnBoarding/WhatsAppVerification";
import SecurityVerification from "../Pages/OnBoarding/SecurityVerification";
import CustomerInsights from "../Pages/CustomerInsights/CustomerInsights";
import Reports from "../Pages/Reports/Reports";
import Settings from "../Pages/Settings/Settings";
import FlowBuilder from "../Pages/FlowBuilder/FlowBuilder";
import Login from "../Pages/auth/Login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/details" element={<ContactDetails />} />
      <Route path="/onboarding/verify" element={<SecurityVerification />} />
      <Route path="/onboarding/additional-details" element={<ContactDetailsFinal />} />
      <Route path="/onboarding/whatsapp-verify" element={<WhatsAppVerification />} />

      {/* App Layout Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer-insights" element={<CustomerInsights />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/flow-builder" element={<FlowBuilder />} />

        {/* Fallback for protected routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>

  );
}


