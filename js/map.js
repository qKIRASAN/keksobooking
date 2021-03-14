/* global L:readonly */
import {renderAnnouncement} from './popup.js';
import {activateAdForm} from './ad-form.js';
import {activateFilterForm} from './filter-form.js';

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
    activateAdForm();
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

const pinLayer = L.layerGroup().addTo(map);

let defaultAnnouncements = [];

const createPins = (announcements) => {
  pinLayer.clearLayers();
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

    pin.addTo(pinLayer);
    pin.bindPopup(renderAnnouncement(announcement),
      {
        keepInView: true,
      },
    );
    activateFilterForm();
  });
};

const renderPins = (announcements) => {
  if (announcements) {
    defaultAnnouncements = announcements;
  }

  createPins(announcements);
};

const resetMapToInitial = () => {
  map.closePopup();
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
  renderPins(defaultAnnouncements);
};

mapLayer.addTo(map);
mainPin.addTo(map);
address.readOnly = true;
address.value = `${mainPin._latlng.lat}, ${mainPin._latlng.lng}`;

mainPin.on('move', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(NUMBER_OF_DECIMALS)}, ${lng.toFixed(NUMBER_OF_DECIMALS)}`;
});

export {createPins, renderPins, resetMapToInitial};
