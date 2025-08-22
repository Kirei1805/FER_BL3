import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        orderConfirmed: false
      };
    
    case 'CONFIRM_ORDER':
      return {
        ...state,
        orderConfirmed: true
      };
    
    default:
      return state;
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    orderConfirmed: false
  });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const confirmOrder = () => {
    if (state.cartItems.length > 0) {
      dispatch({ type: 'CONFIRM_ORDER' });
      setTimeout(() => {
        alert("Đơn hàng đã được xác nhận thành công! Cảm ơn bạn đã mua hàng.");
        clearCart();
      }, 1000);
    }
  };

  const totalValue = state.cartItems
    .reduce((acc, item) => acc + (parseFloat(item.price) * (item.quantity || 1)), 0)
    .toFixed(2);

  const totalItems = state.cartItems
    .reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      savedCart.forEach(item => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider
      value={{ 
        cartItems: state.cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart, 
        totalValue, 
        totalItems,
        confirmOrder,
        orderConfirmed: state.orderConfirmed 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
