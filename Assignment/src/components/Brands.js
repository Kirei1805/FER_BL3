import { useState, useEffect } from "react"
import { Row, Col, Card, Spinner } from "react-bootstrap"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch brands from db.json
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5000/brands")
        const data = await response.json()
        setBrands(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching brands:", error)
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <div className="mb-5">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">🏆 Thương Hiệu Nổi Tiếng</h2>
          <p className="section-subtitle">
            Những thương hiệu nhạc cụ được tin tưởng nhất thế giới
          </p>
        </motion.div>
        <div className="text-center py-5">
          <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Đang tải thương hiệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-5">
      <motion.div 
        className="text-center mb-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">🏆 Thương Hiệu Nổi Tiếng</h2>
        <p className="section-subtitle">
          Những thương hiệu nhạc cụ được tin tưởng nhất thế giới
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Row xs={2} md={4} className="g-4">
          {brands.map((brand) => (
            <Col key={brand.id}>
              <motion.div variants={itemVariants}>
                <Link to={`/brand/${brand.id}`} style={{ textDecoration: "none" }}>
                  <Card className="brand-card text-center h-100">
                    <div className="brand-image-wrapper">
                      <Card.Img
                        variant="top"
                        src={brand.image}
                        alt={brand.name}
                        className="brand-image mx-auto"
                      />
                      <div className="brand-overlay">
                        <div className="brand-overlay-content">
                          <span className="brand-overlay-text">
                            Xem Sản Phẩm 🎸
                          </span>
                        </div>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title className="brand-title">{brand.name}</Card.Title>
                      <small className="text-muted">
                        Thương hiệu uy tín
                      </small>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  )
}

export default Brands

