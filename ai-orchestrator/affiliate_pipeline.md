# Affiliate Auto Pipeline (v1)

## Mục tiêu
Tự động hóa quy trình tiếp thị liên kết cho **mỗi sản phẩm đầu vào**:

1. Nhận input sản phẩm (tên, ảnh, mô tả, giá)
2. Phân tích sản phẩm tương tự + dự đoán tính năng nổi bật
3. Viết bài giới thiệu chuẩn SEO, hấp dẫn, có chèn ảnh minh họa
4. Viết kịch bản video ngắn tránh trùng lặp
5. Dùng 2 worker:
   - Worker A: tạo phân tích + bài SEO + kịch bản + video prompt
   - Worker B: tạo video từ prompt (OpenAI Videos API)

## Input JSON chuẩn
```json
{
  "product_name": "...",
  "product_image_url": "https://...",
  "product_description": "...",
  "product_price": "...",
  "affiliate_link": "https://...",
  "target_audience": "...",
  "tone": "friendly, persuasive",
  "language": "vi"
}
```

## Output
Thư mục `runs/<timestamp>/` sẽ có:

- `affiliate_input.json`
- `affiliate_analysis.json`
- `seo_article.md`
- `video_script.md`
- `video_request.json`
- `video_create_response.json`

## Điều kiện chống trùng lặp (v1)
Worker A phải:
- Tạo 3 góc tiếp cận nội dung khác nhau trước khi chọn 1
- Tránh opening phrase lặp theo template cố định
- Dùng hooks theo pain-point/benefit cụ thể từng sản phẩm

## Lưu ý
- Videos API tạo job bất đồng bộ, response ban đầu thường là `queued`.
- Có thể mở rộng thêm bước polling trạng thái video ở v2.
