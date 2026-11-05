import React, { useEffect } from 'react';
import OurRange from '../OurRange';
import BrandTrustStrip from '../BrandTrustStrip';
import './Pages.css';

const ProductsPage = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
  wishlistItems = [],
  onToggleWishlist
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="products-page">
      
      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <span className="page-hero-badge">THE COMPLETE PROTINUT™ STORE</span>
        <h1 className="page-hero-title">
          India's Purest <span className="highlight-orange">Peanut Butters</span>
        </h1>
        <p className="page-hero-subtitle">
          Small-batch roasted in Dharashiv, Maharashtra. Handcrafted with zero palm oil, zero chemical emulsifiers, 
          and packed with up to 32g natural plant protein.
        </p>

        <div className="hero-stats-mini-strip">
          <div className="mini-stat-item">
            <strong>100%</strong>
            <span>Pure Roasted Peanuts</span>
          </div>
          <div className="mini-stat-item">
            <strong>0%</strong>
            <span>Palm Oil & Trans Fat</span>
          </div>
          <div className="mini-stat-item">
            <strong>32g</strong>
            <span>Max Plant Protein</span>
          </div>
          <div className="mini-stat-item">
            <strong>⚡ FREE</strong>
            <span>Pan-India Delivery</span>
          </div>
        </div>
      </div>

      {/* Modern Product Catalog with Filters and Dual Weight Selectors */}
      <OurRange
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onQuickView={onQuickView}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />

      {/* Brand Trust Strip */}
      <BrandTrustStrip />

    </div>
  );
};

export default ProductsPage;
