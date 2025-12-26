import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { collectionsData } from '../data/allCollectionsMeta';

const CollectionCard = ({ collection, onClick }) => {
    const cardStyle = {
        position: 'relative',
        height: '400px',
        backgroundImage: `url(${collection.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        marginBottom: '30px',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
        transition: 'background-color 0.3s ease',
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2,
        padding: '20px',
    };

     const buttonStyle = {
        backgroundColor: '#fff',
        color: '#1c1c1c',
        border: 'none',
        padding: '8px 20px',
        fontSize: '11px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginTop: '15px',
        transition: 'all 0.3s ease',
        borderRadius: 0,
     };

     const titleStyle = {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '24px',
        fontWeight: 600,
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
     };


    return (
        <div style={cardStyle} onClick={() => onClick(collection.navType, collection.navKey)}>
            <div style={overlayStyle} className="card-overlay"></div>
            <div style={contentStyle}>
                <h4 style={titleStyle}>{collection.title}</h4>
                <Button style={buttonStyle} variant="light">
                    View Products
                </Button>
            </div>
        </div>
    );
};


const AllCollectionsPage = ({ setPage, onCollectionItemClick }) => {

    const handleCardClick = (navType, navKey) => {
        if (navType === 'collection') {
            onCollectionItemClick(navKey);
        } else {
            setPage(navKey);
        }
    };

     const pageStyles = `
     .all-collections-container {
         padding-top: 30px; /* Reduced space from header compared to hero banners */
         padding-bottom: 60px;
     }
     .all-collections-title {
         font-family: 'Jost', sans-serif;
         font-size: 14px;
         font-weight: 600;
         letter-spacing: 0.15em;
         text-transform: uppercase;
         color: #1c1c1c;
         text-align: center;
         margin-bottom: 40px;
     }
     .collection-card-wrapper:hover .card-overlay {
        background-color: rgba(0, 0, 0, 0.55); /* Darken overlay on hover */
     }
      .collection-card-wrapper:hover button {
        background-color: #f0f0f0; /* Slightly off-white hover for button */
      }
   `;


    return (
         <>
            <style>{pageStyles}</style>
            <Container className="all-collections-container">
                <h1 className="all-collections-title">ALL COLLECTIONS</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {collectionsData.map((collection) => (
                        <Col key={collection.id} className="collection-card-wrapper">
                            <CollectionCard
                                collection={collection}
                                onClick={handleCardClick}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
         </>
    );
};

export default AllCollectionsPage;