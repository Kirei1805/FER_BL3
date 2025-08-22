import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { Card, ListGroup, Button, Badge } from "react-bootstrap";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue, confirmOrder, orderConfirmed } =
    useContext(CartContext);

  return (
    <div className="cart-container">
      <Card className="cart-card">
        <Card.Header className="cart-header">
          <div className="d-flex align-items-center">
            <span className="cart-icon">🛒</span>
            <div className="ms-3">
              <h5 className="mb-0">Giỏ hàng</h5>
              <small className="text-muted">Đơn hàng của bạn</small>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="text-center py-4">
                <div className="empty-cart-icon mb-3">
                  <span>🛍️</span>
                </div>
                <h6 className="text-muted">Giỏ hàng trống</h6>
                <p className="text-muted small mb-0">
                  Hãy chọn món ăn yêu thích để bắt đầu
                </p>
              </div>
            </div>
          ) : (
            <div>
              <ListGroup variant="flush" className="cart-items mb-3">
                {cartItems.map((item) => (
                  <ListGroup.Item 
                    key={item.id} 
                    className="cart-item"
                  >
                    <div className="d-flex align-items-center">
                      <div className="cart-item-image me-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="rounded"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <small className="text-muted">${item.price}</small>
                      </div>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        🗑️
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <div className="cart-summary">
                <div className="summary-item">
                  <span>Tổng số món:</span>
                  <Badge bg="secondary" className="ms-2">{cartItems.length}</Badge>
                </div>
                <div className="summary-item total">
                  <span>Tổng giá trị:</span>
                  <span className="total-price">${totalValue}</span>
                </div>
                
                <div className="cart-actions">
                  <Button 
                    variant="outline-warning" 
                    onClick={clearCart}
                    size="sm"
                    className="w-100 mb-2"
                  >
                    🗑️ Xóa giỏ hàng
                  </Button>
                  <Button 
                    variant="success" 
                    onClick={confirmOrder} 
                    disabled={orderConfirmed}
                    size="lg"
                    className="w-100 confirm-btn"
                  >
                    {orderConfirmed ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        ✅ Xác nhận đơn hàng
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cart;
