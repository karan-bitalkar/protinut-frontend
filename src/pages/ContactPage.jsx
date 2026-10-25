import React, { useState, useEffect } from 'react';
import './Pages.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="contact-page">
      <div className="page-hero-banner">
        <span className="page-hero-badge">GET IN TOUCH</span>
        <h1 className="page-hero-title">
          We’d Love To <span className="highlight-orange">Hear From You</span>
        </h1>
        <p className="page-hero-subtitle">
          Have questions about our ingredients, wholesale distribution, bulk gym orders, or delivery status? Reach out to our team in Maharashtra!
        </p>
      </div>

      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-grid">
            
            {/* Left: Info Card */}
            <div className="contact-info-card">
              <h2>Contact Information</h2>
              <p className="contact-intro">
                Directly connect with the creators of PROTINUT™. We respond to every inquiry within 24 hours.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <span className="detail-icon">📍</span>
                  <div>
                    <strong>Manufacturing & HQ:</strong>
                    <p>Dharashiv, Maharashtra, India — 413501</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="detail-icon">📧</span>
                  <div>
                    <strong>Email Us:</strong>
                    <p>support@protinut.in / contact@protinut.in</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="detail-icon">📞</span>
                  <div>
                    <strong>Phone / WhatsApp:</strong>
                    <p>+91 98765 43210 (Mon – Sat, 9:00 AM – 7:00 PM)</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <span className="detail-icon">🛡️</span>
                  <div>
                    <strong>Food Safety & Standards:</strong>
                    <p>FSSAI Central Lic. No. 10020021000123</p>
                  </div>
                </div>
              </div>

              <div className="contact-perks-box">
                <h4>🤝 Wholesale & Gym Partnerships</h4>
                <p>Looking to stock PROTINUT™ at your fitness studio, café, or retail store? Email us with subject "B2B Partnership".</p>
              </div>
            </div>

            {/* Right: Interactive Form */}
            <div className="contact-form-card">
              <h2>Send Us A Message</h2>
              {submitted ? (
                <div className="contact-success-alert">
                  ✓ Thank you! Your message has been sent successfully. Our team will contact you shortly.
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Message / Inquiry *</label>
                    <textarea
                      rows="4"
                      placeholder="Tell us what you'd like to ask or share..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-contact-submit">
                    SEND MESSAGE →
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
