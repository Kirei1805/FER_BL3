import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import DishesList from "./DishesList";
import Cart from "./Cart";
import DarkModeToggle from "./DarkModeToggle";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// Sample dishes array
const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <CartProvider>
      <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        {/* Header với gradient background */}
        <div className={`hero-header ${isDarkMode ? 'dark-hero' : 'light-hero'}`}>
          <Container>
            <Row className="align-items-center">
              <Col md={8}>
                <h1 className="display-4 fw-bold text-white mb-3">
                  🍽️ Nhà hàng Delicious
                </h1>
                <p className="lead text-white-50 mb-4">
                  Khám phá những món ăn ngon nhất với hương vị độc đáo
                </p>
              </Col>
              <Col md={4} className="text-end">
                <DarkModeToggle 
                  isDarkMode={isDarkMode} 
                  onToggle={toggleDarkMode} 
                />
              </Col>
            </Row>
          </Container>
        </div>
        
        {/* Main Content */}
        <Container className="py-5">
          <Row className="g-4">
            {/* Dishes Section */}
            <Col xl={8} lg={7} md={12}>
              <div className="dishes-section">
                <DishesList dishes={dishes} />
              </div>
            </Col>
            
            {/* Cart Section - Sticky trên desktop */}
            <Col xl={4} lg={5} md={12}>
              <div className="cart-section">
                <Cart />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </CartProvider>
  );
}

export default App;
