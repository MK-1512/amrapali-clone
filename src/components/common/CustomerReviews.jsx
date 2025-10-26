// src/components/common/CustomerReviews.jsx
import React, { useState, useRef } from 'react'; // <-- Import useRef

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
    // --- 1. Add state for all form fields ---
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [file, setFile] = useState(null); // State to hold the selected file
    const [error, setError] = useState(''); // State for error messages
    const [success, setSuccess] = useState(''); // State for success message
    
    // --- 2. Create a ref for the hidden file input ---
    const fileInputRef = useRef(null);

    // --- 3. Handler to trigger file input click ---
    const handleImageUploadClick = () => {
        fileInputRef.current.click(); // Programmatically click the hidden file input
    };

    // --- 4. Handler for when a file is selected ---
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log("File selected:", selectedFile.name);
            setFile(selectedFile); // Store the file object in state
        }
    };
    
    // --- 5. Handler for form submission ---
    const handleSubmitReview = (e) => {
        e.preventDefault(); // Prevent default form submission
        setError('');
        setSuccess('');

        // --- Basic Validation ---
        if (!name || !email || !title || !reviewBody || rating === 0) {
            setError('Please fill in all required fields (Name, Email, Rating, Title, Review).');
            return;
        }

        // --- Simulate Submission ---
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
        
        // Optional: Hide the form after submission
        // setTimeout(() => {
        //     if(onCancel) onCancel();
        // }, 2000);
    };

    return (
        <div className="write-review-form">
            {/* --- 6. Attach onSubmit handler to a <form> element --- */}
            <form onSubmit={handleSubmitReview}>
                {/* --- Display Error/Success Messages --- */}
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
                    ></textarea>
                </div>
                <div className="review-form-group">
                    <label>Picture/Video (optional)</label>
                    {/* --- 7. Make the placeholder clickable --- */}
                    <div 
                        className="image-upload-placeholder" 
                        onClick={handleImageUploadClick} // <-- Add click handler
                        role="button"
                        tabIndex="0"
                        onKeyPress={(e) => e.key === 'Enter' && handleImageUploadClick()} // For accessibility
                    >
                        {/* --- Display file name if selected --- */}
                        {file ? (
                            <span style={{fontSize: '12px', color: '#555', padding: '10px', textAlign: 'center'}}>{file.name}</span>
                        ) : (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        )}
                    </div>
                    {/* --- 8. Add the hidden file input --- */}
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
                {/* --- 9. Change button type to "submit" --- */}
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