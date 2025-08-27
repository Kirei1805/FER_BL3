import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';

import { formatPrice } from '../utils/format';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', product);
  };

  const handleFavourite = () => {
    // TODO: Implement favourite functionality
    console.log('Added to favourites:', product);
  };

  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = `https://picsum.photos/seed/${product.id}/600/400`;
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.name}</Card.Title>
        <Card.Text className="card-text">
          {product.description}
        </Card.Text>
        
        <div className="price-section">
          <Badge bg="primary" className="fs-6">
            {formatPrice(product.price)}
          </Badge>
        </div>

        <div className="button-section">
          <ButtonGroup className="w-100">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleViewDetails}
            className="flex-fill"
          >
            <FaEye className="me-1" />
            View Details
          </Button>
          
          <Button
            variant="success"
            size="sm"
            onClick={handleAddToCart}
            className="flex-fill"
          >
            <FaCartPlus className="me-1" />
            Add to Cart
          </Button>
          
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleFavourite}
            className="flex-fill"
          >
            <FaHeart className="me-1" />
            Favourite
          </Button>
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
