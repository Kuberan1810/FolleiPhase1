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


import ProfileSettings from "../Pages/Settings/Profile/ProfileSettings";
import Feedback from "../Pages/Settings/Feedback/Feedback";
import NotificationSettings from "../Pages/Settings/Notification/NotificationSettings";
import HelpCenter from "../Pages/Settings/HelpCenter/HelpCenter";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";



import ContactDetails from "../Pages/OnBoarding/ContactDetails";
import ContactDetailsFinal from "../Pages/OnBoarding/ContactDetailsFinal";
import WhatsAppVerification from "../Pages/OnBoarding/WhatsAppVerification";
import WorkDescription from "../Pages/OnBoarding/WorkDescription";
import ReviewConfirmation from "../Pages/OnBoarding/ReviewConfirmation";
import OnboardingSuccess from "../Pages/OnBoarding/OnboardingSuccess";
import SecurityVerification from "../Pages/OnBoarding/SecurityVerification";


import VerifyOTP from "../Pages/auth/Login/VerifyOTP";
import OnBoarding from "../Pages/OnBoarding/OnBoarding";
import Payment from "../Pages/Settings/Payment/Payment";
import OutBoardDashboard from "../Pages/Dashboard/OutboundDashboard";
import Orchestrator from "../Pages/Orchestrator/Orchestrator";



export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login/verify-otp" element={<VerifyOTP />} />

      {/* Onboarding */}
      <Route path="/onboarding" element={<OnBoarding />} />
      <Route path="/onboarding/details" element={<ContactDetails />} />
      <Route path="/onboarding/verify" element={<SecurityVerification />} />
      <Route path="/onboarding/additional-details" element={<ContactDetailsFinal />} />
      <Route path="/onboarding/whatsapp-verify" element={<WhatsAppVerification />} />
      <Route path="/onboarding/work-description" element={<WorkDescription />} />
      <Route path="/onboarding/review" element={<ReviewConfirmation />} />
      <Route path="/onboarding/success" element={<OnboardingSuccess />} />

      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoute />}> */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flow-builder" element={<FlowBuilder />} />
        <Route path="/customer-insights" element={<CustomerInsights />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/orchestrator" element={<Orchestrator />} />
        <Route path="/dashboard/outbound" element={<OutBoardDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="/settings/notification" element={<NotificationSettings />} />
        <Route path="/settings/help" element={<HelpCenter />} />
        <Route path="/settings/payment" element={<Payment />} />
        <Route path="/settings/privacy" element={<PrivacyPolicy />} />
      </Route>
      {/* </Route> */}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}


