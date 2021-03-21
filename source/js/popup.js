import {getDeclensionOfNouns} from './util.js';

const CASES_FOR_ROOMS = ['комната', 'комнаты', 'комнат'];
const CASES_FOR_GUESTS = ['гостя', 'гостей', 'гостей'];

const housingType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const announcementTemplate = document.querySelector('#card').content
  .querySelector('.popup');

const createFeaturesList = (features, featuresList) => {
  features.forEach((element) => {
    const feature = document.createElement('li');
    const classNameModifier = `popup__feature--${element}`;
    feature.classList.add('popup__feature', classNameModifier);
    featuresList.appendChild(feature);
  });
};

const createPhotosList = (photos, photosList) => {
  const photoListElement = announcementTemplate.querySelector('.popup__photo');
  photos.forEach((element) => {
    const photo = photoListElement.cloneNode(true);
    photo.src = element;
    photosList.appendChild(photo);
  });
};

const renderAnnouncement = ({author: {avatar}, offer}) => {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos,
  } = offer;

  const announcement = announcementTemplate.cloneNode(true);
  const featuresList = announcement.querySelector('.popup__features');
  const photosList = announcement.querySelector('.popup__photos');

  announcement.querySelector('.popup__avatar').src = avatar;
  announcement.querySelector('.popup__title').textContent = title;
  announcement.querySelector('.popup__text--address').textContent = address;
  announcement.querySelector('.popup__text--price').textContent = `${price}`;
  announcement.querySelector('.popup__text--price')
    .insertAdjacentHTML('beforeend', ' <span>₽/ночь</span>');

  announcement.querySelector('.popup__type').textContent = housingType[type];
  announcement.querySelector('.popup__text--capacity')
    .textContent = `${rooms} ${getDeclensionOfNouns(rooms, CASES_FOR_ROOMS)} для
    ${guests} ${getDeclensionOfNouns(guests, CASES_FOR_GUESTS)}`;

  announcement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  announcement.querySelector('.popup__description').textContent = description;

  featuresList.innerHTML = '';
  createFeaturesList(features, featuresList);
  if (featuresList.children.length === 0) featuresList.remove();

  photosList.innerHTML = '';
  createPhotosList(photos, photosList);
  if (photosList.children.length === 0) photosList.remove();

  return announcement;
};

export {renderAnnouncement};
