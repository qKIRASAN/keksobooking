import {setDisabled, removeDisabled, debounce} from './util.js';
import {renderPins} from './map.js';
import {getFromStore} from './store.js';

const ANNOUNCEMENT_QUANTITY_ON_MAP = 10;
const DEFAULT_FILTER_VALUE = 'any';
const DELAY = 500;

const PriceRange = {
  LOW: 10000,
  HIGH: 50000,
};

const filterForm = document.querySelector('.map__filters');
const formElements = filterForm.querySelectorAll('.map__filter, .map__features');
const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRooms = filterForm.querySelector('#housing-rooms');
const filterGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelectorAll('.map__checkbox');

const deactivateFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  setDisabled(formElements);
};

const activateFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  removeDisabled(formElements);
};

const resetFilterForm = () => {
  filterForm.reset();
};

const filterByType = ({offer}) => {
  return offer.type === filterType.value || filterType.value === DEFAULT_FILTER_VALUE;
};

const filterByPrice = ({offer}) => {
  if (filterPrice.value === 'low') {
    return offer.price < PriceRange.LOW;
  }

  if (filterPrice.value === 'middle') {
    return offer.price >= PriceRange.LOW && offer.price < PriceRange.HIGH;
  }

  if (filterPrice.value === 'high') {
    return offer.price >= PriceRange.HIGH;
  }

  return true;
};

const filterByRooms = ({offer}) => {
  return offer.rooms === Number(filterRooms.value) || filterRooms.value === DEFAULT_FILTER_VALUE;
};

const filterByGuests = ({offer}) => {
  return offer.guests === Number(filterGuests.value) || filterGuests.value === DEFAULT_FILTER_VALUE;
};

const filterByFeatures = ({offer}) => {
  return [...filterFeatures].every((feature) => {
    if (feature.checked) {
      return offer.features.includes(feature.value);
    } else {
      return true;
    }
  });
};

const filterAnnouncements = (announcements) => {
  const filteredAnnouncements = [];

  for (let announcement of announcements) {
    if (
      filterByType(announcement) &&
      filterByPrice(announcement) &&
      filterByRooms(announcement) &&
      filterByGuests(announcement) &&
      filterByFeatures(announcement)
    ) {
      filteredAnnouncements.push(announcement);
    }
  }
  return filteredAnnouncements;
};

const updateAnnouncements = debounce((announcements) => {
  const filteredAnnouncements = filterAnnouncements(announcements);
  renderPins(filteredAnnouncements);
}, DELAY);

const setFilterEventListener = () => {
  const announcements = getFromStore().slice(0, ANNOUNCEMENT_QUANTITY_ON_MAP);

  filterForm.addEventListener('change', () => updateAnnouncements(announcements));
  filterForm.addEventListener('reset', () => updateAnnouncements(announcements));
};

deactivateFilterForm();

export {resetFilterForm, activateFilterForm, setFilterEventListener}
