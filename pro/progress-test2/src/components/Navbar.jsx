import React, { useState } from 'react';
import { Navbar, Nav, Container, Badge, Button, Modal } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // TODO: These will be replaced with actual context values
  const favouritesCount = 0;
  const cartCount = 0;
  const isLoggedIn = false;
  const user = null;

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = (userData) => {
    console.log('Login successful:', userData);
    setShowLoginModal(false);
    // TODO: Update user context
  };

  const handleFavouritesClick = () => {
    // TODO: Navigate to favourites page
    console.log('Navigate to favourites');
  };

  const handleCartClick = () => {
    // TODO: Navigate to cart page
    console.log('Navigate to cart');
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand 
            href="#" 
            onClick={() => navigate('/products')}
            className="cursor-pointer"
          >
            Phone Store
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/products')}>
                Sản phẩm
              </Nav.Link>
            </Nav>
            
            <Nav className="ms-auto">
              {/* Favourites */}
              <Nav.Link onClick={handleFavouritesClick} className="position-relative">
                <FaHeart className="me-1" />
                Yêu thích
                {favouritesCount > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {favouritesCount}
                  </Badge>
                )}
              </Nav.Link>
              
              {/* Cart */}
              <Nav.Link onClick={handleCartClick} className="position-relative">
                <FaShoppingCart className="me-1" />
                Giỏ hàng
                {cartCount > 0 && (
                  <Badge 
                    bg="success" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
              
              {/* Login/User */}
              {isLoggedIn && user ? (
                <Nav.Link onClick={handleLogout}>
                  <FaUser className="me-1" />
                  {user.email} (Đăng xuất)
                </Nav.Link>
              ) : (
                <Nav.Link onClick={handleLoginClick}>
                  <FaSignInAlt className="me-1" />
                  Đăng nhập
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm 
            onLoginSuccess={handleLoginSuccess}
            onCancel={handleCloseLogin}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomNavbar;
