require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const { tripPackingList, additionalConditions, optionNames } = require('./data');

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

const userSelections = {};

const startSurvey = async (chatId) => {
  userSelections[chatId] = {};
  await bot.sendMessage(chatId, 'Виберіть тип походу:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Похід у гори', callback_data: 'hike' }],
        [{ text: 'Поїздка на лижі', callback_data: 'ski' }],
        [{ text: 'Поїздка по містах', callback_data: 'city' }],
        [{ text: 'Поїздка до коліних батьків', callback_data: 'family' }],
      ],
    },
  });
};

bot.onText(/\/start/, async (msg) => {
  await startSurvey(msg.chat.id);
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

  if (!userSelections[chatId]) return;

  if (!userSelections[chatId].type) {
    userSelections[chatId].type = data;
    return bot.sendMessage(chatId, 'Виберіть тривалість походу:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '1 день', callback_data: 'OneDay' }],
          [{ text: '2 дні', callback_data: 'TwoDays' }],
        ],
      },
    });
  }



  if (!userSelections[chatId].duration) {
    userSelections[chatId].duration = data;
    return bot.sendMessage(chatId, 'Виберіть пору року:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Літо', callback_data: 'Summer' }],
          [{ text: 'Зима', callback_data: 'Winter' }],
        ],
      },
    });
  }

  if (!userSelections[chatId].season) {
    userSelections[chatId].season = data;
    return bot.sendMessage(chatId, 'Виберіть додаткові опції:', {
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

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    delete userSelections[chatId];
  }
});
