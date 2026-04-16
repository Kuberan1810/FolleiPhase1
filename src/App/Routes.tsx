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

import Layout from "../Component/Layout";

import ContactDetails from "../Pages/OnBoarding/ContactDetails";
import ContactDetailsFinal from "../Pages/OnBoarding/ContactDetailsFinal";
import WhatsAppVerification from "../Pages/OnBoarding/WhatsAppVerification";
import WorkDescription from "../Pages/OnBoarding/WorkDescription";
import ReviewConfirmation from "../Pages/OnBoarding/ReviewConfirmation";
import OnboardingSuccess from "../Pages/OnBoarding/OnboardingSuccess";
import SecurityVerification from "../Pages/OnBoarding/SecurityVerification";


import VerifyOTP from "../Pages/auth/Login/VerifyOTP";
import Onboarding from "../Pages/OnBoarding/OnBoarding";



export default function AppRoutes() {
  return (
    <Routes>


      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login/verify-otp" element={<VerifyOTP />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/details" element={<ContactDetails />} />
      <Route path="/onboarding/verify" element={<SecurityVerification />} />
      <Route path="/onboarding/additional-details" element={<ContactDetailsFinal />} />
      <Route path="/onboarding/whatsapp-verify" element={<WhatsAppVerification />} />
      <Route path="/onboarding/work-description" element={<WorkDescription />} />
      <Route path="/onboarding/review" element={<ReviewConfirmation />} />
      <Route path="/onboarding/success" element={<OnboardingSuccess />} />

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

      </Route >
      {/* </Route> */}



      < Route path="*" element={< Navigate to="/login" replace />} />
    </Routes >
  );
}



