import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const RecipeModal = ({ show, onHide, recipe, onAddToCart }) => {
  if (!recipe) return null;

  // Generate placeholder image based on recipe title
  const getPlaceholderImage = (title) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const encodedTitle = encodeURIComponent(title);
    return `https://via.placeholder.com/400x300/${color.replace('', '')}/ffffff?text=${encodedTitle}`;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="img-fluid rounded"
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = getPlaceholderImage(recipe.title);
              }}
            />
          </Col>
          <Col md={6}>
            <h5 className="fw-bold mb-3">Description</h5>
            <p className="text-muted mb-4">{recipe.description}</p>
            
            <div className="row mb-4">
              <div className="col-4">
                <div className="text-center">
                  <div className="fw-bold text-success">{recipe.servings}</div>
                  <small className="text-muted">Servings</small>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="fw-bold text-success">{recipe.prep}</div>
                  <small className="text-muted">Prep (mins)</small>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="fw-bold text-success">{recipe.cook}</div>
                  <small className="text-muted">Cook (mins)</small>
                </div>
              </div>
            </div>
            
            <div className="bg-light p-3 rounded">
              <h6 className="fw-bold mb-2">Ingredients</h6>
              <p className="text-muted mb-0">
                Fresh ingredients for a healthy and delicious meal. 
                All ingredients are carefully selected to ensure the best taste and nutrition.
              </p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={() => onAddToCart(recipe)}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;
