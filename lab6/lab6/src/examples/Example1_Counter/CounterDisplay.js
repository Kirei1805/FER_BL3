import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from '../../store/counterSlice';

/**
 * COMPONENT DISPLAY COUNTER
 * 
 * Component này chỉ hiển thị giá trị counter từ Redux store
 * Ví dụ về việc chia sẻ state giữa các component
 */

const CounterDisplay = () => {
  const count = useSelector(selectCount);

  return (
    <div style={{ 
      padding: '10px', 
      backgroundColor: '#f0f0f0', 
      margin: '10px',
      textAlign: 'center',
      borderRadius: '5px'
    }}>
      <h4>Counter Value in Another Component</h4>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
        {count}
      </div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
        Component này tự động cập nhật khi counter thay đổi ở component khác
      </div>
    </div>
  );
};

export default CounterDisplay;
