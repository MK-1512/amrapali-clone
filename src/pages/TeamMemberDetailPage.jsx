import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { teamMembers } from '../data/team'; // Make sure this path is correct

// This component receives the memberId and the onBack function from App.jsx
const TeamMemberDetailPage = ({ memberId, onBack }) => {
  // Find the specific member from your data file using the ID
  const member = teamMembers.find(m => m.id === memberId);

  // If for some reason the member isn't found, show a message
  if (!member) {
    return (
      <Container className="text-center py-5">
        <h2>Team Member Not Found</h2>
        <Button onClick={onBack} variant="outline-dark">Back to Team</Button>
      </Container>
    );
  }

  // The fullBio string is split by newlines to create separate paragraphs
  const bioParagraphs = member.fullBio.split('\n\n');

  return (
    <Container className="team-member-detail-page py-5">
      
      {/* 1. Name and Title */}
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h1 className="member-name">{member.name}</h1>
          {member.title && <h2 className="member-title">{member.title}</h2>}
        </Col>
      </Row>

      {/* 2. Centered Image */}
      <Row className="justify-content-center mb-5">
        <Col md={6}>
          <img
            src={member.image}
            alt={member.name}
            className="img-fluid d-block mx-auto member-detail-image"
          />
        </Col>
      </Row>

      {/* 3. Bio Paragraphs */}
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          {bioParagraphs.map((paragraph, index) => (
            <p key={index} className="member-bio">{paragraph}</p>
          ))}
        </Col>
      </Row>
      
      {/* 4. Back Button */}
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <Button onClick={onBack} variant="outline-dark">
            Back to Team
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamMemberDetailPage;
