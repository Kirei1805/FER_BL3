import React, { useState, createContext, useContext } from 'react';

/**
 * BÀI TẬP 3: USER PROFILE & SHOPPING CART - LOCAL STATE + CONTEXT
 * 
 * Ví dụ này sử dụng useState + useContext để chia sẻ state
 * Đặc điểm:
 * - Phức tạp khi setup Context
 * - Khó debug khi state phức tạp
 * - Performance issues với unnecessary re-renders
 * - Prop drilling vẫn xảy ra với nested components
 */

// Context để chia sẻ state
const UserContext = createContext();
const CartContext = createContext();

// Custom hooks
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// Provider components
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    isLoggedIn: false
  });

  const login = (name, email) => {
    setUser({
      id: Date.now(),
      name,
      email,
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser({
      id: null,
      name: '',
      email: '',
      isLoggedIn: false
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    total: 0
  });

  const products = [
    { id: 1, name: 'iPhone 15', price: 999, image: '📱' },
    { id: 2, name: 'MacBook Pro', price: 1999, image: '💻' },
    { id: 3, name: 'AirPods Pro', price: 299, image: '🎧' }
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = prev.items.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prev.items, { ...product, quantity: 1 }];
      }
      
      const newTotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        items: newItems,
        total: newTotal
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newItems = prev.items.filter(item => item.id !== productId);
      const newTotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        items: newItems,
        total: newTotal
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, products, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// User Profile Component
const UserProfile = () => {
  const { user, login, logout } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (name && email) {
      login(name, email);
      setName('');
      setEmail('');
    }
  };

  if (!user.isLoggedIn) {
    return (
      <div style={{ padding: '15px', border: '1px solid #ccc', margin: '10px' }}>
        <h4>👤 Login</h4>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: 'block', margin: '5px 0', padding: '5px', width: '200px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', margin: '5px 0', padding: '5px', width: '200px' }}
        />
        <button onClick={handleLogin} style={{ marginTop: '10px', padding: '5px 10px' }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '15px', border: '1px solid #28a745', margin: '10px' }}>
      <h4>👤 Welcome, {user.name}!</h4>
      <p>Email: {user.email}</p>
      <button onClick={logout} style={{ padding: '5px 10px' }}>
        Logout
      </button>
    </div>
  );
};

// Product List Component
const ProductList = () => {
  const { products, addToCart } = useCart();

  return (
    <div style={{ padding: '15px', border: '1px solid #007bff', margin: '10px' }}>
      <h4>🛍️ Products</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            textAlign: 'center',
            borderRadius: '5px'
          }}>
            <div style={{ fontSize: '30px' }}>{product.image}</div>
            <h5>{product.name}</h5>
            <p>${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shopping Cart Component
const ShoppingCart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div style={{ padding: '15px', border: '1px solid #dc3545', margin: '10px' }}>
      <h4>🛒 Shopping Cart</h4>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '5px 0',
              borderBottom: '1px solid #eee'
            }}>
              <span>{item.image} {item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ padding: '2px 5px', fontSize: '12px' }}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
            Total: ${cart.total}
          </div>
        </>
      )}
    </div>
  );
};

// Main Component
const UserCartLocal = () => {
  return (
    <UserProvider>
      <CartProvider>
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
          <h3>User Profile & Cart với Local State + Context</h3>
          
          <UserProfile />
          <ProductList />
          <ShoppingCart />

          <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
            <strong>Vấn đề với Context API:</strong>
            <ul>
              <li>Setup phức tạp với nhiều Providers</li>
              <li>Performance issues - toàn bộ tree re-render khi context thay đổi</li>
              <li>Khó debug state changes</li>
              <li>Không có DevTools</li>
              <li>Logic business logic vẫn trộn lẫn với components</li>
              <li>Khó test logic riêng biệt</li>
            </ul>
          </div>
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default UserCartLocal;
