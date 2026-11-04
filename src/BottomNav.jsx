import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = ({
  cartCount = 0,
  wishlistCount = 0,
  isAuthenticated = false,
  onOpenCart,
  onOpenLogin,
  isCartOpen = false
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeActive = location.pathname === '/';
  const isShopActive = location.pathname === '/products' || location.pathname.startsWith('/products/');
  const isWishlistActive = location.pathname === '/wishlist';
  const isCartActive = isCartOpen || location.pathname === '/cart';
  const isAccountActive = location.pathname === '/account' || location.pathname.startsWith('/orders');

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      if (onOpenLogin) onOpenLogin();
      else navigate('/login?redirect=/wishlist');
    } else {
      navigate('/wishlist');
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (onOpenCart) {
      onOpenCart();
    } else {
      navigate('/cart');
    }
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      if (onOpenLogin) onOpenLogin();
      else navigate('/login?redirect=/account');
    } else {
      navigate('/account');
    }
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation Bar">
      
      {/* 1. Home Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isHomeActive ? 'active' : ''}`}
        onClick={handleHomeClick}
        aria-label="Home"
      >
        <div className="bottom-nav-icon-wrap">
          <svg
            className="bottom-nav-icon"
            viewBox="0 0 24 24"
            fill={isHomeActive ? 'rgba(240, 80, 35, 0.15)' : 'none'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span className="bottom-nav-label">Home</span>
        {isHomeActive && <span className="bottom-nav-active-dot" />}
      </button>

      {/* 2. Shop / Products Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isShopActive ? 'active' : ''}`}
        onClick={handleShopClick}
        aria-label="Shop Products"
      >
        <div className="bottom-nav-icon-wrap">
          <svg
            className="bottom-nav-icon"
            viewBox="0 0 24 24"
            fill={isShopActive ? 'rgba(240, 80, 35, 0.15)' : 'none'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <span className="bottom-nav-label">Shop</span>
        {isShopActive && <span className="bottom-nav-active-dot" />}
      </button>

      {/* 3. Wishlist Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isWishlistActive ? 'active' : ''}`}
        onClick={handleWishlistClick}
        aria-label={`Wishlist (${wishlistCount} items)`}
      >
        <div className="bottom-nav-icon-wrap">
          <svg
            className="bottom-nav-icon"
            viewBox="0 0 24 24"
            fill={isWishlistActive ? '#f05023' : 'none'}
            stroke={isWishlistActive ? '#f05023' : 'currentColor'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlistCount > 0 && (
            <span className="bottom-nav-badge">{wishlistCount}</span>
          )}
        </div>
        <span className="bottom-nav-label">Wishlist</span>
        {isWishlistActive && <span className="bottom-nav-active-dot" />}
      </button>

      {/* 4. Cart Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isCartActive ? 'active' : ''}`}
        onClick={handleCartClick}
        aria-label={`Cart (${cartCount} items)`}
      >
        <div className="bottom-nav-icon-wrap">
          <svg
            className="bottom-nav-icon"
            viewBox="0 0 24 24"
            fill={isCartActive ? 'rgba(240, 80, 35, 0.15)' : 'none'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span className="bottom-nav-badge">{cartCount}</span>
          )}
        </div>
        <span className="bottom-nav-label">Cart</span>
        {isCartActive && <span className="bottom-nav-active-dot" />}
      </button>

      {/* 5. Account Tab */}
      <button
        type="button"
        className={`bottom-nav-item ${isAccountActive ? 'active' : ''}`}
        onClick={handleAccountClick}
        aria-label="Account"
      >
        <div className="bottom-nav-icon-wrap">
          <svg
            className="bottom-nav-icon"
            viewBox="0 0 24 24"
            fill={isAccountActive ? 'rgba(240, 80, 35, 0.15)' : 'none'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span className="bottom-nav-label">{isAuthenticated ? 'Account' : 'Login'}</span>
        {isAccountActive && <span className="bottom-nav-active-dot" />}
      </button>

    </nav>
  );
};

export default BottomNav;

