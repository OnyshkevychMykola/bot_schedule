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

const startSurvey = async (chatId) => {
  userSelections[chatId] = {};
  const msg = await bot.sendMessage(chatId, 'Виберіть тип походу:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Похід у гори', callback_data: 'hike' }],
        [{ text: 'Поїздка на лижі', callback_data: 'ski' }],
        [{ text: 'Поїздка по містах', callback_data: 'city' }],
        [{ text: 'Поїздка до коліних батьків', callback_data: 'family' }],
      ],
    },
  });
  userSelections[chatId].lastMessageId = msg.message_id;
};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  if (!isUserAllowed(chatId)) {
    return bot.sendMessage(chatId, "🚫 Вам заборонено користуватись цим ботом.");
  }

  await startSurvey(chatId);
});

const getPackingList = (type, duration, season) => {
  const filteredDuration = type === 'family' ? '' : duration;
  const filteredSeason = type === 'ski' ? '' : season;
  const key = `${type}${filteredDuration}${filteredSeason}`;
  return tripPackingList[key];
};

function getOptionName(optionKey) {
  return optionNames[optionKey] || optionKey;
}

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const lastMessageId = userSelections[chatId]?.lastMessageId;

  if (!userSelections[chatId]) return;

  if (!userSelections[chatId].type) {
    userSelections[chatId].type = data;
    await bot.editMessageText(`✅ Ви вибрали: ${query.message.text.split('\n')[0]}\n*${query.message.reply_markup.inline_keyboard.find(row => row[0].callback_data === data)[0].text}*`, {
      chat_id: chatId,
      message_id: lastMessageId,
      parse_mode: 'Markdown',
    });

    if (data === 'family') {
      const msg = await bot.sendMessage(chatId, 'Виберіть пору року:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Літо', callback_data: 'Summer' }],
            [{ text: 'Зима', callback_data: 'Winter' }],
          ],
        },
      });
      userSelections[chatId].lastMessageId = msg.message_id;
    } else {
      const msg = await bot.sendMessage(chatId, 'Виберіть тривалість походу:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '1 день', callback_data: 'OneDay' }],
            [{ text: '2 дні', callback_data: 'TwoDays' }],
          ],
        },
      });
      userSelections[chatId].lastMessageId = msg.message_id;
    }
    return;
  }

  if (!userSelections[chatId].duration && userSelections[chatId].type !== 'family') {
    if (['OneDay', 'TwoDays'].includes(data)) {
      userSelections[chatId].duration = data;
      await bot.editMessageText(`✅ Ви вибрали: ${query.message.text.split('\n')[0]}\n*${query.message.reply_markup.inline_keyboard.find(row => row[0].callback_data === data)[0].text}*`, {
        chat_id: chatId,
        message_id: lastMessageId,
        parse_mode: 'Markdown',
      });

      if (userSelections[chatId].type === 'ski') {
        const msg = await bot.sendMessage(chatId, 'Виберіть додаткові опції:', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Баня', callback_data: 'option_bath' }],
              [{ text: 'Дощ', callback_data: 'option_rain' }],
              [{ text: 'Палатка', callback_data: 'option_tent' }],
              [{ text: 'GoPro', callback_data: 'option_gopro' }],
              [{ text: 'Далі', callback_data: 'next' }],
            ],
          },
        });
        userSelections[chatId].lastMessageId = msg.message_id;
      } else {
        const msg = await bot.sendMessage(chatId, 'Виберіть пору року:', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Літо', callback_data: 'Summer' }],
              [{ text: 'Зима', callback_data: 'Winter' }],
            ],
          },
        });
        userSelections[chatId].lastMessageId = msg.message_id;
      }
    }
    return;
  }

  if (!userSelections[chatId].season && (userSelections[chatId].type !== 'ski')) {
    if (['Summer', 'Winter'].includes(data)) {
      userSelections[chatId].season = data;
      await bot.editMessageText(`✅ Ви вибрали: ${query.message.text.split('\n')[0]}\n*${query.message.reply_markup.inline_keyboard.find(row => row[0].callback_data === data)[0].text}*`, {
        chat_id: chatId,
        message_id: lastMessageId,
        parse_mode: 'Markdown',
      });

      const msg = await bot.sendMessage(chatId, 'Виберіть додаткові опції:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Баня', callback_data: 'option_bath' }],
            [{ text: 'Дощ', callback_data: 'option_rain' }],
            [{ text: 'Палатка', callback_data: 'option_tent' }],
            [{ text: 'GoPro', callback_data: 'option_gopro' }],
            [{ text: 'Далі', callback_data: 'next' }],
          ],
        },
      });
      userSelections[chatId].lastMessageId = msg.message_id;
    }
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
    return;
  }

  if (data === 'next') {
    const { type, duration, season, options = [] } = userSelections[chatId];
    const packingList = getPackingList(type, duration, season);
    let message = `*${packingList.name}*\n`;

    ['kolya', 'diana', 'shared'].forEach(group => {
      if (packingList[group]) {
        message += `*${group === 'kolya' ? 'Коля:' : group === 'diana' ? 'Діана:' : 'Разом:'}*\n`;
        Object.values(packingList[group]).forEach(item => {
          message += `- ${item}\n`;
        });
      }
    });

    if (options.length > 0) {
      message += '\n*Додаткові опції:*\n';
      options.forEach(optionKey => {
        if (additionalConditions[optionKey]) {
          message += `*${getOptionName(optionKey)}:*\n`;
          Object.values(additionalConditions[optionKey]).forEach(item => {
            message += `- ${item}\n`;
          });
        }
      });
    }

    await bot.editMessageText(`✅ Вибір завершено`, {
      chat_id: chatId,
      message_id: lastMessageId,
    });

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    delete userSelections[chatId];
  }
});
