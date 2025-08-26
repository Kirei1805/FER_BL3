import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';
import userReducer from './userSlice';

/**
 * REDUX STORE CONFIGURATION
 * 
 * Store tập trung tất cả state của app
 * Các reducer được combine lại thành một root reducer
 */

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    user: userReducer
  },
  // Redux DevTools Extension được bật mặc định trong development
  devTools: process.env.NODE_ENV !== 'production'
});

// TypeScript types would be defined here in a .ts file
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
