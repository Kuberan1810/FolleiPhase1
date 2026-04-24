import { Routes, Route, Navigate } from "react-router-dom";


// Auth Pages
import Login from "../Pages/auth/Login/Login";
import SignUp from "../Pages/auth/SignUp/SignUp";

// Layout & Guard
import MainLayout from "../Component/MainLayout";
// import ProtectedRoute from "./ProtectedRoute";


// App Pages (Inbound)
import Dashboard from "../Pages/InBound/Dashboard/Dashboard";
import FlowBuilder from "../Pages/InBound/FlowBuilder/FlowBuilder";
import Reports from "../Pages/InBound/Reports/Reports";
import Orchestrator from "../Pages/InBound/Orchestrator/Orchestrator";

// App Pages (Outbound)
import OutBoardDashboard from "../Pages/OutBound/OutBoundDashboard/OutboundDashboard";
import CampaignCreation from "../Pages/OutBound/campaings/section/CampaignCreation";
import OutboundReports from "../Pages/OutBound/Report/OutboundReports";
import Campaigns from "../Pages/OutBound/campaings/Campaigns";
import OutboundFlowBuilder from "../Pages/OutBound/FlowBuilder/FlowBuilder";
// import OutboundOrchestrator from "../Pages/OutBound/Orchestrator/Orchestrator";

// Settings Pages
import Settings from "../Pages/Settings/Settings";
import ProfileSettings from "../Pages/Settings/Profile/ProfileSettings";
import Feedback from "../Pages/Settings/Feedback/Feedback";
import NotificationSettings from "../Pages/Settings/Notification/NotificationSettings";
import HelpCenter from "../Pages/Settings/HelpCenter/HelpCenter";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/Settings/TermsAndConditions/TermsAndCondition";
import Payment from "../Pages/Settings/Payment/Payment";

// Onboarding Pages
import ContactDetails from "../Pages/OnBoarding/ContactDetails";
import ContactDetailsFinal from "../Pages/OnBoarding/ContactDetailsFinal";
import WhatsAppVerification from "../Pages/OnBoarding/WhatsAppVerification";
import WorkDescription from "../Pages/OnBoarding/WorkDescription";
import ReviewConfirmation from "../Pages/OnBoarding/ReviewConfirmation";
import OnboardingSuccess from "../Pages/OnBoarding/OnboardingSuccess";
import SecurityVerification from "../Pages/OnBoarding/SecurityVerification";
import VerifyOTP from "../Pages/auth/Login/VerifyOTP";
import OnBoarding from "../Pages/OnBoarding/OnBoarding";

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
      <Route element={<MainLayout />}>

        {/* Redirect base to inbound dashboard */}
        <Route path="/dashboard" element={<Navigate to="/inbound/dashboard" replace />} />


        {/* Inbound Routes */}
        <Route path="/inbound/dashboard" element={<Dashboard />} />
        <Route path="/inbound/flow-builder" element={<FlowBuilder />} />
        <Route path="/inbound/reports" element={<Reports />} />
        <Route path="/inbound/orchestrator" element={<Orchestrator />} />

        {/* Outbound Routes */}
        <Route path="/outbound/dashboard" element={<OutBoardDashboard />} />
        <Route path="/outbound/campaigns" element={<Campaigns />} />
        <Route path="/outbound/campaigns/create" element={<CampaignCreation />} />
        <Route path="/outbound/flow-builder" element={<OutboundFlowBuilder />} />
        <Route path="/outbound/reports" element={<OutboundReports />} />
        <Route path="/outbound/orchestrator" element={<Orchestrator />} />

        {/* Settings Routes */}

        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="/settings/notification" element={<NotificationSettings />} />
        <Route path="/settings/help" element={<HelpCenter />} />
        <Route path="/settings/payment" element={<Payment />} />
        <Route path="/settings/privacy" element={<PrivacyPolicy />} />
        <Route path="/settings/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
