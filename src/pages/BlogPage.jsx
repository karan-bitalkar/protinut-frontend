import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

// ── 6 Real, In-Depth Articles ──
const blogArticles = [
  {
    id: 1,
    slug: 'why-palm-oil-in-peanut-butter-is-dangerous',
    title: 'The Hidden Truth About Palm Oil in Commercial Peanut Butter',
    category: 'Nutrition Science',
    date: 'Oct 15, 2024',
    readTime: '5 min read',
    author: 'Protinut Nutrition Team',
    snippet: 'Commercial brands mix hydrogenated palm oil to prevent oil separation and cut costs. Learn why these trans fats damage your heart and what to check on nutrition labels.',
    fullContent: {
      intro: 'Flip over almost any mainstream supermarket peanut butter jar in India, and you will likely find an ingredient called "Hydrogenated Vegetable Oil (Palm Oil)" or "Hydrogenated Soya/Cottonseed Oil". But why are industrial manufacturers pouring cheap palm fats into pure peanut butter, and what does it do to your body?',
      sections: [
        {
          heading: 'Why Do Commercial Brands Add Palm Oil?',
          body: 'Pure ground peanuts naturally separate: the lighter, heart-healthy monounsaturated peanut oil floats to the top over time. However, mass retailers consider oil separation "cosmetically unappealing" for passive supermarket shelves. By pumping in hydrogenated palm oil, manufacturers chemically lock the peanut butter into an unnatural, stiff paste that never separates — even after sitting in a warehouse for 24 months.'
        },
        {
          heading: 'The Health Costs: Trans Fats & Cardiovascular Strain',
          body: 'Hydrogenation is an industrial process where liquid vegetable oil is forced with hydrogen gas at high temperatures and pressures. This creates dangerous trans-fatty acids and high levels of saturated palmitic acid. Clinical studies show that regular consumption of hydrogenated palm oil significantly elevates LDL ("bad") cholesterol, promotes arterial plaque deposition, and triggers systemic inflammation.'
        },
        {
          heading: 'How to Spot It on the Food Label',
          body: 'Manufacturers often use clever deceptive labelling terms. Watch out for:\n• "Partially Hydrogenated Vegetable Oil"\n• "Fully Hydrogenated Palm Fat"\n• "Fractionated Palm Oil"\n• "Emulsifiers INS 471 / INS 472"\nIf you see any of these, put the jar right back on the shelf. Pure peanut butter needs only one ingredient: 100% Peanuts.'
        }
      ],
      keyTakeaways: [
        'Pure peanut butter naturally separates — oil floating on top is proof of 100% purity.',
        'Commercial brands add hydrogenated palm oil solely for factory shelf-life and aesthetic stiffness.',
        'Hydrogenated palm oils contain trans fats that elevate LDL cholesterol and harm heart health.',
        'Protinut is guaranteed 100% Palm Oil Free. Simply stir the natural oil and enjoy honest nutrition.'
      ]
    }
  },
  {
    id: 2,
    slug: 'plant-protein-guide-for-athletes-and-gym',
    title: 'The Athlete\'s Guide to Plant Protein: How Peanut Butter Fuels Muscle Hypertrophy',
    category: 'Gym & Fitness',
    date: 'Sep 28, 2024',
    readTime: '6 min read',
    author: 'Protinut Sports Science Desk',
    snippet: 'How eating 2 generous tablespoons of clean peanut butter daily boosts your daily macro targets, accelerates post-workout recovery, and delivers critical BCAAs.',
    fullContent: {
      intro: 'Whether you are an aspiring powerlifter, marathon runner, or functional CrossFit athlete, hitting your daily protein target (typically 1.6g to 2.2g per kg of bodyweight) on a vegetarian or clean diet can be tough. High-protein peanut butter is nature\'s most calorie-dense, delicious macro hack.',
      sections: [
        {
          heading: 'The Amino Acid Architecture: BCAAs and L-Arginine',
          body: 'Peanuts provide one of the highest concentrations of L-Arginine among all plant foods. Arginine is a direct precursor to Nitric Oxide (NO) in the bloodstream, which dilates blood vessels, increases nutrient delivery, and delivers exceptional muscle pumps during heavy compound lifts. Peanuts are also rich in Leucine and Valine, key branched-chain amino acids (BCAAs) that ignite the mTOR pathway for muscle protein synthesis.'
        },
        {
          heading: 'Timing Your Intake: Pre-Workout vs. Post-Workout',
          body: '• Pre-Workout (60-90 mins before): Enjoy 1-2 tbsp of Protinut Classy Crunch on whole wheat sourdough or with a banana. The combination of complex carbs and healthy fats provides steady, sustained energy release without an insulin crash.\n• Post-Workout (within 45 mins): Blend 2 tbsp of Protinut into a high-protein shake with chilled almond milk and oats. The dense micronutrients and healthy fats replenish glycogen and support cellular recovery.'
        },
        {
          heading: 'The Complete Protein Synergy: Combining with Grains',
          body: 'While peanuts have an impressive amino acid profile, pairing them with whole grains (such as rolled oats, whole grain sourdough, or brown rice cakes) creates a 100% complete amino acid score that matches animal protein bio-availability.'
        }
      ],
      keyTakeaways: [
        'Provides up to 30g of pure bioavailable plant protein per 100g.',
        'Rich in L-Arginine for increased nitric oxide production and muscle vascularity.',
        'Low glycemic index prevents sluggishness during high-intensity training.',
        'Pairs perfectly with whole oats and bananas for a complete amino acid profile.'
      ]
    }
  },
  {
    id: 3,
    slug: 'natural-oil-separation-explained',
    title: 'Natural Oil Separation: Why It Is Your #1 Proof of Purity',
    category: 'Purity & Quality',
    date: 'Aug 20, 2024',
    readTime: '4 min read',
    author: 'Karan, Founder @ Protinut™',
    snippet: 'Opened your jar and saw golden liquid peanut oil floating at the top? Don\'t panic — here is why that golden layer is the ultimate badge of honest, unadulterated craftsmanship.',
    fullContent: {
      intro: 'When first-time customers open a freshly unsealed jar of PROTINUT™, they sometimes ask: "Why is there liquid oil sitting on top? Has it spoiled?" The short answer is: Absolutely not! In fact, that golden oil layer is the single greatest guarantee that you bought genuine, chemical-free food.',
      sections: [
        {
          heading: 'The Physics of Stone-Ground Peanuts',
          body: 'Peanuts naturally contain roughly 48% to 50% healthy fats, primarily heart-protective monounsaturated oleic acid. When whole roasted peanuts are stone-ground in our traditional churners, the cellular structure gently breaks open, releasing these golden natural oils. Over a few weeks at room temperature, this lighter natural oil rises to the top.'
        },
        {
          heading: 'Why Doesn\'t Supermarket Peanut Butter Separate?',
          body: 'Mainstream commercial brands add chemical emulsifiers and hydrogenated oils (trans fats) that mechanically bind the oil to the solids. The oil cannot separate because chemical stabilizers won\'t let it. If your peanut butter never separates even after months at room temperature, you are eating chemical emulsifiers.'
        },
        {
          heading: 'How to Easily Stir and Store Your Jar',
          body: '1. The Fork Method: Use a clean fork or butter knife to gently stir from the bottom up in circular motions until the butter becomes creamy and uniform.\n2. The Inverted Jar Hack: Store your unopened jar upside down in your pantry for 24 hours before unsealing. Gravity will distribute the oil back through the jar.\n3. The Fridge Chill: Once stirred, place your jar in the refrigerator. The cool temperature solidifies the natural fats, keeping it thick and creamy for months without separation.'
        }
      ],
      keyTakeaways: [
        'Liquid oil floating on top is 100% natural and unrefined peanut oil.',
        'No separation in commercial jars means chemical emulsifiers and palm oils are present.',
        'Stir thoroughly with a fork once, then refrigerate to lock in creamy consistency.',
        'Real food separates; synthetic chemistry doesn\'t!'
      ]
    }
  },
  {
    id: 4,
    slug: 'peanut-butter-for-weight-loss-science',
    title: 'Peanut Butter for Weight Loss: Can a Calorie-Dense Food Help You Shed Kilos?',
    category: 'Weight Management',
    date: 'Jul 14, 2024',
    readTime: '5 min read',
    author: 'Protinut Nutrition Team',
    snippet: 'It seems counterintuitive: how can a food with ~190 calories per serving help you lose stubborn body fat? Discover the science of satiety hormones and appetite regulation.',
    fullContent: {
      intro: 'For decades, outdated diet culture told us to fear healthy fats. Dieters choked down bland, dry rice cakes and 0%-fat processed cookies packed with sugar. Today, nutritional science has proven that eating healthy, nutrient-dense fats like peanut butter is one of the most effective ways to achieve sustainable body recomposition.',
      sections: [
        {
          heading: 'The Satiety Triad: Protein, Fiber, and Unsaturated Fats',
          body: 'When you eat refined carbohydrates (white bread, biscuits, sweets), your blood glucose spikes and plunges within 90 minutes, triggering urgent cravings for more sugar. Peanut butter, on the other hand, contains a trifecta of plant protein, slow-digesting dietary fiber, and healthy monounsaturated fats. This stimulates the release of cholecystokinin (CCK) and GLP-1 — hormones that signal your brain that you are full and satisfied for 4+ hours.'
        },
        {
          heading: 'Eliminating the "4 PM Snack Attack"',
          body: 'Most diets fail not at breakfast or dinner, but during the afternoon slump between 3:30 PM and 5:00 PM when willpower drops. Eating 1 tablespoon of Protinut Classy Crunch with an apple or spooned straight from the jar completely stabilizes blood sugar and stops you from raiding the office biscuit tin.'
        },
        {
          heading: 'The Golden Rule: Portion Control and Measurement',
          body: 'While peanut butter is a nutritional powerhouse, calories still count. The optimal portion for weight loss is 1 to 2 tablespoons (16g to 32g) per day. Never eat blindly straight out of the jar with a giant soup spoon! Use a standard measuring tablespoon to track your macros accurately.'
        }
      ],
      keyTakeaways: [
        'Healthy fats trigger satiety hormones (CCK and GLP-1) to curb overeating.',
        'Ultra-low Glycemic Index (~14) keeps blood glucose and insulin levels flat.',
        'Stops energy crashes and late-afternoon cravings for high-sugar snacks.',
        'Stick to 1–2 measured tablespoons per day for clean calorie deficit results.'
      ]
    }
  },
  {
    id: 5,
    slug: 'how-to-read-peanut-butter-label-in-5-seconds',
    title: 'How to Read a Peanut Butter Nutrition Label in 5 Seconds',
    category: 'Nutrition Science',
    date: 'Jun 19, 2024',
    readTime: '4 min read',
    author: 'Protinut Consumer Watch',
    snippet: 'Don\'t let fancy marketing front banners fool you. Here is the foolproof 3-step checklist to instantly verify if a peanut butter is pure or packed with fillers.',
    fullContent: {
      intro: 'The front of a food package is marketing; the back of the package is law. Supermarket peanut butter jars are covered in buzzwords like "High Protein", "Fitness Fuel", and "Super Nutritious". But when you flip the jar over to the fine print ingredients list, the reality is often shocking.',
      sections: [
        {
          heading: 'Step 1: Check the Length of the Ingredients List',
          body: 'The single best rule in clean eating is: "If you cannot read the ingredients without a chemistry degree, do not put it in your body."\n• Honest Peanut Butter: Roasted Peanuts (and optionally a pinch of salt).\n• Commercial Trap: Roasted Peanuts, Hydrogenated Vegetable Oil (Palm Oil), Sugar, Dextrose, Salt, Mono- and Di-glycerides (E471), Maltodextrin, Natural Flavors.'
        },
        {
          heading: 'Step 2: Decode Sneaky Sugar Aliases',
          body: 'Manufacturers know modern consumers look for the word "Sugar". So they disguise added sweeteners under over 40 different names: Maltodextrin, High-Fructose Corn Syrup (HFCS), Invert Sugar, Liquid Glucose, Brown Rice Syrup, and Dextrose. If any of these appear, you are paying for cheap candy disguised as health food.'
        },
        {
          heading: 'Step 3: Check the Protein-to-Fat Ratio',
          body: 'Pure peanuts naturally deliver approximately 26g to 30g of protein per 100g. If the label shows 16g to 19g of protein per 100g, it means the peanuts have been diluted with vegetable oils, starches, and sugar fillers.'
        }
      ],
      keyTakeaways: [
        'The ingredients list should ideally contain only 1 item: 100% Peanuts.',
        'Beware of hidden sugar codes like Maltodextrin, Liquid Glucose, and Invert Syrup.',
        'Check for at least 26g–30g of protein per 100g to ensure unadulterated purity.',
        'At Protinut, what you see on the front is what is inside the jar — 100% honesty.'
      ]
    }
  },
  {
    id: 6,
    slug: 'the-art-of-slow-stone-grinding-maharashtra',
    title: 'From Maharashtra Soil to Your Jar: The Art of Slow Stone-Grinding',
    category: 'Behind The Jars',
    date: 'May 02, 2024',
    readTime: '5 min read',
    author: 'Karan, Founder @ Protinut™',
    snippet: 'Why Dharashiv\'s sun-drenched soil produces India\'s sweetest, crunchiest peanuts, and why traditional granite stone-grinding preserves micro-nutrients that industrial blenders destroy.',
    fullContent: {
      intro: 'Not all peanuts are created equal. The peanuts you taste in mass-market commercial jars are typically bulk-sourced from multiple regional commodity lots with high moisture and inconsistent roasting. Here is the story of how our roots in Dharashiv, Maharashtra shaped the distinctive flavor of PROTINUT™.',
      sections: [
        {
          heading: 'The Dharashiv Terroir: Soil, Sun, and Purity',
          body: 'Dharashiv in Maharashtra features nutrient-rich black cotton soil (Regur soil) and a semi-arid, sun-drenched climate. Peanuts cultivated here develop a denser concentration of natural oils and a naturally sweet, nutty flavor that requires zero added artificial flavoring. We partner directly with local farming families, guaranteeing fair prices and harvest-fresh quality.'
        },
        {
          heading: 'Controlled Fire-Roasting: Unlocking Flavors Without Burning',
          body: 'Industrial peanut butter factories use rapid flash-roasting at aggressive temperatures (exceeding 220°C) to speed up throughput. This burns delicate amino acid structures and destroys natural Vitamin E. At Protinut, we roast on slow, controlled flames at gentle temperatures, coaxing out deep golden caramelization without scorched bitterness.'
        },
        {
          heading: 'Traditional Granite Stone Churning',
          body: 'Modern industrial high-shear blades generate friction heat that degrades natural lipids into rancid compounds. Instead, Protinut relies on traditional slow stone grinders that gently crush the peanuts between natural granite stones. The result is our signature mouthfeel: an honest, rich crunch that commercial factories simply cannot replicate.'
        }
      ],
      keyTakeaways: [
        'Sourced 100% from hardworking farmers in Dharashiv, Maharashtra.',
        'Slow flame roasting preserves delicate amino acids and vital Vitamin E.',
        'Granite stone grinding delivers unmatched authentic texture and honest crunch.',
        'Zero compromise, zero corporate shortcuts: true small-batch craftsmanship.'
      ]
    }
  }
];

const categories = ['All Articles', 'Nutrition Science', 'Gym & Fitness', 'Purity & Quality', 'Weight Management', 'Behind The Jars'];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredArticles = selectedCategory === 'All Articles'
    ? blogArticles
    : blogArticles.filter((art) => art.category === selectedCategory);

  return (
    <div className="blog-page">
      
      {/* ── Page Hero Banner ── */}
      <div className="page-hero-banner">
        <span className="page-hero-badge">THE PROTINUT JOURNAL</span>
        <h1 className="page-hero-title">
          Clean Nutrition & <span className="highlight-orange">Athlete Knowledge</span>
        </h1>
        <p className="page-hero-subtitle">
          Evidence-based deep dives into clean macros, heart health, sports science, and the unfiltered truth about food industry shortcuts.
        </p>

        {/* Category Filter Pills */}
        <div className="blog-filter-pills-row">
          {categories.map((cat, idx) => (
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

      {/* ── Blog Grid Section ── */}
      <section className="blog-articles-section">
        <div className="blog-articles-container">
          
          <div className="articles-grid">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="blog-article-card"
                onClick={() => setActiveArticle(art)}
              >
                <div className="article-meta">
                  <span className="article-category">{art.category}</span>
                  <span className="article-date">{art.date} • {art.readTime}</span>
                </div>
                
                <h2 className="article-title">{art.title}</h2>
                <p className="article-snippet">{art.snippet}</p>
                
                <div className="article-footer">
                  <span className="article-author-tag">By {art.author}</span>
                  <span className="read-more-link">READ FULL GUIDE →</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ── Interactive Article Reader Modal ── */}
      {activeArticle && (
        <div className="article-modal-overlay" onClick={() => setActiveArticle(null)}>
          <div
            className="article-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="article-modal-close-btn"
              onClick={() => setActiveArticle(null)}
              aria-label="Close Article"
            >
              ✕
            </button>

            <div className="modal-article-header">
              <span className="modal-article-category">{activeArticle.category}</span>
              <h1 className="modal-article-title">{activeArticle.title}</h1>
              <div className="modal-article-meta">
                <span>✍️ {activeArticle.author}</span>
                <span>📅 {activeArticle.date}</span>
                <span>⏱️ {activeArticle.readTime}</span>
              </div>
            </div>

            <div className="modal-article-body">
              <p className="modal-article-intro">{activeArticle.fullContent.intro}</p>

              {activeArticle.fullContent.sections.map((sec, idx) => (
                <div key={idx} className="modal-content-section">
                  <h3>{sec.heading}</h3>
                  {sec.body.split('\n').map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              ))}

              {/* Key Takeaways Box */}
              <div className="modal-takeaways-box">
                <h4>🎯 Key Nutritional Takeaways</h4>
                <ul>
                  {activeArticle.fullContent.keyTakeaways.map((item, tIdx) => (
                    <li key={tIdx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA within Modal */}
              <div className="modal-footer-cta">
                <div className="modal-cta-text">
                  <strong>Experience The Protinut Difference</strong>
                  <p>100% stone-ground Indian peanuts. Zero palm oil, zero junk.</p>
                </div>
                <Link to="/products" className="modal-cta-btn" onClick={() => setActiveArticle(null)}>
                  Shop Our Jars →
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default BlogPage;
