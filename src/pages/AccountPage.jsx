import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const AccountPage = ({ setPage, handleLogout }) => {
  const { currentUser } = useContext(AuthContext);

  const primaryAddress = currentUser?.addresses?.find(addr => addr.isDefault) ?? currentUser?.addresses?.[0] ?? null;

  const handleEditAddresses = () => {
    setPage('addresses');
  };

  useEffect(() => {
    if (!currentUser) {
        setPage('login');
    }
  }, [currentUser, setPage]);

  if (!currentUser) {
    return null;
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
        <Col md={8} className="account-left-column">
          <Button variant="link" onClick={handleLogout} className="logout-link mb-4">
            LOGOUT
          </Button>

          <h2 className="account-section-title mt-5">MY ORDERS</h2>

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