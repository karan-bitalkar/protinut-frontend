import React from 'react';
import './NutritionStrip.css';

const perks = [
  {
    icon: '🥜',
    title: '100% Slow-Roasted Peanuts',
    subtitle: 'Finest handpicked Indian peanuts'
  },
  {
    icon: '⚡',
    title: '26g - 30g High Protein',
    subtitle: 'Fuel for fitness & active lifestyle'
  },
  {
    icon: '🌿',
    title: 'Zero Palm Oil & Trans Fat',
    subtitle: 'Pure heart-healthy nutrition'
  },
  {
    icon: '🥄',
    title: 'Irresistible Smooth & Crunch',
    subtitle: 'Crafted to culinary perfection'
  }
];

const NutritionStrip = () => {
  return (
    <div className="nutrition-strip-wrapper" aria-label="Brand Highlights">
      <div className="nutrition-strip-container">
        {perks.map((item, idx) => (
          <div key={idx} className="nutrition-perk-card">
            <span className="perk-icon" aria-hidden="true">{item.icon}</span>
            <div className="perk-info">
              <strong className="perk-title">{item.title}</strong>
              <span className="perk-subtitle">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionStrip;
