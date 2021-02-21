/* global L:readonly */
const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElements = document.querySelectorAll('.ad-form__element');
const filterForm = document.querySelector('.map__filters');
const filterElements = document.querySelectorAll('.map__filter');
const filterFeatures = document.querySelector('.map__features');

adForm.classList.add('ad-form--disabled');
adFormHeader.disabled = true;
adFormElements.forEach((element) => {
  element.disabled = true;
});
filterForm.classList.add('map__filters--disabled');
filterElements.forEach((element) => {
  element.disabled = true;
});
filterFeatures.disabled = true;

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
  })
  .setView(
    {
      lat: 35.68951,
      lng: 139.69201,
    }, 10);

const mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
  {foo: 'bar',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

mapLayer.addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

const marker = L.marker(
  {
    lat: 35.68951,
    lng: 139.69201,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

marker.addTo(map);

marker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});
