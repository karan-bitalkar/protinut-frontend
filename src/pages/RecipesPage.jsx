import React, { useEffect } from 'react';
import RecipeHighlights from '../RecipeHighlights';
import './Pages.css';

const extraRecipes = [
  {
    title: 'High-Protein Peanut Butter Banana Smoothie',
    time: '4 mins',
    protein: '28g',
    calories: '380 kcal',
    tag: 'Pre-Workout',
    desc: 'Blend 2 tbsp of Protinut Classy Crunch with 1 frozen banana, 200ml cold almond milk, 1 tbsp chia seeds, and 1 scoop plant protein powder.'
  },
  {
    title: 'Crunchy Chocolate Rice Cake Treats',
    time: '2 mins',
    protein: '14g',
    calories: '220 kcal',
    tag: 'Midday Snack',
    desc: 'Spread generous layers of Choco Crunch over lightly salted brown rice cakes and top with fresh pomegranate pearls or roasted almond flakes.'
  },
  {
    title: 'Warm Peanut Butter & Berry Oatmeal Bowl',
    time: '6 mins',
    protein: '22g',
    calories: '410 kcal',
    tag: 'Power Breakfast',
    desc: 'Cook rolled oats in warm oat milk, stir in 1 large spoonful of Honey Peanut Butter, and garnish with fresh blueberries and sliced kiwi.'
  }
];

const RecipesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="recipes-page">
      <div className="page-hero-banner">
        <span className="page-hero-badge">KITCHEN INSPIRATION</span>
        <h1 className="page-hero-title">
          Fuel Deliciously with <span className="highlight-orange">PROTINUT™</span>
        </h1>
        <p className="page-hero-subtitle">
          From high-protein smoothies to post-gym protein toast, discover chef-crafted healthy recipes you can make in under 5 minutes.
        </p>
      </div>

      <RecipeHighlights />

      <section className="extra-recipes-section">
        <div className="extra-recipes-container">
          <h2 className="section-heading-centered">More Fitness Fuel Ideas</h2>
          <div className="extra-recipes-grid">
            {extraRecipes.map((r, i) => (
              <div key={i} className="extra-recipe-card">
                <span className="recipe-tag-pill">{r.tag}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <div className="recipe-stat-row">
                  <span>⏱️ {r.time}</span>
                  <span className="stat-highlight">⚡ {r.protein} Protein</span>
                  <span>🔥 {r.calories}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipesPage;
