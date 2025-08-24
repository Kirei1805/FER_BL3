import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import EmailHistory from '../components/EmailHistory';
import './EmailTestPage.css';

const EmailTestPage = () => {
  return (
    <>
      <Navbar />
      <div className="email-test-page">
        <Container>
          <div className="email-test-header">
            <h1 className="email-test-title">
              📧 Kiểm Tra Hệ Thống Email
            </h1>
            <p className="email-test-subtitle">
              Trang này cho phép bạn kiểm tra và xem lịch sử email xác nhận đơn hàng
            </p>
          </div>
          
          <EmailHistory />
          
          <div className="email-test-info">
            <h3>ℹ️ Thông Tin Về Hệ Thống Email</h3>
            <div className="info-cards">
              <div className="info-card">
                <h4>🎯 Chức Năng</h4>
                <ul>
                  <li>Gửi email xác nhận đơn hàng</li>
                  <li>Lưu trữ lịch sử email</li>
                  <li>Xem chi tiết nội dung email</li>
                  <li>Test chức năng email</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h4>📋 Cách Sử Dụng</h4>
                <ul>
                  <li>Nhấn "🧪 Test Email" để gửi email test</li>
                  <li>Xem danh sách email đã gửi</li>
                  <li>Nhấn "👁️ Xem" để xem chi tiết</li>
                  <li>Nhấn "🗑️ Xóa Lịch Sử" để xóa</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h4>🔧 Cấu Hình Thực Tế</h4>
                <ul>
                  <li>Cần đăng ký EmailJS</li>
                  <li>Cập nhật SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY</li>
                  <li>Uncomment code EmailJS trong emailService.js</li>
                  <li>Test với email thực tế</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EmailTestPage; 