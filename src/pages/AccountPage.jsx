import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Pages.css';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="account-page" style={{ minHeight: '80vh', background: '#faf5ee', paddingBottom: '80px' }}>
      
      {/* ── Page Header ── */}
      <div className="wishlist-hero-strip" style={{ background: '#fffcf8', borderBottom: '1px solid #ebdcd0', padding: '45px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#8c7a6e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Link to="/" style={{ color: '#ef5323', textDecoration: 'none' }}>Home</Link> / <span>My Account</span>
          </span>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', fontWeight: 900, color: '#2b1810', margin: '8px 0' }}>
            Welcome, {user?.name || 'Member'}! 👋
          </h1>
          <p style={{ color: '#6a5a50', fontSize: '15px', margin: 0 }}>
            Manage your personal profile, addresses, orders, and saved peanut butter jars.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '40px auto 0', padding: '0 24px' }}>
        
        {/* Profile Card */}
        <div style={{ background: '#ffffff', borderRadius: '28px', border: '1.5px solid #ebdcd0', padding: '36px', boxShadow: '0 10px 30px rgba(43,24,16,0.06)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          
          <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: '#ef5323', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 900, fontFamily: "'Montserrat', sans-serif", boxShadow: '0 8px 20px rgba(239,83,35,0.35)' }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
          </div>

          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'inline-block', background: '#fff3ec', color: '#ef5323', border: '1px solid #fed6be', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '6px' }}>
              PROTINUT PRIME MEMBER
            </div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '24px', fontWeight: 900, color: '#2b1810', margin: '0 0 6px' }}>
              {user?.name}
            </h2>
            <div style={{ display: 'flex', gap: '16px', color: '#6a5a50', fontSize: '14px', flexWrap: 'wrap' }}>
              <span>📧 {user?.email || user?.identifier}</span>
              <span>📱 {user?.phone || '+91 98765 43210'}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogoutClick}
            style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '10px 20px', borderRadius: '999px', fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            🚪 Logout
          </button>

        </div>

        {/* Quick Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          <Link to="/orders" style={{ textDecoration: 'none', background: '#ffffff', border: '1.5px solid #ebdcd0', borderRadius: '22px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 14px rgba(43,24,16,0.04)', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '36px' }}>📦</span>
            <div>
              <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '17px', fontWeight: 800, color: '#2b1810', marginBottom: '3px' }}>My Orders</strong>
              <span style={{ fontSize: '13px', color: '#796659' }}>Track active orders & history</span>
            </div>
          </Link>

          <Link to="/wishlist" style={{ textDecoration: 'none', background: '#ffffff', border: '1.5px solid #ebdcd0', borderRadius: '22px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 14px rgba(43,24,16,0.04)', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '36px' }}>❤️</span>
            <div>
              <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '17px', fontWeight: 800, color: '#2b1810', marginBottom: '3px' }}>My Wishlist</strong>
              <span style={{ fontSize: '13px', color: '#796659' }}>Saved favorite jars</span>
            </div>
          </Link>

          <Link to="/cart" style={{ textDecoration: 'none', background: '#ffffff', border: '1.5px solid #ebdcd0', borderRadius: '22px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 14px rgba(43,24,16,0.04)', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '36px' }}>🛍️</span>
            <div>
              <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '17px', fontWeight: 800, color: '#2b1810', marginBottom: '3px' }}>Shopping Cart</strong>
              <span style={{ fontSize: '13px', color: '#796659' }}>Review items & checkout</span>
            </div>
          </Link>

          <Link to="/products" style={{ textDecoration: 'none', background: '#ffffff', border: '1.5px solid #ebdcd0', borderRadius: '22px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 14px rgba(43,24,16,0.04)', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '36px' }}>🥜</span>
            <div>
              <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '17px', fontWeight: 800, color: '#2b1810', marginBottom: '3px' }}>Explore Products</strong>
              <span style={{ fontSize: '13px', color: '#796659' }}>Discover high-protein jars</span>
            </div>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default AccountPage;
