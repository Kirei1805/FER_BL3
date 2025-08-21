import React, { useState } from "react";
import { CartProvider } from "./CartContext";
import DishesList from "./DishesList";
import Cart from "./Cart";
import DarkModeToggle from "./DarkModeToggle";
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
        <header className="app-header">
          <h1>🍽️ Nhà hàng </h1>
          <DarkModeToggle 
            isDarkMode={isDarkMode} 
            onToggle={toggleDarkMode} 
          />
        </header>
        <main className="app-main">
          <DishesList dishes={dishes} />
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
