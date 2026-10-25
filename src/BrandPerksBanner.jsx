import React from 'react';
import './BrandPerksBanner.css';

const perks = [
  {
    id: 1,
    title: '100% REAL PEANUTS',
    description: 'Made from handpicked premium quality peanuts.',
    icon: (
      // Peanut icon SVG
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 2 5 5 5 8c0 2 1 3.5 2 4.5C6 13.5 5 15 5 17c0 3 3 5 7 5s7-2 7-5c0-2-1-3.5-2-4.5 1-1 2-2.5 2-4.5 0-3-3-5-7-5z" />
        <path d="M9 7c1 1 2 1 3 0" />
        <path d="M9 16c1 1 2 1 3 0" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'HIGH IN PROTEIN',
    description: 'Helps in muscle building and keeps you energized.',
    icon: (
      // Flexed bicep / muscle icon SVG
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 15c-1.5-1.5-2-3.5-1-5 1-1.5 3-2 5-1l1 1c1-1.5 2.5-2 4-1.5 2 .7 2.5 2.5 2 4l-1 2c1 1 1.5 2.5 1 4-.6 1.8-2.5 2.5-4 2l-4-1" />
        <path d="M9 12c.5 1.5 2 2.5 3.5 2" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'NO ADDED PRESERVATIVES',
    description: 'Pure, natural and absolutely free from harmful chemicals.',
    icon: (
      // Leaf / pure botanical icon SVG
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7z" />
        <path d="M11 20V10" />
        <path d="M8 14l3-3" />
        <path d="M14 14l-3-3" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'HEALTHY CHOICE',
    description: 'Supports heart health and a balanced lifestyle.',
    icon: (
      // Heart with pulse/heartbeat line SVG
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <polyline points="7.5 11 9.5 11 11 8.5 13 13.5 14.5 11 16.5 11" />
      </svg>
    )
  },
  {
    id: 5,
    title: 'PLANT BASED',
    description: 'Good for you and good for the planet.',
    icon: (
      // Two sprouting plant leaves SVG
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M12 20v-8" />
        <path d="M12 12c-3-3-3-7 0-9 3 2 3 6 0 9z" />
        <path d="M12 15c-4-1-6-4-6-7 3 0 6 3 6 7z" />
      </svg>
    )
  }
];

const BrandPerksBanner = () => {
  return (
    <section className="brand-perks-banner" aria-label="Protinut Quality Guarantees">
      <div className="brand-perks-container">
        {perks.map((item, idx) => (
          <React.Fragment key={item.id}>
            <div className="brand-perk-item">
              <div className="perk-circle-badge" aria-hidden="true">
                {item.icon}
              </div>
              <div className="perk-text-content">
                <h4 className="perk-heading">{item.title}</h4>
                <p className="perk-desc">{item.description}</p>
              </div>
            </div>

            {/* Subtle vertical divider between items */}
            {idx < perks.length - 1 && (
              <div className="perk-vertical-divider" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default BrandPerksBanner;
