import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectIsLoggedIn,
  removeFromCart,
  updateCartItemQuantity,
  clearCart
} from '../../store/userSlice';

/**
 * SHOPPING CART COMPONENT - REDUX VERSION
 * 
 * Component quản lý shopping cart với đầy đủ tính năng:
 * - Hiển thị items trong cart
 * - Update quantity
 * - Remove items
 * - Clear cart
 */

const ShoppingCartRedux = () => {
  const cart = useSelector(selectCart);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemCount = useSelector(selectCartItemCount);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '15px', border: '1px solid #dc3545', margin: '10px' }}>
        <h4>🛒 Shopping Cart</h4>
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Please login to view your shopping cart
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '15px', border: '1px solid #dc3545', margin: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h4>🛒 Shopping Cart ({cartItemCount} items)</h4>
        {cartItems.length > 0 && (
          <button 
            onClick={handleClearCart}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none',
              borderRadius: '3px',
              fontSize: '12px'
            }}
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛒</div>
          <p>Your cart is empty</p>
          <small>Add some products to get started!</small>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '15px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #eee',
                backgroundColor: '#f8f9fa',
                marginBottom: '5px',
                borderRadius: '5px'
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '20px', marginRight: '10px' }}>{item.image}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    ${item.price} each
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      style={{ 
                        width: '25px', 
                        height: '25px', 
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      minWidth: '30px', 
                      textAlign: 'center',
                      padding: '2px 8px',
                      border: '1px solid #ccc',
                      backgroundColor: 'white'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      style={{ 
                        width: '25px', 
                        height: '25px', 
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                  
                  <span style={{ minWidth: '60px', textAlign: 'right', fontWeight: 'bold' }}>
                    ${item.price * item.quantity}
                  </span>
                  
                  <button 
                    onClick={() => handleRemoveFromCart(item.id)}
                    style={{ 
                      padding: '5px 8px', 
                      fontSize: '12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            borderTop: '2px solid #dc3545', 
            paddingTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Total: ${cartTotal}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {cartItemCount} items in cart
              </div>
            </div>
            
            <button style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartRedux;
