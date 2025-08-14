import React from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import { FaUser, FaClock, FaUtensils } from 'react-icons/fa';

const RecipeCarousel = ({ recipes, onViewRecipe }) => {
  // Tạo ảnh placeholder nếu link hỏng
  const getPlaceholderImage = (title) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const encodedTitle = encodeURIComponent(title);
    return `https://via.placeholder.com/800x400/${color.replace('#', '')}/ffffff?text=${encodedTitle}`;
  };

  return (
    <Carousel className="mb-5">
      {recipes.slice(0, 3).map((recipe, index) => (
        <Carousel.Item key={index}>
          <div className="position-relative">
            <img
              className="d-block w-100"
              src={recipe.image}
              alt={recipe.title}
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = getPlaceholderImage(recipe.title);
              }}
            />
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)'
              }}
            />
            <Carousel.Caption className="text-start" style={{ bottom: '20%', left: '10%', right: '10%' }}>
              <h2 className="fw-bold mb-3">{recipe.title}</h2>
              <p className="mb-3 fs-5">{recipe.description}</p>
              <div className="d-flex align-items-center mb-3" style={{ gap: '20px' }}>
                <div className="d-flex align-items-center">
                  <FaUser className="text-white me-2" size={16} />
                  <span className="text-white">Servings: {recipe.servings}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaClock className="text-white me-2" size={16} />
                  <span className="text-white">Prep: {recipe.prep} mins</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaUtensils className="text-white me-2" size={16} />
                  <span className="text-white">Cook: {recipe.cook} min{recipe.cook !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <Button 
                variant="success" 
                size="lg"
                onClick={() => onViewRecipe(recipe)}
                className="px-4 py-2"
              >
                View Recipe
              </Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RecipeCarousel;


