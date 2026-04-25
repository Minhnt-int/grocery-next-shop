# Grocery Next Shop - Migration to User Database

## Changes Made (2026-04-24)

### 1. Database Schema
- ✅ Added `User` model to Prisma schema
  - Fields: id, email (unique), password (hashed), name, role (user/admin)
  - Timestamps: createdAt, updatedAt

### 2. Authentication System
- ✅ Created `lib/db.ts` - Prisma client singleton
- ✅ Updated `lib/auth.ts` - Removed hardcoded credentials
- ✅ Updated `app/api/admin/login/route.ts` - Query User table with bcrypt
- ✅ Created `app/api/auth/login/route.ts` - User login endpoint
- ✅ Created `app/api/auth/register/route.ts` - User registration endpoint

### 3. Seed Data
- ✅ Updated `prisma/seed.js` - Creates default admin user
  - Email: `admin@grocery.local`
  - Password: `admin123`
  - Role: `admin`

### 4. Environment
- ✅ Cleaned up `.env` - Removed ADMIN_USERNAME/ADMIN_PASSWORD

## Next Steps

Run these commands to apply changes:

```bash
cd grocery-next-shop

# Generate Prisma client with new User model
npx prisma generate

# Push schema to database
npm run db:push

# Seed database (creates admin user + sample data)
npm run db:seed
```

## Login Credentials

**Admin Panel** (`/admin/login`):
- Email: `admin@grocery.local`
- Password: `admin123`

**User Registration** (`/api/auth/register`):
- POST with `{ email, password, name? }`

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login (returns user info + sets cookie)
- `POST /api/admin/login` - Admin login (checks role=admin)

---

*Migration complete. Ready to test.*
