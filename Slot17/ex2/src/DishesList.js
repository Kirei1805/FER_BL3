import React, { useContext, useState } from "react";
import { CartContext } from "./context/CartContext";
import SearchBar from "./SearchBar";
import { Card, Row, Col, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dishes-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">🍽️ Danh sách món ăn</h2>
          <p className="text-muted mb-0">Chọn món ăn yêu thích của bạn</p>
        </div>
        <div className="text-end">
          <small className="text-muted">
            {filteredDishes.length} món ăn
          </small>
        </div>
      </div>
      
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <div className="mt-4">
        {filteredDishes.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3">
              <span style={{ fontSize: '3rem' }}>🔍</span>
            </div>
            <Alert variant="info" className="d-inline-block">
              Không tìm thấy món ăn phù hợp với từ khóa "{searchTerm}"
            </Alert>
          </div>
        ) : (
          <Row xs={1} md={2} xl={3} className="g-4">
            {filteredDishes.map((dish) => (
              <Col key={dish.id}>
                <Card className="h-100 dish-card">
                  <Card.Img 
                    variant="top" 
                    src={dish.image} 
                    alt={dish.name}
                    className="dish-image"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="dish-title">{dish.name}</Card.Title>
                    <Card.Text className="flex-grow-1 dish-description">
                      {dish.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="dish-price">
                          ${parseFloat(dish.price).toFixed(2)}
                        </span>
                        <span className="dish-rating">
                          ⭐ 4.5
                        </span>
                      </div>
                      <Button 
                        variant="success" 
                        onClick={() => addToCart(dish)}
                        className="w-100 add-to-cart-btn"
                        size="lg"
                      >
                        🛒 Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

// Prop validation to ensure proper data structure
DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;
