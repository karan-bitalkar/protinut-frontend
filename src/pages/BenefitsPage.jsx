import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NutritionStrip from '../NutritionStrip';
import './Pages.css';

// ── 1. The 6 Pillars of Nutrition Science ──
const nutritionPillars = [
  {
    icon: '💪',
    title: '30g Bioavailable Plant Protein',
    tag: 'Muscle Growth & Repair',
    desc: 'Delivers up to 30g of pure, non-GMO plant protein per 100g (~9.6g per 2 tbsp serving). Rich in essential BCAAs and L-Arginine to accelerate post-workout muscle protein synthesis.'
  },
  {
    icon: '🫀',
    title: 'Heart-Healthy MUFA & PUFA Fats',
    tag: 'Cardiovascular Support',
    desc: 'Packed with Monounsaturated Fatty Acids (Oleic acid), identical to premium extra-virgin olive oil. Helps optimize your LDL/HDL cholesterol ratio and supports long-term arterial health.'
  },
  {
    icon: '⚡',
    title: 'Ultra-Low GI (Glycemic Index ~14)',
    tag: 'Zero Insulin Crashes',
    desc: 'With strictly zero added refined sugars and high dietary fiber, Protinut has an ultra-low Glycemic Index of ~14. Experience 4+ hours of steady, crash-free focus and sustained energy.'
  },
  {
    icon: '🚫',
    title: 'Strictly Zero Palm Oil & Trans Fats',
    tag: '100% Clean Label',
    desc: 'Commercial brands use 5-15% cheap hydrogenated palm oils to prevent oil separation. We refuse to compromise: Protinut contains zero hydrogenated fats, zero emulsifiers, and zero chemical stabilizers.'
  },
  {
    icon: '🧠',
    title: 'Cognitive Micronutrient Complex',
    tag: 'Brain & Nervous System',
    desc: 'Naturally abundant in Vitamin E (potent cellular antioxidant), Vitamin B6, Niacin (B3), Magnesium, and Zinc to reduce systemic oxidative stress and support sharp mental acuity.'
  },
  {
    icon: '🌱',
    title: '100% Vegan & Gut-Friendly',
    tag: 'Naturally Clean',
    desc: 'Crafted exclusively from 100% premium roasted peanuts sourced directly from Maharashtra farmers. Completely dairy-free, gluten-free, cholesterol-free, and gentle on sensitive digestion.'
  }
];

// ── 2. Comparison Table Data ──
const comparisonData = [
  {
    feature: 'Peanut Sourcing',
    protinut: '100% Handpicked Maharashtra Peanuts (Direct Farmer Fair Trade)',
    commercial: 'Bulk commercial grade commodity peanuts with high moisture variance'
  },
  {
    feature: 'Palm Oil & Hydrogenated Fats',
    protinut: 'STRICTLY 0% — Zero added oils or trans fats',
    commercial: '5% to 15% Hydrogenated Palm / Cottonseed oil added for shelf stiffness'
  },
  {
    feature: 'Refined Added Sugars',
    protinut: '0g Refined Sugar (Natural peanut sweetness only)',
    commercial: '8g to 18g Added white sugar or High Fructose Corn Syrup'
  },
  {
    feature: 'Protein per 100g',
    protinut: 'Up to 30g pure bioavailable plant protein',
    commercial: 'Diluted to 18g – 22g due to cheap vegetable fillers'
  },
  {
    feature: 'Oil Separation on Top',
    protinut: 'NATURAL (Golden badge of 100% pure peanuts; simply stir and enjoy)',
    commercial: 'Artificially prevented with chemical emulsifiers (E471, E472)'
  },
  {
    feature: 'Roasting & Grinding',
    protinut: 'Slow, flame-controlled roasting + artisanal stone-ground churn',
    commercial: 'Mass industrial rapid-flash roasting at high temperatures'
  },
  {
    feature: 'Chemical Preservatives',
    protinut: 'ZERO preservatives, induction sealed for farm-fresh longevity',
    commercial: 'Chemical stabilizers added for prolonged warehouse shelf life'
  }
];

// ── 3. Audience Personas ──
const audienceUseCases = [
  {
    icon: '🏋️‍♂️',
    title: 'Athletes & Bodybuilders',
    highlight: 'Clean Macro Engine',
    desc: 'Hit your daily protein goals cleanly without gut bloat. 2 tablespoons provide ~10g of bioavailable protein with high Leucine content to trigger muscle protein synthesis pre- or post-workout.'
  },
  {
    icon: '🏃‍♀️',
    title: 'Weight Management & Fasting',
    highlight: '4-Hour Satiety',
    desc: 'The synergy of high dietary fiber and healthy fats triggers CCK and peptide YY hormones in your digestive system, suppressing hunger pangs and completely stopping 4 PM junk cravings.'
  },
  {
    icon: '🧒',
    title: 'Growing Children & Students',
    highlight: 'Wholesome Brain Food',
    desc: 'Kids love the natural nutty crunch! Rich in choline, niacin, and magnesium to nourish developing cognitive functions without the hyper sugar crashes triggered by chocolate spreads.'
  },
  {
    icon: '🫀',
    title: 'Diabetic & Heart-Conscious',
    highlight: 'Low GI & Oleic Fats',
    desc: 'With a Glycemic Index of just 14 and naturally zero added sugars, Protinut allows individuals managing blood sugar levels to indulge guilt-free while nourishing arterial health.'
  }
];

// ── 4. Frequently Asked Questions ──
const benefitsFaqs = [
  {
    q: 'Why is there a layer of natural oil floating on top of my jar?',
    a: 'Natural oil separation is the ultimate proof of 100% purity! Pure peanuts naturally release healthy monounsaturated oils when ground. Commercial brands add chemical emulsifiers (like hydrogenated palm oil) to artificially lock the oil. At Protinut, we refuse to poison our peanut butter with palm oil. Simply stir the golden oil back in with a spoon, or store the jar upside down for 24 hours!'
  },
  {
    q: 'How much Protinut should I consume daily?',
    a: 'For most active adults, fitness enthusiasts, and athletes, 2 tablespoons (approx. 32g) daily is the sweet spot. This provides approximately 9.6g of pure plant protein, 15g of healthy unsaturated fats, and around 190 clean calories to power your daily energy.'
  },
  {
    q: 'Is Protinut suitable for Keto, Vegan, or Gluten-Free diets?',
    a: 'Yes, 100%! Protinut contains zero animal products (100% vegan), zero wheat/gluten ingredients, and is naturally low in net carbohydrates (only ~3g net carbs per serving), making it ideal for ketogenic and low-carb lifestyles.'
  },
  {
    q: 'How should I store my jar after opening?',
    a: 'Store your jar in a cool, dry place away from direct sunlight. Refrigeration is optional: keeping it in the fridge will thicken the consistency and slow down natural oil separation, while keeping it at room temperature maintains a smooth, easily spreadable texture.'
  },
  {
    q: 'How does Protinut ensure zero aflatoxins and pesticide residues?',
    a: 'Every single batch of our handpicked peanuts undergoes rigorous multi-stage laboratory screening. We test strictly for zero aflatoxins, zero heavy metals, and zero pesticide residues in compliance with FSSAI standards before stone-grinding.'
  }
];

const BenefitsPage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="benefits-page">
      
      {/* ── Page Hero Banner ── */}
      <div className="page-hero-banner">
        <span className="page-hero-badge">NUTRITION SCIENCE & PURITY</span>
        <h1 className="page-hero-title">
          Clean Fuel For A <span className="highlight-orange">Stronger You</span>
        </h1>
        <p className="page-hero-subtitle">
          Discover the science of 100% pure stone-ground peanuts. Up to 30g protein, zero palm oil, 
          and zero refined sugar — engineered for athletes and health-conscious families across India.
        </p>

        {/* Hero Quick Stat Badges */}
        <div className="hero-stats-mini-strip">
          <div className="mini-stat-item">
            <strong>30g</strong>
            <span>Plant Protein / 100g</span>
          </div>
          <div className="mini-stat-item">
            <strong>0%</strong>
            <span>Palm Oil & Trans Fat</span>
          </div>
          <div className="mini-stat-item">
            <strong>GI ~14</strong>
            <span>Ultra-Low Glycemic</span>
          </div>
          <div className="mini-stat-item">
            <strong>100%</strong>
            <span>Handpicked Maharashtra Peanuts</span>
          </div>
        </div>
      </div>

      {/* ── Nutrition Strip ── */}
      <NutritionStrip />

      {/* ── 6 Core Science Pillars ── */}
      <section className="benefits-cards-section">
        <div className="benefits-cards-container">
          <div className="section-pill-tag">BIOLOGICAL INTEGRITY</div>
          <h2 className="section-heading-centered">The 6 Pillars of Protinut Nutrition Science</h2>
          <p className="section-subtext-centered">
            Every tablespoon delivers bioavailable nutrition exactly as nature intended — without industrial shortcuts.
          </p>

          <div className="benefit-grid">
            {nutritionPillars.map((p, idx) => (
              <div key={idx} className="benefit-box">
                <div className="benefit-box-header">
                  <span className="benefit-emoji">{p.icon}</span>
                  <span className="benefit-tag-badge">{p.tag}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Side-by-Side Comparison Table ── */}
      <section className="comparison-table-section">
        <div className="comparison-table-container">
          <div className="section-pill-tag">TRANSPARENT COMPARISON</div>
          <h2 className="section-heading-centered">
            PROTINUT™ vs. <span className="highlight-orange">Commercial Brands</span>
          </h2>
          <p className="section-subtext-centered">
            Why supermarket peanut butters are cheap, and why clean nutrition is an investment in your longevity.
          </p>

          <div className="table-responsive-wrapper">
            <table className="comparison-custom-table">
              <thead>
                <tr>
                  <th>Quality Parameter</th>
                  <th className="highlight-column">PROTINUT™ Standards</th>
                  <th>Commercial Supermarket Brands</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="param-title">
                      <strong>{row.feature}</strong>
                    </td>
                    <td className="protinut-col">
                      <span className="check-icon">✓</span> {row.protinut}
                    </td>
                    <td className="commercial-col">
                      <span className="cross-icon">✕</span> {row.commercial}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Who Is Protinut Built For? (Audience Personas) ── */}
      <section className="personas-section">
        <div className="personas-container">
          <div className="section-pill-tag">TARGETED NUTRITION</div>
          <h2 className="section-heading-centered">
            Engineered For Every <span className="highlight-orange">Fitness Lifestyle</span>
          </h2>
          <p className="section-subtext-centered">
            Whether you are breaking deadlift PRs or looking for guilt-free family breakfasts, Protinut fits your macro plan.
          </p>

          <div className="personas-grid">
            {audienceUseCases.map((use, idx) => (
              <div key={idx} className="persona-card">
                <span className="persona-icon">{use.icon}</span>
                <span className="persona-pill">{use.highlight}</span>
                <h3>{use.title}</h3>
                <p>{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive FAQ Section ── */}
      <section className="benefits-faq-section">
        <div className="benefits-faq-container">
          <div className="section-pill-tag">CLARITY & SCIENCE</div>
          <h2 className="section-heading-centered">Frequently Asked Nutrition Questions</h2>
          <p className="section-subtext-centered">
            Have questions about ingredients, oil separation, or daily macros? Here are the facts.
          </p>

          <div className="faq-accordion-list">
            {benefitsFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item-card ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question-row">
                    <h3>{faq.q}</h3>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <div className="faq-answer-row">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Call To Action ── */}
      <section className="benefits-cta-banner">
        <div className="benefits-cta-content">
          <h2>Ready To Fuel Your Body With Pure Nutrition?</h2>
          <p>Switch to 100% stone-ground peanut butter with zero palm oil. Taste the difference today.</p>
          <div className="cta-action-buttons">
            <Link to="/products" className="btn-primary-orange">
              Shop The Range →
            </Link>
            <Link to="/recipes" className="btn-secondary-white">
              Explore Recipes ★
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BenefitsPage;
