import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const MAX_CART_LIMIT = 5;

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
  const discountAmount = couponApplied ? Math.round(subtotal * 0.10) : 0;
  const shippingFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'PROTINUT10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try PROTINUT10 for 10% OFF!');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  const handleCheckout = () => {
    setOrderSuccess(true);
  };

  return (
    <div className="cart-page">
      {/* ── Page Header ── */}
      <div className="cart-hero-strip">
        <div className="cart-hero-inner">
          <span className="cart-breadcrumb">
            <Link to="/">Home</Link> / <span>Shopping Cart</span>
          </span>
          <h1 className="cart-main-title">
            Your Protinut Cart <span className="cart-title-count">({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
          </h1>
          <p className="cart-subtitle">
            Stock up on pure, high-protein peanut butter. (Maximum limit: <strong>5 products</strong> per order).
          </p>
        </div>
      </div>

      <div className="cart-container">
        {orderSuccess ? (
          /* ── Order Placed Success State ── */
          <div className="order-success-card">
            <div className="success-icon-bounce">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p>
              Thank you for choosing <strong>PROTINUT™</strong>! Your high-protein goodness is being freshly packed at our Dharashiv facility in Maharashtra.
            </p>
            <div className="order-summary-pill">
              <span>Order ID: #PRT-{Math.floor(100000 + Math.random() * 900000)}</span>
              <span>Total Paid: ₹{grandTotal}</span>
            </div>
            <Link to="/" className="btn-return-home" onClick={() => onClearCart && onClearCart()}>
              CONTINUE SHOPPING →
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          /* ── Empty Cart State ── */
          <div className="cart-empty-card">
            <div className="empty-cart-illustration">
              <div className="empty-cart-icon-bubble">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef5323" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1.5" />
                  <circle cx="19" cy="21" r="1.5" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
            </div>
            <h2>Your cart is empty!</h2>
            <p className="empty-cart-subtext">
              Looks like you haven't added anything yet. Explore our protein-packed peanut butters!
            </p>
            <div className="empty-suggestions">
              <span className="suggestion-pill">🥜 100% Roasted Peanuts</span>
              <span className="suggestion-pill">💪 Up to 30g Protein</span>
              <span className="suggestion-pill">🚫 Zero Palm Oil</span>
            </div>
            <div className="empty-cart-actions">
              <Link to="/products" className="btn-shop-now-empty">
                Shop Now →
              </Link>
            </div>
          </div>
        ) : (
          /* ── Main Cart Content ── */
          <div className="cart-grid">
            
            {/* Left: Product Items & Capacity Meter */}
            <div className="cart-left-col">
              
              {/* Cart Limit Gauge (Max 5 items rule) */}
              <div className={`cart-capacity-banner ${totalItemsCount >= MAX_CART_LIMIT ? 'limit-reached' : ''}`}>
                <div className="capacity-top-row">
                  <div className="capacity-label">
                    <span className="capacity-icon">📦</span>
                    <strong>Order Capacity Limit:</strong>
                  </div>
                  <span className="capacity-number">
                    <strong>{totalItemsCount}</strong> / {MAX_CART_LIMIT} Products
                  </span>
                </div>

                {/* Progress bar */}
                <div className="capacity-progress-track">
                  <div
                    className="capacity-progress-fill"
                    style={{ width: `${(totalItemsCount / MAX_CART_LIMIT) * 100}%` }}
                  />
                </div>

                <div className="capacity-note">
                  {totalItemsCount >= MAX_CART_LIMIT ? (
                    <span className="note-alert">
                      ⚠️ <strong>Cart Limit Reached:</strong> Maximum {MAX_CART_LIMIT} jars allowed per order. To add a different jar, please remove an item below.
                    </span>
                  ) : (
                    <span className="note-safe">
                      ✓ You can add <strong>{MAX_CART_LIMIT - totalItemsCount}</strong> more {MAX_CART_LIMIT - totalItemsCount === 1 ? 'jar' : 'jars'} to your order.
                    </span>
                  )}
                </div>
              </div>

              {/* Free Shipping Milestone Alert */}
              <div className="shipping-perk-banner">
                {subtotal >= 499 ? (
                  <span className="perk-achieved">
                    🎉 <strong>Congratulations!</strong> You’ve unlocked <strong>FREE Delivery</strong> across India!
                  </span>
                ) : (
                  <span className="perk-pending">
                    🚚 Add <strong>₹{499 - subtotal}</strong> more of healthy goodness for <strong>FREE Delivery</strong>!
                  </span>
                )}
              </div>

              {/* Cart Items List */}
              <div className="cart-items-card">
                <div className="cart-items-header">
                  <span>Product Details</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>

                <div className="cart-items-list">
                  {cartItems.map((item) => {
                    const isLimitReached = totalItemsCount >= MAX_CART_LIMIT;
                    return (
                      <div key={`${item.id}-${item.selectedWeight}`} className="cart-item-row">
                        
                        {/* Product Visual & Info */}
                        <div className="item-info-col">
                          <div className="item-img-frame">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <div className="item-badges">
                              <span className="item-weight-badge">{item.selectedWeight || '550gm'}</span>
                              <span className="item-protein-badge">⚡ High Protein</span>
                            </div>
                            <span className="item-unit-price">₹{item.finalPrice} each</span>
                            <button
                              type="button"
                              className="btn-item-remove"
                              onClick={() => onRemoveItem(item.id, item.selectedWeight)}
                              title="Remove item"
                            >
                              🗑️ Remove
                            </button>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="item-qty-col">
                          <div className="qty-control-box">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => onUpdateQuantity(item.id, item.selectedWeight, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              type="button"
                              className={`qty-btn ${isLimitReached ? 'disabled-limit' : ''}`}
                              onClick={() => onUpdateQuantity(item.id, item.selectedWeight, item.quantity + 1)}
                              disabled={isLimitReached}
                              title={isLimitReached ? "Maximum 5 items limit reached" : "Increase quantity"}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          {isLimitReached && (
                            <span className="qty-max-badge">Max 5 reached</span>
                          )}
                        </div>

                        {/* Row Price */}
                        <div className="item-total-col">
                          <span className="item-subtotal-price">
                            ₹{item.finalPrice * item.quantity}
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Clear Cart Button */}
                <div className="cart-actions-bottom">
                  <Link to="/products" className="btn-continue-link">
                    ← Add More Flavours
                  </Link>
                  <button
                    type="button"
                    className="btn-clear-cart"
                    onClick={() => onClearCart && onClearCart()}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Order Summary Sticky Card */}
            <div className="cart-right-col">
              <div className="order-summary-card">
                <h2 className="summary-title">Order Summary</h2>

                {/* Subtotal breakdown */}
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Subtotal ({totalItemsCount} items)</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {couponApplied && (
                    <div className="summary-row discount-row">
                      <span>Coupon (PROTINUT10 - 10%)</span>
                      <span className="discount-val">- ₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Delivery Charges</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="free-shipping-tag">FREE</strong>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-row grand-total-row">
                    <span>Total Amount</span>
                    <span className="grand-total-price">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="coupon-box-wrapper">
                  {couponApplied ? (
                    <div className="applied-coupon-pill">
                      <div>
                        <strong>✓ PROTINUT10 Applied</strong>
                        <span>You saved ₹{discountAmount}!</span>
                      </div>
                      <button type="button" onClick={handleRemoveCoupon}>✕</button>
                    </div>
                  ) : (
                    <form className="coupon-form" onSubmit={handleApplyCoupon}>
                      <input
                        type="text"
                        placeholder="Coupon (e.g. PROTINUT10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button type="submit">APPLY</button>
                    </form>
                  )}
                  {couponError && <p className="coupon-error-text">{couponError}</p>}
                </div>

                {/* Proceed to Checkout CTA */}
                <button
                  type="button"
                  className="btn-checkout-cta"
                  onClick={handleCheckout}
                >
                  PROCEED TO CHECKOUT • ₹{grandTotal}
                </button>

                {/* Trust Badges */}
                <div className="summary-trust-strip">
                  <div className="trust-item">
                    <span>🛡️</span>
                    <span>100% Authentic & Fresh Batch</span>
                  </div>
                  <div className="trust-item">
                    <span>⚡</span>
                    <span>Direct from Dharashiv Lab</span>
                  </div>
                  <div className="trust-item">
                    <span>💳</span>
                    <span>UPI / Cards / NetBanking / COD</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
