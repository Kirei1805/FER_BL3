const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5001; // Sử dụng port khác để tránh conflict

// Middleware
app.use(cors());
app.use(express.json());

// Email Configuration - Sử dụng email của bạn
const MAIL_USERNAME = 'loiphan1805@gmail.com';
const MAIL_PASSWORD = 'vkfn yoop kwqf vule';

// Tạo transporter cho Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD
  }
});

// API endpoint để gửi email
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, orderData } = req.body;

    // Cấu hình email
    const mailOptions = {
      from: `"Music Store 🎵" <${MAIL_USERNAME}>`,
      to: to,
      subject: subject,
      html: html,
      // Thêm text version cho email clients không hỗ trợ HTML
      text: `
        Xác nhận đơn hàng - Music Store
        
        Xin chào ${orderData.userDetails.name},
        
        Cảm ơn bạn đã mua hàng tại Music Store!
        
        Mã đơn hàng: #${orderData.orderId}
        Tổng tiền: $${orderData.total.toFixed(2)}
        Ngày đặt: ${new Date(orderData.date).toLocaleDateString('vi-VN')}
        
        Sản phẩm đã đặt:
        ${orderData.products.map((p, index) => 
          `${index + 1}. ${p.name} (x${p.quantity}) - $${p.totalPrice.toFixed(2)}`
        ).join('\n')}
        
        Địa chỉ giao hàng: ${orderData.shipaddress}
        
        Thời gian giao hàng: 2-5 ngày làm việc
        Phí vận chuyển: Miễn phí toàn quốc
        
        Hỗ trợ khách hàng:
        - Hotline: 1900-xxxx
        - Email: support@musicstore.com
        
        🎵 Music Store - Nơi âm nhạc kết nối cuộc sống 🎵
      `
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('📧 Email sent successfully:', info.messageId);
    
    res.json({
      success: true,
      message: 'Email đã được gửi thành công!',
      messageId: info.messageId,
      orderId: orderData.orderId,
      email: to
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể gửi email. Vui lòng thử lại sau.',
      error: error.message
    });
  }
});

// Test endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    const testMailOptions = {
      from: `"Music Store 🎵" <${MAIL_USERNAME}>`,
      to: MAIL_USERNAME, // Gửi test email đến chính mình
      subject: 'Test Email - Music Store',
      html: `
        <h1>🎵 Test Email từ Music Store</h1>
        <p>Đây là email test để kiểm tra hệ thống email.</p>
        <p>Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
        <p>🎵 Music Store - Nơi âm nhạc kết nối cuộc sống 🎵</p>
      `,
      text: `
        Test Email từ Music Store
        
        Đây là email test để kiểm tra hệ thống email.
        Thời gian: ${new Date().toLocaleString('vi-VN')}
        
        🎵 Music Store - Nơi âm nhạc kết nối cuộc sống 🎵
      `
    };

    const info = await transporter.sendMail(testMailOptions);
    
    console.log('📧 Test email sent successfully:', info.messageId);
    
    res.json({
      success: true,
      message: 'Test email đã được gửi thành công!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể gửi test email.',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Email server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`📧 Email server running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Test email: http://localhost:${PORT}/api/test-email`);
});

module.exports = app; 