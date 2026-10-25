import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

// ── 1. Milestones Data ──
const milestones = [
  { year: '2021', label: 'Kitchen Roots in Dharashiv', desc: 'Frustrated by chemical peanut butters, our founder started stone-grinding handpicked peanuts in small batches.' },
  { year: '2022', label: 'FSSAI Certified & Pure', desc: 'Earned government food safety licensing with a strict zero-palm-oil standard.' },
  { year: '2023', label: '15,000+ Happy Jars', desc: 'Expanded across gyms, sports clubs, and health-conscious homes across India.' },
  { year: '2024', label: 'Signature Flavours', desc: 'Introduced Classy Crunch and Choco Crunch, setting new benchmarks for clean Indian nutrition.' },
];

// ── 2. How It's Made: 4-Step Process Journey ──
const processSteps = [
  {
    step: '01',
    icon: '🌱',
    title: '100% Handpicked Peanuts',
    tag: 'Sourced Locally',
    desc: 'We inspect and select only premium-grade, sun-dried peanuts directly from trusted Indian farmers in Maharashtra. Zero defective seeds, zero fillers.'
  },
  {
    step: '02',
    icon: '🔥',
    title: 'Slow Roasting',
    tag: 'Gentle Fire Roast',
    desc: 'Slow roasted on controlled flames to caramelize natural peanut oils, unlocking a rich nutty fragrance without burning delicate protein structures.'
  },
  {
    step: '03',
    icon: '⚙️',
    title: 'Stone-Ground in Small Batches',
    tag: 'Traditional Churn',
    desc: 'Ground in small artisanal batches to achieve our signature crunchy and creamy texture, preserving natural nutrients and honest mouthfeel.'
  },
  {
    step: '04',
    icon: '📦',
    title: 'Sealed for Freshness',
    tag: 'Tamper-Proof',
    desc: 'Directly jarred and hermetically induction-sealed to lock in freshness, crunch, and aroma without requiring a single chemical preservative.'
  }
];

// ── 3. The Protinut Promise: Trust Badges ──
const trustBadges = [
  {
    icon: '✅',
    title: 'FSSAI Certified',
    subtitle: 'National Safety Standard',
    desc: 'Fully licensed & verified by the Food Safety and Standards Authority of India for uncompromising food purity.'
  },
  {
    icon: '🔬',
    title: 'Lab Tested',
    subtitle: 'Rigorous Quality Checks',
    desc: 'Every single production batch undergoes strict laboratory screening for zero aflatoxins, contaminants, or heavy metals.'
  },
  {
    icon: '🌱',
    title: '100% Vegan & Pure',
    subtitle: 'Plant-Based Goodness',
    desc: 'Made exclusively from nature’s finest plant ingredients. 100% dairy-free, gluten-free, and guilt-free.'
  },
  {
    icon: '🚫',
    title: 'Zero Palm Oil',
    subtitle: 'No Hydrogenated Fats',
    desc: 'We never emulsify with cheap palm oil or chemical stabilizers. What you taste is 100% pure peanut goodness.'
  }
];

// ── 4. What We Stand For: Core Values ──
const coreValues = [
  {
    icon: '🔍',
    title: 'Radical Transparency',
    desc: 'We list exactly what’s inside every jar. Nothing hidden behind asterisk marks, zero cheap fillers, and no deceptive marketing claims.'
  },
  {
    icon: '💪',
    title: 'Nutrition First',
    desc: 'Delivering up to 30g of genuine plant protein per 100g. Clean macro-nutrition designed for athletes, families, and growing children.'
  },
  {
    icon: '🌾',
    title: 'Supporting Local',
    desc: 'Directly sourcing agricultural harvest from hardworking Indian farmers in Maharashtra, ensuring ethical fair trade and local empowerment.'
  },
  {
    icon: '♻️',
    title: 'Sustainable Packaging',
    desc: 'Committed to reducing single-use plastic waste through sturdy, 100% recyclable, food-safe jars and responsible packaging.'
  }
];

const AboutUs = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="about-experience-wrapper" ref={ref}>
      
      {/* ──────────────────────────────────────────────────────────────
          HERO BANNER: OUR STORY
          ────────────────────────────────────────────────────────────── */}
      <section className="about-hero-section">
        <div className="showcase-bg-orb orb-1" />
        <div className="showcase-bg-orb orb-2" />

        <div className="about-hero-content">
          <span className="about-pill-badge">
            🌱 OUR STORY & HERITAGE
          </span>
          <h1 className="about-hero-title">
            Born from a <span className="highlight-orange">real need</span>.<br />
            Built for <span className="highlight-orange">real people</span>.
          </h1>
          <p className="about-hero-subtitle">
            In 2021, frustrated by chemical-laden, palm-oil-packed peanut butters flooding store shelves, 
            we set out with a simple mission in Dharashiv, Maharashtra: 
            <strong> deliver India’s purest, high-protein peanut butter, untouched by junk.</strong>
          </p>

          {/* Key Brand Stats Strip */}
          <div className="about-stats-grid">
            <div className="stat-card">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">0%</span>
              <span className="stat-label">Palm Oil & Junk</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">30g</span>
              <span className="stat-label">Max Plant Protein</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">Verified Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          SECTION 1: MEET THE FOUNDER
          ────────────────────────────────────────────────────────────── */}
      <section className="about-section founder-section" id="founder">
        <div className="about-inner-container">
          
          <div className="section-header-block">
            <span className="section-pill-badge">
              THE VISIONARY BEHIND PROTINUT™
            </span>
            <h2 className="section-heading-title">
              Meet The <span className="highlight-orange">Founder</span>
            </h2>
            <p className="section-heading-sub">
              The personal journey that transformed a home kitchen in Dharashiv into India’s most honest peanut butter brand.
            </p>
          </div>

          <div className="founder-card-box">
            
            {/* Founder Photo / Portrait Box with Glowing Orange/Gold Border */}
            <div className="founder-photo-column">
              <div className="founder-photo-stage">
                <div className="founder-photo-halo" />
                
                <div className="founder-photo-frame">
                  {/* Founder Visual Icon */}
                  <div className="founder-avatar-circle">
                    <span className="founder-avatar-emoji">👨‍🍳</span>
                  </div>

                  <span className="founder-role-tag">
                    FOUNDER & HEAD CHURNER
                  </span>
                  <h3 className="founder-name-text">
                    The Man Behind The Jars
                  </h3>
                  <p className="founder-location-text">
                    Dharashiv, Maharashtra
                  </p>

                  <div className="founder-stamp-row">
                    <span>★ Handcrafted Since 2021</span>
                  </div>
                </div>

                {/* Floating Seal Badge */}
                <div className="founder-seal-badge">
                  <span className="seal-emoji">🌿</span>
                  <div className="seal-text-col">
                    <span className="seal-tag-top">100% PURE</span>
                    <span className="seal-tag-bottom">ORIGINAL RECIPE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Story & Passionate Bio */}
            <div className="founder-bio-column">
              
              {/* Founder Quote Card */}
              <div className="founder-quote-banner">
                <span className="quote-mark">“</span>
                <p className="quote-text">
                  Real food doesn't need a label to explain what's inside.
                </p>
                <span className="quote-author">
                  — PROTINUT™ FOUNDER PHILOSOPHY
                </span>
              </div>

              <div className="founder-bio-paragraphs">
                <p>
                  <strong>Meet the man behind the jars.</strong> Frustrated by chemical-laden peanut butters, 
                  our founder started grinding hand-picked peanuts in his own kitchen in Dharashiv, Maharashtra. 
                  Today, that same small-batch promise powers every jar of <strong>PROTINUT™</strong>.
                </p>
                <p>
                  "As someone who worked out daily, I was appalled to discover that even the so-called 'healthy' brands 
                  were mixing hydrogenated palm oil, emulsifiers, and cheap corn sugars into their peanut butter just to extend shelf life. 
                  I refused to put that into my body, and I refused to let Indian families eat it either."
                </p>
                <p>
                  "We set up our own stone grinding unit right here in Maharashtra. No shortcuts, no chemical stabilizers, 
                  no corporate compromises. If it's not good enough for my family, it never leaves our doors."
                </p>
              </div>

              <div className="founder-tags-row">
                <span className="founder-feature-chip">📍 Dharashiv, Maharashtra</span>
                <span className="founder-feature-chip">🔥 Stone-Ground Roastery</span>
                <span className="founder-feature-chip">🤝 Direct Farmer Sourcing</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          SECTION 2: OUR PROCESS (HOW IT'S MADE - 4-STEP TIMELINE)
          ────────────────────────────────────────────────────────────── */}
      <section className="about-section process-section" id="process">
        <div className="about-inner-container">
          
          <div className="section-header-block">
            <span className="section-pill-badge">
              ARTISANAL CHURN JOURNEY
            </span>
            <h2 className="section-heading-title">
              Our Process: <span className="highlight-orange">How It's Made</span>
            </h2>
            <p className="section-heading-sub">
              From fresh Maharashtrian soil to your breakfast table — every step is crafted with zero shortcuts.
            </p>
          </div>

          {/* 4-Step Visual Journey */}
          <div className="process-timeline-wrap">
            <div className="process-connecting-line" />

            <div className="process-cards-grid">
              {processSteps.map((step, idx) => (
                <div key={idx} className="process-step-card">
                  <div className="step-card-top">
                    <span className="step-number-badge">{step.step}</span>
                    <span className="step-tag-pill">{step.tag}</span>
                  </div>

                  <div className="step-icon-circle">
                    {step.icon}
                  </div>

                  <h3 className="step-title-text">{step.title}</h3>
                  <p className="step-desc-text">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          SECTION 3: THE PROTINUT PROMISE (TRUST BADGES & CERTIFICATIONS)
          ────────────────────────────────────────────────────────────── */}
      <section className="about-section promise-section" id="promise">
        <div className="about-inner-container">
          
          <div className="section-header-block">
            <span className="section-pill-badge green">
              UNCOMPROMISED PURITY STANDARDS
            </span>
            <h2 className="section-heading-title">
              The PROTINUT™ <span className="highlight-orange">Promise</span>
            </h2>
            <p className="section-heading-sub">
              We hold our products to the highest independent certifications and testing standards in the country.
            </p>
          </div>

          <div className="trust-badges-grid">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="trust-badge-card">
                <div className="trust-icon-box">{badge.icon}</div>
                <h3 className="trust-badge-title">{badge.title}</h3>
                <span className="trust-badge-subtitle">{badge.subtitle}</span>
                <p className="trust-badge-desc">{badge.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          SECTION 4: WHAT WE STAND FOR (CORE VALUES)
          ────────────────────────────────────────────────────────────── */}
      <section className="about-section values-section" id="values">
        <div className="about-inner-container">
          
          <div className="section-header-block">
            <span className="section-pill-badge">
              OUR GUIDING ETHOS
            </span>
            <h2 className="section-heading-title">
              What We <span className="highlight-orange">Stand For</span>
            </h2>
            <p className="section-heading-sub">
              Four non-negotiable principles that shape how we source, churn, and deliver our jars every day.
            </p>
          </div>

          <div className="core-values-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card-item">
                <div className="value-icon-box">{val.icon}</div>
                <div className="value-text-box">
                  <h3 className="value-title">{val.title}</h3>
                  <p className="value-desc">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          SECTION 5: HIGH-CONVERTING BOTTOM CTA
          ────────────────────────────────────────────────────────────── */}
      <section className="about-section about-cta-section">
        <div className="about-inner-container">
          
          <div className="cta-banner-wrapper">
            <div className="cta-ambient-glow top-left" />
            <div className="cta-ambient-glow bottom-right" />

            <div className="cta-inner-content">
              <span className="cta-pill-tag">
                CLEAN NUTRITION AWAITS
              </span>

              <h2 className="cta-main-heading">
                Ready to Taste the Difference?
              </h2>

              <p className="cta-sub-text">
                Join 15,000+ fitness enthusiasts and families who switched to real nutrition. 
                Zero palm oil, high natural protein, and unforgettable crunch.
              </p>

              <div className="cta-buttons-row">
                <Link to="/products" className="cta-btn-primary">
                  <span>Shop the Range</span>
                  <span>→</span>
                </Link>

                <a href="#testimonials" className="cta-btn-secondary">
                  <span>★ Read Reviews</span>
                </a>
              </div>

              <div className="cta-trust-bar">
                <span>🛡️ 100% Satisfaction Guarantee</span>
                <span>🚚 Free Delivery Pan-India</span>
                <span>⚡ Fresh Small Batches</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUs;
