import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';

const LoginForm = ({ onLoginSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Vui lòng nhập email');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('Vui lòng nhập mật khẩu');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không đúng định dạng');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get all accounts from db.json
      const { data: accounts } = await api.get('/accounts');
      
      // Find matching account
      const user = accounts.find(
        account => 
          account.email === formData.email && 
          account.password === formData.password
      );

      if (!user) {
        setError('Email hoặc mật khẩu không đúng');
        return;
      }

      if (!user.isActive) {
        setError('Tài khoản đã bị vô hiệu hóa');
        return;
      }

      // Login successful
      onLoginSuccess({
        email: user.email,
        isActive: user.isActive
      });

    } catch (err) {
      console.error('Login error:', err);
      setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Nhập email của bạn"
          disabled={loading}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Nhập mật khẩu"
            disabled={loading}
          />
          <Button
            variant="link"
            className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            style={{ padding: '0.375rem 0.75rem' }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
      </Form.Group>

      <div className="d-grid gap-2">
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="mb-2"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Đang đăng nhập...
            </>
          ) : (
            'Đăng nhập'
          )}
        </Button>
        
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Hủy
        </Button>
      </div>

      <div className="mt-4 p-3 bg-light rounded">
        <h6 className="text-primary mb-2">
          <i className="fas fa-info-circle me-2"></i>
          Tài khoản thử nghiệm:
        </h6>
        <div className="small text-muted">
          <div className="mb-1">
            <strong>Admin:</strong> admin@example.com | Admin123@
          </div>
          <div>
            <strong>User:</strong> traltb@fe.edu.vn | Traltb123@
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
