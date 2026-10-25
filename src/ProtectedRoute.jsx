import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to access this page', {
        id: 'auth-redirect-toast',
        duration: 3500,
        style: {
          background: '#2b1810',
          color: '#ffffff',
          borderRadius: '12px',
          border: '1.5px solid #ef5323',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700
        }
      });
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectUrl}`} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
