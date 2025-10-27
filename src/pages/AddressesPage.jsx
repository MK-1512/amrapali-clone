// src/pages/AddressesPage.jsx
import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const AddressesPage = ({ setPage }) => {
    // Get addresses and functions from context
    const { userAddresses = [], deleteAddress, setDefaultAddress } = useContext(AuthContext);

    // Find the default address
    const defaultAddress = userAddresses.find(addr => addr.isDefault);
    // Get other addresses
    const otherAddresses = userAddresses.filter(addr => !addr.isDefault);

    const handleEdit = (e, addressId) => {
        e.preventDefault();
        setPage(`edit-address-${addressId}`); // Navigate to the edit form page
    };

    const handleDelete = (e, addressId) => {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this address?')) {
            try {
                deleteAddress(addressId); // Call context function to delete
                 console.log(`Address ${addressId} deleted.`);
            } catch (err) {
                 console.error("Error deleting address:", err);
                 alert("Failed to delete address. Please try again.");
            }
        }
    };

    const handleAddNew = () => {
         setPage('add-address'); // Navigate to the add form page
    };

    const handleSetDefault = (addressId) => {
        try {
            setDefaultAddress(addressId); // Call context function
        } catch (err) {
            console.error("Error setting default address:", err);
            alert("Failed to set default address. Please try again.");
        }
    }

    // Helper to display address details
    const renderAddress = (address) => (
        <div className="address-display mb-2">
            <p className="mb-0"><strong>{`${address.firstName || ''} ${address.lastName || ''}`.trim()}</strong></p>
            {address.address1 && <p className="mb-0">{address.address1}</p>}
            {address.address2 && <p className="mb-0">{address.address2}</p>}
            <p className="mb-0">{`${address.city || ''}${address.city && (address.state || address.pincode) ? ', ' : ''}${address.state || ''} ${address.pincode || ''}`.trim().replace(/, $/, '')}</p>
            <p className="mb-0">{address.country || ''}</p>
            {address.phone && <p className="mb-0">Phone: {address.phone}</p>}
        </div>
    );

    return (
        <Container className="addresses-page-container my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    {/* Back Link */}
                    <Button
                        variant="link"
                        onClick={() => setPage('account')}
                        className="back-to-account-link mb-4"
                    >
                        &lt; BACK TO ACCOUNT
                    </Button>

                    <h1 className="addresses-page-title mb-4">MY ADDRESSES</h1>

                    {/* Add New Address Button */}
                    <div className="text-end mb-4">
                        <Button
                            variant="outline-dark"
                            className="btn-add-address"
                            onClick={handleAddNew}
                        >
                            ADD A NEW ADDRESS
                        </Button>
                    </div>

                    {/* Default Address Section */}
                    {defaultAddress && (
                        <div className="default-address-section mb-4">
                            <h2 className="address-section-subtitle">DEFAULT ADDRESS</h2>
                            {renderAddress(defaultAddress)}
                            <div className="address-actions">
                                <Button variant="link" onClick={(e) => handleEdit(e, defaultAddress.id)} className="address-action-link">Edit</Button>
                                
                                {/* --- FIX: Removed conditional logic --- */}
                                <Button variant="link" onClick={(e) => handleDelete(e, defaultAddress.id)} className="address-action-link">Delete</Button>
                                {/* --- END FIX --- */}
                            </div>
                        </div>
                    )}

                    {/* Other Addresses Section */}
                    {otherAddresses.length > 0 && (
                        <div className="other-addresses-section">
                           {/* Only show title if there was also a default address */}
                           {defaultAddress && <h2 className="address-section-subtitle">OTHER ADDRESSES</h2>}
                            {otherAddresses.map(address => (
                                <div key={address.id} className="address-entry mb-4 border-top pt-3">
                                    {renderAddress(address)}
                                    <div className="address-actions">
                                        <Button variant="link" onClick={(e) => handleEdit(e, address.id)} className="address-action-link">Edit</Button>
                                        <Button variant="link" onClick={(e) => handleDelete(e, address.id)} className="address-action-link">Delete</Button>
                                        <Button variant="link" onClick={() => handleSetDefault(address.id)} className="address-action-link">Set as Default</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Show message if no addresses exist */}
                    {userAddresses.length === 0 && (
                         <p className="text-muted text-center mt-5">You have no saved addresses.</p>
                    )}

                </Col>
            </Row>
        </Container>
    );
};

export default AddressesPage;