import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2024 Student Management System. Được phát triển với React.</p>
          <div className="footer-links">
            <a href="#privacy">Chính sách bảo mật</a>
            <a href="#terms">Điều khoản sử dụng</a>
            <a href="#contact">Liên hệ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


