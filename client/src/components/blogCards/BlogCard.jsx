import React from 'react';
import './BlogCard.css';
import { useNavigate } from 'react-router-dom';
const BlogCard = ({ title, content, author, date , id }) => {
  const navigate = useNavigate()
  return (
    <div className="blog-card" onClick={()=>{navigate(`/blog/${id}`)}}>
      <h2 className="blog-title">{title}</h2>
      <p className="blog-content">{content.length > 100 ? `${content.substring(0, 100)}...` : content}</p>
      <div className="blog-footer">
        <span className="author-name">{author}</span>
        <span className="blog-date">{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default BlogCard;
