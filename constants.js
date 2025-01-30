const TYPES = {
  HIKE: 'hike',
  CITY: 'city',
  SKI: 'ski',
  FAMILY: 'family',
}

const DURABILITY = {
  ONE_DAY: 'OneDay',
  TWO_DAYS: 'TwoDays',
}

const SEASON = {
  WINTER: 'winter',
  SUMMER: 'summer',
}

const OPTIONS = {
  BATH: 'bath',
  RAIN: 'rain',
  GO_PRO: 'gopro',
  TENT: 'tent',
};

const BUTTON_NAMES = {
  NEXT: 'next',
  RESET: 'reset',
};

const { HIKE, CITY, SKI, FAMILY } = TYPES;
const { SUMMER, WINTER } = SEASON;
const { ONE_DAY, TWO_DAYS } = DURABILITY;
const { BATH, RAIN, GO_PRO, TENT } = OPTIONS;
const { NEXT, RESET } = BUTTON_NAMES;


const TYPES_KEYBOARD = [
  [{ text: 'Похід у гори', callback_data: HIKE }],
  [{ text: 'Поїздка на лижі', callback_data: SKI }],
  [{ text: 'Поїздка по містах', callback_data: CITY }],
  [{ text: 'Поїздка до родичів', callback_data: FAMILY }],
];

const DURABILITY_KEYBOARD = [
  [{ text: '1 день', callback_data: ONE_DAY }],
  [{ text: '2 дні', callback_data: TWO_DAYS }],
];

const SEASON_KEYBOARD = [
  [{ text: 'Літо', callback_data: SUMMER }],
  [{ text: 'Зима', callback_data: WINTER }],
];

const OPTIONS_KEYBOARD = [
  [{ text: 'Баня', callback_data: `option_${BATH}` }],
  [{ text: 'Дощ', callback_data: `option_${RAIN}` }],
  [{ text: 'Палатка', callback_data: `option_${TENT}` }],
  [{ text: 'GoPro', callback_data: `option_${GO_PRO}` }],
  [{ text: 'Завершити вибір', callback_data: NEXT }],
];

const OPTION_NAMES = {
  tent: 'Палатка',
  bath: 'Баня',
  rain: 'Дощ',
  gopro: 'Gopro',
  hike: 'Похід у гори',
  ski: 'Поїздка на лижі',
  city: 'Поїздка по містах',
  family: 'Поїздка до родичів',
  OneDay: '1 день',
  TwoDays: '2 дні',
  Summer: 'Літо',
  Winter: 'Зима',
};

const RESET_OPTION = [{ text: '🔄 Скинути', callback_data: RESET }];

module.exports = {
  SEASON,
  DURABILITY,
  TYPES,
  TYPES_KEYBOARD,
  DURABILITY_KEYBOARD,
  SEASON_KEYBOARD,
  OPTION_NAMES,
  OPTIONS,
  OPTIONS_KEYBOARD,
  RESET_OPTION,
  BUTTON_NAMES
}
