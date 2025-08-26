import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodoStats, selectAllTodos } from '../../store/todoSlice';

/**
 * COMPONENT HIỂN THỊ STATISTICS CỦA TODO LIST
 * 
 * Component này demo việc chia sẻ state giữa các component
 * State todo được chia sẻ từ Redux store
 */

const TodoStats = () => {
  const stats = useSelector(selectTodoStats);
  const todos = useSelector(selectAllTodos);

  const completionRate = stats.total > 0 ? 
    Math.round((stats.completed / stats.total) * 100) : 0;

  const recentTodos = todos
    .slice(-3)
    .reverse();

  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f8f9fa', 
      margin: '10px',
      borderRadius: '5px',
      border: '1px solid #dee2e6'
    }}>
      <h4>📊 Todo Statistics</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
            {stats.active}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Active</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
            {stats.completed}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          Completion Rate: {completionRate}%
        </div>
        <div style={{ 
          width: '100%', 
          backgroundColor: '#e9ecef', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${completionRate}%`, 
            height: '8px', 
            backgroundColor: '#28a745',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div>
        <h5 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>📝 Recent Todos:</h5>
        {recentTodos.length > 0 ? (
          <div>
            {recentTodos.map(todo => (
              <div key={todo.id} style={{ 
                fontSize: '12px', 
                padding: '2px 0',
                color: todo.completed ? '#28a745' : '#666'
              }}>
                {todo.completed ? '✅' : '⏳'} {todo.text}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
            No todos yet
          </div>
        )}
      </div>

      <div style={{ marginTop: '10px', fontSize: '11px', color: '#666' }}>
        💡 Component này tự động cập nhật khi todo thay đổi ở component khác nhờ Redux
      </div>
    </div>
  );
};

export default TodoStats;
