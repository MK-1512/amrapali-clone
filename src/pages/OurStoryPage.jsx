import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OurStoryPage = () => {
    const pageStyles = `
    .our-story-container {
        padding-top: 60px; /* Space from header */
        padding-bottom: 60px;
    }
    .our-story-title {
        font-family: 'Jost', sans-serif;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #1c1c1c;
        text-align: center;
        margin-bottom: 30px;
    }
    .story-text p {
        font-size: 15px;
        line-height: 1.9;
        color: #555;
        margin-bottom: 1.5rem;
        text-align: center; /* Center align paragraphs */
    }
  `;

    return (
        <>
            <style>{pageStyles}</style>
            <Container className="our-story-container">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h1 className="our-story-title">OUR STORY</h1>
                        <div className="story-text">
                            <p>
                                Sometimes certain things come together just right and dots simply connect on its own to create
                                something vivid and meaningful. That would be our story.
                            </p>
                            <p>
                                Founded in 2012 as a make-shift store within the four walls of a home by a wonder woman, Amrapali was
                                born out of a deep-rooted desire of touching the lives of people and making a difference in the way
                                fashion is created and consumed. From being a one-product, one-woman show, to currently being a
                                thriving enterprise sustaining the livelihood of several artisans and our small team, Amrapali has had
                                quite a remarkable journey.
                            </p>
                            <p>
                                Today, Amrapali Boutique is a humble, home-grown store tucked away in the heart of West-Bengal,
                                where we celebrate textile in all its glory while creating and curating collections that capture the spirit
                                and essence of India. The abundance of weaves, prints, embroideries and crafts around us, is an
                                unfathomable resource that amazes us every day.
                            </p>
                            <p>
                                At Amrapali, we work with master weavers and artisans from all across India to bring together textiles,
                                techniques and craftsmanship explored in natural fabrics. We believe that the people, skill and story
                                behind each product are just as beautiful as the product itself and the process of creation is as
                                important, as the finished product. Therefore, we not only aim at touching the lives of our patrons, but
                                also our weavers by sustaining their craft and providing them with a continuous flow of work.
                            </p>
                            <p>
                                In its purest form, we endeavor to blend India’s artistic traditions, hinged with modern functionality and
                                aesthetics. Join us in our journey as we strive to bring the finest woven stories straight out of the looms of
                                India, hand-crafted with love.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default OurStoryPage;