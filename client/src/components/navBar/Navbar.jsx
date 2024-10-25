import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authSlice';
import './Nav.css';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    setExpanded(false);
    navigate('/');
  };

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar expanded={expanded} onToggle={handleToggle} bg="light" variant="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="logo">Blog Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto links">
            <NavLink to="/" className="navLink" onClick={handleNavLinkClick}>Home</NavLink>
            <NavLink to="/blogs" className="navLink" onClick={handleNavLinkClick}>All Blogs</NavLink>
            <NavLink to="/manage-blogs" className="navLink" onClick={handleNavLinkClick}>Manage Blogs</NavLink>
            {user ? (
              <>
                <span className="navLink">Welcome, {user.fullName}</span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="navLink" onClick={handleNavLinkClick}>Login</NavLink>
                <NavLink to="/register" className="navLink" onClick={handleNavLinkClick}>Register</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(AppNavbar);
