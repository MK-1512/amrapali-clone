// src/pages/CheckoutPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { CurrencyContext } from '../context/CurrencyContext';
import { formatPrice } from '../utils/currencyUtils';

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

// Accept setPage prop for navigation
const CheckoutPage = ({ setPage }) => {
    useEffect(() => {
        document.body.classList.add('checkout-active');
        return () => {
            document.body.classList.remove('checkout-active');
        };
    }, []);

    const { cartItems } = useContext(CartContext);
    const { selectedCurrency } = useContext(CurrencyContext);
    const [email, setEmail] = useState('');
    const [subscribe, setSubscribe] = useState(true);
    const [country, setCountry] = useState('India');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phone, setPhone] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [billingAddressOption, setBillingAddressOption] = useState('same');

    const subtotalINR = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const shippingCostINR = 0;
    const taxesINR = typeof subtotalINR === 'number' ? subtotalINR * 0.0156 : 0;
    const totalINR = typeof subtotalINR === 'number' ? subtotalINR + shippingCostINR + taxesINR : 0;
    const getFormattedPrice = (price) => formatPrice(price || 0, selectedCurrency.code || 'INR');

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        alert(`Submitting payment via ${paymentMethod} for ${getFormattedPrice(totalINR)} (Integration Pending)`);
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (setPage) {
            setPage('home');
        } else {
            console.error("setPage function not passed to CheckoutPage");
        }
    };

    const handleReturnToCart = (e) => {
        e.preventDefault();
        if (setPage) {
            setPage('shop');
        } else {
             console.error("setPage function not passed to CheckoutPage");
        }
    };

    return (
        <>
            <Container fluid className="checkout-container">
                <form onSubmit={handlePaymentSubmit}>
                    <Row className="justify-content-center">
                        {/* Left Column */}
                        <Col lg={6} md={7} className="mb-4">
                            <div className="checkout-header">
                                <a href="#" onClick={handleLogoClick}>
                                    <img src="/images/logo.png" alt="Amrapali" className="checkout-logo" />
                                </a>
                            </div>

                            {/* Contact Section */}
                            <div className="checkout-section">
                                <Row className="align-items-center mb-2">
                                     <Col><h2 className="checkout-section-title mb-0">Contact</h2></Col>
                                     <Col className="text-end">
                                        <span style={{fontSize: '13px', color: '#555'}}>
                                            Have an account? <a href="#" onClick={(e) => { e.preventDefault(); if (setPage) setPage('login');}} style={{color: '#1c1c1c', textDecoration:'underline'}}>Sign in</a>
                                        </span>
                                     </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="checkout-form-control" required />
                                </Form.Group>
                                <Form.Check type="checkbox" label="Email me with news and offers" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="checkout-form-check-label" id="subscribeCheckbox"/>
                            </div>

                            {/* Delivery Section */}
                            <div className="checkout-section">
                                <h2 className="checkout-section-title">Delivery</h2>
                                <Form.Group className="mb-3">
                                    <Form.Select className="checkout-form-select" value={country} onChange={(e) => setCountry(e.target.value)} required>
                                        <option value="India">India</option>
                                        {/* Add other countries if needed */}
                                    </Form.Select>
                                </Form.Group>
                                <Row>
                                    <Col md={6}><Form.Group className="mb-3"><Form.Control type="text" placeholder="First name" className="checkout-form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /></Form.Group></Col>
                                    <Col md={6}><Form.Group className="mb-3"><Form.Control type="text" placeholder="Last name" className="checkout-form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required /></Form.Group></Col>
                                </Row>
                                <Form.Group className="mb-3"><Form.Control type="text" placeholder="Address" className="checkout-form-control" value={address} onChange={(e) => setAddress(e.target.value)} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Control type="text" placeholder="Apartment, suite, etc. (optional)" className="checkout-form-control" value={apartment} onChange={(e) => setApartment(e.target.value)} /></Form.Group>
                                <Row>
                                    <Col md={4}><Form.Group className="mb-3"><Form.Control type="text" placeholder="City" className="checkout-form-control" value={city} onChange={(e) => setCity(e.target.value)} required /></Form.Group></Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Select className="checkout-form-select" value={state} onChange={(e) => setState(e.target.value)} required>
                                                <option value="">State</option>
                                                {country === 'India' && indianStates.map(st => (<option key={st} value={st}>{st}</option>))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}><Form.Group className="mb-3"><Form.Control type="text" placeholder="PIN code" className="checkout-form-control" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required pattern="\d{5,6}" title="Enter a valid PIN or Zip code" /></Form.Group></Col>
                                </Row>
                                <Form.Group className="mb-3"><Form.Control type="tel" placeholder="Phone" className="checkout-form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="[0-9\s\-()+]{7,20}" title="Enter a valid phone number" /></Form.Group>
                                <Form.Check type="checkbox" label="Save this information for next time" id="saveInfoCheckbox"/>
                            </div>

                            {/* Shipping Method Section */}
                            <div className="checkout-section">
                                <h2 className="checkout-section-title">Shipping method</h2>
                                { !address || !city || !state || !pinCode || !country ? (
                                     <p style={{fontSize: '14px', color: '#777'}}>Enter your shipping address to view available shipping methods.</p>
                                ) : (
                                    <div className="d-flex justify-content-between align-items-center p-3 border rounded bg-light">
                                         <Form.Check type="radio" id="freeShipping" name="shippingMethod" defaultChecked readOnly className="m-0">
                                            <Form.Check.Input type="radio" defaultChecked readOnly className="me-2"/>
                                            <Form.Check.Label style={{fontSize: '14px', fontWeight: '500'}}>Free Shipping</Form.Check.Label>
                                         </Form.Check>
                                         <span style={{fontSize: '14px', fontWeight:'500'}}>Free</span>
                                    </div>
                                )}
                            </div>

                            {/* Payment Section */}
                            <div className="checkout-section">
                                <h2 className="checkout-section-title">Payment</h2>
                                <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px' }}>All transactions are secure and encrypted.</p>
                                <div className="payment-method mb-2">
                                    <Form.Check type="radio" id="razorpay" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <Form.Check.Input type="radio" />
                                        <Form.Check.Label>
                                            <span className="payment-method-title">Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)</span>
                                            {/* --- *** UPDATED ICON URLS *** --- */}
                                            <span className="payment-icons">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png" alt="UPI" title="UPI" style={{ height: '18px' }}/> {/* Adjusted height */}
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1280px-Visa_Inc._logo.svg.png" alt="Visa" title="Visa"/>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png" alt="Mastercard" title="Mastercard"/>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1280px-American_Express_logo_%282018%29.svg.png" alt="American Express" title="American Express"/>
                                                <span style={{ fontSize: '11px', color: '#777' }}>+17</span>
                                            </span>
                                            {/* --- *** END URL UPDATE *** --- */}
                                        </Form.Check.Label>
                                    </Form.Check>
                                    {paymentMethod === 'razorpay' && (
                                        <div className="text-center mt-3 p-3 bg-light border rounded">
                                            <p style={{ fontSize: '12px', color: '#555' }}>After clicking “Pay now”, you will be redirected to Razorpay Secure to complete your purchase securely.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="payment-method">
                                    <Form.Check type="radio" id="cashfree" name="paymentMethod" value="cashfree" checked={paymentMethod === 'cashfree'} onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <Form.Check.Input type="radio" />
                                        <Form.Check.Label>
                                            <span className="payment-method-title">Cashfree Payments (UPI,Cards,Wallets,NetBanking)</span>
                                            {/* --- *** UPDATED ICON URLS *** --- */}
                                            <span className="payment-icons">
                                                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png" alt="UPI" title="UPI" style={{ height: '18px' }}/> {/* Adjusted height */}
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1280px-Visa_Inc._logo.svg.png" alt="Visa" title="Visa"/>
                                                {/* Add more icons as needed */}
                                                <span style={{ fontSize: '11px', color: '#777' }}>+10</span>
                                            </span>
                                             {/* --- *** END URL UPDATE *** --- */}
                                        </Form.Check.Label>
                                    </Form.Check>
                                    {paymentMethod === 'cashfree' && (
                                         <div className="text-center mt-3 p-3 bg-light border rounded">
                                             <p style={{ fontSize: '12px', color: '#555' }}>After clicking “Pay now”, you will be redirected to Cashfree Payments to complete your purchase securely.</p>
                                         </div>
                                    )}
                                </div>
                            </div>

                            {/* Billing Address Section */}
                            <div className="checkout-section">
                                <h2 className="checkout-section-title">Billing address</h2>
                                <p style={{ fontSize: '13px', color: '#777', marginBottom: '15px' }}>Select the address that matches your card or payment method.</p>
                                <div className="billing-address-options">
                                    <div className={`billing-address-option ${billingAddressOption === 'same' ? 'selected' : ''}`}>
                                        <Form.Check type="radio" name="billingAddress" id="billingSame" value="same" checked={billingAddressOption === 'same'} onChange={(e) => setBillingAddressOption(e.target.value)}>
                                            <Form.Check.Input type="radio" />
                                            <Form.Check.Label>Same as shipping address</Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                    <div className={`billing-address-option ${billingAddressOption === 'different' ? 'selected' : ''}`}>
                                        <Form.Check type="radio" name="billingAddress" id="billingDifferent" value="different" checked={billingAddressOption === 'different'} onChange={(e) => setBillingAddressOption(e.target.value)}>
                                            <Form.Check.Input type="radio" />
                                            <Form.Check.Label>Use a different billing address</Form.Check.Label>
                                        </Form.Check>
                                        {billingAddressOption === 'different' && (
                                            <div className="billing-address-details">
                                                {/* Add billing address form fields here */}
                                                <Form.Group className="mb-3"><Form.Control type="text" placeholder="Address" className="checkout-form-control" required={billingAddressOption === 'different'} /></Form.Group>
                                                {/* ... other necessary billing fields (city, state, pin, country) */}
                                                <p style={{ fontSize: '14px', color: '#555' }}>Enter complete billing address...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* Pay Button & Footer Links */}
                            <div className="d-flex flex-column-reverse flex-md-row align-items-md-center justify-content-between mt-4">
                                {/* Return to cart link navigates to shop page */}
                                {/* <a href="#" onClick={handleReturnToCart} style={{ color: '#1c1c1c', fontSize: '13px', textDecoration: 'none' }}> &lt; Return to cart</a> */}
                                <Button type="submit" className="btn-pay-now mb-3 mb-md-0" style={{ width: 'auto', padding: '15px 30px' }}>Pay now</Button>
                            </div>
                            <hr className="my-4" />
                            <div className="footer-links">
                                <a href="#" onClick={(e) => e.preventDefault()}>Refund policy</a>
                                <a href="#" onClick={(e) => e.preventDefault()}>Shipping policy</a>
                                <a href="#" onClick={(e) => e.preventDefault()}>Privacy policy</a>
                                <a href="#" onClick={(e) => e.preventDefault()}>Terms of service</a>
                            </div>
                        </Col>

                        {/* Right Column: Order Summary */}
                         <Col lg={4} md={5}>
                             <div className="order-summary">
                                {cartItems.length > 0 ? (
                                    cartItems.map(item => (
                                        <div key={item.id} className="order-item">
                                            <div className="order-item-img-wrapper"><img src={item.image1 || 'https://placehold.co/50x65/eee/999?text=?'} alt={item.name} className="order-item-img" /><span className="order-item-badge">{item.quantity || 1}</span></div>
                                            <div className="order-item-details"><div className="order-item-name">{item.name || 'Unknown Item'}</div>{item.variant && <div className="order-item-variant">{item.variant}</div>}</div>
                                            <div className="order-item-price">{getFormattedPrice((item.price || 0) * (item.quantity || 1))}</div>
                                        </div>
                                    ))
                                ) : (<p className="text-muted text-center my-4">Your cart is empty.</p>)}

                                {cartItems.length > 0 && (
                                    <>
                                        <div className="discount-section mt-4 pt-4 border-top">
                                            <InputGroup><Form.Control type="text" placeholder="Discount code or gift card" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="checkout-form-control" style={{ borderRadius: '4px 0 0 4px' }}/><Button variant="secondary" className="btn-apply" onClick={() => alert('Apply Discount (Not Implemented)')}>Apply</Button></InputGroup>
                                        </div>
                                        <div className="summary-section mt-4 pt-4 border-top">
                                            <div className="summary-line"><span>Subtotal</span><span>{getFormattedPrice(subtotalINR)}</span></div>
                                            <div className="summary-line"><span>Shipping</span><span>{shippingCostINR > 0 ? getFormattedPrice(shippingCostINR) : 'Free'}</span></div>
                                            <div className="summary-line"><span>Taxes</span><span>{getFormattedPrice(taxesINR)}</span></div>
                                            <div className="summary-line total-line"><strong>Total</strong><span><span className="currency-code">{selectedCurrency.code || 'INR'}</span><strong>{getFormattedPrice(totalINR)}</strong></span></div>
                                            <div className="text-end" style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Including {getFormattedPrice(taxesINR)} in taxes</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </form>
            </Container>
        </>
    );
};

export default CheckoutPage;