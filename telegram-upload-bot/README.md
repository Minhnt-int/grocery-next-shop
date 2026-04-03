# Telegram Upload Bot

Bot Telegram đơn giản với lệnh `/batdau` hiển thị menu có 1 lựa chọn duy nhất: **Upload sản phẩm**.

## Chạy nhanh

```bash
cd telegram-upload-bot
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
# sửa TELEGRAM_BOT_TOKEN trong .env
python bot.py
```

## Tính năng hiện tại
- `/start` và `/batdau` => menu
- Nút: `Upload sản phẩm`
- Khi bấm nút sẽ hướng dẫn bước tiếp theo
