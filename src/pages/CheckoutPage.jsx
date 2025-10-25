// src/pages/CheckoutPage.jsx
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Accordion } from 'react-bootstrap';
import { CartContext } from '../context/CartContext'; // Assuming you have cart context
import { CurrencyContext } from '../context/CurrencyContext'; // Assuming you have currency context
import { formatPrice } from '../utils/currencyUtils'; // Assuming you have this utility

// Placeholder styles (add these to your main.css or a specific checkout.css)
const checkoutPageStyles = `
.checkout-container {
    padding-top: 40px;
    padding-bottom: 60px;
    background-color: #f9f9f9; /* Light grey background */
    font-family: 'Jost', sans-serif;
    color: #333;
}

.checkout-header {
    text-align: center;
    margin-bottom: 30px;
}

.checkout-logo {
    width: 150px;
    margin-bottom: 20px;
}

.checkout-section {
    background-color: #ffffff; /* White background for sections */
    padding: 25px;
    border-radius: 8px; /* Slightly rounded corners */
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
}

.checkout-section-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    color: #1c1c1c;
}

.checkout-form-label {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #555;
}

.checkout-form-control {
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px 14px;
    font-size: 14px;
    box-shadow: none;
}

.checkout-form-control:focus {
    border-color: #999;
    box-shadow: none;
}

.checkout-form-select {
     border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px 14px;
    font-size: 14px;
    box-shadow: none;
    appearance: none; /* remove default arrow */
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23999' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 35px;
}
.checkout-form-select:focus {
    border-color: #999;
    box-shadow: none;
}

.checkout-form-check-label {
    font-size: 14px;
}

.order-summary {
    background-color: #ffffff;
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    position: sticky;
    top: 100px; /* Adjust based on your header height */
}

.order-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}
.order-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.order-item-img-wrapper {
    position: relative;
    border: 1px solid #eee;
    border-radius: 6px;
    margin-right: 15px;
}

.order-item-img {
    width: 50px;
    height: 65px; /* Adjust aspect ratio */
    object-fit: cover;
    border-radius: 6px;
}

.order-item-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #555;
    color: white;
    font-size: 10px;
    font-weight: 600;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.order-item-details {
    flex-grow: 1;
    font-size: 13px;
}
.order-item-name {
    font-weight: 500;
    color: #1c1c1c;
}
.order-item-variant {
    color: #777;
    font-size: 12px;
}
.order-item-price {
    font-weight: 500;
    color: #1c1c1c;
    font-size: 14px;
}

.discount-section .input-group {
    margin-bottom: 20px;
}
.discount-section .btn-apply {
    background-color: #e0e0e0;
    border: 1px solid #ccc;
    color: #555;
    font-size: 14px;
    padding: 10px 18px;
    border-radius: 0 4px 4px 0;
}
.discount-section .btn-apply:hover {
     background-color: #d0d0d0;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 8px;
    color: #555;
}
.summary-line strong {
    color: #1c1c1c;
}
.total-line {
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
}
.total-line .currency-code {
    font-size: 12px;
    color: #777;
    margin-right: 5px;
}

.payment-method {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 10px;
}
.payment-method label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: pointer;
}
.payment-method-title {
    font-weight: 500;
    font-size: 14px;
}
.payment-icons img {
    height: 20px;
    margin-left: 5px;
}

.billing-address-options {
     background-color: #f0f0f0;
     border-radius: 6px;
     padding: 10px;
}
.billing-address-option {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 10px;
    cursor: pointer;
}
.billing-address-option.selected {
    border-color: #1c1c1c;
    box-shadow: 0 0 0 1px #1c1c1c;
}
.billing-address-option label {
    width: 100%;
}
.billing-address-details {
     border-top: 1px solid #eee;
     padding-top: 15px;
     margin-top: 15px;
}

.btn-pay-now {
    background-color: #333;
    color: white;
    font-size: 15px;
    font-weight: 500;
    padding: 15px;
    border-radius: 6px;
    width: 100%;
    margin-top: 20px;
}
.btn-pay-now:hover {
     background-color: #1c1c1c;
     color: white;
}

.footer-links {
    text-align: center;
    margin-top: 30px;
}
.footer-links a {
    font-size: 12px;
    color: #555;
    text-decoration: none;
    margin: 0 8px;
}
.footer-links a:hover {
    text-decoration: underline;
    color: #1c1c1c;
}

/* Align radio button nicely */
.form-check-input[type="radio"] {
    margin-top: 0.3em;
}
`;

const CheckoutPage = () => {
    // Example: Replace with actual cart data from context
    const { cartItems } = useContext(CartContext) || { cartItems: [
        { id: 709, name: "CHANDRIKA", price: 3600, quantity: 1, image1: "https://www.amrapaliboutique.in/cdn/shop/files/IMG_3927_800x.jpg?v=1756623811", variant: null },
        { id: 'gift-card', name: "E-GIFT CARD", price: 2000, quantity: 1, image1: "/images/gift-card.jpg", variant: "Denomination: ₹2,000.00" } // Example gift card
    ]};
    const { selectedCurrency } = useContext(CurrencyContext);

    // Placeholder state for form fields
    const [email, setEmail] = useState('mktech1512@gmail.com'); // Pre-filled from video
    const [subscribe, setSubscribe] = useState(true);
    const [country, setCountry] = useState('India');
    const [firstName, setFirstName] = useState('Mukesh');
    const [lastName, setLastName] = useState('Kumar');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phone, setPhone] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' or 'cashfree'
    const [billingAddressOption, setBillingAddressOption] = useState('same'); // 'same' or 'different'

    const subtotalINR = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCostINR = 0; // Example, fetch dynamically
    const taxesINR = subtotalINR * 0.0156; // Example tax calculation from video (5600 -> 87.80 implies ~1.56%)
    const totalINR = subtotalINR + shippingCostINR + taxesINR;

    const getFormattedPrice = (price) => formatPrice(price, selectedCurrency.code || 'INR'); // Use INR as fallback

    return (
        <>
            <style>{checkoutPageStyles}</style>
            <Container fluid className="checkout-container">
                <Row className="justify-content-center">
                    {/* Left Column: Checkout Details */}
                    <Col lg={6} md={7} className="mb-4">
                        {/* Logo */}
                        <div className="checkout-header d-none d-lg-block">
                            <img src="/images/logo.png" alt="Amrapali" className="checkout-logo" />
                        </div>

                        {/* Contact */}
                        <div className="checkout-section">
                            <h2 className="checkout-section-title">Contact</h2>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="checkout-form-control"
                                />
                            </Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="Email me with news and offers"
                                checked={subscribe}
                                onChange={(e) => setSubscribe(e.target.checked)}
                                className="checkout-form-check-label"
                            />
                        </div>

                        {/* Delivery */}
                        <div className="checkout-section">
                             <h2 className="checkout-section-title">Delivery</h2>
                             <Form>
                                <Form.Group className="mb-3">
                                     <Form.Select className="checkout-form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                                         <option>India</option>
                                         {/* Add other countries */}
                                     </Form.Select>
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                             <Form.Control type="text" placeholder="First name" className="checkout-form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="Last name" className="checkout-form-control" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                     <Form.Control type="text" placeholder="Address" className="checkout-form-control" value={address} onChange={(e) => setAddress(e.target.value)}/>
                                </Form.Group>
                                 <Form.Group className="mb-3">
                                     <Form.Control type="text" placeholder="Apartment, suite, etc. (optional)" className="checkout-form-control" value={apartment} onChange={(e) => setApartment(e.target.value)}/>
                                </Form.Group>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                             <Form.Control type="text" placeholder="City" className="checkout-form-control" value={city} onChange={(e) => setCity(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                     <Col md={4}>
                                        <Form.Group className="mb-3">
                                             <Form.Select className="checkout-form-select" value={state} onChange={(e) => setState(e.target.value)}>
                                                 <option value="">State</option>
                                                 {/* Add states for selected country */}
                                             </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                             <Form.Control type="text" placeholder="PIN code" className="checkout-form-control" value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                 <Form.Group className="mb-3">
                                     <Form.Control type="tel" placeholder="Phone" className="checkout-form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                </Form.Group>
                                 {/* Optional: Use a saved address */}
                                 {/* <Form.Group> <Form.Select className="checkout-form-select"> <option>Use a saved address</option> </Form.Select> </Form.Group> */}
                             </Form>
                        </div>

                         {/* Shipping method */}
                         <div className="checkout-section">
                             <h2 className="checkout-section-title">Shipping method</h2>
                             <p style={{fontSize: '14px', color: '#777'}}>Enter your shipping address to view available shipping methods.</p>
                             {/* Shipping options will appear here once address is entered */}
                         </div>

                        {/* Payment */}
                        <div className="checkout-section">
                            <h2 className="checkout-section-title">Payment</h2>
                            <p style={{fontSize: '13px', color: '#777', marginBottom: '15px'}}>All transactions are secure and encrypted.</p>
                            {/* Payment options */}
                            <div className="payment-method mb-2">
                                <Form.Check type="radio" id="razorpay" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <Form.Check.Input type="radio" />
                                    <Form.Check.Label>
                                        <span className="payment-method-title">Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)</span>
                                        <span className="payment-icons">
                                            {/* Add icons */}
                                            <img src="https://via.placeholder.com/30x20/eee/999?text=UPI" alt="UPI" />
                                            <img src="https://via.placeholder.com/30x20/eee/999?text=VISA" alt="Visa" />
                                            {/* ... other icons */}
                                            <span style={{fontSize: '11px', color: '#777'}}>+17</span>
                                        </span>
                                    </Form.Check.Label>
                                </Form.Check>
                                {paymentMethod === 'razorpay' && (
                                     <div className="text-center mt-3 p-3 bg-light border rounded">
                                         {/* Placeholder graphic */}
                                         <p style={{fontSize: '12px', color: '#555'}}>After clicking “Pay now”, you will be redirected to Razorpay Secure to complete your purchase securely.</p>
                                     </div>
                                )}
                            </div>
                            <div className="payment-method">
                                <Form.Check type="radio" id="cashfree" name="paymentMethod" value="cashfree" checked={paymentMethod === 'cashfree'} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <Form.Check.Input type="radio" />
                                     <Form.Check.Label>
                                        <span className="payment-method-title">Cashfree Payments (UPI,Cards,Wallets,NetBanking)</span>
                                        <span className="payment-icons">
                                            {/* Add icons */}
                                             <img src="https://via.placeholder.com/30x20/eee/999?text=UPI" alt="UPI" />
                                             <img src="https://via.placeholder.com/30x20/eee/999?text=VISA" alt="Visa" />
                                            <span style={{fontSize: '11px', color: '#777'}}>+10</span>
                                        </span>
                                    </Form.Check.Label>
                                </Form.Check>
                            </div>
                        </div>

                         {/* Billing Address */}
                         <div className="checkout-section">
                             <h2 className="checkout-section-title">Billing address</h2>
                             <p style={{fontSize: '13px', color: '#777', marginBottom: '15px'}}>Select the address that matches your card or payment method.</p>
                            <div className="billing-address-options">
                                <div className={`billing-address-option ${billingAddressOption === 'same' ? 'selected' : ''}`} onClick={() => setBillingAddressOption('same')}>
                                    <Form.Check type="radio" name="billingAddress" id="billingSame" value="same" checked={billingAddressOption === 'same'} onChange={(e) => setBillingAddressOption(e.target.value)}>
                                        <Form.Check.Input type="radio" />
                                        <Form.Check.Label>Same as shipping address</Form.Check.Label>
                                    </Form.Check>
                                </div>
                                <div className={`billing-address-option ${billingAddressOption === 'different' ? 'selected' : ''}`} onClick={() => setBillingAddressOption('different')}>
                                     <Form.Check type="radio" name="billingAddress" id="billingDifferent" value="different" checked={billingAddressOption === 'different'} onChange={(e) => setBillingAddressOption(e.target.value)}>
                                        <Form.Check.Input type="radio" />
                                        <Form.Check.Label>Use a different billing address</Form.Check.Label>
                                    </Form.Check>
                                    {billingAddressOption === 'different' && (
                                        <div className="billing-address-details">
                                            {/* Add form fields similar to shipping address here */}
                                            <p style={{fontSize: '14px', color: '#555'}}>Enter billing address details...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                         </div>

                        <Button type="submit" className="btn-pay-now">Pay now</Button>

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
                            {cartItems.map(item => (
                                <div key={item.id} className="order-item">
                                    <div className="order-item-img-wrapper">
                                        <img src={item.image1} alt={item.name} className="order-item-img" />
                                        <span className="order-item-badge">{item.quantity}</span>
                                    </div>
                                    <div className="order-item-details">
                                        <div className="order-item-name">{item.name}</div>
                                        {item.variant && <div className="order-item-variant">{item.variant}</div>}
                                    </div>
                                    <div className="order-item-price">{getFormattedPrice(item.price * item.quantity)}</div>
                                </div>
                            ))}

                            <div className="discount-section mt-4 pt-4 border-top">
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Discount code or gift card"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        className="checkout-form-control"
                                        style={{borderRadius: '4px 0 0 4px'}}
                                    />
                                    <Button variant="secondary" className="btn-apply">Apply</Button>
                                </InputGroup>
                            </div>

                            <div className="summary-section mt-4 pt-4 border-top">
                                <div className="summary-line">
                                    <span>Subtotal</span>
                                    <span>{getFormattedPrice(subtotalINR)}</span>
                                </div>
                                <div className="summary-line">
                                    <span>Shipping</span>
                                    {/* Display calculated shipping or placeholder */}
                                    <span>{shippingCostINR > 0 ? getFormattedPrice(shippingCostINR) : 'Calculated at next step'}</span>
                                </div>
                                <div className="summary-line total-line">
                                    <strong>Total</strong>
                                    <span>
                                        <span className="currency-code">{selectedCurrency.code || 'INR'}</span>
                                        <strong>{getFormattedPrice(totalINR)}</strong>
                                    </span>
                                </div>
                                <div className="text-end" style={{fontSize: '12px', color: '#777', marginTop: '5px'}}>
                                    Including {getFormattedPrice(taxesINR)} in taxes
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CheckoutPage;