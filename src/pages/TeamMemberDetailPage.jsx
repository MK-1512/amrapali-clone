import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { teamMembers } from '../data/team';

const TeamMemberDetailPage = ({ memberId, onBack }) => {
  const member = teamMembers.find(m => m.id === memberId);

  if (!member) {
    return (
      <Container className="text-center py-5">
        <h2>Team Member Not Found</h2>
        <Button onClick={onBack} variant="outline-dark">Back to Team</Button>
      </Container>
    );
  }

  const bioParagraphs = member.fullBio.split('\n\n');

  return (
    <Container className="team-member-detail-page py-5">
      
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h1 className="member-name">{member.name}</h1>
          {member.title && <h2 className="member-title">{member.title}</h2>}
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col md={6}>
          <img
            src={member.image}
            alt={member.name}
            className="img-fluid d-block mx-auto member-detail-image"
          />
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          {bioParagraphs.map((paragraph, index) => (
            <p key={index} className="member-bio">{paragraph}</p>
          ))}
        </Col>
      </Row>
      
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
