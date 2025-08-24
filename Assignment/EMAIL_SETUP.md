# 📧 Hướng dẫn Setup EmailJS cho Music Store

Để sử dụng chức năng gửi email thực (thay vì mock email), bạn cần setup EmailJS.

## 🚀 Bước 1: Đăng ký EmailJS

1. Truy cập [https://www.emailjs.com/](https://www.emailjs.com/)
2. Đăng ký tài khoản miễn phí
3. Xác nhận email

## 🔧 Bước 2: Tạo Service

1. Đăng nhập vào EmailJS Dashboard
2. Chọn **Email Services** > **Add New Service**
3. Chọn nhà cung cấp email (Gmail, Outlook, Yahoo, v.v.)
4. Nhập thông tin email của bạn
5. Copy **Service ID** (ví dụ: `service_abc123`)

## 📝 Bước 3: Tạo Email Template

1. Chọn **Email Templates** > **Create New Template**
2. Tạo template với các biến sau:

```html
Subject: 🎵 Xác nhận đơn hàng #{{order_id}} - Music Store

Xin chào {{to_name}},

Cảm ơn bạn đã mua sắm tại Music Store! 🎼

CHI TIẾT ĐỖN HÀNG:
📦 Mã đơn hàng: #{{order_id}}
📅 Ngày đặt: {{order_date}}
💰 Tổng tiền: {{order_total}}
📍 Địa chỉ giao hàng: {{shipping_address}}

SẢN PHẨM ĐÃ ĐẶT:
{{products_list}}

Chúng tôi sẽ xử lý và giao hàng trong 2-3 ngày làm việc.

Cảm ơn bạn đã lựa chọn {{company_name}}! 🎵

---
{{company_name}}
Email: {{company_email}}
```

3. Copy **Template ID** (ví dụ: `template_abc123`)

## 🔑 Bước 4: Lấy Public Key

1. Chọn **Integration** > **Public Key**
2. Copy **Public Key** (ví dụ: `abc123xyz`)

## ⚙️ Bước 5: Cập nhật Code

Mở file `src/services/emailService.js` và thay thế:

```javascript
// Thay thế các giá trị này bằng thông tin từ EmailJS
const SERVICE_ID = 'service_abc123'; // Service ID của bạn
const TEMPLATE_ID = 'template_abc123'; // Template ID của bạn  
const PUBLIC_KEY = 'abc123xyz'; // Public Key của bạn
```

## 🔄 Bước 6: Sử dụng Email Service thật

Trong file `src/pages/CartPage.js`, thay thế:

```javascript
// Thay đổi từ:
const emailResult = await sendMockEmail(orderData);

// Thành:
const emailResult = await sendOrderConfirmationEmail(orderData);
```

## 📧 Kết quả

Sau khi setup xong, khách hàng sẽ nhận được email xác nhận thực sự khi đặt hàng thành công!

## 🎯 Lưu ý

- EmailJS miễn phí cho 200 email/tháng
- Hiện tại đang sử dụng `sendMockEmail` để demo
- Email mock vẫn hiển thị thông báo và log trong console

## 🎵 Chúc bạn thành công!

Nếu có vấn đề gì, hãy kiểm tra Console để debug và xem log EmailJS. 