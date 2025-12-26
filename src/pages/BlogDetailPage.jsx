import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { blogPosts } from '../data/blogPosts';

const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#4267B2"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.728-.666 1.58-.666 2.477 0 1.999 1.151 3.666 2.812 4.646-.949-.03-1.808-.288-2.548-.697v.067c0 2.787 1.977 5.176 4.634 5.706-.484.132-.99.202-1.512.202-.372 0-.734-.036-1.08-.104.732 2.28 2.87 3.94 5.4 3.985-1.956 1.53-4.418 2.441-7.096 2.441-.46 0-.91-.027-1.355-.079 2.529 1.638 5.539 2.595 8.78 2.595 10.537 0 16.299-8.749 16.299-16.299 0-.249-.006-.497-.017-.743.111-.08.216-.168.318-.264z"/></svg>;
const PinterestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#E60023"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.117.223.084.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.318.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>;


const getBlogImageUrl = (imageName) => {
  const imageMap = {
      'stuti-amrutam': 'https://placehold.co/600x400/8fbc8f/ffffff?text=Stuti+Amrutam',
      'leesha-adah': 'https://placehold.co/600x400/ffb6c1/ffffff?text=Leesha+Adah',
      'deepanjali-heyday': 'https://placehold.co/600x400/90ee90/ffffff?text=Deepanjali+Heyday',
      'srabasti-sohini-hutke': 'https://placehold.co/600x400/ffdab9/ffffff?text=Srabasti+Sohini+Hutke',
      'sheena-blue-sheep': 'https://placehold.co/600x400/add8e6/ffffff?text=Sheena+Blue+Sheep',
      'monalisha-earthaments': 'https://placehold.co/600x400/d3d3d3/ffffff?text=Monalisha+Earthaments',
      'accessorize-choker': 'https://www.amrapaliboutique.in/cdn/shop/products/DSC06952_large.jpg?v=1642793977',
      'accessorize-studs': 'https://www.amrapaliboutique.in/cdn/shop/products/IMG_7767_large.jpg?v=1642803540',
      'accessorize-ring': 'https://placehold.co/600x400/cccccc/ffffff?text=Accessorize+Ring',
      'accessorize-pendant': 'https://www.amrapaliboutique.in/cdn/shop/products/DSC06952_large.jpg?v=1642793977',
      'accessorize-kada': 'https://placehold.co/600x400/cccccc/ffffff?text=Accessorize+Kada',
      'must-have-white-red': 'https://www.amrapaliboutique.in/cdn/shop/products/1_b666a4ca-6278-4e05-a20f-1afe57de0e2b_large.jpg?v=1658160157',
      'must-have-black': 'https://www.amrapaliboutique.in/cdn/shop/products/1_62c51c43-d8e3-4803-b2b1-af743af3ef89_large.jpg?v=1572939766',
      'must-have-lightweight': 'https://www.amrapaliboutique.in/cdn/shop/products/DSC02573_large.jpg?v=1651044569',
      'must-have-benarasi': 'https://www.amrapaliboutique.in/cdn/shop/files/IMG_6787_large.jpg?v=1725168737',
      'must-have-silk': 'https://www.amrapaliboutique.in/cdn/shop/products/1_fcd78349-4218-400e-8e1a-ef359c4513fd_large.jpg?v=1581768880',
      'must-have-tussar': 'https://www.amrapaliboutique.in/cdn/shop/products/1_b666a4ca-6278-4e05-a20f-1afe57de0e2b_large.jpg?v=1658160157',
      'must-have-white': 'https://www.amrapaliboutique.in/cdn/shop/products/1_3_88a70303-edb0-40f2-844a-9aaa053482c8_large.jpg?v=1589819889',
      'must-have-mood': 'https://www.amrapaliboutique.in/cdn/shop/products/1_c9cfb7f4-e0f8-49fa-9aa2-1ee388d62aae_large.jpg?v=1597351082',
  };
  return imageMap[imageName] || `https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found`;
};


const renderTextWithBold = (text) => {
    const safeText = String(text || '');
    const parts = safeText.split('**');
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
};

const renderContentBlock = (block, index) => {
    switch (block.type) {
        case 'paragraph':
            return <p key={index}>{renderTextWithBold(block.text)}</p>;
        case 'heading':
            const HeadingTag = `h${block.level || 4}`;
            return block.text ? <HeadingTag key={index}>{renderTextWithBold(block.text)}</HeadingTag> : null;
        case 'image':
            return block.url ? <img key={index} src={block.url} alt={block.alt || 'Blog image'} className="img-fluid blog-embedded-image my-4" /> : null;
         case 'imageWithLink':
            if (!block.url || !block.productUrl) return null;
            return (
                <a href={block.productUrl} key={index} className="blog-image-link d-block my-4">
                    <img src={block.url} alt={block.alt || 'Product image'} className="img-fluid blog-embedded-image" />
                </a>
            );
        case 'linkList':
             return (
                <div key={index} className="blog-link-list my-3">
                    {block.links?.map((link, linkIndex) => (
                        link.url && link.text ? (
                            <a
                                href={link.url}
                                key={linkIndex}
                                target={link.external ? "_blank" : "_self"}
                                rel={link.external ? "noopener noreferrer" : ""}
                                className="blog-content-link"
                            >
                                {link.text}
                            </a>
                        ) : null
                    ))}
                </div>
            );
        case 'paragraphWithLink':
            return (
                <p key={index}>
                    {renderTextWithBold(block.text)}
                    {block.url && block.linkText && (
                        <a
                            href={block.url}
                            target={block.external ? "_blank" : "_self"}
                            rel={block.external ? "noopener noreferrer" : ""}
                            className="blog-content-link inline"
                        >
                           {block.linkText}
                        </a>
                    )}
                </p>
            );
        case 'numberedList':
            return (
                <ol key={index} className="blog-numbered-list">
                    {block.items?.map((item, itemIndex) => {
                        const lines = String(item || '').split('\n');
                        return (
                            <li key={itemIndex}>
                                {lines.map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                        {renderTextWithBold(line)}
                                        {lineIndex < lines.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </li>
                        );
                    })}
                </ol>
            );
        case 'blockquote':
            if (block.style === 'poem') {
              return (
                <blockquote
                  key={index}
                  className="my-5 p-4 bg-light border-start border-4 border-danger rounded"
                  style={{
                    borderLeftColor: '#e63946',
                    backgroundColor: '#fff5f7',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      color: '#333',
                      lineHeight: '1.8',
                    }}
                  >
                    {block.content?.map((line, i) => (
                      <div key={i}>
                        {line === '' ? (
                          <div style={{ height: '1.5rem' }} />
                        ) : (
                          <p className="mb-1" style={{ fontSize: '1rem' }}>
                            {renderTextWithBold(line)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </blockquote>
              );
            }

            return (
              <blockquote
                key={index}
                className="my-4 ps-4 border-start border-3 border-secondary"
              >
                <div className="d-flex flex-column gap-2">
                  {block.content?.map((contentItem, i) => {
                    if (contentItem.type === 'link') {
                      return (
                        <div key={i}>
                          <a
                            href={contentItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-rose-600 text-decoration-underline d-block"
                          >
                            {contentItem.text}
                          </a>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </blockquote>
            );
        default:
            console.warn("Unknown content block type:", block.type);
            return null;
    }
};


const RelatedPostCard = ({ post, onSelectPost }) => (
    post ? (
        <div className="related-post-card" onClick={() => onSelectPost(post.id)}>
            <img src={post.image} alt={post.title} className="img-fluid mb-2" />
            <p>{post.title}</p>
        </div>
    ) : null
);


const BlogDetailPage = ({ postId, setPage }) => {
    const postIndex = blogPosts.findIndex(p => p && p.id === postId);
    const post = postIndex !== -1 ? blogPosts[postIndex] : null;

    if (!post) {
        return (
            <Container className="text-center py-5">
                <h2>Blog Post Not Found</h2>
                <Button onClick={() => setPage('blog')} variant="outline-dark">Back to Blog</Button>
            </Container>
        );
    }

    const postDate = post.date || "Date Unavailable";
    const postAuthor = post.author || "Amrapali Boutique";

    const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
    const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

    const navigateToPost = (targetPostId) => {
        if (targetPostId) {
            setPage(`blog-detail-${targetPostId}`);
             window.scrollTo(0, 0);
        }
    };

    const relatedPosts = blogPosts.filter(p => p && p.id !== postId).slice(0, 2);

    const handleRelatedPostClick = (selectedPostId) => {
        navigateToPost(selectedPostId);
    };

    return (
        <Container className="blog-detail-page-container pt-4 pb-5">
             <div className="now-reading-bar">
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="now-reading-text">NOW READING: {post.title || 'Blog Post'}</span>
                         <div className="d-flex align-items-center">
                             <div className="blog-detail-share d-none d-md-inline-block">
                                SHARE
                                <a href="#" className="ms-2"><FacebookIcon /></a>
                                <a href="#" className="ms-2"><TwitterIcon /></a>
                                <a href="#" className="ms-2"><PinterestIcon /></a>
                            </div>
                            <div className="blog-nav-buttons ms-md-4">
                                <Button variant="link" onClick={() => navigateToPost(prevPost?.id)} disabled={!prevPost} className="blog-nav-btn prev">&lt; PREV</Button>
                                <span className="nav-divider">|</span>
                                <Button variant="link" onClick={() => navigateToPost(nextPost?.id)} disabled={!nextPost} className="blog-nav-btn next">NEXT &gt;</Button>
                            </div>
                        </div>
                    </div>
                 </Container>
            </div>

            <Row className="justify-content-center pt-4">
                <Col md={9} lg={8}>
                    <div className="blog-detail-header text-center mb-4">
                        {post.image && (
                            <img src={post.image} alt={post.title || 'Blog header'} className="img-fluid blog-detail-image mb-4" />
                        )}
                        <p className="blog-detail-meta">{postDate}</p>
                        <h1 className="blog-detail-title">{post.title || 'Untitled Post'}</h1>
                    </div>

                    <div className="blog-detail-content">
                        {Array.isArray(post.structuredContent) ? post.structuredContent.map(renderContentBlock) : <p>{post.fullContent || post.excerpt}</p>}
                    </div>

                     <div className="blog-detail-footer mt-5 d-flex justify-content-between align-items-center">
                        <span>WRITTEN BY {postAuthor.toUpperCase()}</span>
                        <div className="blog-detail-share">
                            SHARE
                             <a href="#" className="ms-2"><FacebookIcon /></a>
                             <a href="#" className="ms-2"><TwitterIcon /></a>
                             <a href="#" className="ms-2"><PinterestIcon /></a>
                        </div>
                    </div>

                    <div className="blog-comment-section mt-5">
                        <h4 className="blog-comment-title">LEAVE A COMMENT</h4>
                        <Form>
                           <Row>
                                <Col md={6}><Form.Group className="mb-3" controlId="commentName"><Form.Control type="text" placeholder="Name" className="blog-comment-input" /></Form.Group></Col>
                                <Col md={6}><Form.Group className="mb-3" controlId="commentEmail"><Form.Control type="email" placeholder="Email" className="blog-comment-input" /></Form.Group></Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="commentContent"><Form.Control as="textarea" rows={4} placeholder="Content" className="blog-comment-textarea" /></Form.Group>
                            <p className="blog-comment-moderation-note">All comments are moderated before being published.</p>
                            <Button variant="dark" type="submit" className="blog-comment-submit-btn">POST COMMENT</Button>
                        </Form>
                    </div>

                     {relatedPosts.length > 0 && (
                        <div className="related-posts-section mt-5">
                            <Row>
                                {relatedPosts.map(relatedPost => (
                                    relatedPost ? (
                                        <Col md={6} key={relatedPost.id}>
                                             <RelatedPostCard post={relatedPost} onSelectPost={handleRelatedPostClick} />
                                        </Col>
                                    ) : null
                                ))}
                            </Row>
                        </div>
                     )}
                </Col>
            </Row>
        </Container>
    );
};

export default BlogDetailPage;