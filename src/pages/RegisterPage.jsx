import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = ({ setPage }) => {
  const { register } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const result = register(firstName, lastName, email, password);

    if (result.success) {
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        setPage('login');
      }, 1500);
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page-container container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="register-title text-center mb-4">REGISTER</h1>
          <p className="register-subtitle text-center mb-4">Please fill in the information below:</p>
          {error && <p className="text-danger text-center mb-3">{error}</p>}
          {success && <p className="text-success text-center mb-3">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control register-input"
                id="registerFirstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control register-input"
                id="registerLastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control register-input"
                id="registerEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control register-input"
                id="registerPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-register w-100 mb-3">
              CREATE MY ACCOUNT
            </button>
          </form>
          <p className="text-center back-to-login-text mt-3">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;