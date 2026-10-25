import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedShowcase.css';

const featuredProducts = [
  {
    id: 'classy-crunch',
    name: 'Peanut Butter Classy Crunch',
    tagline: 'Pure Roasted Indian Peanuts • Irresistible Signature Crunch',
    category: 'SIGNATURE ROAST',
    price550: 250,
    price1kg: 449,
    originalPrice550: 340,
    originalPrice1kg: 599,
    rating: 4.9,
    reviewsCount: 340,
    image: '/products/classy-crunch-original.jpg',
    themeColor: '#ef5323',
    themeBg: '#fff4ee',
    borderGlow: 'rgba(239, 83, 35, 0.25)',
    badge: '★ BESTSELLER',
    flavorNotes: 'Crafted from hand-selected, slow-roasted Indian peanuts and stone-ground to preserve authentic aroma. Loaded with chunky roasted bits for that signature hearty crunch in every single bite.',
    tasteProfile: [
      { label: 'Crunch Level', value: '100% Super Crunchy', score: '5/5' },
      { label: 'Roast Profile', value: 'Slow Golden Roast', score: 'Warm & Nutty' },
      { label: 'Added Sugar', value: '0g Added Sugar', score: '100% Natural' }
    ],
    nutrients: [
      { label: 'Protein', value: '30g', desc: 'Per 100g' },
      { label: 'Dietary Fiber', value: '7.8g', desc: 'High Fiber' },
      { label: 'Trans Fat', value: '0g', desc: 'Zero Trans Fat' },
      { label: 'Palm Oil', value: '0%', desc: 'Pure Peanut Oil' }
    ],
    pairings: [
      { icon: '🍞', text: 'Crispy Toast' },
      { icon: '🥣', text: 'Warm Oats' },
      { icon: '🥤', text: 'Protein Shake' },
      { icon: '🍌', text: 'Banana Slices' }
    ],
    highlights: [
      '100% Roasted Peanuts with zero hydrogenated fats',
      'No added fillers, stabilizers, or artificial preservatives',
      'High in healthy unsaturated fats (MUFA/PUFA) for heart health',
      'Clean energy boost ideal for workouts and active lifestyles'
    ]
  },
  {
    id: 'choco-crunch',
    name: 'Peanut Butter Choco Crunch',
    tagline: 'Rich Dark Cocoa Chunks • Wholesome Crunchy Peanut Butter',
    category: 'CHOCOLATE CRAFT',
    price550: 270,
    price1kg: 489,
    originalPrice550: 365,
    originalPrice1kg: 649,
    rating: 4.8,
    reviewsCount: 295,
    image: '/products/choco-crunch-original.jpg',
    themeColor: '#9c1c4e',
    themeBg: '#fcf1f5',
    borderGlow: 'rgba(156, 28, 78, 0.25)',
    badge: 'CHOCO SPECIAL',
    flavorNotes: 'Decadent dark cocoa seamlessly blended into slow-roasted peanut butter, infused with crispy roasted peanut pieces and real chocolate chunks. A guilt-free dessert replacement with massive plant protein.',
    tasteProfile: [
      { label: 'Crunch Level', value: 'Crispy Cocoa Crunch', score: '5/5' },
      { label: 'Cocoa Grade', value: 'Real Dark Cocoa', score: 'Rich & Velvety' },
      { label: 'Sweetness', value: 'Naturally Balanced', score: 'Zero Refined Sugar' }
    ],
    nutrients: [
      { label: 'Protein', value: '26g', desc: 'Per 100g' },
      { label: 'Real Cocoa', value: 'Pure', desc: 'Antioxidant Rich' },
      { label: 'Cholesterol', value: '0mg', desc: 'Zero' },
      { label: 'Preservatives', value: '0%', desc: '100% Clean' }
    ],
    pairings: [
      { icon: '🥞', text: 'Waffles & Crepes' },
      { icon: '🍓', text: 'Berry Smoothie Bowl' },
      { icon: '🥄', text: 'Direct Spoonfuls' },
      { icon: '🥐', text: 'Warm Croissants' }
    ],
    highlights: [
      'Real chocolate chunks infused with stone-ground peanut crunch',
      'Wholesome dessert crave fix packed with high natural protein',
      'Zero cholesterol and 100% pure vegetarian recipe',
      'Clean fuel for kids, fitness lovers, and dessert cravings'
    ]
  }
];

const FeaturedShowcase = ({
  onAddToCart,
  onQuickView,
  wishlistItems = [],
  onToggleWishlist
}) => {
  // Selected weights per product ('550gm' or '1kg')
  const [selectedWeights, setSelectedWeights] = useState({
    'classy-crunch': '550gm',
    'choco-crunch': '550gm'
  });

  // Quantities per product
  const [quantities, setQuantities] = useState({
    'classy-crunch': 1,
    'choco-crunch': 1
  });

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleQtyChange = (productId, delta) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(5, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCartClick = (prod) => {
    const weight = selectedWeights[prod.id] || '550gm';
    const price = weight === '1kg' ? prod.price1kg : prod.price550;
    const qty = quantities[prod.id] || 1;

    if (onAddToCart) {
      onAddToCart({
        id: prod.id,
        name: prod.name,
        selectedWeight: weight,
        finalPrice: price,
        quantity: qty,
        image: prod.image
      });
    }
  };

  const handleQuickViewClick = (prod) => {
    const weight = selectedWeights[prod.id] || '550gm';
    const price = weight === '1kg' ? prod.price1kg : prod.price550;

    if (onQuickView) {
      onQuickView({
        id: prod.id,
        name: prod.name,
        category: 'Peanut Butter',
        price: price,
        weight: weight,
        rating: prod.rating,
        reviewsCount: prod.reviewsCount,
        image: prod.image,
        studioImage: prod.image,
        tag: prod.badge,
        color: prod.themeColor,
        isAvailable: true,
        isOutOfStock: false,
        description: prod.flavorNotes
      });
    }
  };

  return (
    <section className="featured-showcase-section" id="featured-products">
      {/* Ambient background glows */}
      <div className="showcase-bg-orb orb-amber" />
      <div className="showcase-bg-orb orb-rose" />

      <div className="featured-showcase-container">
        
        {/* Section Heading */}
        <div className="showcase-header">
          <div className="showcase-header-pill">
            <span className="pulse-dot" /> 100% PURE & ARTISANAL JARS
          </div>
          <h2 className="showcase-title">
            Our Two Iconic <span className="title-gradient">Signature Jars</span>
          </h2>
          <p className="showcase-subtitle">
            Slow-roasted in small batches from handpicked golden Indian peanuts. Zero palm oil, zero chemical fillers, and unmatched natural crunch.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            PRODUCT 1: CLASSY CRUNCH
            Layout: Text / Information LEFT ➔ Product Photo RIGHT
            ══════════════════════════════════════════════════════════ */}
        {(() => {
          const prod = featuredProducts[0];
          const currentWeight = selectedWeights[prod.id] || '550gm';
          const currentPrice = currentWeight === '1kg' ? prod.price1kg : prod.price550;
          const originalPrice = currentWeight === '1kg' ? prod.originalPrice1kg : prod.originalPrice550;
          const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
          const qty = quantities[prod.id] || 1;
          const isWishlisted = wishlistItems.some((w) => w.id === prod.id);

          return (
            <div className="showcase-card-row layout-text-left" key={prod.id}>
              
              {/* LEFT SIDE: PRODUCT INFORMATION */}
              <div className="showcase-info-pane">
                
                {/* Category & Rating Bar */}
                <div className="pane-header-tags">
                  <span className="pane-category-badge" style={{ color: prod.themeColor, borderColor: prod.themeColor }}>
                    {prod.category}
                  </span>
                  <span className="pane-highlight-tag" style={{ background: prod.themeBg, color: prod.themeColor }}>
                    {prod.badge}
                  </span>
                  <div className="pane-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-score">{prod.rating}</span>
                    <span className="reviews-count">({prod.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="pane-product-title">{prod.name}</h3>
                <p className="pane-product-tagline" style={{ color: prod.themeColor }}>
                  {prod.tagline}
                </p>
                <p className="pane-product-description">{prod.flavorNotes}</p>

                {/* Taste & Crunch Meter */}
                <div className="taste-meter-row">
                  {prod.tasteProfile.map((tp, idx) => (
                    <div className="taste-meter-chip" key={idx}>
                      <span className="taste-chip-lbl">{tp.label}</span>
                      <strong className="taste-chip-val" style={{ color: prod.themeColor }}>{tp.value}</strong>
                    </div>
                  ))}
                </div>

                {/* Nutrients Grid */}
                <div className="pane-nutrients-grid">
                  {prod.nutrients.map((n, idx) => (
                    <div className="nutrient-card" key={idx}>
                      <span className="nutrient-val" style={{ color: prod.themeColor }}>{n.value}</span>
                      <span className="nutrient-lbl">{n.label}</span>
                      <span className="nutrient-desc">{n.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Best Ways to Enjoy */}
                <div className="pairings-row">
                  <span className="pairings-label">Pairs Great With:</span>
                  <div className="pairings-list">
                    {prod.pairings.map((p, idx) => (
                      <span className="pairing-tag" key={idx}>
                        <i>{p.icon}</i> {p.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature Checkpoints */}
                <ul className="pane-features-list">
                  {prod.highlights.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feat-check" style={{ color: prod.themeColor }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Size Selector & Pricing Box */}
                <div className="pane-purchase-box">
                  <div className="weight-and-price-row">
                    
                    <div className="weight-selector-group">
                      <span className="selector-label">Choose Jar Size:</span>
                      <div className="weight-pill-options">
                        <button
                          type="button"
                          className={`weight-option-btn ${currentWeight === '550gm' ? 'active' : ''}`}
                          style={currentWeight === '550gm' ? { background: prod.themeColor, borderColor: prod.themeColor } : {}}
                          onClick={() => handleWeightChange(prod.id, '550gm')}
                        >
                          550gm Jar (Daily Pack)
                        </button>
                        <button
                          type="button"
                          className={`weight-option-btn ${currentWeight === '1kg' ? 'active' : ''}`}
                          style={currentWeight === '1kg' ? { background: prod.themeColor, borderColor: prod.themeColor } : {}}
                          onClick={() => handleWeightChange(prod.id, '1kg')}
                        >
                          1kg Value Tub (Mega Pack)
                        </button>
                      </div>
                    </div>

                    <div className="price-display-group">
                      <div className="price-current-row">
                        <span className="currency-symbol">₹</span>
                        <span className="price-number">{currentPrice}</span>
                        <span className="price-original">₹{originalPrice}</span>
                      </div>
                      <span className="save-badge">SAVE {discount}% OFF</span>
                    </div>

                  </div>


                  {/* Quantity and Actions Bar */}
                  <div className="pane-action-bar">
                    <div className="qty-control">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => handleQtyChange(prod.id, -1)}
                        disabled={qty <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => handleQtyChange(prod.id, 1)}
                        disabled={qty >= 5}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="pane-btn-cart"
                      style={{ background: prod.themeColor }}
                      onClick={() => handleAddToCartClick(prod)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Add To Cart
                    </button>

                    <button
                      type="button"
                      className="pane-btn-quickview"
                      onClick={() => handleQuickViewClick(prod)}
                    >
                      Quick View
                    </button>

                    <button
                      type="button"
                      className={`pane-btn-wishlist ${isWishlisted ? 'active' : ''}`}
                      onClick={() => {
                        if (onToggleWishlist) {
                          onToggleWishlist({
                            id: prod.id,
                            name: prod.name,
                            weight: currentWeight,
                            price: currentPrice,
                            image: prod.image,
                            tag: prod.badge
                          });
                        }
                      }}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      {isWishlisted ? '❤️' : '🤍'}
                    </button>
                  </div>

                </div>

              </div>

              {/* RIGHT SIDE: PRODUCT PHOTO (Clean, Large, Natural & Striking) */}
              <div className="showcase-photo-pane">
                <div
                  className="photo-stage-wrapper"
                  style={{
                    '--border-glow': prod.borderGlow,
                    '--theme-color': prod.themeColor
                  }}
                >
                  <div className="photo-ambient-light" />
                  
                  {/* Top Glass Badges */}
                  <div className="photo-badge-top-row">
                    <span className="photo-badge-seal">
                      <span className="seal-dot" /> 100% NATURAL
                    </span>
                    <span className="photo-badge-weight">
                      Net Qty: {currentWeight}
                    </span>
                  </div>

                  {/* Clean, Full-frame Hero Image */}
                  <div className="photo-image-frame">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="product-hero-photo"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom Feature Bar */}
                  <div className="photo-footer-pills">
                    <span className="photo-pill">🥜 100% Slow Roasted</span>
                    <span className="photo-pill">🚫 Zero Palm Oil</span>
                    <span className="photo-pill">⚡ 30g Protein</span>
                  </div>

                </div>
              </div>

            </div>
          );
        })()}

        {/* ══════════════════════════════════════════════════════════
            PRODUCT 2: CHOCO CRUNCH
            Layout: Product Photo LEFT ➔ Product Information RIGHT (Opposite!)
            ══════════════════════════════════════════════════════════ */}
        {(() => {
          const prod = featuredProducts[1];
          const currentWeight = selectedWeights[prod.id] || '550gm';
          const currentPrice = currentWeight === '1kg' ? prod.price1kg : prod.price550;
          const originalPrice = currentWeight === '1kg' ? prod.originalPrice1kg : prod.originalPrice550;
          const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
          const qty = quantities[prod.id] || 1;
          const isWishlisted = wishlistItems.some((w) => w.id === prod.id);

          return (
            <div className="showcase-card-row layout-photo-left" key={prod.id}>
              
              {/* LEFT SIDE: PRODUCT PHOTO (Opposite!) */}
              <div className="showcase-photo-pane">
                <div
                  className="photo-stage-wrapper"
                  style={{
                    '--border-glow': prod.borderGlow,
                    '--theme-color': prod.themeColor
                  }}
                >
                  <div className="photo-ambient-light" />
                  
                  {/* Top Glass Badges */}
                  <div className="photo-badge-top-row">
                    <span className="photo-badge-seal">
                      <span className="seal-dot" /> 100% NATURAL
                    </span>
                    <span className="photo-badge-weight">
                      Net Qty: {currentWeight}
                    </span>
                  </div>

                  {/* Clean, Full-frame Hero Image */}
                  <div className="photo-image-frame">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="product-hero-photo"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom Feature Bar */}
                  <div className="photo-footer-pills">
                    <span className="photo-pill">🍫 Real Dark Cocoa</span>
                    <span className="photo-pill">⚡ 26g Protein</span>
                    <span className="photo-pill">🌿 No Trans Fat</span>
                  </div>

                </div>
              </div>

              {/* RIGHT SIDE: PRODUCT INFORMATION */}
              <div className="showcase-info-pane">
                
                {/* Category & Rating Bar */}
                <div className="pane-header-tags">
                  <span className="pane-category-badge" style={{ color: prod.themeColor, borderColor: prod.themeColor }}>
                    {prod.category}
                  </span>
                  <span className="pane-highlight-tag" style={{ background: prod.themeBg, color: prod.themeColor }}>
                    {prod.badge}
                  </span>
                  <div className="pane-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-score">{prod.rating}</span>
                    <span className="reviews-count">({prod.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="pane-product-title">{prod.name}</h3>
                <p className="pane-product-tagline" style={{ color: prod.themeColor }}>
                  {prod.tagline}
                </p>
                <p className="pane-product-description">{prod.flavorNotes}</p>

                {/* Taste & Crunch Meter */}
                <div className="taste-meter-row">
                  {prod.tasteProfile.map((tp, idx) => (
                    <div className="taste-meter-chip" key={idx}>
                      <span className="taste-chip-lbl">{tp.label}</span>
                      <strong className="taste-chip-val" style={{ color: prod.themeColor }}>{tp.value}</strong>
                    </div>
                  ))}
                </div>

                {/* Nutrients Grid */}
                <div className="pane-nutrients-grid">
                  {prod.nutrients.map((n, idx) => (
                    <div className="nutrient-card" key={idx}>
                      <span className="nutrient-val" style={{ color: prod.themeColor }}>{n.value}</span>
                      <span className="nutrient-lbl">{n.label}</span>
                      <span className="nutrient-desc">{n.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Best Ways to Enjoy */}
                <div className="pairings-row">
                  <span className="pairings-label">Pairs Great With:</span>
                  <div className="pairings-list">
                    {prod.pairings.map((p, idx) => (
                      <span className="pairing-tag" key={idx}>
                        <i>{p.icon}</i> {p.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature Checkpoints */}
                <ul className="pane-features-list">
                  {prod.highlights.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feat-check" style={{ color: prod.themeColor }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Size Selector & Pricing Box */}
                <div className="pane-purchase-box">
                  <div className="weight-and-price-row">
                    
                    <div className="weight-selector-group">
                      <span className="selector-label">Choose Jar Size:</span>
                      <div className="weight-pill-options">
                        <button
                          type="button"
                          className={`weight-option-btn ${currentWeight === '550gm' ? 'active' : ''}`}
                          style={currentWeight === '550gm' ? { background: prod.themeColor, borderColor: prod.themeColor } : {}}
                          onClick={() => handleWeightChange(prod.id, '550gm')}
                        >
                          550gm Jar (Daily Pack)
                        </button>
                        <button
                          type="button"
                          className={`weight-option-btn ${currentWeight === '1kg' ? 'active' : ''}`}
                          style={currentWeight === '1kg' ? { background: prod.themeColor, borderColor: prod.themeColor } : {}}
                          onClick={() => handleWeightChange(prod.id, '1kg')}
                        >
                          1kg Value Tub (Mega Pack)
                        </button>
                      </div>
                    </div>

                    <div className="price-display-group">
                      <div className="price-current-row">
                        <span className="currency-symbol">₹</span>
                        <span className="price-number">{currentPrice}</span>
                        <span className="price-original">₹{originalPrice}</span>
                      </div>
                      <span className="save-badge">SAVE {discount}% OFF</span>
                    </div>

                  </div>


                  {/* Quantity and Actions Bar */}
                  <div className="pane-action-bar">
                    <div className="qty-control">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => handleQtyChange(prod.id, -1)}
                        disabled={qty <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => handleQtyChange(prod.id, 1)}
                        disabled={qty >= 5}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="pane-btn-cart"
                      style={{ background: prod.themeColor }}
                      onClick={() => handleAddToCartClick(prod)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Add To Cart
                    </button>

                    <button
                      type="button"
                      className="pane-btn-quickview"
                      onClick={() => handleQuickViewClick(prod)}
                    >
                      Quick View
                    </button>

                    <button
                      type="button"
                      className={`pane-btn-wishlist ${isWishlisted ? 'active' : ''}`}
                      onClick={() => {
                        if (onToggleWishlist) {
                          onToggleWishlist({
                            id: prod.id,
                            name: prod.name,
                            weight: currentWeight,
                            price: currentPrice,
                            image: prod.image,
                            tag: prod.badge
                          });
                        }
                      }}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      {isWishlisted ? '❤️' : '🤍'}
                    </button>
                  </div>

                </div>

              </div>

            </div>
          );
        })()}

        {/* ══════════════════════════════════════════════════════════
            TRUST & PROMISE STRIP
            ══════════════════════════════════════════════════════════ */}
        <div className="showcase-trust-strip">
          <div className="trust-strip-item">
            <span className="trust-icon">🛡️</span>
            <div>
              <strong>100% Purity Guarantee</strong>
              <p>Pure slow-roasted peanuts, no cheap palm oil or trans fat</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <span className="trust-icon">🚚</span>
            <div>
              <strong>Fast & Safe Express Delivery</strong>
              <p>Shipped directly from our fresh churn facility in tamper-proof jars</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <span className="trust-icon">⭐</span>
            <div>
              <strong>50,000+ Happy Customers</strong>
              <p>India’s most loved crunchy and chocolate peanut butters</p>
            </div>
          </div>
        </div>

        {/* Bottom Banner to Explore All Catalogue */}
        <div className="showcase-bottom-cta">
          <div className="bottom-cta-card">
            <div className="bottom-cta-text">
              <h4>Want to explore our complete catalogue?</h4>
              <p>Discover 1kg jumbo tubs, organic natural spreads, and high-protein varieties in our full shop.</p>
            </div>
            <Link to="/products" className="bottom-cta-link-btn">
              Explore All Products →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedShowcase;
