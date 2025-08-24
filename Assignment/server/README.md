# 📧 Music Store Email Server

Email server để gửi email xác nhận đơn hàng qua Gmail SMTP.

## 🚀 Cài Đặt

1. **Cài đặt dependencies:**
```bash
cd server
npm install
```

2. **Cấu hình Gmail:**
- Đã cấu hình sẵn với email: `viettaifptudn@gmail.com`
- App password: `dtyk crir cfxa kkjm`

## 🎯 Sử Dụng

### Khởi động server:
```bash
npm start
```

### Khởi động với nodemon (development):
```bash
npm run dev
```

## 📋 API Endpoints

### 1. Gửi Email Xác Nhận Đơn Hàng
```
POST http://localhost:5001/api/send-email
```

**Body:**
```json
{
  "to": "email@example.com",
  "subject": "Xác nhận đơn hàng #123456",
  "html": "<html>...</html>",
  "orderData": {
    "orderId": "123456",
    "userDetails": {
      "name": "Nguyễn Văn A",
      "email": "email@example.com"
    },
    "total": 299.99,
    "date": "2024-01-01",
    "shipaddress": "123 ABC Street",
    "products": [
      {
        "name": "Guitar Acoustic",
        "quantity": 1,
        "totalPrice": 299.99
      }
    ]
  }
}
```

### 2. Test Email
```
GET http://localhost:5001/api/test-email
```

### 3. Health Check
```
GET http://localhost:5001/api/health
```

## 🔧 Cấu Hình

### Thay đổi email Gmail:
1. Mở file `emailServer.js`
2. Cập nhật `MAIL_USERNAME` và `MAIL_PASSWORD`
3. Restart server

### Tạo App Password cho Gmail:
1. Vào Google Account Settings
2. Security > 2-Step Verification > App passwords
3. Tạo app password cho "Mail"
4. Sử dụng password này trong `MAIL_PASSWORD`

## 📧 Email Template

Email được gửi với:
- **HTML version**: Giao diện đẹp với CSS
- **Text version**: Fallback cho email clients cũ
- **Subject**: Tự động tạo với mã đơn hàng
- **From**: "Music Store 🎵" <viettaifptudn@gmail.com>

## 🛠️ Troubleshooting

### Lỗi Authentication:
- Kiểm tra email và password
- Đảm bảo 2FA đã bật và app password đúng
- Kiểm tra "Less secure app access" nếu cần

### Lỗi Network:
- Kiểm tra port 5001 không bị block
- Đảm bảo CORS được cấu hình đúng
- Kiểm tra firewall settings

### Lỗi Email không gửi được:
- Kiểm tra Gmail quota (500 emails/ngày)
- Kiểm tra spam folder
- Test với email khác

## 📝 Logs

Server sẽ log:
- ✅ Email sent successfully
- ❌ Email sending failed
- 📧 Test email results
- 🔍 Health check status

## 🎵 Music Store Integration

Frontend sẽ gọi API này khi:
- Đặt hàng thành công
- Test email functionality
- Check email status

---

**🎵 Music Store - Nơi âm nhạc kết nối cuộc sống 🎵** 