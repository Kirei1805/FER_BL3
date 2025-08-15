import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";

// Component Form với validation nâng cao
const FormValidation = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Hàm xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Hàm validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm validate số điện thoại
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  // Hàm kiểm tra lỗi trước khi submit
  const handleValidation = () => {
    const newErrors = {};

    // Kiểm tra tên: không được để trống, 3-50 ký tự
    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Tên phải có ít nhất 3 ký tự!";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Tên không được vượt quá 50 ký tự!";
    }

    // Kiểm tra tuổi: không được để trống, từ 18-100
    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(formData.age)) {
      newErrors.age = "Tuổi phải là một số hợp lệ!";
    } else {
      const age = parseInt(formData.age);
      if (age < 18 || age > 100) {
        newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
      }
    }

    // Kiểm tra email: không được để trống, đúng định dạng
    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    // Kiểm tra số điện thoại: 10-15 chữ số
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có từ 10-15 chữ số!";
    }

    // Kiểm tra đồng ý điều khoản
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản!";
    }

    // Nếu có lỗi, hiển thị alert
    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      onSubmit(formData);
      // Reset form sau khi submit thành công
      setFormData({
        name: "",
        age: "",
        email: "",
        phone: "",
        agreeToTerms: false,
      });
      setErrors({});
      setShowAlert(false);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">{title}</h3>

      {/* Hiển thị Alert nếu có lỗi */}
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <strong>Lỗi:</strong> Vui lòng kiểm tra lại thông tin đã nhập.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* Trường tên */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Tên <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Nhập tên (3-50 ký tự)"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Trường tuổi */}
            <Form.Group controlId="formAge" className="mb-3">
              <Form.Label>Tuổi <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                isInvalid={!!errors.age}
                placeholder="Nhập tuổi (18-100)"
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            {/* Trường email */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="example@email.com"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Trường số điện thoại */}
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                placeholder="0123456789"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Checkbox đồng ý điều khoản */}
        <Form.Group controlId="formAgreeToTerms" className="mb-3">
          <Form.Check
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            isInvalid={!!errors.agreeToTerms}
            label="Tôi đồng ý với các điều khoản và điều kiện sử dụng"
          />
          {errors.agreeToTerms && (
            <div className="text-danger small mt-1">
              {errors.agreeToTerms}
            </div>
          )}
        </Form.Group>

        {/* Nút submit */}
        <div className="text-center">
          <Button variant="primary" type="submit" size="lg">
            Đăng Ký
          </Button>
        </div>
      </Form>
    </Container>
  );
};

// Xác định PropTypes cho FormValidation
FormValidation.propTypes = {
  title: PropTypes.string.isRequired, // Tiêu đề phải là một chuỗi
  onSubmit: PropTypes.func.isRequired, // Hàm onSubmit phải là một function
};

export default FormValidation;
