import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

// ── 8 Real Chef & Athlete Crafted Recipes ──
const fullRecipesList = [
  {
    id: 1,
    title: '35g Monster Gym Fuel Shake',
    category: 'Post-Workout',
    time: '3 mins',
    difficulty: 'Easy',
    servings: '1 Large Glass',
    recommendedJar: 'Classy Crunch or Choco Crunch',
    macros: {
      calories: '420 kcal',
      protein: '35g',
      carbs: '38g',
      fats: '16g',
      fiber: '7g'
    },
    shortDesc: 'The ultimate post-workout muscle recovery smoothie packed with fast and slow-digesting proteins, potassium, and healthy fats.',
    ingredients: [
      '2 generous tablespoons (32g) PROTINUT™ Classy Crunch',
      '1 scoop Plant or Whey Protein (Vanilla or Chocolate)',
      '1 ripe frozen banana (peeled and sliced)',
      '250ml chilled unsweetened almond or soy milk',
      '1 tablespoon rolled oats',
      '1 teaspoon chia seeds',
      'Pinch of ground cinnamon'
    ],
    instructions: [
      'Add the chilled almond milk and frozen banana slices into your high-speed blender.',
      'Spoon in 2 generous tablespoons of PROTINUT™ Classy Crunch and your choice of protein powder.',
      'Add the rolled oats, chia seeds, and a pinch of cinnamon for metabolic warmth.',
      'Blend on high for 45 to 60 seconds until completely smooth, frothy, and thick.',
      'Pour into a chilled shaker glass and drink within 30 minutes post-training to maximize glycogen recovery and muscle repair.'
    ],
    chefTip: 'Freezing your banana in advance eliminates the need for ice cubes and yields a thick, velvety ice-cream-like milkshake consistency.'
  },
  {
    id: 2,
    title: 'Post-Workout Sourdough Power Toast',
    category: 'Power Breakfast',
    time: '4 mins',
    difficulty: 'Super Easy',
    servings: '2 Slices',
    recommendedJar: 'Classy Crunch',
    macros: {
      calories: '320 kcal',
      protein: '19g',
      carbs: '34g',
      fats: '14g',
      fiber: '6g'
    },
    shortDesc: 'Crisp artisanal sourdough lathered with warm Classy Crunch, sliced bananas, and roasted super-seeds.',
    ingredients: [
      '2 thick slices of artisanal sourdough or 100% whole grain bread',
      '2 tablespoons PROTINUT™ Classy Crunch',
      '1 small banana, thinly sliced into coins',
      '1 teaspoon chia seeds or roasted pumpkin seeds',
      '1 teaspoon raw organic honey (optional drizzle)',
      'Flaky sea salt (tiny pinch)'
    ],
    instructions: [
      'Toast your sourdough slices in a toaster or on a hot tawa with a drop of ghee until deep golden and crunchy.',
      'While the bread is still hot, generously spread 1 tablespoon of PROTINUT™ Classy Crunch across each slice (the residual heat gently melts the natural peanut oils).',
      'Evenly arrange your fresh banana slices over the peanut butter.',
      'Garnish with chia seeds, pumpkin seeds, a tiny drizzle of raw honey, and a pinch of flaky sea salt.',
      'Enjoy immediately with a hot cup of black coffee or green tea.'
    ],
    chefTip: 'Spreading the peanut butter while the toast is hot unlocks the roasted peanut aroma and makes spreading effortless.'
  },
  {
    id: 3,
    title: '3-Ingredient Choco Crunch Energy Truffles',
    category: 'Quick 2-Min Snacks',
    time: '10 mins prep (No-Bake)',
    difficulty: 'Easy',
    servings: '8 Energy Balls',
    recommendedJar: 'Choco Crunch',
    macros: {
      calories: '140 kcal (per 2 balls)',
      protein: '9g',
      carbs: '16g',
      fats: '6g',
      fiber: '4g'
    },
    shortDesc: 'Zero-bake protein truffles you can batch-prep in 10 minutes to crush midday sugar cravings and pre-gym slumps.',
    ingredients: [
      '1/2 cup PROTINUT™ Choco Crunch',
      '1 cup rolled oats (pulsed lightly in a mixer)',
      '2 tablespoons ground flaxseed or roasted sesame seeds',
      '1 tablespoon raw honey or pure maple syrup',
      '1 tablespoon dark cocoa powder (for rolling)'
    ],
    instructions: [
      'In a medium mixing bowl, combine the lightly pulsed rolled oats and ground flaxseeds.',
      'Add 1/2 cup of PROTINUT™ Choco Crunch and honey. Stir with a wooden spatula until a thick, pliable dough forms.',
      'Using clean hands, roll the mixture into 8 uniform bite-sized balls (about the size of a golf ball).',
      'Lightly dust the balls in dark cocoa powder or crushed roasted peanuts.',
      'Transfer to an airtight container and refrigerate for 20 minutes to firm up. Keeps fresh for up to 2 weeks!'
    ],
    chefTip: 'Keep a batch in the freezer! They taste like high-end fudge truffles and make the best instant 4 PM work snack.'
  },
  {
    id: 4,
    title: 'Warm Peanut Butter & Berry Oatmeal Super-Bowl',
    category: 'Power Breakfast',
    time: '6 mins',
    difficulty: 'Easy',
    servings: '1 Large Bowl',
    recommendedJar: 'Creamy or Classy Crunch',
    macros: {
      calories: '390 kcal',
      protein: '22g',
      carbs: '48g',
      fats: '15g',
      fiber: '9g'
    },
    shortDesc: 'Slow-simmered rolled oats enriched with stone-ground peanut butter, antioxidant-rich fresh berries, and walnuts.',
    ingredients: [
      '1/2 cup traditional rolled oats',
      '1 cup water or unsweetened almond/dairy milk',
      '2 tablespoons PROTINUT™ Creamy Peanut Butter',
      '1/4 cup fresh blueberries or sliced strawberries',
      '1 tablespoon crushed walnuts or roasted almond flakes',
      'Pinch of sea salt and cinnamon powder'
    ],
    instructions: [
      'Combine rolled oats, milk, and a tiny pinch of salt in a small saucepan over medium heat.',
      'Simmer for 4 to 5 minutes, stirring occasionally, until the oats are thick and creamy.',
      'Remove from heat and pour into a serving bowl.',
      'Swirl in 2 tablespoons of PROTINUT™ Creamy Peanut Butter into the warm porridge.',
      'Garnish the top with fresh berries, crushed walnuts, and a dusting of cinnamon powder. Serve warm.'
    ],
    chefTip: 'Stirring the peanut butter into warm porridge replaces the need for butter or heavy cream, creating a rich satiny texture with healthy fats.'
  },
  {
    id: 5,
    title: 'Crispy Green Apple & Choco Crunch Protein Dip',
    category: 'Quick 2-Min Snacks',
    time: '2 mins',
    difficulty: 'Super Easy',
    servings: '1 Serving',
    recommendedJar: 'Choco Crunch',
    macros: {
      calories: '210 kcal',
      protein: '11g',
      carbs: '22g',
      fats: '10g',
      fiber: '5g'
    },
    shortDesc: 'Cold tart Granny Smith green apple slices paired with warm Choco Crunch for the ultimate sweet-salty-crunchy craving cure.',
    ingredients: [
      '1 crisp, cold Granny Smith green apple',
      '2 tablespoons PROTINUT™ Choco Crunch',
      'Tiny pinch of pink Himalayan sea salt',
      '1 teaspoon toasted crushed almonds (optional)'
    ],
    instructions: [
      'Wash and core the cold green apple. Slice into crisp wedges.',
      'Spoon 2 generous tablespoons of PROTINUT™ Choco Crunch into a small dipping ramekin.',
      'Dust with a whisper of pink Himalayan sea salt to heighten the cocoa notes.',
      'Dip the cold crisp apple wedges into the peanut butter and enjoy immediately!'
    ],
    chefTip: 'The high malic acid in tart green apples cuts through the dense richness of cocoa and peanuts, making it an insanely addictive healthy snack.'
  },
  {
    id: 6,
    title: 'Creamy Peanut Butter & Banana Chia Overnight Pudding',
    category: 'Pre-Workout',
    time: '5 mins prep (Set Overnight)',
    difficulty: 'Easy',
    servings: '1 Mason Jar',
    recommendedJar: 'Classy Crunch or Creamy',
    macros: {
      calories: '340 kcal',
      protein: '24g',
      carbs: '32g',
      fats: '16g',
      fiber: '11g'
    },
    shortDesc: 'Omega-3 loaded chia seed pudding layered with slow-roasted peanut butter and sliced fruits. Ready the moment you wake up.',
    ingredients: [
      '3 tablespoons black or white chia seeds',
      '1 cup unsweetened almond or oat milk',
      '2 tablespoons PROTINUT™ Classy Crunch',
      '1/2 teaspoon pure vanilla extract',
      '1 tablespoon raw honey or date syrup',
      '1/2 banana and pomegranate pearls for garnish'
    ],
    instructions: [
      'In a wide-mouth glass mason jar, whisk chia seeds, almond milk, vanilla extract, and honey thoroughly with a fork.',
      'Swirl in 1 tablespoon of PROTINUT™ Classy Crunch until partially incorporated.',
      'Let sit on the counter for 10 minutes, whisk once more to prevent clumping, then seal and refrigerate overnight (minimum 4 hours).',
      'In the morning, unseal the jar, add the second tablespoon of peanut butter on top, and garnish with sliced bananas and pomegranate seeds.'
    ],
    chefTip: 'Chia seeds absorb up to 10x their weight in liquid, creating a pudding texture that sustains hydration during tough morning cardio sessions.'
  },
  {
    id: 7,
    title: 'High-Protein Savory Peanut Satay Noodle Dressing',
    category: 'Savory Lunch',
    time: '5 mins',
    difficulty: 'Easy',
    servings: '2 Servings',
    recommendedJar: 'Classy Crunch or Creamy',
    macros: {
      calories: '280 kcal (per serving with noodles)',
      protein: '16g',
      carbs: '30g',
      fats: '12g',
      fiber: '4g'
    },
    shortDesc: 'A rich, savory Thai-inspired satay sauce made with stone-ground peanuts, ginger, lime, and low-sodium soy sauce over soba noodles or tofu.',
    ingredients: [
      '3 tablespoons PROTINUT™ Classy Crunch or Creamy',
      '1.5 tablespoons low-sodium tamari or soy sauce',
      '1 tablespoon fresh lime juice',
      '1 teaspoon grated fresh ginger',
      '1 small clove garlic, finely minced',
      '1 teaspoon chili garlic crisp or red pepper flakes',
      '2-3 tablespoons warm water (to loosen)',
      'Cooked soba noodles, steamed edamame, and shredded carrots for serving'
    ],
    instructions: [
      'In a medium bowl, combine PROTINUT™ peanut butter, soy sauce, lime juice, grated ginger, minced garlic, and chili flakes.',
      'Slowly whisk in 2 to 3 tablespoons of warm water one spoon at a time until the sauce becomes silky, glossy, and pourable.',
      'Toss the dressing with freshly boiled soba noodles, warm tofu cubes, and crunchy shredded carrots and purple cabbage.',
      'Garnish with chopped cilantro and crushed roasted peanuts. Serve warm or cold!'
    ],
    chefTip: 'Warm water is the secret to emulsifying pure natural peanut butter into a restaurant-quality glossy satay dressing without needing oil.'
  },
  {
    id: 8,
    title: 'Dark Chocolate Peanut Butter Frozen Banana Bark',
    category: 'Healthy Desserts',
    time: '5 mins prep (Freeze 1 hr)',
    difficulty: 'Easy',
    servings: '6 Bark Squares',
    recommendedJar: 'Choco Crunch or Classy Crunch',
    macros: {
      calories: '160 kcal (per 2 pieces)',
      protein: '7g',
      carbs: '18g',
      fats: '8g',
      fiber: '3g'
    },
    shortDesc: 'Tastes exactly like a frozen Snickers candy bar, but packed with clean plant fats, potassium, and zero refined white sugars.',
    ingredients: [
      '2 large ripe bananas, sliced in half lengthwise',
      '3 tablespoons PROTINUT™ Choco Crunch or Classy Crunch',
      '50g 70%+ dark chocolate, gently melted',
      '2 tablespoons roasted peanuts, coarsely chopped',
      'Flaky sea salt'
    ],
    instructions: [
      'Line a small baking tray or plate with parchment paper.',
      'Place the 4 banana halves side-by-side on the parchment paper and gently press down with a glass to flatten slightly.',
      'Spread an even, generous layer of PROTINUT™ Choco Crunch across the entire top surface of the bananas.',
      'Drizzle the melted dark chocolate evenly over the peanut butter layer.',
      'Scatter the chopped roasted peanuts and a pinch of flaky sea salt on top.',
      'Freeze for at least 1 hour until solid, then snap or slice into crisp bark squares!'
    ],
    chefTip: 'Keep a container of this bark in your freezer at all times for the ultimate guilt-free post-dinner dessert that curbs sweet cravings instantly.'
  }
];

const recipeCategories = ['All Recipes', 'Pre-Workout', 'Post-Workout', 'Power Breakfast', 'Quick 2-Min Snacks', 'Healthy Desserts', 'Savory Lunch'];

const RecipesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Recipes');
  const [activeRecipe, setActiveRecipe] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveRecipe(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredRecipes = selectedCategory === 'All Recipes'
    ? fullRecipesList
    : fullRecipesList.filter((r) => r.category === selectedCategory);

  return (
    <div className="recipes-page">
      
      {/* ── Page Hero Banner ── */}
      <div className="page-hero-banner">
        <span className="page-hero-badge">CHEF & ATHLETE KITCHEN</span>
        <h1 className="page-hero-title">
          Fuel Deliciously with <span className="highlight-orange">PROTINUT™</span>
        </h1>
        <p className="page-hero-subtitle">
          From 35g monster post-gym shakes to 2-minute guilt-free energy truffles, explore high-protein healthy recipes you can make in under 6 minutes.
        </p>

        {/* Recipe Category Pills */}
        <div className="blog-filter-pills-row">
          {recipeCategories.map((cat, idx) => (
            <button
              key={idx}
              className={`blog-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Recipes Grid Section ── */}
      <section className="extra-recipes-section">
        <div className="extra-recipes-container">
          
          <div className="recipes-summary-bar">
            <span>Showing <strong>{filteredRecipes.length}</strong> Delicious Fitness Recipes</span>
            <span className="summary-tip">💡 Click any recipe to view full ingredients, cooking steps & macro breakdown</span>
          </div>

          <div className="extra-recipes-grid">
            {filteredRecipes.map((r) => (
              <div
                key={r.id}
                className="extra-recipe-card clickable-recipe-card"
                onClick={() => setActiveRecipe(r)}
              >
                <div className="recipe-card-top-row">
                  <span className="recipe-tag-pill">{r.category}</span>
                  <span className="recipe-difficulty-badge">★ {r.difficulty}</span>
                </div>

                <h3 className="recipe-card-title">{r.title}</h3>
                <p className="recipe-card-short-desc">{r.shortDesc}</p>

                <div className="recipe-stat-row">
                  <span>⏱️ {r.time}</span>
                  <span className="stat-highlight">⚡ {r.macros.protein} Protein</span>
                  <span>🔥 {r.macros.calories}</span>
                </div>

                <div className="recipe-card-footer">
                  <span className="recommended-jar-label">
                    Best with: <strong>{r.recommendedJar}</strong>
                  </span>
                  <span className="view-recipe-cta">VIEW RECIPE →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Interactive Recipe Detail Modal ── */}
      {activeRecipe && (
        <div className="recipe-modal-overlay" onClick={() => setActiveRecipe(null)}>
          <div
            className="recipe-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="recipe-modal-close-btn"
              onClick={() => setActiveRecipe(null)}
              aria-label="Close Recipe"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="modal-recipe-header">
              <span className="recipe-modal-tag">{activeRecipe.category}</span>
              <h1 className="recipe-modal-title">{activeRecipe.title}</h1>
              <p className="recipe-modal-desc">{activeRecipe.shortDesc}</p>
              
              <div className="recipe-modal-quick-meta">
                <div className="quick-meta-chip">⏱️ Prep: {activeRecipe.time}</div>
                <div className="quick-meta-chip">🍽️ Servings: {activeRecipe.servings}</div>
                <div className="quick-meta-chip">🏷️ Skill: {activeRecipe.difficulty}</div>
                <div className="quick-meta-chip highlight">✨ Best: {activeRecipe.recommendedJar}</div>
              </div>

              {/* Macro Bar */}
              <div className="recipe-macro-banner">
                <div className="macro-chip">
                  <span className="macro-num">{activeRecipe.macros.calories}</span>
                  <span className="macro-lbl">Energy</span>
                </div>
                <div className="macro-chip highlight-protein">
                  <span className="macro-num">{activeRecipe.macros.protein}</span>
                  <span className="macro-lbl">Protein</span>
                </div>
                <div className="macro-chip">
                  <span className="macro-num">{activeRecipe.macros.carbs}</span>
                  <span className="macro-lbl">Carbs</span>
                </div>
                <div className="macro-chip">
                  <span className="macro-num">{activeRecipe.macros.fats}</span>
                  <span className="macro-lbl">Healthy Fats</span>
                </div>
                <div className="macro-chip">
                  <span className="macro-num">{activeRecipe.macros.fiber}</span>
                  <span className="macro-lbl">Fiber</span>
                </div>
              </div>
            </div>

            {/* Modal Content Columns */}
            <div className="modal-recipe-columns">
              
              {/* Ingredients Column */}
              <div className="recipe-col-ingredients">
                <h3>🛒 Ingredients Checklist</h3>
                <ul className="ingredients-checklist">
                  {activeRecipe.ingredients.map((ing, iIdx) => (
                    <li key={iIdx}>
                      <span className="ingredient-bullet">✓</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Instructions Column */}
              <div className="recipe-col-steps">
                <h3>👨‍🍳 Step-by-Step Method</h3>
                <ol className="recipe-steps-list">
                  {activeRecipe.instructions.map((step, sIdx) => (
                    <li key={sIdx}>
                      <span className="step-num-pill">{sIdx + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>

                {/* Pro Chef Tip Box */}
                <div className="recipe-pro-tip-box">
                  <span className="tip-bulb">💡</span>
                  <div>
                    <strong>Pro Chef & Athlete Tip:</strong>
                    <p>{activeRecipe.chefTip}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Banner */}
            <div className="modal-recipe-footer-bar">
              <div>
                <strong>Need freshly roasted peanut butter for this recipe?</strong>
                <p>Order {activeRecipe.recommendedJar} — fresh stone-ground batches dispatched daily.</p>
              </div>
              <Link to="/products" className="btn-modal-shop" onClick={() => setActiveRecipe(null)}>
                Get The Jar →
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* ── Community Recipe Submission Banner ── */}
      <section className="recipe-community-banner">
        <div className="community-banner-box">
          <span className="community-badge">COMMUNITY CHEFS</span>
          <h2>Have A Delicious Protinut Recipe?</h2>
          <p>
            Share your favorite smoothie, protein bowl, or dessert recipe with us on Instagram using <strong>#ProtinutKitchen</strong> and tag <strong>@protinut.in</strong> to get featured!
          </p>
          <div className="community-action-row">
            <Link to="/products" className="btn-primary-orange">Shop Jars For Recipes →</Link>
            <Link to="/contact" className="btn-secondary-white">Submit Recipe Idea ★</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RecipesPage;
