import React, { useState } from 'react';
import { useGetUserBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } from '../../redux/apis/blogApis';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';  

const BlogsManagePage = () => {
  const { data: blogs, isLoading, isError, refetch } = useGetUserBlogsQuery(); 
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', _id: null });

  const handleShowModal = (blog) => {
    setFormData(blog ? { ...blog } : { title: '', content: '', _id: null });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await updateBlog({ id: formData._id, title: formData.title, content: formData.content });
        toast.success('Blog updated successfully!');
      } else {
        await createBlog({ title: formData.title, content: formData.content });
        toast.success('Blog created successfully!');  
      }
      handleCloseModal();
      refetch(); 
    } catch (error) {
      toast.error('Error during submission.'); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id);
        toast.success('Blog deleted successfully!');  
        refetch();
      } catch (error) {
        toast.error('Error deleting blog.');  
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching blogs.</p>;

  return (
    <div className="container mt-4 page">
      <h1 className="mb-4 text-center">Manage Your Blogs</h1>
      <Button variant="primary" className="mb-3" onClick={() => handleShowModal(null)}>Add New Blog</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs && blogs.data?.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal(blog)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(blog._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{formData._id ? 'Edit Blog' : 'Add New Blog'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={3}
              />
            </Form.Group>
            <button type="submit" className="mt-3 loginRegisterBtn">
              {formData._id ? 'Update Blog' : 'Create Blog'}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BlogsManagePage;
