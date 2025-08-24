import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { FaHeart, FaTrash, FaShoppingCart, FaHome } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng! 🛒`);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId, user?.id);
    toast.success('Đã xóa khỏi danh sách yêu thích! ❤️');
  };

  const handleClearWishlist = () => {
    clearWishlist(user?.id);
    toast.success('Đã xóa tất cả khỏi danh sách yêu thích! 🧹');
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <FaHeart size={80} color="#ff6b6b" />
              </div>
              <h2>Vui lòng đăng nhập</h2>
              <p className="text-muted">Bạn cần đăng nhập để xem danh sách yêu thích</p>
              <Link to="/login">
                <Button variant="primary" size="lg">
                  🔑 Đăng nhập
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </>
    );
  }

  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="mb-4"
            >
              <FaHeart size={100} color="#ff6b6b" />
            </motion.div>
            <h1 className="mb-3">Danh sách yêu thích trống</h1>
            <p className="text-muted mb-4">
              Bạn chưa có sản phẩm nào trong danh sách yêu thích. Hãy khám phá và thêm sản phẩm yêu thích!
            </p>
            <Link to="/home">
              <Button variant="primary" size="lg">
                <FaHome className="me-2" />
                Khám phá sản phẩm
              </Button>
            </Link>
          </motion.div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-2">
                <FaHeart className="me-3" style={{ color: '#ff6b6b' }} />
                Danh sách yêu thích
              </h1>
              <Badge bg="primary" className="fs-6">
                {wishlist.length} sản phẩm
              </Badge>
            </div>
            <Button 
              variant="outline-danger" 
              onClick={handleClearWishlist}
              className="d-flex align-items-center"
            >
              <FaTrash className="me-2" />
              Xóa tất cả
            </Button>
          </div>

          {/* Wishlist Items */}
          <Row className="g-4">
            <AnimatePresence>
              {wishlist.map((product, index) => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-100 shadow-sm border-0">
                      <div style={{ position: 'relative' }}>
                        <Link to={`/product/${product.id}`}>
                          <Card.Img
                            variant="top"
                            src={product.image || '/images/placeholder.jpg'}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0 m-2"
                          onClick={() => handleRemoveFromWishlist(product.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>

                      <Card.Body className="d-flex flex-column">
                        <Link 
                          to={`/product/${product.id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <Card.Title className="h6 mb-2">{product.name}</Card.Title>
                        </Link>
                        
                        <div className="mb-2">
                          <Badge bg="secondary" className="me-1">
                            {product.brand}
                          </Badge>
                          {product.inStock > 0 ? (
                            <Badge bg="success">
                              📦 Còn {product.inStock} cái
                            </Badge>
                          ) : (
                            <Badge bg="danger">❌ Hết hàng</Badge>
                          )}
                        </div>

                        <div className="mb-3">
                          <span className="h5 text-primary mb-0">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-auto">
                          <div className="d-grid gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              disabled={product.inStock === 0}
                            >
                              <FaShoppingCart className="me-2" />
                              Thêm vào giỏ
                            </Button>
                            <Link to={`/product/${product.id}`}>
                              <Button variant="outline-secondary" size="sm" className="w-100">
                                Xem chi tiết
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </AnimatePresence>
          </Row>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-center"
          >
            <Card className="bg-light">
              <Card.Body>
                <h5>Tổng quan</h5>
                <p className="mb-0">
                  Bạn có <strong>{wishlist.length}</strong> sản phẩm trong danh sách yêu thích
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
};

export default WishlistPage;

