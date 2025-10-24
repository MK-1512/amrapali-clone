import React from "react";
import { Container } from "react-bootstrap";

const RefundPolicyPage = () => {
  return (
    <Container
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        minHeight: "60vh",
        fontFamily: "'Cormorant Garamond', serif",
        lineHeight: "1.8",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        Cancellation & Refund Policy
      </h1>

      <p style={{ whiteSpace: "pre-line" }}>
        We have a thorough and comprehensive Exchange and Return Policy. Please
        read it entirely before placing your order, to ensure a smooth and
        hassle-free shopping experience.
      </p>

      <h3 style={{ marginTop: "25px", fontSize: "22px" }}>
        RETURN AND EXCHANGE POLICY:
      </h3>
      <p style={{ whiteSpace: "pre-line" }}>
        International shipments are NOT eligible for returns or exchanges.
        Please feel free to get in touch through email/WhatsApp/Instagram if you
        need any assistance or clarification before making a purchase.
      </p>

      <ul>
        <li>Returns are accepted on Sarees only. Jewellery is not eligible.</li>
        <li>
          A Return request must be raised within 72 hours of receiving the
          product by mailing us at <b>care@amrapaliboutique.in</b> with your
          order ID.
        </li>
        <li>
          We initiate a reverse pickup charge for which payment has to be made
          separately. Alternatively, you may ship the product back within 7
          working days.
        </li>
        <li>
          Customized products with Fall and Picot are not eligible for
          returns/exchanges/refunds.
        </li>
        <li>
          Items purchased during Sale are not eligible for return or exchange.
        </li>
        <li>
          All returned products must be completely unused and in original
          packaging.
        </li>
        <li>
          Amrapali Boutique reserves the right to do a thorough quality check
          before issuing credit/refund or exchange.
        </li>
      </ul>

      <h4 style={{ marginTop: "25px", fontSize: "20px" }}>
        Scenarios where Exchange/Returns will NOT be supported:
      </h4>
      <ul>
        <li>Exchange request made outside the 72-hour time frame.</li>
        <li>Product is used or not in original condition.</li>
        <li>Product damaged due to ignoring wash/care instructions.</li>
        <li>Customized or tailor-made products.</li>
        <li>Products with tampered/missing price tags or cut blouse fabric.</li>
        <li>Returned items without original packaging or invoice.</li>
      </ul>

      <p>
        Any returned item not meeting the above conditions will be returned to
        the customer at their expense. No reimbursement will be made in such
        cases.
      </p>

      <h3 style={{ marginTop: "25px", fontSize: "22px" }}>REFUND POLICY:</h3>
      <p style={{ whiteSpace: "pre-line" }}>
        Refunds will be processed within 4–7 working days after product
        cancellation or receipt. The settlement depends on the banking cycle.
        Refunds will go back to the original mode of payment, except PayPal
        payments, which may require an Indian Bank Account or will be replaced
        with store credit.
      </p>

      <h3 style={{ marginTop: "25px", fontSize: "22px" }}>CANCELLATION POLICY:</h3>
      <p style={{ whiteSpace: "pre-line" }}>
        If you need to cancel or modify an order, please do so within 1–2 hours
        of placing it by emailing <b>care@amrapaliboutique.in</b>.
      </p>
      <ul>
        <li>
          If your order has not been dispatched, you will receive a full refund.
        </li>
        <li>
          If dispatched or handed over to courier, cancellations are not
          possible.
        </li>
        <li>
          We are not liable for delivery delays caused by courier companies.
        </li>
      </ul>

      <h3 style={{ marginTop: "25px", fontSize: "22px" }}>
        DEFECTIVE / DAMAGED PRODUCTS:
      </h3>
      <p style={{ whiteSpace: "pre-line" }}>
        We take utmost care to ensure product quality. In rare cases of defects,
        we will exchange, replace, or refund. Notify us within 48 hours at{" "}
        <b>care@amrapaliboutique.in</b> with your order ID and pictures of the
        defect.
      </p>
      <p>
        If the package is tampered with upon delivery, please do not accept it
        and return it to the delivery person. Notify us immediately at{" "}
        <b>care@amrapaliboutique.in</b>. Acceptance of the parcel will be
        considered as confirmation of secure delivery.
      </p>
    </Container>
  );
};

export default RefundPolicyPage;
