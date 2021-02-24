import {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getUniqueArrayElements
} from './util.js';

const ANNOUNCEMENT_QUANTITY = 10;
const X_COORDINATE_MIN = 35.65000;
const X_COORDINATE_MAX = 35.70000;
const Y_COORDINATE_MIN = 139.70000;
const Y_COORDINATE_MAX = 139.80000;
const IMG_MIN = 1;
const IMG_MAX = 8;
const PRICE_MIN = 9500;
const PRICE_MAX = 30000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 5;
const GUESTS_MIN = 1;
const GUESTS_MAX = 3;

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

const createAnnouncement = () => {
  const coordinateX = getRandomFloat(X_COORDINATE_MIN, X_COORDINATE_MAX);
  const coordinateY = getRandomFloat(Y_COORDINATE_MIN, Y_COORDINATE_MAX);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(IMG_MIN, IMG_MAX)}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: `${coordinateX}, ${coordinateY}`,
      price: getRandomInteger(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomInteger(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArrayElement(OFFER_CHECKINS),
      checkout: getRandomArrayElement(OFFER_CHECKOUTS),
      features: getUniqueArrayElements(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: getUniqueArrayElements(OFFER_PHOTOS),
    },
    location: {
      lat: coordinateX,
      lng: coordinateY,
    },
  };
};

const createSeveralAnnouncements = () => {
  return new Array(ANNOUNCEMENT_QUANTITY).fill(null).map(createAnnouncement);
};

export {createSeveralAnnouncements};
