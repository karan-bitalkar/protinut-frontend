import React, { useState } from 'react';
import './ProductModal.css';

const ProductModal = ({
  product,
  onClose,
  onAddToCart,
  wishlistItems = [],
  onToggleWishlist
}) => {
  const [selectedWeight, setSelectedWeight] = useState(product?.weight || '550gm');
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!product) return null;

  const isAvailable = product.isAvailable !== false;
  const currentPrice = selectedWeight === '1kg' 
    ? Math.round(product.price * 1.8) 
    : product.price;

  const isWishlisted = wishlistItems.some((w) => w.id === product.id);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Controls: Wishlist Heart + Close Button */}
        <div className="modal-top-actions">
          <button
            type="button"
            className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => {
              if (onToggleWishlist) {
                onToggleWishlist({
                  id: product.id,
                  name: product.name,
                  weight: selectedWeight,
                  price: currentPrice,
                  originalPrice: Math.round(currentPrice * 1.35),
                  image: product.studioImage || product.image,
                  rating: product.rating || 4.8,
                  reviewsCount: product.reviewsCount || 320,
                  tag: product.tag,
                  inStock: isAvailable,
                  isOutOfStock: !isAvailable
                });
              }
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isWishlisted ? '#ef5323' : 'none'}
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-grid">
          {/* Left: Product Image & Badges */}
          <div className="modal-image-col">
            <div className="modal-image-box">
              <img
                src={product.studioImage || product.image}
                alt={product.name}
                className="modal-product-img"
              />
              <span className={`modal-status-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                {isAvailable ? 'In Stock' : 'Currently Not Available'}
              </span>
            </div>

            {/* Quick Nutrition Highlights */}
            <div className="modal-nutrition-row">
              <div className="nutrition-pill">
                <span className="pill-val">26g</span>
                <span className="pill-lbl">Protein / 100g</span>
              </div>
              <div className="nutrition-pill">
                <span className="pill-val">0g</span>
                <span className="pill-lbl">Trans Fat</span>
              </div>
              <div className="nutrition-pill">
                <span className="pill-val">100%</span>
                <span className="pill-lbl">Roasted Peanuts</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Action */}
          <div className="modal-details-col">
            <span className="modal-eyebrow">PROTINUT™ NUTRITION</span>
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-subtitle">{product.category || 'Premium Peanut Butter'}</p>

            {/* Rating */}
            <div className="modal-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#ef5323" stroke="#ef5323">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="rating-score">4.8 (320+ Verified Reviews)</span>
            </div>

            {/* Price */}
            {isAvailable ? (
              <div className="modal-price-wrap">
                <span className="modal-price">₹{currentPrice}</span>
                <span className="modal-tax">Inclusive of all taxes</span>
              </div>
            ) : (
              <div className="modal-unavailable-notice">
                <span className="notice-icon">⏳</span>
                <div>
                  <strong>Temporarily Out of Stock</strong>
                  <p>Our fresh batch is currently in production. Be the first to know when it drops!</p>
                </div>
              </div>
            )}

            {/* Size / Weight Selector (if available) */}
            {isAvailable && (
              <div className="modal-selector-group">
                <label className="selector-label">Select Pack Size:</label>
                <div className="weight-chips">
                  <button
                    type="button"
                    className={`weight-chip ${selectedWeight === '550gm' ? 'active' : ''}`}
                    onClick={() => setSelectedWeight('550gm')}
                  >
                    550gm (Regular)
                  </button>
                  <button
                    type="button"
                    className={`weight-chip ${selectedWeight === '1kg' ? 'active' : ''}`}
                    onClick={() => setSelectedWeight('1kg')}
                  >
                    1kg (Save 15%)
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isAvailable ? (
              <div className="modal-action-row">
                <div className="qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="modal-btn-cart"
                  onClick={() => {
                    onAddToCart({
                      ...product,
                      selectedWeight,
                      quantity,
                      finalPrice: currentPrice
                    });
                    onClose();
                  }}
                >
                  🛒 Add to Cart • ₹{currentPrice * quantity}
                </button>
              </div>
            ) : (
              /* Out of stock email notification */
              <form className="modal-notify-form" onSubmit={handleNotifySubmit}>
                <label className="selector-label">Get Notified When Available:</label>
                {subscribed ? (
                  <div className="notify-success">
                    ✓ You are on the VIP waitlist! We will notify you when fresh jars land.
                  </div>
                ) : (
                  <div className="notify-input-group">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="notify-input"
                    />
                    <button type="submit" className="notify-btn">
                      Notify Me
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* Trust Badges */}
            <div className="modal-trust-list">
              <span>🌱 100% Vegetarian</span>
              <span>⚡ High Energy</span>
              <span>🚫 Zero Palm Oil</span>
              <span>🛡️ FSSAI Certified</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;
