// src/pages/LoginPage.jsx
import React from 'react';

const LoginPage = ({ setPage }) => { // Ensure setPage is received as a prop
  return (
    <div className="login-page-container container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="login-title text-center mb-4">LOGIN</h1>
          <p className="login-subtitle text-center mb-4">Please enter your e-mail and password:</p>
          <form>
            {/* ... form inputs ... */}
             <div className="mb-3">
              <input
                type="email"
                className="form-control login-input"
                id="loginEmail"
                placeholder="Email"
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type="password"
                className="form-control login-input"
                id="loginPassword"
                placeholder="Password"
              />
               <a href="#" className="forgot-password-link">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-login w-100 mb-3">
              LOGIN
            </button>
          </form>
          <p className="text-center create-account-text">
            Don't have an account?{' '}
            {/* --- MODIFICATION START --- */}
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('register'); }}>
              Create one
            </a>
            {/* --- MODIFICATION END --- */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;