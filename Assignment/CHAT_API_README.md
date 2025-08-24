# Chat API Documentation

## Tổng quan
API này được tạo bằng JSON Server để test ChatWidget component. API cung cấp các endpoints để quản lý tin nhắn, sessions, và bot responses.

## Khởi chạy API

### 1. Cài đặt JSON Server (nếu chưa có)
```bash
npm install -g json-server
```

### 2. Chạy API Server
```bash
npm run api
```

API sẽ chạy tại: `http://localhost:3001`

## Endpoints

### Messages
- **GET** `/messages` - Lấy tất cả tin nhắn
- **POST** `/messages` - Gửi tin nhắn mới
- **GET** `/messages/:id` - Lấy tin nhắn theo ID
- **PUT** `/messages/:id` - Cập nhật tin nhắn
- **DELETE** `/messages/:id` - Xóa tin nhắn

### Bot Responses
- **GET** `/botResponses` - Lấy tất cả bot responses
- **POST** `/botResponses` - Thêm bot response mới
- **GET** `/botResponses/:id` - Lấy bot response theo ID

### Chat Sessions
- **GET** `/chatSessions` - Lấy tất cả sessions
- **POST** `/chatSessions` - Tạo session mới
- **GET** `/chatSessions/:id` - Lấy session theo ID

### Users
- **GET** `/users` - Lấy tất cả users
- **GET** `/users/:id` - Lấy user theo ID
- **POST** `/users` - Tạo user mới

### Agents
- **GET** `/agents` - Lấy tất cả agents
- **GET** `/agents/:id` - Lấy agent theo ID
- **PATCH** `/agents/:id` - Cập nhật trạng thái agent

## Ví dụ sử dụng

### 1. Gửi tin nhắn
```javascript
const response = await fetch('http://localhost:3001/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: "Xin chào!",
    sender: "user",
    userId: "user123",
    timestamp: new Date().toISOString()
  })
});
```

### 2. Lấy tin nhắn
```javascript
const response = await fetch('http://localhost:3001/messages');
const messages = await response.json();
```

### 3. Lấy bot response
```javascript
const response = await fetch('http://localhost:3001/botResponses');
const botResponses = await response.json();
```

## Cấu trúc dữ liệu

### Message
```json
{
  "id": 1,
  "text": "Xin chào!",
  "sender": "user|bot",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "userId": "user123"
}
```

### Bot Response
```json
{
  "id": 1,
  "category": "greeting|product_inquiry|pricing|order|support",
  "responses": [
    "Response 1",
    "Response 2",
    "Response 3"
  ]
}
```

### Chat Session
```json
{
  "id": "session1",
  "userId": "user123",
  "startTime": "2024-01-15T10:00:00.000Z",
  "status": "active|closed",
  "agentId": "agent001"
}
```

### User
```json
{
  "id": "user123",
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@email.com",
  "phone": "0123456789",
  "preferences": {
    "language": "vi",
    "theme": "light"
  }
}
```

### Agent
```json
{
  "id": "agent001",
  "name": "Hỗ trợ viên 1",
  "status": "online|offline|busy",
  "specialties": ["guitar", "piano", "drums"]
}
```

## Categories cho Bot Responses

1. **greeting** - Chào hỏi
2. **product_inquiry** - Hỏi về sản phẩm
3. **pricing** - Hỏi về giá
4. **order** - Đặt hàng
5. **support** - Hỗ trợ

## Testing với Postman/Thunder Client

### 1. Test gửi tin nhắn
```
POST http://localhost:3001/messages
Content-Type: application/json

{
  "text": "Tôi muốn mua guitar",
  "sender": "user",
  "userId": "user123"
}
```

### 2. Test lấy tin nhắn
```
GET http://localhost:3001/messages
```

### 3. Test lấy bot responses
```
GET http://localhost:3001/botResponses
```

## Troubleshooting

### API không chạy
- Kiểm tra port 3001 có đang được sử dụng không
- Đảm bảo JSON Server đã được cài đặt
- Kiểm tra file db.json có tồn tại không

### CORS Error
- JSON Server tự động handle CORS
- Nếu vẫn lỗi, thêm middleware CORS

### Data không lưu
- Kiểm tra quyền write vào file db.json
- Đảm bảo JSON Server có quyền đọc/ghi file

## Development

### Thêm dữ liệu mới
Chỉnh sửa file `db.json` và restart server:

```bash
# Stop server (Ctrl+C)
# Edit db.json
npm run api
```

### Backup data
```bash
cp db.json db.backup.json
```

### Reset data
```bash
cp db.backup.json db.json
```

## Production

Để deploy lên production, bạn cần:
1. Thay thế JSON Server bằng real backend (Node.js, Python, etc.)
2. Sử dụng real database (MongoDB, PostgreSQL, etc.)
3. Implement authentication và authorization
4. Add rate limiting và security measures 