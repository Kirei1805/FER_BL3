import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

const initialState = {
  wishlist: [],
  loading: false,
  error: null
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    case 'ADD_TO_WISHLIST':
      return { 
        ...state, 
        wishlist: [...state.wishlist, action.payload] 
      };
    case 'REMOVE_FROM_WISHLIST':
      return { 
        ...state, 
        wishlist: state.wishlist.filter(item => item.id !== action.payload) 
      };
    case 'CLEAR_WISHLIST':
      return { ...state, wishlist: [] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on app start
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'SET_WISHLIST', payload: wishlist });
      } catch (error) {
        console.error('Error parsing saved wishlist:', error);
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const addToWishlist = async (product, userId) => {
    try {
      // Add to local state
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });

      // Sync with server if user is logged in
      if (userId) {
        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
        const user = userResponse.data;
        
        const updatedWishlist = [...(user.wishlist || []), product];
        
        await axios.patch(`http://localhost:5000/users/${userId}`, {
          wishlist: updatedWishlist
        });
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Không thể thêm vào danh sách yêu thích' });
    }
  };

  const removeFromWishlist = async (productId, userId) => {
    try {
      // Remove from local state
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });

      // Sync with server if user is logged in
      if (userId) {
        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
        const user = userResponse.data;
        
        const updatedWishlist = (user.wishlist || []).filter(item => item.id !== productId);
        
        await axios.patch(`http://localhost:5000/users/${userId}`, {
          wishlist: updatedWishlist
        });
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Không thể xóa khỏi danh sách yêu thích' });
    }
  };

  const clearWishlist = async (userId) => {
    try {
      // Clear local state
      dispatch({ type: 'CLEAR_WISHLIST' });

      // Sync with server if user is logged in
      if (userId) {
        await axios.patch(`http://localhost:5000/users/${userId}`, {
          wishlist: []
        });
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Không thể xóa danh sách yêu thích' });
    }
  };

  const isInWishlist = (productId) => {
    return state.wishlist.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return state.wishlist.length;
  };

  const value = {
    wishlist: state.wishlist,
    loading: state.loading,
    error: state.error,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

