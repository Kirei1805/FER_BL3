# Student Management System

Ứng dụng quản lý sinh viên được xây dựng bằng React với giao diện hiện đại và responsive.

## Tính năng

### 🎯 Giao diện chính
- **Navbar**: Chứa links (Home, Students, About) và ô Quick search
- **Hero Section**: Tiêu đề "Student Management" với mô tả và thống kê
- **Filters**: Tìm kiếm theo tên/email, lọc theo nhóm tuổi, checkbox có avatar
- **Sorting**: Sắp xếp theo tuổi (tăng/giảm) và tên (A-Z/Z-A)
- **Student Grid**: Hiển thị danh sách sinh viên dạng card
- **Modal**: Xem chi tiết sinh viên khi click "View Details"

### 📱 Responsive Design
- **Desktop**: 3 cột
- **Tablet**: 2 cột  
- **Mobile**: 1 cột

### 🛠️ Công nghệ sử dụng
- React 19
- Hooks: useState, useMemo
- PropTypes để kiểm tra type
- CSS3 với Flexbox và Grid
- Responsive design với media queries

## Cấu trúc Components

```
src/
├── components/
│   ├── Navbar.js              # Navigation bar
│   ├── Hero.js                # Hero section
│   ├── Filters.js             # Filter controls
│   ├── SortDropdown.js        # Sorting dropdown
│   ├── StudentCard.js         # Individual student card
│   ├── StudentGrid.js         # Grid layout for cards
│   ├── StudentDetailModal.js  # Modal for student details
│   ├── StudentsPage.js        # Main page component
│   └── Footer.js              # Footer component
├── data/
│   └── students.js            # Sample student data
└── App.js                     # Main app component
```

## Dữ liệu mẫu

Ứng dụng sử dụng 10 sinh viên mẫu với thông tin:
- ID
- Tên
- Email
- Tuổi
- Avatar (sử dụng Unsplash images)

## Cách chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

3. Mở trình duyệt tại: http://localhost:3000

## Build production

```bash
npm run build
```

## Tính năng nổi bật

### 🔍 Tìm kiếm và lọc
- Tìm kiếm theo tên hoặc email
- Lọc theo nhóm tuổi (≤20, 21-25, >25)
- Lọc sinh viên có avatar

### 📊 Sắp xếp
- Tuổi tăng dần/giảm dần
- Tên A→Z/Z→A

### 🎨 Giao diện
- Thiết kế hiện đại với gradient colors
- Animation và hover effects
- Modal popup cho chi tiết sinh viên
- Responsive trên mọi thiết bị

### ⚡ Performance
- Sử dụng useMemo để tối ưu filter/sort
- PropTypes để kiểm tra type safety
- Lazy loading cho images

## Tác giả

Được phát triển cho bài tập React - FER BL3 Slot11
