import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap"
import Navbar from "../components/Navbar"
import { CartContext } from "../context/CartContext"
import { motion } from "framer-motion"
import { toast } from 'react-toastify'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    // Fetch product from db.json
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`)
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true)
      // Kiểm tra số lượng tồn kho trước khi thêm
      addToCart(product, quantity)
      setTimeout(() => {
        setIsAdding(false)
      }, 1500)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <Container className="py-5">
          <h2>Product not found</h2>
        </Container>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Row>
            <Col md={6} className="mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="position-relative"
                style={{
                  background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              >
                {product.isBestSeller && (
                  <motion.div
                    className="position-absolute top-0 end-0 m-3"
                    initial={{ rotate: -10, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ zIndex: 10 }}
                  >
                    <Badge bg="warning" text="dark" className="px-3 py-2" style={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      borderRadius: '20px',
                      boxShadow: '0 4px 15px rgba(255,193,7,0.4)'
                    }}>
                      ⭐ Best Seller
                    </Badge>
                  </motion.div>
                )}
                
                <motion.img
                  src={product.image || "https://placehold.co/300x300"}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ 
                    maxHeight: "500px", 
                    width: "100%", 
                    objectFit: "contain",
                    borderRadius: '15px'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Col>
            
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.h1 
                  className="mb-3"
                  style={{ 
                    background: 'linear-gradient(135deg, rgb(174, 125, 90), rgb(229, 211, 179) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: '2.5rem'
                  }}
                >
                  {product.name}
                </motion.h1>
                
                <div className="d-flex align-items-center mb-3">
                  <span className="text-muted me-3" style={{ fontSize: '1.1rem' }}>
                    by <strong>{product.brand}</strong>
                  </span>
                  <Badge bg={product.inStock > 0 ? "success" : "danger"} pill className="px-3 py-2">
                    {product.inStock > 0 ? `📦 Còn ${product.inStock} cái trong kho` : "❌ Hết hàng"}
                  </Badge>
                </div>

                <motion.div 
                  className="mb-4"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: 'linear-gradient(135deg, rgb(174, 125, 90), rgb(229, 211, 179) 100%)',
                    borderRadius: '15px',
                    padding: '15px 25px',
                    display: 'inline-block'
                  }}
                >
                  <h2 className="mb-0 text-white" style={{ fontWeight: 'bold' }}>
                    ${product.price.toFixed(2)}
                  </h2>
                </motion.div>

                <div className="mb-4">
                  <h5 className="text-muted mb-2">Mô tả sản phẩm:</h5>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {product.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-muted">Danh mục: <span className="text-dark fw-bold">{product.category}</span></h6>
                </div>

                {product.inStock > 0 && (
                  <div className="mb-4">
                    <label className="form-label fw-bold">Số lượng:</label>
                    <div className="d-flex align-items-center">
                      <motion.button
                        className="btn btn-outline-secondary"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </motion.button>
                      <span className="mx-3 fw-bold fs-5">{quantity}</span>
                      <motion.button
                        className="btn btn-outline-secondary"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity >= product.inStock}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                )}

                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className="w-100 mb-3"
                    style={{
                      background: product.inStock 
                        ? 'linear-gradient(135deg, rgb(174, 125, 90), rgb(229, 211, 179) 100%)' 
                        : '#6c757d',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '15px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      boxShadow: product.inStock 
                        ? '0 6px 20px rgba(174, 125, 90, 0.4)' 
                        : 'none'
                    }}
                  >
                    {isAdding ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <span className="me-2">🎵</span>
                        Đang thêm vào giỏ...
                      </motion.div>
                    ) : (
                      <>
                        <span className="me-2">🛒</span>
                        {product.inStock ? `Thêm ${quantity} vào giỏ hàng` : "Hết hàng"}
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </>
  )
}

export default ProductPage;

