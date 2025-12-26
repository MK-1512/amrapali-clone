import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
    "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
];


const AddressModal = ({ show, handleClose, handleSave, addressData, setDefaultAddress }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    country: 'India',
    state: '',
    zip: '',
    isDefault: false,
  });

  useEffect(() => {
    if (addressData) {
      setFormData({
        id: addressData.id || undefined,
        firstName: addressData.firstName || '',
        lastName: addressData.lastName || '',
        company: addressData.company || '',
        phone: addressData.phone || '',
        address1: addressData.address1 || '',
        address2: addressData.address2 || '',
        city: addressData.city || '',
        country: addressData.country || 'India',
        state: addressData.state || '',
        zip: addressData.zip || '',
        isDefault: addressData.isDefault || false,
      });
    } else {
      setFormData({
        firstName: '', lastName: '', company: '', phone: '',
        address1: '', address2: '', city: '', country: 'India',
        state: '', zip: '', isDefault: false,
      });
    }
  }, [addressData, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="address-modal">
      <Modal.Header closeButton>
        <Modal.Title>{addressData ? 'EDIT ADDRESS' : 'ADD A NEW ADDRESS'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="First name" name="firstName" value={formData.firstName} onChange={handleChange} required className="address-form-control"/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange} required className="address-form-control"/>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Company (optional)" name="company" value={formData.company} onChange={handleChange} className="address-form-control"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="tel" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9\s\-()+]{7,20}" title="Enter a valid phone number" className="address-form-control"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Address 1" name="address1" value={formData.address1} onChange={handleChange} required className="address-form-control"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Address 2 (optional)" name="address2" value={formData.address2} onChange={handleChange} className="address-form-control"/>
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} required className="address-form-control"/>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Select name="country" value={formData.country} onChange={handleChange} required className="address-form-select">
                  <option value="India">India</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Zip code" name="zip" value={formData.zip} onChange={handleChange} required pattern="\d{5,6}" title="Enter a valid PIN or Zip code" className="address-form-control"/>
              </Form.Group>
            </Col>
          </Row>
           <Form.Group className="mb-3">
             <Form.Select name="state" value={formData.state} onChange={handleChange} required={formData.country === 'India'} className="address-form-select">
                 <option value="">State</option>
                 {formData.country === 'India' && indianStates.map(st => (<option key={st} value={st}>{st}</option>))}
             </Form.Select>
           </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="Set as default address"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              id="setDefaultAddressCheckbox"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              CANCEL
            </Button>
            <Button variant="primary" type="submit" className="save-address-submit-btn">
              {addressData ? 'UPDATE ADDRESS' : 'ADD A NEW ADDRESS'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddressModal;