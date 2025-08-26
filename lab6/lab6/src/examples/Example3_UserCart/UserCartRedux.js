import React from 'react';
import UserProfileRedux from './UserProfileRedux';
import ProductListRedux from './ProductListRedux';
import ShoppingCartRedux from './ShoppingCartRedux';

/**
 * BÀI TẬP 3: USER PROFILE & SHOPPING CART - REDUX VERSION
 * 
 * Ví dụ này sử dụng Redux để quản lý state phức tạp
 * Đặc điểm:
 * - State được chia sẻ dễ dàng giữa các components
 * - Components nhỏ gọn, dễ maintain
 * - Logic business tách biệt khỏi UI
 * - Dễ debug với Redux DevTools
 * - Performance tốt với selective re-rendering
 */

const UserCartRedux = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid #007bff', margin: '10px' }}>
      <h3>User Profile & Cart với Redux</h3>
      
      <UserProfileRedux />
      <ProductListRedux />
      <ShoppingCartRedux />

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#006400' }}>
        <strong>Ưu điểm Redux với ứng dụng phức tạp:</strong>
        <ul>
          <li>✅ State sharing dễ dàng giữa các components</li>
          <li>✅ Components nhỏ gọn, single responsibility</li>
          <li>✅ Logic business tách biệt và có thể test riêng</li>
          <li>✅ Performance tốt - chỉ re-render khi cần thiết</li>
          <li>✅ Debugging mạnh mẽ với Redux DevTools</li>
          <li>✅ Time-travel debugging</li>
          <li>✅ Predictable state updates</li>
          <li>✅ Middleware support (logging, async actions, etc.)</li>
          <li>✅ Dễ scale khi app phát triển</li>
        </ul>
      </div>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <strong>Demo tính năng:</strong>
        <ul>
          <li>Login/Logout - state được chia sẻ giữa tất cả components</li>
          <li>Add to cart - chỉ hoạt động khi đã login</li>
          <li>Cart updates - tự động cập nhật quantity và total</li>
          <li>State persistence - login state được giữ khi navigate</li>
        </ul>
      </div>
    </div>
  );
};

export default UserCartRedux;
