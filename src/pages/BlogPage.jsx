// src/pages/BlogPage.jsx
import React from 'react';
import { blogPosts } from '../data/blogPosts';

// Sub-component for rendering individual blog post content
const BlogPostDetail = ({ post, setPage }) => {
  const renderContent = (item, index) => {
    switch (item.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {item.text}
          </p>
        );

      case 'paragraphWithLink':
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {item.text}{' '}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 underline"
            >
              {item.linkText}
            </a>
          </p>
        );

      case 'heading':
        const HeadingTag = `h${item.level}`;
        const headingClasses = {
          3: 'text-2xl font-bold mb-4 mt-8 text-gray-900',
          4: 'text-xl font-semibold mb-3 mt-6 text-gray-800',
          5: 'text-lg font-semibold mb-3 mt-5 text-gray-800',
        };
        return React.createElement(
          HeadingTag,
          { key: index, className: headingClasses[item.level] || headingClasses[4] },
          item.text
        );

      case 'image':
        return (
          <div key={index} className="my-6">
            <img
              src={item.url}
              alt={item.alt || 'Blog image'}
              className="w-100 rounded shadow"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
        );

      case 'imageWithLink':
        return (
          <div key={index} className="my-6">
            <a
              href={item.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="d-block"
            >
              <img
                src={item.url}
                alt={item.alt || 'Product image'}
                className="w-100 rounded shadow"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </a>
          </div>
        );

      case 'blockquote':
        // Handle blockquote with special poem styling (Blog 3)
        if (item.style === 'poem') {
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
                {item.content.map((line, i) => (
                  <div key={i}>
                    {line === '' ? (
                      <div style={{ height: '1.5rem' }} />
                    ) : (
                      <p className="mb-1" style={{ fontSize: '1rem' }}>
                        {line}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </blockquote>
          );
        }

        // Handle regular blockquote (Blog 2)
        return (
          <blockquote
            key={index}
            className="my-4 ps-4 border-start border-3 border-secondary"
          >
            <div className="d-flex flex-column gap-2">
              {item.content.map((contentItem, i) => {
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

      case 'linkList':
        return (
          <ul key={index} className="mb-4 list-unstyled">
            {item.links.map((link, i) => (
              <li key={i} className="mb-2">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 text-decoration-underline"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        );

      case 'numberedList':
        return (
          <ol key={index} className="mb-4">
            {item.items.map((listItem, i) => {
              const parts = listItem.split('\n');
              return (
                <li key={i} className="mb-3">
                  {parts.map((part, j) => {
                    const boldMatch = part.match(/\*\*(.*?)\*\*/);
                    if (boldMatch) {
                      return (
                        <p key={j} className="mb-2">
                          <strong>{boldMatch[1]}</strong>
                          {part.replace(/\*\*(.*?)\*\*/, '')}
                        </p>
                      );
                    }
                    return (
                      <p key={j} className="mb-2">
                        {part}
                      </p>
                    );
                  })}
                </li>
              );
            })}
          </ol>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setPage('blog')}
            className="btn btn-outline-secondary mb-4"
          >
            ← Back to Stories
          </button>

          {/* Blog Header */}
          <article>
            <img
              src={post.image}
              alt={post.title}
              className="w-100 rounded shadow mb-4"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />

            <div className="mb-4">
              <h1 className="display-5 fw-bold text-gray-900 mb-3">
                {post.title}
              </h1>
              <div className="d-flex align-items-center text-muted small">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
            </div>

            {/* Blog Content */}
            <div className="blog-content">
              {post.structuredContent?.map((item, index) =>
                renderContent(item, index)
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

// Sub-component for a single blog post card
const SimpleBlogPostCard = ({ post, setPage }) => {
  const handleNavigate = (e) => {
    e.preventDefault();
    setPage(`blog-detail-${post.id}`);
  };

  return (
    <div className="blog-post-card">
      <a href="#" className="blog-post-image-link" onClick={handleNavigate}>
        <img src={post.image} alt={post.title} className="img-fluid" />
      </a>
      <div className="blog-post-content">
        <h2 className="blog-post-title">
          <a href="#" onClick={handleNavigate}>
            {post.title}
          </a>
        </h2>
        <p className="blog-post-excerpt">{post.excerpt}</p>
        <a href="#" className="blog-post-read-more" onClick={handleNavigate}>
          Read more
        </a>
      </div>
    </div>
  );
};

// The main Blog Page component
const BlogPage = ({ setPage, currentPage }) => {
  if (currentPage && currentPage.startsWith('blog-detail-')) {
    const blogId = parseInt(currentPage.replace('blog-detail-', ''));
    const post = blogPosts.find((p) => p.id === blogId);

    if (post) {
      return <BlogPostDetail post={post} setPage={setPage} />;
    }
  }

  return (
    <div className="blog-page-container container my-5">
      <h1 className="blog-page-title">STORIES BY AMRAPALI</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <SimpleBlogPostCard key={post.id} post={post} setPage={setPage} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
