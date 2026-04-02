# AI Orchestrator Toolkit

Bộ công cụ này giúp bạn điều phối nhiều AI worker (OpenAI-compatible API) theo pipeline:

1. **Clarify** yêu cầu
2. **Plan** (chia task + dependency)
3. **Dispatch** task cho worker phù hợp
4. **Review & Sync** đầu ra
5. **Xuất báo cáo cuối**

## Mục tiêu

- Làm rõ yêu cầu trước khi làm
- Chia nhỏ đầu việc có dependency rõ ràng
- Đồng bộ dữ liệu qua `task_id`, `depends_on`, artifact JSON
- Có thể chạy nhiều worker song song
- Lưu toàn bộ dấu vết (audit) vào `runs/<timestamp>/`

## Cấu trúc

- `ai_hub.py`: CLI điều phối chính
- `providers.template.json`: mẫu khai báo provider/worker

## Yêu cầu

- Python 3.10+
- API tương thích endpoint `/chat/completions`

## Cách dùng

### 1) Tạo config từ template

```bash
python ai_hub.py init-config
```

Sinh ra `providers.json` trong thư mục hiện tại.

### 2) Điền API key qua biến môi trường

Ví dụ:

```bash
setx OPENAI_KEY "..."
setx GROQ_KEY "..."
setx OPENROUTER_KEY "..."
```

### 3) Tạo file yêu cầu

`brief.md` ví dụ:

```md
Xây dựng landing page bán khóa học AI, gồm copy, cấu trúc trang, checklist tracking.
```

### 4) Chạy orchestrator

```bash
python ai_hub.py run --brief-file brief.md --config providers.json
```

Hoặc test không gọi API:

```bash
python ai_hub.py run --brief-file brief.md --config providers.json --dry-run
```

## Output

Mỗi lần chạy tạo thư mục:

`runs/YYYYmmdd-HHMMSS/`

Bao gồm:

- `00_brief.md`
- `10_clarified.json`
- `20_plan.json`
- `30_assignments.json`
- `40_worker_outputs.json`
- `50_review.json`
- `final_report.md`

## Lưu ý đồng bộ

- Task phải có `id` duy nhất
- Task sau chỉ chạy khi `depends_on` đã hoàn thành
- Worker output bắt buộc có `artifacts` + `risks` + `next_actions`
- Reviewer hợp nhất và phát hiện conflict

## Luồng chuẩn đề xuất

- **planner**: làm rõ + lập kế hoạch
- **builder_X**: thực thi task theo phân công
- **reviewer**: soát chất lượng + hợp nhất

Khi bạn gửi list API key, mình chỉ cần map vào `providers.json` là chạy được ngay.