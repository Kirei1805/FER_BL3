import { Form } from "react-bootstrap"
import { motion } from "framer-motion"

function SortingControls({ onSort, sortOption }) {
  return (
    <motion.div 
      className="d-flex justify-content-end mb-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="me-2 mb-0 fw-bold" style={{ color: '#667eea' }}>
          📊 Sắp xếp:
        </Form.Label>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Form.Select 
            value={sortOption} 
            onChange={(e) => onSort(e.target.value)} 
            style={{ 
              width: "200px",
              borderRadius: "15px",
              border: "2px solid #667eea",
              background: "white",
              color: "#333",
              fontWeight: "500"
            }}
          >
            <option value="default">🎯 Mặc định</option>
            <option value="name-asc">🔤 Tên (A-Z)</option>
            <option value="name-desc">🔤 Tên (Z-A)</option>
            <option value="price-asc">💰 Giá (Thấp → Cao)</option>
            <option value="price-desc">💰 Giá (Cao → Thấp)</option>
            <option value="in-stock">✅ Còn hàng trước</option>
          </Form.Select>
        </motion.div>
      </Form.Group>
    </motion.div>
  )
}

export default SortingControls;

