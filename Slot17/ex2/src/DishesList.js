import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";

// DishesList component renders the list of dishes and adds them to the cart
const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc món ăn theo từ khóa tìm kiếm
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dishes-container">
      <h2>Danh sách món ăn</h2>
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      <div className="dishes">
        {filteredDishes.length === 0 ? (
          <p className="no-results">Không tìm thấy món ăn phù hợp.</p>
        ) : (
          filteredDishes.map((dish) => (
            <div key={dish.id} className="dish-item">
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p className="price">{`Price: $${parseFloat(dish.price).toFixed(2)}`}</p>
              <button onClick={() => addToCart(dish)} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          ))
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
