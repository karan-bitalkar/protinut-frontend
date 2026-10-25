import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { initialReviewsByProduct } from './reviewsData';
import toast from 'react-hot-toast';
import './ProductReviewSection.css';

const ProductReviewSection = ({ productId = 'classy-crunch', productName = 'Peanut Butter Classy Crunch' }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve initial reviews dataset
  const baseData = initialReviewsByProduct[productId] || initialReviewsByProduct['classy-crunch'];

  const [reviewsList, setReviewsList] = useState(baseData.reviews);
  const [totalReviewsCount, setTotalReviewsCount] = useState(baseData.totalReviews);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Review Form State
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [attachedPhoto, setAttachedPhoto] = useState(null);

  // Rating labels for interactive stars
  const ratingLabels = {
    1: 'Poor — Did not like it',
    2: 'Fair — Below expectations',
    3: 'Average — It is okay',
    4: 'Good — Very tasty',
    5: 'Excellent — Loved it!'
  };

  // Open "Rate & Review" handler with strict Login Requirement
  const handleOpenWriteReview = () => {
    if (!isAuthenticated) {
      toast.error('Please login to write a review', {
        id: 'auth-review-toast',
        duration: 3500,
        style: {
          background: '#2b1810',
          color: '#ffffff',
          borderRadius: '12px',
          border: '1.5px solid #ef5323',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          fontWeight: 700
        }
      });
      const redirectUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${redirectUrl}`);
      return;
    }
    setIsWriteModalOpen(true);
  };

  // Submit review handler
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      toast.error('Please enter a review headline', { id: 'review-title-error' });
      return;
    }

    if (!formDescription.trim()) {
      toast.error('Please share your thoughts in the review body', { id: 'review-desc-error' });
      return;
    }

    const newReview = {
      id: `rev-user-${Date.now()}`,
      userName: user?.name || 'Verified Customer',
      userRole: 'Verified Buyer',
      avatarInitial: user?.name ? user.name.charAt(0).toUpperCase() : 'U',
      avatarBg: '#ef5323',
      verified: true,
      date: 'Just Now',
      rating: formRating,
      title: formTitle.trim(),
      text: formDescription.trim(),
      helpfulYes: 1,
      helpfulNo: 0,
      userVoted: 'yes',
      photo: attachedPhoto
    };

    // Prepend new review to the top of list
    setReviewsList((prev) => [newReview, ...prev]);
    setTotalReviewsCount((prev) => prev + 1);

    // Reset and close form
    setFormTitle('');
    setFormDescription('');
    setFormRating(5);
    setAttachedPhoto(null);
    setIsWriteModalOpen(false);

    toast.success('Thank you! Your review has been submitted.', {
      duration: 4000,
      style: {
        background: '#15803d',
        color: '#ffffff',
        borderRadius: '12px',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '13px',
        fontWeight: 700
      }
    });
  };

  // Helpful voting handler
  const handleVoteHelpful = (reviewId, type) => {
    setReviewsList((prev) =>
      prev.map((r) => {
        if (r.id !== reviewId) return r;
        if (r.userVoted === type) return r; // already voted this

        let yes = r.helpfulYes;
        let no = r.helpfulNo;

        if (r.userVoted === 'yes') yes -= 1;
        if (r.userVoted === 'no') no -= 1;

        if (type === 'yes') yes += 1;
        if (type === 'no') no += 1;

        return { ...r, helpfulYes: yes, helpfulNo: no, userVoted: type };
      })
    );

    toast.success('Thanks for your feedback!', {
      id: 'helpful-vote-toast',
      duration: 2000,
      style: {
        background: '#2b1810',
        color: '#ffffff',
        borderRadius: '10px',
        fontSize: '12px'
      }
    });
  };

  const handleSimulatedPhotoUpload = () => {
    setAttachedPhoto('/products/classy-crunch.png');
    toast.success('Product photo attached!', {
      duration: 2500,
      style: {
        background: '#15803d',
        color: '#ffffff',
        borderRadius: '10px',
        fontSize: '12px'
      }
    });
  };

  return (
    <section className="product-reviews-section" id="reviews-section" aria-label="Customer Reviews & Ratings">
      <div className="reviews-section-container">
        
        {/* Section Header */}
        <div className="reviews-header-row">
          <div>
            <span className="reviews-badge">VERIFIED CUSTOMER FEEDBACK</span>
            <h2 className="reviews-title">Ratings & Customer Reviews</h2>
            <p className="reviews-subtitle">Real experiences from real fitness enthusiasts and families across India.</p>
          </div>

          {/* Prominent Write Review Button */}
          <button
            type="button"
            className="btn-rate-and-review"
            onClick={handleOpenWriteReview}
          >
            <span className="pen-icon">✍️</span> Rate & Review this Product
          </button>
        </div>

        {/* ── 1. RATINGS SUMMARY (TOP) ── */}
        <div className="ratings-summary-box">
          
          {/* Big Rating Block */}
          <div className="rating-overall-column">
            <span className="rating-big-number">{baseData.averageRating}</span>
            <div className="rating-stars-row">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-filled">★</span>
              ))}
            </div>
            <span className="rating-total-count">
              Based on <strong>{totalReviewsCount}</strong> verified reviews
            </span>
            <span className="recommendation-pill">
              🌿 98% of buyers recommend this jar
            </span>
          </div>

          {/* Star Distribution Bar Chart */}
          <div className="rating-bars-column">
            <h3 className="rating-breakdown-heading">Rating Breakdown</h3>
            <div className="distribution-bars-list">
              {[5, 4, 3, 2, 1].map((stars) => {
                const pct = baseData.distribution[stars] || 0;
                return (
                  <div key={stars} className="distribution-row">
                    <span className="star-level-label">{stars} ★</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: stars >= 4 ? '#ef5323' : stars === 3 ? '#f59e0b' : '#9ca3af'
                        }}
                      />
                    </div>
                    <span className="bar-percentage">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Purity & Quality Assurance Tag */}
          <div className="rating-assurance-column">
            <div className="assurance-card">
              <span className="assurance-icon">🛡️</span>
              <h4>100% Genuine Reviews</h4>
              <p>Every review is verified from real purchasers of PROTINUT™ jars in India.</p>
              <div className="assurance-points">
                <span>✓ Verified Purchase Tracking</span>
                <span>✓ Zero Paid Influencer Hype</span>
                <span>✓ FSSAI Certified Recipe</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── 2. CUSTOMER REVIEWS LIST ── */}
        <div className="customer-reviews-list-wrap">
          <div className="list-heading-bar">
            <h3>Showing {reviewsList.length} Community Reviews</h3>
            <span className="sort-hint">Sorted by: Most Relevant & Recent</span>
          </div>

          <div className="reviews-cards-stack">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="single-review-card">
                
                {/* Review Header: User Avatar, Name, Verified Badge & Date */}
                <div className="single-review-header">
                  <div
                    className="user-avatar-circle"
                    style={{ background: rev.avatarBg || '#ef5323' }}
                  >
                    {rev.avatarInitial || rev.userName.charAt(0)}
                  </div>

                  <div className="user-meta-info">
                    <div className="user-name-row">
                      <strong className="user-name">{rev.userName}</strong>
                      {rev.verified && (
                        <span className="verified-buyer-pill">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="user-role-city">{rev.userRole}</span>
                  </div>

                  <span className="review-date-badge">{rev.date}</span>
                </div>

                {/* Stars Rating Row */}
                <div className="review-stars-display">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < rev.rating ? 'star-gold' : 'star-muted'}
                    >
                      ★
                    </span>
                  ))}
                  <span className="rating-numeric-tag">{rev.rating}.0 / 5</span>
                </div>

                {/* Review Title & Text */}
                <h4 className="single-review-title">{rev.title}</h4>
                <p className="single-review-text">{rev.text}</p>

                {/* Optional Attached Photo */}
                {rev.photo && (
                  <div className="review-attached-photo">
                    <img src={rev.photo} alt="Customer upload" />
                    <span>Customer Photo</span>
                  </div>
                )}

                {/* Helpful Button Row */}
                <div className="review-footer-helpful-row">
                  <span className="helpful-question">Was this review helpful?</span>
                  
                  <div className="helpful-buttons-group">
                    <button
                      type="button"
                      className={`btn-helpful ${rev.userVoted === 'yes' ? 'voted' : ''}`}
                      onClick={() => handleVoteHelpful(rev.id, 'yes')}
                    >
                      <span>👍 Yes</span>
                      <span className="vote-count">({rev.helpfulYes})</span>
                    </button>

                    <button
                      type="button"
                      className={`btn-helpful ${rev.userVoted === 'no' ? 'voted' : ''}`}
                      onClick={() => handleVoteHelpful(rev.id, 'no')}
                    >
                      <span>👎 No</span>
                      <span className="vote-count">({rev.helpfulNo})</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── 3. WRITE A REVIEW MODAL / FORM ── */}
      {isWriteModalOpen && (
        <div className="write-review-backdrop" onClick={() => setIsWriteModalOpen(false)}>
          <div className="write-review-modal" onClick={(e) => e.stopPropagation()}>
            
            <div className="write-modal-header">
              <div>
                <span className="write-modal-badge">YOUR OPINION MATTERS</span>
                <h3 className="write-modal-title">Rate & Review {productName}</h3>
              </div>
              <button
                type="button"
                className="btn-close-write-modal"
                onClick={() => setIsWriteModalOpen(false)}
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="write-review-form">
              
              {/* Star Rating Selector */}
              <div className="form-group-rating">
                <label className="form-label">Overall Rating *</label>
                <div className="interactive-stars-picker">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`interactive-star-btn ${
                        (hoverRating || formRating) >= star ? 'active' : ''
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      aria-label={`${star} star`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-feedback-label">
                    {ratingLabels[hoverRating || formRating]}
                  </span>
                </div>
              </div>

              {/* Review Title Input */}
              <div className="form-group">
                <label htmlFor="review-title" className="form-label">
                  Review Headline *
                </label>
                <input
                  id="review-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Best crunchy texture, no oily separation!"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>

              {/* Review Description Textarea */}
              <div className="form-group">
                <label htmlFor="review-description" className="form-label">
                  Review Description *
                </label>
                <textarea
                  id="review-description"
                  className="form-textarea"
                  rows={4}
                  placeholder="Share details about the taste, roast, consistency, and how you enjoy it..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  maxLength={1000}
                  required
                />
              </div>

              {/* Add Photo Button (Dummy attachment) */}
              <div className="form-group-photo">
                <label className="form-label">Add Photo (Optional)</label>
                <div className="photo-upload-row">
                  <button
                    type="button"
                    className="btn-add-photo-dummy"
                    onClick={handleSimulatedPhotoUpload}
                  >
                    <span>📷 Upload Photo</span>
                  </button>
                  {attachedPhoto && (
                    <div className="photo-attached-preview">
                      <span>✓ 1 photo attached</span>
                      <button
                        type="button"
                        className="btn-remove-photo"
                        onClick={() => setAttachedPhoto(null)}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviewer Notice */}
              <div className="reviewer-posting-as">
                <span>Posting publicly as: <strong>{user?.name || 'Verified Customer'}</strong> (✓ Verified Buyer)</span>
              </div>

              {/* Submit Review Button */}
              <div className="form-actions-row">
                <button
                  type="button"
                  className="btn-cancel-review"
                  onClick={() => setIsWriteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit-review"
                >
                  Submit Review →
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};

export default ProductReviewSection;
