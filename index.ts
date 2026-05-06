import { Bot } from "grammy";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("Помилка: BOT_TOKEN не знайдено в .env файлі!");
  process.exit(1);
}

const bot = new Bot(token);

// Список компліментів
const compliments = [
  "Ти сьогодні чудово виглядаєш! ✨",
  "Твоя енергія надихає! 🌟",
  "Ти дуже розумна людина! 🧠",
  "З тобою приємно спілкуватися! 😊",
  "У тебе чудове почуття гумору! 😂",
  "Ти робиш цей світ кращим! 🌍"
];

// Команда /start
bot.command("start", (ctx) => 
  ctx.reply("Привіт! Я твій новий Telegram-бот. Я можу відповідати на твої повідомлення та робити компліменти. Використовуй /help, щоб побачити всі команди.")
);

// Команда /help
bot.command("help", (ctx) => 
  ctx.reply("Ось список моїх команд:\n/start - Почати роботу\n/help - Список команд\n/about - Про мене\nТакож ти можеш просто написати мені щось!")
);

// Своя команда /about
bot.command("about", (ctx) => 
  ctx.reply("Я — бот, створений за допомогою бібліотеки grammY та середовища виконання Node.js (замість Bun). Моя мета — піднімати настрій та допомагати!")
);

// Обробка текстових повідомлень
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.toLowerCase();

  // Реагування на "hello" або "привіт"
  if (text === "hello" || text === "привіт") {
    await ctx.reply("Привіт-привіт! Як справи?");
    return;
  }

  // Підказка про /help
  if (text === "help") {
    await ctx.reply("Здається, ти хотів скористатися допомогою? Спробуй команду /help.");
    return;
  }

  // Випадковий комплімент (якщо користувач просить або просто так)
  if (text.includes("комплімент") || text.includes("compliment")) {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const randomCompliment = compliments[randomIndex];
    if (randomCompliment) {
      await ctx.reply(randomCompliment);
    }
    return;
  }

  // Базова відповідь
  await ctx.reply(`Я отримав твоє повідомлення: ${ctx.message.text}`);
  
  // Додаємо комплімент час від часу
  if (Math.random() > 0.7) {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const randomCompliment = compliments[randomIndex];
    if (randomCompliment) {
      await ctx.reply(`До речі... ${randomCompliment}`);
    }
  }
});

bot.start();
console.log("Бот запущений...");
