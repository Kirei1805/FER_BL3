import React, { useState, useMemo } from 'react';

/**
 * BÀI TẬP 2: TODO LIST - SỬ DỤNG LOCAL STATE
 * 
 * Ví dụ này quản lý todo list bằng useState
 * Đặc điểm:
 * - Logic phức tạp tập trung trong component
 * - Khó maintain khi logic phức tạp
 * - Khó test riêng biệt logic business
 */

const TodoLocal = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [nextId, setNextId] = useState(1);

  // Complex logic mixed with component
  const filteredTodos = useMemo(() => {
    let filtered = todos;
    
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [todos, filter, searchTerm]);

  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }), [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: nextId,
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      setNextId(prev => prev + 1);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Todo List với Local State</h3>
      
      {/* Add Todo */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add new todo..."
          style={{ width: '70%', padding: '5px' }}
        />
        <button onClick={addTodo} style={{ marginLeft: '10px', padding: '5px 10px' }}>
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
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
      />

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
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
        <button onClick={clearCompleted} style={{ marginLeft: '10px', padding: '5px 10px' }}>
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
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              flex: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#666' : 'black'
            }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <strong>Vấn đề với Local State:</strong>
        <ul>
          <li>Logic business phức tạp trộn lẫn với UI</li>
          <li>Component trở nên quá lớn và khó maintain</li>
          <li>Khó test logic business riêng biệt</li>
          <li>Performance issues với nhiều re-renders</li>
          <li>Không thể chia sẻ state với component khác</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoLocal;
