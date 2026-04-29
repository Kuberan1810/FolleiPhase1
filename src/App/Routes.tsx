import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "../Pages/auth/Login/Login";
import SignUp from "../Pages/auth/SignUp/SignUp";
import VerifyOTP from "../Pages/auth/Login/VerifyOTP";

// Layout & Guard
import MainLayout from "../Component/MainLayout";

// App Pages (PreSales Inbound)
import Dashboard from "../Pages/PreSales/InBound/Dashboard/Dashboard";
import FlowBuilder from "../Pages/PreSales/InBound/FlowBuilder/FlowBuilder";
import Reports from "../Pages/PreSales/InBound/Reports/Reports";
import Orchestrator from "../Pages/PreSales/InBound/Orchestrator/Orchestrator";

// App Pages (PreSales Outbound)
import OutBoardDashboard from "../Pages/PreSales/OutBound/OutBoundDashboard/OutboundDashboard";
import CampaignCreation from "../Pages/PreSales/OutBound/campaings/section/CampaignCreation";
import OutboundReports from "../Pages/PreSales/OutBound/Report/OutboundReports";
import Campaigns from "../Pages/PreSales/OutBound/campaings/Campaigns";
import OutboundFlowBuilder from "../Pages/PreSales/OutBound/FlowBuilder/FlowBuilder";

// App Pages (PostSales Inbound)
import PostSalesDashboard from "../Pages/PostSales/InBound/Dashboard/Dashboard";
import PostSalesFlowBuilder from "../Pages/PostSales/InBound/FlowBuilder/FlowBuilder";
import PostSalesReports from "../Pages/PostSales/InBound/Reports/Reports";
import PostSalesOrchestrator from "../Pages/PostSales/InBound/Orchestrator/Orchestrator";

// App Pages (PostSales Outbound)
import PostSalesOutBoardDashboard from "../Pages/PostSales/OutBound/OutBoundDashboard/OutboundDashboard";
import PostSalesOutboundReports from "../Pages/PostSales/OutBound/Report/OutboundReports";
import PostSalesCampaigns from "../Pages/PostSales/OutBound/campaings/Campaigns";
import PostSalesOutboundFlowBuilder from "../Pages/PostSales/OutBound/FlowBuilder/FlowBuilder";
import PostSalesCustomer from "../Pages/PostSales/OutBound/Customer/Customer";
import PostSalesCustomerProfile from "../Pages/PostSales/OutBound/Customer/Profile/CustomerProfile";


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
import OnBoarding from "../Pages/OnBoarding/OnBoarding";
import ContactDetails from "../Pages/OnBoarding/ContactDetails";
import ContactDetailsFinal from "../Pages/OnBoarding/ContactDetailsFinal";
import WhatsAppVerification from "../Pages/OnBoarding/WhatsAppVerification";
import WorkDescription from "../Pages/OnBoarding/WorkDescription";
import ReviewConfirmation from "../Pages/OnBoarding/ReviewConfirmation";
import OnboardingSuccess from "../Pages/OnBoarding/OnboardingSuccess";
import SecurityVerification from "../Pages/OnBoarding/SecurityVerification";

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

      {/* ==========================================
                     PRE-SALES ROUTES
          ========================================== */}
      <Route path="/presales" element={<MainLayout />}>
        {/* Inbound */}
        <Route path="inbound/dashboard" element={<Dashboard />} />
        <Route path="inbound/flow-builder" element={<FlowBuilder />} />
        <Route path="inbound/reports" element={<Reports />} />
        <Route path="inbound/orchestrator" element={<Orchestrator />} />
        {/* Outbound */}
        <Route path="outbound/dashboard" element={<OutBoardDashboard />} />
        <Route path="outbound/campaigns" element={<Campaigns />} />
        <Route path="outbound/campaigns/create" element={<CampaignCreation />} />
        <Route path="outbound/flow-builder" element={<OutboundFlowBuilder />} />
        <Route path="outbound/reports" element={<OutboundReports />} />
        <Route path="outbound/orchestrator" element={<Orchestrator />} />
        <Route path="" element={<Navigate to="inbound/dashboard" replace />} />
      </Route>

      {/* ==========================================
                   POST-SALES ROUTES
          ========================================== */}
      <Route path="/postsales" element={<MainLayout />}>
        {/* Inbound */}
        <Route path="inbound/dashboard" element={<PostSalesDashboard />} />
        <Route path="inbound/flow-builder" element={<PostSalesFlowBuilder />} />
        <Route path="inbound/reports" element={<PostSalesReports />} />
        <Route path="inbound/orchestrator" element={<PostSalesOrchestrator />} />
        {/* Outbound */}
        <Route path="outbound/dashboard" element={<PostSalesOutBoardDashboard />} />
        <Route path="outbound/campaigns" element={<PostSalesCampaigns />} />
        <Route path="outbound/campaigns/create" element={<CampaignCreation />} />
        <Route path="outbound/flow-builder" element={<PostSalesOutboundFlowBuilder />} />
        <Route path="outbound/reports" element={<PostSalesOutboundReports />} />
        <Route path="outbound/orchestrator" element={<PostSalesOrchestrator />} />
        <Route path="outbound/customer" element={<PostSalesCustomer />} />
        <Route path="outbound/customer/profile" element={<PostSalesCustomerProfile />} />
        <Route path="" element={<Navigate to="inbound/dashboard" replace />} />
      </Route>

      {/* ==========================================
                      SETTINGS ROUTES 
          ========================================== */}
      <Route path="/settings" element={<MainLayout />}>
        <Route index element={<Settings />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="notification" element={<NotificationSettings />} />
        <Route path="help" element={<HelpCenter />} />
        <Route path="payment" element={<Payment />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      </Route>

      {/* Legacy/Shortcut Redirects */}
      <Route path="/dashboard" element={<Navigate to="/presales/inbound/dashboard" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
