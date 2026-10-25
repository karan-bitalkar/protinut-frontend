import React, { useState, useRef } from 'react';
import './OurRange.css';

const initialProducts = [
  {
    id: 'classy-crunch',
    name: 'Classy Crunch',
    category: 'Peanut Butter',
    price550: 250,
    price1kg: 449,
    weight: '550gm',
    defaultWeight: '550gm',
    rating: 4.8,
    reviewsCount: 320,
    image: '/products/classy-crunch.png',
    studioImage: '/products/classy-crunch-studio.jpg',
    tag: 'Bestseller',
    color: '#ef5323',
    isOutOfStock: false,
    description: '100% Roasted Peanuts with irresistible crunch. Rich in protein, zero trans fat.'
  },
  {
    id: 'choco-crunch',
    name: 'Choco Crunch',
    category: 'Peanut Butter',
    price550: 270,
    price1kg: 489,
    weight: '550gm',
    defaultWeight: '550gm',
    rating: 4.7,
    reviewsCount: 289,
    image: '/products/choco-crunch.png',
    studioImage: '/products/choco-crunch-studio.jpg',
    tag: 'Choco Delight',
    color: '#9c1c4e',
    isOutOfStock: false,
    description: 'Real chocolate chunks meet slow-roasted peanuts. Deliciously wholesome treat.'
  },
  {
    id: 'creamy-1kg',
    name: 'Creamy Peanut Butter',
    category: 'Peanut Butter',
    price550: 179,
    price1kg: 299,
    weight: '1kg',
    defaultWeight: '1kg',
    rating: 4.8,
    reviewsCount: 410,
    image: '/products/creamy-1kg.png',
    studioImage: '/products/creamy-1kg.png',
    tag: 'Out of Stock',
    color: '#f97316',
    isOutOfStock: true,
    description: 'Ultra-creamy stone-ground roast. 100% handpicked slow-roasted Indian peanuts.'
  },
  {
    id: 'high-protein-1kg',
    name: 'High Protein Peanut Butter',
    category: 'Peanut Butter',
    price550: 199,
    price1kg: 349,
    weight: '1kg',
    defaultWeight: '1kg',
    rating: 4.7,
    reviewsCount: 265,
    image: '/products/high-protein-1kg.png',
    studioImage: '/products/high-protein-1kg.png',
    tag: 'Out of Stock',
    color: '#1e3a8a',
    isOutOfStock: true,
    description: 'High performance fitness blend with extra plant protein punch. Zero added sugar.'
  }
];

const OurRange = ({
  onAddToCart,
  onQuickView,
  wishlistItems = [],
  onToggleWishlist
}) => {
  const [selectedWeights, setSelectedWeights] = useState({
    'classy-crunch': '550gm',
    'choco-crunch': '550gm',
    'creamy-1kg': '1kg',
    'high-protein-1kg': '1kg'
  });
  const [addedIds, setAddedIds] = useState({});
  const [notifiedIds, setNotifiedIds] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  
  // Continuous Auto-Scroll States: Left to Right default
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState('ltr'); // 'ltr' = Left to Right
  const trackRef = useRef(null);

  // Triple cards for a seamless, glitch-free continuous infinite loop
  const loopProducts = [...initialProducts, ...initialProducts, ...initialProducts];

  const toggleWeight = (productId, weight) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleAddToCart = (product) => {
    const weight = selectedWeights[product.id] || product.defaultWeight || '550gm';
    const price = weight === '1kg' ? product.price1kg : product.price550;

    // Trigger button success state
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));

    // Callback for parent/navbar badge
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedWeight: weight,
        finalPrice: price
      });
    }

    // Show toast
    setToastMessage(`${product.name} (${weight}) added to cart!`);

    setTimeout(() => {
      setToastMessage(null);
    }, 2400);

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleNotifyMe = (product) => {
    setNotifiedIds((prev) => ({ ...prev, [product.id]: true }));
    setToastMessage(`We will notify you when ${product.name} is back in stock!`);

    setTimeout(() => {
      setToastMessage(null);
    }, 2600);

    setTimeout(() => {
      setNotifiedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  return (
    <section className="our-range-section" id="products" aria-label="Our Range">
      <div className="our-range-container">
        
        {/* Left Column: Heading, Subtitle, CTA */}
        <div className="range-intro-col">
          <span className="range-badge">OUR RANGE</span>

          <h2 className="range-title">
            <span className="title-dark">Delicious</span>
            <span className="title-orange">Peanut Butters</span>
            <span className="title-orange">for Everyone!</span>
          </h2>

          <p className="range-description">
            Premium quality. Rich in taste.<br />
            Made for your healthy lifestyle.
          </p>

          <a href="#all-products" className="btn-view-all">
            <span>VIEW ALL PRODUCTS</span>
            <svg
              className="arrow-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* Navigation & Continuous Auto-Scroll Controls */}
          <div className="range-controls-row">
            <div className="range-nav-arrows">
              <button
                type="button"
                className={`range-arrow-btn ${direction === 'ltr' ? 'active-dir' : ''}`}
                onClick={() => setDirection('ltr')}
                title="Scroll Left to Right"
                aria-label="Scroll Left to Right"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className={`range-arrow-btn ${direction === 'rtl' ? 'active-dir' : ''}`}
                onClick={() => setDirection('rtl')}
                title="Scroll Right to Left"
                aria-label="Scroll Right to Left"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              className={`range-loop-status ${isPaused ? 'paused' : ''}`}
              onClick={() => setIsPaused((prev) => !prev)}
              title={isPaused ? 'Resume auto scroll' : 'Pause auto scroll'}
            >
              <span className="loop-dot" />
              <span>{isPaused ? '▶ Paused' : '⏸ Auto Left-to-Right'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Continuous Automatic Left-to-Right Marquee Slider */}
        <div
          className="range-cards-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="range-marquee-viewport" ref={trackRef}>
            <div
              className={`range-marquee-track ${direction === 'ltr' ? 'scroll-ltr' : 'scroll-rtl'} ${
                isPaused || isHovered ? 'paused' : ''
              }`}
            >
              {loopProducts.map((item, index) => {
                const uniqueKey = `${item.id}-${index}`;
                const isAdded = addedIds[item.id];
                const isNotified = notifiedIds[item.id];
                const activeWeight = selectedWeights[item.id] || item.defaultWeight || '550gm';
                const displayPrice = activeWeight === '1kg' ? item.price1kg : item.price550;
                const isOutOfStock = item.isOutOfStock;

                return (
                  <div key={uniqueKey} className="range-product-card">
                    
                    {/* Floating Tag & Quick Actions */}
                    <div className="card-top-badges">
                      <span className={`card-pill-tag ${isOutOfStock ? 'out-of-stock' : ''}`}>
                        {isOutOfStock ? '🔴 Out of Stock' : item.tag}
                      </span>

                      <div className="card-top-actions">
                        {/* Wishlist Heart Button */}
                        <button
                          type="button"
                          className={`btn-card-wishlist ${wishlistItems.some((w) => w.id === item.id) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleWishlist) {
                              onToggleWishlist({
                                id: item.id,
                                name: item.name,
                                weight: activeWeight,
                                price: displayPrice,
                                originalPrice: Math.round(displayPrice * 1.35),
                                image: item.image,
                                rating: item.rating,
                                reviewsCount: item.reviewsCount,
                                tag: item.tag,
                                inStock: !isOutOfStock,
                                isOutOfStock: isOutOfStock
                              });
                            }
                          }}
                          title={wishlistItems.some((w) => w.id === item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          aria-label={wishlistItems.some((w) => w.id === item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={wishlistItems.some((w) => w.id === item.id) ? '#ef5323' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>

                        {onQuickView && (
                          <button
                            type="button"
                            className="btn-card-quickview"
                            onClick={() => onQuickView({
                              ...item,
                              price: displayPrice,
                              weight: activeWeight,
                              isAvailable: !isOutOfStock
                            })}
                            title="Quick View Nutrition"
                            aria-label="Quick View"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Product Image Area */}
                    <div
                      className="card-image-wrap"
                      onClick={() => onQuickView && onQuickView({
                        ...item,
                        price: displayPrice,
                        weight: activeWeight,
                        isAvailable: !isOutOfStock
                      })}
                      style={{ cursor: onQuickView ? 'pointer' : 'default' }}
                    >
                      <img
                        src={item.image}
                        alt={`${item.name} ${item.category}`}
                        className="product-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = item.studioImage;
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="card-body">
                      <h3 className="product-title">{item.name}</h3>
                      <p className="product-subtitle">{item.category}</p>

                      {/* Weight Toggle Switcher */}
                      <div className="card-weight-selector">
                        <button
                          type="button"
                          className={`weight-btn ${activeWeight === '550gm' ? 'active' : ''}`}
                          onClick={() => toggleWeight(item.id, '550gm')}
                        >
                          550gm
                        </button>
                        <button
                          type="button"
                          className={`weight-btn ${activeWeight === '1kg' ? 'active' : ''}`}
                          onClick={() => toggleWeight(item.id, '1kg')}
                        >
                          1kg (Save 10%)
                        </button>
                      </div>

                      {/* Price & Weight */}
                      <div className="product-pricing-row">
                        <div className="price-stack">
                          <span className="product-price">₹{displayPrice}</span>
                          {activeWeight === '1kg' && (
                            <span className="product-mrp">₹{item.price1kg + 70}</span>
                          )}
                        </div>
                        <span className="product-weight">{activeWeight}</span>
                      </div>

                      {/* Star Rating */}
                      <div className="product-rating-row" aria-label={`${item.rating} out of 5 stars`}>
                        <div className="stars-wrap" aria-hidden="true">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="star-icon"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="#ef5323"
                              stroke="#ef5323"
                              strokeWidth="1"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <span className="rating-text">
                          {item.rating} ({item.reviewsCount})
                        </span>
                      </div>

                      {/* Button: Either "Out of Stock" or "Add to Cart" */}
                      {isOutOfStock ? (
                        <button
                          type="button"
                          className={`btn-add-cart out-of-stock ${isNotified ? 'notified' : ''}`}
                          onClick={() => handleNotifyMe(item)}
                          title="Click to get notified when back in stock"
                          aria-label={`${item.name} is Out of Stock. Click to get notified`}
                        >
                          {isNotified ? (
                            <>
                              <svg className="btn-icon check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>We will notify you!</span>
                            </>
                          ) : (
                            <>
                              <svg className="btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                              </svg>
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={`btn-add-cart ${isAdded ? 'added' : ''}`}
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          {isAdded ? (
                            <>
                              <svg
                                className="btn-icon check-icon"
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>Added to Cart!</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="btn-icon cart-icon"
                                width="17"
                                height="17"
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
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="range-toast" role="status" aria-live="polite">
          <span className="toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};

export default OurRange;
