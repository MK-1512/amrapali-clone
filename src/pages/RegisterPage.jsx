// src/pages/RegisterPage.jsx
import React from 'react';

const RegisterPage = ({ setPage }) => {
  return (
    <div className="register-page-container container my-5"> {/* Use a similar container class */}
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="register-title text-center mb-4">REGISTER</h1> {/* Title class */}
          <p className="register-subtitle text-center mb-4">Please fill in the information below:</p> {/* Subtitle class */}
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control register-input" /* Input class */
                id="registerFirstName"
                placeholder="First name"
              />
            </div>
             <div className="mb-3">
              <input
                type="text"
                className="form-control register-input" /* Input class */
                id="registerLastName"
                placeholder="Last name"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control register-input" /* Input class */
                id="registerEmail"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control register-input" /* Input class */
                id="registerPassword"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-register w-100 mb-3"> {/* Button class */}
              CREATE MY ACCOUNT
            </button>
          </form>
           {/* Optional: Add link back to login */}
           <p className="text-center back-to-login-text mt-3">
                Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); setPage('login');}}>Login</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;