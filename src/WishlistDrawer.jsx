import React, { useState, useEffect } from 'react';
import './WishlistDrawer.css';

const WishlistDrawer = ({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveFromWishlist,
  onClearWishlist,
  onAddToCart
}) => {
  const [addedIds, setAddedIds] = useState({});
  const [toast, setToast] = useState(null);

  // ESC to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleRemove = (itemId) => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(itemId);
    }
    showToast('Removed from wishlist', 'remove');
  };

  const handleClearAll = () => {
    if (onClearWishlist) {
      onClearWishlist();
    }
    showToast('Wishlist cleared', 'remove');
  };

  const handleMoveToCart = (item) => {
    if (!item.inStock && item.isAvailable === false) {
      showToast('This product is currently out of stock', 'error');
      return;
    }

    if (onAddToCart) {
      const result = onAddToCart({
        id: item.id,
        name: item.name,
        selectedWeight: item.weight || item.selectedWeight || '550gm',
        finalPrice: item.price || item.finalPrice || 250,
        quantity: 1,
        image: item.image,
      });

      if (result !== false) {
        setAddedIds((prev) => ({ ...prev, [item.id]: true }));
        showToast(`${item.name} added to cart!`, 'success');
        setTimeout(() => {
          setAddedIds((prev) => ({ ...prev, [item.id]: false }));
        }, 2000);
      }
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const discount = (original, current) => {
    if (!original || !current || original <= current) return 15;
    return Math.round(((original - current) / original) * 100);
  };

  const renderStars = (rating = 4.8) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < full; i++) stars.push('★');
    if (half) stars.push('★');
    while (stars.length < 5) stars.push('☆');
    return stars.join('');
  };

  const totalSavings = wishlistItems.reduce((acc, item) => {
    const orig = item.originalPrice || (item.price ? Math.round(item.price * 1.35) : 350);
    const cur = item.price || 250;
    return acc + Math.max(0, orig - cur);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`wishlist-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Right Side Drawer */}
      <aside
        className={`wishlist-drawer-panel ${isOpen ? 'show' : ''}`}
        aria-label="Wishlist Drawer"
        role="dialog"
      >
        {/* Top Accent */}
        <div className="wishlist-top-accent" />

        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-title-group">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ef5323" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h2 className="wishlist-heading">My Wishlist</h2>
            <span className="wishlist-count-pill">{wishlistItems.length} items</span>
          </div>
          <button
            type="button"
            className="wishlist-close-x"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            ✕
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`wishlist-toast ${toast.type}`}>
            {toast.type === 'success' && '✓ '}
            {toast.type === 'remove' && '🗑 '}
            {toast.type === 'error' && '⚠️ '}
            {toast.message}
          </div>
        )}

        {/* Body */}
        <div className="wishlist-body">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty">
              <div className="empty-heart-icon">♡</div>
              <h3>Your Wishlist is Empty</h3>
              <p>Click the ❤️ heart on any product to save it here for easy checkout later!</p>
              <button type="button" className="btn-browse-products" onClick={onClose}>
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Clear All Header Row */}
              <div className="wishlist-actions-row">
                <span className="wishlist-subtitle">
                  Saved Products ({wishlistItems.length})
                </span>
                <button type="button" className="btn-clear-wishlist" onClick={handleClearAll}>
                  Clear All
                </button>
              </div>

              {/* Product Cards */}
              <div className="wishlist-cards-list">
                {wishlistItems.map((item) => {
                  const origPrice = item.originalPrice || Math.round((item.price || 250) * 1.35);
                  const price = item.price || 250;
                  const off = discount(origPrice, price);
                  const inStock = item.inStock !== false && item.isOutOfStock !== true && item.isAvailable !== false;

                  return (
                    <div
                      key={item.id}
                      className={`wishlist-product-card ${!inStock ? 'out-of-stock' : ''}`}
                    >
                      {/* Remove Heart Button */}
                      <button
                        type="button"
                        className="btn-remove-heart"
                        onClick={() => handleRemove(item.id)}
                        title="Remove from Wishlist"
                        aria-label="Remove from Wishlist"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#ef5323" stroke="none">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>

                      {/* Tag Badge */}
                      {item.tag && (
                        <span className={`wishlist-tag ${item.tag === 'New Arrival' ? 'new' : item.tag === 'Premium' ? 'premium' : item.tag === 'Bestseller' ? 'bestseller' : ''}`}>
                          {item.tag}
                        </span>
                      )}

                      {/* Product Thumbnail */}
                      <div className="wishlist-card-thumb">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = '/products/classy-crunch.png';
                          }}
                        />
                        {!inStock && <div className="oos-overlay">Out of Stock</div>}
                      </div>

                      {/* Details */}
                      <div className="wishlist-card-info">
                        <h4 className="wishlist-card-name" title={item.name}>{item.name}</h4>
                        <span className="wishlist-card-weight">{item.weight || '550gm'}</span>

                        {/* Rating */}
                        <div className="wishlist-card-rating">
                          <span className="stars">{renderStars(item.rating || 4.8)}</span>
                          <span className="rating-num">{item.rating || 4.8}</span>
                          <span className="reviews-count">({item.reviews || item.reviewsCount || 280})</span>
                        </div>

                        {/* Price Row */}
                        <div className="wishlist-price-row">
                          <span className="current-price">₹{price}</span>
                          <span className="original-price">₹{origPrice}</span>
                          <span className="discount-badge">{off}% off</span>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          type="button"
                          className={`btn-wishlist-add-cart ${addedIds[item.id] ? 'added' : ''} ${!inStock ? 'disabled' : ''}`}
                          onClick={() => handleMoveToCart(item)}
                          disabled={!inStock}
                        >
                          {addedIds[item.id] ? (
                            <>✓ Added to Cart</>
                          ) : !inStock ? (
                            <>Notify When Available</>
                          ) : (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="9" cy="21" r="1.5" />
                                <circle cx="19" cy="21" r="1.5" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                              </svg>
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Summary */}
              <div className="wishlist-bottom-summary">
                <div className="wishlist-savings-row">
                  <span>💰 Total Savings</span>
                  <strong className="savings-amount">
                    ₹{totalSavings}
                  </strong>
                </div>
                <button
                  type="button"
                  className="btn-add-all-cart"
                  onClick={() => {
                    const inStockItems = wishlistItems.filter((i) => i.inStock !== false && i.isOutOfStock !== true && i.isAvailable !== false);
                    inStockItems.forEach((item) => handleMoveToCart(item));
                  }}
                >
                  🛒 Add All In-Stock to Cart ({wishlistItems.filter((i) => i.inStock !== false && i.isOutOfStock !== true && i.isAvailable !== false).length} items)
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default WishlistDrawer;
