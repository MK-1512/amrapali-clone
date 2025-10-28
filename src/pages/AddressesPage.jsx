// src/pages/AddressesPage.jsx
import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import AddressModal from '../components/account/AddressModal'; // Import the modal

const AddressesPage = ({ setPage }) => {
  const { currentUser, addAddress, editAddress, deleteAddress, setDefaultAddress } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // null for adding, address object for editing
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // Store ID of address to delete

  const handleOpenAddModal = () => {
    setEditingAddress(null); // Ensure we're adding
    setShowModal(true);
  };

  const handleOpenEditModal = (address) => {
    setEditingAddress(address); // Set the address to edit
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAddress(null); // Clear editing state
  };

  const handleSaveAddress = (addressData) => {
    if (editingAddress) {
      editAddress({ ...editingAddress, ...addressData }); // Merge existing ID with new data
    } else {
      addAddress(addressData); // Add new address
    }
    handleCloseModal();
  };

  const handleDeleteClick = (addressId) => {
    setShowDeleteConfirm(addressId); // Show confirmation for this ID
  };

  const handleConfirmDelete = () => {
    if (showDeleteConfirm) {
      deleteAddress(showDeleteConfirm);
    }
    setShowDeleteConfirm(null); // Close confirmation
  };

  // --- Simple Confirmation Dialog (Replace with a styled modal later if desired) ---
  const DeleteConfirmationDialog = () => {
    if (!showDeleteConfirm) return null;
    const addressToDelete = currentUser.addresses.find(addr => addr.id === showDeleteConfirm);

    return (
       <div className="delete-confirm-overlay"> {/* Basic overlay */}
           <div className="delete-confirm-dialog"> {/* Basic dialog box */}
               <h4>Delete Address?</h4>
               <p>Are you sure you wish to delete this address?</p>
               <pre style={{ fontSize: '12px', textAlign: 'left', background: '#f5f5f5', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                   {addressToDelete?.firstName} {addressToDelete?.lastName}<br />
                   {addressToDelete?.address1}<br />
                   {addressToDelete?.city}, {addressToDelete?.state} {addressToDelete?.zip}<br />
                   {addressToDelete?.country}
               </pre>
               <div className="d-flex justify-content-end gap-2 mt-3">
                   <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
                   <Button variant="danger" onClick={handleConfirmDelete}>OK</Button>
               </div>
           </div>
       </div>
    );
  };


  return (
    <>
      <Container className="addresses-page-container my-5">
        <Button variant="link" onClick={() => setPage('account')} className="back-link">
          &lt; Back to Account
        </Button>
        <h1 className="addresses-page-title">MY ADDRESSES</h1>

        <Button variant="dark" className="add-address-btn mb-4" onClick={handleOpenAddModal}>
          ADD A NEW ADDRESS
        </Button>

        {currentUser?.addresses && currentUser.addresses.length > 0 ? (
          currentUser.addresses.map((address) => (
            <div key={address.id} className="address-entry mb-4">
              <Row>
                <Col>
                  {address.isDefault && <span className="default-address-tag">DEFAULT</span>}
                  <p className="address-name">{address.firstName} {address.lastName}</p>
                  {address.company && <p>{address.company}</p>}
                  <p>{address.address1}</p>
                  {address.address2 && <p>{address.address2}</p>}
                  <p>{address.city}, {address.state} {address.zip}</p>
                  <p>{address.country}</p>
                  {address.phone && <p>{address.phone}</p>}
                </Col>
                <Col xs="auto" className="address-actions">
                  <Button variant="link" onClick={() => handleOpenEditModal(address)}>Edit</Button>
                  <Button variant="link" onClick={() => handleDeleteClick(address.id)}>Delete</Button>
                  {!address.isDefault && (
                    <Button variant="link" onClick={() => setDefaultAddress(address.id)}>Set as Default</Button>
                  )}
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <p>You have no saved addresses.</p>
        )}
      </Container>

      {/* Render the Add/Edit Modal */}
      <AddressModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAddress}
        addressData={editingAddress} // Pass current address data for editing, or null for adding
        setDefaultAddress={setDefaultAddress} // Pass function to handle default change
      />

      {/* Render the Delete Confirmation */}
      <DeleteConfirmationDialog />
    </>
  );
};

export default AddressesPage;