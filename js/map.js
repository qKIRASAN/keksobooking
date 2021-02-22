/* global L:readonly */
import {renderAnnouncements} from './popup.js';
import {
  adForm,
  adFormHeader,
  adFormElements,
  filterForm,
  filterElements,
  filterFeatures
} from './form.js';

const NUMBER_OF_DECIMALS = 5;
const address = document.querySelector('#address');
const cityCenterCoords = {
  lat: 35.68951,
  lng: 139.69201,
};

const map = L.map('map-canvas')
  .on('load', () => {
    setTimeout(()=> {
      adForm.classList.remove('ad-form--disabled');
      adFormHeader.removeAttribute('disabled');
      adFormElements.forEach((element) => element.removeAttribute('disabled'));
      filterForm.classList.remove('map__filters--disabled');
      filterElements.forEach((element) => element.removeAttribute('disabled'));
      filterFeatures.removeAttribute('disabled');
    }, 3000);
  })
  .setView(
    {
      lat: cityCenterCoords.lat,
      lng: cityCenterCoords.lng,
    }, 9);

const mapLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
  {foo: 'bar',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

const mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
);

const mainPin = L.marker(
  {
    lat: cityCenterCoords.lat,
    lng: cityCenterCoords.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const createPins = (announcements) => {
  announcements.forEach((announcement) => {
    const {location: {x, y}} = announcement;
    const pinIcon = L.icon(
      {
        iconUrl: './img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      },
    );

    const pin = L.marker(
      {
        lat: x,
        lng: y,
      },
      {
        icon: pinIcon,
      },
    );

    pin.addTo(map);
    pin.bindPopup(renderAnnouncements(announcement),
      {
        keepInView: true,
      },
    );
  });
};

mapLayer.addTo(map);
mainPin.addTo(map);
address.setAttribute('readonly', '');
address.value = `${mainPin._latlng.lat}, ${mainPin._latlng.lng}`;

mainPin.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(NUMBER_OF_DECIMALS)}, ${coordinates.lng.toFixed(NUMBER_OF_DECIMALS)}`;
});

export {createPins};
