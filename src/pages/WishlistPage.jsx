import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = ({
  wishlistItems = [],
  onAddToCart,
  onToggleWishlist,
  onQuickView
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="wishlist-page-wrapper">
      
      {/* ── Hero Banner ── */}
      <div className="wishlist-hero-strip">
        <div className="wishlist-hero-inner">
          <span className="wishlist-breadcrumb">
            <Link to="/">Home</Link> / <span>My Wishlist</span>
          </span>
          <h1 className="wishlist-main-title">
            My Saved Jars <span className="wishlist-count-pill">({wishlistItems.length})</span>
          </h1>
          <p className="wishlist-hero-subtitle">
            All your favorite protein-packed flavors in one place. Add them to your cart when you're ready!
          </p>
        </div>
      </div>

      <div className="wishlist-content-container">
        {wishlistItems.length === 0 ? (
          /* ── Empty Wishlist State (As specified) ── */
          <div className="wishlist-empty-card">
            <div className="empty-wishlist-illustration">
              <div className="empty-heart-bubble">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef5323" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
            </div>

            <h2 className="empty-wishlist-heading">Your wishlist is empty</h2>
            <p className="empty-wishlist-message">
              Your wishlist is empty. Tap the heart icon on any product to save it for later.
            </p>

            <div className="empty-wishlist-features">
              <span>🥜 100% Roasted Peanuts</span>
              <span>⚡ Up to 30g Protein</span>
              <span>🚫 Zero Palm Oil</span>
            </div>

            <Link to="/products" className="btn-discover-products">
              Discover Products →
            </Link>
          </div>
        ) : (
          /* ── Wishlist Grid ── */
          <div className="wishlist-products-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-product-card">
                
                {/* Remove from wishlist top button */}
                <button
                  type="button"
                  className="btn-remove-wishlist"
                  onClick={() => onToggleWishlist && onToggleWishlist(item)}
                  title="Remove from Wishlist"
                  aria-label="Remove item"
                >
                  ✕
                </button>

                {/* Badge */}
                {item.tag && (
                  <span className="wishlist-card-badge">{item.tag}</span>
                )}

                {/* Image */}
                <div 
                  className="wishlist-card-image-box"
                  onClick={() => onQuickView && onQuickView(item)}
                >
                  <img src={item.image} alt={item.name} className="wishlist-item-img" />
                </div>

                {/* Details */}
                <div className="wishlist-card-details">
                  <span className="wishlist-item-weight">{item.weight || '550gm'}</span>
                  <h3 className="wishlist-item-title" onClick={() => onQuickView && onQuickView(item)}>
                    {item.name}
                  </h3>

                  <div className="wishlist-price-row">
                    <span className="wishlist-current-price">₹{item.price || 250}</span>
                    {item.originalPrice && (
                      <span className="wishlist-original-price">₹{item.originalPrice}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="wishlist-card-actions">
                    <button
                      type="button"
                      className="btn-move-to-cart"
                      onClick={() => {
                        if (onAddToCart) {
                          onAddToCart({
                            id: item.id,
                            name: item.name,
                            selectedWeight: item.weight || '550gm',
                            finalPrice: item.price || 250,
                            quantity: 1,
                            image: item.image
                          });
                        }
                      }}
                    >
                      Move to Cart 🛍️
                    </button>
                    <button
                      type="button"
                      className="btn-wishlist-quickview"
                      onClick={() => onQuickView && onQuickView(item)}
                    >
                      Quick View
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default WishlistPage;
