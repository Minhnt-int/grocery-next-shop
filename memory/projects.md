# memory/projects.md - Active Projects

> Topic-based memory cho các dự án đang active. Load cùng với daily files.

## Grocery Next Shop (2026-04)

### Status
- **Phase:** Implementation (near complete)
- **Owner:** Minh Nguyen
- **Started:** 2026-04-13
- **Path:** `C:/Users/makod/.openclaw/workspace/grocery-next-shop`

### Stack
- Next.js 15 (App Router)
- Prisma ORM + SQLite (migrating to PostgreSQL)
- Zustand (cart/UI state)
- Tailwind CSS
- JWT cookie auth for admin

### Completed (2026-04-19)
- ✅ Storefront: hero, products, search, categories, cart sidebar, checkout, news
- ✅ Admin panel: login/logout, CRUD for products/categories/posts/orders, settings
- ✅ Auth: JWT cookie session, middleware protection
- ✅ SEO: metadata per product/category/news
- ✅ Build: 32 routes compiled, TypeScript pass

### Known Issues
- Admin login redirect bug (API 200 but no navigation)
- Cart badge hydration mismatch (non-critical)
- PostgreSQL migration blocked (password auth failed, no elevated access)

### Next Steps
- Create PostgreSQL database via pgAdmin/psql
- Migrate Prisma schema from SQLite to PostgreSQL
- Fix admin login redirect + cart hydration
- Deploy prep (Vercel/Railway/VPS)

## Affiliate Pipeline (2026-04)

### Status
- **Phase:** Setup & testing
- **Owner:** Minh Nguyen
- **Started:** 2026-04-03

### Key Components
- Telegram bot interface (`/batdau` menu)
- Auto product upload workflow
- SEO content generation (800/1200/1800 words)
- Video generation (8s/12s)
- Voice tone: sales/review/premium

### Recent Updates
- 2026-04-13: Memory architecture setup complete
- 2026-04-11: Tavily integration for web search

### Next Steps
- Test full pipeline end-to-end
- Optimize SEO generation quality
- Add more product categories

---

*Last updated: 2026-04-13*
