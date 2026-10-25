import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthModal from '../AuthModal';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';
import './Pages.css';

const LoginPage = ({ onLoginSuccess }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const redirectUrl = searchParams.get('redirect') || '/';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSuccessfulAuth = (loggedInUser) => {
    const userObj = login(loggedInUser);
    if (onLoginSuccess) {
      onLoginSuccess(userObj);
    }
    toast.success(`Welcome, ${userObj.name}!`, {
      id: 'auth-success-toast',
      duration: 3500,
      style: {
        background: '#15803d',
        color: '#ffffff',
        borderRadius: '12px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '13px',
        fontWeight: 700
      }
    });
    navigate(redirectUrl, { replace: true });
  };

  return (
    <div className="login-standalone-page" style={{ minHeight: '80vh', padding: '60px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf9f4' }}>
      <div style={{ width: '100%', maxWidth: '860px' }}>
        <AuthModal
          isOpen={true}
          onClose={() => navigate('/')}
          onLoginSuccess={handleSuccessfulAuth}
        />
      </div>
    </div>
  );
};

export default LoginPage;
