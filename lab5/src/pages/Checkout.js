import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems, totalValue, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    zipCode: '',
    paymentMethod: 'cod'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          Vui lòng đăng nhập để thanh toán.
        </Alert>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container className="mt-4">
        <Alert variant="info">
          Giỏ hàng trống. Vui lòng thêm sản phẩm để thanh toán.
        </Alert>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
      clearCart();
      setIsProcessing(false);
      navigate('/');
    }, 2000);
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  return (
    <div className={`checkout-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <h2 className="mb-4">💳 Thanh toán</h2>
            
            <Card className="mb-4">
              <Card.Header>
                <h5>📋 Thông tin giao hàng</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Họ và tên *</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className={isDarkMode ? 'bg-dark text-light' : ''}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={isDarkMode ? 'bg-dark text-light' : ''}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className={isDarkMode ? 'bg-dark text-light' : ''}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Thành phố *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className={isDarkMode ? 'bg-dark text-light' : ''}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ giao hàng *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className={isDarkMode ? 'bg-dark text-light' : ''}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mã bưu điện</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={isDarkMode ? 'bg-dark text-light' : ''}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Phương thức thanh toán *</Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        label="💵 Thanh toán khi nhận hàng (COD)"
                        className="mb-2"
                      />
                      <Form.Check
                        type="radio"
                        id="bank"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleInputChange}
                        label="🏦 Chuyển khoản ngân hàng"
                        className="mb-2"
                      />
                      <Form.Check
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        label="💳 Thẻ tín dụng/ghi nợ"
                      />
                    </div>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      disabled={isProcessing}
                      className="flex-fill"
                    >
                      {isProcessing ? '⏳ Đang xử lý...' : '✅ Đặt hàng'}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={handleBackToCart}
                      disabled={isProcessing}
                    >
                      ← Quay lại
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Header>
                <h5>🛒 Đơn hàng của bạn</h5>
              </Card.Header>
              <Card.Body>
                <Table borderless className="mb-3">
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              className="me-2"
                            />
                            <div>
                              <small className="fw-bold">{item.name}</small>
                              <br />
                              <small className="text-muted">Số lượng: {item.quantity || 1}</small>
                            </div>
                          </div>
                        </td>
                        <td className="text-end">
                          <small className="fw-bold">${((item.price * (item.quantity || 1)).toFixed(2))}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Tổng sản phẩm:</span>
                  <span>{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí vận chuyển:</span>
                  <span className="text-success">Miễn phí</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Thuế:</span>
                  <span>${(totalValue * 0.1).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Tổng cộng:</strong>
                  <strong className="text-primary fs-5">${(totalValue * 1.1).toFixed(2)}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;




