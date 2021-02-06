'use strict';

const OFFER_TITLES = [
  'M-1 Tokyo Shimomaruko',
  'Studio Inn Nishi Shinjuku',
  'Oakwood Apartments Nishi-Shinjuku',
  'Kario Kamata',
  'Enzo Tokyo',
  'Shibuya Park Residence',
];

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const OFFER_CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_DESCRIPTIONS = [
  'Комплекс апартаментов расположен в Токио, в 10 км от сада Хаппоэн и в 11 км от терминала No2 международного аэропорта Токио.',
  'Комплекс расположен в 400 м от храма Шогонджи в Токио.',
  'Комплекс расположен в 500 м от храма Дзёэнджи. К услугам гостей апартаменты с балконом.',
  'Апартаменты с видом на город расположены в Токио, в 2 км от храма Омори Хачиман и в 2,2 км от святилища Мива-Ицукусим.',
  'Комплекс расположен в районе Сугинами в Токио, менее чем в 1 км от парка Сугинами-Курицу-Игусамори и в 16 минутах ходьбы от художественного музея Чихиро.',
  'Апартаменты с балконом или террасой расположены в 500 м от музея Комаба.',
];

const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const ANNOUNCEMENT_QUANTITY = 10;

const getRandomInteger = (min, max) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = Math.floor(Math.random() * (max - min + 1) + min);

  if (min < 0 || max < 0 || max <= min) {
    throw new Error(error);
  }

  return result;
};

const getRandomFloat = (min, max, digits = 5) => {
  const error = 'Проверьте значения. Числа могут быть только положительными, значение max должно быть больше значения min';
  const result = (Math.random() * (max - min + 1) + min).toFixed(digits);

  if (min < 0 || max < 0 || max <= min) {
    throw new Error(error);
  }

  return +result;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomArrayLength = (elements) => {
  return getRandomInteger(1, elements.length);
};

const getUniqueArrayElements = (elements) => {
  const randomArray = new Array(getRandomArrayLength(elements)).fill(null).map(() => {
    return getRandomArrayElement(elements);
  });

  return [...new Set(randomArray)];
};

const createAnnouncement = () => {
  const coordinateX = getRandomFloat(35.65000,35.70000);
  const coordinateY = getRandomFloat(139.70000,139.80000);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: coordinateX + ', ' + coordinateY,
      price: getRandomInteger(9500, 30000),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 3),
      checkin: getRandomArrayElement(OFFER_CHECKINS),
      checkout: getRandomArrayElement(OFFER_CHECKOUTS),
      features: getUniqueArrayElements(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: getUniqueArrayElements(OFFER_PHOTOS),
    },
    location: {
      x: coordinateX,
      y: coordinateY,
    },
  };
};

const createSeveralAnnouncements = () => {
  return new Array(ANNOUNCEMENT_QUANTITY).fill(null).map(createAnnouncement);
};

createSeveralAnnouncements();
