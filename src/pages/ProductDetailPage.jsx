import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductReviewSection from '../ProductReviewSection';
import './ProductDetailPage.css';

const productsDatabase = {
  'classy-crunch': {
    id: 'classy-crunch',
    name: 'Peanut Butter Classy Crunch',
    tagline: '100% Handpicked Slow-Roasted Peanuts With Hearty Crunch',
    category: 'Signature Roast',
    price550: 250,
    price1kg: 449,
    originalPrice550: 340,
    originalPrice1kg: 599,
    rating: 4.8,
    reviewsCount: 342,
    image: '/products/classy-crunch-original.jpg',
    studioImage: '/products/classy-crunch.png',
    badge: '★ BESTSELLER',
    themeColor: '#ef5323',
    description: 'Our flagship peanut butter made exclusively with high-grade, slow-roasted Indian peanuts from Maharashtra. Stone-ground in small batches to preserve natural oiliness and rich nutty fragrance, infused with extra-chunky roasted peanut bits.',
    nutrients: [
      { label: 'Plant Protein', val: '30g', desc: 'Per 100g' },
      { label: 'Palm Oil', val: '0%', desc: 'Pure Peanut Oil' },
      { label: 'Added Sugar', val: '0g', desc: 'Zero Sugar' },
      { label: 'Dietary Fiber', val: '7.8g', desc: 'High Fiber' }
    ],
    features: [
      '100% Pure Slow-Roasted Peanuts — zero fillers or hydrogenated fats',
      'Coarse stone-ground churn with crunchy peanut bits in every scoop',
      'Excellent source of energy & healthy fats (MUFA/PUFA) for heart health',
      'Tamper-proof induction sealed jar, delivered fresh from Dharashiv'
    ]
  },
  'choco-crunch': {
    id: 'choco-crunch',
    name: 'Peanut Butter Choco Crunch',
    tagline: 'Real Dark Cocoa Chunks & Slow-Roasted Peanut Crunch',
    category: 'Chocolate Craft',
    price550: 270,
    price1kg: 489,
    originalPrice550: 365,
    originalPrice1kg: 649,
    rating: 4.8,
    reviewsCount: 295,
    image: '/products/choco-crunch-original.jpg',
    studioImage: '/products/choco-crunch.png',
    badge: 'CHOCO SPECIAL',
    themeColor: '#9c1c4e',
    description: 'Decadent dark cocoa meets traditional slow-roasted peanut butter. Loaded with real cocoa nibs and crunchy peanut granules for a guilt-free dessert substitute packed with high natural plant protein.',
    nutrients: [
      { label: 'Plant Protein', val: '26g', desc: 'Per 100g' },
      { label: 'Real Cocoa', val: 'Pure', desc: 'Antioxidant Rich' },
      { label: 'Cholesterol', val: '0mg', desc: 'Zero' },
      { label: 'Preservatives', val: '0%', desc: '100% Clean' }
    ],
    features: [
      'Real dark chocolate chunks paired with slow-roasted crunch',
      'Naturally balanced sweetness without excess refined sugar',
      'Guilt-free spread for waffles, fruit bowls, oats, or direct spoons',
      '100% Vegetarian recipe made with food safety compliance'
    ]
  }
};

const ProductDetailPage = ({
  onAddToCart,
  onToggleWishlist,
  wishlistItems = []
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product or fallback to classy-crunch
  const product = productsDatabase[id] || productsDatabase['classy-crunch'];

  const [selectedWeight, setSelectedWeight] = useState('550gm');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveImage(product.image);
    setSelectedWeight('550gm');
    setQuantity(1);
  }, [product]);

  const currentPrice = selectedWeight === '1kg' ? product.price1kg : product.price550;
  const originalPrice = selectedWeight === '1kg' ? product.originalPrice1kg : product.originalPrice550;
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const isWishlisted = wishlistItems.some((w) => w.id === product.id);

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        selectedWeight: selectedWeight,
        finalPrice: currentPrice,
        quantity: quantity,
        image: product.image
      });
    }
  };

  const handleBuyNowClick = () => {
    // Pass directly to checkout as a direct purchase without altering persistent cart
    navigate('/checkout', {
      state: {
        buyNowItem: {
          id: product.id,
          name: product.name,
          selectedWeight: selectedWeight,
          originalPrice: originalPrice,
          finalPrice: currentPrice,
          quantity: quantity,
          image: product.image
        }
      }
    });
  };

  return (
    <div className="product-detail-page-wrapper">
      
      {/* ── Breadcrumb Bar ── */}
      <div className="detail-breadcrumb-strip">
        <div className="detail-container">
          <span className="breadcrumb-nav">
            <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
          </span>
        </div>
      </div>

      {/* ── Main Product Hero Showcase ── */}
      <div className="detail-container main-hero-grid">
        
        {/* Left Column: Image Staging & Gallery */}
        <div className="detail-gallery-column">
          <div className="detail-main-image-stage">
            <span className="detail-top-badge">{product.badge}</span>
            <img src={activeImage} alt={product.name} className="detail-hero-img" />
          </div>

          <div className="detail-thumbnails-row">
            <button
              type="button"
              className={`thumbnail-btn ${activeImage === product.image ? 'active' : ''}`}
              onClick={() => setActiveImage(product.image)}
            >
              <img src={product.image} alt="Tabletop view" />
              <span>Authentic Table</span>
            </button>
            <button
              type="button"
              className={`thumbnail-btn ${activeImage === product.studioImage ? 'active' : ''}`}
              onClick={() => setActiveImage(product.studioImage)}
            >
              <img src={product.studioImage} alt="Studio view" />
              <span>Studio View</span>
            </button>
          </div>
        </div>

        {/* Right Column: Product Specs & Purchase Box */}
        <div className="detail-info-column">
          <div className="detail-header-tags">
            <span className="detail-cat-pill">{product.category}</span>
            <span className="detail-veg-pill">🌱 100% Veg</span>
          </div>

          <h1 className="detail-product-name">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>

          {/* Quick Rating Stars with link to Review Section */}
          <div className="detail-rating-jump-row">
            <div className="stars-cluster">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-jump">★</span>
              ))}
            </div>
            <strong className="rating-score-text">{product.rating} / 5.0</strong>
            <a href="#reviews-section" className="jump-to-reviews-link">
              ({product.reviewsCount} customer reviews)
            </a>
          </div>

          {/* Pricing Box */}
          <div className="detail-pricing-box">
            <div className="price-row">
              <span className="current-price-big">₹{currentPrice}</span>
              <span className="original-price-strike">₹{originalPrice}</span>
              <span className="discount-pill-green">SAVE {discount}% OFF</span>
            </div>
            <span className="tax-inclusive-note">Inclusive of all taxes • Free Delivery across India</span>
          </div>

          {/* Weight Selection Buttons */}
          <div className="detail-weight-selector">
            <span className="selector-title">Select Jar Weight:</span>
            <div className="weight-buttons-group">
              <button
                type="button"
                className={`weight-btn ${selectedWeight === '550gm' ? 'active' : ''}`}
                onClick={() => setSelectedWeight('550gm')}
              >
                <strong>550gm Jar</strong>
                <small>₹250 (Daily Pack)</small>
              </button>
              <button
                type="button"
                className={`weight-btn ${selectedWeight === '1kg' ? 'active' : ''}`}
                onClick={() => setSelectedWeight('1kg')}
              >
                <strong>1kg Value Tub</strong>
                <small>₹449 (Mega Saver)</small>
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="detail-description-text">{product.description}</p>

          {/* Nutrients Grid */}
          <div className="detail-nutrients-grid">
            {product.nutrients.map((n, i) => (
              <div key={i} className="nutrient-mini-pill">
                <strong>{n.val}</strong>
                <span>{n.label}</span>
              </div>
            ))}
          </div>

          {/* Quantity and Action Buttons */}
          <div className="detail-actions-panel">
            <div className="detail-qty-control">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="qty-val">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                disabled={quantity >= 5}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="btn-detail-add-cart"
              onClick={handleAddToCartClick}
            >
              Add To Cart 🛍️
            </button>

            <button
              type="button"
              className="btn-detail-buy-now"
              onClick={handleBuyNowClick}
            >
              Buy Now ⚡
            </button>

            <button
              type="button"
              className={`btn-detail-wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={() => {
                if (onToggleWishlist) {
                  onToggleWishlist({
                    id: product.id,
                    name: product.name,
                    weight: selectedWeight,
                    price: currentPrice,
                    image: product.image,
                    tag: product.badge
                  });
                }
              }}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {isWishlisted ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Key Checklist */}
          <ul className="detail-checklist">
            {product.features.map((feat, idx) => (
              <li key={idx}>
                <span className="check-icon">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

        </div>



      </div>

      {/* ── Storage Instructions ── */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: '#fffbf5', border: '1.5px solid #ef532330', borderRadius: '14px', padding: '22px 26px', margin: '28px 0 10px' }}>
          <span style={{ fontSize: '2rem', lineHeight: '1' }}>📦</span>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2b1810', marginBottom: '8px', letterSpacing: '0.02em' }}>How to Store</h2>
            <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.7', margin: 0 }}>Store in a cool, dry, and dark place away from direct sunlight. Do not refrigerate if you prefer it spreadable, or refrigerate after opening to preserve freshness. Natural oil separation may occur; stir well before use.</p>
          </div>
        </div>

        {/* ── Manufacturer & Marketed By ── */}
        <div style={{ background: '#f9f9f9', border: '1.5px solid #e5e7eb', borderRadius: '14px', padding: '22px 26px', margin: '14px 0 28px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#2b1810', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manufacturer &amp; Marketed By</h2>
          <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.8', margin: '0 0 8px' }}>
            <strong>PROTINUT FOODS</strong><br />
            Laxmi Niwas, Vidya Nagar, Dharashiv (Gramin), Dharashiv Taluka, Dharashiv, Maharashtra - 413501
          </p>
          <p style={{ fontSize: '0.9rem', color: '#444', margin: '0 0 6px' }}>🌏 Country of Origin: <strong>Product of India</strong></p>
          <p style={{ fontSize: '0.9rem', color: '#444', margin: '0 0 6px' }}>📧 <a href="mailto:protinut.in@gmail.com" style={{ color: '#ef5323', textDecoration: 'underline' }}>protinut.in@gmail.com</a></p>
          <p style={{ fontSize: '0.9rem', color: '#444', margin: '0 0 6px' }}>📞 <a href="tel:+918308302301" style={{ color: '#ef5323', textDecoration: 'underline' }}>+91 830 830 2301</a></p>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: '8px 0 0', fontStyle: 'italic' }}>FSSAI No: 21526050000128</p>
        </div>
      </div>

      {/* ── COMPLETE REVIEW & RATING SYSTEM ── */}
      <ProductReviewSection
        productId={product.id}
        productName={product.name}
      />

    </div>
  );
};

export default ProductDetailPage;
