import { Routes, Route, Navigate } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
import SidebarLayout from '../Component/SidebarLayout';
import SignIn from '../Pages/auth/signIn/SignIn';
import SignUp from '../Pages/auth/SignUp/SignUp';
import AuthCallback from '../Pages/auth/callback/AuthCallback';
import ProjectShell from '../Pages/project/ProjectShell';
import Home from '../Pages/project/Home';
import Competitors from '../Pages/project/Competitors';
import Leads from '../Pages/project/Leads';
import Campaigns from '../Pages/project/Campaigns';
import Outreach from '../Pages/project/Outreach';
import NewProject from '../Pages/project/NewProject';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Google redirects the browser here with tokens in the fragment. */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<SidebarLayout />}>
          {/* No project yet: an empty chat that creates one from the first message. */}
          <Route path="/" element={<NewProject />} />

          <Route path="/p/:projectId" element={<ProjectShell />}>
            <Route index element={<Home />} />
            <Route path="competitors" element={<Competitors />} />
            <Route path="leads" element={<Leads />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="outreach" element={<Outreach />} />
          </Route>
        </Route>
      {/* </Route> */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
