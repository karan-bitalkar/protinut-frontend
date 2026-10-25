import React from 'react';
import HeroCarousel from '../HeroCarousel';
import NutritionStrip from '../NutritionStrip';
import FeaturedShowcase from '../FeaturedShowcase';
import WhyProtinut from '../WhyProtinut';
import RecipeHighlights from '../RecipeHighlights';
import Testimonials from '../Testimonials';

const HomePage = ({
  onAddToCart,
  onQuickView,
  wishlistItems = [],
  onToggleWishlist
}) => {
  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Nutrition Highlights Strip */}
      <NutritionStrip />

      {/* Featured Products Showcase (Alternating zigzag presentation of the 2 signature jars) */}
      <FeaturedShowcase
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
        wishlistItems={wishlistItems}
        onToggleWishlist={onToggleWishlist}
      />

      {/* Why Choose Protinut */}
      <WhyProtinut />

      {/* Healthy Recipes */}
      <RecipeHighlights />

      {/* Community Testimonials */}
      <Testimonials />
    </div>
  );
};

export default HomePage;
