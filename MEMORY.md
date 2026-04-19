# MEMORY.md - Long-term Memory

> Trí nhớ dài hạn: Cài đặt, quy ước, bài học. Giữ dưới 100 dòng.

## User Preferences

- **Name:** Minh Nguyen
- **Timezone:** Asia/Saigon
- **Language:** Vietnamese (primary), English (technical)
- **Work style:** Tự động hóa, ít can thiệp thủ công
- **Chat commands:** `/batdau` → hiện menu lựa chọn

## System Configuration

### Memory Architecture (2026-04-13)
- **Tier 1:** MEMORY.md - long-term (< 100 lines)
- **Tier 2:** memory/YYYY-MM-DD.md - short-term daily logs (50 lines)
- **Tier 3:** Semantic search - deep search across all markdown files
- **Maintenance:** Monthly on 10th - consolidate, cleanup, optimize

### Tools & Integrations
- **Tavily:** Web search & extract (enabled 2026-04-11)
- **Browser:** Direct web automation
- **Telegram:** Primary interface, inline buttons enabled

## Lessons Learned

### 2026-04-11: Web automation priority
- **Lesson:** Ưu tiên `tavily_search`/`tavily_extract` cho tìm kiếm web
- **Context:** Setup Tavily plugin thành công
- **Rule:** Dùng `browser` tool khi cần thao tác trực tiếp (click, form)

### 2026-04-13: Memory system design
- **Lesson:** 3-tier memory prevents token burn
- **Context:** User đề xuất kiến trúc memory rõ ràng
- **Implementation:** Daily files + MEMORY.md + semantic search

## Important Decisions

### Chat Interface (2026-04)
- **Decision:** Menu-driven workflow với `/batdau`
- **Rationale:** Giảm friction, tăng automation
- **Current menu:** Upload sản phẩm (affiliate pipeline)

## Active Projects

- **Affiliate pipeline:** Tự động upload sản phẩm (xem WORKFLOW.md)
- **Grocery Next Shop:** Near-complete Next.js storefront + admin; pending PostgreSQL migration and a couple of bug fixes
- **Memory optimization:** Setup 3-tier architecture; keep daily files short and push project state into topic files

---

*Last updated: 2026-04-19*
*Lines: ~62/100*
