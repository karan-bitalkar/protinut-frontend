import React, { useState, useEffect } from 'react';
import './AuthModal.css';

const AuthModal = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onLoginSuccess,
  promoSubtitle = 'Join our community for fresh batch alerts, member-only deals, and fast order checkout.'
}) => {
  const [mode, setMode] = useState(defaultMode); // 'login' | 'register' | 'forgot'

  // Sync mode whenever defaultMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setFieldErrors({});
      setSubmitError('');
      setRegistrationSuccess(false);
      setSocialNotice('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, defaultMode]);

  // Clean, un-prefilled form state
  const [formData, setFormData] = useState({
    identifier: '', // email or phone for login
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: false, // optional & unchecked by default
    whatsappUpdates: false // optional & unchecked by default
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [socialNotice, setSocialNotice] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field-level error on edit
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
    if (socialNotice) {
      setSocialNotice('');
    }
  };

  // Validation helpers
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validateIndianMobile = (phone) => {
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    return /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError('');
    const errors = {};

    if (mode === 'register') {
      // 1. Full Name
      if (!formData.fullName.trim()) {
        errors.fullName = 'Full name is required.';
      } else if (formData.fullName.trim().length < 2) {
        errors.fullName = 'Full name must be at least 2 characters.';
      }

      // 2. Email Address
      if (!formData.email.trim()) {
        errors.email = 'Email address is required.';
      } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address (e.g. name@example.com).';
      }

      // 3. Mobile Number (+91, 10 digits)
      if (!formData.phone.trim()) {
        errors.phone = '10-digit mobile number is required.';
      } else if (!validateIndianMobile(formData.phone)) {
        errors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
      }

      // 4. Create Password
      if (!formData.password) {
        errors.password = 'Password is required.';
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
      }

      // 5. Confirm Password
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirm your password.';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      // Valid frontend demo registration
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setRegistrationSuccess(true);
      }, 600);

    } else if (mode === 'login') {
      // 1. Identifier
      if (!formData.identifier.trim()) {
        errors.identifier = 'Please enter your email or mobile number.';
      }

      // 2. Password
      if (!formData.password) {
        errors.password = 'Password is required.';
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);

        // Derive friendly display name from email/phone
        let displayName = 'Valued Customer';
        if (formData.identifier.includes('@')) {
          const raw = formData.identifier.split('@')[0];
          displayName = raw.charAt(0).toUpperCase() + raw.slice(1);
        } else if (formData.identifier.replace(/\D/g, '').length >= 10) {
          displayName = `Member (${formData.identifier.slice(-4)})`;
        }

        if (onLoginSuccess) {
          onLoginSuccess({
            name: displayName,
            identifier: formData.identifier.trim()
          });
        }
        onClose();
      }, 600);

    } else if (mode === 'forgot') {
      if (!formData.identifier.trim()) {
        errors.identifier = 'Please enter your registered email or phone.';
        setFieldErrors(errors);
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSocialNotice('Demo password reset instructions have been simulated for this email/phone.');
        setTimeout(() => {
          setMode('login');
          setSocialNotice('');
        }, 2500);
      }, 600);
    }
  };

  const handleDemoSocial = (provider) => {
    setSocialNotice(`${provider} sign-in is a mock demo option for this showcase.`);
    setTimeout(() => setSocialNotice(''), 3500);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setFieldErrors({});
    setSubmitError('');
    setRegistrationSuccess(false);
    setSocialNotice('');
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Modal Button */}
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close auth dialog"
        >
          ✕
        </button>

        <div className="auth-split-layout">
          
          {/* ── Left Column: Brand Hero Banner (Matches Reference Image) ── */}
          <div className="auth-hero-banner">
            <div className="auth-hero-real-image-wrap">
              <img
                src="/login-banner-ref.png"
                alt="Welcome to PROTINUT™ - Healthy Food, Better You."
                className="auth-hero-real-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.getElementById('auth-hero-fallback-layer');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            </div>

            {/* Fallback stylized banner in case image fails to load */}
            <div className="auth-hero-fallback-layer" id="auth-hero-fallback-layer" style={{ display: 'none' }}>
              <div className="auth-hero-content">
                <span className="auth-hero-welcome">Welcome to</span>
                <h2 className="auth-hero-title">PROTINUT</h2>
                <p className="auth-hero-tagline">Healthy Food, Better You.</p>
              </div>

              <div className="auth-hero-jars-wrap">
                <div className="auth-jar-card jar-left">
                  <img src="/products/classy-crunch.png" alt="Classy Crunch" className="auth-jar-img" />
                </div>
                <div className="auth-jar-card jar-right">
                  <img src="/products/choco-crunch.png" alt="Choco Crunch" className="auth-jar-img" />
                </div>
              </div>

              <div className="auth-hero-footer-perks">
                <span>🌱 100% Roasted Peanuts</span>
                <span>⚡ High Plant Protein</span>
                <span>🚫 Zero Palm Oil</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Form (Clean, Accessible & Responsive) ── */}
          <div className="auth-form-column">
            
            {/* Header Tabs (Login / Create Account) */}
            <div className="auth-form-header">
              <div className="auth-tabs-pill">
                <button
                  type="button"
                  className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => switchMode('login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
                  onClick={() => switchMode('register')}
                >
                  Create Account
                </button>
              </div>

              <h3 className="auth-form-title">
                {mode === 'login' && 'Sign in to Account'}
                {mode === 'register' && 'Join the PROTINUT™ Family'}
                {mode === 'forgot' && 'Reset Your Password'}
              </h3>
              <p className="auth-form-subtitle">
                {mode === 'login' && 'Enter your credentials to continue shopping.'}
                {mode === 'register' && promoSubtitle}
                {mode === 'forgot' && "Enter your email or phone and we'll send demo instructions."}
              </p>
            </div>

            {/* Demo Registration Success Confirmation */}
            {registrationSuccess ? (
              <div className="auth-registration-success-card">
                <div className="success-icon-badge">✓</div>
                <h4>Registration Details Verified!</h4>
                <p>
                  Your demo profile for <strong>{formData.fullName}</strong> is ready. Because backend services are not yet connected, your demo account has not been saved on a remote server.
                </p>
                <button
                  type="button"
                  className="btn-auth-primary"
                  onClick={() => {
                    // Pre-fill login identifier for convenience (passwords never stored)
                    setFormData((prev) => ({
                      ...prev,
                      identifier: formData.email || formData.phone,
                      password: '',
                      confirmPassword: ''
                    }));
                    switchMode('login');
                  }}
                >
                  Proceed to Login
                </button>
              </div>
            ) : (
              <>
                {/* Global Error Banner */}
                {submitError && (
                  <div className="auth-alert-box error" role="alert">
                    <span className="alert-icon">⚠️</span>
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Social Demo Notification Banner */}
                {socialNotice && (
                  <div className="auth-alert-box info" role="status">
                    <span className="alert-icon">ℹ️</span>
                    <span>{socialNotice}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="auth-form" noValidate>
                  
                  {/* ───────────────── REGISTRATION MODE ───────────────── */}
                  {mode === 'register' && (
                    <>
                      {/* 1. Full Name */}
                      <div className="auth-field-wrapper">
                        <label className="auth-field-label" htmlFor="reg-fullName">
                          Full Name <span className="req-star">*</span>
                        </label>
                        <div className="auth-input-group">
                          <input
                            id="reg-fullName"
                            type="text"
                            name="fullName"
                            className={`auth-input-field ${fieldErrors.fullName ? 'has-error' : ''}`}
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            autoComplete="name"
                          />
                        </div>
                        {fieldErrors.fullName && (
                          <span className="field-error-text" role="alert">{fieldErrors.fullName}</span>
                        )}
                      </div>

                      {/* 2. Email Address */}
                      <div className="auth-field-wrapper">
                        <label className="auth-field-label" htmlFor="reg-email">
                          Email Address <span className="req-star">*</span>
                        </label>
                        <div className="auth-input-group">
                          <input
                            id="reg-email"
                            type="email"
                            name="email"
                            className={`auth-input-field ${fieldErrors.email ? 'has-error' : ''}`}
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            autoComplete="email"
                          />
                        </div>
                        {fieldErrors.email && (
                          <span className="field-error-text" role="alert">{fieldErrors.email}</span>
                        )}
                      </div>

                      {/* 3. Mobile Number with +91 Country Code */}
                      <div className="auth-field-wrapper">
                        <label className="auth-field-label" htmlFor="reg-phone">
                          Mobile Number <span className="req-star">*</span>
                        </label>
                        <div className="auth-input-group auth-phone-group">
                          <span className="auth-phone-prefix" aria-hidden="true">🇮🇳 +91</span>
                          <input
                            id="reg-phone"
                            type="tel"
                            name="phone"
                            className={`auth-input-field auth-phone-input ${fieldErrors.phone ? 'has-error' : ''}`}
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            maxLength={10}
                            autoComplete="tel-national"
                          />
                        </div>
                        {fieldErrors.phone && (
                          <span className="field-error-text" role="alert">{fieldErrors.phone}</span>
                        )}
                      </div>

                      {/* 4 & 5. Password & Confirm Password (Grid) */}
                      <div className="auth-password-grid">
                        
                        {/* Create Password */}
                        <div className="auth-field-wrapper">
                          <label className="auth-field-label" htmlFor="reg-password">
                            Create Password <span className="req-star">*</span>
                          </label>
                          <div className="auth-input-group password-group">
                            <input
                              id="reg-password"
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              className={`auth-input-field ${fieldErrors.password ? 'has-error' : ''}`}
                              placeholder="Min. 6 characters"
                              value={formData.password}
                              onChange={handleInputChange}
                              autoComplete="new-password"
                            />
                            <button
                              type="button"
                              className="auth-password-toggle"
                              onClick={() => setShowPassword((prev) => !prev)}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              title={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? '🙈' : '👁️'}
                            </button>
                          </div>
                          {fieldErrors.password && (
                            <span className="field-error-text" role="alert">{fieldErrors.password}</span>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="auth-field-wrapper">
                          <label className="auth-field-label" htmlFor="reg-confirmPassword">
                            Confirm Password <span className="req-star">*</span>
                          </label>
                          <div className="auth-input-group password-group">
                            <input
                              id="reg-confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              className={`auth-input-field ${fieldErrors.confirmPassword ? 'has-error' : ''}`}
                              placeholder="Re-enter password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              autoComplete="new-password"
                            />
                            <button
                              type="button"
                              className="auth-password-toggle"
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                              title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                            >
                              {showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                          </div>
                          {fieldErrors.confirmPassword && (
                            <span className="field-error-text" role="alert">{fieldErrors.confirmPassword}</span>
                          )}
                        </div>

                      </div>

                      {/* Optional Updates Checkbox (unchecked by default) */}
                      <div className="auth-checkbox-row">
                        <label className="auth-remember-label">
                          <input
                            type="checkbox"
                            name="whatsappUpdates"
                            checked={formData.whatsappUpdates}
                            onChange={handleInputChange}
                            className="auth-checkbox"
                          />
                          <span>Send order delivery & tracking updates on WhatsApp / SMS (Optional)</span>
                        </label>
                      </div>
                    </>
                  )}

                  {/* ───────────────── LOGIN & FORGOT MODE ───────────────── */}
                  {mode !== 'register' && (
                    <>
                      {/* Email or Phone */}
                      <div className="auth-field-wrapper">
                        <label className="auth-field-label" htmlFor="login-identifier">
                          Email Address or Mobile Number <span className="req-star">*</span>
                        </label>
                        <div className="auth-input-group">
                          <input
                            id="login-identifier"
                            type="text"
                            name="identifier"
                            className={`auth-input-field ${fieldErrors.identifier ? 'has-error' : ''}`}
                            placeholder="Email or 10-digit mobile number"
                            value={formData.identifier}
                            onChange={handleInputChange}
                            autoComplete="username"
                          />
                        </div>
                        {fieldErrors.identifier && (
                          <span className="field-error-text" role="alert">{fieldErrors.identifier}</span>
                        )}
                      </div>

                      {/* Password for Login */}
                      {mode === 'login' && (
                        <div className="auth-field-wrapper">
                          <label className="auth-field-label" htmlFor="login-password">
                            Password <span className="req-star">*</span>
                          </label>
                          <div className="auth-input-group password-group">
                            <input
                              id="login-password"
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              className={`auth-input-field ${fieldErrors.password ? 'has-error' : ''}`}
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleInputChange}
                              autoComplete="current-password"
                            />
                            <button
                              type="button"
                              className="auth-password-toggle"
                              onClick={() => setShowPassword((prev) => !prev)}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              title={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? '🙈' : '👁️'}
                            </button>
                          </div>
                          {fieldErrors.password && (
                            <span className="field-error-text" role="alert">{fieldErrors.password}</span>
                          )}
                        </div>
                      )}

                      {/* Remember Me & Forgot Password */}
                      {mode === 'login' && (
                        <div className="auth-utility-row">
                          <label className="auth-remember-label">
                            <input
                              type="checkbox"
                              name="rememberMe"
                              checked={formData.rememberMe}
                              onChange={handleInputChange}
                              className="auth-checkbox"
                            />
                            <span>Remember me</span>
                          </label>

                          <button
                            type="button"
                            className="auth-forgot-link"
                            onClick={() => switchMode('forgot')}
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    className="btn-auth-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="auth-spinner" aria-label="Loading" />
                    ) : mode === 'login' ? (
                      'Login'
                    ) : mode === 'register' ? (
                      'Create Free Account'
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>

                  {/* Social Buttons (Transparent Demo Notice) */}
                  {mode !== 'forgot' && (
                    <>
                      <div className="auth-divider-row">
                        <span className="divider-line" />
                        <span className="divider-label">or continue with</span>
                        <span className="divider-line" />
                      </div>

                      <div className="auth-social-row">
                        {/* Google Button */}
                        <button
                          type="button"
                          className="btn-social google-btn"
                          onClick={() => handleDemoSocial('Google')}
                          title="Google Sign-In (Demo option)"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                          <span>Google <small className="demo-tag">(Demo)</small></span>
                        </button>

                        {/* Facebook Button */}
                        <button
                          type="button"
                          className="btn-social facebook-btn"
                          onClick={() => handleDemoSocial('Facebook')}
                          title="Facebook Sign-In (Demo option)"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <span>Facebook <small className="demo-tag">(Demo)</small></span>
                        </button>
                      </div>
                    </>
                  )}

                  {/* Mode Switching Bottom Outline Button */}
                  <div className="auth-bottom-switch">
                    {mode === 'login' ? (
                      <button
                        type="button"
                        className="btn-create-account-outline"
                        onClick={() => switchMode('register')}
                      >
                        Create New Account
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-create-account-outline"
                        onClick={() => switchMode('login')}
                      >
                        Already have an account? Login
                      </button>
                    )}
                  </div>

                </form>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthModal;
