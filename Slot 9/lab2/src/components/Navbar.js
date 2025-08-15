import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = ({ activePage, onPageChange }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="mb-4">
      <Container>
        <Navbar.Brand href="#home" onClick={() => onPageChange('home')}>
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              active={activePage === 'home'} 
              onClick={() => onPageChange('home')}
            >
              Free Movies
            </Nav.Link>
            <Nav.Link 
              active={activePage === 'favourites'} 
              onClick={() => onPageChange('favourites')}
            >
              My Favourite Movies
            </Nav.Link>
            <Nav.Link 
              active={activePage === 'form'} 
              onClick={() => onPageChange('form')}
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  activePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default NavigationBar;

