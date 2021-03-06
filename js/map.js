/* global L:readonly */
import {renderAnnouncement} from './popup.js';
import {activateForms} from './form.js';

const NUMBER_OF_DECIMALS = 5;
const address = document.querySelector('#address');

const MapSettings = {
  LAT: 35.68951,
  LNG: 139.69201,
  ZOOM: 12,
  OSM_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
  OSM_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const PinSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView(
    {
      lat: MapSettings.LAT,
      lng: MapSettings.LNG,
    }, MapSettings.ZOOM);

const mapLayer = L.tileLayer(
  MapSettings.OSM_URL,
  {foo: 'bar', attribution: MapSettings.OSM_ATTRIBUTION},
);

const mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [PinSize.WIDTH, PinSize.HEIGHT],
    iconAnchor: [PinSize.WIDTH / 2, PinSize.HEIGHT],
  },
);

const mainPin = L.marker(
  {
    lat: MapSettings.LAT,
    lng: MapSettings.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
    riseOnHover: true,
  },
);

const createPins = (announcements) => {
  announcements.forEach((announcement) => {
    const {location: {lat, lng}} = announcement;
    const pinIcon = L.icon(
      {
        iconUrl: './img/pin.svg',
        iconSize: [PinSize.WIDTH, PinSize.HEIGHT],
        iconAnchor: [PinSize.WIDTH / 2, PinSize.HEIGHT],
      },
    );

    const pin = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );

    pin.addTo(map);
    pin.bindPopup(renderAnnouncement(announcement),
      {
        keepInView: true,
      },
    );
  });
};

const resetMapToInitial = () => {
  map.setView(
    {
      lat: MapSettings.LAT,
      lng: MapSettings.LNG,
    }, MapSettings.ZOOM);
  mainPin.setLatLng(
    {
      lat: MapSettings.LAT,
      lng: MapSettings.LNG,
    });
  address.value = `${mainPin._latlng.lat}, ${mainPin._latlng.lng}`;
};

mapLayer.addTo(map);
mainPin.addTo(map);
address.readOnly = true;
address.value = `${mainPin._latlng.lat}, ${mainPin._latlng.lng}`;

mainPin.on('move', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(NUMBER_OF_DECIMALS)}, ${lng.toFixed(NUMBER_OF_DECIMALS)}`;
});

export {createPins, resetMapToInitial};
