import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleBlogQuery } from '../../redux/apis/blogApis';
import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from '../../redux/apis/commentApis';
import { useSelector } from 'react-redux';
import './BlogDetails.css';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast'; 

const BlogDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const { data: blog, isLoading, isError, refetch } = useGetSingleBlogQuery(id); 
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [showModal, setShowModal] = useState(false); 

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentContent.trim()) {
      await createComment({ blogId: id, content: commentContent });
      setCommentContent('');
      refetch(); 
      toast.success('Comment added successfully!');
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    refetch();
    toast.success('Comment deleted successfully!'); 
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditingContent(comment.content);
    setShowModal(true); 
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (editingContent.trim()) {
      await updateComment({ commentId: editingCommentId, content: editingContent });
      setEditingCommentId(null);
      setEditingContent('');
      setShowModal(false); 
      refetch();
      toast.success('Comment updated successfully!'); 
    }
  };

  if (isLoading) return <p>Loading blog details...</p>;
  if (isError || !blog) return <p>Error fetching blog details.</p>;

  return (
    <div className="page">
      <div className="blog-details-container">
        <h1 className="blog-title">{blog?.data?.title}</h1>
        <p className="blog-content">{blog?.data?.content}</p>
        <div className="blog-meta">
          <p><strong>Author:</strong> {blog?.data?.author?.fullName}</p>
          <p><strong>Published on:</strong> {new Date(blog.data.createdAt)?.toLocaleDateString()}</p>
        </div>
        <h3 className="comments-header">Comments</h3>
        <div className="comments-list">
          {blog?.data?.comments?.length ? (
            blog?.data?.comments?.map((comment) => (
              <div className="comment-item" key={comment._id}>
                <strong>{comment?.commenter?.fullName || 'Anonymous'}:</strong> <p>{comment.content}</p> 
                {user && user._id === comment.commenter?._id && (
                  <div className='d-flex justify-content-between align-items-center'>
                    <button className="edit-button" onClick={() => handleEditComment(comment)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (<p>No comments yet.</p>)}
        </div>
        {user && (
          <>
            <h3>Add a Comment</h3>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                className="comment-textarea"
                placeholder="Write your comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
              <button className="submit-button mt-3" type="submit">Submit</button>
            </form>
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateComment}>
            <textarea
              className="comment-textarea"
              placeholder="Edit your comment..."
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              required
              style={{width:"100%"}}
            />
            <div className="modal-buttons">
              <button style={{width:"100%"}} type="submit" className="submit-button mt-3">Update</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BlogDetails;
