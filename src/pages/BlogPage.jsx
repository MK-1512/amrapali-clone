import React from 'react';
import { blogPosts } from '../data/blogPosts';

// Sub-component for a single blog post card
const BlogPostCard = ({ post }) => {
  return (
    <div className="blog-post-card">
      <a href="#" className="blog-post-image-link">
        <img src={post.image} alt={post.title} className="img-fluid" />
      </a>
      <div className="blog-post-content">
        <h2 className="blog-post-title">
          <a href="#">{post.title}</a>
        </h2>
        <p className="blog-post-excerpt">{post.excerpt}</p>
        <a href="#" className="blog-post-read-more">Read more</a>
      </div>
    </div>
  );
};

// The main Blog Page component
const BlogPage = () => {
  return (
    <div className="blog-page-container container my-5">
      <h1 className="blog-page-title">STORIES BY AMRAPALI</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;