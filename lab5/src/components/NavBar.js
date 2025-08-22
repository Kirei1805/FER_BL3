import React from 'react';
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';

const NavBar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalFavourites } = useFavourites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar 
      bg={isDarkMode ? 'dark' : 'light'} 
      variant={isDarkMode ? 'dark' : 'light'} 
      expand="lg" 
      className="mb-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🍽️ Nhà hàng Delicious
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/products">Sản phẩm</Nav.Link>
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
            )}
          </Nav>
          
          <Nav className="ms-auto">
            {/* Theme Toggle */}
            <Nav.Link onClick={toggleTheme} className="me-2">
              {isDarkMode ? '☀️' : '🌙'}
            </Nav.Link>
            
            {/* Cart Icon */}
            <Nav.Link as={Link} to="/cart" className="me-2 position-relative">
              🛒
              {totalItems > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
            
            {/* Favourites Icon */}
            <Nav.Link as={Link} to="/favourites" className="me-2 position-relative">
              ❤️
              {totalFavourites > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalFavourites}
                </Badge>
              )}
            </Nav.Link>
            
            {/* User Menu */}
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                👤 {isAuthenticated ? user?.name || 'User' : 'Guest'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isAuthenticated ? (
                  <>
                    <Dropdown.Item as={Link} to="/profile">Hồ sơ</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/favourites">Yêu thích</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/login">Đăng nhập</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">Đăng ký</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

