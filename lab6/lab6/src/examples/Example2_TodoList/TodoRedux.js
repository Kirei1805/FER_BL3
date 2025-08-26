import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  setSearchTerm,
  clearCompleted,
  selectFilteredTodos,
  selectFilter,
  selectSearchTerm,
  selectTodoStats
} from '../../store/todoSlice';

/**
 * BÀI TẬP 2: TODO LIST - SỬ DỤNG REDUX
 * 
 * Ví dụ này sử dụng Redux để quản lý todo list
 * Đặc điểm:
 * - Logic business tách biệt khỏi UI
 * - Component chỉ tập trung vào render và handle events
 * - Dễ test logic business
 * - State có thể chia sẻ với components khác
 */

const TodoRedux = () => {
  const [newTodo, setNewTodo] = useState('');
  
  // Get data from Redux store
  const filteredTodos = useSelector(selectFilteredTodos);
  const filter = useSelector(selectFilter);
  const searchTerm = useSelector(selectSearchTerm);
  const stats = useSelector(selectTodoStats);
  const dispatch = useDispatch();

  // Event handlers - very clean and focused
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleFilterChange = (filterType) => {
    dispatch(setFilter(filterType));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #007bff', margin: '10px' }}>
      <h3>Todo List với Redux</h3>
      
      {/* Add Todo */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Add new todo..."
          style={{ width: '70%', padding: '5px' }}
        />
        <button onClick={handleAddTodo} style={{ marginLeft: '10px', padding: '5px 10px' }}>
          Add
        </button>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: '10px', fontSize: '14px' }}>
        Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search todos..."
        style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
      />

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => handleFilterChange(filterType)}
            style={{
              margin: '2px',
              padding: '5px 10px',
              backgroundColor: filter === filterType ? '#007bff' : '#f8f9fa',
              color: filter === filterType ? 'white' : 'black',
              border: '1px solid #ccc'
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
        <button onClick={handleClearCompleted} style={{ marginLeft: '10px', padding: '5px 10px' }}>
          Clear Completed
        </button>
      </div>

      {/* Todo List */}
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {filteredTodos.map(todo => (
          <div key={todo.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '5px',
            backgroundColor: todo.completed ? '#f0f0f0' : 'white'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              flex: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#666' : 'black'
            }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#006400' }}>
        <strong>Ưu điểm Redux với Todo List:</strong>
        <ul>
          <li>Logic business tách biệt và có thể test riêng</li>
          <li>Component nhỏ gọn, chỉ focus vào UI</li>
          <li>State có thể chia sẻ với TodoStats component</li>
          <li>Dễ debug với Redux DevTools</li>
          <li>Predictable state updates với actions</li>
          <li>Better performance với optimized selectors</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoRedux;
