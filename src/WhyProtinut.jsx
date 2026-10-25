import React from 'react';
import './WhyProtinut.css';

const comparisonData = [
  {
    feature: 'Main Ingredient',
    protinut: '100% Slow-Roasted Handpicked Peanuts',
    others: 'Low-grade peanuts mixed with fillers',
    protinutGood: true
  },
  {
    feature: 'Palm Oil & Hydrogenated Fats',
    protinut: 'ZERO Palm Oil, ZERO Hydrogenated Fats',
    others: 'Packed with cheap palm oil to prevent separation',
    protinutGood: true
  },
  {
    feature: 'Protein Content',
    protinut: 'High Protein (26g - 30g per 100g)',
    others: 'Low diluted protein (only 12g - 14g)',
    protinutGood: true
  },
  {
    feature: 'Added Sugar & Emulsifiers',
    protinut: '0g Added Sugar, No Chemical Stabilizers',
    others: 'Loaded with corn syrup and emulsifiers (E471)',
    protinutGood: true
  },
  {
    feature: 'Freshness & Texture',
    protinut: 'Stone-ground fresh in small batches',
    others: 'Mass-produced, sits in warehouses for months',
    protinutGood: true
  }
];

const WhyProtinut = () => {
  return (
    <section className="why-protinut-section" id="benefits" aria-label="Why Choose Protinut">
      <div className="why-protinut-container">
        
        {/* Section Heading */}
        <div className="why-header">
          <span className="why-badge">THE CLEAN NUTRITION DIFFERENCE</span>
          <h2 className="why-title">
            Why Fitness Pros & Families Choose <span className="highlight-orange">PROTINUT™</span>
          </h2>
          <p className="why-subtitle">
            See how our pure, authentic recipe stands head and shoulders above mass-market peanut butters.
          </p>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="comparison-table-wrap">
          <div className="comparison-table">
            
            {/* Table Header */}
            <div className="table-row table-header">
              <div className="col-feature">Nutrition Standards</div>
              <div className="col-protinut">
                <span className="brand-logo-tag">PROTINUT™</span>
                <span className="tag-pure">100% Clean Label</span>
              </div>
              <div className="col-others">Other Market Brands</div>
            </div>

            {/* Comparison Rows */}
            {comparisonData.map((row, idx) => (
              <div key={idx} className="table-row">
                <div className="col-feature">
                  <strong>{row.feature}</strong>
                </div>

                <div className="col-protinut">
                  <div className="status-item good">
                    <span className="check-badge">✓</span>
                    <span>{row.protinut}</span>
                  </div>
                </div>

                <div className="col-others">
                  <div className="status-item bad">
                    <span className="cross-badge">✕</span>
                    <span>{row.others}</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="guarantee-card">
          <div className="guarantee-icon">🛡️</div>
          <div className="guarantee-text">
            <strong>100% Satisfaction & Purity Guarantee</strong>
            <p>If you don’t fall in love with the taste and authentic crunch on your first bite, we’ll make it right.</p>
          </div>
          <a href="#products" className="btn-guarantee-shop">
            TRY PROTINUT TODAY →
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyProtinut;
