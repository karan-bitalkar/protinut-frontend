import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoImg from './assets/protinut-logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="protinut-footer" id="contact-us">
      {/* Top Newsletter Strip */}
      <div className="footer-newsletter-wrap">
        <div className="footer-newsletter-container">
          <div className="newsletter-text">
            <span className="newsletter-tag">JOIN THE PROTINUT TRIBE</span>
            <h3>Get 10% OFF Your First Peanut Butter Jar</h3>
            <p>Exclusive access to new flavor drops, fitness recipes, and athlete nutrition tips.</p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            {subscribed ? (
              <div className="newsletter-success">
                ✓ Welcome! Use coupon code <strong>PROTI10</strong> at checkout!
              </div>
            ) : (
              <div className="newsletter-input-box">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">SUBSCRIBE</button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main-container">
        <div className="footer-grid">
          
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <Link to="/">
              <img src={logoImg} alt="PROTINUT™" className="footer-logo" />
            </Link>
            <p className="footer-tagline">
              Crafting India's purest, 100% slow-roasted peanut butters for fitness enthusiasts, athletes, and conscious families.
            </p>
            <div className="footer-badges">
              <span>🛡️ 100% Natural</span>
              <span>⚡ High Protein</span>
              <span>🚫 Zero Palm Oil</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Our Products</Link></li>
              <li><Link to="/benefits">Why Protinut</Link></li>
              <li><Link to="/recipes">Healthy Recipes</Link></li>
              <li><Link to="/blog">Blog & Articles</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          {/* Flavors */}
          <div className="footer-col">
            <h4>Our Range</h4>
            <ul>
              <li><Link to="/products">Classy Crunch (550g / 1kg)</Link></li>
              <li><Link to="/products">Choco Crunch (550g / 1kg)</Link></li>
              <li><Link to="/products">Creamy Peanut Butter</Link></li>
              <li><Link to="/products">Honey Peanut Butter</Link></li>
              <li><Link to="/products">High Protein Edition</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="footer-col contact-col">
            <h4>Customer Support</h4>
            <p>📍 Dharashiv, Maharashtra, India</p>
            <p>📧 support@protinut.in</p>
            <p>📞 +91 98765 43210 (Mon - Sat, 9am - 7pm)</p>
            <div className="fssai-stamp">
              <span>Lic No. 10020021000123</span>
              <small>FSSAI Food Safety Certified</small>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PROTINUT™ Nutrition. All rights reserved. Made with ❤️ in Dharashiv, Maharashtra.</p>
          <div className="footer-legal">
            <Link to="/about">About Brand</Link>
            <span>•</span>
            <Link to="/contact">Support</Link>
            <span>•</span>
            <Link to="/products">Catalogue</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
