import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';
import PersistentSetupPanel from '../Component/PersistentSetupPanel';

const ProtectedRoute = () => {
  const location = useLocation();
  return isAuthenticated() ? (
    <>
      <Outlet />
      {/* Follows the user across all protected app pages until setup is finished */}
      <PersistentSetupPanel />
    </>
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
