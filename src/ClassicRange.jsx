import React, { useRef, useState, useEffect } from 'react';
import './ClassicRange.css';

const baseClassicProducts = [
  {
    id: 'creamy',
    name: 'Creamy Peanut Butter',
    flavor: 'Creamy',
    category: 'classic',
    image: '/products/range2/creamy.png',
    status: 'Currently Not Available',
    accentColor: '#f97316',
    isAvailable: false
  },
  {
    id: 'crunchy',
    name: 'Crunchy Peanut Butter',
    flavor: 'Crunchy',
    category: 'classic',
    image: '/products/range2/crunchy.png',
    status: 'Currently Not Available',
    accentColor: '#d97706',
    isAvailable: false
  },
  {
    id: 'chocolate',
    name: 'Chocolate Peanut Butter',
    flavor: 'Chocolate',
    category: 'sweet',
    image: '/products/range2/chocolate.png',
    status: 'Currently Not Available',
    accentColor: '#5c3a21',
    isAvailable: false
  },
  {
    id: 'honey',
    name: 'Honey Peanut Butter',
    flavor: 'Honey',
    category: 'sweet',
    image: '/products/range2/honey.png',
    status: 'Currently Not Available',
    accentColor: '#eab308',
    isAvailable: false
  },
  {
    id: 'high-protein',
    name: 'High Protein Peanut Butter',
    flavor: 'High Protein',
    category: 'fitness',
    image: '/products/range2/high-protein.png',
    status: 'Currently Not Available',
    accentColor: '#1e3a8a',
    isAvailable: false
  },
  {
    id: 'natural',
    name: 'Natural Peanut Butter',
    flavor: 'Natural',
    category: 'natural',
    image: '/products/range2/natural.png',
    status: 'Currently Not Available',
    accentColor: '#15803d',
    isAvailable: false
  }
];

const filterTabs = [
  { id: 'all', label: 'All Varieties' },
  { id: 'classic', label: 'Classic' },
  { id: 'fitness', label: 'High Protein' },
  { id: 'natural', label: '100% Natural' },
  { id: 'sweet', label: 'Choco & Honey' }
];

const ClassicRange = ({
  onQuickView,
  wishlistItems = [],
  onToggleWishlist
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [notifiedId, setNotifiedId] = useState(null);
  const scrollRef = useRef(null);

  const filteredProducts = activeTab === 'all'
    ? baseClassicProducts
    : baseClassicProducts.filter((p) => p.category === activeTab);

  // For continuous seamless infinite loop, we duplicate the array 3 times
  const loopProducts = [...filteredProducts, ...filteredProducts, ...filteredProducts];

  // Manual scroll with buttons
  const handleManualScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 240;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleNotifyClick = (product, e) => {
    e.stopPropagation();
    setNotifiedId(product.id);
    setTimeout(() => setNotifiedId(null), 2500);
  };

  return (
    <section className="classic-range-section" id="varieties" aria-label="Classic Varieties">
      <div className="classic-range-container">
        
        {/* Left Side: Headline, Description & Filter Tabs */}
        <div className="classic-intro-col">
          <span className="classic-badge">OUR RANGE</span>
          <h2 className="classic-title">
            <span className="title-dark">Something for</span>
            <span className="title-orange">everyone!</span>
          </h2>
          <p className="classic-description">
            Delicious varieties. Premium quality.<br />
            Made for your healthy lifestyle.
          </p>

          {/* Category Filter Pills */}
          <div className="classic-filter-chips">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`filter-chip ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Auto-Scroll Status Indicator & CTA */}
          <div className="classic-action-row">
            <a href="#all-varieties" className="btn-view-all-classic">
              <span>VIEW ALL PRODUCTS</span>
              <svg
                className="arrow-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

            <button
              type="button"
              className={`btn-toggle-autoloop ${isPaused ? 'paused' : ''}`}
              onClick={() => setIsPaused((prev) => !prev)}
              title={isPaused ? 'Resume auto scroll' : 'Pause auto scroll'}
            >
              <span className="loop-indicator-dot" />
              <span>{isPaused ? '▶ Resume Loop' : '⏸ Auto Right-to-Left'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Continuous Infinite Loop Ticker Track */}
        <div
          className="classic-marquee-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            className="slider-nav-btn btn-prev"
            onClick={() => handleManualScroll('left')}
            aria-label="Previous products"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Scrolling Marquee Track Container */}
          <div className="marquee-viewport" ref={scrollRef}>
            <div className={`marquee-inner-track ${isPaused ? 'paused' : ''}`}>
              {loopProducts.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="classic-card"
                  onClick={() => onQuickView && onQuickView(item)}
                  style={{ cursor: onQuickView ? 'pointer' : 'default' }}
                >
                  {/* Top Bar: Unavailable Pill + Wishlist Heart */}
                  <div className="classic-card-top">
                    <div className="unavailable-pill" title="Out of stock">
                      <span className="pill-dot" />
                      <span>Currently Not Available</span>
                    </div>

                    <button
                      type="button"
                      className={`btn-classic-wishlist ${wishlistItems.some((w) => w.id === item.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleWishlist) {
                          onToggleWishlist({
                            id: item.id,
                            name: item.name,
                            weight: '550gm',
                            price: 210,
                            originalPrice: 299,
                            image: item.image,
                            rating: 4.8,
                            reviewsCount: 160,
                            tag: 'Artisanal',
                            inStock: false,
                            isOutOfStock: true
                          });
                        }
                      }}
                      title={wishlistItems.some((w) => w.id === item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label={wishlistItems.some((w) => w.id === item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <svg
                        width="14"
                        height="14"
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
                  </div>

                  {/* Jar Image */}
                  <div className="classic-image-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="classic-jar-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Name */}
                  <h3 className="classic-card-title">{item.name}</h3>

                  {/* Action: Currently Not Available Button */}
                  <div className="classic-card-action">
                    <button
                      type="button"
                      className={`btn-unavailable ${notifiedId === item.id ? 'notified' : ''}`}
                      onClick={(e) => handleNotifyClick(item, e)}
                      title="Click to get notified when back in stock"
                    >
                      {notifiedId === item.id ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>We will notify you!</span>
                        </>
                      ) : (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <span>Currently Not Available</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="slider-nav-btn btn-next"
            onClick={() => handleManualScroll('right')}
            aria-label="Next products"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ClassicRange;
