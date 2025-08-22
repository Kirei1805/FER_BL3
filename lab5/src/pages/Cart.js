import React from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalValue, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      toast.info('Đã xóa sản phẩm khỏi giỏ hàng');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để thanh toán!');
      navigate('/login');
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng trống!');
      return;
    }
    
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      clearCart();
      toast.success('Đã xóa tất cả sản phẩm');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={`cart-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <div className="empty-cart">
                <h2>🛒 Giỏ hàng trống</h2>
                <p className="text-muted mb-4">
                  Bạn chưa có sản phẩm nào trong giỏ hàng.
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleContinueShopping}
                >
                  Tiếp tục mua hàng
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className={`cart-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <h2 className="mb-4">🛒 Giỏ hàng ({cartItems.length} sản phẩm)</h2>
            
            {cartItems.map(item => (
              <Card key={item.id} className="mb-3 cart-item-card">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </Col>
                    
                    <Col md={4}>
                      <Card.Title className="mb-1">{item.name}</Card.Title>
                      <Card.Text className="text-muted mb-0">
                        {item.description}
                      </Card.Text>
                    </Col>
                    
                    <Col md={2}>
                      <div className="text-center">
                        <strong className="text-success">
                          ${item.price}
                        </strong>
                      </div>
                    </Col>
                    
                    <Col md={2}>
                      <div className="d-flex align-items-center justify-content-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        >
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          min="1"
                          value={item.quantity || 1}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="mx-2 text-center"
                          style={{ width: '60px' }}
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    
                    <Col md={2}>
                      <div className="text-center">
                        <div className="mb-2">
                          <strong className="text-primary">
                            ${((item.price * (item.quantity || 1)).toFixed(2))}
                          </strong>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.info('Đã xóa sản phẩm khỏi giỏ hàng');
                          }}
                        >
                          🗑️ Xóa
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
            
            <div className="text-end mb-3">
              <Button
                variant="outline-danger"
                onClick={handleClearCart}
              >
                🗑️ Xóa tất cả
              </Button>
            </div>
          </Col>
          
          <Col lg={4}>
            <Card className="cart-summary-card">
              <Card.Header>
                <h4 className="mb-0">📋 Tóm tắt đơn hàng</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tổng sản phẩm:</span>
                  <span>{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí vận chuyển:</span>
                  <span className="text-success">Miễn phí</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Tổng cộng:</strong>
                  <strong className="text-primary fs-5">${totalValue}</strong>
                </div>
                
                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    💳 Thanh toán
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={handleContinueShopping}
                  >
                    🛍️ Tiếp tục mua hàng
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
