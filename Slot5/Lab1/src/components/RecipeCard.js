import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaUser, FaClock, FaUtensils, FaHeart } from 'react-icons/fa';

const RecipeCard = ({ recipe, onViewRecipe, onAddToFavourite, isFavourite }) => {
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
        <div className="position-absolute top-0 end-0 m-2">
          <Button
            variant={isFavourite ? "danger" : "light"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavourite(recipe);
            }}
            className="rounded-circle"
            style={{ width: '35px', height: '35px', padding: 0 }}
          >
            <FaHeart size={14} />
          </Button>
        </div>
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
        
        <div className="d-flex gap-2">
          <Button
            style={buttonStyle}
            onClick={() => onViewRecipe(recipe)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="flex-grow-1"
          >
            View Recipe
          </Button>
          <Button
            variant={isFavourite ? "danger" : "outline-danger"}
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavourite(recipe);
            }}
            className="d-flex align-items-center"
          >
            <FaHeart className="me-1" />
            {isFavourite ? 'Favourited' : 'Add to Favourite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
