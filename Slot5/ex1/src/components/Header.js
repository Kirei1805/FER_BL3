import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <FaLeaf className="text-success me-2" size={24} />
          <span className="fw-bold">Healthy Recipe Finder</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#recipes" className="text-decoration-underline">Recipes</Nav.Link>
          </Nav>
          <Button variant="success" className="px-4">
            Browse recipes
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
