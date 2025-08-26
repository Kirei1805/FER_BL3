import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectProducts,
  login,
  logout
} from '../../store/userSlice';

/**
 * USER PROFILE COMPONENT - REDUX VERSION
 * 
 * Component đơn giản, chỉ tập trung vào UI và user interactions
 * Logic business được handle bởi Redux
 */

const UserProfileRedux = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (name && email) {
      dispatch(login({ name, email }));
      setName('');
      setEmail('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isLoggedIn) {
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
      <p>User ID: {user.id}</p>
      <button onClick={handleLogout} style={{ padding: '5px 10px' }}>
        Logout
      </button>
    </div>
  );
};

export default UserProfileRedux;
