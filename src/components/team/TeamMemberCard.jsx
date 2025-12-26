import React from 'react';
import { Button } from 'react-bootstrap';

const TeamMemberCard = ({ member, onSelectMember }) => {
  
  const handleCardClick = () => {
    onSelectMember(`team-member-detail-${member.id}`);
  };

  return (
    <div className="team-member-card" onClick={handleCardClick}>
      
      <div className="card-inner">
        
        <div className="card-front">
          <img src={member.image} alt={member.name} className="card-image" />
          <div className="card-name-overlay">{member.name}</div>
        </div>
        
        <div className="card-back">
          <p className="short-bio">{member.shortBio}</p>
          <Button 
            variant="outline-light" 
            size="sm"
            className="read-more-btn"
          >
            Read More
          </Button>
        </div>

      </div>
    </div>
  );
};

export default TeamMemberCard;

