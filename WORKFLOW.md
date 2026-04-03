# WORKFLOW.md - Quy trình vận hành hiện tại

## Trigger chính
- Khi Minh gửi `/batdau`

## Menu hiện tại
1) **Upload sản phẩm**

## Quy trình chuẩn khi chọn Upload sản phẩm

### Bước 1 — Thu thập input
Bắt buộc:
- Tên sản phẩm
- Ảnh sản phẩm
- Mô tả
- Giá

Khuyến nghị:
- affiliate_link
- target_audience

### Bước 2 — Chuẩn hoá dữ liệu
Chuẩn về format thống nhất và xác nhận lại với Minh trước khi chạy pipeline.

### Bước 3 — Chốt tham số nội dung
Hỏi/chốt 3 tham số:
1. Độ dài SEO: 800 / 1200 / 1800 từ
2. Video: 8s / 12s
3. Giọng điệu: bán hàng mạnh / review trung lập / premium

### Bước 4 — Chạy pipeline affiliate
- Worker A: phân tích + bài SEO + video script + video prompt
- Worker B: tạo video qua OpenAI Videos API

### Bước 5 — Trả output theo run
Thư mục `runs/affiliate-<timestamp>/`:
- affiliate_input.json
- affiliate_analysis.json
- seo_article.md
- video_script.md
- video_request.json
- video_create_response.json

### Bước 6 — Báo cáo ngắn cho Minh
- Tóm tắt kết quả chính
- Link/path output
- Trạng thái video (queued/processing/succeeded/failed)
