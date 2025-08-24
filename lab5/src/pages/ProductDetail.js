import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavourites, removeFromFavourites, isInFavourites } = useFavourites();
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-error">
        <Container>
          <h2>❌ Sản phẩm không tồn tại</h2>
          <p>Sản phẩm bạn đang tìm kiếm không có trong hệ thống.</p>
          <Button as={Link} to="/products" variant="primary" size="lg">
            ← Quay lại danh sách sản phẩm
          </Button>
        </Container>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('🛒 Đã thêm vào giỏ hàng!');
  };

  const handleToggleFavourites = () => {
    if (!isAuthenticated) {
      toast.error('🔐 Vui lòng đăng nhập để thêm vào yêu thích!');
      return;
    }
    
    if (isInFavourites(product.id)) {
      removeFromFavourites(product.id);
      toast.success('💔 Đã hủy yêu thích!');
    } else {
      addToFavourites(product);
      toast.success('❤️ Đã thêm vào yêu thích!');
    }
  };

  const handleBackToList = () => {
    navigate('/products');
  };

  return (
    <div className={`product-detail-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container>
        {/* Back Button */}
        <div className="back-button-container">
          <Button 
            variant="outline-secondary" 
            onClick={handleBackToList}
            className="d-flex align-items-center gap-2"
          >
            ← Quay lại danh sách sản phẩm
          </Button>
        </div>

        <Row>
          {/* Product Image */}
          <Col lg={6} className="mb-4">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-detail-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Không+có+hình+ảnh';
                }}
              />
              <Badge 
                className="price-badge"
              >
                ${product.price}
              </Badge>
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <Card className="product-info-card">
              <Card.Body>
                <Card.Title className="display-5 fw-bold mb-3">
                  {product.name}
                </Card.Title>
                
                <div className="product-meta mb-3">
                  <Badge bg="primary" className="me-2">
                    {product.category}
                  </Badge>
                  <Badge bg="warning" className="me-2">
                    ⭐ {product.rating} ({product.reviews} đánh giá)
                  </Badge>
                  <Badge bg="info">
                    🌶️ {product.spicyLevel}
                  </Badge>
                </div>

                <Card.Text className="lead mb-4">
                  {product.description}
                </Card.Text>

                {/* Product Details */}
                <ListGroup className="mb-4">
                  <ListGroup.Item>
                    <strong>⏱️ Thời gian chế biến:</strong> {product.preparationTime}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>🥘 Nguyên liệu:</strong> {product.ingredients.join(', ')}
                  </ListGroup.Item>
                </ListGroup>

                {/* Action Buttons */}
                <div className="product-actions">
                  <Button 
                    variant="success" 
                    size="lg" 
                    className="me-3 mb-2"
                    onClick={handleAddToCart}
                  >
                    🛒 Thêm vào giỏ hàng
                  </Button>
                  
                  <Button 
                    variant={isInFavourites(product.id) ? "warning" : "outline-danger"} 
                    size="lg" 
                    className="me-3 mb-2"
                    onClick={handleToggleFavourites}
                  >
                    {isInFavourites(product.id) ? '❤️ Đã yêu thích' : '🤍 Yêu thích'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Related Products Section */}
        <div className="related-products-section">
          <h3>🍽️ Sản phẩm liên quan</h3>
          <div className="related-products-grid">
            {(() => {
              const relatedProducts = products
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 3);
              
              if (relatedProducts.length === 0) {
                // Nếu không có sản phẩm cùng category, hiển thị sản phẩm khác
                const otherProducts = products
                  .filter(p => p.id !== product.id)
                  .slice(0, 3);
                
                return otherProducts.map(relatedProduct => (
                  <Card key={relatedProduct.id} className="related-product-card">
                                      <Card.Img 
                    variant="top" 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x150?text=Không+có+hình+ảnh';
                      e.target.onerror = null; // Prevent infinite loop
                    }}
                    onLoad={(e) => {
                      e.target.style.display = 'block';
                    }}
                    style={{ display: 'none' }}
                  />
                    <Card.Body>
                      <Card.Title>{relatedProduct.name}</Card.Title>
                      <Card.Text>
                        ${relatedProduct.price}
                      </Card.Text>
                      <Button 
                        as={Link} 
                        to={`/product/${relatedProduct.id}`}
                        variant="outline-primary" 
                        size="sm"
                      >
                        Xem chi tiết
                      </Button>
                    </Card.Body>
                  </Card>
                ));
              }
              
                             return relatedProducts.map(relatedProduct => (
                 <Card key={relatedProduct.id} className="related-product-card">
                   <Card.Img 
                     variant="top" 
                     src={relatedProduct.image} 
                     alt={relatedProduct.name}
                     onError={(e) => {
                       e.target.src = 'https://via.placeholder.com/300x150?text=Không+có+hình+ảnh';
                       e.target.onerror = null; // Prevent infinite loop
                     }}
                     onLoad={(e) => {
                       e.target.style.display = 'block';
                     }}
                     style={{ display: 'none' }}
                   />
                  <Card.Body>
                    <Card.Title>{relatedProduct.name}</Card.Title>
                    <Card.Text>
                      ${relatedProduct.price}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/product/${relatedProduct.id}`}
                      variant="outline-primary" 
                      size="sm"
                    >
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              ));
            })()}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;

