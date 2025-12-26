import React, { useState, useRef } from 'react';

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
                    style={{ cursor: 'pointer', transition: 'color 0.2s ease', fontSize: '24px', color: (hoverRating || rating) >= star ? '#ffb3ba' : '#e0e0e0' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};


const WriteReviewForm = ({ onCancel }) => {
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fileInputRef = useRef(null);

    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log("File selected:", selectedFile.name);
            setFile(selectedFile);
        }
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email || !title || !reviewBody || rating === 0) {
            setError('Please fill in all required fields (Name, Email, Rating, Title, Review).');
            return;
        }

        console.log("Submitting review with the following data:");
        console.log({ name, email, rating, title, reviewBody });
        if (file) {
            console.log("Including file:", file.name);
        }

        setSuccess('Thank you! Your review has been submitted for moderation.');

        setName('');
        setEmail('');
        setTitle('');
        setReviewBody('');
        setRating(0);
        setFile(null);
        if (fileInputRef.current) {
             fileInputRef.current.value = "";
        }

    };

    return (
        <div className="write-review-form">
            <form onSubmit={handleSubmitReview}>
                {error && <p className="text-danger text-center mb-3">{error}</p>}
                {success && <p className="text-success text-center mb-3">{success}</p>}

                <div className="review-form-group">
                    <label htmlFor="review-name">Name</label>
                    <input
                        type="text"
                        id="review-name"
                        className="review-form-input"
                        placeholder="Enter your name (public)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                 <div className="review-form-group">
                    <label htmlFor="review-email">Email</label>
                    <input
                        type="email"
                        id="review-email"
                        className="review-form-input"
                        placeholder="Enter your email (private)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                 <div className="review-form-group">
                    <label>Rating</label>
                    <StarRatingInput rating={rating} setRating={setRating} />
                </div>
                 <div className="review-form-group">
                    <label htmlFor="review-title">Review Title</label>
                    <input
                        type="text"
                        id="review-title"
                        className="review-form-input"
                        placeholder="Give your review a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                 <div className="review-form-group">
                    <label htmlFor="review-body">Review</label>
                    <textarea
                        id="review-body"
                        className="review-form-textarea"
                        placeholder="Write your comments here"
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="review-form-group">
                    <label>Picture/Video (optional)</label>
                    <div
                        className="image-upload-placeholder"
                        onClick={handleImageUploadClick}
                        role="button"
                        tabIndex="0"
                        onKeyPress={(e) => e.key === 'Enter' && handleImageUploadClick()}
                    >
                        {file ? (
                            <span style={{fontSize: '12px', color: '#555', padding: '10px', textAlign: 'center', wordBreak: 'break-all'}}>{file.name}</span>
                        ) : (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*,video/*"
                    />
                </div>
                <p className="privacy-notice">
                    How we use your data: We'll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me's terms, privacy and content policies.
                </p>
                <button type="submit" className="submit-review-btn">Submit Review</button>

            </form>
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
    reviews: [
        {
            id: 1,
            author: 'Sumalta Azraa',
            date: '10/22/2022',
            rating: 5,
            title: 'E gift card',
            body: "It really served it's purpose. I am really happy with the sarees, the e gift card and the services 🥰",
            verified: true,
            avatarInitial: 'S'
        }
    ]
  };

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
            <span>Based on {reviewData.totalReviews} review{reviewData.totalReviews !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <button
          className="write-review-btn"
          onClick={() => setIsWritingReview(!isWritingReview)}
        >
          {isWritingReview ? 'Cancel review' : 'Write a review'}
        </button>
      </div>

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
          {reviewData.reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="author-avatar">{review.avatarInitial || review.author.charAt(0)}</div>
              <div className="review-content">
                <div className="author-rating-verified">
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (<span key={i} className={i < review.rating ? 'filled' : ''}>★</span>))}
                  </div>
                  {review.verified && <div className="verified-badge">Verified</div>}
                </div>
                <div className="author-details">
                  <strong>{review.author}</strong> on <strong>{review.date}</strong>
                </div>
                <h5>{review.title}</h5>
                <p>{review.body}</p>
              </div>
            </div>
          ))}
          {reviewData.reviews.length === 0 && (
            <p className="text-center text-muted mt-4">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;