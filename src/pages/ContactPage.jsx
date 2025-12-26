import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ContactPage = () => {
  const pageStyles = `
    .contact-container {
      padding-top: 60px;
      padding-bottom: 60px;
      min-height: 70vh;
      font-family: 'Jost', sans-serif;
      color: #1c1c1c;
      line-height: 1.8;
    }
    .contact-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 40px;
      color: #1c1c1c;
    }
    .contact-section {
      margin-bottom: 30px;
    }
    .contact-section h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #1c1c1c;
    }
    .contact-section p {
      margin-bottom: 6px;
      font-size: 15px;
      color: #555;
    }
    .contact-highlight {
      font-weight: 600;
      color: #000;
    }
    .contact-links a {
      color: #b45f04;
      text-decoration: none;
    }
    .contact-links a:hover {
      text-decoration: underline;
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <Container className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="contact-section">
              <p>
                We are happy to connect with you at <span className="contact-highlight">Amrapali Boutique</span>.
                Please feel free to contact us for any query, concern, suggestion, or just about anything to do with us.
              </p>
              <p>Please get in touch with us through any of the following means:</p>
            </div>

            <div className="contact-section">
              <h4>Customer Care</h4>
              <p><strong>Timings:</strong> 11:30 AM - 8:00 PM (Closed on Thursdays)</p>
              <p><strong>Mail:</strong> care@amrapaliboutique.in (For exchanges and returns)</p>
              <p><strong>WhatsApp & Call:</strong> +91-8981235869 (New Number)</p>
            </div>

            <div className="contact-section">
              <h4>Marketing & Media</h4>
              <p><strong>Mail:</strong> admin@amrapaliboutique.in</p>
              <p className="contact-links">
                <strong>Instagram:</strong> <a href="https://www.instagram.com/amrapaliboutique" target="_blank" rel="noopener noreferrer">instagram.com/amrapaliboutique</a><br />
                <strong>Facebook:</strong> <a href="https://www.facebook.com/amrapaliboutique" target="_blank" rel="noopener noreferrer">facebook.com/amrapaliboutique</a>
              </p>
            </div>

            <div className="contact-section">
              <h4>Store Address</h4>
              <p>Amrapali Boutique<br />
                106/B Srimani Bagan, G.T Road,<br />
                Chandannagar - 712136, Hooghly, West Bengal<br />
                <strong>Landmark:</strong> Next to Chandannagar Telephone Exchange<br />
                <strong>Nearest Railway Station:</strong> Mankundu
              </p>
              <p><strong>Timings:</strong> 11:30 AM to 9:00 PM IST<br />
                <strong>Closed:</strong> Thursdays, Regional and National Holidays
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactPage;
