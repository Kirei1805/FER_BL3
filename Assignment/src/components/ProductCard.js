import { useContext, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import {
  FadeIn,
} from "./AnimationComponents";
import { getImageUrl, handleImageError } from "../utils/imageUtils";
import { toast } from "react-toastify";
import "./Animations.css";

function ProductCard({ product }) {
  const { addToCart, cart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    toast.success('Đã thêm vào giỏ hàng! 🛒');

    // Animation delay
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleWishlistToggle = () => {
    if (!user) {
      // Redirect to login with current page as redirect_uri
      const currentPath = window.location.pathname + window.location.search;
      navigate(`/login?redirect_uri=${encodeURIComponent(currentPath)}`);
      toast.info('Vui lòng đăng nhập để thêm vào danh sách yêu thích!');
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id, user.id);
      toast.success('Đã xóa khỏi danh sách yêu thích! ❤️');
    } else {
      addToWishlist(product, user.id);
      toast.success('Đã thêm vào danh sách yêu thích! ❤️');
    }
  };

  const currentQty = cart.find((item) => item.id === product.id)?.quantity || 0;
  const maxQty = product.inStock || 0;
  const canAdd = product.inStock && currentQty < maxQty;

  return (
    <FadeIn>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <TiltCard maxTilt={10}>
          <Card
            className="h-100 shadow-sm border-0"
            style={{
              background: "linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)",
              overflow: "hidden",
            }}
          >
            {product.isBestSeller && (
              <motion.div
                className="position-absolute top-0 end-0 m-2"
                initial={{ rotate: -10 }}
                animate={{ rotate: isHovered ? 0 : -10 }}
                style={{ zIndex: 10 }}
              >
                <Badge
                  bg="warning"
                  text="dark"
                  className="px-2 py-1"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    borderRadius: "15px",
                    boxShadow: "0 2px 10px rgba(255,193,7,0.3)",
                  }}
                >
                  ⭐ Best Seller
                </Badge>
              </motion.div>
            )}

            <div style={{ position: "relative", overflow: "hidden" }}>
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <motion.img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => handleImageError(e)}
                />
              </Link>
              {!product.inStock && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    background: "rgba(0,0,0,0.7)",
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Hết hàng
                </div>
              )}
            </div>

            <Card.Body className="d-flex flex-column p-3">
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <motion.h6
                  className="card-title mb-2"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    lineHeight: "1.3",
                    minHeight: "2.6rem",
                  }}
                  whileHover={{ color: "#667eea" }}
                >
                  {product.name}
                </motion.h6>
              </Link>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">{product.brand}</span>
                <Badge
                  bg={product.inStock ? "success" : "danger"}
                  pill
                  className="px-2"
                >
                  {product.inStock ? "Còn hàng" : "Hết hàng"}
                </Badge>
              </div>

              <div className="mb-2">
                <motion.span
                  className="h5 mb-0"
                  style={{
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                >
                  ${product.price.toFixed(2)}
                </motion.span>
              </div>

              <Card.Text
                className="small text-muted mb-2"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.4",
                  minHeight: "2.5rem",
                }}
              >
                {product.description.length > 70
                  ? `${product.description.substring(0, 70)}...`
                  : product.description}
              </Card.Text>

              {/* Stock Status */}
              <div className="mb-3">
                {product.inStock > 0 ? (
                  <Badge 
                    bg="success" 
                    className="px-2 py-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    📦 Còn {product.inStock} cái trong kho
                  </Badge>
                ) : (
                  <Badge 
                    bg="danger" 
                    className="px-2 py-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    ❌ Hết hàng
                  </Badge>
                )}
              </div>

              <div className="mt-auto">
                <div className="d-flex gap-2 mb-2">
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    className="flex-grow-1"
                  >
                    <Button
                      variant={product.inStock > 0 ? "primary" : "secondary"}
                      onClick={handleAddToCart}
                      disabled={!canAdd || isAdding || product.inStock === 0}
                      className="w-100"
                      style={{
                        background: product.inStock
                          ? "linear-gradient(135deg, #AE7D5A 0%, #E5D3B3 100%)"
                          : "#6c757d",
                        border: "none",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {isAdding ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <span>🎵</span>
                        </motion.div>
                      ) : (
                        <>
                          <span className="me-2">🛒</span>
                          {product.inStock > 0
                            ? canAdd
                              ? "Thêm vào giỏ"
                              : "Đã đủ số lượng"
                            : "Hết hàng"}
                        </>
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={isInWishlist(product.id) ? "danger" : "outline-danger"}
                      onClick={handleWishlistToggle}
                      className="px-3"
                      style={{
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {isInWishlist(product.id) ? "❤️" : "🤍"}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </TiltCard>
      </motion.div>
    </FadeIn>
  );
}

export default ProductCard;
