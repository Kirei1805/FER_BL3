import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  redirectAfterLogin: null,
  loading: false,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        loading: false, 
        error: null,
        redirectAfterLogin: null 
      };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, redirectAfterLogin: null };
    case 'SET_REDIRECT':
      return { ...state, redirectAfterLogin: action.payload };
    case 'REGISTER_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        loading: false, 
        error: null,
        redirectAfterLogin: null 
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Save user to localStorage when user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  const login = async (usernameOrEmail, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Lấy tất cả users và tìm user phù hợp
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
      
      // Tìm user có username hoặc email và password khớp
      const user = users.find(u => 
        (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
        u.password === password
      );
      
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true, user };
      } else {
        const error = 'Tên đăng nhập hoặc mật khẩu không đúng!';
        dispatch({ type: 'LOGIN_FAILURE', payload: error });
        return { success: false, error };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại!';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await axios.get(`http://localhost:5000/users?email=${userData.email}`);
      
      if (existingUser.data.length > 0) {
        const error = 'Email đã được sử dụng!';
        dispatch({ type: 'LOGIN_FAILURE', payload: error });
        return { success: false, error };
      }

      // Tạo user mới
      const newUser = {
        ...userData,
        id: Date.now(), // Tự động tăng ID
        wishlist: [] // Khởi tạo wishlist rỗng
      };

      const response = await axios.post('http://localhost:5000/users', newUser);
      const createdUser = response.data;
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: createdUser });
      return { success: true, user: createdUser };
    } catch (error) {
      const errorMessage = 'Đăng ký thất bại. Vui lòng thử lại!';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setRedirectAfterLogin = (redirectUri) => {
    dispatch({ type: 'SET_REDIRECT', payload: redirectUri });
  };

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    redirectAfterLogin: state.redirectAfterLogin,
    login,
    logout,
    register,
    setRedirectAfterLogin,
    isAuthenticated: !!state.user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

