import React, { useState } from 'react';

// A new sub-component for the star rating input
const StarRatingInput = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="star-rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={(hoverRating || rating) >= star ? 'filled' : ''}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};


// A new sub-component for the form itself
const WriteReviewForm = ({ onCancel }) => {
    const [rating, setRating] = useState(0);
    
    return (
        <div className="write-review-form">
            <div className="review-form-group">
                <label htmlFor="review-name">Name</label>
                <input type="text" id="review-name" className="review-form-input" placeholder="Enter your name (public)" />
            </div>
             <div className="review-form-group">
                <label htmlFor="review-email">Email</label>
                <input type="email" id="review-email" className="review-form-input" placeholder="Enter your email (private)" />
            </div>
             <div className="review-form-group">
                <label>Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
            </div>
             <div className="review-form-group">
                <label htmlFor="review-title">Review Title</label>
                <input type="text" id="review-title" className="review-form-input" placeholder="Give your review a title" />
            </div>
             <div className="review-form-group">
                <label htmlFor="review-body">Review</label>
                <textarea id="review-body" className="review-form-textarea" placeholder="Write your comments here"></textarea>
            </div>
            <div className="review-form-group">
                <label>Picture/Video (optional)</label>
                <div className="image-upload-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </div>
            </div>
            <p className="privacy-notice">
                How we use your data: We'll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me's terms, privacy and content policies.
            </p>
            <button className="submit-review-btn">Submit Review</button>
        </div>
    );
};


const CustomerReviews = () => {
  const reviewData = {
    totalReviews: 1,
    averageRating: 5,
    breakdown: [
      { stars: 5, percentage: 100, count: 1 },
      { stars: 4, percentage: 0, count: 0 },
      { stars: 3, percentage: 0, count: 0 },
      { stars: 2, percentage: 0, count: 0 },
      { stars: 1, percentage: 0, count: 0 },
    ],
  };

  // State to control the visibility of the review form
  const [isWritingReview, setIsWritingReview] = useState(false);

  return (
    <div className="customer-reviews-container">
      <div className="reviews-header">
        <div className="summary">
          <h4>Customer Reviews</h4>
          <div className="summary-rating">
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < reviewData.averageRating ? 'filled' : ''}>★</span>
              ))}
            </div>
            <span>Based on {reviewData.totalReviews} review</span>
          </div>
        </div>
        <button 
          className="write-review-btn"
          onClick={() => setIsWritingReview(!isWritingReview)}
        >
          {isWritingReview ? 'Cancel review' : 'Write a review'}
        </button>
      </div>
      
      {/* This wrapper handles the slide animation */}
      <div className={`review-form-wrapper ${isWritingReview ? 'open' : ''}`}>
        <WriteReviewForm onCancel={() => setIsWritingReview(false)} />
      </div>

      <div className="reviews-body">
        <div className="row">
          <div className="col-md-7">
            <div className="reviews-breakdown">
              {reviewData.breakdown.map((item) => (
                <div className="rating-row" key={item.stars}>
                  <div className="star-label">
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < item.stars ? 'filled' : ''}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <div className="percentage-label">{item.percentage}%</div>
                  <div className="count-label">({item.count})</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 d-flex justify-content-end align-items-start">
             <div className="reviews-sort">
                <select>
                    <option>Most Recent</option>
                    <option>Highest Rating</option>
                    <option>Lowest Rating</option>
                    <option>Only Pictures</option>
                    <option>Pictures First</option>
                    <option>Videos First</option>
                    <option>Most Helpful</option>
                </select>
            </div>
          </div>
        </div>
        <div className="reviews-list">
          <div className="review-card">
            <div className="author-avatar">S</div>
            <div className="review-content">
              <div className="author-rating-verified">
                <div className="star-rating">
                  <span className="filled">★</span><span className="filled">★</span><span className="filled">★</span><span className="filled">★</span><span className="filled">★</span>
                </div>
                <div className="verified-badge">Verified</div>
              </div>
              <div className="author-details">
                <strong>Sumalta Azraa</strong> on <strong>10/22/2022</strong>
              </div>
              <h5>E gift card</h5>
              <p>
                It really served it's purpose. I am really happy with the sarees, the e gift card and the services 🥰
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;

