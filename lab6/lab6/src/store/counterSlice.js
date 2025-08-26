import { createSlice } from '@reduxjs/toolkit';

/**
 * REDUX SLICE CHO COUNTER
 * 
 * Slice chứa:
 * - Initial state
 * - Reducers để xử lý actions
 * - Actions được tự động generate
 */

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    history: []
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push(`Increased to ${state.value}`);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(`Decreased to ${state.value}`);
    },
    reset: (state) => {
      state.value = 0;
      state.history.push('Reset to 0');
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push(`Increased by ${action.payload} to ${state.value}`);
    }
  }
});

// Export actions
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

// Selectors
export const selectCount = (state) => state.counter.value;
export const selectHistory = (state) => state.counter.history;

// Export reducer
export default counterSlice.reducer;
