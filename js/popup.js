import {createSeveralAnnouncements} from './create-data.js';
import {getDeclensionOfNouns} from './util.js';

const CASES_FOR_ROOMS = ['комната', 'комнаты', 'комнат'];
const CASES_FOR_GUESTS = ['гостя', 'гостей', 'гостей'];
const TYPE_OF_HOUSING = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const map = document.querySelector('.map__canvas');
const announcementTemplate = document.querySelector('#card').content
  .querySelector('.popup');

const renderAnnouncement = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    map.appendChild(announcementCards[i]);
  }
};

const createFeaturesList = (value, thisParameter) => {
  value.forEach(function (element) {
    const htmlElement = document.createElement('li');
    const classNameModifier = `popup__feature--${element}`;
    htmlElement.classList.add('popup__feature', classNameModifier);
    this.appendChild(htmlElement);
  }, thisParameter);
};

const createPhotosList = (value, thisParameter) => {
  value.forEach(function (element) {
    const photoListElement = announcementTemplate.querySelector('.popup__photo').cloneNode();
    photoListElement.src = element;
    this.appendChild(photoListElement);
  }, thisParameter);
};

const announcements = createSeveralAnnouncements();
const announcementCards = announcements.map(({author, offer}) => {
  const announcementElement = announcementTemplate.cloneNode(true);
  const featuresList = announcementElement.querySelector('.popup__features');
  const photosList = announcementElement.querySelector('.popup__photos');

  announcementElement.querySelector('.popup__avatar').src = author.avatar;
  announcementElement.querySelector('.popup__title').textContent = offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = `${offer.price}`;
  announcementElement.querySelector('.popup__text--price')
    .insertAdjacentHTML('beforeend', ' <span>₽/ночь</span>');
  announcementElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSING[offer.type];
  announcementElement.querySelector('.popup__text--capacity')
    .textContent = `${offer.rooms} ${getDeclensionOfNouns(offer.rooms, CASES_FOR_ROOMS)} для
    ${offer.guests} ${getDeclensionOfNouns(offer.guests, CASES_FOR_GUESTS)}`;
  announcementElement.querySelector('.popup__text--time')
    .textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  announcementElement.querySelector('.popup__description').textContent = offer.description;
  featuresList.textContent = '';
  createFeaturesList(offer.features, featuresList);
  photosList.textContent = '';
  createPhotosList(offer.photos, photosList);

  return announcementElement;
});

export {renderAnnouncement};
