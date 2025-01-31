const SPARE_T_SHIRT = "Змінна футболка";
const MEMBRANE_JACKET = "Мембранна куртка";
const KNEE_PADS = "Наколінники";
const KNIFE = "Ніж";
const HAIRBRUSH = "Гребінець";
const NAIL_FILE = "Пилочка";
const PADS = "Прокладки";
const POWERBANK = "Павербанк";
const HEADPHONES = "Навушники";
const CHARGERS = "Зарядка х2";
const SPARE_SOCKS = "Змінна пара шкарпеток";
const SKI_PANTS = "Лижні штани";
const THERMAL_UNDERWEAR = "Термобілизна";
const SWEATER = "Кофта";
const PANTS = "Штани";
const BELT = "Ремінь";
const SOCKS = "Шкарпетки";
const UNDERWEAR = "Труси";
const SKI_JACKET = "Лижна Куртка";
const GLOVES = "Рукавиці";
const BALACLAVA = "Балаклава";
const HAT = "Шапка";
const HAND_GUARDS = "Захисти для рук х2";
const BUTT_PADS = "Похідне сидіння х2";
const DEODORANTS = "Дезодоранти х2";
const MEDICINE_BAG = "Пакет ліків";
const PASSPORT = "Айді картка х2";
const WATER = "Вода 0.5л";
const COOKIES = "Пачка печива";
const BAGS = "Пакети";
const HOME_SHORTS = "Хатні шорти";
const E_BOOK = "Електронна книга";
const MAKEUP = "Мейк";
const CREAM = "Крем";
const SMALL_TOWEL = "Рушничок";
const TOWEL = "Рушник";
const SPARE_UNDERWEAR = "Змінна пара трусів";
const HOME_T_SHIRT = "Хатня футболка";
const HOME_PANTS = "Хатні штани";
const HOME_SWEATER = "Хатня кофта";
const TOOTHBRUSHES = "Зубні щітки х2";
const TOOTHPASTE = "Зубна паста";
const CONDOMS = "Презервативи";
const SUNGLASSES = "Сонцезахисні окуляри";
const CAP = "Кепка";
const SUNSCREEN = "Сонцезахисний крем";
const T_SHIRT = "Футболка";
const PANTS_OR_SHORTS = "Штани/Шорти";
const SWIMWEAR = "Плавки";
const BOOTS = "Чоботи";
const GALOSHES = "Галоші";
const WAFFLES = "Вафлі 1п";
const FLEECE = "Фліска";
const SNEAKERS = "Кросівки";
const CAP_OR_PANAMA = "Кепка/панама";

const LARGE_BACKPACK = "Великий похідний рюкзак";
const TENT = "Палатка";
const KARIMAT = "Каримат";
const INFLATABLE_KARIMAT = "Надувний каримат";
const SLEEPING_BAG = "Спальник";
const TENT_RAIN_COVER = "Дощовик для палатки";
const GAS_BURNER = "Газовий пальник";
const BASIC_CYLINDER = "Базовий балон";
const CAMPING_COOKWARE = "Набір похідного посуду";
const FREEZE_DRIED_MEALS = "Сублімати";
const LIGHTER = "Запальничка";
const WET_WIPES = "Вологі серветки";
const FLASHLIGHT = "Ліхтарик";

const SWIMSUIT = "Плавки";
const FLIP_FLOPS = "Шльопанці/крокси";

const UMBRELLA = "Парасоля";
const RAINCOAT = "Дощовик";

const GOPRO = "Го про";
const GOPRO_PROTECTION = "Захист го про";
const GOPRO_CHARGER = "Зарядка го про";
const GOPRO_MOUNT = "Кріплення го про";

const tripPackingList = {
  skiOneDay: {
    name: "Лижі 1 день",
    kolya: [`${SPARE_T_SHIRT} х1`, MEMBRANE_JACKET, KNEE_PADS, KNIFE],
    diana: [HAIRBRUSH, NAIL_FILE, PADS],
    shared: [
      POWERBANK, HEADPHONES, CHARGERS, `${SPARE_SOCKS} х1`, SKI_PANTS,
      THERMAL_UNDERWEAR, SWEATER, PANTS, BELT, SOCKS, UNDERWEAR,
      SKI_JACKET, GLOVES, BALACLAVA, HAT, HAND_GUARDS, BUTT_PADS,
      DEODORANTS, MEDICINE_BAG, PASSPORT, WATER, COOKIES
    ]
  },
  skiTwoDays: {
    name: "Лижі 2 дні",
    kolya: [`${SPARE_T_SHIRT} х2`, MEMBRANE_JACKET, KNEE_PADS, BAGS, HOME_SHORTS, KNIFE],
    diana: [HAIRBRUSH, NAIL_FILE, PADS, E_BOOK, MAKEUP, CREAM, SMALL_TOWEL],
    shared: [
      POWERBANK, HEADPHONES, CHARGERS, TOWEL, `${SPARE_SOCKS} х2`, `${SPARE_UNDERWEAR} х2`,
      HOME_T_SHIRT, HOME_PANTS, HOME_SWEATER, SKI_PANTS, THERMAL_UNDERWEAR,
      SWEATER, PANTS, BELT, SOCKS, UNDERWEAR, SKI_JACKET, GLOVES, BALACLAVA,
      HAT, HAND_GUARDS, BUTT_PADS, DEODORANTS, MEDICINE_BAG, TOOTHBRUSHES,
      TOOTHPASTE, CONDOMS, PASSPORT, WATER, COOKIES
    ]
  },
  cityOneDayWinter: {
    name: "Місто 1 день Зима",
    kolya: [BAGS, KNIFE],
    diana: [NAIL_FILE, PADS],
    shared: [
      POWERBANK, HEADPHONES, CHARGERS, THERMAL_UNDERWEAR, SWEATER, PANTS,
      BELT, SOCKS, UNDERWEAR, HAT, DEODORANTS, MEDICINE_BAG, WATER, COOKIES
    ]
  },
  cityOneDaySummer: {
    name: "Місто 1 день Літо",
    kolya: [BAGS, SUNGLASSES, KNIFE],
    diana: [NAIL_FILE, PADS, CAP, SUNSCREEN],
    shared: [
      POWERBANK, HEADPHONES, CHARGERS, T_SHIRT, SWEATER, PANTS_OR_SHORTS,
      SOCKS, UNDERWEAR, DEODORANTS, MEDICINE_BAG, WATER, COOKIES
    ]
  },
  cityTwoDaysWinter: {
    name: "Місто 2 дні Зима",
    kolya: [`${SPARE_T_SHIRT} х2`, BAGS, HOME_SHORTS, KNIFE],
    diana: [HAIRBRUSH, NAIL_FILE, PADS, E_BOOK, MAKEUP, CREAM, SMALL_TOWEL],
    shared: [
      POWERBANK, HEADPHONES, CHARGERS, `${SPARE_SOCKS} х2`, `${SPARE_UNDERWEAR} х2`,
      HOME_T_SHIRT, HOME_PANTS, HOME_SWEATER, THERMAL_UNDERWEAR, SWEATER,
      PANTS, BELT, SOCKS, UNDERWEAR, HAT, DEODORANTS, MEDICINE_BAG,
      TOOTHBRUSHES, TOOTHPASTE, CONDOMS, WATER, COOKIES
    ]
  },
  cityTwoDaysSummer: {
    name: "Місто 2 дні Літо",
    kolya: [`${SPARE_T_SHIRT} х2`, BAGS, SWIMWEAR, KNIFE],
    diana: [
      HAIRBRUSH, NAIL_FILE, PADS, E_BOOK, MAKEUP, CREAM, SMALL_TOWEL, CAP, SUNSCREEN
    ],
    shared: [
      POWERBANK, HEADPHONES, CHARGERS, TOWEL, `${SPARE_SOCKS} х2`, `${SPARE_UNDERWEAR} х2`,
      HOME_T_SHIRT, HOME_PANTS, HOME_SWEATER, SWEATER, PANTS_OR_SHORTS, BELT,
      SOCKS, UNDERWEAR, HAT, DEODORANTS, MEDICINE_BAG, TOOTHBRUSHES, TOOTHPASTE,
      CONDOMS, WATER, COOKIES
    ]
  },
  familyWinter: {
    name: "Поїздка до батьків Колі 2 дні Зима",
    kolya: [],
    diana: [
      HAIRBRUSH, NAIL_FILE, PADS, E_BOOK, MAKEUP,
      CREAM, SMALL_TOWEL, POWERBANK, `${SPARE_SOCKS} х2`,
      `${SPARE_UNDERWEAR} х2`, HOME_T_SHIRT, HOME_PANTS, HOME_SWEATER
    ],
    shared: [HEADPHONES, CHARGERS, THERMAL_UNDERWEAR, SWEATER,
      PANTS, BELT, SOCKS, UNDERWEAR, HAT, DEODORANTS, CONDOMS]
  },
  familySummer: {
    name: "Поїздка до батьків Колі 2 дні Літо",
    kolya: [],
    diana: [
      HAIRBRUSH, NAIL_FILE, PADS, E_BOOK, MAKEUP,
      CREAM, SMALL_TOWEL, POWERBANK, `${SPARE_SOCKS} х2`,
      `${SPARE_UNDERWEAR} х2`, HOME_T_SHIRT, HOME_PANTS, HOME_SWEATER, CAP, SUNSCREEN
    ],
    shared: [HEADPHONES, CHARGERS, THERMAL_UNDERWEAR, SWEATER,
      PANTS, BELT, SOCKS, UNDERWEAR, HAT, DEODORANTS, CONDOMS]
  },
  hikeOneDayWinter: {
    name: "Похід в гори 1 день Зима",
    kolya: [],
    diana: [],
    shared: [
      POWERBANK, HEADPHONES, KNIFE, THERMAL_UNDERWEAR, DEODORANTS,
      UNDERWEAR, SOCKS, T_SHIRT, FLEECE, SKI_PANTS, BELT, SKI_JACKET,
      MEMBRANE_JACKET, GLOVES, BALACLAVA, HAT, BOOTS, GALOSHES,
      WATER, WAFFLES, COOKIES, MEDICINE_BAG, BAGS
    ]
  },
  hikeOneDaySummer: {
    name: "Похід в гори 1 день Літо",
    kolya: [],
    diana: [],
    shared: [
      POWERBANK, HEADPHONES, KNIFE, DEODORANTS, CAP_OR_PANAMA,
      UNDERWEAR, SOCKS, T_SHIRT, PANTS, BELT, SWEATER, SNEAKERS,
      WATER, WAFFLES, COOKIES, MEDICINE_BAG, BAGS
    ]
  },
  hikeTwoDaysWinter: {
    name: "Похід в гори 2 дні Зима",
    kolya: [],
    diana: [],
    shared: [
      POWERBANK, HEADPHONES, KNIFE, THERMAL_UNDERWEAR, DEODORANTS,
      UNDERWEAR, SOCKS, T_SHIRT, FLEECE, SKI_PANTS, BELT, SKI_JACKET,
      MEMBRANE_JACKET, GLOVES, BALACLAVA, HAT, BOOTS, GALOSHES,
      WATER, WAFFLES, COOKIES, MEDICINE_BAG, BAGS, SNEAKERS
    ]
  },
  hikeTwoDaysSummer: {
    name: "Похід в гори 2 дні Літо",
    kolya: [],
    diana: [],
    shared: [
      POWERBANK, HEADPHONES, KNIFE, DEODORANTS, CAP_OR_PANAMA,
      UNDERWEAR, SOCKS, T_SHIRT, PANTS, BELT, SWEATER, SNEAKERS,
      WATER, WAFFLES, COOKIES, MEDICINE_BAG, BAGS
    ]
  }
};

const additionalConditions = {
  tent: [ LARGE_BACKPACK, TENT, KARIMAT, INFLATABLE_KARIMAT, SLEEPING_BAG,
    TENT_RAIN_COVER, GAS_BURNER, BASIC_CYLINDER,
    CAMPING_COOKWARE, FREEZE_DRIED_MEALS, LIGHTER, WET_WIPES, FLASHLIGHT
  ],
  bath: [SWIMSUIT, TOWEL, FLIP_FLOPS],
  rain: [UMBRELLA, RAINCOAT],
  gopro: [GOPRO, GOPRO_PROTECTION, GOPRO_CHARGER, GOPRO_MOUNT]
};

module.exports = {
  tripPackingList,
  additionalConditions,
}
