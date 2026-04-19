# Search Security Notes

## Kiến trúc hiện tại
Autocomplete search **KHÔNG kết nối trực tiếp database từ browser**.

Flow an toàn:

1. User gõ text ở frontend (`SearchBar`)
2. Frontend gọi **Next.js API route**: `/api/products?search=...`
3. API route chạy **server-side** trong Next.js
4. Server-side gọi Prisma query
5. Chỉ trả về dữ liệu cần thiết cho frontend

## Vì sao cách này an toàn hơn?
- Browser **không có access trực tiếp** tới database
- Không lộ `DATABASE_URL`
- Không expose Prisma client ra client-side bundle
- Query nằm ở server route, có thể thêm validation/rate-limit/auth sau này

## Hiện trạng bảo mật
### Đã đúng:
- Prisma chỉ dùng trong `lib/queries/*` và API route / server component
- Frontend chỉ fetch qua `/api/*`
- DB chạy local SQLite, không mở public endpoint

### Cần nâng thêm ở phase sau:
- Rate limit cho search API
- Sanitize/trim query kỹ hơn
- Logging + abuse protection
- Auth cho admin routes
- Pagination cho search lớn

## Kết luận
**Có, theo kiến trúc hiện tại thì search autocomplete đang đi qua Next.js server-side và không lộ database trực tiếp ra ngoài.**

Nhưng để production-grade thì vẫn nên thêm rate-limit + validation chặt hơn ở phase sau.
