import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';

const Favourites = () => {
  const { favourites, totalFavourites } = useFavourites();
  const { isDarkMode } = useTheme();

  if (totalFavourites === 0) {
    return (
      <div className={`favourites-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <div className="empty-favourites">
                <h2>❤️ Danh sách yêu thích trống</h2>
                <p className="text-muted mb-4">
                  Bạn chưa có sản phẩm nào trong danh sách yêu thích.
                </p>
                <Button 
                  as={Link}
                  to="/products" 
                  variant="primary" 
                  size="lg"
                >
                  Khám phá sản phẩm
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className={`favourites-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="display-4 fw-bold text-center mb-3">
              ❤️ Danh sách yêu thích
            </h1>
            <p className="lead text-center text-muted">
              Những sản phẩm bạn đã yêu thích ({totalFavourites} sản phẩm)
            </p>
          </Col>
        </Row>

        {/* Favourites Grid */}
        <Row className="g-4">
          {favourites.map(product => (
            <Col key={product.id} lg={3} md={4} sm={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        {/* Action Buttons */}
        <Row className="mt-5">
          <Col className="text-center">
            <Button 
              as={Link}
              to="/products" 
              variant="outline-primary" 
              size="lg"
              className="me-3"
            >
              🛍️ Tiếp tục mua hàng
            </Button>
            <Button 
              as={Link}
              to="/cart" 
              variant="success" 
              size="lg"
            >
              🛒 Xem giỏ hàng
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Favourites;
