// src/pages/TermsServicePage.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const TermsServicePage = () => {
  return (
    <Container
      style={{
        paddingTop: '60px',
        paddingBottom: '60px',
        minHeight: '60vh',
        lineHeight: '1.8',
        color: '#333',
        fontSize: '16px',
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: '600',
        }}
      >
        Terms of Service
      </h1>

      <div style={{ whiteSpace: 'pre-line' }}>
        {`The Website Owner, including subsidiaries and affiliates (“www.amrapaliboutique.in” or “Amrapali Boutique” or “we” or “us” or “our”) provides the information contained on the website or any of the pages comprising the website (“website”) to visitors (“visitors”) (collectively referred to as “you” or “your” hereinafter) subject to the terms and conditions set out below, along with our privacy policy and any other relevant terms and conditions, policies, and notices.

Welcome to www.amrapaliboutique.in. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms of service, which together with our privacy policy govern www.amrapaliboutique.in’s relationship with you in relation to this website.

The term 'Amrapali Boutique', ‘www.amrapaliboutique.in’ or 'us' or 'we' refers to the owner of the website whose registered office is:
Amrapali Boutique, 106/B, Srimani Bagan, G.T Road, Chandannagar, Hooghly, West Bengal, India - 712136.

The term 'you' refers to the user or viewer of our website.

---

**1. General Use**
- The content of the pages of this website is for your general information and use only. It is subject to change without notice.
- By using this website, you confirm that you are at least 18 years of age or are accessing the site under the supervision of a parent or guardian.

**2. Accuracy and Liability**
- Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose.
- You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.

**3. Use of Information**
- Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.
- It shall be your responsibility to ensure that any products, services, or information available through this website meet your specific requirements.

**4. Intellectual Property**
- This website contains material that is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics.
- Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms of service.
- All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.

**5. Prohibited Use**
- Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.
- You may not create a link to this website from another website or document without Amrapali Boutique's prior written consent.

**6. Third-Party Links**
- From time to time, this website may include links to other websites. These links are provided for your convenience to provide further information.
- They do not signify that we endorse the website. We have no responsibility for the content of the linked websites.

**7. Governing Law**
- Your use of this website and any dispute arising out of such use is subject to the laws of India or other relevant regulatory authority.

---

If you have any questions about our Terms of Service, please contact us at:
📧 care@amrapaliboutique.in
📞 +91-9987626121
`}
      </div>
    </Container>
  );
};

export default TermsServicePage;
