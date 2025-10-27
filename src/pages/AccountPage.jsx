// src/pages/AccountPage.jsx
import React, { useContext } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const AccountPage = ({ setPage }) => {
   const { currentUser, logout, userAddresses = [] } = useContext(AuthContext); // Get addresses

    const orders = []; // Placeholder
    const primaryAddress = userAddresses.find(addr => addr.isDefault) || userAddresses[0] || null;

    const handleLogout = () => {
        logout();
        setPage('home');
    };

    // Helper to display address snippet
   const renderAddressSnippet = (address) => {
       if (!address) return <p className="text-muted">No default address set.</p>;
       return (
           <div className="address-details mb-3">
               <p className="mb-0"><strong>{`${address.firstName || ''} ${address.lastName || ''}`.trim()}</strong></p>
               {address.address1 && <p className="mb-0">{address.address1}</p>}
               {address.city && <p className="mb-0">{`${address.city}${address.city && address.pincode ? ',' : ''} ${address.pincode || ''}`.trim().replace(/, $/, '')}</p>}
               <p className="mb-0">{address.country || ''}</p>
           </div>
       );
   };

    return (
        <Container className="account-page-container my-5">
            <Row>
                {/* Left Sidebar */}
                <Col md={3}>
                    <Nav className="flex-column account-sidebar mb-4 mb-md-0">
                        <Nav.Link as="button" onClick={handleLogout} className="account-logout-link">
                            LOGOUT
                        </Nav.Link>
                    </Nav>
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    <h1 className="account-page-title">MY ACCOUNT</h1>
                    <p className="account-welcome-message mb-5">
                        Welcome back, {currentUser?.firstName || 'User'}!
                    </p>

                    {/* Orders Section */}
                    <div className="account-section mb-5">
                        <h2 className="account-section-title">MY ORDERS</h2>
                        {orders.length === 0 ? ( <p className="text-muted">You haven't placed any orders yet.</p> ) : ( <p>Order history will appear here.</p> )}
                    </div>

                    {/* Address Section */}
                    <div className="account-section">
                        <h2 className="account-section-title">PRIMARY ADDRESS</h2>
                       {renderAddressSnippet(primaryAddress)}
                        <Button
                            variant="outline-dark"
                            className="btn-edit-addresses"
                            onClick={() => setPage('addresses')}
                        >
                           VIEW ADDRESSES ({userAddresses.length}) {/* Show count */}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountPage;