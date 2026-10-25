import React, { useEffect } from 'react';
import OurRange from '../OurRange';
import ClassicRange from '../ClassicRange';
import './Pages.css';

const ProductsPage = ({
  onAddToCart,
  onQuickView,
  wishlistItems = [],
  onToggleWishlist
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="products-page">
      <div className="page-hero-banner">
        <span className="page-hero-badge">OUR COMPLETE CATALOGUE</span>
        <h1 className="page-hero-title">
          India's Purest <span className="highlight-orange">Peanut Butters</span>
        </h1>
        <p className="page-hero-subtitle">
          From stone-ground Classy Crunch to rich Belgian-style Choco Crunch, explore all our artisanal, high-protein jars.
        </p>
      </div>

      <OurRange
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />
      <ClassicRange
        onQuickView={onQuickView}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />
    </div>
  );
};

export default ProductsPage;
