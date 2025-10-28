// src/components/common/CustomerReviews.jsx
import React, { useState, useRef } from 'react';

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
                    style={{ cursor: 'pointer', transition: 'color 0.2s ease', fontSize: '24px', color: (hoverRating || rating) >= star ? '#ffb3ba' : '#e0e0e0' }} // Added inline styles for stars
                >
                    ★
                </span>
            ))}
        </div>
    );
};


// A new sub-component for the form itself
const WriteReviewForm = ({ onCancel }) => {
    // State for all form fields
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [file, setFile] = useState(null); // State to hold the selected file
    const [error, setError] = useState(''); // State for error messages
    const [success, setSuccess] = useState(''); // State for success message

    // Create a ref for the hidden file input
    const fileInputRef = useRef(null);

    // Handler to trigger file input click
    const handleImageUploadClick = () => {
        fileInputRef.current.click(); // Programmatically click the hidden file input
    };

    // Handler for when a file is selected
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log("File selected:", selectedFile.name);
            setFile(selectedFile); // Store the file object in state
        }
    };

    // Handler for form submission
    const handleSubmitReview = (e) => {
        e.preventDefault(); // Prevent default form submission
        setError('');
        setSuccess('');

        // Basic Validation
        if (!name || !email || !title || !reviewBody || rating === 0) {
            setError('Please fill in all required fields (Name, Email, Rating, Title, Review).');
            return;
        }

        // Simulate Submission
        console.log("Submitting review with the following data:");
        console.log({ name, email, rating, title, reviewBody });
        if (file) {
            console.log("Including file:", file.name);
        }

        // Show success message and clear form (simulating a real submission)
        setSuccess('Thank you! Your review has been submitted for moderation.');

        // Clear the form
        setName('');
        setEmail('');
        setTitle('');
        setReviewBody('');
        setRating(0);
        setFile(null);
        if (fileInputRef.current) {
             fileInputRef.current.value = ""; // Reset file input
        }

        // Optional: Hide the form after submission after a delay
        // setTimeout(() => {
        //     if(onCancel) onCancel();
        // }, 2000);
    };

    return (
        <div className="write-review-form">
            {/* Attach onSubmit handler to a <form> element */}
            <form onSubmit={handleSubmitReview}>
                {/* Display Error/Success Messages */}
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
                        required // Added required
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
                        required // Added required
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
                        required // Added required
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
                        required // Added required
                    ></textarea>
                </div>
                <div className="review-form-group">
                    <label>Picture/Video (optional)</label>
                    {/* Make the placeholder clickable */}
                    <div
                        className="image-upload-placeholder"
                        onClick={handleImageUploadClick} // <-- Add click handler
                        role="button"
                        tabIndex="0"
                        onKeyPress={(e) => e.key === 'Enter' && handleImageUploadClick()} // For accessibility
                    >
                        {/* Display file name if selected */}
                        {file ? (
                            <span style={{fontSize: '12px', color: '#555', padding: '10px', textAlign: 'center', wordBreak: 'break-all'}}>{file.name}</span>
                        ) : (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        )}
                    </div>
                    {/* Add the hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // <-- Hide the default input
                        accept="image/*,video/*" // Specify acceptable file types
                    />
                </div>
                <p className="privacy-notice">
                    How we use your data: We'll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me's terms, privacy and content policies.
                </p>
                {/* Change button type to "submit" */}
                <button type="submit" className="submit-review-btn">Submit Review</button>
                {/* Optional Cancel Button */}
                {/* <button type="button" onClick={onCancel} style={{ marginLeft: '10px', background: 'none', border: '1px solid #ccc', color: '#555' }} className="submit-review-btn">Cancel</button> */}

            </form>
        </div>
    );
};


// Main CustomerReviews component
const CustomerReviews = () => {
  // Mock data (replace with actual data fetching if needed)
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
    // Add mock reviews if needed for display
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
        // Add more mock reviews here
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

      {/* Wrapper still controls visibility via CSS */}
      <div className={`review-form-wrapper ${isWritingReview ? 'open' : ''}`}>
        {/* --- FIX: Render WriteReviewForm UNCONDITIONALLY --- */}
        <WriteReviewForm onCancel={() => setIsWritingReview(false)} />
        {/* --- END FIX --- */}
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
          {/* Map through actual reviews data */}
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
          {/* Display message if no reviews */}
          {reviewData.reviews.length === 0 && (
            <p className="text-center text-muted mt-4">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;