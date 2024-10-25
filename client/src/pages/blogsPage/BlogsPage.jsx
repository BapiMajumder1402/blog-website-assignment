import React, { useState, useEffect } from 'react';
import { useGetBlogsQuery, useGetUniqueAuthorsQuery } from '../../redux/apis/blogApis';
import { Dropdown, Form, Pagination, InputGroup, Row, Col } from 'react-bootstrap';
import BlogCard from '../../components/blogCards/BlogCard';
import './BlogsPage.css';

const BlogsPage = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortByDate, setSortByDate] = useState('asc');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTitle);

  const { data, isLoading, isError } = useGetBlogsQuery({ title: debouncedSearchTerm, page: currentPage, limit: pageSize, sortOrder: sortByDate });
  // const { data: authors } = useGetUniqueAuthorsQuery();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTitle);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTitle]);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSortChange = (order) => {
    setSortByDate(order);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching blogs.</p>;

  const { blogs, total } = data?.data || { blogs: [], total: 0 };
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mt-4 page">
      <h1>Blogs</h1>
      
      <Row className="mb-3">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Page Size: {pageSize}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[5, 10, 20, 50].map(size => (
                <Dropdown.Item key={size} onClick={() => handlePageSizeChange(size)}>
                  {size}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By Date: {sortByDate === 'asc' ? 'Ascending' : 'Descending'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange('asc')}>Ascending</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('desc')}>Descending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col><Form onSubmit={handleSearch} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search title of blogs..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="custom-search-bar"
          />
        </InputGroup>
      </Form></Col>
      </Row>
      <Row>
        {blogs?.map((blog) => (
          <Col md={4} key={blog._id} className="mb-3">
            <BlogCard
              id={blog._id}
              title={blog.title}
              content={blog.content}
              author={blog?.author?.fullName || 'Unknown'}
              date={blog.createdAt}
            />
          </Col>
        ))}
        {blogs?.length === 0 && (
          <Col>
            <p className="text-center">No blogs found.</p>
          </Col>
        )}
      </Row>
      <div className="d-flex align-items-center justify-content-center">
        <Pagination className="mt-4">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>{index + 1}</Pagination.Item>))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </div>
  );
};

export default BlogsPage;
