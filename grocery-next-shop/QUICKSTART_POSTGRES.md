# Quick Start: PostgreSQL Setup

## Bước 1: Tạo Database (30 giây)

### Cách 1: Dùng pgAdmin (GUI)
1. Mở **pgAdmin 4**
2. Kết nối vào **PostgreSQL 17**
3. Right-click **Databases** → **Create** → **Database**
4. Nhập tên: `grocery_shop`
5. Click **Save**

### Cách 2: Dùng SQL (nhanh hơn)
1. Mở **pgAdmin 4** hoặc **psql**
2. Chạy file: `prisma/setup-postgres.sql`
   - Hoặc copy/paste nội dung file vào Query Tool

## Bước 2: Cập nhật .env (10 giây)

Mở file `.env` và thay đổi:

```env
# Từ SQLite
DATABASE_URL="file:./dev.db"

# Sang PostgreSQL (chọn 1 trong 2)

# Option A: Dùng user postgres
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/grocery_shop?schema=public"

# Option B: Dùng user grocery_app (đã tạo trong setup-postgres.sql)
DATABASE_URL="postgresql://grocery_app:grocery_secure_2026@localhost:5432/grocery_shop?schema=public"
```

## Bước 3: Đổi Prisma Schema (5 giây)

File: `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"  // Đổi từ "sqlite"
  url      = env("DATABASE_URL")
}
```

## Bước 4: Migrate (1 phút)

```bash
cd grocery-next-shop

# Cài pg driver
npm install pg

# Push schema
npm run db:push

# Seed data
npm run db:seed
node prisma/seed-news.js

# Build
npm run build

# Run
npm run dev
```

## Xong! 🎉

Truy cập:
- **Storefront:** http://localhost:3000
- **Admin:** http://localhost:3000/admin
  - Username: `admin`
  - Password: `admin123`

---

**Tổng thời gian:** ~2 phút  
**Lưu ý:** Đổi password `grocery_app` trước khi deploy production!
