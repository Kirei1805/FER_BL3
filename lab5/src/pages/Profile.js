import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  // Update formData when user data changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          Vui lòng đăng nhập để xem hồ sơ của bạn.
        </Alert>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Validate form data
    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập họ và tên!');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Vui lòng nhập email!');
      return;
    }
    
    // Update user profile
    updateProfile(formData);
    toast.success('✅ Thông tin đã được cập nhật thành công!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  return (
    <div className={`profile-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="profile-card">
            <Card.Header className="text-center">
              <h3>👤 Hồ sơ cá nhân</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <div 
                  className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 profile-avatar"
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: isDarkMode ? '#495057' : '#e9ecef',
                    fontSize: '2.5rem'
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h5>{user?.name || 'Người dùng'}</h5>
                <small className="text-muted">Thành viên từ {new Date().toLocaleDateString('vi-VN')}</small>
              </div>

              <Form className="profile-form">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isDarkMode ? 'bg-dark text-light' : ''}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isDarkMode ? 'bg-dark text-light' : ''}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isDarkMode ? 'bg-dark text-light' : ''}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isDarkMode ? 'bg-dark text-light' : ''}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center gap-2 mt-4 profile-actions">
                  {!isEditing ? (
                    <Button 
                      variant="primary" 
                      onClick={() => setIsEditing(true)}
                      className="px-4"
                    >
                      ✏️ Chỉnh sửa
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="success" 
                        onClick={handleSave}
                        className="px-4"
                      >
                        💾 Lưu thay đổi
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={handleCancel}
                        className="px-4"
                      >
                        ❌ Hủy
                      </Button>
                    </>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Thống kê */}
          <Row className="mt-4">
            <Col md={4}>
              <Card className="profile-stats-card text-center">
                <Card.Body>
                  <h4>🛒</h4>
                  <h5>0</h5>
                  <small>Đơn hàng</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="profile-stats-card text-center">
                <Card.Body>
                  <h4>❤️</h4>
                  <h5>0</h5>
                  <small>Yêu thích</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="profile-stats-card text-center">
                <Card.Body>
                  <h4>⭐</h4>
                  <h5>0</h5>
                  <small>Đánh giá</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default Profile;


