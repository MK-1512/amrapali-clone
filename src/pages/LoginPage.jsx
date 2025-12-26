import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = ({ setPage }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);

    if (success) {
      setPage('home');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page-container container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="login-title text-center mb-4">LOGIN</h1>
          <p className="login-subtitle text-center mb-4">Please enter your e-mail and password:</p>
          {error && <p className="text-danger text-center mb-3">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control login-input"
                id="loginEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type="password"
                className="form-control login-input"
                id="loginPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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