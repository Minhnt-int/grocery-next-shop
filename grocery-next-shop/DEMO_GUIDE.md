# Demo Testing Guide

## Cách chạy demo

1. Mở terminal tại `grocery-next-shop/`
2. Chạy:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt: `http://localhost:3000`

## Các trang cần test

### 1. Trang chủ (/)
**Nên thấy:**
- Hero banner với tên shop "GreenBasket"
- Danh mục: Rau Củ, Đồ Uống, Gạo & Ngũ Cốc, Gia Vị
- Section "Flash Sale" với 2 sản phẩm
- Section "Sản phẩm nổi bật" với 3 sản phẩm
- Header có logo + cart icon
- Footer có thông tin shop

**Dữ liệu từ:** SQLite database (đã seed)

### 2. Trang sản phẩm (/products)
**Nên thấy:**
- Tiêu đề "Tất cả sản phẩm"
- Category pills để lọc
- Grid 4 sản phẩm
- Click vào category → lọc theo danh mục

**Test:**
- Click "Rau Củ" → chỉ hiện cà chua
- Click "Đồ Uống" → chỉ hiện nước cam
- Click "Tất cả" → hiện hết

### 3. Chi tiết sản phẩm (/products/ca-chua-huu-co-da-lat)
**Nên thấy:**
- Ảnh sản phẩm lớn
- Tên: "Cà chua hữu cơ Đà Lạt"
- Giá: 35.000₫
- Mô tả đầy đủ
- Tồn kho: 120
- Nút tăng/giảm số lượng
- Nút "Thêm vào giỏ hàng"

**Test:**
- Tăng số lượng lên 3
- Click "Thêm vào giỏ hàng"
- Cart icon ở header nên hiện số 3

### 4. Giỏ hàng (/cart)
**Nên thấy:**
- Danh sách sản phẩm đã thêm
- Mỗi item có:
  - Ảnh
  - Tên
  - Giá đơn
  - Số lượng (có thể chỉnh)
  - Tổng tiền
  - Nút xóa
- Sidebar tóm tắt đơn hàng
- Nút "Tiến hành thanh toán"

**Test:**
- Tăng/giảm số lượng → tổng tiền tự động cập nhật
- Xóa sản phẩm → biến khỏi giỏ
- Nếu giỏ trống → hiện "Giỏ hàng đang trống"

### 5. Thanh toán (/checkout)
**Nên thấy:**
- Form nhập:
  - Họ và tên
  - Số điện thoại
  - Địa chỉ giao hàng
  - Ghi chú (optional)
- Sidebar tóm tắt thanh toán
- Nút "Xác nhận đặt hàng"

**Test:**
- Điền đầy đủ thông tin
- Click "Xác nhận đặt hàng"
- Nếu thành công:
  - Giỏ hàng bị xóa sạch
  - Redirect về trang chủ
  - Order được tạo trong database

## Kiểm tra database

Sau khi test checkout, kiểm tra order đã lưu:

```bash
cd grocery-next-shop
npx prisma studio
```

Mở `http://localhost:5555` → xem bảng `Order` và `OrderItem`

## Theme config

Màu sắc hiện tại (xem `data/site.config.json`):
- Primary: xanh lá (#16a34a)
- Accent: cam (#f97316)
- Background: xám nhạt (#f8fafc)

Có thể chỉnh trực tiếp file này, reload page sẽ thấy màu đổi.

## Các tính năng đã hoạt động

✅ Load sản phẩm từ database
✅ Lọc theo category
✅ Chi tiết sản phẩm
✅ Thêm vào giỏ hàng (localStorage)
✅ Chỉnh số lượng trong giỏ
✅ Xóa sản phẩm khỏi giỏ
✅ Checkout tạo order trong DB
✅ Theme config động

## Chưa có (Phase 3)

❌ Admin dashboard
❌ CRUD sản phẩm
❌ CRUD danh mục
❌ Quản lý đơn hàng
❌ Theme editor UI
❌ Authentication

---

**Lưu ý:** Dev server đang chạy ở background. Để dừng:
```bash
# Tìm process
Get-Process | Where-Object {$_.ProcessName -like "*node*"}

# Hoặc Ctrl+C trong terminal đang chạy npm run dev
```
