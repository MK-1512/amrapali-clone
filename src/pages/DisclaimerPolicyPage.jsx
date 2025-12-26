import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const DisclaimerPolicyPage = () => {
  const pageStyles = `
    .disclaimer-container {
      padding-top: 60px;
      padding-bottom: 60px;
      min-height: 70vh;
      font-family: 'Jost', sans-serif;
      color: #1c1c1c;
      line-height: 1.8;
    }
    .disclaimer-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 40px;
      color: #1c1c1c;
    }
    .disclaimer-section {
      margin-bottom: 30px;
    }
    .disclaimer-section h4 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #1c1c1c;
    }
    .disclaimer-section p {
      margin-bottom: 10px;
      font-size: 15px;
      color: #555;
    }
    .highlight {
      font-weight: 600;
      color: #000;
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <Container className="disclaimer-container">
        <h1 className="disclaimer-title">Disclaimer Policy</h1>
        <Row className="justify-content-center">
          <Col md={9}>
            <div className="disclaimer-section">
              <h4>Product Photography & Color Accuracy</h4>
              <p>
                We try our best to capture product photos under natural light to
                ensure they resemble what you see on the website. However,
                variations can occur due to lighting, digital photography,
                and device display differences. These discrepancies are natural
                and unavoidable. We request customers to consider this before
                placing orders.
              </p>
            </div>

            <div className="disclaimer-section">
              <h4>Handcrafted Product Disclaimer</h4>
              <p>
                Most of our products are hand-woven or hand-crafted. Therefore,
                minor irregularities in weave, color, pattern, or embellishments
                are normal and a hallmark of handmade craftsmanship. Such
                variations are not considered defects but part of the uniqueness
                of each piece.
              </p>
              <p>
                Certain sarees made with traditional hand-block printing may
                show slight fading or color bleeding due to the dyeing and
                printing process used. These characteristics reflect the
                authenticity of handmade textiles.
              </p>
            </div>

            <div className="disclaimer-section">
              <h4>Packaging & Delivery</h4>
              <p>
                All our products are shipped in secure, tamper-proof packaging.
                If you find the package tampered with, please do not accept it.
                Return it to the delivery person and contact us immediately at{" "}
                <span className="highlight">mailtoamrapaliboutique@gmail.com</span>{" "}
                with your Order ID. If the package is accepted, it will be
                considered received securely.
              </p>
            </div>

            <div className="disclaimer-section">
              <h4>Information Accuracy</h4>
              <p>
                The information on this website is provided for general
                purposes only. While we strive to keep it accurate and updated,
                <span className="highlight"> www.amrapaliboutique.in</span> makes
                no representations or warranties of any kind about its
                completeness or reliability. Any reliance you place on such
                information is strictly at your own risk.
              </p>
            </div>

            <div className="disclaimer-section">
              <h4>Limitation of Liability</h4>
              <p>
                In no event shall we be liable for any loss or damage, including
                indirect or consequential damages, loss of data, or loss of
                profits, arising from the use of this website.
              </p>
            </div>

            <div className="disclaimer-section">
              <h4>External Links</h4>
              <p>
                Through this website, you may link to other websites that are
                not under our control. We have no authority over the nature,
                content, or availability of those sites. The inclusion of any
                links does not imply endorsement or responsibility for their
                content.
              </p>
            </div>

            <div className="disclaimer-section">
              <h4>Website Availability</h4>
              <p>
                Every effort is made to keep the website running smoothly.
                However, <span className="highlight">www.amrapaliboutique.in</span> 
                is not responsible for and will not be liable for temporary
                unavailability due to technical issues beyond our control.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DisclaimerPolicyPage;
