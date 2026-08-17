import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthSession } from '../providers/AuthSessionProvider';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthSession();
  const location = useLocation();
  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default ProtectedRoute;
