import React, { useState } from 'react';
import './RecipeHighlights.css';

const recipes = [
  {
    id: 1,
    title: 'Post-Workout Power Toast',
    time: '3 Mins',
    protein: '18g Protein',
    badge: 'Quick Breakfast',
    icon: '🥪',
    desc: 'Thick sourdough toast lathered with Classy Crunch, topped with banana slices, chia seeds, and a drizzle of raw honey.'
  },
  {
    id: 2,
    title: '35g Monster Fuel Shake',
    time: '2 Mins',
    protein: '35g Protein',
    badge: 'Gym Favorite',
    icon: '🥤',
    desc: '2 hearty scoops of Choco Crunch blended with chilled almond milk, rolled oats, whey, and half a frozen banana.'
  },
  {
    id: 3,
    title: 'Overnight Crunchy Oats Bowl',
    time: 'Prep at night',
    protein: '24g Protein',
    badge: 'Prep & Go',
    icon: '🥣',
    desc: 'Rolled oats soaked in Greek yogurt, topped with a warm swirl of melted Creamy Peanut Butter and roasted blueberries.'
  },
  {
    id: 4,
    title: 'Crispy Apple & Nut Dip',
    time: '1 Min',
    protein: '12g Protein',
    badge: 'Guilt-Free Snack',
    icon: '🍏',
    desc: 'Tart Granny Smith apple slices paired with Honey Peanut Butter for that ultimate sweet, salty, and crunchy bite.'
  }
];

const RecipeHighlights = () => {
  const [activeRecipe, setActiveRecipe] = useState(recipes[0]);

  return (
    <section className="recipes-section" id="recipes" aria-label="Recipes & Ideas">
      <div className="recipes-container">
        
        <div className="recipes-header">
          <span className="recipes-badge">CULINARY INSPIRATION</span>
          <h2 className="recipes-title">
            Fuel Your Day, <span className="highlight-orange">Your Way</span>
          </h2>
          <p className="recipes-subtitle">
            From sunrise pre-workout bites to late-night guilt-free cravings, here are 4 delicious ways to enjoy Protinut.
          </p>
        </div>

        <div className="recipes-grid">
          {recipes.map((rec) => (
            <div
              key={rec.id}
              className={`recipe-card ${activeRecipe.id === rec.id ? 'active' : ''}`}
              onClick={() => setActiveRecipe(rec)}
            >
              <div className="recipe-card-top">
                <span className="recipe-icon">{rec.icon}</span>
                <span className="recipe-badge-tag">{rec.badge}</span>
              </div>

              <h3 className="recipe-title">{rec.title}</h3>
              <p className="recipe-desc">{rec.desc}</p>

              <div className="recipe-meta-row">
                <span className="meta-item">⏱️ {rec.time}</span>
                <span className="meta-protein">⚡ {rec.protein}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecipeHighlights;
