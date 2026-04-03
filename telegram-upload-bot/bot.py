import logging
import os
from dotenv import load_dotenv
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
)

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger("telegram-upload-bot")

CALLBACK_UPLOAD_PRODUCT = "menu_upload_product"


def build_main_menu() -> InlineKeyboardMarkup:
    keyboard = [
        [InlineKeyboardButton("📦 Upload sản phẩm", callback_data=CALLBACK_UPLOAD_PRODUCT)]
    ]
    return InlineKeyboardMarkup(keyboard)


async def send_menu(update: Update, text: str = "🚀 Menu\nVui lòng chọn một chức năng:") -> None:
    if update.message:
        await update.message.reply_text(text=text, reply_markup=build_main_menu())
    elif update.callback_query and update.callback_query.message:
        await update.callback_query.message.reply_text(text=text, reply_markup=build_main_menu())


async def start_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await send_menu(update)


async def batdau_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await send_menu(update)


async def menu_click(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    if not query:
        return

    await query.answer()

    if query.data == CALLBACK_UPLOAD_PRODUCT:
        await query.message.reply_text(
            "✅ Bạn chọn: Upload sản phẩm\n"
            "Gửi thông tin sản phẩm theo mẫu:\n"
            "- Tên sản phẩm\n"
            "- Giá\n"
            "- Mô tả ngắn\n"
            "- Ảnh (nếu có)"
        )
        return


async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.exception("Unhandled error", exc_info=context.error)


def main() -> None:
    if not TOKEN:
        raise RuntimeError("Missing TELEGRAM_BOT_TOKEN. Put it in .env file.")

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start_cmd))
    app.add_handler(CommandHandler("batdau", batdau_cmd))
    app.add_handler(CallbackQueryHandler(menu_click))
    app.add_error_handler(error_handler)

    logger.info("Bot is running...")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
