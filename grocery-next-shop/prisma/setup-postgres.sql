-- PostgreSQL Setup Script for Grocery Next Shop
-- Run this in pgAdmin or psql as superuser (postgres)

-- 1. Create database
CREATE DATABASE grocery_shop
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE grocery_shop IS 'Grocery Next Shop - E-commerce database';

-- 2. Create application user (optional, for production)
CREATE USER grocery_app WITH PASSWORD 'grocery_secure_2026';

-- 3. Grant privileges
GRANT ALL PRIVILEGES ON DATABASE grocery_shop TO grocery_app;

-- 4. Connect to the new database
\c grocery_shop

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO grocery_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO grocery_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO grocery_app;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO grocery_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO grocery_app;

-- Done!
SELECT 'Database grocery_shop created successfully!' AS status;
