import { createSlice } from '@reduxjs/toolkit';

/**
 * REDUX SLICE CHO TODO LIST
 * 
 * Quản lý danh sách todos với các tính năng:
 * - Thêm, xóa, cập nhật todo
 * - Filter theo status
 * - Search todos
 */

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all', // 'all', 'active', 'completed'
    searchTerm: '',
    nextId: 1
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: state.nextId++,
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find(item => item.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(item => !item.completed);
    },
    toggleAllTodos: (state) => {
      const allCompleted = state.items.every(item => item.completed);
      state.items.forEach(item => {
        item.completed = !allCompleted;
      });
    }
  }
});

// Actions
export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setFilter,
  setSearchTerm,
  clearCompleted,
  toggleAllTodos
} = todoSlice.actions;

// Selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectSearchTerm = (state) => state.todos.searchTerm;

export const selectFilteredTodos = (state) => {
  const { items, filter, searchTerm } = state.todos;
  
  let filtered = items;
  
  // Filter by completion status
  if (filter === 'active') {
    filtered = filtered.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    filtered = filtered.filter(todo => todo.completed);
  }
  
  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(todo => 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filtered;
};

export const selectTodoStats = (state) => {
  const items = state.todos.items;
  return {
    total: items.length,
    active: items.filter(item => !item.completed).length,
    completed: items.filter(item => item.completed).length
  };
};

export default todoSlice.reducer;
