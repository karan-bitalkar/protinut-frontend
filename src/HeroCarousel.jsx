import React, { useState, useEffect, useCallback, useRef } from 'react';
import './HeroCarousel.css';

// ─────────────────────────────────────────────
// ADD MORE SLIDES HERE as you send more images
// Just keep adding: { src: '/hero-slides/slide-XX.png', alt: '...' }
// ─────────────────────────────────────────────
const slides = [
  { src: '/hero-slides/slide-16.png', alt: 'Make Your Breakfast Healthy & Tasty - Fresh Bowl' },
  { src: '/hero-slides/slide-28.png', alt: 'Fuel Your Day, Power Your Way - Shop Now Both Jars' },
  { src: '/hero-slides/slide-30.png', alt: 'Real Peanuts. Real Nutrition. - Explore Products' },
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
