import React, { useState } from 'react';
import './OurRange.css';

const allProductsData = [
  // ── 1. The 2 Main Signature Products (In Stock & Available) ──
  {
    id: 'classy-crunch',
    name: 'Peanut Butter Classy Crunch',
    category: 'crunchy',
    isCombo: false,
    inStock: true,
    isAvailable: true,
    price550: 250,
    price1kg: 449,
    originalPrice550: 340,
    originalPrice1kg: 599,
    defaultWeight: '550gm',
    weightOptions: [
      { id: '550gm', label: '550gm', price: 250, original: 340 },
      { id: '1kg', label: '1kg (Mega Value)', price: 449, original: 599 }
    ],
    rating: 4.9,
    reviewsCount: 340,
    proteinNumber: 30,
    image: '/products/classy-crunch.png',
    studioImage: '/products/classy-crunch-studio.jpg',
    tag: '★ Bestseller • In Stock',
    themeColor: '#ef5323',
    protein: '30g Protein',
    highlightBadge: 'Signature Roast',
    description: '100% slow-roasted Maharashtra peanuts with our signature hearty crunch. Zero palm oil, zero trans fat, high plant protein.'
  },
  {
    id: 'choco-crunch',
    name: 'Peanut Butter Choco Crunch',
    category: 'sweet',
    isCombo: false,
    inStock: true,
    isAvailable: true,
    price550: 270,
    price1kg: 489,
    originalPrice550: 365,
    originalPrice1kg: 649,
    defaultWeight: '550gm',
    weightOptions: [
      { id: '550gm', label: '550gm', price: 270, original: 365 },
      { id: '1kg', label: '1kg (Mega Value)', price: 489, original: 649 }
    ],
    rating: 4.8,
    reviewsCount: 295,
    proteinNumber: 26,
    image: '/products/choco-crunch.png',
    studioImage: '/products/choco-crunch-studio.jpg',
    tag: '🍫 Dark Cocoa • In Stock',
    themeColor: '#9c1c4e',
    protein: '26g Protein',
    highlightBadge: 'Antioxidant Rich',
    description: 'Real dark cocoa chunks blended into slow-roasted peanut butter with roasted crunchy peanut bites. Deliciously wholesome treat.'
  },
  {
    id: 'combo-power-duo',
    name: 'The Power Duo: Classy + Choco Crunch',
    category: 'combos',
    isCombo: true,
    inStock: true,
    isAvailable: true,
    price550: 479,
    price1kg: 869,
    originalPrice550: 705,
    originalPrice1kg: 1248,
    defaultWeight: '550gm x 2',
    weightOptions: [
      { id: '550gm x 2', label: 'Twin Pack (550g x 2)', price: 479, original: 705 },
      { id: '1kg x 2', label: 'Mega Duo (1kg x 2)', price: 869, original: 1248 }
    ],
    rating: 5.0,
    reviewsCount: 148,
    proteinNumber: 30,
    image: '/products/classy-crunch.png',
    studioImage: '/products/choco-crunch.png',
    tag: '🔥 Twin Pack Combo • In Stock',
    themeColor: '#ef5323',
    protein: '30g & 26g Protein',
    highlightBadge: 'Save ₹226 Today',
    description: 'Get both our main jars together! 1x Classy Crunch + 1x Choco Crunch. The ultimate combo for hearty morning toast and sweet cravings.'
  },

  // ── 2. Other Products (Currently Unavailable / Upcoming Batches) ──
  {
    id: 'creamy-1kg',
    name: 'Ultra-Creamy Peanut Butter',
    category: 'creamy',
    isCombo: false,
    inStock: false,
    isAvailable: false,
    price550: 220,
    price1kg: 399,
    originalPrice550: 299,
    originalPrice1kg: 499,
    defaultWeight: '1kg',
    weightOptions: [
      { id: '550gm', label: '550gm', price: 220, original: 299 },
      { id: '1kg', label: '1kg', price: 399, original: 499 }
    ],
    rating: 4.8,
    reviewsCount: 410,
    proteinNumber: 28,
    image: '/products/creamy-1kg.png',
    studioImage: '/products/creamy-1kg.png',
    tag: '🔴 Currently Unavailable',
    themeColor: '#f97316',
    protein: '28g Protein',
    highlightBadge: 'Batch in Roastery',
    description: 'Stone-ground to a velvety, spoon-licking consistency. Spreads like butter over warm sourdough toast and oats.'
  },
  {
    id: 'high-protein-1kg',
    name: 'High-Protein Fitness Edition',
    category: 'fitness',
    isCombo: false,
    inStock: false,
    isAvailable: false,
    price550: 280,
    price1kg: 499,
    originalPrice550: 380,
    originalPrice1kg: 650,
    defaultWeight: '1kg',
    weightOptions: [
      { id: '550gm', label: '550gm', price: 280, original: 380 },
      { id: '1kg', label: '1kg', price: 499, original: 650 }
    ],
    rating: 4.9,
    reviewsCount: 380,
    proteinNumber: 32,
    image: '/products/high-protein-1kg.png',
    studioImage: '/products/high-protein-1kg.png',
    tag: '🔴 Currently Unavailable',
    themeColor: '#1e3a8a',
    protein: '32g Protein',
    highlightBadge: 'Next Batch Coming',
    description: 'Specially crafted for heavy lifters and endurance athletes. Enhanced macro density with strictly 0g added sugar.'
  },
  {
    id: 'honey-crunch',
    name: 'Wild Honey Roasted Peanut Butter',
    category: 'sweet',
    isCombo: false,
    inStock: false,
    isAvailable: false,
    price550: 260,
    price1kg: 469,
    originalPrice550: 350,
    originalPrice1kg: 599,
    defaultWeight: '550gm',
    weightOptions: [
      { id: '550gm', label: '550gm', price: 260, original: 350 },
      { id: '1kg', label: '1kg', price: 469, original: 599 }
    ],
    rating: 4.7,
    reviewsCount: 215,
    proteinNumber: 26,
    image: '/products/range2/honey.png',
    studioImage: '/products/range2/honey.png',
    tag: '🔴 Currently Unavailable',
    themeColor: '#eab308',
    protein: '26g Protein',
    highlightBadge: 'Seasonal Harvest',
    description: 'Slow-roasted peanuts naturally infused with pure forest honey. Balanced sweetness without refined sugars.'
  },
  {
    id: 'natural-crunch',
    name: '100% All-Natural (1-Ingredient)',
    category: 'crunchy',
    isCombo: false,
    inStock: false,
    isAvailable: false,
    price550: 240,
    price1kg: 429,
    originalPrice550: 320,
    originalPrice1kg: 549,
    defaultWeight: '550gm',
    weightOptions: [
      { id: '550gm', label: '550gm', price: 240, original: 320 },
      { id: '1kg', label: '1kg', price: 429, original: 549 }
    ],
    rating: 4.9,
    reviewsCount: 190,
    proteinNumber: 30,
    image: '/products/range2/natural.png',
    studioImage: '/products/range2/natural.png',
    tag: '🔴 Currently Unavailable',
    themeColor: '#15803d',
    protein: '30g Protein',
    highlightBadge: 'Coming Soon',
    description: 'Strictly 1 single ingredient: 100% slow-roasted peanuts. No salt, no sugar, no oils. Pure uncompromised health.'
  },
  {
    id: 'combo-athlete-trio',
    name: 'Ultimate Athlete Trio: 3-Jar Powerhouse',
    category: 'combos',
    isCombo: true,
    inStock: false,
    isAvailable: false,
    price550: 729,
    price1kg: 1299,
    originalPrice550: 1085,
    originalPrice1kg: 1898,
    defaultWeight: '550gm x 3',
    weightOptions: [
      { id: '550gm x 3', label: 'Trio Pack (550g x 3)', price: 729, original: 1085 },
      { id: '1kg x 3', label: 'Monster Pack (1kg x 3)', price: 1299, original: 1898 }
    ],
    rating: 4.9,
    reviewsCount: 94,
    proteinNumber: 32,
    image: '/products/high-protein-1kg.png',
    studioImage: '/products/classy-crunch.png',
    tag: '🔴 Currently Unavailable',
    themeColor: '#1e3a8a',
    protein: 'Up to 32g Protein',
    highlightBadge: 'Awaiting Batch',
    description: 'Complete 3-jar gym macro pack: 1x High-Protein Fitness + 1x Classy Crunch + 1x Choco Crunch.'
  }
];

const categoryTabs = [
  { id: 'all', label: 'All Products (8)', icon: '🔥' },
  { id: 'in-stock', label: 'Available Now (Classy & Choco)', icon: '✅' },
  { id: 'combos', label: 'Twin Pack Duo', icon: '🎁' },
  { id: 'crunchy', label: 'Crunchy Jars', icon: '🥜' },
  { id: 'sweet', label: 'Choco Delight', icon: '🍫' }
];

const OurRange = ({
  onAddToCart,
  onQuickView,
  wishlistItems = [],
  onToggleWishlist
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedWeights, setSelectedWeights] = useState({
    'classy-crunch': '550gm',
    'choco-crunch': '550gm',
    'creamy-1kg': '1kg',
    'high-protein-1kg': '1kg',
    'honey-crunch': '550gm',
    'natural-crunch': '550gm',
    'combo-power-duo': '550gm x 2',
    'combo-athlete-trio': '550gm x 3'
  });
  const [addedIds, setAddedIds] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const toggleWeight = (productId, weightOptionId) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weightOptionId }));
  };

  const handleAddToCartClick = (product) => {
    if (!product.inStock) {
      if (onQuickView) {
        onQuickView({ ...product, isAvailable: false });
      } else {
        setToastMessage(`We will notify you when ${product.name} is available!`);
        setTimeout(() => setToastMessage(null), 2500);
      }
      return;
    }

    const activeWeightId = selectedWeights[product.id] || product.defaultWeight;
    const matchedOption = product.weightOptions.find((w) => w.id === activeWeightId) || product.weightOptions[0];
    const finalPrice = matchedOption.price;

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));

    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedWeight: matchedOption.label,
        finalPrice: finalPrice
      });
    }

    setToastMessage(`${product.name} (${matchedOption.label}) added to cart!`);

    setTimeout(() => setToastMessage(null), 2500);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  // Filter logic
  let displayedList = allProductsData;

  if (activeCategory === 'in-stock') {
    displayedList = displayedList.filter((p) => p.inStock);
  } else if (activeCategory !== 'all') {
    displayedList = displayedList.filter((p) => p.category === activeCategory);
  }

  // Search filter
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    displayedList = displayedList.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sortBy === 'price-asc') {
    displayedList = [...displayedList].sort((a, b) => a.price550 - b.price550);
  } else if (sortBy === 'price-desc') {
    displayedList = [...displayedList].sort((a, b) => b.price550 - a.price550);
  } else if (sortBy === 'rating') {
    displayedList = [...displayedList].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'protein') {
    displayedList = [...displayedList].sort((a, b) => b.proteinNumber - a.proteinNumber);
  }

  return (
    <section className="our-range-section" id="products" aria-label="Our Products">
      <div className="our-range-container">
        
        {/* ── Modern D2C Shipping & Trust Strip ── */}
        <div className="shop-trust-perks-bar">
          <div className="perk-item">
            <span className="perk-icon">🚚</span>
            <div className="perk-txt">
              <strong>Free Pan-India Delivery</strong>
              <span>On all orders above ₹499</span>
            </div>
          </div>
          <div className="perk-item">
            <span className="perk-icon">⚡</span>
            <div className="perk-txt">
              <strong>Dispatched in 24 Hours</strong>
              <span>Fresh stone-ground small batches</span>
            </div>
          </div>
          <div className="perk-item">
            <span className="perk-icon">🛡️</span>
            <div className="perk-txt">
              <strong>100% Zero Palm Oil</strong>
              <span>Strictly zero hydrogenated fats</span>
            </div>
          </div>
          <div className="perk-item">
            <span className="perk-icon">💵</span>
            <div className="perk-txt">
              <strong>Cash on Delivery & UPI</strong>
              <span>100% Safe & Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* ── Header & Category Filter Bar ── */}
        <div className="range-header-block">
          <span className="range-badge-pill">
            <span className="pulse-dot" /> 100% ARTISANAL & STONE-GROUND JARS
          </span>

          <h2 className="range-main-heading">
            Our Handcrafted <span className="highlight-orange">Peanut Butters</span>
          </h2>

          <p className="range-sub-text">
            Stone-ground from handpicked Maharashtra peanuts. Our two flagship signature jars — <strong>Classy Crunch</strong> and <strong>Choco Crunch</strong> — are freshly roasted and in stock for immediate pan-India dispatch.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="range-filter-tabs-row">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`range-filter-btn ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search & Sort Controls Toolbar */}
          <div className="shop-controls-toolbar">
            <div className="shop-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search jars, flavours, protein..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="shop-sort-box">
              <label htmlFor="shop-sort">Sort By:</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="protein">Highest Protein</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        {displayedList.length === 0 ? (
          <div className="no-products-found">
            <span>🥜</span>
            <h3>No peanut butter found matching "{searchTerm}"</h3>
            <p>Try clearing your search or switching categories.</p>
            <button
              type="button"
              className="btn-clear-filters"
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="range-products-grid">
            {displayedList.map((item) => {
              const isAdded = addedIds[item.id];
              const isAvailable = item.inStock;
              const activeWeightId = selectedWeights[item.id] || item.defaultWeight;
              const matchedWeight = item.weightOptions.find((w) => w.id === activeWeightId) || item.weightOptions[0];
              const displayPrice = matchedWeight.price;
              const originalPrice = matchedWeight.original;
              const discountPercent = Math.round(((originalPrice - displayPrice) / originalPrice) * 100);
              const isWishlisted = wishlistItems.some((w) => w.id === item.id);

              return (
                <div
                  key={item.id}
                  className={`range-product-card ${item.isCombo ? 'combo-highlight-card' : ''} ${!isAvailable ? 'card-unavailable' : ''}`}
                >
                  
                  {/* Card Top: Badges & Actions */}
                  <div className="card-top-header">
                    <span className={`card-pill-tag ${!isAvailable ? 'tag-unavailable' : ''}`}>
                      {item.tag}
                    </span>

                    <div className="card-action-icons">
                      {/* Wishlist Heart */}
                      <button
                        type="button"
                        className={`btn-icon-round ${isWishlisted ? 'active-wishlist' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleWishlist) {
                            onToggleWishlist({
                              id: item.id,
                              name: item.name,
                              weight: matchedWeight.label,
                              price: displayPrice,
                              originalPrice: originalPrice,
                              image: item.image,
                              rating: item.rating,
                              reviewsCount: item.reviewsCount,
                              tag: item.tag,
                              inStock: isAvailable
                            });
                          }
                        }}
                        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        aria-label="Wishlist"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={isWishlisted ? '#ef5323' : 'none'}
                          stroke={isWishlisted ? '#ef5323' : 'currentColor'}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>

                      {/* Quick View */}
                      {onQuickView && (
                        <button
                          type="button"
                          className="btn-icon-round"
                          onClick={() => onQuickView({
                            ...item,
                            price: displayPrice,
                            weight: matchedWeight.label,
                            isAvailable: isAvailable
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

                  {/* Product Image Stage */}
                  <div
                    className="card-image-stage"
                    onClick={() => onQuickView && onQuickView({
                      ...item,
                      price: displayPrice,
                      weight: matchedWeight.label,
                      isAvailable: isAvailable
                    })}
                    title="Click for nutrition details"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-jar-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = item.studioImage || '/products/classy-crunch.png';
                      }}
                    />
                    <span className="card-hover-hint">Quick View 👁️</span>
                  </div>

                  {/* Card Content & Details */}
                  <div className="card-info-content">
                    
                    {/* Rating Stars & Count */}
                    <div className="card-rating-strip">
                      <span className="rating-stars">★★★★★</span>
                      <strong className="rating-score">{item.rating}</strong>
                      <span className="rating-reviews">({item.reviewsCount} verified reviews)</span>
                    </div>

                    {/* Title */}
                    <h3 className="card-product-title">{item.name}</h3>
                    <p className="card-product-desc">{item.description}</p>

                    {/* Micro Nutrition Badges */}
                    <div className="card-micro-badges">
                      <span className="micro-badge protein">⚡ {item.protein}</span>
                      <span className="micro-badge pure">🚫 0% Palm Oil</span>
                      <span className="micro-badge clean">✓ {item.highlightBadge}</span>
                    </div>

                    {/* Interactive Weight / Variant Switcher */}
                    <div className="card-weight-selector">
                      {item.weightOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          className={`weight-pill-btn ${activeWeightId === opt.id ? 'active' : ''}`}
                          onClick={() => toggleWeight(item.id, opt.id)}
                        >
                          <span>{opt.label}</span>
                          <small>₹{opt.price}</small>
                        </button>
                      ))}
                    </div>

                    {/* Pricing Row */}
                    <div className="card-pricing-row">
                      <div className="pricing-left">
                        <span className="final-price">₹{displayPrice}</span>
                        <span className="mrp-strike">₹{originalPrice}</span>
                        <span className="discount-tag">{discountPercent}% OFF</span>
                      </div>
                      
                      {isAvailable ? (
                        <span className="stock-in-indicator available">● In Stock</span>
                      ) : (
                        <span className="stock-in-indicator unavailable">○ Currently Unavailable</span>
                      )}
                    </div>

                    {/* Add to Cart CTA OR Notify Me Button */}
                    {isAvailable ? (
                      <button
                        type="button"
                        className={`btn-add-to-cart ${isAdded ? 'success' : ''}`}
                        onClick={() => handleAddToCartClick(item)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        {isAdded ? (
                          <>
                            <svg className="cart-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <svg className="cart-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="9" cy="21" r="1.5" />
                              <circle cx="19" cy="21" r="1.5" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span>Add To Cart</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-notify-when-available"
                        onClick={() => handleAddToCartClick(item)}
                        aria-label={`Get notified when ${item.name} is available`}
                      >
                        <span className="bell-icon">🔔</span>
                        <span>Currently Unavailable (Notify Me)</span>
                      </button>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="range-toast-alert" role="status">
          <span className="toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};

export default OurRange;
