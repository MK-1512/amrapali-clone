import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FaqPage = () => {
    const pageStyles = `
        .faq-container {
            padding-top: 60px;
            padding-bottom: 60px;
            min-height: 70vh;
        }
        .faq-title {
            font-family: 'Jost', sans-serif;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #1c1c1c;
            text-align: center;
            margin-bottom: 40px;
        }
        .faq-section {
            margin-bottom: 30px;
        }
        .faq-question {
            font-family: 'Cormorant Garamond', serif;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #1c1c1c;
        }
        .faq-answer {
            font-size: 15px;
            line-height: 1.8;
            color: #555;
        }
    `;

    const faqs = [
        { q: "1. Do you have a brick and mortar store of Amrapali Boutique?", a: "Yes, we do. It's located in Chandannagar, Hooghly, West-Bengal." },
        { q: "2. Do all Sarees come with blouse piece?", a: "Most of our sarees come with blouse piece. However, there are few sarees that do not have a blouse piece. It is mentioned in the description if it has a blouse piece or not." },
        { q: "3. What are the dimensions of your Saree or Jewellery?", a: "All dimensions of products are mentioned in the description. Please go through that before placing an order." },
        { q: "4. What are the Shipping Charges for Domestic and International shipping?", a: "For delivery within India, shipping is complimentary and no surcharge is payable of any kind. We don’t have International Shipping facilities currently." },
        { q: "5. When can I expect my order? How many days does it take for delivery?", a: "All Ready to Ship products are dispatched in 1-2 business days. Customized products are dispatched in 5-6 business days. Most orders are delivered within 3-7 business days, depending on location and other factors." },
        { q: "6. How do I know whether my product has been shipped? How do I track my order?", a: "Currently we deliver through DTDC only. Once dispatched, you will receive a text and email with tracking details. You can track your order after 24 hours. For help, contact mailtoamrapaliboutique@gmail.com or WhatsApp +91-9820849639." },
        { q: "7. What if I don’t receive my product even after the Tracking ID shows ‘Delivered successfully’?", a: "Please WhatsApp your concern on +91-9820849639 or email mailtoamrapaliboutique@gmail.com. We’ll do the needful." },
        { q: "8. What are the Modes of Payment?", a: "We accept Credit/Debit Cards, Netbanking, UPI, Wallets, and Bank Transfers. International customers can pay via Xoom/Western Union but must provide a domestic delivery address." },
        { q: "9. What if it shows ‘Payment Failed’ and the amount is still debited from my account?", a: "This can occur due to network issues. Contact us via mailtoamrapaliboutique@gmail.com or +91-9820849639 for resolution." },
        { q: "10. Do you have Cash on Delivery?", a: "No. We accept only online payments or bank transfers." },
        { q: "11. Can I order through Whatsapp, Instagram or Facebook?", a: "No. Orders must be placed through our official website only." },
        { q: "12. Can I cancel/modify my order after having paid for it?", a: "Please email us within 1-2 hours of placing an order for cancellation. Once dispatched, orders cannot be cancelled." },
        { q: "13. Can I modify the delivery address/contact info after having placed an order?", a: "Yes, email mailtoamrapaliboutique@gmail.com or call +91-9833526707 within 1-2 hours. Once shipped, no modifications can be made." },
        { q: "14. Can I purchase now but schedule my dispatch for a later date?", a: "Yes. Mention your preferred dispatch date in the ‘Additional Instruction’ box during checkout." },
        { q: "15. Can my billing address and shipping address be different?", a: "Yes, you can enter separate billing and shipping addresses during checkout." },
        { q: "16. What is the Return Policy?", a: "Returns are accepted on Sarees only, within 48 hours of delivery. Jewellery is not eligible. Please mail us for approval before returning." },
        { q: "17. What is the Exchange Policy?", a: "Exchanges are accepted on Sarees only. Once approved, ship back the product within 7 days. Refunds or credit notes will be issued after inspection." },
        { q: "18. Where do I ship the product in case of Returns/Exchange?", a: "Amrapali Boutique, 106/B Srimani Bagan, G.T Road, Chandannagar - 712136, Hooghly, West Bengal. Contact: +91-9820849639 / +91-9833526707." },
        { q: "19. When will I receive my refund?", a: "Refunds are processed within 4-7 days after the returned product passes quality checks." },
        { q: "20. Do you exchange or take sarees that have Fall and Picot done?", a: "No, we do not accept returns or exchanges for sarees with fall and picot work." },
        { q: "21. What if my product arrives in a damaged condition?", a: "If the package seems tampered, refuse delivery and email us at mailtoamrapaliboutique@gmail.com with your Order ID." },
        { q: "22. What if my product is defective?", a: "Email us within 48 hours with photos of the defect. After verification, we’ll arrange a return, exchange, or refund as applicable." },
        { q: "23. What do I do if I face fitting issue with my jewellery, especially bangles?", a: "We don’t accept exchanges or returns on jewellery. Please verify sizes before ordering." },
        { q: "24. Are the products shown on website accurate, especially in terms of color?", a: "We use natural lighting for photography, but slight color differences may occur due to screen settings." },
        { q: "25. What if by mistake I place an order twice?", a: "Email us immediately at mailtoamrapaliboutique@gmail.com to cancel one of the duplicate orders." },
        { q: "26. Can I get a mail or message once a product is back in stock?", a: "Click ‘NOTIFY ME’ on the product page and enter your email to receive restock alerts." },
        { q: "27. Can I pre-order a saree if it’s out of stock?", a: "No, we don’t take pre-orders. Use the ‘NOTIFY ME’ feature instead." },
        { q: "28. How can I send an Amrapali Product as a gift to my loved one?", a: "Enter your loved one’s shipping address at checkout. Mention notes in the ‘Additional Instruction’ box if you want to include a message." },
        { q: "29. Do you have ‘Gift-Wrapping’ option?", a: "We don’t provide gift wrapping, but we can include a handwritten note on request." },
        { q: "30. Do you take bulk orders or do wholesale?", a: "No, we are a retail-only boutique and do not take wholesale or bulk orders." },
        { q: "31. I wish to gift someone but I’m not sure what they’ll like.", a: "You can send an Amrapali e-gift card available on our website for your recipient to choose their favorite item." },
        { q: "32. Can I resell your products?", a: "No. Our products are strictly for personal use only, and resale is prohibited." },
        { q: "33. Can I get a Saree customized in a particular combination or design?", a: "Sorry, we currently do not offer saree customization." },
        { q: "34. What if I need more information or clarity on a product before I make my purchase?", a: "Please WhatsApp +91-9820849639 or email mailtoamrapaliboutique@gmail.com for any product-related questions." },
        { q: "35. What if I’m not being able to purchase from the website after repeated attempts?", a: "Try a different payment method. If the issue persists, contact us at +91-9820849639 or mailtoamrapaliboutique@gmail.com." },
    ];

    return (
        <>
            <style>{pageStyles}</style>
            <Container className="faq-container">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1 className="faq-title">FREQUENTLY ASKED QUESTIONS</h1>
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-section">
                                <h2 className="faq-question">{faq.q}</h2>
                                <p className="faq-answer">{faq.a}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FaqPage;
