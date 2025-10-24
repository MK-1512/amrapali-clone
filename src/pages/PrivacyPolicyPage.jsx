// src/pages/PrivacyPolicyPage.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PrivacyPolicyPage = () => {
  const pageStyles = `
    .privacy-container {
      padding-top: 60px;
      padding-bottom: 60px;
      min-height: 70vh;
      font-family: 'Jost', sans-serif;
      color: #1c1c1c;
      line-height: 1.8;
    }
    .privacy-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 40px;
      color: #1c1c1c;
    }
    .privacy-section {
      margin-bottom: 30px;
    }
    .privacy-section h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #1c1c1c;
    }
    .privacy-section p {
      margin-bottom: 10px;
      font-size: 15px;
      color: #555;
    }
    .highlight {
      font-weight: 600;
      color: #000;
    }
    .privacy-sub {
      font-style: italic;
      font-size: 14px;
      color: #777;
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <Container className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <Row className="justify-content-center">
          <Col md={9}>
            <div className="privacy-section">
              <p>
                This privacy policy outlines how{" "}
                <span className="highlight">www.amrapaliboutique.in</span> uses
                and protects any information that you provide when you use this
                website.
              </p>
            </div>

            <div className="privacy-section">
              <h4>Your Personal Information</h4>
              <p>
                When you make a purchase or interact with our online store, we
                collect personal details such as your name, date of birth,
                contact number, address, and email. We may also collect
                information relevant to surveys or offers.
              </p>
              <p>
                We automatically receive your computer’s IP address when you
                visit our store to help us understand your browser and operating
                system. This data helps us improve our website, products, and
                services.
              </p>
              <p>
                <strong>Email Marketing:</strong> With your permission, we may
                send you emails about new products, promotions, and updates.
              </p>
            </div>

            <div className="privacy-section">
              <h4>How Do You Give Consent?</h4>
              <p>
                When you provide personal information (to complete a transaction
                or place an order), it implies consent for us to use it for that
                purpose only. If we need it for a secondary reason (like
                marketing), we will ask for your explicit consent or provide a
                way to opt out.
              </p>
              <p className="privacy-sub">
                Policy effective from: 15/08/2019. Please check this page
                periodically for updates.
              </p>
            </div>

            <div className="privacy-section">
              <h4>How to Withdraw Consent</h4>
              <p>
                You may withdraw consent at any time by contacting us at{" "}
                <span className="highlight">care@amrapaliboutique.in</span> or
                by mailing:
              </p>
              <p>
                Amrapali Boutique, 106/B Srimani Bagan, G.T Road, Chandannagar,
                Hooghly, West Bengal, India - 712136.
              </p>
            </div>

            <div className="privacy-section">
              <h4>Disclosure</h4>
              <p>
                We will not sell, distribute, or disclose your personal
                information to third parties unless required by law or if you
                violate our Terms of Service.
              </p>
            </div>

            <div className="privacy-section">
              <h4>Shopify Hosting & Payment</h4>
              <p>
                Our store is hosted on{" "}
                <span className="highlight">Shopify</span>, which provides the
                secure e-commerce platform for our online store. Your data is
                stored safely on a secure server behind a firewall.
              </p>
              <p>
                If you use a direct payment gateway, Shopify encrypts your card
                data using PCI-DSS standards and SSL encryption. Transaction
                data is stored only as long as necessary to complete your order.
              </p>
              <p>
                PCI-DSS compliance ensures secure handling of credit card data
                by our store and its service providers.
              </p>
            </div>

            <div className="privacy-section">
              <h4>Third-Party Services</h4>
              <p>
                Some third-party providers (like payment gateways) collect,
                process, and disclose your information as needed to complete
                transactions. These providers have their own privacy policies,
                and we recommend reviewing them to understand how they handle
                your data.
              </p>
              <p>
                Depending on their location, your information may be subject to
                foreign laws (for example, transactions processed in the U.S.
                may be subject to U.S. legislation like the Patriot Act).
              </p>
              <p>
                Once you leave our website or are redirected to a third-party
                site, this Privacy Policy and our Terms of Service no longer
                apply.
              </p>
            </div>

            <div className="privacy-section">
              <h4>Security</h4>
              <p>
                We follow industry best practices to ensure your data is not
                lost, misused, or accessed without authorization. Sensitive
                information like credit card data is encrypted via SSL and AES-256.
              </p>
              <p>
                While no system is 100% secure, we comply with all PCI-DSS
                requirements and additional best practices.
              </p>
            </div>

            <div className="privacy-section">
              <h4>Cookies</h4>
              <p>
                Cookies are small files placed on your device to help websites
                recognize you and improve user experience. They help us analyze
                traffic, track preferences, and optimize site performance.
              </p>
              <p>
                You can choose to accept or decline cookies in your browser
                settings. Declining cookies may limit some website features.
              </p>
            </div>

            <div className="privacy-section">
              <h4>Contact Information</h4>
              <p>
                If you would like to access, correct, or delete any personal
                information, or have questions about this Privacy Policy, please
                contact us:
              </p>
              <p>
                <strong>Address:</strong> Amrapali Boutique, 106/B Srimani
                Bagan, G.T Road, Chandannagar, Hooghly, West Bengal, India -
                712136.
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <span className="highlight">care@amrapaliboutique.in</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
