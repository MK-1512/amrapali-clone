import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { teamMembers } from '../data/team';
import TeamMemberCard from '../components/team/TeamMemberCard';

const MeetTheTeamPage = ({ onSelectMember }) => {
  const firstRowMembers = teamMembers.slice(0, 3);
  const secondRowMembers = teamMembers.slice(3, 7);

  return (
    <Container className="meet-the-team-page py-5">
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1 className="page-title mb-3">MEET THE TEAM</h1>
          <p className="intro-text">
            At Amrapali, we believe that teamwork makes all the difference and brings the ‘extra’ into the
            ordinary. We love what we do and who we do it with. Meet us.
          </p>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4 mb-4 justify-content-center">
        {firstRowMembers.map((member) => (
          <Col key={member.id}>
            <TeamMemberCard member={member} onSelectMember={onSelectMember} />
          </Col>
        ))}
      </Row>

      <Row xs={1} md={2} lg={4} className="g-4 mb-5 justify-content-center">
        {secondRowMembers.map((member) => (
          <Col key={member.id}>
            <TeamMemberCard member={member} onSelectMember={onSelectMember} />
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center text-center">
        <Col md={8}>
          <p className="concluding-text">
           Apart from our core team, our extended team comprises our courier partners, web developers, graphic designers, distributors and to top it all, the exceptional and dexterous artisans, tailors, spinners, weavers, painters and other artists, who form the most crucial connection in our supply chain and make it all come to life.

We firmly believe that we have something special to offer to the world and are committed to make a change in the way fashion is created and consumed. Together, we motivate each other to give you the best shopping experience. And we have a lot of fun, doing that. :)
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MeetTheTeamPage;

