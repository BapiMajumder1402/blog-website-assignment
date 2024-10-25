import React from 'react';
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import BlogCard from '../blogCards/BlogCard';
import { useGetBlogsQuery } from '../../redux/apis/blogApis';

const RecentBlogs = () => {
    const { data: blogs, isLoading, isError } = useGetBlogsQuery({ limit: 6, sortOrder: 'desc', });
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (isError) {
        return <Alert variant="danger">Error fetching blogs. Please try again later.</Alert>;
    }

    if (!blogs?.data?.blogs?.length) {
        return <Alert variant="info">No recent blogs available.</Alert>;
    }

    return (
        <Container>
            <h2 className="text-center my-4">Recent Blogs</h2>
            <Row>
                {blogs?.data?.blogs?.map((blog) => (
                    <Col md={4} key={blog._id} className="mb-4">
                        <BlogCard
                            id={blog._id}
                            title={blog.title}
                            content={blog.content}
                            author={blog.author?.fullName || 'Unknown'}
                            date={new Date(blog.createdAt)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default React.memo(RecentBlogs);
