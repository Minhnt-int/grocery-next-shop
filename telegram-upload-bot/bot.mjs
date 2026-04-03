import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';

const token = (process.env.TELEGRAM_BOT_TOKEN || '').trim();
if (!token) {
  throw new Error('Missing TELEGRAM_BOT_TOKEN in .env');
}

const bot = new TelegramBot(token, { polling: true });

const menuKeyboard = {
  reply_markup: {
    inline_keyboard: [[{ text: '📦 Upload sản phẩm', callback_data: 'upload_product' }]],
  },
};

function sendMenu(chatId) {
  return bot.sendMessage(chatId, '🚀 Menu\nVui lòng chọn một chức năng:', menuKeyboard);
}

bot.onText(/^\/start(?:@\w+)?$/, (msg) => {
  sendMenu(msg.chat.id);
});

bot.onText(/^\/batdau(?:@\w+)?$/, (msg) => {
  sendMenu(msg.chat.id);
});

bot.on('callback_query', async (query) => {
  const chatId = query.message?.chat?.id;
  if (!chatId) return;

  await bot.answerCallbackQuery(query.id);

  if (query.data === 'upload_product') {
    await bot.sendMessage(
      chatId,
      '✅ Bạn chọn: Upload sản phẩm\nGửi thông tin theo mẫu:\n- Tên sản phẩm\n- Giá\n- Mô tả ngắn\n- Ảnh (nếu có)'
    );
  }
});

bot.on('polling_error', (err) => {
  console.error('Polling error:', err?.message || err);
});

console.log('Telegram bot is running...');
