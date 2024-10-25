import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>We are a blog management platform providing amazing content across various domains.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/blogs" className="text-light">Blogs</a></li>
              <li><a href="/manage-blogs" className="text-light">Manage Blogs</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: nbbapim@gmail.com</p>
            <p>Phone: +91 7005643072</p>
          </Col>
        </Row>
        <div className="text-center mt-3">
          &copy; {new Date().getFullYear()} MyApp. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
