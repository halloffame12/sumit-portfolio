
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the /admin page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
