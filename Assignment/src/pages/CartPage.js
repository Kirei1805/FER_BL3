import { useState, useContext, useEffect } from "react"
import { Modal, Form, Container, Table, Button, Card, Row, Col, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { CartContext } from "../context/CartContext"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { sendOrderConfirmationEmail } from '../services/emailService'
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaCreditCard, FaTruck, FaGift } from 'react-icons/fa'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "" });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { width, height } = useWindowSize();
  const [user, setUser] = useState(null);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên là bắt buộc!";
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ! Phải có 10-15 chữ số.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = "Địa chỉ phải có ít nhất 5 ký tự!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      setFormData({
        name: storedUser.firstname + storedUser.lastname || "",
        phone: storedUser.phone || "",
        email: storedUser.email || "",
        address: storedUser.address || "",
      });
    }
  }, []);

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    // Check stock availability before checkout
    for (const item of cart) {
      try {
        const productResponse = await axios.get(`http://localhost:5000/products/${item.id}`);
        const product = productResponse.data;
        
        if (product.inStock < item.quantity) {
          toast.error(`❌ Sản phẩm "${item.name}" chỉ còn ${product.inStock} cái trong kho!`);
          return;
        }
      } catch (error) {
        console.error(`Error checking stock for ${item.name}:`, error);
        toast.error(`❌ Không thể kiểm tra số lượng tồn kho cho "${item.name}"`);
        return;
      }
    }

    // Show loading
    const loadingToast = toast.loading('🎵 Đang xử lý đơn hàng...', {
      style: {
        background: 'linear-gradient(135deg, rgb(174, 125, 90), rgb(229, 211, 179) 100%)',
        color: 'white'
      }
    });

    const orderData = {
      orderId: Date.now(),
      userId: user?.id,
      userDetails: formData,
      products: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity
      })),
      total: totalPrice,
      date: new Date().toISOString(),
      shipaddress: formData.address
    };

    try {
      // Save order to database
      await axios.post('http://localhost:5000/orders', orderData);
      
      // Update product quantities in database
      for (const item of cart) {
        try {
          const productResponse = await axios.get(`http://localhost:5000/products/${item.id}`);
          const product = productResponse.data;
          
          const newQuantity = Math.max(0, product.inStock - item.quantity);
          
          await axios.patch(`http://localhost:5000/products/${item.id}`, {
            inStock: newQuantity
          });
          
          console.log(`Updated product ${item.name}: ${product.inStock} -> ${newQuantity}`);
        } catch (productError) {
          console.error(`Error updating product ${item.name}:`, productError);
        }
      }
      
      // Send email confirmation (real email)
      const emailResult = await sendOrderConfirmationEmail(orderData);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show success messages
      toast.success('📦 Số lượng sản phẩm đã được cập nhật trong kho!');
      
      if (emailResult.success) {
        toast.success('📧 ' + emailResult.message);
      } else {
        toast.warning('⚠️ ' + emailResult.message);
      }
      
      // Show success animation
      setOrderSuccess(true);
      
      // Success alert with SweetAlert2
      await Swal.fire({
        title: '🎉 Đặt hàng thành công!',
        html: `
          <div style="text-align: left;">
            <p><strong>Mã đơn hàng:</strong> #${orderData.orderId}</p>
            <p><strong>Tổng tiền:</strong> $${orderData.total.toFixed(2)}</p>
            <p><strong>Email xác nhận đã được gửi đến:</strong> ${formData.email}</p>
            <p><strong>📦 Số lượng sản phẩm đã được cập nhật trong kho!</strong></p>
          </div>
        `,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Tuyệt vời! 🎵',
        confirmButtonColor: '#667eea',
        background: '#f8f9fa',
        timer: 8000,
        timerProgressBar: true
      });
      
      setTimeout(() => {
        setShowModal(false);
        clearCart();
        setOrderSuccess(false);
      }, 1000);
      
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Lỗi khi lưu đơn hàng:', error);
      
      Swal.fire({
        title: '❌ Có lỗi xảy ra!',
        text: 'Không thể xử lý đơn hàng của bạn. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'Thử lại',
        confirmButtonColor: '#ff6b6b'
      });
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-empty-section">
          <Container className="py-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="empty-cart-icon"
              >
                🎵
              </motion.div>
              <h1 className="empty-cart-title">
                Giỏ hàng của bạn
              </h1>
              <p className="empty-cart-subtitle">
                Cuộc sống là âm nhạc, nhưng giỏ hàng bạn đang trống! 🎼
              </p>
              <Link to="/home">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="continue-shopping-btn">
                    🎶 Quay lại mua sắm
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </Container>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="cart-page-section">
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="cart-header">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="cart-icon"
              >
                🛒
              </motion.div>
              <div className="cart-title-section">
                <h1 className="cart-title">
                  Giỏ hàng của bạn
                </h1>
                <Badge className="cart-badge">
                  {cart.length} sản phẩm
                </Badge>
              </div>
            </div>

            <Row className="g-4">
              {/* Cart Items */}
              <Col lg={8}>
                <Card className="cart-items-card">
                  <Card.Header className="cart-card-header">
                    <h5 className="mb-0">🛍️ Sản phẩm trong giỏ hàng</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <AnimatePresence>
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="cart-item"
                        >
                          <div className="cart-item-image">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="product-image"
                            />
                          </div>
                          <div className="cart-item-details">
                            <Link to={`/product/${item.id}`} className="product-link">
                              <h6 className="product-name">{item.name}</h6>
                            </Link>
                            <p className="product-brand">{item.brand}</p>
                            <div className="product-price">${item.price.toFixed(2)}</div>
                            <div className="product-stock">
                              <Badge 
                                bg={item.inStock > 0 ? "success" : "danger"} 
                                className="mt-1"
                                style={{ fontSize: "0.7rem" }}
                              >
                                {item.inStock > 0 ? `📦 Còn ${item.inStock} cái trong kho` : "❌ Hết hàng"}
                              </Badge>
                            </div>
                          </div>
                          <div className="cart-item-quantity">
                            <div className="quantity-controls">
                              <Button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus />
                              </Button>
                              <span className="quantity-display">{item.quantity}</span>
                              <Button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </div>
                          <div className="cart-item-total">
                            <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <div className="cart-item-actions">
                            <Button
                              className="remove-btn"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </Card.Body>
                </Card>

                {/* Action Buttons */}
                <div className="cart-actions">
                  <Link to="/home">
                    <Button className="continue-shopping-btn">
                      <FaShoppingCart className="me-2" />
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                  <Button className="clear-cart-btn" onClick={clearCart}>
                    <FaTrash className="me-2" />
                    Xóa giỏ hàng
                  </Button>
                </div>
              </Col>

              {/* Order Summary */}
              <Col lg={4}>
                <Card className="order-summary-card">
                  <Card.Header className="summary-header">
                    <h5 className="mb-0">
                      <FaCreditCard className="me-2" />
                      Tóm tắt đơn hàng
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="summary-item">
                      <span>Tạm tính:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Phí vận chuyển:</span>
                      <span className="free-shipping">Miễn phí</span>
                    </div>
                    <div className="summary-item total">
                      <span>Tổng cộng:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="shipping-info">
                      <div className="shipping-item">
                        <FaTruck className="shipping-icon" />
                        <span>Giao hàng miễn phí toàn quốc</span>
                      </div>
                      <div className="shipping-item">
                        <FaGift className="shipping-icon" />
                        <span>Tặng kèm phụ kiện trị giá $50</span>
                      </div>
                    </div>

                    <Button 
                      className="checkout-btn"
                      onClick={() => setShowModal(true)}
                    >
                      <FaCreditCard className="me-2" />
                      Tiến hành thanh toán
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Checkout Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="checkout-modal">
              <Modal.Header closeButton className="modal-header">
                <Modal.Title>
                  <FaTruck className="me-2" />
                  Thông tin giao hàng
                </Modal.Title>
              </Modal.Header>

              <Modal.Body className="modal-body">
                {orderSuccess ? (
                  <>
                    <Confetti width={width} height={height} style={{ width: Math.min(500, width / 2), height: Math.min(500, height / 2) }} />
                    <div className="text-center">
                      <h5>🎉 Cảm ơn bạn đã mua hàng!</h5>
                      <p>Đơn hàng của bạn đang được xử lý.</p>
                    </div>
                  </>
                ) : (
                  <Form className="checkout-form">
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        placeholder="Nhập họ và tên của bạn"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        isInvalid={!!errors.name}
                        className="form-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.phone}
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        isInvalid={!!errors.phone}
                        className="form-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        placeholder="Nhập email của bạn"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        isInvalid={!!errors.email}
                        className="form-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Địa chỉ giao hàng</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.address}
                        placeholder="Nhập địa chỉ giao hàng"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        isInvalid={!!errors.address}
                        className="form-input"
                      />
                      <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Form.Group>

                    <Button className="confirm-order-btn" onClick={handleCheckout}>
                      <FaCreditCard className="me-2" />
                      Xác nhận đặt hàng
                    </Button>
                  </Form>
                )}
              </Modal.Body>
            </Modal>
          </motion.div>
        </Container>
      </div>
    </>
  )
}

export default CartPage;