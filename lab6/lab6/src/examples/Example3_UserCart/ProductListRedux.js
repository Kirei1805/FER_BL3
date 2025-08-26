import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProducts,
  selectIsLoggedIn,
  addToCart
} from '../../store/userSlice';

/**
 * PRODUCT LIST COMPONENT - REDUX VERSION
 * 
 * Component hiển thị danh sách sản phẩm và cho phép thêm vào cart
 * Chỉ user đã login mới có thể add to cart
 */

const ProductListRedux = () => {
  const products = useSelector(selectProducts);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart(product));
    } else {
      alert('Please login to add items to cart');
    }
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #007bff', margin: '10px' }}>
      <h4>🛍️ Products</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            textAlign: 'center',
            borderRadius: '5px',
            backgroundColor: isLoggedIn ? 'white' : '#f8f9fa'
          }}>
            <div style={{ fontSize: '30px' }}>{product.image}</div>
            <h5>{product.name}</h5>
            <p>${product.price}</p>
            <button 
              onClick={() => handleAddToCart(product)}
              disabled={!isLoggedIn}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: isLoggedIn ? '#007bff' : '#6c757d', 
                color: 'white', 
                border: 'none',
                cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                borderRadius: '3px'
              }}
            >
              {isLoggedIn ? 'Add to Cart' : 'Login Required'}
            </button>
          </div>
        ))}
      </div>
      
      {!isLoggedIn && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeeba',
          borderRadius: '5px',
          color: '#856404'
        }}>
          ⚠️ Please login to add products to your cart
        </div>
      )}
    </div>
  );
};

export default ProductListRedux;
