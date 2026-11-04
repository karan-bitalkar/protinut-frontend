import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both Admin Email and Password.');
      return;
    }

    setIsLoading(true);

    try {
      // Role-based authentication check
      const result = await adminLogin(email, password);

      if (result.success) {
        toast.success(`Welcome, ${result.user.name}! Access Granted.`, {
          duration: 4000,
          style: {
            background: '#0f172a',
            color: '#22c55e',
            border: '1.5px solid #22c55e',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 800
          }
        });
        navigate(redirectTarget, { replace: true });
      } else {
        setErrorMessage(result.error || 'Access Denied. You are not an Admin.');
        toast.error(result.error || 'Access Denied.');
      }
    } catch (err) {
      setErrorMessage('Authentication server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (testEmail, testPass) => {
    setEmail(testEmail);
    setPassword(testPass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-center items-center p-4 relative font-sans selection:bg-primary selection:text-white">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10">
        
        {/* Top Security Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[#b83812] shadow-lg shadow-primary/25 mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <div className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-primary/15 text-primary border border-primary/30 rounded-full mb-2">
            Restricted Access
          </div>

          <h1 className="text-2xl font-black text-white font-['Montserrat'] tracking-tight">
            PROTINUT™ Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise Admin Authentication & Management Portal
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-950/60 border border-red-800/80 rounded-xl flex items-start gap-3 text-red-200 text-xs animate-shake">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1 font-semibold">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Identity / Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@protinut.in"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1e293b]/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Security Key / Password
              </label>
              <span className="text-[11px] text-slate-500">Encrypted AES-256</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-[#1e293b]/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-primary to-[#d94416] hover:from-[#f05e30] hover:to-[#e85a14] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Admin Login</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* ── Testing Credentials Helper (Requirement 5) ── */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span>🧪 Dummy Login Testing:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@protinut.in', 'admin123')}
              className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-left hover:bg-emerald-900/40 transition group"
            >
              <div className="text-[10px] font-bold text-emerald-400 uppercase flex items-center justify-between">
                <span>Valid Admin</span>
                <span className="text-[9px] bg-emerald-900 text-emerald-200 px-1 rounded">ROLE_ADMIN</span>
              </div>
              <div className="font-mono text-[11px] text-slate-300 truncate mt-0.5">admin@protinut.in</div>
              <div className="font-mono text-[10px] text-slate-500">admin123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('customer@protinut.in', 'cust123')}
              className="p-2.5 rounded-lg bg-red-950/30 border border-red-800/50 text-left hover:bg-red-900/30 transition group"
            >
              <div className="text-[10px] font-bold text-red-400 uppercase flex items-center justify-between">
                <span>Customer Test</span>
                <span className="text-[9px] bg-red-900 text-red-200 px-1 rounded">ROLE_CUST</span>
              </div>
              <div className="font-mono text-[11px] text-slate-300 truncate mt-0.5">customer@protinut.in</div>
              <div className="font-mono text-[10px] text-slate-500">cust123</div>
            </button>
          </div>
        </div>

        {/* Return to Public Website */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition inline-flex items-center gap-1 font-semibold"
          >
            <span>← Return to PROTINUT Store</span>
          </Link>
        </div>

      </div>

      <div className="text-[11px] text-slate-600 mt-6 text-center">
        PROTINUT™ Nutrition Security Shield v2.4 • Spring Boot JWT Authenticated
      </div>
    </div>
  );
};

export default AdminLoginPage;
