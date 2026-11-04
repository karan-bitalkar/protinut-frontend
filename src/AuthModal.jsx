import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import './AuthModal.css';
import logoImg from './assets/protinut-logo.png';

/**
 * AuthModal – Premium PROTINUT™ Split-Screen Popup Modal
 * Left Side: Rich Dark Brown (#2B1810 / #3E2723), PROTINUT Logo, product jars, and key bullet points
 * Right Side: Clean white/cream form with Login & Register tabs, icons, validation, and demo social logins
 */
const AuthModal = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onLoginSuccess
}) => {
  const { login } = useAuth();
  const [mode, setMode] = useState(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    identifier: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Keep mode in sync with defaultMode prop when opened
  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode || 'login');
      setFormData({
        identifier: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      setFieldErrors({});
      setShowPassword(false);
      setIsSubmitting(false);
    }
  }, [isOpen, defaultMode]);

  // Reset errors when switching mode
  useEffect(() => {
    setFieldErrors({});
    setShowPassword(false);
  }, [mode]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const validatePhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s\-()]/g, ''));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors = {};
    if (mode === 'login') {
      if (!formData.identifier.trim()) {
        errors.identifier = 'Email or Mobile number is required';
      }
      if (!formData.password) {
        errors.password = 'Password is required';
      }
    } else {
      if (!formData.fullName.trim()) {
        errors.fullName = 'Full name is required';
      }
      if (!formData.email.trim() || !validateEmail(formData.email)) {
        errors.email = 'Valid email is required';
      }
      if (!formData.phone.trim() || !validatePhone(formData.phone)) {
        errors.phone = 'Valid 10-digit Indian mobile required';
      }
      if (!formData.password || formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      if (!agreeTerms) {
        errors.terms = 'Please accept Terms & Privacy Policy to proceed';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (mode === 'login') {
        const raw = formData.identifier.trim();
        const displayName = raw.includes('@')
          ? raw.split('@')[0].charAt(0).toUpperCase() + raw.split('@')[0].slice(1)
          : `Member (${raw.slice(-4)})`;
        const loggedUser = {
          name: displayName,
          identifier: raw,
          email: raw.includes('@') ? raw : `${raw}@protinut.in`,
          phone: !raw.includes('@') ? raw : '+91 98765 43210'
        };
        login(loggedUser);
        if (onLoginSuccess) onLoginSuccess(loggedUser);
        onClose();
        toast.success(`Welcome back, ${displayName}!`, {
          style: {
            background: '#15803d',
            color: '#ffffff',
            borderRadius: '12px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            fontWeight: 700
          }
        });
      } else {
        toast.success('Account created successfully! Please sign in.', {
          style: {
            background: '#15803d',
            color: '#ffffff',
            borderRadius: '12px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            fontWeight: 700
          }
        });
        setMode('login');
        setFormData((prev) => ({
          ...prev,
          identifier: prev.email || prev.phone,
          password: ''
        }));
      }
    }, 700);
  };

  return (
    <div
      className="auth-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        ref={modalRef}
        className="auth-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close modal"
          title="Close (Esc)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="auth-split-layout">
          {/* ══════════════════════════════════════════════════════════
              LEFT SIDE: Rich Dark Brown Panel with Logo, Products & Perks
              ══════════════════════════════════════════════════════════ */}
          <div className="auth-left-panel">
            <div className="auth-left-ambient-glow" aria-hidden="true" />

            {/* Logo */}
            <div className="auth-brand-logo-wrap">
              <img
                src={logoImg}
                alt="PROTINUT™"
                className="auth-brand-logo-img"
              />
            </div>

            {/* Welcome Taglines */}
            <div className="auth-left-headings">
              <span className="auth-left-pill">OFFICIAL STORE</span>
              <h2 id="auth-modal-title" className="auth-left-title">
                Welcome to <span className="highlight-brand">PROTINUT™</span>
              </h2>
              <p className="auth-left-tagline">
                Healthy Food. Better You.
              </p>
            </div>

            {/* Product Jars Showcase (Side by Side with Glow) */}
            <div className="auth-jars-showcase">
              <div className="auth-jar-card jar-classy">
                <img
                  src="/products/classy-crunch.png"
                  alt="PROTINUT Classy Crunch Peanut Butter"
                  className="auth-jar-image"
                />
                <span className="auth-jar-caption">Classy Crunch</span>
              </div>
              <div className="auth-jar-card jar-choco">
                <img
                  src="/products/choco-crunch.png"
                  alt="PROTINUT Choco Crunch Peanut Butter"
                  className="auth-jar-image"
                />
                <span className="auth-jar-caption">Choco Crunch</span>
              </div>
            </div>

            {/* Key Value Proposition Bullet Points */}
            <ul className="auth-perks-list">
              <li className="auth-perk-item">
                <span className="auth-perk-icon">🥜</span>
                <div className="auth-perk-text">
                  <strong>100% Pure Peanuts</strong>
                  <small>Zero hydrogenated oils or harmful fillers</small>
                </div>
              </li>
              <li className="auth-perk-item">
                <span className="auth-perk-icon">💪</span>
                <div className="auth-perk-text">
                  <strong>High Plant Protein</strong>
                  <small>26g natural protein power per 100g</small>
                </div>
              </li>
              <li className="auth-perk-item">
                <span className="auth-perk-icon">🌿</span>
                <div className="auth-perk-text">
                  <strong>Zero Palm Oil</strong>
                  <small>Slow-roasted & stone-ground perfection</small>
                </div>
              </li>
            </ul>

            {/* Bottom Security / Trust Indicator */}
            <div className="auth-left-trust-footer">
              <span>✓ Certified Pure</span>
              <span>•</span>
              <span>✓ 100% Roasted</span>
              <span>•</span>
              <span>✓ FSSAI Approved</span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT SIDE: Clean White/Cream Form with Tabs
              ══════════════════════════════════════════════════════════ */}
          <div className="auth-right-panel">
            {/* Mode Switch Tabs */}
            <div className="auth-tabs-header" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                Login
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'register'}
                className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
                onClick={() => setMode('register')}
              >
                Create Account
              </button>
            </div>

            {/* Form Header Info */}
            <div className="auth-form-intro">
              <h3 className="auth-form-heading">
                {mode === 'login' ? 'Sign in to your account' : 'Join the PROTINUT family'}
              </h3>
              <p className="auth-form-subheading">
                {mode === 'login'
                  ? 'Access your orders, saved items, and exclusive member discounts.'
                  : 'Create an account to track shipments and earn member rewards.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="auth-main-form">
              {mode === 'login' ? (
                <>
                  {/* Identifier (Email or Mobile) */}
                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      Email or Mobile Number <span className="req">*</span>
                    </label>
                    <div className={`auth-input-box ${fieldErrors.identifier ? 'error' : ''}`}>
                      <span className="auth-input-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="identifier"
                        placeholder="e.g. rahul@gmail.com or 9876543210"
                        value={formData.identifier}
                        onChange={handleInputChange}
                        className="auth-input"
                        autoComplete="username"
                        autoFocus
                      />
                    </div>
                    {fieldErrors.identifier && (
                      <span className="auth-error-msg">{fieldErrors.identifier}</span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      Password <span className="req">*</span>
                    </label>
                    <div className={`auth-input-box ${fieldErrors.password ? 'error' : ''}`}>
                      <span className="auth-input-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="auth-input has-toggle"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex="-1"
                      >
                        {showPassword ? (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <span className="auth-error-msg">{fieldErrors.password}</span>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="auth-helper-row">
                    <label className="auth-checkbox-label">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="auth-checkbox"
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="auth-forgot-btn"
                      onClick={() => toast('Password reset link will be sent to your registered email.')}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="auth-primary-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="auth-spinner" />
                    ) : (
                      <span>Login</span>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="auth-divider-line">
                    <span className="divider-bar" />
                    <span className="divider-text">or continue with</span>
                    <span className="divider-bar" />
                  </div>

                  {/* Social Buttons */}
                  <div className="auth-social-grid">
                    <button
                      type="button"
                      className="auth-social-button"
                      onClick={() => toast('Google authentication connected for demo')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      className="auth-social-button"
                      onClick={() => toast('Facebook authentication connected for demo')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>

                  {/* Switch to Register */}
                  <div className="auth-bottom-switch">
                    <span>New to PROTINUT?</span>{' '}
                    <button
                      type="button"
                      className="auth-switch-link"
                      onClick={() => setMode('register')}
                    >
                      Create an account
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Full Name */}
                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      Full Name <span className="req">*</span>
                    </label>
                    <div className={`auth-input-box ${fieldErrors.fullName ? 'error' : ''}`}>
                      <span className="auth-input-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="e.g. Karan Sharma"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="auth-input"
                        autoComplete="name"
                        autoFocus
                      />
                    </div>
                    {fieldErrors.fullName && (
                      <span className="auth-error-msg">{fieldErrors.fullName}</span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <div className={`auth-input-box ${fieldErrors.email ? 'error' : ''}`}>
                      <span className="auth-input-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. karan@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="auth-input"
                        autoComplete="email"
                      />
                    </div>
                    {fieldErrors.email && (
                      <span className="auth-error-msg">{fieldErrors.email}</span>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      Mobile Number <span className="req">*</span>
                    </label>
                    <div className={`auth-input-box ${fieldErrors.phone ? 'error' : ''}`}>
                      <span className="auth-phone-prefix">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        maxLength="10"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="auth-input with-prefix"
                        autoComplete="tel"
                      />
                    </div>
                    {fieldErrors.phone && (
                      <span className="auth-error-msg">{fieldErrors.phone}</span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      Create Password <span className="req">*</span>
                    </label>
                    <div className={`auth-input-box ${fieldErrors.password ? 'error' : ''}`}>
                      <span className="auth-input-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="auth-input has-toggle"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex="-1"
                      >
                        {showPassword ? (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 backward 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <span className="auth-error-msg">{fieldErrors.password}</span>
                    )}
                  </div>

                  {/* Terms & Privacy */}
                  <div className="auth-terms-group">
                    <label className="auth-checkbox-label">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="auth-checkbox"
                      />
                      <span>
                        I agree to the{' '}
                        <button
                          type="button"
                          className="auth-inline-link"
                          onClick={() => toast('Terms & Conditions page')}
                        >
                          Terms & Conditions
                        </button>{' '}
                        and{' '}
                        <button
                          type="button"
                          className="auth-inline-link"
                          onClick={() => toast('Privacy Policy page')}
                        >
                          Privacy Policy
                        </button>
                      </span>
                    </label>
                    {fieldErrors.terms && (
                      <span className="auth-error-msg">{fieldErrors.terms}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="auth-primary-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="auth-spinner" />
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="auth-divider-line">
                    <span className="divider-bar" />
                    <span className="divider-text">or continue with</span>
                    <span className="divider-bar" />
                  </div>

                  {/* Social Buttons */}
                  <div className="auth-social-grid">
                    <button
                      type="button"
                      className="auth-social-button"
                      onClick={() => toast('Google authentication connected for demo')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      className="auth-social-button"
                      onClick={() => toast('Facebook authentication connected for demo')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>

                  {/* Switch to Login */}
                  <div className="auth-bottom-switch">
                    <span>Already have an account?</span>{' '}
                    <button
                      type="button"
                      className="auth-switch-link"
                      onClick={() => setMode('login')}
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
