// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react'; // Import useState and useContext
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const LoginPage = ({ setPage }) => {
  const { login } = useContext(AuthContext); // Get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const success = login(email, password); // Use context login

    if (success) {
      setPage('home'); // Redirect to home on successful login
    } else {
      setError('Invalid email or password. Please try again.'); // Show error message
    }
  };

  return (
    <div className="login-page-container container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="login-title text-center mb-4">LOGIN</h1>
          <p className="login-subtitle text-center mb-4">Please enter your e-mail and password:</p>
          {error && <p className="text-danger text-center mb-3">{error}</p>} {/* Display error */}
          <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
            <div className="mb-3">
              <input
                type="email"
                className="form-control login-input"
                id="loginEmail"
                placeholder="Email"
                value={email} // Control input value
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required // Add basic validation
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type="password"
                className="form-control login-input"
                id="loginPassword"
                placeholder="Password"
                value={password} // Control input value
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required // Add basic validation
              />
              {/* Forgot password link - functionality not implemented */}
              <a href="#" className="forgot-password-link">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-login w-100 mb-3">
              LOGIN
            </button>
          </form>
          <p className="text-center create-account-text">
            Don't have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('register'); }}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;