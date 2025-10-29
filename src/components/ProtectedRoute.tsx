import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { VaiTro } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: VaiTro[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.vaiTro)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
