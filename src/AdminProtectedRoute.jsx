import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const AdminProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Admin authentication required. Please login.', {
        id: 'admin-auth-redirect-toast',
        duration: 3500,
        style: {
          background: '#0f172a',
          color: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #ef5323',
          fontSize: '13px',
          fontWeight: 700
        }
      });
    } else if (!isAdmin || user?.role !== 'ROLE_ADMIN') {
      toast.error('Access Denied. You are not an Admin.', {
        id: 'admin-role-denied-toast',
        duration: 3500,
        style: {
          background: '#991b1b',
          color: '#ffffff',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 700
        }
      });
    }
  }, [isAuthenticated, isAdmin, user, location]);

  if (!isAuthenticated || !isAdmin || user?.role !== 'ROLE_ADMIN') {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/admin/login?redirect=${redirectUrl}`} replace state={{ from: location }} />;
  }

  return children;
};

export default AdminProtectedRoute;
