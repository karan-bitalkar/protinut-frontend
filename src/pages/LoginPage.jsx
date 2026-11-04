import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthModal from '../AuthModal';

/**
 * LoginPage – Renders the centered AuthModal popup dialog
 * Ensures users always see the sleek popup modal even if navigating directly to /login
 */
const LoginPage = ({ onLoginSuccess, initialMode = 'login' }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = searchParams.get('redirect') || '/';
  const modeQuery = searchParams.get('mode');
  const mode = modeQuery === 'register' || modeQuery === 'signup' ? 'register' : initialMode;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#faf5ee' }}>
      <AuthModal
        isOpen={true}
        defaultMode={mode}
        onClose={() => navigate(redirectUrl || '/')}
        onLoginSuccess={(user) => {
          if (onLoginSuccess) onLoginSuccess(user);
          navigate(redirectUrl, { replace: true });
        }}
      />
    </div>
  );
};

export default LoginPage;
