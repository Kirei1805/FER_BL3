import React, { useState } from 'react';

/**
 * BÀI TẬP 1: COUNTER APP - SỬ DỤNG LOCAL STATE
 * 
 * Ví dụ này sử dụng useState để quản lý state locally
 * Đặc điểm:
 * - Đơn giản, dễ hiểu
 * - Phù hợp cho state đơn giản
 * - State chỉ có thể truy cập trong component này
 */

const CounterLocal = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory(prev => [...prev, `Increased to ${newCount}`]);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory(prev => [...prev, `Decreased to ${newCount}`]);
  };

  const reset = () => {
    setCount(0);
    setHistory(prev => [...prev, 'Reset to 0']);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Counter với Local State</h3>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>
        Count: {count}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={increment} style={{ margin: '5px' }}>+</button>
        <button onClick={decrement} style={{ margin: '5px' }}>-</button>
        <button onClick={reset} style={{ margin: '5px' }}>Reset</button>
      </div>

      <div>
        <h4>History:</h4>
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {history.map((action, index) => (
            <div key={index} style={{ fontSize: '12px' }}>
              {index + 1}. {action}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <strong>Hạn chế:</strong>
        <ul>
          <li>State không thể chia sẻ với component khác</li>
          <li>Khó debug khi app phức tạp</li>
          <li>Không có time-travel debugging</li>
          <li>Logic business logic trộn lẫn với UI</li>
        </ul>
      </div>
    </div>
  );
};

export default CounterLocal;
