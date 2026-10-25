import React, { useState, useEffect, useCallback, useRef } from 'react';
import './HeroCarousel.css';

// ─────────────────────────────────────────────
// ADD MORE SLIDES HERE as you send more images
// Just keep adding: { src: '/hero-slides/slide-XX.png', alt: '...' }
// ─────────────────────────────────────────────
const slides = [
  { src: '/hero-slides/slide-01.png', alt: 'Protinut - Fuel Your Day, Power Your Way' },
  { src: '/hero-slides/slide-02.png', alt: 'Classy Crunch Goodness - Shop Now' },
  { src: '/hero-slides/slide-03.png', alt: 'Nutrition For A Stronger You' },
  { src: '/hero-slides/slide-04.png', alt: 'Chocolate Meets Nutrition - Choco Crunch' },
  { src: '/hero-slides/slide-05.png', alt: 'Make Your Breakfast Healthy & Tasty' },
  // ── BATCH 2 ──
  { src: '/hero-slides/slide-06.png', alt: 'Simple Ingredients. Big Nutrition.' },
  { src: '/hero-slides/slide-07.png', alt: 'Choco Crunch Peanut Butter - Try Now' },
  { src: '/hero-slides/slide-08.png', alt: 'Real Ingredients. Real Results.' },
  { src: '/hero-slides/slide-09.png', alt: 'Two Delicious Flavours. One Healthy Choice.' },
  { src: '/hero-slides/slide-10.png', alt: 'Classy Crunch - Classic Taste with a Healthy Twist' },
  // ── BATCH 3 ──
  { src: '/hero-slides/slide-11.png', alt: 'Nutrition For A Stronger You - Take It Anywhere' },
  { src: '/hero-slides/slide-12.png', alt: 'Rich Chocolate. Real Peanuts. Real Goodness.' },
  { src: '/hero-slides/slide-13.png', alt: 'Two Flavours. One Healthy Lifestyle.' },
  { src: '/hero-slides/slide-14.png', alt: 'Classic Taste. Crunchy Delight.' },
  { src: '/hero-slides/slide-15.png', alt: 'Your Adventure Snack - Anytime Anywhere' },
  // ── BATCH 4 ──
  { src: '/hero-slides/slide-16.png', alt: 'Make Your Breakfast Healthy & Tasty - Fresh Bowl' },
  // ── BATCH 5 ──
  { src: '/hero-slides/slide-17.png', alt: 'Simple Ingredients. Big Nutrition.' },
  { src: '/hero-slides/slide-18.png', alt: 'Classy Crunch - Classic Taste With a Real Crunch!' },
  { src: '/hero-slides/slide-19.png', alt: 'Make Your Breakfast Healthy & Tasty - Pink Berry Bowl' },
  { src: '/hero-slides/slide-20.png', alt: 'Nutrition For A Stronger You - Discover More' },
  { src: '/hero-slides/slide-21.png', alt: 'Choco Crunch - The Perfect Blend of Peanuts & Chocolate' },
  // ── BATCH 6 ──
  { src: '/hero-slides/slide-22.png', alt: 'The Perfect Blend of Peanuts & Chocolate' },
  { src: '/hero-slides/slide-23.png', alt: 'Classic Taste, Real Nutrition - Taste the Goodness' },
  { src: '/hero-slides/slide-24.png', alt: 'Make Your Breakfast Healthy & Tasty - Explore Recipes' },
  { src: '/hero-slides/slide-25.png', alt: 'Nutrition For A Stronger You - Choose Protinut' },
  { src: '/hero-slides/slide-26.png', alt: '100% Natural Nutrition - Pure Peanuts. No Preservatives.' },
  // ── BATCH 7 ──
  { src: '/hero-slides/slide-27.png', alt: 'Fuel Your Day, Power Your Way - Classy Crunch 550g' },
  { src: '/hero-slides/slide-28.png', alt: 'Fuel Your Day, Power Your Way - Shop Now Both Jars' },
  { src: '/hero-slides/slide-29.jpg', alt: 'Fuel Your Fitness - Choco Crunch Gym Edition' },
  { src: '/hero-slides/slide-30.png', alt: 'Real Peanuts. Real Nutrition. - Explore Products' },
  { src: '/hero-slides/slide-31.png', alt: 'Fuel Your Day, Power Your Way - 20g+ Protein per serving' },
  // ── FINAL SLIDE ──
  { src: '/hero-slides/slide-32.jpg', alt: 'Two Irresistible Crunches - Same Natural Goodness' },
];

const AUTO_PLAY_INTERVAL = 3500; // ms (Flipkart uses ~3.5s)

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const total = slides.length;

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((index + total) % total);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, total]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(goNext, AUTO_PLAY_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [current, isPaused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // Touch swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="hero-carousel"
      aria-label="Protinut Hero Banner Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Slides Track ── */}
      <div className="carousel-track">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === current ? 'active' : i === (current - 1 + total) % total ? 'prev' : ''}`}
            aria-hidden={i !== current}
          >
            {/* Ambient blurred backdrop so every image fits seamlessly */}
            <div
              className="slide-backdrop"
              style={{ backgroundImage: `url(${slide.src})` }}
              aria-hidden="true"
            />
            {/* Sharp foreground banner */}
            <div className="slide-content-frame">
              <img
                src={slide.src}
                alt={slide.alt}
                className="slide-img"
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Slide Counter Badge (Flipkart/Myntra style) ── */}
      <div className="carousel-counter" aria-label={`Slide ${current + 1} of ${total}`}>
        <span>{current + 1}</span> / <span>{total}</span>
      </div>

      {/* ── Left Arrow ── */}
      <button
        className="carousel-arrow arrow-left"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* ── Right Arrow ── */}
      <button
        className="carousel-arrow arrow-right"
        onClick={goNext}
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Dot Indicators ── */}
      <div className="carousel-dots" role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* ── Progress Bar (like Flipkart) ── */}
      {!isPaused && (
        <div className="carousel-progress-bar" key={current}>
          <div className="progress-fill" style={{ animationDuration: `${AUTO_PLAY_INTERVAL}ms` }} />
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
