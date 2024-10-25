import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleBlogQuery } from '../../redux/apis/blogApis';
import { useCreateCommentMutation, useDeleteCommentMutation } from '../../redux/apis/commentApis';
import { useSelector } from 'react-redux';
import './BlogDetails.css';

const BlogDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const { data: blog, isLoading, isError, refetch } = useGetSingleBlogQuery(id); 
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [commentContent, setCommentContent] = useState(''); 
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentContent.trim()) {
      await createComment({ blogId: id, content: commentContent });
      setCommentContent('');
      refetch(); 
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log(commentId);
    await deleteComment( commentId );
    refetch();
  };

  if (isLoading) return <p>Loading blog details...</p>;
  if (isError || !blog) return <p>Error fetching blog details.</p>;

  return (
    <div className="page">
      <div className="blog-details-container">
        <h1 className="blog-title">{blog.data.title}</h1>
        <p className="blog-content">{blog.data.content}</p>
        <div className="blog-meta">
          <p><strong>Author:</strong> {blog.data.author}</p>
          <p><strong>Created At:</strong> {new Date(blog.data.createdAt).toLocaleDateString()}</p>
        </div>
        <h3 className="comments-header">Comments</h3>
        <div className="comments-list">
          {blog.data.comments?.length ? (
            blog.data.comments.map((comment) => (
              <div className="comment-item" key={comment._id}>
                <strong>{comment.commenter?.fullName || 'Anonymous'}:</strong> {comment.content}
                {user && user._id === comment.commenter?._id && (
                  <button className="delete-button" onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>)}
              </div>
            ))
          ) : (<p>No comments yet.</p>)}</div>
        {user && (
          <>
            <h3>Add a Comment</h3>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <input
                type="text"
                className="comment-input"
                placeholder="Write your comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
              <button className="submit-button" type="submit">Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
