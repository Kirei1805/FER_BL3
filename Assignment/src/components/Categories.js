import { useState, useEffect } from "react"
import { Row, Col, Card, Spinner } from "react-bootstrap"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch categories from db.json
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories")
        const data = await response.json()
        setCategories(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setLoading(false)
      }
    }

    fetchCategories()
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
          <h2 className="section-title">🎼 Danh Mục Sản Phẩm</h2>
          <p className="section-subtitle">
            Khám phá các loại nhạc cụ từ cơ bản đến chuyên nghiệp
          </p>
        </motion.div>
        <div className="text-center py-5">
          <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Đang tải danh mục...</p>
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
        <h2 className="section-title">🎼 Danh Mục Sản Phẩm</h2>
        <p className="section-subtitle">
          Khám phá các loại nhạc cụ từ cơ bản đến chuyên nghiệp
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Row xs={1} md={2} lg={4} className="g-4">
          {categories.map((category) => (
            <Col key={category.id}>
              <motion.div variants={itemVariants}>
                <Link to={`/category/${category.id}`} style={{ textDecoration: "none" }}>
                  <Card className="category-card h-100">
                    <div className="category-image-wrapper">
                      <Card.Img 
                        variant="top" 
                        src={category.image} 
                        alt={category.name}
                        className="category-image"
                      />
                      <div className="category-overlay">
                        <div className="category-overlay-content">
                          <span className="category-overlay-text">
                            Khám Phá Ngay 🎵
                          </span>
                        </div>
                      </div>
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="category-title">{category.name}</Card.Title>
                      <small className="text-muted">
                        Nhạc cụ chất lượng cao
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

export default Categories

