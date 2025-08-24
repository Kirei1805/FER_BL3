# 🔍 Hướng dẫn tính năng Search nâng cao - Music Store

## ✨ Tổng quan các tính năng mới

### 🎯 1. Basic Search (Tìm kiếm cơ bản)
- **Vị trí:** Navbar search box
- **Cách dùng:** Nhập từ khóa và nhấn Enter hoặc click nút 🔍
- **Tìm kiếm trong:** Tên sản phẩm, mô tả, thương hiệu, danh mục

### 🔧 2. Advanced Search (Tìm kiếm nâng cao)
- **Vị trí:** Click "🔧 Tìm kiếm nâng cao" trong navbar hoặc truy cập `/search`
- **Bộ lọc có sẵn:**

#### 💰 Lọc theo giá
- Nhập giá tối thiểu và tối đa
- Tự động hiển thị khoảng giá của tất cả sản phẩm
- Hỗ trợ lọc một phía (chỉ min hoặc chỉ max)

#### 🎵 Lọc theo danh mục
- Guitars
- Keyboards  
- Drums
- Accessories

#### 🎸 Lọc theo thương hiệu
- Yamaha, Fender, Gibson, Roland, v.v.
- Dropdown hiển thị tất cả thương hiệu có sẵn

#### 📦 Lọc theo tình trạng
- Checkbox "Chỉ sản phẩm còn hàng"
- Lọc ra những sản phẩm hết hàng

### 📊 3. Sorting (Sắp xếp)
- **🎯 Mặc định:** Thứ tự ban đầu
- **🔤 Tên (A-Z/Z-A):** Sắp xếp theo tên sản phẩm
- **💰 Giá (Thấp → Cao / Cao → Thấp):** Sắp xếp theo giá
- **✅ Còn hàng trước:** Hiện sản phẩm còn hàng trước

## 🚀 Cách sử dụng

### Tìm kiếm cơ bản:
1. Nhập từ khóa vào search box trong navbar
2. Nhấn Enter hoặc click 🔍
3. Xem kết quả và sử dụng sorting nếu cần

### Tìm kiếm nâng cao:
1. Click "🔧 Tìm kiếm nâng cao" trong navbar
2. Điền các bộ lọc theo nhu cầu:
   - **Giá:** Nhập khoảng giá mong muốn
   - **Danh mục:** Chọn loại nhạc cụ
   - **Thương hiệu:** Chọn hãng yêu thích
   - **Tình trạng:** Tick nếu chỉ muốn sản phẩm còn hàng
3. Kết quả tự động cập nhật
4. Sử dụng "📊 Sắp xếp" để thay đổi thứ tự hiển thị
5. Click "🧹 Xóa bộ lọc" để reset

## 🎨 UI/UX Features

### ✨ Animations
- Smooth transitions khi load trang
- Hover effects trên các controls
- Staggered animations cho product cards
- Loading states với spinner đẹp

### 🔔 Feedback
- Badge hiển thị số lượng kết quả
- Empty state với emoji và gợi ý
- Responsive design cho mobile

### 🎵 Music Theme
- Icons theo chủ đề âm nhạc (🎸🎹🥁🎵)
- Color scheme purple-blue gradient
- Typography và spacing hài hòa

## 💡 Tips & Tricks

### Tìm kiếm hiệu quả:
- **Tìm guitar giá rẻ:** Chọn danh mục "Guitars" + giá max $500
- **Sản phẩm Yamaha còn hàng:** Chọn brand "Yamaha" + tick "Còn hàng"
- **Keyboard chuyên nghiệp:** Tìm "keyboard" + giá min $1000
- **Phụ kiện:** Chọn danh mục "Accessories" để xem đồ phụ trợ

### Shortcuts:
- **Enter** trong search box: Tìm kiếm nhanh
- **🔧 Tìm kiếm nâng cao:** Truy cập full features
- **🧹 Xóa bộ lọc:** Reset về trạng thái ban đầu

## 🔧 Technical Features

### Performance:
- ⚡ Client-side filtering (không cần reload)
- 🎯 Intelligent caching
- 📱 Mobile-optimized UI

### Accessibility:
- 🎨 High contrast colors
- ⌨️ Keyboard navigation
- 📖 Screen reader friendly

### Browser Support:
- ✅ Chrome, Firefox, Safari, Edge
- 📱 iOS Safari, Chrome Mobile
- 💻 Responsive design

---

## 🎵 Enjoy your enhanced Music Store search experience! 🎸

**Need help?** Có vấn đề gì hãy liên hệ support team nhé! 🎼 