require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const { isUserAllowed, updateMessage, returnAnswer, dealWithData} = require('./utils');
const { BUTTON_NAMES } = require('./constants');
const { NEXT, RESET } = BUTTON_NAMES;
const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

const userSelections = {};
const allowedUsers = process.env.ALLOWED_USERS.split(',').map(id => Number(id.trim()));

bot.setMyCommands([
  { command: '/start', description: 'Почати опитування' },
]);

const updateSurveyMessage = async (chatId) => {
  const { type, duration, season, options = [], lastMessageId } = userSelections[chatId];
  let message = updateMessage(type, duration, season, options);
  try {
    await bot.editMessageText(message, {
      chat_id: chatId,
      message_id: lastMessageId,
      parse_mode: 'Markdown',
      reply_markup: getReplyMarkup(chatId)
    });
  } catch (error) {
    console.log("Помилка редагування повідомлення:", error);
  }
};

const getReplyMarkup = (chatId) => {
  const { type, duration, season } = userSelections[chatId];
  let keyboard = [];

  if (!type) {
    keyboard = [
      [{ text: 'Похід у гори', callback_data: 'hike' }],
      [{ text: 'Поїздка на лижі', callback_data: 'ski' }],
      [{ text: 'Поїздка по містах', callback_data: 'city' }],
      [{ text: 'Поїздка до родичів', callback_data: 'family' }],
    ];
  } else if (!duration && type !== 'family') {
    keyboard = [
      [{ text: '1 день', callback_data: 'OneDay' }],
      [{ text: '2 дні', callback_data: 'TwoDays' }],
    ];
  } else if (!season && type !== 'ski') {
    keyboard = [
      [{ text: 'Літо', callback_data: 'Summer' }],
      [{ text: 'Зима', callback_data: 'Winter' }],
    ];
  } else {
    keyboard = [
      [{ text: 'Баня', callback_data: 'option_bath' }],
      [{ text: 'Дощ', callback_data: 'option_rain' }],
      [{ text: 'Палатка', callback_data: 'option_tent' }],
      [{ text: 'GoPro', callback_data: 'option_gopro' }],
      [{ text: 'Завершити вибір', callback_data: 'next' }],
    ];
  }

  if (type || duration || season) {
    keyboard.push([{ text: '🔄 Скинути', callback_data: 'reset' }]);
  }

  return { inline_keyboard: keyboard };
};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  if (!isUserAllowed(chatId, allowedUsers)) {
    return bot.sendMessage(chatId, "🚫 Вам заборонено користуватись цим ботом.");
  }

  userSelections[chatId] = {};
  const msgResponse = await bot.sendMessage(chatId, "Виберіть тип подорожі:", {
    reply_markup: getReplyMarkup(chatId),
    parse_mode: 'Markdown'
  });
  userSelections[chatId].lastMessageId = msgResponse.message_id;
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (!userSelections[chatId]) return;

  if (data === RESET) {
    try {
      await bot.deleteMessage(chatId, userSelections[chatId].lastMessageId);
    } catch (error) {
      console.log("Помилка видалення повідомлення:", error);
    }
    userSelections[chatId] = {};
    const msgResponse = await bot.sendMessage(chatId, "Виберіть тип подорожі:", {
      reply_markup: getReplyMarkup(chatId),
      parse_mode: 'Markdown'
    });
    userSelections[chatId].lastMessageId = msgResponse.message_id;
    return;
  }

  if (data.startsWith('option_')) {
    const option = data.replace('option_', '');
    userSelections[chatId].options = userSelections[chatId].options || [];

    if (userSelections[chatId].options.includes(option)) {
      userSelections[chatId].options = userSelections[chatId].options.filter(o => o !== option);
    } else {
      userSelections[chatId].options.push(option);
    }
  } else if (data === NEXT) {
    const { type, duration, season, options = [] } = userSelections[chatId];
    let message = returnAnswer(type, duration, season, options);

    await bot.editMessageText(message, {
      chat_id: chatId,
      message_id: userSelections[chatId].lastMessageId,
      parse_mode: 'Markdown'
    });
    delete userSelections[chatId];
    return;
  } else {
    dealWithData(userSelections, chatId, data);
  }

  await updateSurveyMessage(chatId);
});


