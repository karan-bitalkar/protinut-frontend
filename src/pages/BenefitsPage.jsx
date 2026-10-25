import React, { useEffect } from 'react';
import NutritionStrip from '../NutritionStrip';
import WhyProtinut from '../WhyProtinut';
import './Pages.css';

const BenefitsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="benefits-page">
      <div className="page-hero-banner">
        <span className="page-hero-badge">NUTRITION SCIENCE</span>
        <h1 className="page-hero-title">
          Clean Fuel For A <span className="highlight-orange">Stronger You</span>
        </h1>
        <p className="page-hero-subtitle">
          Discover why 10,000+ athletes and conscious families choose PROTINUT™ over commercial supermarket brands.
        </p>
      </div>

      <NutritionStrip />
      <WhyProtinut />

      {/* Extra Clean Label Perks */}
      <section className="benefits-cards-section">
        <div className="benefits-cards-container">
          <h2 className="section-heading-centered">The 4 Pillars of Protinut Quality</h2>
          <div className="benefit-grid">
            <div className="benefit-box">
              <span className="benefit-emoji">🫀</span>
              <h3>Heart-Healthy Monounsaturated Fats</h3>
              <p>Naturally rich in Oleic acid and healthy fats that support cardiovascular health and sustained energy release throughout your workout.</p>
            </div>
            <div className="benefit-box">
              <span className="benefit-emoji">⚡</span>
              <h3>Zero Sugar Crash</h3>
              <p>With 0g added refined sugars and a very low Glycemic Index, Protinut delivers clean, stable energy without the insulin spikes.</p>
            </div>
            <div className="benefit-box">
              <span className="benefit-emoji">🌿</span>
              <h3>100% Plant-Based Protein</h3>
              <p>Provides 26g to 30g of pure bioavailable protein per 100g — the ideal muscle recovery building block for vegetarians and vegans.</p>
            </div>
            <div className="benefit-box">
              <span className="benefit-emoji">🚫</span>
              <h3>Strictly Zero Palm Oil</h3>
              <p>We never use cheap hydrogenated palm oils to artificially homogenize our butter. Just stir the natural peanut oil on top and enjoy!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BenefitsPage;
