import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const addToCart = (dish) => {
    setCartItems((prevItems) => [...prevItems, dish]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setOrderConfirmed(false);
  };

  const confirmOrder = () => {
    if (cartItems.length > 0) {
      setOrderConfirmed(true);
      setTimeout(() => {
        alert("Đơn hàng đã được xác nhận thành công! Cảm ơn bạn đã mua hàng.");
        clearCart();
      }, 1000);
    }
  };

  const totalValue = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price), 0)
    .toFixed(2);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        totalValue, 
        confirmOrder,
        orderConfirmed 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
