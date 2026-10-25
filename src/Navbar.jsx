import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import './Navbar.css';
import logoImg from './assets/protinut-logo.png';

const Navbar = ({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenLogin,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'PRODUCTS', path: '/products' },
    { label: 'BENEFITS', path: '/benefits' },
    { label: 'RECIPES', path: '/recipes' },
    { label: 'BLOG', path: '/blog' },
    { label: 'CONTACT US', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to view your wishlist', {
        id: 'nav-wishlist-auth-toast',
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
      navigate('/login?redirect=/wishlist');
    } else {
      navigate('/wishlist');
    }
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to view your cart', {
        id: 'nav-cart-auth-toast',
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
      navigate('/login?redirect=/cart');
    } else {
      navigate('/cart');
    }
  };

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/account');
    } else {
      navigate('/account');
    }
  };

  const handleLogoutAction = () => {
    setUserMenuOpen(false);
    logout();
    if (onLogout) onLogout();
    toast.success('Logged out successfully', {
      duration: 3000,
      style: {
        background: '#15803d',
        color: '#ffffff',
        borderRadius: '12px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '13px',
        fontWeight: 700
      }
    });
    navigate('/');
  };

  return (
    <header className="protinut-navbar-wrapper">
      <nav className="protinut-navbar">
        <div className="navbar-container">
          
          {/* Brand Logo */}
          <Link to="/" className="navbar-logo" aria-label="PROTINUT Home" onClick={() => setMobileMenuOpen(false)}>
            <img src={logoImg} alt="PROTINUT™" className="logo-img" />
          </Link>

          {/* Navigation Links (Desktop + Mobile) */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            {navLinks.map((item) => (
              <li key={item.label} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  {isActive(item.path) && <span className="active-indicator" />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action Icons & SHOP NOW Button */}
          <div className="navbar-actions">
            
            {/* Vertical Divider */}
            <div className="nav-divider" aria-hidden="true" />

            {/* Search Icon */}
            <button type="button" className="action-btn" aria-label="Search" title="Search">
              <svg
                className="action-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* User Profile / Account Area */}
            {isAuthenticated && user ? (
              <div className="nav-user-menu-wrap">
                <button
                  type="button"
                  className="nav-user-pill-btn"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  aria-label={`User account menu for ${user.name}`}
                  title={`Signed in as ${user.name}`}
                >
                  <span className="user-avatar-initial">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="user-pill-name">{user.name.split(' ')[0]}</span>
                  <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="nav-user-dropdown" role="menu">
                    <div className="dropdown-header">
                      <strong>{user.name}</strong>
                      <small>{user.email || user.identifier || 'PROTINUT Member'}</small>
                    </div>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/account');
                      }}
                    >
                      👤 My Account
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/orders');
                      }}
                    >
                      📦 My Orders
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/cart');
                      }}
                    >
                      🛍️ My Cart ({cartCount} items)
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/wishlist');
                      }}
                    >
                      ❤️ My Wishlist ({wishlistCount} items)
                    </button>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      className="dropdown-item logout-item"
                      onClick={handleLogoutAction}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="action-btn"
                aria-label="User Account / Sign in"
                title="Login / Register"
                onClick={handleAccountClick}
              >
                <svg
                  className="action-icon"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            )}

            {/* Wishlist Heart Button */}
            <button
              type="button"
              className="action-btn badge-btn"
              aria-label={`Wishlist (${isAuthenticated ? wishlistCount : 0} items)`}
              title={isAuthenticated ? `Wishlist (${wishlistCount} items)` : 'Login to view Wishlist'}
              onClick={handleWishlistClick}
            >
              <svg
                className="action-icon"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {/* Badge is completely hidden for non-logged-in users */}
              {isAuthenticated && wishlistCount > 0 && (
                <span className="count-badge">{wishlistCount}</span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              className="action-btn badge-btn"
              onClick={handleCartClick}
              aria-label={`Open Cart (${isAuthenticated ? cartCount : 0} items)`}
              title={isAuthenticated ? `View Cart (${cartCount} items)` : 'Login to view Cart'}
            >
              <svg
                className="action-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1.5" />
                <circle cx="19" cy="21" r="1.5" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {/* Badge is completely hidden for non-logged-in users */}
              {isAuthenticated && cartCount > 0 && (
                <span className="count-badge">{cartCount}</span>
              )}
            </button>

            {/* SHOP NOW -> Pill Button */}
            <Link to="/products" className="btn-shop-now">
              <span>SHOP NOW</span>
              <svg
                className="arrow-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>

          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
