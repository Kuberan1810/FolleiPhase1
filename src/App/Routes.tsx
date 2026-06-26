
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
import NeedsAttentionPage from "../Pages/PreSales/Dashboard/NeedsAttentionPage";
import PendingTasksPage from "../Pages/AiInsights/PendingTasksPage";
import AIInsightsPage from "../Pages/AiInsights/AIInsightsPage";
import InactiveLeadsPage from "../Pages/AiInsights/InactiveLeadsPage";
import NotRepliedLeadsPage from "../Pages/AiInsights/NotRepliedLeadsPage";
import FlowBuilder from "../Pages/PreSales/FlowBuilder/FlowBuilder";
import EditActionPage from "../Pages/PreSales/FlowBuilder/EditActionPage";
import Orchestrator from "../Pages/PreSales/Orchestrator/Orchestrator";
import InBox from "../Pages/PreSales/Inbox/inbox";

import CampaignCreation from "../Pages/PreSales/campaings/CampaignCreation/CampaignCreation";
import CampaignPreview from "../Pages/PreSales/campaings/CampaignCreation/section/CampaignReady";
import Campaigns from "../Pages/PreSales/campaings/Campaigns";
import CampaignProfile from "../Pages/PreSales/campaings/CampaignProfile/CampaignProfile";
import CampaignLeadList from '../Pages/PreSales/campaings/CampaignLeadList/CampaignLeadList';

import CompanyDetails from "../Pages/PreSales/CompanyDetails/companyDetails";
import AdminNeeds from "../Pages/PreSales/Inbox/Section/AdminNeeds";
import AdminHandles from "../Pages/PreSales/Inbox/Section/AdminHandles";
import Leads from "../Pages/PreSales/Leads/Leads";
import LeadProfile from "../Pages/PreSales/Leads/LeadProfile/LeadProfile";


// App Pages (PostSales Outbound)
import PostSalesOutBoardDashboard from "../Pages/PostSales/OutBoundDashboard/OutboundDashboard";
import PostSalesNeedsAttentionPage from "../Pages/PostSales/OutBoundDashboard/NeedsAttentionPage";
import PostSalesCustomer from "../Pages/PostSales/Customer/Customer";
import PostSalesCustomerProfile from "../Pages/PostSales/Customer/Profile/CustomerProfile";
import ActivityTimelinePage from "../Pages/PostSales/Customer/ActivityTimeline/ActivityTimelinePage";
import CustomerOnboarding from "../Pages/PostSales/CustomerOnboarding/CustomerOnboarding";
import CustomerEnablement from "../Pages/PostSales/CustomerOnboarding/Enablement/CustomerEnablement";
import ProductUnderstandingPage from "../Pages/PostSales/CustomerOnboarding/Enablement/ProductUnderstandingPage";
import RenewalDash from "../Pages/PostSales/RenewalMain/renewaldash/RenewalDash";
import Renewal from "../Pages/PostSales/RenewalMain/renewal/Renewal";
import RenewalDetailsPage from "../Pages/PostSales/RenewalMain/renewaldetails/RenewalDetailsPage";
import PostSalesTickets from "../Pages/PostSales/Tickets/Ticket";


// Settings Pages
import Settings from "../Pages/Settings/Settings";
import ProfileSettings from "../Pages/Settings/Profile/ProfileSettings";
import Feedback from "../Pages/Settings/Feedback/Feedback";
import NotificationSettings from "../Pages/Settings/Notification/NotificationSettings";
import HelpCenter from "../Pages/Settings/HelpCenter/HelpCenter";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/Settings/TermsAndConditions/TermsAndCondition";
import Payment from "../Pages/Settings/Payment/Payment";

import Notification from "../Component/Notification";
// Onboarding Pages
import OnBoarding from "../Pages/OnBoarding/OnBoarding";
import ContactDetails from "../Pages/OnBoarding/ContactDetails";
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
import Analytics from "../Pages/PostSales/Analytics/Analytics";
import ConnectedCRM from "../Pages/PreSales/Orchestrator/ConnectedCRM";
import CRMProfile from "../Pages/PreSales/Orchestrator/CRMProfile";

export default function AppRoutes() {
  return (

    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login/verify-otp" element={<VerifyOTP />} />

      {/* Onboarding */}
      <Route path="/onboarding">
        <Route index element={<OnBoarding />} />
        <Route path="details" element={<ContactDetails />} />
        <Route path="verify" element={<SecurityVerification />} />
        {/* <Route path="/onboarding/additional-details" element={<ContactDetailsFinal />} /> */}
        {/* <Route path="/onboarding/whatsapp-verify" element={<WhatsAppVerification />} /> */}
        <Route path="work-description" element={<WorkDescription />} />
        <Route path="review" element={<ReviewConfirmation />} />
        <Route path="success" element={<OnboardingSuccess />} />
        <Route path="general-info" element={<GeneralInformation />} />
        <Route path="product-info" element={<ProductInformation />} />
        <Route path="upload-data" element={<UploadCompanyData />} />
      </Route>

      {/* ==========================================
                       PRE-SALES ROUTES
            ========================================== */}
      <Route path="/presales/flow-builder" element={<FlowBuilderLayout />}>
        <Route index element={<FlowBuilder />} />
        <Route path="edit-action" element={<EditActionPage />} />
      </Route>

      <Route path="/presales" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/needs-attention" element={<NeedsAttentionPage />} />

        <Route path="inbox">
          <Route index element={<InBox />} />
          <Route path="admin-needs" element={<AdminNeeds />} />
          <Route path="admin-handles" element={<AdminHandles />} />
        </Route>

        <Route path="leads">
          <Route index element={<Leads />} />
          <Route path="profile" element={<LeadProfile />} />
          <Route path="profile/timeline" element={<ActivityTimelinePage />} />
        </Route>

        <Route path="campaign" element={<Navigate to="/presales/campaigns" replace />} />
        <Route path="campaigns">
          <Route index element={<Campaigns />} />
          <Route path="creation" element={<CampaignCreation />} />
          <Route path="preview" element={<CampaignPreview />} />
          <Route path=":id" element={<CampaignProfile />} />
          <Route path=":id/campaign-lead" element={<CampaignLeadList />} />
        </Route>

        <Route path="data-import" element={<Orchestrator />} />
        <Route path="connected-crm" element={<ConnectedCRM />} />
        <Route path="connected-crm/:crmId" element={<CRMProfile />} />
        <Route path="organization-setup" element={<CompanyDetails />} />
      </Route>

      {/* ==========================================
                       POST-SALES ROUTES
            ========================================== */}
      <Route path="/postsales" element={<MainLayout />}>
        <Route path="dashboard" element={<PostSalesOutBoardDashboard />} />
        <Route path="dashboard/needs-attention" element={<PostSalesNeedsAttentionPage />} />

        <Route path="customers">
          <Route index element={<PostSalesCustomer />} />
          <Route path="profile" element={<PostSalesCustomerProfile />} />
          <Route path="profile/activity-timeline" element={<ActivityTimelinePage />} />
        </Route>


        <Route path="tickets" element={<PostSalesTickets />} />

        <Route path="onboarding" element={<CustomerOnboarding />} />
        <Route path="onboarding/enablement/:customerId" element={<CustomerEnablement />} />
        <Route path="onboarding/enablement/:customerId/understanding" element={<ProductUnderstandingPage />} />

        <Route path="renewals">
          <Route index element={<RenewalDash />} />
          <Route path="list" element={<Renewal />} />
          <Route path=":renewalId" element={<RenewalDetailsPage />} />
        </Route>

        <Route path="analytics" element={<Analytics />} />



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
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />

        <Route path="notifications" element={<Notification />} />

        {/* --- NESTED PAYMENT ROUTES --- */}
        <Route path="payment" element={<Payment />}>
          <Route index element={<PaymentOverview />} />
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
