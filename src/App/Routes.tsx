import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Pages/auth/signIn/SignIn";
import SignUp from "../Pages/auth/SignUp/SignUp";
import AuthCallback from '../Pages/auth/callback/AuthCallback';
import DashboardSetup from "../Pages/DashboardSetup/DashboardSetup";
import Home from "../Pages/home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MeetingPage from "../Pages/meeting/meeting";
import LeadsPage from "../Pages/leads/leads";
import CampaignsPage from "../Pages/campaigns/Campaigns";
import CampaignCreation from "../Pages/campaigns/campaignCreation/CampaignCreation";
import AttentionPage from "../Pages/attention/Attention";
import LeadsProfilePage from "../Pages/leads/leadsProfile/LeadsProfilePage";
import ProtectedRoute from './ProtectedRoute';
import ProjectSettings from '../Pages/projects/ProjectSettings';
import CallLabPage from '../Pages/callLab/CallLabPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Google redirects the browser here after the backend verifies identity. */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* App Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard-setup" element={<DashboardSetup />} />
        <Route path="/home" element={<Home />} />
        {/* Test surface, deliberately not linked from the sidebar. */}
        <Route path="/calllab" element={<CallLabPage />} />
        <Route path="/project" element={<ProjectSettings />} />
        <Route path="/projects" element={<ProjectSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main-dashboard" element={<Navigate to="/dashboard" replace />} />

        <Route path="/meeting" element={<MeetingPage />} />
        <Route path="/meetings" element={<MeetingPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaign" element={<CampaignsPage />} />
        <Route path="/campaigns/create" element={<CampaignCreation />} />
        <Route path="/campaigns/new" element={<CampaignCreation />} />
        <Route path="/campaign-creation" element={<CampaignCreation />} />
        <Route path="/attention" element={<AttentionPage />} />
        <Route path="/ai-attention" element={<AttentionPage />} />
        <Route path="/leads/:id" element={<LeadsProfilePage />} />
        <Route path="/leads/profile/:id" element={<LeadsProfilePage />} />
      </Route>


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
