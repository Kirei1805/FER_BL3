import { Row, Col, Spinner } from "react-bootstrap"
import { motion } from "framer-motion"
import ProductCard from "./ProductCard"

function BestSellers({ products, loading }) {
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

  return (
    <div className="mb-5">
      <motion.div 
        className="text-center mb-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">🔥 Sản Phẩm Bán Chạy</h2>
        <p className="section-subtitle">
          Những sản phẩm được yêu thích nhất bởi các nghệ sĩ và người chơi nhạc
        </p>
      </motion.div>
      
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row xs={1} md={2} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <motion.div variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      )}
    </div>
  )
}

export default BestSellers

