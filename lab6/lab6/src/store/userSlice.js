import { createSlice } from '@reduxjs/toolkit';

/**
 * REDUX SLICE CHO USER MANAGEMENT
 * 
 * Quản lý thông tin user và shopping cart
 * Demo việc chia sẻ state phức tạp giữa nhiều components
 */

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {
      id: null,
      name: '',
      email: '',
      avatar: '',
      isLoggedIn: false
    },
    cart: {
      items: [],
      total: 0
    },
    products: [
      { id: 1, name: 'iPhone 15', price: 999, image: '📱' },
      { id: 2, name: 'MacBook Pro', price: 1999, image: '💻' },
      { id: 3, name: 'AirPods Pro', price: 299, image: '🎧' },
      { id: 4, name: 'iPad Air', price: 599, image: '📱' },
      { id: 5, name: 'Apple Watch', price: 399, image: '⌚' }
    ]
  },
  reducers: {
    login: (state, action) => {
      const { name, email } = action.payload;
      state.profile = {
        id: Date.now(),
        name,
        email,
        avatar: '👤',
        isLoggedIn: true
      };
    },
    logout: (state) => {
      state.profile = {
        id: null,
        name: '',
        email: '',
        avatar: '',
        isLoggedIn: false
      };
      state.cart = {
        items: [],
        total: 0
      };
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push({ ...product, quantity: 1 });
      }
      
      state.cart.total = state.cart.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
      state.cart.total = state.cart.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.cart.items = state.cart.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
        
        state.cart.total = state.cart.items.reduce(
          (total, item) => total + (item.price * item.quantity), 
          0
        );
      }
    },
    clearCart: (state) => {
      state.cart = {
        items: [],
        total: 0
      };
    }
  }
});

// Actions
export const {
  login,
  logout,
  updateProfile,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.profile;
export const selectIsLoggedIn = (state) => state.user.profile.isLoggedIn;
export const selectCart = (state) => state.user.cart;
export const selectCartItems = (state) => state.user.cart.items;
export const selectCartTotal = (state) => state.user.cart.total;
export const selectCartItemCount = (state) => 
  state.user.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectProducts = (state) => state.user.products;

export default userSlice.reducer;
