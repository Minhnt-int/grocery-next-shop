# PostgreSQL Migration Guide

## Tình trạng hiện tại
- ✅ PostgreSQL 17 service đang chạy (port 5432)
- ❌ Không có credential hợp lệ để tạo DB
- 🔄 Project vẫn dùng SQLite tạm (`prisma/dev.db`)

## Các bước migrate (khi có DB credentials)

### 1. Tạo database PostgreSQL

```bash
# Dùng pgAdmin hoặc psql
psql -U postgres -h localhost
CREATE DATABASE grocery_shop;
\q
```

### 2. Cập nhật Prisma schema

File: `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Cập nhật .env

```env
# Thay đổi từ SQLite
# DATABASE_URL="file:./dev.db"

# Sang PostgreSQL
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/grocery_shop?schema=public"
```

### 4. Cài pg driver (nếu chưa có)

```bash
npm install pg
```

### 5. Push schema và seed data

```bash
# Push schema lên PostgreSQL
npm run db:push

# Seed dữ liệu mẫu
npm run db:seed

# Seed tin tức (optional)
node prisma/seed-news.js
```

### 6. Build và test

```bash
npm run build
npm run dev
```

## Script tự động migrate (khi có credentials)

File: `scripts/migrate-to-postgres.sh`

```bash
#!/bin/bash
set -e

echo "🔄 Starting PostgreSQL migration..."

# Backup SQLite data
echo "📦 Backing up SQLite data..."
cp prisma/dev.db prisma/dev.db.backup

# Update schema
echo "📝 Updating Prisma schema..."
sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma

# Push schema
echo "🚀 Pushing schema to PostgreSQL..."
npm run db:push

# Seed data
echo "🌱 Seeding data..."
npm run db:seed
node prisma/seed-news.js

# Build
echo "🏗️  Building project..."
npm run build

echo "✅ Migration complete!"
```

## Lưu ý quan trọng

### Khác biệt SQLite vs PostgreSQL

1. **Auto-increment:**
   - SQLite: `@default(autoincrement())`
   - PostgreSQL: `@default(autoincrement())` (Prisma tự convert)

2. **Boolean:**
   - SQLite: lưu dưới dạng 0/1
   - PostgreSQL: native boolean type

3. **DateTime:**
   - SQLite: text/integer
   - PostgreSQL: native timestamp

4. **Performance:**
   - PostgreSQL nhanh hơn nhiều với concurrent writes
   - Hỗ trợ full-text search tốt hơn

### Checklist sau khi migrate

- [ ] Test login admin
- [ ] Test CRUD products/categories/posts
- [ ] Test cart + checkout flow
- [ ] Test search functionality
- [ ] Verify all API routes
- [ ] Check performance (query time)

## Troubleshooting

### Lỗi: "password authentication failed"
```bash
# Reset password PostgreSQL
# 1. Tìm file pg_hba.conf
# 2. Đổi method từ 'md5' sang 'trust' tạm
# 3. Restart service
# 4. Đổi password: ALTER USER postgres PASSWORD 'new_password';
# 5. Đổi lại 'trust' thành 'md5'
```

### Lỗi: "database does not exist"
```bash
psql -U postgres -h localhost -c "CREATE DATABASE grocery_shop;"
```

### Lỗi: "relation does not exist"
```bash
# Schema chưa được push
npm run db:push
```

## Khi nào nên migrate?

✅ **Nên migrate ngay khi:**
- Chuẩn bị deploy production
- Cần concurrent users > 10
- Cần full-text search
- Cần transaction isolation

⏸️ **Có thể đợi:**
- Đang dev local một mình
- Chưa có production server
- Chỉ test features

## Contact

Nếu cần hỗ trợ migrate, ping Javis với:
- PostgreSQL credentials (user/password/host/port)
- Database name muốn dùng
- Có muốn giữ data SQLite cũ không

---

*Last updated: 2026-04-20*
