import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavourites, isInFavourites } = useFavourites();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('🛒 Đã thêm vào giỏ hàng!');
  };

  const handleAddToFavourites = () => {
    if (!isAuthenticated) {
      toast.error('🔐 Vui lòng đăng nhập để thêm vào yêu thích!');
      return;
    }
    
    if (isInFavourites(product.id)) {
      toast.info('❤️ Sản phẩm đã có trong yêu thích!');
      return;
    }
    
    addToFavourites(product);
    toast.success('❤️ Đã thêm vào yêu thích!');
  };

  return (
    <Card className="product-card h-100">
      <div className="product-image-wrapper">
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Không+có+hình+ảnh';
          }}
        />
        <Badge 
          bg="success" 
          className="price-badge"
        >
          ${product.price}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title">{product.name}</Card.Title>
        
        <div className="product-meta mb-2">
          <Badge bg="primary" className="me-1">{product.category}</Badge>
          <Badge bg="warning" className="me-1">⭐ {product.rating}</Badge>
          <Badge bg="info">🌶️ {product.spicyLevel}</Badge>
        </div>
        
        <Card.Text className="product-description flex-grow-1">
          {product.description}
        </Card.Text>
        
        <div className="product-actions mt-auto">
          <Button 
            variant="outline-primary" 
            size="sm"
            className="mb-2 w-100"
            as={Link}
            to={`/product/${product.id}`}
          >
            👁️ Xem chi tiết
          </Button>
          
          <Button 
            variant="success" 
            size="sm"
            className="mb-2 w-100"
            onClick={handleAddToCart}
          >
            🛒 Thêm vào giỏ
          </Button>
          
          <Button 
            variant={isInFavourites(product.id) ? "warning" : "outline-danger"} 
            size="sm"
            className="w-100"
            onClick={handleAddToFavourites}
          >
            {isInFavourites(product.id) ? '❤️ Đã yêu thích' : '🤍 Yêu thích'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
