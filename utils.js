const { OPTION_NAMES, TYPES } = require('./constants');
const { tripPackingList, additionalConditions } = require('./data');
const { SKI, FAMILY } = TYPES;

const isUserAllowed = (chatId, allowedUsers) => allowedUsers.includes(chatId);

function getOptionName(optionKey) {
  return OPTION_NAMES[optionKey] || optionKey;
}

function updateMessage(type, duration, season, options) {
  let message = "*Ваш вибір:*";
  if (type) message += `\n*Тип подорожі:* ${getOptionName(type)}`;
  if (duration) message += `\n*Тривалість:* ${getOptionName(duration)}`;
  if (season) message += `\n*Пора року:* ${getOptionName(season)}`;
  if (options.length > 0) {
    message += "\n*Додаткові опції:*\n" + options.map(opt => `- ${getOptionName(opt)}`).join('\n');
  }
  return message;
}

function returnAnswer(type, duration, season, options) {
  const packingList = tripPackingList[`${type}${duration || ''}${season || ''}`] || {};
  let message = `*${packingList.name || 'Ваш список'}*\n\n`;

  ['kolya', 'diana', 'shared'].forEach(group => {
    if (packingList[group]) {
      message += `*${group === 'kolya' ? 'Коля:' : group === 'diana' ? 'Діана:' : 'Разом:'}*\n`;
      message += packingList[group].map(item => `- ${item}`).join('\n') + '\n';
    }
  });

  if (options.length > 0) {
    message += '\n*Додаткові опції:*\n' + options.map(optionKey => {
      return additionalConditions[optionKey] ? `*${getOptionName(optionKey)}:*\n` + additionalConditions[optionKey].map(item => `- ${item}`).join('\n') : '';
    }).join('\n');
  }
  return message;
}

function dealWithData(userSelections, chatId, data) {
  if (!userSelections[chatId].type) {
    userSelections[chatId].type = data;
  } else if (!userSelections[chatId].duration && userSelections[chatId].type !== FAMILY) {
    userSelections[chatId].duration = data;
  } else if (!userSelections[chatId].season && userSelections[chatId].type !== SKI) {
    userSelections[chatId].season = data;
  }
}

module.exports = {
  isUserAllowed,
  updateMessage,
  returnAnswer,
  dealWithData,
}
