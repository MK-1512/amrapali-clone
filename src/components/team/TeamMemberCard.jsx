import React from 'react';
import { Button } from 'react-bootstrap';

// This component receives the 'onSelectMember' function from MeetTheTeamPage
const TeamMemberCard = ({ member, onSelectMember }) => {
  
  // This function is called when any part of the card is clicked.
  const handleCardClick = () => {
    // It passes the member's ID up to the App component to trigger the page change.
    onSelectMember(`team-member-detail-${member.id}`);
  };

  return (
    // The onClick handler on the main container fixes the "Read More" button.
    <div className="team-member-card" onClick={handleCardClick}>
      
      {/* This inner div is required for the 3D transformation. */}
      <div className="card-inner">
        
        {/* This is the front side of the card, visible by default. */}
        <div className="card-front">
          <img src={member.image} alt={member.name} className="card-image" />
          <div className="card-name-overlay">{member.name}</div>
        </div>
        
        {/* This is the back side of the card, visible on hover. */}
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

