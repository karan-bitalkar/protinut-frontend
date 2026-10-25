import React, { useEffect, useRef, useState } from 'react';
import './BrandTrustStrip.css';

// Animated counter hook
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const stats = [
  { id: 'customers', value: 10000, suffix: '+', label: 'Happy Customers', icon: '😊' },
  { id: 'rating',    value: 48,    suffix: '★', label: 'Average Rating',   icon: '⭐', isDecimal: true },
  { id: 'orders',    value: 25000, suffix: '+', label: 'Orders Delivered',  icon: '📦' },
  { id: 'protein',   value: 28,    suffix: 'g', label: 'Protein per 100g', icon: '💪' },
];

const qualityBadges = [
  { icon: '🥜', text: '100% Real Peanuts' },
  { icon: '🚫', text: 'No Added Sugar' },
  { icon: '🌿', text: 'No Preservatives' },
  { icon: '🧪', text: 'Lab Tested Quality' },
  { icon: '🇮🇳', text: 'Made in India' },
];

const BrandTrustStrip = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const c0 = useCounter(10000, 1800, visible);
  const c1 = useCounter(48, 1400, visible);
  const c2 = useCounter(25000, 2000, visible);
  const c3 = useCounter(28, 1200, visible);
  const counterValues = [c0, c1, c2, c3];

  return (
    <div className="brand-trust-strip-wrapper" ref={sectionRef}>

      {/* STATS BAR */}
      <div className="trust-stats-bar">
        <div className="trust-stats-inner">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className={`trust-stat-item ${visible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span className="stat-icon" aria-hidden="true">{stat.icon}</span>
              <div className="stat-numbers">
                <span className="stat-value">
                  {stat.isDecimal
                    ? `${(counterValues[i] / 10).toFixed(1)}${stat.suffix}`
                    : `${counterValues[i].toLocaleString()}${stat.suffix}`}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
              {i < stats.length - 1 && <span className="stat-divider" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>

      {/* PROMO OFFER BANNER */}
      <div className="promo-offer-banner">
        <div className="promo-inner">

          <div className="promo-offer-content">
            <span className="promo-flame">🔥</span>
            <div className="promo-text-block">
              <p className="promo-headline">Limited Time Offer!</p>
              <p className="promo-subline">
                Buy any <strong>2 jars</strong> and get <strong>10% OFF</strong> — use code{' '}
                <span className="promo-code">PROTINUT10</span>
              </p>
            </div>
          </div>

          <div className="promo-badges-row" aria-label="Quality badges">
            {qualityBadges.map((b, i) => (
              <span key={i} className="promo-quality-badge">
                <span className="badge-icon" aria-hidden="true">{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>

          <a href="#products" className="promo-shop-btn">
            <span>Shop Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

        </div>
      </div>

    </div>
  );
};

export default BrandTrustStrip;
