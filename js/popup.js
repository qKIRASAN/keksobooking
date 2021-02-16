import {
  createSeveralAnnouncements
} from './create-data.js';

import {
  getTypeOfHousing,
  checkRoomsQuantity,
  checkGuestsQuantity,
  createFeaturesList,
  createPhotosList
} from './util.js';

const map = document.querySelector('.map__canvas');
const announcementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const announcementCard = createSeveralAnnouncements();
const announcementCardListFragment = document.createDocumentFragment();

announcementCard.forEach(({author, offer}) => {
  const announcementElement = announcementTemplate.cloneNode(true);
  const featuresList = announcementElement.querySelector('.popup__features');
  const photosList = announcementElement.querySelector('.popup__photos');

  announcementElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  announcementElement.querySelector('.popup__title').textContent = offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = offer.price;
  announcementElement.querySelector('.popup__text--price')
    .insertAdjacentHTML('beforeend', ' <span>₽/ночь</span>');
  announcementElement.querySelector('.popup__type').textContent = getTypeOfHousing(offer.type);
  announcementElement.querySelector('.popup__text--capacity')
    .textContent = `${checkRoomsQuantity(offer.rooms)} для ${checkGuestsQuantity(offer.guests)}`;
  announcementElement.querySelector('.popup__text--time')
    .textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  announcementElement.querySelector('.popup__description').textContent = offer.description;
  featuresList.textContent = '';
  createFeaturesList(offer.features, 'li', 'popup__feature', featuresList);
  photosList.textContent = '';
  createPhotosList(offer.photos, 'img', 'popup__photo', photosList);

  announcementCardListFragment.appendChild(announcementElement);
});

map.appendChild(announcementCardListFragment);
