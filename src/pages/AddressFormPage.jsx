// src/pages/AddressFormPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

// --- List of Indian States ---
const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const AddressFormPage = ({ setPage, addressId = null }) => {
    const { addAddress, updateAddress, userAddresses, currentUser, setDefaultAddress } = useContext(AuthContext);
    const isEditing = addressId !== null;
    
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', address1: '', address2: '', city: '',
        country: 'India', state: '', pincode: '', phone: '', isDefault: false,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            const addressToEdit = userAddresses.find(addr => addr.id === addressId);
            if (addressToEdit) {
                setFormData({
                    firstName: addressToEdit.firstName || '',
                    lastName: addressToEdit.lastName || '',
                    address1: addressToEdit.address1 || '',
                    address2: addressToEdit.address2 || '',
                    city: addressToEdit.city || '',
                    country: addressToEdit.country || 'India',
                    state: addressToEdit.state || '',
                    pincode: addressToEdit.pincode || '',
                    phone: addressToEdit.phone || '',
                    isDefault: addressToEdit.isDefault || false,
                });
            } else {
                setError('Address not found for editing.');
            }
        } else {
             // Pre-fill name from currentUser if adding new
             setFormData(prev => ({
                 ...prev,
                 firstName: currentUser?.firstName || '',
                 isDefault: userAddresses.length === 0 // Make default if it's the first address
             }));
        }
    }, [addressId, isEditing, userAddresses, currentUser]); // Rerun if any of these change

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (!formData.firstName || !formData.lastName || !formData.address1 || !formData.city || !formData.country || !formData.pincode || !formData.phone || (formData.country === 'India' && !formData.state)) {
            setError('Please fill in all required fields.');
            return;
        }

        const addressData = {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
        };

        try {
            if (isEditing) {
                updateAddress(addressId, addressData);
                // Note: updateAddress in context now handles default logic
            } else {
                addAddress(addressData);
                // Note: addAddress in context now handles default logic
            }
            setPage('addresses'); // Navigate back to the address list on success
        } catch (err) {
            console.error("Error saving address:", err);
            setError('Failed to save address. Please try again.');
        }
    };

    return (
        <Container className="address-form-page-container my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    {/* Back Link */}
                    <Button
                        variant="link"
                        onClick={() => setPage('addresses')} // Always go back to the list
                        className="back-to-account-link mb-4" // Reuse style
                    >
                        &lt; BACK TO ADDRESSES
                    </Button>

                    <h1 className="addresses-page-title mb-4"> {/* Reuse style */}
                        {isEditing ? 'EDIT ADDRESS' : 'ADD A NEW ADDRESS'}
                    </h1>

                    {error && <p className="text-danger mb-3">{error}</p>}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="First name" name="firstName" value={formData.firstName} onChange={handleChange} className="address-form-input" required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange} className="address-form-input" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                             <Form.Control type="text" placeholder="Address" name="address1" value={formData.address1} onChange={handleChange} className="address-form-input" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                             <Form.Control type="text" placeholder="Apartment, suite, etc. (optional)" name="address2" value={formData.address2} onChange={handleChange} className="address-form-input" />
                        </Form.Group>

                         <Form.Group className="mb-3">
                             <Form.Control type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} className="address-form-input" required />
                        </Form.Group>

                        <Row>
                             <Col md={6}>
                                 <Form.Group className="mb-3">
                                     <Form.Select name="country" value={formData.country} onChange={handleChange} className="address-form-input" required>
                                         <option value="India">India</option>
                                         <option value="USA">United States</option>
                                         <option value="UK">United Kingdom</option>
                                         {/* Add other countries if needed */}
                                     </Form.Select>
                                </Form.Group>
                            </Col>
                             <Col md={6}>
                                 <Form.Group className="mb-3">
                                     {formData.country === 'India' ? (
                                         <Form.Select name="state" value={formData.state} onChange={handleChange} className="address-form-input" required={formData.country === 'India'}>
                                             <option value="">State</option>
                                             {indianStates.map(st => (<option key={st} value={st}>{st}</option>))}
                                         </Form.Select>
                                     ) : (
                                         <Form.Control type="text" placeholder="State/Province" name="state" value={formData.state} onChange={handleChange} className="address-form-input" />
                                     )}
                                 </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="PIN code" name="pincode" value={formData.pincode} onChange={handleChange} className="address-form-input" required pattern="\d{5,10}" title="Enter a valid PIN or Zip code" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="tel" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} className="address-form-input" required pattern="[0-9\s\-()+]{7,20}" title="Enter a valid phone number" />
                                </Form.Group>
                             </Col>
                        </Row>

                        {/* Default Address Checkbox */}
                        {/* Hide checkbox if this is already the default address AND it's the only address */}
                        {!(formData.isDefault && userAddresses.length === 1)}
                        <Form.Group className="mb-4">
                            <Form.Check
                                type="checkbox"
                                label="Set as default address"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={handleChange}
                            />
                         </Form.Group>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between align-items-center">
                            <Button type="submit" variant="dark" className="btn-save-address">
                                {isEditing ? 'UPDATE ADDRESS' : 'ADD ADDRESS'}
                            </Button>
                            <Button variant="link" onClick={() => setPage('addresses')} className="address-action-link">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddressFormPage;