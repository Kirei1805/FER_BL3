import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, selectCount, selectHistory } from '../../store/counterSlice';

/**
 * BÀI TẬP 1: COUNTER APP - SỬ DỤNG REDUX
 * 
 * Ví dụ này sử dụng Redux để quản lý state
 * Đặc điểm:
 * - State được quản lý centralized
 * - Có thể chia sẻ state với components khác
 * - Dễ debug với Redux DevTools
 * - Tách biệt logic với UI
 */

const CounterRedux = () => {
  const count = useSelector(selectCount);
  const history = useSelector(selectHistory);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleIncrementByFive = () => {
    dispatch(incrementByAmount(5));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #007bff', margin: '10px' }}>
      <h3>Counter với Redux</h3>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>
        Count: {count}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleIncrement} style={{ margin: '5px' }}>+</button>
        <button onClick={handleDecrement} style={{ margin: '5px' }}>-</button>
        <button onClick={handleIncrementByFive} style={{ margin: '5px' }}>+5</button>
        <button onClick={handleReset} style={{ margin: '5px' }}>Reset</button>
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

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#006400' }}>
        <strong>Ưu điểm Redux:</strong>
        <ul>
          <li>State có thể chia sẻ giữa các component</li>
          <li>Dễ debug với Redux DevTools</li>
          <li>Time-travel debugging</li>
          <li>Tách biệt logic business với UI</li>
          <li>Predictable state updates</li>
        </ul>
      </div>
    </div>
  );
};

export default CounterRedux;
