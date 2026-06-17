import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "../Pages/auth/Login/Login";
import SignUp from "../Pages/auth/SignUp/SignUp";
import VerifyOTP from "../Pages/auth/Login/VerifyOTP";

// Layout & Guard
import MainLayout from "../Component/MainLayout";
import FlowBuilderLayout from "../Component/FlowBuilderLayout";

// App Pages (PreSales Inbound)
import Dashboard from "../Pages/PreSales/Dashboard/Dashboard";
import PendingTasksPage from "../Pages/AiInsights/PendingTasksPage";
import AIInsightsPage from "../Pages/AiInsights/AIInsightsPage";
import InactiveLeadsPage from "../Pages/AiInsights/InactiveLeadsPage";
import NotRepliedLeadsPage from "../Pages/AiInsights/NotRepliedLeadsPage";
import FlowBuilder from "../Pages/PreSales/FlowBuilder/FlowBuilder";
import EditActionPage from "../Pages/PreSales/FlowBuilder/EditActionPage";
import Orchestrator from "../Pages/PreSales/Orchestrator/Orchestrator";
import InBox from "../Pages/PreSales/Inbox/inbox";
import Campaigns from "../Pages/PreSales/campaings/Campaigns";

import CompanyDetails from "../Pages/PreSales/CompanyDetails/companyDetails";

import AdminNeeds from "../Pages/PreSales/Inbox/Section/AdminNeeds";
// App Pages (PostSales Outbound)
import PostSalesOutBoardDashboard from "../Pages/PostSales/OutBoundDashboard/OutboundDashboard";
import PostSalesOutboundReports from "../Pages/PostSales/Report/OutboundReports";
import PostSalesCampaigns from "../Pages/PostSales/campaings/Campaigns";
import PostSalesOutboundFlowBuilder from "../Pages/PostSales/FlowBuilder/FlowBuilder";
import PostSalesCustomer from "../Pages/PostSales/Customer/Customer";
import PostSalesCustomerProfile from "../Pages/PostSales/Customer/Profile/CustomerProfile";
import PostSalesOutboundCadences from "../Pages/PostSales/Cadences/Cadences"


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
// import ContactDetailsFinal from "../Pages/OnBoarding/ContactDetailsFinal";
// import WhatsAppVerification from "../Pages/OnBoarding/WhatsAppVerification";
import WorkDescription from "../Pages/OnBoarding/WorkDescription";
import ReviewConfirmation from "../Pages/OnBoarding/ReviewConfirmation";
import OnboardingSuccess from "../Pages/OnBoarding/OnboardingSuccess";
import SecurityVerification from "../Pages/OnBoarding/SecurityVerification";
import GeneralInformation from "../Pages/OnBoarding/GeneralInformation";
import ProductInformation from "../Pages/OnBoarding/ProductInformation";
import UploadCompanyData from "../Pages/OnBoarding/uploadData";


// Payment Sub-components (Nested Routes)
import PaymentOverview from "../Pages/Settings/Payment/Section/PaymentOverview";
import Plans from "../Pages/Settings/Payment/Section/Plans";
import PaymentMethod from "../Pages/Settings/Payment/Section/PaymentMethod";
import CampaignCreation from "../Pages/PostSales/campaings/section/CampaignCreation";
import Leads from "../Pages/PreSales/Leads/Leads";
import LeadProfile from "../Pages/PreSales/Leads/LeadProfile/LeadProfile";







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
      {/* <Route path="/onboarding/additional-details" element={<ContactDetailsFinal />} /> */}
      {/* <Route path="/onboarding/whatsapp-verify" element={<WhatsAppVerification />} /> */}
      <Route path="/onboarding/work-description" element={<WorkDescription />} />
      <Route path="/onboarding/review" element={<ReviewConfirmation />} />
      <Route path="/onboarding/success" element={<OnboardingSuccess />} />
      <Route path="/onboarding/general-info" element={<GeneralInformation />} />
      <Route path="/onboarding/product-info" element={<ProductInformation />} />
      <Route path="/onboarding/upload-data" element={<UploadCompanyData />} />


      {/* ==========================================
                     PRE-SALES ROUTES
          ========================================== */}
      <Route path="/presales/flow-builder" element={<FlowBuilderLayout />}>
        <Route index element={<FlowBuilder />} />
        <Route path="edit-action" element={<EditActionPage />} />
      </Route>

      <Route path="/presales" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inbox" element={<InBox />} />
        <Route path="leads" element={<Leads />} />
        <Route path="leads/profile" element={<LeadProfile />} />
        <Route path="campaign" element={<Navigate to="/presales/campaigns" replace />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="campaigns/:campaignId" element={<Campaigns />} />
        <Route path="campaigns/:campaignId/activities" element={<Campaigns />} />
        <Route path="campaigns/create" element={<Navigate to="/presales/campaigns/create/step/1" replace />} />
        <Route path="cadences" element={<PostSalesOutboundCadences />} />
        <Route path="data-import" element={<Orchestrator />} />

        <Route path="organization-setup" element={<CompanyDetails />} />

        {/* <Route path="company-details" element={<CompanyDetails />} /> */}

=
        <Route path="inbox/admin-needs" element={<AdminNeeds />} />

      </Route>

      {/* ==========================================
                     POST-SALES ROUTES
          ========================================== */}
      <Route path="/postsales" element={<MainLayout />}>
        <Route path="dashboard" element={<PostSalesOutBoardDashboard />} />
        <Route path="cadences" element={<PostSalesOutboundCadences />} />
        <Route path="campaign" element={<Navigate to="/postsales/campaigns" replace />} />
        <Route path="campaigns" element={<PostSalesCampaigns />} />
        <Route path="campaigns/create" element={<CampaignCreation />} />
        <Route path="flow-builder" element={<PostSalesOutboundFlowBuilder />} />
        <Route path="reports" element={<PostSalesOutboundReports />} />
        {/* <Route path="outbound/orchestrator" element={<PostSalesOrchestrator />} /> */}
        <Route path="customer" element={<PostSalesCustomer />} />
        <Route path="customer/profile" element={<PostSalesCustomerProfile />} />

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

        {/* --- NESTED PAYMENT ROUTES --- */}
        <Route path="/settings/payment" element={<Payment />}>
          {/* Default view: Overview + Billing Table merged */}
          <Route index element={<PaymentOverview />} />

          {/* Specific sub-pages */}
          <Route path="plans" element={<Plans />} />
          <Route path="paymentmethod" element={<PaymentMethod />} />
        </Route>
      </Route>



      {/* Legacy/Shortcut Redirects */}
      <Route path="/dashboard" element={<Navigate to="/presales/dashboard" replace />} />
      <Route path="/dashboard/pending-tasks" element={<MainLayout />}>
        <Route index element={<PendingTasksPage />} />
      </Route>
      <Route path="/dashboard/ai-insights" element={<MainLayout />}>
        <Route index element={<AIInsightsPage />} />
      </Route>
      <Route path="/dashboard/inactive-leads" element={<MainLayout />}>
        <Route index element={<InactiveLeadsPage />} />
      </Route>
      <Route path="/dashboard/not-replied-leads" element={<MainLayout />}>
        <Route index element={<NotRepliedLeadsPage />} />
      </Route>


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
