// src/pages/AccountPage.jsx
import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

// Accept setPage and handleLogout props
const AccountPage = ({ setPage, handleLogout }) => {
  const { currentUser } = useContext(AuthContext);

  // Use optional chaining and nullish coalescing for safety
  const primaryAddress = currentUser?.addresses?.find(addr => addr.isDefault) ?? currentUser?.addresses?.[0] ?? null;

  const handleEditAddresses = () => {
    setPage('addresses'); // Navigate to the addresses management page
  };

  // Redirect if user somehow lands here without being logged in
  useEffect(() => {
    if (!currentUser) {
        setPage('login');
    }
  }, [currentUser, setPage]); // Add dependencies

  // Render null or a loading indicator while checking currentUser
  if (!currentUser) {
    return null; // Or <p>Loading...</p>
  }


  return (
    <Container className="account-page-container my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="account-page-title">MY ACCOUNT</h1>
          <p className="account-welcome-message">Welcome back, {currentUser.firstName}!</p>
        </Col>
      </Row>

      <Row>
        {/* Left Column: Orders & Logout */}
        <Col md={8} className="account-left-column">
          {/* Keep previous margin, but we'll add margin-top to the next element */}
          <Button variant="link" onClick={handleLogout} className="logout-link mb-4">
            LOGOUT
          </Button>

          {/* --- ADDED mt-5 (margin-top) TO MY ORDERS HEADING --- */}
          <h2 className="account-section-title mt-5">MY ORDERS</h2>
          {/* --- END spacing fix --- */}

          <p className="no-orders-message">You haven't placed any orders yet.</p>
          {/* Add order history rendering here later */}
        </Col>

        {/* Right Column: Primary Address */}
        <Col md={4} className="account-right-column">
          <h2 className="account-section-title">PRIMARY ADDRESS</h2>
          {primaryAddress ? (
            <div className="address-display">
              <p>{currentUser.firstName} {currentUser.lastName ?? ''}</p>
              {primaryAddress.company && <p>{primaryAddress.company}</p>}
              <p>{primaryAddress.address1}</p>
              {primaryAddress.address2 && <p>{primaryAddress.address2}</p>}
              <p>
                {primaryAddress.city ?? ''}{primaryAddress.city && primaryAddress.state ? ', ' : ''}{primaryAddress.state ?? ''} {primaryAddress.zip ?? ''}
              </p>
              <p>{primaryAddress.country ?? 'Unknown Country'}</p>
              {primaryAddress.phone && <p>{primaryAddress.phone}</p>}
            </div>
          ) : (
            <p className="no-address-message">No primary address set.</p>
          )}
          <Button
            variant="outline-dark"
            className="edit-addresses-btn"
            onClick={handleEditAddresses}
          >
            EDIT ADDRESSES
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;