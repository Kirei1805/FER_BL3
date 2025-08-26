import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Example 1: Counter
import CounterLocal from './examples/Example1_Counter/CounterLocal';
import CounterRedux from './examples/Example1_Counter/CounterRedux';
import CounterDisplay from './examples/Example1_Counter/CounterDisplay';

// Example 2: Todo List
import TodoLocal from './examples/Example2_TodoList/TodoLocal';
import TodoRedux from './examples/Example2_TodoList/TodoRedux';
import TodoStats from './examples/Example2_TodoList/TodoStats';

// Example 3: User Profile & Shopping Cart
import UserCartLocal from './examples/Example3_UserCart/UserProfileLocal';
import UserCartRedux from './examples/Example3_UserCart/UserCartRedux';

import './App.css';

/**
 * MAIN APP - DEMO 3 BÀI TẬP SO SÁNH REDUX VS KHÔNG REDUX
 * 
 * Bài tập 1: Counter App - So sánh Local State vs Redux
 * Bài tập 2: Todo List - Quản lý state phức tạp
 * Bài tập 3: User Profile & Shopping Cart - State sharing
 */

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#f8f9fa',
          borderBottom: '2px solid #007bff'
        }}>
          <h1>🚀 Redux vs Local State - 3 Bài Tập Demo</h1>
          <p style={{ color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            So sánh việc sử dụng Redux và Local State qua 3 ví dụ thực tế. 
            Mỗi ví dụ minh họa khi nào nên và không nên sử dụng Redux.
          </p>
          <div style={{ marginTop: '10px' }}>
            <a 
              href="/src/WHY_REDUX.md" 
              style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              📖 Đọc chi tiết về Redux tại WHY_REDUX.md
            </a>
          </div>
        </header>

        <main style={{ padding: '20px' }}>
          {/* Bài tập 1: Counter */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#007bff', 
              borderBottom: '2px solid #007bff', 
              paddingBottom: '10px' 
            }}>
              📊 Bài tập 1: Counter App
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              <strong>Mục đích:</strong> So sánh Local State vs Redux với logic đơn giản.
              <br />
              <strong>Kết luận:</strong> Local State đủ dùng cho logic đơn giản. Redux có ý nghĩa khi cần share state.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <CounterLocal />
              <CounterRedux />
            </div>
            
            <CounterDisplay />
          </section>

          {/* Bài tập 2: Todo List */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#28a745', 
              borderBottom: '2px solid #28a745', 
              paddingBottom: '10px' 
            }}>
              ✅ Bài tập 2: Todo List
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              <strong>Mục đích:</strong> So sánh việc quản lý state phức tạp với filtering, searching.
              <br />
              <strong>Kết luận:</strong> Redux giúp tách biệt logic business, dễ maintain và test hơn.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <TodoLocal />
              <div>
                <TodoRedux />
                <TodoStats />
              </div>
            </div>
          </section>

          {/* Bài tập 3: User Profile & Shopping Cart */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#dc3545', 
              borderBottom: '2px solid #dc3545', 
              paddingBottom: '10px' 
            }}>
              🛒 Bài tập 3: User Profile & Shopping Cart
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              <strong>Mục đích:</strong> So sánh Context API vs Redux cho state sharing phức tạp.
              <br />
              <strong>Kết luận:</strong> Redux vượt trội về performance, debugging và developer experience.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <UserCartLocal />
              <UserCartRedux />
            </div>
          </section>

          {/* Summary */}
          <section style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '30px', 
            borderRadius: '10px',
            border: '2px solid #007bff'
          }}>
            <h2 style={{ color: '#007bff', textAlign: 'center' }}>
              🎯 Tổng Kết: Khi nào nên dùng Redux?
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
              <div>
                <h3 style={{ color: '#28a745' }}>✅ NÊN dùng Redux khi:</h3>
                <ul style={{ color: '#666' }}>
                  <li>State phức tạp với nhiều business logic</li>
                  <li>Cần share state giữa nhiều components</li>
                  <li>Cần debugging mạnh mẽ (Redux DevTools)</li>
                  <li>Team > 3 developers</li>
                  <li>App có > 50 components</li>
                  <li>Cần time-travel debugging</li>
                  <li>Logic business cần test riêng biệt</li>
                </ul>
              </div>
              
              <div>
                <h3 style={{ color: '#dc3545' }}>❌ KHÔNG nên dùng Redux khi:</h3>
                <ul style={{ color: '#666' }}>
                  <li>App đơn giản với local state</li>
                  <li>Team nhỏ, learning curve cao</li>
                  <li>Chỉ cần state cho 1-2 components</li>
                  <li>Logic đơn giản không cần tách biệt</li>
                  <li>Prototype hoặc POC nhanh</li>
                  <li>useState/useContext đã đủ dùng</li>
                </ul>
              </div>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              marginTop: '20px', 
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '5px',
              border: '1px solid #007bff'
            }}>
              <strong style={{ color: '#007bff', fontSize: '18px' }}>
                💡 Quy tắc vàng: "Bắt đầu với local state, chuyển sang Redux khi complexity tăng"
              </strong>
            </div>
          </section>
        </main>

        <footer style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#343a40',
          color: 'white',
          marginTop: '40px'
        }}>
          <p>
            🚀 Redux Demo Project - So sánh Local State vs Redux
            <br />
            <small>Mở Redux DevTools (F12) để xem state changes trong real-time!</small>
          </p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;