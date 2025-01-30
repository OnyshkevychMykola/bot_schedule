require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const { tripPackingList, additionalConditions, optionNames } = require('./data');

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

const userSelections = {};
const allowedUsers = process.env.ALLOWED_USERS.split(',').map(id => Number(id.trim()));

bot.setMyCommands([
  { command: '/start', description: 'Почати опитування' },
]);

const isUserAllowed = (chatId) => allowedUsers.includes(chatId);

const updateSurveyMessage = async (chatId) => {
  const { type, duration, season, options = [], lastMessageId } = userSelections[chatId];
  let message = "*Ваш вибір:*";
  if (type) message += `\n*Тип подорожі:* ${getOptionName(type)}`;
  if (duration) message += `\n*Тривалість:* ${getOptionName(duration)}`;
  if (season) message += `\n*Пора року:* ${getOptionName(season)}`;
  if (options.length > 0) {
    message += "\n*Додаткові опції:*\n" + options.map(opt => `- ${getOptionName(opt)}`).join('\n');
  }

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

  if (!type) {
    return { inline_keyboard: [
        [{ text: 'Похід у гори', callback_data: 'hike' }],
        [{ text: 'Поїздка на лижі', callback_data: 'ski' }],
        [{ text: 'Поїздка по містах', callback_data: 'city' }],
        [{ text: 'Поїздка до родичів', callback_data: 'family' }],
      ]};
  }
  if (!duration && type !== 'family') {
    return { inline_keyboard: [
        [{ text: '1 день', callback_data: 'OneDay' }],
        [{ text: '2 дні', callback_data: 'TwoDays' }],
      ]};
  }
  if (!season && type !== 'ski') {
    return { inline_keyboard: [
        [{ text: 'Літо', callback_data: 'Summer' }],
        [{ text: 'Зима', callback_data: 'Winter' }],
      ]};
  }
  return { inline_keyboard: [
      [{ text: 'Баня', callback_data: 'option_bath' }],
      [{ text: 'Дощ', callback_data: 'option_rain' }],
      [{ text: 'Палатка', callback_data: 'option_tent' }],
      [{ text: 'GoPro', callback_data: 'option_gopro' }],
      [{ text: 'Завершити вибір', callback_data: 'next' }],
    ]};
};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  if (!isUserAllowed(chatId)) {
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

  if (data.startsWith('option_')) {
    const option = data.replace('option_', '');
    userSelections[chatId].options = userSelections[chatId].options || [];

    if (userSelections[chatId].options.includes(option)) {
      userSelections[chatId].options = userSelections[chatId].options.filter(o => o !== option);
    } else {
      userSelections[chatId].options.push(option);
    }
  } else if (data === 'next') {
    const { type, duration, season, options = [] } = userSelections[chatId];
    const packingList = tripPackingList[`${type}${duration || ''}${season || ''}`] || {};
    let message = `*${packingList.name || 'Ваш список'}*\n\n`;

    ['kolya', 'diana', 'shared'].forEach(group => {
      if (packingList[group]) {
        message += `*${group === 'kolya' ? 'Коля:' : group === 'diana' ? 'Діана:' : 'Разом:'}*\n`;
        message += Object.values(packingList[group]).map(item => `- ${item}`).join('\n') + '\n';
      }
    });

    if (options.length > 0) {
      message += '\n*Додаткові опції:*\n' + options.map(optionKey => {
        return additionalConditions[optionKey] ? `*${getOptionName(optionKey)}:*\n` + Object.values(additionalConditions[optionKey]).map(item => `- ${item}`).join('\n') : '';
      }).join('\n');
    }

    await bot.editMessageText(message, {
      chat_id: chatId,
      message_id: userSelections[chatId].lastMessageId,
      parse_mode: 'Markdown'
    });
    delete userSelections[chatId];
    return;
  } else {
    if (!userSelections[chatId].type) {
      userSelections[chatId].type = data;
    } else if (!userSelections[chatId].duration && userSelections[chatId].type !== 'family') {
      userSelections[chatId].duration = data;
    } else if (!userSelections[chatId].season && userSelections[chatId].type !== 'ski') {
      userSelections[chatId].season = data;
    }
  }

  await updateSurveyMessage(chatId);
});

function getOptionName(optionKey) {
  return optionNames[optionKey] || optionKey;
}
