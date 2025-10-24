import React from "react";
import { Container } from "react-bootstrap";

const ShippingPolicyPage = () => {
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
        Shipping & Delivery Policy
      </h1>

      <p style={{ whiteSpace: "pre-line" }}>
        Amrapali Boutique delivers across all major locations within India and
        worldwide. We are committed to delivering your order with good-quality
        packaging within the given time frame. To ensure your order reaches you
        in good condition and as fast as possible, we ship only through reputed
        courier agencies.
      </p>

      <h3 style={{ marginTop: "25px", fontSize: "22px" }}>DOMESTIC SHIPPING:</h3>
      <ul>
        <li>Shipping within India is complimentary—no extra charges apply.</li>
        <li>We ship throughout the week except weekends and public holidays.</li>
        <li>
          Ready-to-Ship products are dispatched within 2–3 business days or as
          per your specified delivery date.
        </li>
        <li>
          Customized products (with Fall and Picot) are dispatched in 3–7
          business days depending on the number of units ordered.
        </li>
        <li>
          Most orders are delivered within 3–10 business days, though timelines
          may vary due to external factors beyond our control.
        </li>
        <li>
          For address changes, contact us at{" "}
          <b>care@amrapaliboutique.in</b> or call <b>+91-9987626121</b> within
          1–2 hours after placing the order.
        </li>
        <li>Once dispatched, no modifications can be made to the shipment.</li>
      </ul>

      <h3 style={{ marginTop: "25px", fontSize: "22px" }}>INTERNATIONAL SHIPPING:</h3>
      <ul>
        <li>We are now shipping worldwide!</li>
        <li>
          You can use international credit cards on Razorpay for payments. If
          payment fails, contact{" "}
          <b>mailtoamrapaliboutique@gmail.com</b> for alternate options.
        </li>
        <li>
          We use <b>DHL</b> for international deliveries and charge{" "}
          <b>₹3000/- per order</b> (up to 10 products).
        </li>
        <li>
          VAT, GST, or any import duties are not included in the product or
          shipping cost and must be paid by the customer.
        </li>
        <li>
          In case customs or local authorities impose additional charges, the
          customer is responsible for paying them.
        </li>
        <li>
          International shipments are <b>not eligible for returns</b> or
          exchanges.
        </li>
        <li>
          International deliveries take approximately <b>7–15 business days</b>,
          though customs clearance may cause delays.
        </li>
        <li>
          If the customer fails to accept or claim the delivery, no refund will
          be provided.
        </li>
        <li>
          We ship throughout the week except weekends and public holidays.
        </li>
        <li>
          Ready-to-Ship products are dispatched in 2–3 business days; customized
          ones take 3–7 business days.
        </li>
        <li>
          Address changes must be requested within 1–2 hours of placing an
          order. Once dispatched, no changes are allowed.
        </li>
        <li>
          In the rare case of a shipping or delivery dispute, it may take 10–15
          business days to resolve since multiple third-party logistics are
          involved.
        </li>
        <li>Shipping charges are non-refundable.</li>
        <li>
          Terms and conditions may be updated or amended as we continue to
          improve our shipping experience.
        </li>
      </ul>

      <h3 style={{ marginTop: "25px", fontSize: "22px" }}>DISCLAIMER:</h3>
      <p style={{ whiteSpace: "pre-line" }}>
        Our products are securely packed in tamper-proof packaging. If you find
        a package tampered with, please do not accept delivery and return it to
        the delivery person. Email us at <b>care@amrapaliboutique.in</b>{" "}
        mentioning your Order ID, and we’ll assist you promptly.
      </p>

      <p>
        If you have accepted the delivery, it will be assumed that the parcel
        was received in a secure condition. Amrapali Boutique is not liable for
        delivery delays caused by courier companies or postal authorities, but
        we will help you track and resolve the issue through our logistics
        partners.
      </p>
    </Container>
  );
};

export default ShippingPolicyPage;
