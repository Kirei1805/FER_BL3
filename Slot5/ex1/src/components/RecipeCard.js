import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaUser, FaClock, FaUtensils } from 'react-icons/fa';

const RecipeCard = ({ recipe, onViewRecipe }) => {
  const [hover, setHover] = useState(false);

  // Tạo ảnh placeholder nếu link hỏng
  const getPlaceholderImage = (title) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const encodedTitle = encodeURIComponent(title);
    return `https://via.placeholder.com/400x300/${color.replace('#', '')}/ffffff?text=${encodedTitle}`;
  };

  const buttonStyle = {
    backgroundColor: hover ? '#1e3d1a' : '#062901ff',
    borderColor: 'transparent',
    boxShadow: hover
      ? '0 4px 12px rgba(45, 90, 39, 0.4)'
      : '0 2px 8px rgba(45, 90, 39, 0.3)',
    borderRadius: '25px',
    padding: '12px 16px',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    transform: hover ? 'translateY(-1px)' : 'translateY(0)',
    transition: 'all 0.2s ease-in-out',
    width: '100%'
  };

  return (
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={recipe.image} 
          alt={recipe.title}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = getPlaceholderImage(recipe.title);
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold mb-2">{recipe.title}</Card.Title>
        <Card.Text className="text-muted mb-3 flex-grow-1">
          {recipe.description}
        </Card.Text>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2" style={{ gap: '20px' }}>
            <div className="d-flex align-items-center">
              <FaUser className="text-muted me-2" size={14} />
              <small className="text-muted">Servings: {recipe.servings}</small>
            </div>
            <div className="d-flex align-items-center">
              <FaClock className="text-muted me-2" size={14} />
              <small className="text-muted">Prep: {recipe.prep} mins</small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <FaUtensils className="text-muted me-2" size={14} />
            <small className="text-muted">Cook: {recipe.cook} min{recipe.cook !== 1 ? 's' : ''}</small>
          </div>
        </div>
        
        <Button
          style={buttonStyle}
          onClick={() => onViewRecipe(recipe)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
