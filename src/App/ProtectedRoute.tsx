import { Navigate, Outlet } from 'react-router-dom';
import { isSignedIn } from '../lib/auth';
import { useSession } from '../hooks/useProjects';
import { Loading } from '../Component/Page';

/** Gate the app on a signed-in account. */
export default function ProtectedRoute() {
  const session = useSession();
  // With no stored token the session query never runs, so check the token
  // first: otherwise an idle query leaves this stuck on the loading state.
  if (!isSignedIn()) return <Navigate to="/login" replace />;
  if (session.data) return <Outlet />;
  // A rejected token (revoked, or the server restarted with a new secret)
  // should return to sign-in rather than loop.
  if (session.isError) return <Navigate to="/login" replace />;
  return <Loading label="Opening your workspace…" />;
}
