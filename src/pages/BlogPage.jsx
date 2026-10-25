import React, { useEffect } from 'react';
import './Pages.css';

const articles = [
  {
    id: 1,
    title: 'Why Palm Oil In Commercial Peanut Butter Is Ruining Your Health',
    category: 'Nutrition Guide',
    date: 'Oct 2024',
    readTime: '4 min read',
    snippet: 'Learn how hydrogenated vegetable oils and trans fats strip peanuts of their natural heart-healthy benefits, and what to look for on food labels.'
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Plant Protein for Gym-Goers & Athletes',
    category: 'Fitness & Muscle',
    date: 'Sep 2024',
    readTime: '6 min read',
    snippet: 'How eating 2 tablespoons of high-protein peanut butter daily helps hit your macro targets without upsetting your digestion.'
  },
  {
    id: 3,
    title: 'Natural Oil Separation: Why It Is Actually A Proof Of Purity',
    category: 'Behind The Jars',
    date: 'Aug 2024',
    readTime: '3 min read',
    snippet: 'Ever opened a jar of real peanut butter and seen oil floating on top? Here is why that is the best sign of 100% natural ingredients.'
  }
];

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="blog-page">
      <div className="page-hero-banner">
        <span className="page-hero-badge">THE PROTINUT JOURNAL</span>
        <h1 className="page-hero-title">
          Clean Eating & <span className="highlight-orange">Athlete Knowledge</span>
        </h1>
        <p className="page-hero-subtitle">
          Evidence-based articles on clean nutrition, athletic recovery, macro optimization, and healthy snacking habits.
        </p>
      </div>

      <section className="blog-articles-section">
        <div className="blog-articles-container">
          <div className="articles-grid">
            {articles.map((art) => (
              <article key={art.id} className="blog-article-card">
                <div className="article-meta">
                  <span className="article-category">{art.category}</span>
                  <span className="article-date">{art.date} • {art.readTime}</span>
                </div>
                <h2 className="article-title">{art.title}</h2>
                <p className="article-snippet">{art.snippet}</p>
                <div className="article-footer">
                  <span className="read-more-link">READ ARTICLE →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
